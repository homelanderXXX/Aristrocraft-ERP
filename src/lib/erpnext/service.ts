import {
  ERPNextConfig,
  ERPNextStats,
  ERPNextApiLog,
  ERPNextItem,
  ERPNextSalesOrder,
  ERPNextSalesInvoice,
  ERPNextQuotation,
  ERPNextIssue,
  ERPNextStockBin,
} from '../../types';

export interface ERPNextConfigResponse {
  config: ERPNextConfig;
  stats: ERPNextStats;
}

export interface ERPNextLogsResponse {
  logs: ERPNextApiLog[];
}

export const erpnextService = {
  /**
   * Fetches the current ERPNext configuration and summary stats.
   */
  async getConfig(): Promise<ERPNextConfigResponse | null> {
    try {
      const res = await fetch('/api/erpnext/config');
      if (!res.ok) throw new Error('Failed to fetch ERPNext configuration');
      return await res.json();
    } catch (err) {
      console.error('ERPNext service error (getConfig):', err);
      return null;
    }
  },

  /**
   * Updates or tests ERPNext connection parameters.
   */
  async updateConfig(params: {
    apiUrl: string;
    apiKey?: string;
    apiSecret?: string;
    company?: string;
  }): Promise<{ success: boolean; message: string; config?: ERPNextConfig }> {
    try {
      const res = await fetch('/api/erpnext/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to update ERPNext config' };
    }
  },

  /**
   * Fetches items/products directly from ERPNext.
   */
  async getItems(): Promise<{ success: boolean; items: ERPNextItem[] }> {
    try {
      const res = await fetch('/api/erpnext/products');
      if (!res.ok) throw new Error('Failed to fetch ERPNext items');
      return await res.json();
    } catch (err) {
      console.error('ERPNext service error (getItems):', err);
      return { success: false, items: [] };
    }
  },

  /**
   * Pushes the store catalog products into ERPNext.
   */
  async syncCatalog(): Promise<{ success: boolean; message: string; syncedCount: number }> {
    try {
      const res = await fetch('/api/erpnext/sync-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to sync catalog to ERPNext', syncedCount: 0 };
    }
  },

  /**
   * Pushes an order to ERPNext to create a Customer and Sales Order (+ Sales Invoice).
   */
  async createOrder(orderPayload: any): Promise<{ success: boolean; message: string; salesOrder?: any; salesInvoice?: any }> {
    try {
      const res = await fetch('/api/erpnext/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to push order to ERPNext' };
    }
  },

  /**
   * Fetches Sales Orders from ERPNext.
   */
  async getOrders(): Promise<{ success: boolean; orders: ERPNextSalesOrder[] }> {
    try {
      const res = await fetch('/api/erpnext/orders');
      if (!res.ok) throw new Error('Failed to fetch ERPNext orders');
      return await res.json();
    } catch (err) {
      console.error('ERPNext service error (getOrders):', err);
      return { success: false, orders: [] };
    }
  },

  /**
   * Fetches single Sales Order details from ERPNext.
   */
  async getOrderById(id: string): Promise<{ success: boolean; order?: any }> {
    try {
      const res = await fetch(`/api/erpnext/orders/${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error('Failed to fetch ERPNext order details');
      return await res.json();
    } catch (err) {
      console.error('ERPNext service error (getOrderById):', err);
      return { success: false };
    }
  },

  /**
   * Fetches Sales Invoices from ERPNext.
   */
  async getInvoices(): Promise<{ success: boolean; invoices: ERPNextSalesInvoice[] }> {
    try {
      const res = await fetch('/api/erpnext/invoices');
      if (!res.ok) throw new Error('Failed to fetch ERPNext invoices');
      return await res.json();
    } catch (err) {
      console.error('ERPNext service error (getInvoices):', err);
      return { success: false, invoices: [] };
    }
  },

  /**
   * Fetches a specific Sales Invoice from ERPNext.
   */
  async getInvoiceByName(name: string): Promise<{ success: boolean; invoice?: any }> {
    try {
      const res = await fetch(`/api/erpnext/invoices/${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error('Failed to fetch ERPNext invoice');
      return await res.json();
    } catch (err) {
      console.error('ERPNext service error (getInvoiceByName):', err);
      return { success: false };
    }
  },

  /**
   * Creates a 3D Print Quotation / Lead in ERPNext.
   */
  async createQuotation(params: {
    customer_name: string;
    customer_email?: string;
    customer_phone?: string;
    description: string;
    requested_color?: string;
    requested_size?: string;
    file_name?: string;
    estimated_price?: number;
  }): Promise<{ success: boolean; message: string; quotation?: any; leadId?: string }> {
    try {
      const res = await fetch('/api/erpnext/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to submit Quotation to ERPNext' };
    }
  },

  /**
   * Fetches recent Quotations from ERPNext.
   */
  async getQuotations(): Promise<{ success: boolean; quotations: ERPNextQuotation[] }> {
    try {
      const res = await fetch('/api/erpnext/quotations');
      if (!res.ok) throw new Error('Failed to fetch ERPNext quotations');
      return await res.json();
    } catch (err) {
      console.error('ERPNext service error (getQuotations):', err);
      return { success: false, quotations: [] };
    }
  },

  /**
   * Creates a Customer Support Ticket (Issue) in ERPNext.
   */
  async createIssue(params: {
    subject: string;
    description: string;
    customer_email?: string;
    customer_phone?: string;
    order_id?: string;
    priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  }): Promise<{ success: boolean; message: string; issue?: any }> {
    try {
      const res = await fetch('/api/erpnext/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to submit Issue to ERPNext' };
    }
  },

  /**
   * Fetches Customer Support Tickets (Issues) from ERPNext.
   */
  async getIssues(): Promise<{ success: boolean; issues: ERPNextIssue[] }> {
    try {
      const res = await fetch('/api/erpnext/issues');
      if (!res.ok) throw new Error('Failed to fetch ERPNext issues');
      return await res.json();
    } catch (err) {
      console.error('ERPNext service error (getIssues):', err);
      return { success: false, issues: [] };
    }
  },

  /**
   * Fetches live Stock Bins from ERPNext.
   */
  async getStock(): Promise<{ success: boolean; bins: ERPNextStockBin[] }> {
    try {
      const res = await fetch('/api/erpnext/stock');
      if (!res.ok) throw new Error('Failed to fetch ERPNext stock');
      return await res.json();
    } catch (err) {
      console.error('ERPNext service error (getStock):', err);
      return { success: false, bins: [] };
    }
  },

  /**
   * Fetches real-time API logs for ERPNext bridge.
   */
  async getLogs(): Promise<ERPNextLogsResponse | null> {
    try {
      const res = await fetch('/api/erpnext/logs');
      if (!res.ok) throw new Error('Failed to fetch ERPNext API logs');
      return await res.json();
    } catch (err) {
      console.error('ERPNext service error (getLogs):', err);
      return null;
    }
  },

  /**
   * Fetches Bills of Materials (BOM) from ERPNext.
   */
  async getBOMs(): Promise<{ success: boolean; boms: any[] }> {
    try {
      const res = await fetch('/api/erpnext/boms');
      if (!res.ok) throw new Error('Failed to fetch ERPNext BOMs');
      return await res.json();
    } catch (err) {
      console.error('ERPNext service error (getBOMs):', err);
      return { success: false, boms: [] };
    }
  },

  /**
   * Creates a Manufacturing Work Order in ERPNext.
   */
  async createWorkOrder(params: {
    production_item: string;
    qty: number;
    bom_no?: string;
  }): Promise<{ success: boolean; message: string; workOrder?: any }> {
    try {
      const res = await fetch('/api/erpnext/work-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to create Work Order in ERPNext' };
    }
  },

  /**
   * Fetches Manufacturing Work Orders from ERPNext.
   */
  async getWorkOrders(): Promise<{ success: boolean; workOrders: any[] }> {
    try {
      const res = await fetch('/api/erpnext/work-orders');
      if (!res.ok) throw new Error('Failed to fetch ERPNext work orders');
      return await res.json();
    } catch (err) {
      console.error('ERPNext service error (getWorkOrders):', err);
      return { success: false, workOrders: [] };
    }
  },
};
