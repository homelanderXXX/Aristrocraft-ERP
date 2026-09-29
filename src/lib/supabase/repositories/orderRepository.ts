import { getSupabaseClient } from '../client';
import { DbOrder, DbOrderItem, OrderStatus } from '../types';
import { CartItem } from '../../../types';

export interface CreateOrderParams {
  customer: {
    id?: string;
    name: string;
    phone: string;
    email?: string;
    deliveryAddress: string;
    city?: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  notes?: string;
}

export interface OrderModel {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  currency: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  city?: string;
  notes?: string;
  createdAt: string;
  items?: DbOrderItem[];
}

export interface TrackedOrderItem {
  productName: string;
  unitPrice: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedMaterial?: string;
  personalizationText?: string;
  lineTotal: number;
}

export interface TrackedOrderModel {
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  currency: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  city?: string;
  createdAt: string;
  items: TrackedOrderItem[];
  erpnextSalesOrder?: string;
  erpnextSalesInvoice?: string;
}

function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `AC-${dateStr}-${randomSuffix}`;
}

function cleanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits.length > 10 ? digits.slice(-10) : digits;
}

export const orderRepository = {
  /**
   * Creates a new customer order and associated order item records with immutable snapshots.
   */
  async createOrder(params: CreateOrderParams): Promise<{ order: OrderModel | null; error: Error | null }> {
    const supabase = getSupabaseClient();
    const orderNumber = generateOrderNumber();
    const discount = params.discount || 0;
    const total = params.subtotal + params.deliveryFee - discount;

    if (!supabase) {
      // Local demo fallback for preview environments
      const simulatedOrder: OrderModel = {
        id: `sim-${Date.now()}`,
        orderNumber,
        status: 'pending',
        subtotal: params.subtotal,
        deliveryFee: params.deliveryFee,
        discount,
        total,
        currency: 'BDT',
        customerName: params.customer.name,
        customerPhone: params.customer.phone,
        customerEmail: params.customer.email,
        deliveryAddress: params.customer.deliveryAddress,
        city: params.customer.city,
        notes: params.notes,
        createdAt: new Date().toISOString(),
      };
      // Asynchronously record into Dolibarr ERP & ERPNext and save to local storage
      try {
        if (typeof window !== 'undefined') {
          // Cache in local storage for order tracking and customer account
          try {
            const cacheRaw = localStorage.getItem('aristrocraft_orders_cache');
            const cache = cacheRaw ? JSON.parse(cacheRaw) : [];
            cache.unshift({
              ...simulatedOrder,
              customerId: params.customer.id,
              items: params.items,
            });
            localStorage.setItem('aristrocraft_orders_cache', JSON.stringify(cache.slice(0, 50)));

            // Save recent checkout details for auto-filling
            localStorage.setItem(
              'aristro_checkout_saved_details',
              JSON.stringify({
                name: params.customer.name,
                phone: params.customer.phone,
                email: params.customer.email,
                deliveryAddress: params.customer.deliveryAddress,
                city: params.customer.city,
              })
            );
          } catch (storageErr) {
            console.warn('Failed to save order to local cache:', storageErr);
          }

          // Asynchronously record into ERPNext
          fetch('/api/erpnext/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customer_name: params.customer.name,
              customer_email: params.customer.email,
              customer_phone: params.customer.phone,
              delivery_address: params.customer.deliveryAddress,
              items: params.items.map((item) => ({
                item_code: item.product?.slug || item.productId,
                qty: item.quantity,
                price: item.unitPrice,
              })),
            }),
          }).catch(() => {});

          fetch('/api/dolibarr/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customer_name: params.customer.name,
              customer_email: params.customer.email,
              customer_phone: params.customer.phone,
              customer_address: params.customer.deliveryAddress,
              delivery_city: params.customer.city || 'Dhaka',
              payment_method: 'Cash on Delivery (COD)',
              items: params.items.map((item) => ({
                productId: item.productId,
                productRef: item.product?.slug || item.productId,
                label: item.product?.name || '3D Print Item',
                quantity: item.quantity,
                price: item.unitPrice,
                selectedColor: item.selectedColor,
                selectedMaterial: item.product?.material,
              })),
              note_public: `Website Order #${orderNumber}. Delivery note: ${params.notes || 'None'}. Subtotal: ৳${params.subtotal}, Fee: ৳${params.deliveryFee}`,
            }),
          }).catch(() => {});
        }
      } catch {
        // non-blocking
      }
      return { order: simulatedOrder, error: null };
    }

    // Insert Order parent record with customer snapshot
    const insertPayload = {
      order_number: orderNumber,
      customer_id: params.customer.id || null,
      status: 'pending' as OrderStatus,
      subtotal: params.subtotal,
      delivery_fee: params.deliveryFee,
      discount,
      total,
      currency: 'BDT',
      customer_name_snapshot: params.customer.name,
      customer_phone_snapshot: params.customer.phone,
      customer_email_snapshot: params.customer.email || null,
      delivery_address_snapshot: params.customer.deliveryAddress,
      delivery_city_snapshot: params.customer.city || null,
      notes: params.notes || null,
    };

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(insertPayload as any)
      .select()
      .single();

    if (orderError || !orderData) {
      return { order: null, error: orderError || new Error('Failed to create order.') };
    }

    const createdOrder = orderData as unknown as DbOrder;

    // Insert Order Items with pricing and product snapshots
    const orderItemRows = params.items.map((item) => ({
      order_id: createdOrder.id,
      product_id: item.productId.startsWith('prod-') ? null : item.productId,
      product_name_snapshot: item.product.name,
      unit_price: item.unitPrice,
      quantity: item.quantity,
      selected_color: item.selectedColor || null,
      selected_size: item.selectedSize || null,
      selected_material: item.product.material || null,
      personalization_text: item.customNote || null,
      line_total: item.unitPrice * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(orderItemRows as any);

    if (itemsError) {
      console.warn('Warning inserting order items:', itemsError.message);
    }

    const newOrderModel: OrderModel = {
      id: createdOrder.id,
      orderNumber: createdOrder.order_number,
      status: createdOrder.status,
      subtotal: Number(createdOrder.subtotal),
      deliveryFee: Number(createdOrder.delivery_fee),
      discount: Number(createdOrder.discount),
      total: Number(createdOrder.total),
      currency: createdOrder.currency,
      customerName: createdOrder.customer_name_snapshot,
      customerPhone: createdOrder.customer_phone_snapshot,
      customerEmail: createdOrder.customer_email_snapshot || undefined,
      deliveryAddress: createdOrder.delivery_address_snapshot,
      city: createdOrder.delivery_city_snapshot || undefined,
      notes: createdOrder.notes || undefined,
      createdAt: createdOrder.created_at,
      items: params.items as any,
    };

    try {
      if (typeof window !== 'undefined') {
        const cache = JSON.parse(localStorage.getItem('aristrocraft_orders_cache') || '[]');
        cache.unshift(newOrderModel);
        localStorage.setItem('aristrocraft_orders_cache', JSON.stringify(cache.slice(0, 20)));

        // Record into ERPNext
        fetch('/api/erpnext/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_name: params.customer.name,
            customer_email: params.customer.email,
            customer_phone: params.customer.phone,
            delivery_address: params.customer.deliveryAddress,
            items: params.items.map((item) => ({
              item_code: item.product?.slug || item.productId,
              qty: item.quantity,
              price: item.unitPrice,
            })),
          }),
        }).catch(() => {});

        // Record into Dolibarr ERP
        fetch('/api/dolibarr/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_name: params.customer.name,
            customer_email: params.customer.email,
            customer_phone: params.customer.phone,
            customer_address: params.customer.deliveryAddress,
            delivery_city: params.customer.city || 'Dhaka',
            payment_method: 'Cash on Delivery (COD)',
            items: params.items.map((item) => ({
              productId: item.productId,
              productRef: item.product?.slug || item.productId,
              label: item.product?.name || '3D Print Item',
              quantity: item.quantity,
              price: item.unitPrice,
              selectedColor: item.selectedColor,
              selectedMaterial: item.product?.material,
            })),
            note_public: `Website Order #${newOrderModel.orderNumber}. Delivery note: ${params.notes || 'None'}. Subtotal: ৳${params.subtotal}, Fee: ৳${params.deliveryFee}`,
          }),
        }).catch(() => {});
      }
    } catch {
      // ignore storage errors
    }

    return {
      order: newOrderModel,
      error: null,
    };
  },

  /**
   * Securely tracks a customer order by Order Number AND Phone Number.
   * Does NOT expose internal database UUIDs or admin-only notes.
   */
  async trackOrder(
    orderNumber: string,
    phone: string
  ): Promise<{ order: TrackedOrderModel | null; error: string | null }> {
    const cleanOrderNum = orderNumber.trim().toUpperCase();
    const rawPhone = phone.trim();
    const cleanInputPhone = cleanPhone(rawPhone);

    if (!cleanOrderNum || !rawPhone) {
      return { order: null, error: 'Please enter both your Order Number and Phone Number.' };
    }

    const supabase = getSupabaseClient();

    if (supabase) {
      // 1. Primary path: Call RPC track_order
      try {
        const { data, error } = await (supabase as any).rpc('track_order', {
          p_order_number: cleanOrderNum,
          p_phone: rawPhone,
        });

        if (!error && data) {
          const orderData = data as any;
          return {
            order: {
              orderNumber: orderData.orderNumber,
              status: orderData.status as OrderStatus,
              subtotal: Number(orderData.subtotal),
              deliveryFee: Number(orderData.deliveryFee),
              discount: Number(orderData.discount || 0),
              total: Number(orderData.total),
              currency: orderData.currency || 'BDT',
              customerName: orderData.customerName,
              customerPhone: orderData.customerPhone,
              customerEmail: orderData.customerEmail || undefined,
              deliveryAddress: orderData.deliveryAddress,
              city: orderData.city || undefined,
              createdAt: orderData.createdAt,
              items: (orderData.items || []).map((item: any) => ({
                productName: item.productName || item.product_name_snapshot,
                unitPrice: Number(item.unitPrice || item.unit_price),
                quantity: Number(item.quantity),
                selectedColor: item.selectedColor || item.selected_color || undefined,
                selectedSize: item.selectedSize || item.selected_size || undefined,
                selectedMaterial: item.selectedMaterial || item.selected_material || undefined,
                personalizationText: item.personalizationText || item.personalization_text || undefined,
                lineTotal: Number(item.lineTotal || item.line_total),
              })),
            },
            error: null,
          };
        }
      } catch (err) {
        console.warn('RPC track_order error, attempting direct query fallback:', err);
      }

      // 2. Direct query fallback
      try {
        const { data } = await supabase
          .from('orders')
          .select(`
            *,
            items:order_items(*)
          `)
          .ilike('order_number', cleanOrderNum)
          .maybeSingle();

        if (data) {
          const row = data as any;
          const dbPhoneClean = cleanPhone(row.customer_phone_snapshot || '');
          if (
            row.customer_phone_snapshot === rawPhone ||
            dbPhoneClean === cleanInputPhone ||
            dbPhoneClean.endsWith(cleanInputPhone) ||
            cleanInputPhone.endsWith(dbPhoneClean)
          ) {
            return {
              order: {
                orderNumber: row.order_number,
                status: row.status as OrderStatus,
                subtotal: Number(row.subtotal),
                deliveryFee: Number(row.delivery_fee),
                discount: Number(row.discount || 0),
                total: Number(row.total),
                currency: row.currency || 'BDT',
                customerName: row.customer_name_snapshot,
                customerPhone: row.customer_phone_snapshot,
                customerEmail: row.customer_email_snapshot || undefined,
                deliveryAddress: row.delivery_address_snapshot,
                city: row.delivery_city_snapshot || undefined,
                createdAt: row.created_at,
                items: (row.items || []).map((item: any) => ({
                  productName: item.product_name_snapshot,
                  unitPrice: Number(item.unit_price),
                  quantity: Number(item.quantity),
                  selectedColor: item.selected_color || undefined,
                  selectedSize: item.selected_size || undefined,
                  selectedMaterial: item.selected_material || undefined,
                  personalizationText: item.personalization_text || undefined,
                  lineTotal: Number(item.line_total),
                })),
              },
              error: null,
            };
          }
        }
      } catch {
        // ignore
      }
    }

    // 3. Local storage cache fallback (preview / offline / simulated orders)
    try {
      if (typeof window !== 'undefined') {
        const cachedOrdersRaw = localStorage.getItem('aristrocraft_orders_cache');
        if (cachedOrdersRaw) {
          const cachedOrders = JSON.parse(cachedOrdersRaw) as any[];
          const found = cachedOrders.find((o) => {
            const matchesNum = o.orderNumber?.toUpperCase() === cleanOrderNum;
            const oPhoneClean = cleanPhone(o.customerPhone || '');
            const matchesPhone = o.customerPhone === rawPhone || oPhoneClean === cleanInputPhone;
            return matchesNum && matchesPhone;
          });

          if (found) {
            return {
              order: {
                orderNumber: found.orderNumber,
                status: found.status || 'pending',
                subtotal: Number(found.subtotal),
                deliveryFee: Number(found.deliveryFee),
                discount: Number(found.discount || 0),
                total: Number(found.total),
                currency: found.currency || 'BDT',
                customerName: found.customerName,
                customerPhone: found.customerPhone,
                customerEmail: found.customerEmail,
                deliveryAddress: found.deliveryAddress,
                city: found.city,
                createdAt: found.createdAt || new Date().toISOString(),
                items: (found.items || []).map((item: any) => ({
                  productName: item.product?.name || item.productName || item.product_name_snapshot || 'Custom 3D Print',
                  unitPrice: Number(item.unitPrice || item.unit_price || 0),
                  quantity: Number(item.quantity || 1),
                  selectedColor: item.selectedColor || item.selected_color || undefined,
                  selectedSize: item.selectedSize || item.selected_size || undefined,
                  selectedMaterial: item.selectedMaterial || item.selected_material || undefined,
                  personalizationText: item.customNote || item.personalizationText || item.personalization_text || undefined,
                  lineTotal: Number((item.unitPrice || item.unit_price || 0) * (item.quantity || 1)),
                })),
              },
              error: null,
            };
          }
        }
      }
    } catch {
      // ignore
    }

    // 4. ERPNext direct live lookup fallback
    try {
      const erpRes = await fetch(`/api/erpnext/orders/${encodeURIComponent(cleanOrderNum)}`);
      if (erpRes.ok) {
        const erpData = await erpRes.json();
        if (erpData.order) {
          const so = erpData.order;
          let status: OrderStatus = 'pending';
          if (so.status === 'Completed') status = 'delivered';
          else if (so.status === 'Cancelled') status = 'cancelled';
          else if (Number(so.per_delivered || 0) > 0) status = 'dispatched';
          else if (so.docstatus === 1) status = 'printing';
          else status = 'confirmed';

          return {
            order: {
              orderNumber: so.name,
              status,
              subtotal: Number(so.net_total || so.grand_total || 0),
              deliveryFee: Number(so.total_taxes_and_charges || 120),
              discount: Number(so.discount_amount || 0),
              total: Number(so.grand_total || 0),
              currency: so.currency || 'BDT',
              customerName: so.customer_name || so.customer || 'Valued Customer',
              customerPhone: rawPhone || 'Verified',
              customerEmail: so.contact_email || undefined,
              deliveryAddress: so.shipping_address || 'Registered Shipping Address (ERPNext)',
              createdAt: so.transaction_date || so.creation || new Date().toISOString(),
              erpnextSalesOrder: so.name,
              items: (so.items || []).map((it: any) => ({
                productName: it.item_name || it.item_code,
                unitPrice: Number(it.rate || 0),
                quantity: Number(it.qty || 1),
                lineTotal: Number(it.amount || 0),
              })),
            },
            error: null,
          };
        }
      }
    } catch (erpTrackErr) {
      console.warn('ERPNext direct tracking notice:', erpTrackErr);
    }

    return {
      order: null,
      error: 'No matching order found. Please check your Order Number and Phone Number.',
    };
  },

  /**
   * Retrieves an order by its unique public order number.
   */
  async getOrderByNumber(orderNumber: string): Promise<OrderModel | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .eq('order_number', orderNumber)
      .single();

    if (error || !data) return null;

    const orderRow = data as unknown as DbOrder & { items: DbOrderItem[] };

    return {
      id: orderRow.id,
      orderNumber: orderRow.order_number,
      status: orderRow.status,
      subtotal: Number(orderRow.subtotal),
      deliveryFee: Number(orderRow.delivery_fee),
      discount: Number(orderRow.discount),
      total: Number(orderRow.total),
      currency: orderRow.currency,
      customerName: orderRow.customer_name_snapshot,
      customerPhone: orderRow.customer_phone_snapshot,
      customerEmail: orderRow.customer_email_snapshot || undefined,
      deliveryAddress: orderRow.delivery_address_snapshot,
      city: orderRow.delivery_city_snapshot || undefined,
      notes: orderRow.notes || undefined,
      createdAt: orderRow.created_at,
      items: orderRow.items,
    };
  },

  /**
   * Admin: Fetches all orders with optional status filter and search query.
   */
  async getAllOrders(options?: { status?: string; search?: string }): Promise<OrderModel[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    let query = supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .order('created_at', { ascending: false });

    if (options?.status && options.status !== 'all') {
      query = query.eq('status', options.status as OrderStatus);
    }

    const { data, error } = await query;
    if (error || !data) {
      console.warn('Error fetching orders:', error?.message);
      return [];
    }

    let orders = (data as unknown as (DbOrder & { items: DbOrderItem[] })[]).map((row) => ({
      id: row.id,
      orderNumber: row.order_number,
      status: row.status,
      subtotal: Number(row.subtotal),
      deliveryFee: Number(row.delivery_fee),
      discount: Number(row.discount),
      total: Number(row.total),
      currency: row.currency,
      customerName: row.customer_name_snapshot,
      customerPhone: row.customer_phone_snapshot,
      customerEmail: row.customer_email_snapshot || undefined,
      deliveryAddress: row.delivery_address_snapshot,
      city: row.delivery_city_snapshot || undefined,
      notes: row.notes || undefined,
      createdAt: row.created_at,
      items: row.items || [],
    }));

    if (options?.search) {
      const q = options.search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerPhone.toLowerCase().includes(q) ||
          (o.customerEmail && o.customerEmail.toLowerCase().includes(q))
      );
    }

    return orders;
  },

  /**
   * Admin: Fetches single order details by internal database UUID.
   */
  async getOrderById(id: string): Promise<OrderModel | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .eq('id', id)
      .single();

    if (error || !data) return null;

    const row = data as unknown as DbOrder & { items: DbOrderItem[] };
    return {
      id: row.id,
      orderNumber: row.order_number,
      status: row.status,
      subtotal: Number(row.subtotal),
      deliveryFee: Number(row.delivery_fee),
      discount: Number(row.discount),
      total: Number(row.total),
      currency: row.currency,
      customerName: row.customer_name_snapshot,
      customerPhone: row.customer_phone_snapshot,
      customerEmail: row.customer_email_snapshot || undefined,
      deliveryAddress: row.delivery_address_snapshot,
      city: row.delivery_city_snapshot || undefined,
      notes: row.notes || undefined,
      createdAt: row.created_at,
      items: row.items || [],
    };
  },

  /**
   * Admin: Updates order operational status.
   */
  async updateOrderStatus(id: string, status: OrderStatus): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const { error } = await (supabase
      .from('orders') as any)
      .update({ status })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  /**
   * Admin: Updates admin notes on an order.
   */
  async updateOrderNotes(id: string, notes: string): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const { error } = await (supabase
      .from('orders') as any)
      .update({ notes })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },
};

