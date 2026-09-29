import { getSupabaseClient } from '../client';
import { DbOrder, DbOrderItem } from '../types';

export interface CustomerProfile {
  id: string;
  authUserId: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  provider?: string;
  defaultDeliveryAddress?: string;
  city?: string;
  createdAt: string;
}

export interface AdminCustomerSummary {
  id: string;
  name: string;
  email: string;
  phone?: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate?: string;
  createdAt: string;
}

export const customerRepository = {
  /**
   * Get or create customer record for authenticated user
   */
  async getProfile(authUserId: string): Promise<CustomerProfile | null> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await (supabase.from('customers') as any)
          .select('*')
          .eq('auth_user_id', authUserId)
          .maybeSingle();

        if (data && !error) {
          const prof: CustomerProfile = {
            id: data.id,
            authUserId: data.auth_user_id,
            name: data.name,
            email: data.email,
            phone: data.phone || '',
            avatarUrl: data.avatar_url || undefined,
            provider: data.provider || 'email',
            defaultDeliveryAddress: data.default_delivery_address || '',
            city: data.city || '',
            createdAt: data.created_at,
          };
          if (typeof window !== 'undefined') {
            localStorage.setItem('aristro_customer_profile', JSON.stringify(prof));
          }
          return prof;
        }
      } catch (err) {
        console.warn('Supabase fetch customer profile failed, checking local storage:', err);
      }
    }

    // Local storage fallback
    if (typeof window !== 'undefined') {
      try {
        const local = localStorage.getItem('aristro_customer_profile');
        if (local) {
          const parsed = JSON.parse(local) as CustomerProfile;
          if (parsed.authUserId === authUserId || !authUserId) {
            return parsed;
          }
        }
      } catch {
        // ignore
      }
    }

    return null;
  },

  /**
   * Create or update customer profile
   */
  async upsertProfile(profile: {
    authUserId: string;
    name: string;
    email: string;
    phone?: string;
    avatarUrl?: string;
    provider?: string;
    defaultDeliveryAddress?: string;
    city?: string;
  }): Promise<CustomerProfile | null> {
    const supabase = getSupabaseClient();
    const fallbackProfile: CustomerProfile = {
      id: profile.authUserId || `cust-${Date.now()}`,
      authUserId: profile.authUserId,
      name: profile.name,
      email: profile.email,
      phone: profile.phone || '',
      avatarUrl: profile.avatarUrl || '',
      provider: profile.provider || 'email',
      defaultDeliveryAddress: profile.defaultDeliveryAddress || '',
      city: profile.city || '',
      createdAt: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const payload = {
          auth_user_id: profile.authUserId,
          name: profile.name,
          email: profile.email,
          phone: profile.phone || null,
          default_delivery_address: profile.defaultDeliveryAddress || null,
          city: profile.city || null,
          updated_at: new Date().toISOString(),
        };

        const { data, error } = await (supabase.from('customers') as any)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .upsert(payload as any, { onConflict: 'auth_user_id' })
          .select()
          .single();

        if (data && !error) {
          const updated: CustomerProfile = {
            id: data.id,
            authUserId: data.auth_user_id,
            name: data.name,
            email: data.email,
            phone: data.phone || '',
            avatarUrl: profile.avatarUrl || data.avatar_url || undefined,
            provider: profile.provider || 'email',
            defaultDeliveryAddress: data.default_delivery_address || '',
            city: data.city || '',
            createdAt: data.created_at,
          };
          if (typeof window !== 'undefined') {
            localStorage.setItem('aristro_customer_profile', JSON.stringify(updated));
          }
          return updated;
        }
      } catch (err) {
        console.warn('Supabase upsert failed, saving to local profile:', err);
      }
    }

    // Always keep local storage updated
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('aristro_customer_profile', JSON.stringify(fallbackProfile));
      } catch {
        // ignore
      }
    }

    return fallbackProfile;
  },

  /**
   * Get all orders for logged in customer
   */
  async getCustomerOrders(customerId: string): Promise<DbOrder[]> {
    const supabase = getSupabaseClient();
    let supabaseOrders: DbOrder[] = [];

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .eq('customer_id', customerId)
          .order('created_at', { ascending: false });

        if (!error && data) {
          supabaseOrders = data as unknown as DbOrder[];
        }
      } catch (err) {
        console.warn('Failed to get customer orders from Supabase:', err);
      }
    }

    // Merge with local orders cache
    const localOrders: DbOrder[] = [];
    if (typeof window !== 'undefined') {
      try {
        const cachedRaw = localStorage.getItem('aristrocraft_orders_cache');
        const profileRaw = localStorage.getItem('aristro_customer_profile');
        const prof = profileRaw ? JSON.parse(profileRaw) : null;

        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as any[];
          cached.forEach((item) => {
            const matchesId = item.customerId === customerId || item.customer_id === customerId;
            const matchesEmail = prof?.email && item.customerEmail && item.customerEmail.toLowerCase() === prof.email.toLowerCase();
            const matchesPhone = prof?.phone && item.customerPhone && item.customerPhone.replace(/\D/g, '') === prof.phone.replace(/\D/g, '');

            if (matchesId || matchesEmail || matchesPhone || !customerId) {
              localOrders.push({
                id: item.id || `loc-${item.orderNumber}`,
                order_number: item.orderNumber || item.order_number,
                customer_id: customerId,
                status: item.status || 'pending',
                subtotal: Number(item.subtotal || 0),
                delivery_fee: Number(item.deliveryFee || item.delivery_fee || 0),
                discount: Number(item.discount || 0),
                total: Number(item.total || 0),
                currency: item.currency || 'BDT',
                customer_name_snapshot: item.customerName || item.customer_name_snapshot || '',
                customer_phone_snapshot: item.customerPhone || item.customer_phone_snapshot || '',
                customer_email_snapshot: item.customerEmail || item.customer_email_snapshot || null,
                delivery_address_snapshot: item.deliveryAddress || item.delivery_address_snapshot || '',
                delivery_city_snapshot: item.city || item.delivery_city_snapshot || 'Dhaka',
                notes: item.notes || null,
                created_at: item.createdAt || item.created_at || new Date().toISOString(),
                order_items: (item.items || []).map((oi: any, idx: number) => ({
                  id: `item-${idx}`,
                  order_id: item.id,
                  product_id: oi.productId || null,
                  product_name_snapshot: oi.product?.name || oi.productName || '3D Print',
                  unit_price: Number(oi.unitPrice || oi.unit_price || 0),
                  quantity: Number(oi.quantity || 1),
                  selected_color: oi.selectedColor || null,
                  selected_size: oi.selectedSize || null,
                  selected_material: oi.selectedMaterial || null,
                  personalization_text: oi.customNote || oi.personalizationText || null,
                  line_total: Number((oi.unitPrice || oi.unit_price || 0) * (oi.quantity || 1)),
                })),
              } as unknown as DbOrder);
            }
          });
        }
      } catch (err) {
        console.warn('Failed to parse local cached orders:', err);
      }
    }

    // Deduplicate by order number
    const seen = new Set<string>();
    const unified: DbOrder[] = [];
    for (const order of [...supabaseOrders, ...localOrders]) {
      const num = order.order_number?.toUpperCase();
      if (num && !seen.has(num)) {
        seen.add(num);
        unified.push(order);
      }
    }

    return unified.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  /**
   * Admin: Get customer list with aggregated order count and total spent
   */
  async getAllCustomersForAdmin(): Promise<AdminCustomerSummary[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    try {
      const { data: customersData, error: custErr } = await (supabase.from('customers') as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (custErr || !customersData) {
        console.warn('Error fetching customers list:', custErr);
        return [];
      }

      const { data: ordersData } = await supabase
        .from('orders')
        .select('customer_id, total, created_at');

      const ordersList = ordersData || [];

      return customersData.map((c: any) => {
        const userOrders = ordersList.filter((o) => o.customer_id === c.id);
        const totalSpent = userOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
        const sortedDates = userOrders.map((o) => o.created_at).sort();
        const lastOrderDate = sortedDates.length > 0 ? sortedDates[sortedDates.length - 1] : undefined;

        return {
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone || '',
          orderCount: userOrders.length,
          totalSpent,
          lastOrderDate,
          createdAt: c.created_at,
        };
      });
    } catch (err) {
      console.error('Failed to fetch customers for admin:', err);
      return [];
    }
  },
};
