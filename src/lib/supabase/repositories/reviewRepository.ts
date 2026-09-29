import { getSupabaseClient } from '../client';

export interface DbReview {
  id: string;
  product_id: string;
  customer_id?: string | null;
  customer_name: string;
  rating: number;
  review_text: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface ReviewModel {
  id: string;
  productId: string;
  customerId?: string | null;
  author: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  createdAt: string;
}

function mapDbReviewToModel(row: DbReview): ReviewModel {
  return {
    id: row.id,
    productId: row.product_id,
    customerId: row.customer_id,
    author: row.customer_name,
    rating: Number(row.rating),
    comment: row.review_text,
    status: row.status as 'pending' | 'approved' | 'rejected',
    date: new Date(row.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    createdAt: row.created_at,
  };
}

export const reviewRepository = {
  /**
   * Get approved reviews for a specific product
   */
  async getProductReviews(productId: string): Promise<ReviewModel[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    try {
      const { data, error } = await (supabase.from('reviews') as any)
        .select('*')
        .eq('product_id', productId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.warn('Error fetching product reviews:', error);
        return [];
      }

      return (data as unknown as DbReview[]).map(mapDbReviewToModel);
    } catch (err) {
      console.warn('Failed to load reviews from Supabase:', err);
      return [];
    }
  },

  /**
   * Submit a new customer review
   */
  async createReview(params: {
    productId: string;
    customerId?: string | null;
    customerName: string;
    rating: number;
    reviewText: string;
  }): Promise<{ review: ReviewModel | null; error: Error | null }> {
    const supabase = getSupabaseClient();
    if (!supabase) {
      // Local fallback
      const localReview: ReviewModel = {
        id: `local-rev-${Date.now()}`,
        productId: params.productId,
        customerId: params.customerId || null,
        author: params.customerName,
        rating: params.rating,
        comment: params.reviewText,
        status: 'approved',
        date: 'Just now',
        createdAt: new Date().toISOString(),
      };
      return { review: localReview, error: null };
    }

    try {
      const payload = {
        product_id: params.productId,
        customer_id: params.customerId || null,
        customer_name: params.customerName,
        rating: params.rating,
        review_text: params.reviewText,
        status: 'approved', // Auto-approve or default approved for smooth customer UX
      };

      const { data, error } = await (supabase.from('reviews') as any)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .insert(payload as any)
        .select()
        .single();

      if (error || !data) {
        return { review: null, error: error || new Error('Could not post review') };
      }

      return { review: mapDbReviewToModel(data as unknown as DbReview), error: null };
    } catch (err) {
      return { review: null, error: err as Error };
    }
  },

  /**
   * Admin: Get all reviews (pending, approved, rejected)
   */
  async getAllReviews(): Promise<ReviewModel[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    try {
      const { data, error } = await (supabase.from('reviews') as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.warn('Error fetching all reviews:', error);
        return [];
      }

      return (data as unknown as DbReview[]).map(mapDbReviewToModel);
    } catch (err) {
      console.warn('Failed to load all reviews:', err);
      return [];
    }
  },

  /**
   * Admin: Moderate review status
   */
  async updateReviewStatus(id: string, status: 'approved' | 'rejected'): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) return true;

    try {
      const { error } = await (supabase.from('reviews') as any)
        .update({ status } as any)
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Error updating review status:', err);
      return false;
    }
  },

  /**
   * Admin: Delete review
   */
  async deleteReview(id: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) return true;

    try {
      const { error } = await (supabase.from('reviews') as any)
        .delete()
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Error deleting review:', err);
      return false;
    }
  },
};
