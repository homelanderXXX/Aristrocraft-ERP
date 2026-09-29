import { getSupabaseClient } from '../client';
import { DbCategory } from '../types';

export interface CategoryModel {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  sortOrder: number;
  isActive: boolean;
}

export function mapDbCategoryToModel(row: DbCategory): CategoryModel {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    imageUrl: row.image_url || undefined,
    sortOrder: row.sort_order,
    isActive: row.is_active,
  };
}

export const categoryRepository = {
  /**
   * Fetches all active categories ordered by sort_order.
   */
  async getActiveCategories(): Promise<CategoryModel[]> {
    const supabase = getSupabaseClient();
    if (!supabase) {
      // Fallback categories list matching src/data/products.ts
      return [
        { id: 'c1000000-0000-0000-0000-000000000001', name: 'Keychains & Tags', slug: 'keychains', description: 'Pocket-sized everyday carries and personalized tags.', sortOrder: 1, isActive: true },
        { id: 'c1000000-0000-0000-0000-000000000002', name: 'Desk Accessories', slug: 'desk', description: 'Clean workspace organization and fidget gadgets.', sortOrder: 2, isActive: true },
        { id: 'c1000000-0000-0000-0000-000000000003', name: 'Figures & Minis', slug: 'miniatures', description: 'Articulated models and display figurines.', sortOrder: 3, isActive: true },
        { id: 'c1000000-0000-0000-0000-000000000004', name: 'Home & Wall Decor', slug: 'home-decor', description: 'Voronoi lamps, geometric planters, and wall accents.', sortOrder: 4, isActive: true },
        { id: 'c1000000-0000-0000-0000-000000000005', name: 'Custom Gifts', slug: 'gifts', description: 'Personalized desk plaques and celebration items.', sortOrder: 5, isActive: true },
        { id: 'c1000000-0000-0000-0000-000000000006', name: 'Functional & Parts', slug: 'custom-parts', description: 'Brackets, adapters, and precision hardware.', sortOrder: 6, isActive: true },
      ];
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data) {
      console.warn('Error fetching categories from database:', error?.message);
      return [];
    }

    return data.map(mapDbCategoryToModel);
  },

  /**
   * Fetches a category by its slug.
   */
  async getCategoryBySlug(slug: string): Promise<CategoryModel | null> {
    const categories = await this.getActiveCategories();
    return categories.find((c) => c.slug === slug) || null;
  },

  /**
   * Admin: Fetches all categories including inactive ones.
   */
  async getAllCategoriesAdmin(): Promise<CategoryModel[]> {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return this.getActiveCategories();
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data) {
      console.warn('Error fetching admin categories:', error?.message);
      return [];
    }

    return data.map(mapDbCategoryToModel);
  },

  /**
   * Admin: Creates a new category.
   */
  async createCategory(payload: {
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    sortOrder?: number;
    isActive?: boolean;
  }): Promise<{ category: CategoryModel | null; error?: string }> {
    const supabase = getSupabaseClient();
    if (!supabase) return { category: null, error: 'Database unconfigured' };

    const { data, error } = await (supabase
      .from('categories') as any)
      .insert({
        name: payload.name,
        slug: payload.slug.toLowerCase().trim().replace(/\s+/g, '-'),
        description: payload.description || null,
        image_url: payload.imageUrl || null,
        sort_order: payload.sortOrder ?? 0,
        is_active: payload.isActive ?? true,
      })
      .select()
      .single();

    if (error || !data) {
      return { category: null, error: error?.message || 'Failed to create category' };
    }

    return { category: mapDbCategoryToModel(data), error: undefined };
  },

  /**
   * Admin: Updates an existing category.
   */
  async updateCategory(
    id: string,
    payload: {
      name?: string;
      slug?: string;
      description?: string;
      imageUrl?: string;
      sortOrder?: number;
      isActive?: boolean;
    }
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const updateData: Record<string, any> = {};
    if (payload.name !== undefined) updateData.name = payload.name;
    if (payload.slug !== undefined) updateData.slug = payload.slug.toLowerCase().trim().replace(/\s+/g, '-');
    if (payload.description !== undefined) updateData.description = payload.description;
    if (payload.imageUrl !== undefined) updateData.image_url = payload.imageUrl;
    if (payload.sortOrder !== undefined) updateData.sort_order = payload.sortOrder;
    if (payload.isActive !== undefined) updateData.is_active = payload.isActive;

    const { error } = await (supabase
      .from('categories') as any)
      .update(updateData)
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  /**
   * Admin: Toggles category active status.
   */
  async toggleCategoryActive(id: string, isActive: boolean): Promise<{ success: boolean; error?: string }> {
    return this.updateCategory(id, { isActive });
  },

  /**
   * Admin: Deletes a category.
   */
  async deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },
};

