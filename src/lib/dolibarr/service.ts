import { DolibarrConfig, DolibarrStats, DolibarrApiLog, DolibarrProduct, DolibarrOrder } from '../../types';

export interface DolibarrStatusResponse {
  config: DolibarrConfig;
  stats: DolibarrStats;
}

export interface DolibarrSyncResponse {
  success: boolean;
  message: string;
  timestamp: string;
  stats: {
    products: number;
    orders: number;
    customers: number;
  };
}

export const dolibarrService = {
  /**
   * Fetch current Dolibarr ERP configuration and inventory/order statistics
   */
  async getConfig(): Promise<DolibarrStatusResponse | null> {
    try {
      const res = await fetch('/api/dolibarr/config');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Failed to fetch Dolibarr config:', err);
      return null;
    }
  },

  /**
   * Connect to live Dolibarr or enable sandbox simulation mode
   */
  async updateConfig(payload: {
    apiUrl?: string;
    apiKey?: string;
    isSandbox?: boolean;
  }): Promise<{ success: boolean; message: string; config?: DolibarrConfig }> {
    try {
      const res = await fetch('/api/dolibarr/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, message: err.message || 'Connection failed' };
    }
  },

  /**
   * Fetch catalog products directly from Dolibarr ERP
   */
  async getProducts(): Promise<{ products: DolibarrProduct[]; source: string }> {
    try {
      const res = await fetch('/api/dolibarr/products');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Failed to fetch Dolibarr products:', err);
      return { products: [], source: 'error' };
    }
  },

  /**
   * Fetch sales orders registered in Dolibarr ERP
   */
  async getOrders(): Promise<{ orders: DolibarrOrder[]; source: string }> {
    try {
      const res = await fetch('/api/dolibarr/orders');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Failed to fetch Dolibarr orders:', err);
      return { orders: [], source: 'error' };
    }
  },

  /**
   * Fetch live API traffic monitor logs
   */
  async getLogs(): Promise<{ logs: DolibarrApiLog[] }> {
    try {
      const res = await fetch('/api/dolibarr/logs');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Failed to fetch Dolibarr logs:', err);
      return { logs: [] };
    }
  },

  /**
   * Trigger two-way catalog and inventory synchronization
   */
  async triggerSync(): Promise<DolibarrSyncResponse> {
    try {
      const res = await fetch('/api/dolibarr/sync', { method: 'POST' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Sync failed',
        timestamp: new Date().toISOString(),
        stats: { products: 0, orders: 0, customers: 0 },
      };
    }
  },

  /**
   * Post an order to Dolibarr ERP
   */
  async submitOrder(orderData: {
    customer_name: string;
    customer_email?: string;
    customer_phone: string;
    customer_address: string;
    delivery_city?: string;
    payment_method?: string;
    items: Array<{
      productId: string | number;
      productRef?: string;
      label?: string;
      quantity: number;
      price: number;
      selectedColor?: string;
      selectedMaterial?: string;
    }>;
    note_public?: string;
  }): Promise<{ success: boolean; order?: DolibarrOrder; error?: string }> {
    try {
      const res = await fetch('/api/dolibarr/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to submit order to Dolibarr' };
    }
  },
};
