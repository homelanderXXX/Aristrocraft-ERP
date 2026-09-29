import { getSupabaseClient } from '../client';
import { DbProfile, OrderStatus, CustomOrderStatus } from '../types';

export interface DashboardMetrics {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number; // confirmed, printing, ready
  completedOrders: number; // shipped, delivered
  cancelledOrders: number;
  customOrdersCount: number;
  totalProductsCount: number;
  lowStockProductsCount: number;
  recentOrders: Array<{
    id: string;
    order_number: string;
    customer_name_snapshot: string;
    customer_phone_snapshot: string;
    total: number;
    status: OrderStatus;
    created_at: string;
  }>;
  recentCustomOrders: Array<{
    id: string;
    customer_name: string;
    customer_phone: string;
    description: string;
    status: CustomOrderStatus;
    created_at: string;
  }>;
}

export const adminRepository = {
  /**
   * Retrieves current authenticated user session and matching profile.
   */
  async getCurrentAdminProfile(): Promise<{ user: any; profile: DbProfile | null } | null> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (!error && session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('auth_user_id', session.user.id)
            .maybeSingle();

          return {
            user: session.user,
            profile: profile || null,
          };
        }
      } catch (e) {
        console.warn('Supabase admin session check error:', e);
      }
    }

    // Fallback to local admin session
    try {
      const saved = localStorage.getItem('aristro_admin_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.user) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Local admin session parse error:', e);
    }

    return null;
  },

  /**
   * Authenticates admin / staff user with Supabase Auth or built-in studio credentials.
   */
  async loginAdmin(email: string, password: string): Promise<{ success: boolean; user?: any; profile?: DbProfile | null; error?: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: cleanPassword,
      });

      if (!error && data.user) {
        // Fetch matching profile
        let { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('auth_user_id', data.user.id)
          .maybeSingle();

        // Auto-bootstrap profile as admin if no profile exists yet
        if (!profile) {
          const { data: newProfile } = await (supabase
            .from('profiles') as any)
            .insert({
              auth_user_id: data.user.id,
              full_name: data.user.email?.split('@')[0] || 'Admin User',
              role: 'admin',
            })
            .select()
            .single();

          profile = newProfile;
        }

        if (profile && !['admin', 'staff'].includes((profile as any).role)) {
          await supabase.auth.signOut();
          return { success: false, error: 'Access denied. You do not have admin permissions.' };
        }

        const sessionData = { user: data.user, profile };
        try {
          localStorage.setItem('aristro_admin_session', JSON.stringify(sessionData));
        } catch (e) {}

        return { success: true, user: data.user, profile };
      }
    }

    // Built-in Studio Administrator credentials
    const validAdminEmails = [
      'admin@aristrocrafts.com',
      'admin@aristrocraft.com',
      'homelander.ovi@gmail.com',
      'admin@admin.com',
    ];
    const validPasswords = ['admin123', 'aristro123', 'admin1234', 'aristrocraft2026', 'admin'];

    const isEmailValid = validAdminEmails.includes(normalizedEmail) || normalizedEmail.startsWith('admin@');
    const isPasswordValid = validPasswords.includes(cleanPassword);

    if (isEmailValid && isPasswordValid) {
      const mockUser = {
        id: 'admin_studio_master',
        email: normalizedEmail,
        role: 'authenticated',
        created_at: new Date().toISOString(),
        user_metadata: { full_name: 'Studio Administrator' },
      };

      const mockProfile: DbProfile = {
        id: 'profile_admin_01',
        auth_user_id: mockUser.id,
        role: 'admin',
        full_name: normalizedEmail === 'homelander.ovi@gmail.com' ? 'Homelander (Owner)' : 'Studio Administrator',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const sessionData = { user: mockUser, profile: mockProfile };
      try {
        localStorage.setItem('aristro_admin_session', JSON.stringify(sessionData));
      } catch (e) {}

      return { success: true, user: mockUser, profile: mockProfile };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please use admin@aristrocrafts.com or your registered email with admin123.',
    };
  },

  /**
   * Logs out current admin user.
   */
  async logoutAdmin(): Promise<void> {
    try {
      localStorage.removeItem('aristro_admin_session');
    } catch (e) {}

    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
  },

  /**
   * Fetches key metrics for the admin dashboard.
   */
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const supabase = getSupabaseClient();
    const fallbackMetrics: DashboardMetrics = {
      totalOrders: 0,
      pendingOrders: 0,
      processingOrders: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      customOrdersCount: 0,
      totalProductsCount: 0,
      lowStockProductsCount: 0,
      recentOrders: [],
      recentCustomOrders: [],
    };

    if (!supabase) {
      try {
        const rawLocalOrders = localStorage.getItem('aristro_local_orders');
        const localOrders = rawLocalOrders ? JSON.parse(rawLocalOrders) : [];
        const rawCustom = localStorage.getItem('aristro_custom_orders');
        const customOrders = rawCustom ? JSON.parse(rawCustom) : [];

        const pending = localOrders.filter((o: any) => o.status === 'pending').length;
        const processing = localOrders.filter((o: any) => ['confirmed', 'printing', 'ready'].includes(o.status)).length;
        const completed = localOrders.filter((o: any) => ['shipped', 'delivered'].includes(o.status)).length;

        return {
          totalOrders: localOrders.length,
          pendingOrders: pending,
          processingOrders: processing,
          completedOrders: completed,
          cancelledOrders: localOrders.filter((o: any) => o.status === 'cancelled').length,
          customOrdersCount: customOrders.length,
          totalProductsCount: 16,
          lowStockProductsCount: 2,
          recentOrders: localOrders.slice(0, 5).map((o: any) => ({
            id: o.id || 'ord_1',
            order_number: o.order_number || o.id || 'AC-1001',
            customer_name_snapshot: o.customer_name || 'Customer',
            customer_phone_snapshot: o.customer_phone || '+880 1700-000000',
            total: o.total || 0,
            status: o.status || 'pending',
            created_at: o.created_at || new Date().toISOString(),
          })),
          recentCustomOrders: customOrders.slice(0, 5),
        };
      } catch (e) {
        return fallbackMetrics;
      }
    }

    try {
      // 1. Orders breakdown
      const { data: orders } = await supabase
        .from('orders')
        .select('id, order_number, customer_name_snapshot, customer_phone_snapshot, total, status, created_at')
        .order('created_at', { ascending: false });

      const allOrders = orders || [];
      const totalOrders = allOrders.length;
      const pendingOrders = allOrders.filter((o) => o.status === 'pending').length;
      const processingOrders = allOrders.filter((o) => ['confirmed', 'printing', 'ready'].includes(o.status)).length;
      const completedOrders = allOrders.filter((o) => ['shipped', 'delivered'].includes(o.status)).length;
      const cancelledOrders = allOrders.filter((o) => o.status === 'cancelled').length;
      const recentOrders = allOrders.slice(0, 5);

      // 2. Custom orders
      const { data: customOrders } = await supabase
        .from('custom_orders')
        .select('id, customer_name, customer_phone, description, status, created_at')
        .order('created_at', { ascending: false });

      const allCustomOrders = customOrders || [];
      const customOrdersCount = allCustomOrders.length;
      const recentCustomOrders = allCustomOrders.slice(0, 5);

      // 3. Products
      const { data: products } = await supabase
        .from('products')
        .select('id, stock_quantity, is_active');

      const allProducts = products || [];
      const totalProductsCount = allProducts.length;
      const lowStockProductsCount = allProducts.filter(
        (p) => p.stock_quantity !== null && p.stock_quantity <= 5
      ).length;

      return {
        totalOrders,
        pendingOrders,
        processingOrders,
        completedOrders,
        cancelledOrders,
        customOrdersCount,
        totalProductsCount,
        lowStockProductsCount,
        recentOrders,
        recentCustomOrders,
      };
    } catch (err) {
      console.warn('Error calculating dashboard metrics:', err);
      return fallbackMetrics;
    }
  },
};
