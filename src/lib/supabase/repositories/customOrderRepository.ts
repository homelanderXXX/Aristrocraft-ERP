import { getSupabaseClient } from '../client';
import { DbCustomOrder, CustomOrderStatus } from '../types';
import { uploadCustomOrderFile } from '../storage';

export interface SubmitCustomOrderParams {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description: string;
  requestedColor?: string;
  requestedSize?: string;
  referenceFile?: File;
}

export interface CustomOrderModel {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description: string;
  referenceImageUrl?: string;
  uploadedFileUrl?: string;
  requestedColor?: string;
  requestedSize?: string;
  estimatedPrice?: number;
  status: CustomOrderStatus;
  erpnextQuotationId?: string;
  erpnextLeadId?: string;
  createdAt: string;
}

export const customOrderRepository = {
  /**
   * Submits a custom 3D printing request with optional STL/CAD file upload.
   * Directly creates a Lead & Quotation in ERPNext for rapid manufacturing review.
   */
  async submitCustomOrder(
    params: SubmitCustomOrderParams
  ): Promise<{ customOrder: CustomOrderModel | null; error: Error | null }> {
    // 1. Dispatch to ERPNext Quotation pipeline
    let erpQuotationId: string | undefined;
    let erpLeadId: string | undefined;

    try {
      const erpRes = await fetch('/api/erpnext/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: params.customerName,
          customer_email: params.customerEmail,
          customer_phone: params.customerPhone,
          description: params.description,
          requested_color: params.requestedColor,
          requested_size: params.requestedSize,
          file_name: params.referenceFile?.name,
          estimated_price: 1200,
        }),
      });
      if (erpRes.ok) {
        const erpJson = await erpRes.json();
        if (erpJson.quotation?.name) {
          erpQuotationId = erpJson.quotation.name;
        }
        if (erpJson.leadId) {
          erpLeadId = erpJson.leadId;
        }
      }
    } catch (erpErr) {
      console.warn('ERPNext quotation dispatch notice:', erpErr);
    }

    const supabase = getSupabaseClient();

    if (!supabase) {
      // Demo preview fallback
      const simulated: CustomOrderModel = {
        id: erpQuotationId || `CO-${Date.now().toString().slice(-6)}`,
        customerName: params.customerName,
        customerEmail: params.customerEmail,
        customerPhone: params.customerPhone,
        description: params.description,
        requestedColor: params.requestedColor,
        requestedSize: params.requestedSize,
        status: 'pending',
        erpnextQuotationId: erpQuotationId,
        erpnextLeadId: erpLeadId,
        createdAt: new Date().toISOString(),
      };
      return { customOrder: simulated, error: null };
    }

    let uploadedFileUrl: string | null = null;
    const tempOrderId = `co-${Date.now()}`;

    // Upload attachment if present
    if (params.referenceFile) {
      const uploadRes = await uploadCustomOrderFile(tempOrderId, params.referenceFile);
      if (!uploadRes.error) {
        uploadedFileUrl = uploadRes.path;
      } else {
        console.warn('File upload warning:', uploadRes.error.message);
      }
    }

    const insertPayload = {
      customer_name: params.customerName,
      customer_email: params.customerEmail,
      customer_phone: params.customerPhone,
      description: params.description,
      uploaded_file_url: uploadedFileUrl,
      requested_color: params.requestedColor || null,
      requested_size: params.requestedSize || null,
      status: 'pending' as CustomOrderStatus,
    };

    const { data, error } = await supabase
      .from('custom_orders')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(insertPayload as any)
      .select()
      .single();

    if (error || !data) {
      return { customOrder: null, error: error || new Error('Failed to submit custom print order.') };
    }

    const row = data as unknown as DbCustomOrder;

    return {
      customOrder: {
        id: row.id,
        customerName: row.customer_name,
        customerEmail: row.customer_email,
        customerPhone: row.customer_phone,
        description: row.description,
        referenceImageUrl: row.reference_image_url || undefined,
        uploadedFileUrl: row.uploaded_file_url || undefined,
        requestedColor: row.requested_color || undefined,
        requestedSize: row.requested_size || undefined,
        estimatedPrice: row.estimated_price ? Number(row.estimated_price) : undefined,
        status: row.status,
        erpnextQuotationId: erpQuotationId,
        erpnextLeadId: erpLeadId,
        createdAt: row.created_at,
      },
      error: null,
    };
  },

  /**
   * Admin: Fetches all custom order inquiries.
   */
  async getAllCustomOrders(options?: { status?: string; search?: string }): Promise<Array<CustomOrderModel & { adminNotes?: string }>> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    let query = supabase
      .from('custom_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (options?.status && options.status !== 'all') {
      query = query.eq('status', options.status as CustomOrderStatus);
    }

    const { data, error } = await query;
    if (error || !data) {
      console.warn('Error fetching custom orders:', error?.message);
      return [];
    }

    let items = (data as unknown as DbCustomOrder[]).map((row) => ({
      id: row.id,
      customerName: row.customer_name,
      customerEmail: row.customer_email,
      customerPhone: row.customer_phone,
      description: row.description,
      referenceImageUrl: row.reference_image_url || undefined,
      uploadedFileUrl: row.uploaded_file_url || undefined,
      requestedColor: row.requested_color || undefined,
      requestedSize: row.requested_size || undefined,
      estimatedPrice: row.estimated_price ? Number(row.estimated_price) : undefined,
      status: row.status,
      adminNotes: row.admin_notes || undefined,
      createdAt: row.created_at,
    }));

    if (options?.search) {
      const q = options.search.toLowerCase();
      items = items.filter(
        (o) =>
          o.customerName.toLowerCase().includes(q) ||
          o.customerPhone.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q)
      );
    }

    return items;
  },

  /**
   * Admin: Fetches a single custom order detail by ID.
   */
  async getCustomOrderById(id: string): Promise<(CustomOrderModel & { adminNotes?: string }) | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('custom_orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    const row = data as unknown as DbCustomOrder;
    return {
      id: row.id,
      customerName: row.customer_name,
      customerEmail: row.customer_email,
      customerPhone: row.customer_phone,
      description: row.description,
      referenceImageUrl: row.reference_image_url || undefined,
      uploadedFileUrl: row.uploaded_file_url || undefined,
      requestedColor: row.requested_color || undefined,
      requestedSize: row.requested_size || undefined,
      estimatedPrice: row.estimated_price ? Number(row.estimated_price) : undefined,
      status: row.status,
      adminNotes: row.admin_notes || undefined,
      createdAt: row.created_at,
    };
  },

  /**
   * Admin: Updates status and admin notes for a custom order.
   */
  async updateCustomOrderStatus(
    id: string,
    status: CustomOrderStatus,
    adminNotes?: string,
    estimatedPrice?: number
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const updatePayload: Record<string, any> = { status };
    if (adminNotes !== undefined) updatePayload.admin_notes = adminNotes;
    if (estimatedPrice !== undefined) updatePayload.estimated_price = estimatedPrice;

    const { error } = await (supabase
      .from('custom_orders') as any)
      .update(updatePayload)
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  /**
   * Admin: Generates a temporary secure signed URL to download private custom order files.
   */
  async getFileSignedUrl(filePath: string): Promise<string | null> {
    const supabase = getSupabaseClient();
    if (!supabase || !filePath) return null;

    try {
      const { data, error } = await supabase.storage
        .from('custom-orders')
        .createSignedUrl(filePath, 3600); // 1 hour validity

      if (error || !data?.signedUrl) {
        console.warn('Error generating signed URL:', error?.message);
        return null;
      }

      return data.signedUrl;
    } catch (err) {
      console.warn('Failed to create signed URL:', err);
      return null;
    }
  },
};

