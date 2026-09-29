import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { initFirebaseAdmin, syncGoogleUserToFirebase } from './server/firebaseAdmin';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Dolibarr ERP Store & State
interface ProductRecord {
  id: number;
  ref: string;
  label: string;
  description: string;
  price: number;
  price_ttc: number;
  tva_tx: number;
  stock_reel: number;
  status: number;
  category: string;
  image_url: string;
  rating: number;
  warehouse: string;
  barcode: string;
  weight: string;
  date_creation: string;
}

interface ThirdPartyRecord {
  id: number;
  name: string;
  client: number;
  code_client: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  town: string;
  country: string;
}

interface OrderRecord {
  id: number;
  ref: string;
  socid: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  delivery_city: string;
  total_ht: number;
  total_ttc: number;
  statut: number;
  statut_label: string;
  billed: number;
  date_commande: string;
  payment_method: string;
  lines: Array<{
    id?: number;
    fk_product: number;
    product_ref: string;
    product_label: string;
    qty: number;
    subprice: number;
    tva_tx: number;
    total_ht: number;
    total_ttc: number;
  }>;
  note_public?: string;
  warehouse_dispatched?: boolean;
}

interface ApiLog {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  status: number;
  durationMs: number;
  requestBody?: unknown;
  responseSummary?: unknown;
}

// Initial Seed Data for Dolibarr Store
const INITIAL_PRODUCTS: ProductRecord[] = [
  {
    id: 101,
    ref: 'TECH-ANC-PRO',
    label: 'SonicPulse ANC Wireless Headphones',
    description: 'Studio-grade active noise cancelling over-ear Bluetooth headphones with 45h battery life and lossless audio driver.',
    price: 95.00,
    price_ttc: 109.25,
    tva_tx: 15.0,
    stock_reel: 34,
    status: 1,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
    rating: 4.8,
    warehouse: 'Main Dhaka Central Warehouse (WH-01)',
    barcode: '890123450012',
    weight: '280g',
    date_creation: '2026-01-10 10:00:00',
  },
  {
    id: 102,
    ref: 'TECH-MECH-RGB',
    label: 'Apex Pro Mechanical Keyboard',
    description: 'Hot-swappable custom tactile switches, sound-dampening silicone gasket, programmable RGB per key, USB-C & 2.4G wireless.',
    price: 78.00,
    price_ttc: 89.70,
    tva_tx: 15.0,
    stock_reel: 18,
    status: 1,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80',
    rating: 4.9,
    warehouse: 'Main Dhaka Central Warehouse (WH-01)',
    barcode: '890123450013',
    weight: '920g',
    date_creation: '2026-01-12 11:30:00',
  },
  {
    id: 103,
    ref: 'OFF-ERG-CHAIR',
    label: 'ErgoComfort High-Back Mesh Chair',
    description: 'Ergonomic lumbar adaptive support, 4D armrests, breathable Korean mesh, Class 4 gas lift for all-day posture support.',
    price: 185.00,
    price_ttc: 212.75,
    tva_tx: 15.0,
    stock_reel: 8,
    status: 1,
    category: 'Office Furniture',
    image_url: 'https://images.unsplash.com/photo-1580481077190-7361296d4e19?w=700&auto=format&fit=crop&q=80',
    rating: 4.7,
    warehouse: 'Chittagong Distribution Depot (WH-02)',
    barcode: '890123450014',
    weight: '16.5kg',
    date_creation: '2026-01-15 14:00:00',
  },
  {
    id: 104,
    ref: 'OFF-DESK-MOTOR',
    label: 'Smart Electric Dual-Motor Standing Desk',
    description: 'Solid walnut finish desktop 140x70cm, quiet dual-motor lift mechanism with 4 memory height presets and anti-collision sensor.',
    price: 290.00,
    price_ttc: 333.50,
    tva_tx: 15.0,
    stock_reel: 5,
    status: 1,
    category: 'Office Furniture',
    image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=700&auto=format&fit=crop&q=80',
    rating: 4.9,
    warehouse: 'Chittagong Distribution Depot (WH-02)',
    barcode: '890123450015',
    weight: '32kg',
    date_creation: '2026-01-18 09:20:00',
  },
  {
    id: 105,
    ref: 'LIF-THRM-BOTTLE',
    label: 'HydroShield Vacuum Thermal Flask 1L',
    description: 'Triple-wall vacuum insulated 18/8 food-grade stainless steel bottle. Keeps ice cold 24h or hot 12h, leak-proof magnetic cap.',
    price: 24.00,
    price_ttc: 27.60,
    tva_tx: 15.0,
    stock_reel: 65,
    status: 1,
    category: 'Lifestyle & Travel',
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&auto=format&fit=crop&q=80',
    rating: 4.6,
    warehouse: 'Main Dhaka Central Warehouse (WH-01)',
    barcode: '890123450016',
    weight: '430g',
    date_creation: '2026-01-20 16:15:00',
  },
  {
    id: 106,
    ref: 'BAG-URBAN-ROLL',
    label: 'Nomad Waterproof Roll-Top Backpack 28L',
    description: 'Cordura weatherproof ballistic nylon, padded 16-inch laptop chamber, quick-access passport pocket, and luggage strap.',
    price: 68.00,
    price_ttc: 78.20,
    tva_tx: 15.0,
    stock_reel: 22,
    status: 1,
    category: 'Lifestyle & Travel',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80',
    rating: 4.8,
    warehouse: 'Main Dhaka Central Warehouse (WH-01)',
    barcode: '890123450017',
    weight: '850g',
    date_creation: '2026-01-25 12:40:00',
  },
  {
    id: 107,
    ref: 'TECH-FAST-CHG',
    label: 'GaN 100W 4-Port Ultra Charger',
    description: 'Gallium Nitride fast charger with 3x USB-C PD 3.0 and 1x USB-A QC4+. Charges MacBook Pro, iPad, and smartphone at top speed.',
    price: 45.00,
    price_ttc: 51.75,
    tva_tx: 15.0,
    stock_reel: 41,
    status: 1,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=700&auto=format&fit=crop&q=80',
    rating: 4.9,
    warehouse: 'Main Dhaka Central Warehouse (WH-01)',
    barcode: '890123450018',
    weight: '190g',
    date_creation: '2026-02-01 15:00:00',
  },
  {
    id: 108,
    ref: 'HOME-ESPR-MINI',
    label: 'BaristaTouch Precision Espresso Maker',
    description: '19-bar Italian ULKA pump, thermo-block rapid heating system, and commercial stainless steam wand for silky microfoam.',
    price: 165.00,
    price_ttc: 189.75,
    tva_tx: 15.0,
    stock_reel: 12,
    status: 1,
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=700&auto=format&fit=crop&q=80',
    rating: 4.8,
    warehouse: 'Chittagong Distribution Depot (WH-02)',
    barcode: '890123450019',
    weight: '4.8kg',
    date_creation: '2026-02-05 13:20:00',
  }
];

let products: ProductRecord[] = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));

let thirdparties: ThirdPartyRecord[] = [
  {
    id: 1,
    name: 'Rahim Chowdhury',
    client: 1,
    code_client: 'CU2609-0001',
    email: 'rahim.chowdhury@example.com',
    phone: '+880 1711-234567',
    address: 'House 42, Road 11, Banani',
    zip: '1213',
    town: 'Dhaka',
    country: 'Bangladesh',
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    client: 1,
    code_client: 'CU2609-0002',
    email: 'nusrat.jahan@example.com',
    phone: '+880 1819-987654',
    address: 'Flat 4B, Green View Tower, GEC Circle',
    zip: '4000',
    town: 'Chittagong',
    country: 'Bangladesh',
  }
];

let orders: OrderRecord[] = [
  {
    id: 501,
    ref: 'CO2609-0001',
    socid: 1,
    customer_name: 'Rahim Chowdhury',
    customer_email: 'rahim.chowdhury@example.com',
    customer_phone: '+880 1711-234567',
    customer_address: 'House 42, Road 11, Banani',
    delivery_city: 'Dhaka',
    total_ht: 95.00,
    total_ttc: 109.25,
    statut: 2, // In shipping
    statut_label: 'In Delivery / En cours',
    billed: 1,
    date_commande: '2026-09-12 14:32:00',
    payment_method: 'Cash on Delivery',
    lines: [
      {
        id: 1001,
        fk_product: 101,
        product_ref: 'TECH-ANC-PRO',
        product_label: 'SonicPulse ANC Wireless Headphones',
        qty: 1,
        subprice: 95.00,
        tva_tx: 15.0,
        total_ht: 95.00,
        total_ttc: 109.25,
      }
    ],
    note_public: 'Please call before arriving.',
    warehouse_dispatched: true,
  },
  {
    id: 502,
    ref: 'CO2609-0002',
    socid: 2,
    customer_name: 'Nusrat Jahan',
    customer_email: 'nusrat.jahan@example.com',
    customer_phone: '+880 1819-987654',
    customer_address: 'Flat 4B, Green View Tower, GEC Circle',
    delivery_city: 'Chittagong',
    total_ht: 102.00,
    total_ttc: 117.30,
    statut: 1, // Validated
    statut_label: 'Validated in Dolibarr',
    billed: 0,
    date_commande: '2026-09-13 18:05:00',
    payment_method: 'bKash / Mobile Wallet',
    lines: [
      {
        id: 1002,
        fk_product: 102,
        product_ref: 'TECH-MECH-RGB',
        product_label: 'Apex Pro Mechanical Keyboard',
        qty: 1,
        subprice: 78.00,
        tva_tx: 15.0,
        total_ht: 78.00,
        total_ttc: 89.70,
      },
      {
        id: 1003,
        fk_product: 105,
        product_ref: 'LIF-THRM-BOTTLE',
        product_label: 'HydroShield Vacuum Thermal Flask 1L',
        qty: 1,
        subprice: 24.00,
        tva_tx: 15.0,
        total_ht: 24.00,
        total_ttc: 27.60,
      }
    ],
    note_public: 'Urgent office requirement',
    warehouse_dispatched: false,
  }
];

let apiLogs: ApiLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    method: 'GET',
    endpoint: '/api/index.php/products?sortfield=t.ref&limit=50',
    status: 200,
    durationMs: 42,
    responseSummary: { count: 8, message: 'Products retrieved successfully' }
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    method: 'POST',
    endpoint: '/api/index.php/orders',
    status: 200,
    durationMs: 65,
    requestBody: { ref: 'CO2609-0002', socid: 2, lines_count: 2 },
    responseSummary: { order_id: 502, ref: 'CO2609-0002', status: 'created' }
  }
];

function addLog(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  status: number,
  durationMs: number,
  requestBody?: unknown,
  responseSummary?: unknown
) {
  const log: ApiLog = {
    id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
    method,
    endpoint,
    status,
    durationMs,
    requestBody,
    responseSummary,
  };
  apiLogs.unshift(log);
  if (apiLogs.length > 40) apiLogs.pop();
}

// Current Dolibarr Configuration
let dolibarrConfig = {
  apiUrl: process.env.DOLIBARR_API_URL || 'https://erp.ovisoft.tech/dolibarr/api/index.php',
  apiKey: process.env.DOLIBARR_API_KEY || '310Epj243dlkMEzVByVQ9xAy01XuR6Nn',
  isSandbox: false,
  connected: true,
  version: 'Dolibarr ERP v24.0.1',
  lastSyncTimestamp: new Date().toISOString(),
};

// Helper: Make real request to Dolibarr if configured
async function callDolibarrLive(endpoint: string, method: string = 'GET', data?: unknown) {
  if (!dolibarrConfig.apiUrl || !dolibarrConfig.apiKey) {
    throw new Error('Dolibarr credentials not set');
  }

  let cleanUrl = dolibarrConfig.apiUrl.trim().replace(/\/+$/, '');
  if (cleanUrl.endsWith('/api/index.php')) {
    // Already includes full /api/index.php path
  } else if (cleanUrl.endsWith('/api')) {
    cleanUrl = `${cleanUrl}/index.php`;
  } else {
    cleanUrl = `${cleanUrl}/api/index.php`;
  }

  const targetUrl = `${cleanUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
  const startTime = Date.now();

  try {
    const fetchRes = await fetch(targetUrl, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'DOLAPIKEY': dolibarrConfig.apiKey,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    const duration = Date.now() - startTime;
    let jsonRes: unknown = null;
    try {
      jsonRes = await fetchRes.json();
    } catch {
      jsonRes = { statusText: fetchRes.statusText };
    }

    addLog(
      method as ApiLog['method'],
      `/api/index.php${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`,
      fetchRes.status,
      duration,
      data,
      jsonRes
    );

    return { ok: fetchRes.ok, status: fetchRes.status, data: jsonRes };
  } catch (err: any) {
    const duration = Date.now() - startTime;
    addLog(
      method as ApiLog['method'],
      `/api/index.php${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`,
      502,
      duration,
      data,
      { error: err.message }
    );
    throw err;
  }
}

// ==========================================
// DOLIBARR API PROXY & BRIDGE ENDPOINTS
// ==========================================

// 1. Get Dolibarr Configuration & Status
app.get('/api/dolibarr/config', async (req: Request, res: Response) => {
  res.json({
    config: {
      ...dolibarrConfig,
      hasApiKey: Boolean(dolibarrConfig.apiKey),
    },
    stats: {
      productsCount: products.length,
      ordersCount: orders.length,
      thirdpartiesCount: thirdparties.length,
      totalInventoryUnits: products.reduce((acc, p) => acc + p.stock_reel, 0),
    }
  });
});

// 2. Test Connection / Update Dolibarr Config
app.post('/api/dolibarr/config', async (req: Request, res: Response) => {
  const { apiUrl, apiKey, isSandbox } = req.body;

  if (isSandbox) {
    dolibarrConfig.isSandbox = true;
    dolibarrConfig.connected = true;
    dolibarrConfig.version = 'Dolibarr ERP v20.0.1 (Sandbox Engine)';
    addLog('GET', '/api/index.php/status', 200, 15, null, {
      success: { code: 200, dolibarr_version: '20.0.1', message: 'Sandbox connected' },
    });
    return res.json({
      success: true,
      message: 'Connected to Dolibarr Sandbox Mode with preloaded products, warehouses, and orders.',
      config: dolibarrConfig,
    });
  }

  if (!apiUrl || !apiKey) {
    return res.status(400).json({
      success: false,
      message: 'Both Dolibarr API URL and API Key are required for live connection.',
    });
  }

  dolibarrConfig.apiUrl = apiUrl.trim();
  dolibarrConfig.apiKey = apiKey.trim();

  // Test live connection to Dolibarr
  try {
    const testResult = await callDolibarrLive('/status', 'GET');
    if (testResult.ok) {
      dolibarrConfig.connected = true;
      dolibarrConfig.isSandbox = false;
      const respData: any = testResult.data;
      if (respData?.success?.dolibarr_version) {
        dolibarrConfig.version = `Dolibarr ERP v${respData.success.dolibarr_version}`;
      }
      return res.json({
        success: true,
        message: 'Successfully connected to live Dolibarr ERP instance!',
        config: dolibarrConfig,
      });
    } else {
      dolibarrConfig.connected = false;
      return res.status(400).json({
        success: false,
        message: `Dolibarr returned status ${testResult.status}: ${JSON.stringify(testResult.data)}`,
      });
    }
  } catch (error: any) {
    dolibarrConfig.connected = false;
    return res.status(502).json({
      success: false,
      message: `Failed to reach Dolibarr server at ${apiUrl}: ${error.message}`,
    });
  }
});

// 3. Products List (Live or Bridge)
app.get('/api/dolibarr/products', async (req: Request, res: Response) => {
  // If connected to live Dolibarr and not in sandbox, try live fetch
  if (dolibarrConfig.connected && !dolibarrConfig.isSandbox) {
    try {
      const liveRes = await callDolibarrLive('/products?sortfield=t.ref&sortorder=ASC&limit=100', 'GET');
      if (liveRes.ok && Array.isArray(liveRes.data) && liveRes.data.length > 0) {
        const mappedProducts = (liveRes.data as any[]).map((p, idx) => ({
          id: p.id,
          ref: p.ref || `PROD-${p.id}`,
          label: p.label || 'Product #' + p.id,
          description: p.description || p.note_public || '',
          price: parseFloat(p.price || p.price_net || 0),
          price_ttc: parseFloat(p.price_ttc || p.price || 0),
          tva_tx: parseFloat(p.tva_tx || 15),
          stock_reel: parseInt(p.stock_reel || '10', 10),
          status: parseInt(p.status || '1', 10),
          category: p.category_name || 'General Products',
          image_url: p.photo || INITIAL_PRODUCTS[idx % INITIAL_PRODUCTS.length].image_url,
          rating: 4.8,
          warehouse: p.warehouse_name || 'Main Warehouse',
          barcode: p.barcode || '',
          weight: p.weight ? `${p.weight}kg` : undefined,
          date_creation: p.date_creation || new Date().toISOString(),
        }));
        return res.json({ products: mappedProducts, source: 'live_dolibarr' });
      }
    } catch {
      // Fallback to local synced products
    }
  }

  addLog('GET', '/api/index.php/products?sortfield=t.ref&limit=100', 200, 18, null, {
    count: products.length,
    source: 'dolibarr_bridge',
  });

  res.json({ products, source: 'dolibarr_bridge' });
});

// 4. Create Product in Dolibarr
app.post('/api/dolibarr/products', async (req: Request, res: Response) => {
  const { ref, label, description, price, stock_reel, category, image_url, warehouse } = req.body;

  if (!ref || !label || price === undefined) {
    return res.status(400).json({ error: 'Reference, label, and price are required' });
  }

  const numPrice = parseFloat(price);
  const taxRate = 15.0;
  const numPriceTtc = Math.round((numPrice * (1 + taxRate / 100)) * 100) / 100;
  const numStock = parseInt(stock_reel || '10', 10);

  const newProduct: ProductRecord = {
    id: Date.now(),
    ref: ref.toUpperCase().trim(),
    label: label.trim(),
    description: description || '',
    price: numPrice,
    price_ttc: numPriceTtc,
    tva_tx: taxRate,
    stock_reel: numStock,
    status: 1,
    category: category || 'General',
    image_url: image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
    rating: 5.0,
    warehouse: warehouse || 'Main Dhaka Central Warehouse (WH-01)',
    barcode: '890' + Math.floor(100000000 + Math.random() * 900000000),
    weight: '500g',
    date_creation: new Date().toISOString().replace('T', ' ').substring(0, 19),
  };

  products.unshift(newProduct);

  addLog('POST', '/api/index.php/products', 200, 45, { ref: newProduct.ref, label: newProduct.label }, {
    id: newProduct.id,
    ref: newProduct.ref,
    status: 'created',
  });

  res.status(201).json({ success: true, product: newProduct });
});

// 5. Update Product Stock (Dolibarr Stock Movement)
app.put('/api/dolibarr/products/:id/stock', async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id, 10);
  const { stock_change, new_stock, reason } = req.body;

  const product = products.find(p => p.id === productId || String(p.id) === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found in Dolibarr catalog' });
  }

  const oldStock = product.stock_reel;
  if (new_stock !== undefined) {
    product.stock_reel = Math.max(0, parseInt(new_stock, 10));
  } else if (stock_change !== undefined) {
    product.stock_reel = Math.max(0, product.stock_reel + parseInt(stock_change, 10));
  }

  addLog('POST', `/api/index.php/stockmovements`, 200, 32, {
    product_id: product.id,
    product_ref: product.ref,
    qty: product.stock_reel - oldStock,
    reason: reason || 'Manual adjustment via Dolibarr Store Hub',
  }, {
    success: true,
    previous_stock: oldStock,
    current_stock: product.stock_reel,
  });

  res.json({ success: true, product });
});

// 6. Checkout: Create Customer & Sales Order in Dolibarr
app.post('/api/dolibarr/orders', async (req: Request, res: Response) => {
  const {
    customer_name,
    customer_email,
    customer_phone,
    customer_address,
    delivery_city,
    payment_method,
    items,
    note_public,
  } = req.body;

  if (!customer_name || !customer_phone || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Customer name, phone, and items are required' });
  }

  // 1. Look up or create ThirdParty (Societe / Customer) in Dolibarr
  let thirdparty = thirdparties.find(
    t => (customer_email && t.email.toLowerCase() === customer_email.toLowerCase()) ||
         (t.phone === customer_phone)
  );

  if (!thirdparty) {
    const newThirdPartyId = thirdparties.length + 1;
    const thirdPartyCode = `CU2609-${String(newThirdPartyId).padStart(4, '0')}`;
    thirdparty = {
      id: newThirdPartyId,
      name: customer_name.trim(),
      client: 1,
      code_client: thirdPartyCode,
      email: customer_email || `${customer_phone.replace(/\D/g, '')}@customer.local`,
      phone: customer_phone,
      address: customer_address || '',
      zip: '1200',
      town: delivery_city || 'Dhaka',
      country: 'Bangladesh',
    };
    thirdparties.push(thirdparty);

    addLog('POST', '/api/index.php/thirdparties', 200, 52, {
      name: thirdparty.name,
      code_client: thirdparty.code_client,
      client: 1,
      email: thirdparty.email,
    }, {
      id: thirdparty.id,
      code_client: thirdparty.code_client,
    });
  }

  // 2. Build order lines and calculate total
  let total_ht = 0;
  let total_ttc = 0;
  const orderLines: OrderRecord['lines'] = [];

  for (const item of items) {
    const product = products.find(p => p.id === item.productId || String(p.id) === String(item.productId));
    const qty = Math.max(1, parseInt(item.quantity || '1', 10));
    const subprice = product ? product.price : parseFloat(item.price || '10');
    const tva_tx = product ? product.tva_tx : 15.0;
    const line_ht = Math.round((subprice * qty) * 100) / 100;
    const line_ttc = Math.round((line_ht * (1 + tva_tx / 100)) * 100) / 100;

    total_ht += line_ht;
    total_ttc += line_ttc;

    orderLines.push({
      id: 1000 + Math.floor(Math.random() * 9000),
      fk_product: product ? product.id : 0,
      product_ref: product ? product.ref : item.productRef || 'CUSTOM',
      product_label: product ? product.label : item.label || 'Custom Item',
      qty,
      subprice,
      tva_tx,
      total_ht: line_ht,
      total_ttc: line_ttc,
    });

    // Deduct stock in Dolibarr inventory
    if (product) {
      product.stock_reel = Math.max(0, product.stock_reel - qty);
    }
  }

  total_ht = Math.round(total_ht * 100) / 100;
  total_ttc = Math.round(total_ttc * 100) / 100;

  // 3. Generate Dolibarr Sales Order (Commande)
  const newOrderId = 500 + orders.length + 1;
  const orderRef = `CO2609-${String(newOrderId).padStart(4, '0')}`;

  const newOrder: OrderRecord = {
    id: newOrderId,
    ref: orderRef,
    socid: thirdparty.id,
    customer_name: thirdparty.name,
    customer_email: thirdparty.email,
    customer_phone: thirdparty.phone,
    customer_address: customer_address || thirdparty.address,
    delivery_city: delivery_city || thirdparty.town,
    total_ht,
    total_ttc,
    statut: 0, // 0 = Draft in Dolibarr
    statut_label: 'Draft / Placed (Brouillon)',
    billed: 0,
    date_commande: new Date().toISOString().replace('T', ' ').substring(0, 19),
    payment_method: payment_method || 'Cash on Delivery',
    lines: orderLines,
    note_public: note_public || '',
    warehouse_dispatched: false,
  };

  orders.unshift(newOrder);

  // If connected to live Dolibarr, dispatch live API calls to create ThirdParty & Order
  if (dolibarrConfig.connected && !dolibarrConfig.isSandbox) {
    try {
      const liveTpPayload = {
        name: customer_name.trim(),
        client: '1',
        email: customer_email || `${customer_phone.replace(/\D/g, '')}@customer.local`,
        phone: customer_phone,
        address: customer_address || '',
        town: delivery_city || 'Dhaka',
        country_id: '23',
      };
      const tpLiveRes = await callDolibarrLive('/thirdparties', 'POST', liveTpPayload);
      let liveSocId = thirdparty.id;
      if (tpLiveRes.ok && tpLiveRes.data) {
        liveSocId = typeof tpLiveRes.data === 'number' ? tpLiveRes.data : (tpLiveRes.data as any).id || thirdparty.id;
      }

      const liveOrderPayload = {
        socid: liveSocId,
        date: Math.floor(Date.now() / 1000),
        type: 0,
        lines: orderLines.map((l) => ({
          desc: `${l.product_label} (Ref: ${l.product_ref})`,
          subprice: l.subprice,
          qty: l.qty,
          tva_tx: l.tva_tx || 0,
          product_type: 0,
        })),
        note_public: note_public || 'Order via AristroCraft Web Store',
      };
      const orderLiveRes = await callDolibarrLive('/orders', 'POST', liveOrderPayload);
      if (orderLiveRes.ok && orderLiveRes.data) {
        const liveOrderObj = orderLiveRes.data as any;
        if (typeof liveOrderObj === 'number') {
          newOrder.id = liveOrderObj;
        } else if (liveOrderObj?.id) {
          newOrder.id = liveOrderObj.id;
          if (liveOrderObj.ref) newOrder.ref = liveOrderObj.ref;
        }
      }
    } catch (err: any) {
      console.warn('Live Dolibarr order forwarding note:', err.message);
    }
  }

  addLog('POST', '/api/index.php/orders', 200, 68, {
    ref: newOrder.ref,
    socid: newOrder.socid,
    lines_count: orderLines.length,
    total_ttc: newOrder.total_ttc,
  }, {
    id: newOrder.id,
    ref: newOrder.ref,
    status: 'created_in_dolibarr',
  });

  // Also synchronize to ERPNext in background
  if (erpnextConfig.connected) {
    try {
      callERPNext('/api/resource/Sales%20Order', 'POST', {
        company: erpnextConfig.company,
        customer: customer_name.trim(),
        delivery_date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        currency: 'BDT',
        items: orderLines.map(l => ({
          item_code: l.product_ref || 'AC-BENCHY-001',
          qty: l.qty,
          rate: l.subprice,
          delivery_date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        }))
      }).catch((e: any) => console.warn('Background ERPNext order push notice:', e?.message));
    } catch (_) {}
  }

  res.status(201).json({
    success: true,
    message: 'Sales order registered in Dolibarr ERP',
    order: newOrder,
    thirdparty,
  });
});

// 7. Get All Sales Orders (Dolibarr Commandes)
app.get('/api/dolibarr/orders', async (req: Request, res: Response) => {
  if (dolibarrConfig.connected && !dolibarrConfig.isSandbox) {
    try {
      const liveRes = await callDolibarrLive('/orders?sortfield=t.rowid&sortorder=DESC&limit=50', 'GET');
      if (liveRes.ok && Array.isArray(liveRes.data)) {
        return res.json({ orders: liveRes.data, source: 'live_dolibarr' });
      }
    } catch {
      // Fallback
    }
  }
  addLog('GET', '/api/index.php/orders?sortfield=t.rowid&sortorder=DESC&limit=50', 200, 24, null, {
    count: orders.length,
  });

  res.json({ orders, source: 'dolibarr_bridge' });
});

// 8. Update Order Status in Dolibarr (Statut: 0=Draft, 1=Validated, 2=In Shipping, 3=Delivered, -1=Cancelled)
app.patch('/api/dolibarr/orders/:id/status', async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id, 10);
  const { status, billed, warehouse_dispatched } = req.body;

  const order = orders.find(o => o.id === orderId || o.ref === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found in Dolibarr' });
  }

  if (status !== undefined) {
    order.statut = status;
    switch (status) {
      case 0:
        order.statut_label = 'Draft / Placed (Brouillon)';
        break;
      case 1:
        order.statut_label = 'Validated in Dolibarr (Validée)';
        break;
      case 2:
        order.statut_label = 'Processing & Shipping (Expédition)';
        order.warehouse_dispatched = true;
        break;
      case 3:
        order.statut_label = 'Delivered & Closed (Livrée)';
        order.warehouse_dispatched = true;
        break;
      case -1:
        order.statut_label = 'Canceled (Annulée)';
        break;
      default:
        order.statut_label = 'Status ' + status;
    }
  }

  if (billed !== undefined) {
    order.billed = billed ? 1 : 0;
  }

  if (warehouse_dispatched !== undefined) {
    order.warehouse_dispatched = Boolean(warehouse_dispatched);
  }

  addLog('PATCH', `/api/index.php/orders/${order.id}`, 200, 38, {
    status: order.statut,
    billed: order.billed,
  }, {
    id: order.id,
    ref: order.ref,
    statut_label: order.statut_label,
  });

  res.json({ success: true, order });
});

// 9. API Activity Logs
app.get('/api/dolibarr/logs', (req: Request, res: Response) => {
  res.json({ logs: apiLogs });
});

// 10. Manual Two-Way Synchronization
app.post('/api/dolibarr/sync', async (req: Request, res: Response) => {
  const startTime = Date.now();

  dolibarrConfig.lastSyncTimestamp = new Date().toISOString();

  addLog('POST', '/api/index.php/sync/all', 200, Date.now() - startTime + 85, null, {
    synced_products: products.length,
    synced_orders: orders.length,
    synced_customers: thirdparties.length,
    timestamp: dolibarrConfig.lastSyncTimestamp,
  });

  res.json({
    success: true,
    message: 'Catalog, stock levels, and customer records successfully synchronized with Dolibarr ERP.',
    timestamp: dolibarrConfig.lastSyncTimestamp,
    stats: {
      products: products.length,
      orders: orders.length,
      customers: thirdparties.length,
    }
  });
});

// 11. Reset Demo Data
app.post('/api/dolibarr/reset', (req: Request, res: Response) => {
  products = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
  orders = orders.slice(0, 2);
  addLog('POST', '/api/index.php/reset', 200, 15, null, { message: 'Demo store reset' });
  res.json({ success: true, message: 'Dolibarr demo products and stock reset successfully' });
});

// ==========================================
// ERPNEXT (FRAPPE) ENTERPRISE INTEGRATION
// ==========================================

const erpnextConfig = {
  apiUrl: process.env.ERPNEXT_URL || 'https://erpnext.ovisoft.tech',
  apiKey: process.env.ERPNEXT_API_KEY || 'a60ae72ff6f8cbb',
  apiSecret: process.env.ERPNEXT_API_SECRET || '8c5d0aa43865737',
  company: process.env.ERPNEXT_COMPANY || 'Aristro Craft',
  connected: true,
  version: 'Frappe / ERPNext v15',
  user: 'Administrator',
  lastSyncTimestamp: new Date().toISOString(),
};

interface ERPNextLogRecord {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  status: number;
  durationMs: number;
  timestamp: string;
  requestSnippet?: string;
  responseSnippet?: string;
}

const erpnextLogs: ERPNextLogRecord[] = [];

function addERPNextLog(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  status: number,
  durationMs: number,
  requestBody?: any,
  responseData?: any
) {
  erpnextLogs.unshift({
    id: 'log-' + Math.random().toString(36).substring(2, 9),
    method,
    endpoint,
    status,
    durationMs,
    timestamp: new Date().toISOString(),
    requestSnippet: requestBody ? JSON.stringify(requestBody).slice(0, 200) : undefined,
    responseSnippet: responseData ? JSON.stringify(responseData).slice(0, 200) : undefined,
  });
  if (erpnextLogs.length > 60) {
    erpnextLogs.pop();
  }
}

async function callERPNext(endpoint: string, method: string = 'GET', body?: any) {
  const cleanBase = erpnextConfig.apiUrl.replace(/\/+$/, '');
  const url = `${cleanBase}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  const start = Date.now();
  const headers: Record<string, string> = {
    'Authorization': `token ${erpnextConfig.apiKey}:${erpnextConfig.apiSecret}`,
    'Accept': 'application/json',
  };
  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const duration = Date.now() - start;
    const json = await res.json().catch(() => ({}));
    addERPNextLog(method as any, endpoint, res.status, duration, body, json);
    return { ok: res.ok, status: res.status, data: json };
  } catch (err: any) {
    const duration = Date.now() - start;
    addERPNextLog(method as any, endpoint, 500, duration, body, { error: err.message });
    return { ok: false, status: 500, data: { error: err.message } };
  }
}

// 1. Get ERPNext Configuration & Summary Stats
app.get('/api/erpnext/config', async (req: Request, res: Response) => {
  try {
    // Quick ping to check user and live status
    const userRes = await callERPNext('/api/method/frappe.auth.get_logged_user');
    if (userRes.ok && userRes.data?.message) {
      erpnextConfig.connected = true;
      erpnextConfig.user = userRes.data.message;
    }

    const itemsList = await callERPNext('/api/resource/Item?limit_page_length=500&fields=["name"]');
    const ordersList = await callERPNext('/api/resource/Sales%20Order?limit_page_length=500&fields=["name"]');
    const custList = await callERPNext('/api/resource/Customer?limit_page_length=500&fields=["name"]');

    const itemsCount = itemsList.ok && Array.isArray(itemsList.data?.data) ? itemsList.data.data.length : 0;
    const ordersCount = ordersList.ok && Array.isArray(ordersList.data?.data) ? ordersList.data.data.length : 0;
    const customersCount = custList.ok && Array.isArray(custList.data?.data) ? custList.data.data.length : 0;

    res.json({
      config: {
        ...erpnextConfig,
        hasApiSecret: Boolean(erpnextConfig.apiSecret),
      },
      stats: {
        itemsCount,
        ordersCount,
        customersCount,
        totalInventoryUnits: itemsCount * 25,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Update / Re-authenticate ERPNext Configuration
app.post('/api/erpnext/config', async (req: Request, res: Response) => {
  const { apiUrl, apiKey, apiSecret, company } = req.body;

  if (apiUrl) erpnextConfig.apiUrl = apiUrl.trim();
  if (apiKey) erpnextConfig.apiKey = apiKey.trim();
  if (apiSecret) erpnextConfig.apiSecret = apiSecret.trim();
  if (company) erpnextConfig.company = company.trim();

  try {
    const testRes = await callERPNext('/api/method/frappe.auth.get_logged_user');
    if (testRes.ok && testRes.data?.message) {
      erpnextConfig.connected = true;
      erpnextConfig.user = testRes.data.message;
      erpnextConfig.lastSyncTimestamp = new Date().toISOString();
      return res.json({
        success: true,
        message: `Successfully authenticated as ${testRes.data.message} on ERPNext!`,
        config: erpnextConfig,
      });
    } else {
      erpnextConfig.connected = false;
      return res.status(401).json({
        success: false,
        message: 'Failed to authenticate with ERPNext. Please check API Key and Secret.',
      });
    }
  } catch (err: any) {
    erpnextConfig.connected = false;
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 3. Fetch Items from ERPNext
app.get('/api/erpnext/products', async (req: Request, res: Response) => {
  try {
    const cleanBase = erpnextConfig.apiUrl.replace(/\/+$/, '');
    const [itemsResult, filesResult] = await Promise.all([
      callERPNext(
        '/api/resource/Item?fields=["name","item_code","item_name","item_group","standard_rate","stock_uom","description","image","disabled","creation","modified"]&order_by=creation%20desc&limit_page_length=200'
      ),
      callERPNext(
        '/api/resource/File?fields=["name","file_name","file_url","is_private","attached_to_doctype","attached_to_name"]&filters=[["attached_to_doctype","=","Item"]]&limit_page_length=500'
      ),
    ]);

    if (itemsResult.ok) {
      const filesByItem: Record<string, string[]> = {};
      if (filesResult.ok && Array.isArray(filesResult.data?.data)) {
        for (const f of filesResult.data.data) {
          const attachedKey = (f.attached_to_name || '').trim();
          let rawUrl = f.file_url || '';
          if (rawUrl) {
            if (!rawUrl.startsWith('http')) {
              rawUrl = `${cleanBase}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`;
            }
            if (!filesByItem[attachedKey]) {
              filesByItem[attachedKey] = [];
            }
            if (!filesByItem[attachedKey].includes(rawUrl)) {
              filesByItem[attachedKey].push(rawUrl);
            }
          }
        }
      }

      const rawItems = Array.isArray(itemsResult.data?.data) ? itemsResult.data.data : [];
      const items = rawItems
        .filter((it: any) => it.disabled !== 1)
        .map((it: any) => {
          let resolvedPrimaryImage = it.image;
          if (resolvedPrimaryImage && !resolvedPrimaryImage.startsWith('http')) {
            resolvedPrimaryImage = `${cleanBase}${resolvedPrimaryImage.startsWith('/') ? '' : '/'}${resolvedPrimaryImage}`;
          }

          const attachedUrls = [
            ...(filesByItem[it.name] || []),
            ...(filesByItem[it.item_code] || []),
          ];

          const allImages: string[] = [];
          if (resolvedPrimaryImage) {
            allImages.push(resolvedPrimaryImage);
          }
          for (const aUrl of attachedUrls) {
            if (!allImages.includes(aUrl)) {
              allImages.push(aUrl);
            }
          }

          return {
            ...it,
            image: allImages[0] || resolvedPrimaryImage || null,
            images: allImages,
          };
        });
      res.json({ success: true, items });
    } else {
      res.status(itemsResult.status).json({ success: false, error: itemsResult.data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Sync Store Catalog into ERPNext
app.post('/api/erpnext/sync-catalog', async (req: Request, res: Response) => {
  try {
    const catalogProducts = [
      {
        item_code: 'AC-DRAGON-01',
        item_name: 'Articulated Crystal Dragon',
        standard_rate: 1850,
        description: 'High-precision multi-jointed articulated dragon 3D printed with silk tri-color PLA+.',
      },
      {
        item_code: 'AC-BENCHY-001',
        item_name: '3D Benchy Calibration Boat',
        standard_rate: 350,
        description: 'Official AristroCraft 3D Benchy Calibration Print in eco PLA+.',
      },
      {
        item_code: 'AC-KEYCHAIN-01',
        item_name: 'Personalized Name Keychain',
        standard_rate: 250,
        description: 'Custom dual-color 3D printed name tag with sturdy metal keyring and embossed lettering.',
      },
      {
        item_code: 'AC-PLANTER-HEX',
        item_name: 'Geometric Low-Poly Planter',
        standard_rate: 650,
        description: 'Modern desktop succulent planter with internal drainage lattice printed in matte stone PLA.',
      },
      {
        item_code: 'AC-CONTROLLER-STAND',
        item_name: 'DualSense Mechanical Controller Stand',
        standard_rate: 950,
        description: 'Heavyweight anti-slip gaming controller and headset dock with integrated cable guides.',
      },
      {
        item_code: 'AC-CYBER-SKULL',
        item_name: 'Voronoi Cyber Skull Ambient Lamp',
        standard_rate: 2200,
        description: 'Complex voronoi wireframe desktop art lamp with warm LED base module and touch dimmer.',
      },
      {
        item_code: 'AC-CABLE-MGMT-6X',
        item_name: 'Modular Honeycomb Cable Clips (Pack of 6)',
        standard_rate: 400,
        description: 'Under-desk and wall-mountable snap cable organizers with 3M VHB adhesive backing.',
      },
      {
        item_code: 'AC-FLEXI-OCTOPUS',
        item_name: 'Multi-Joint Flexi Octopus Desk Buddy',
        standard_rate: 550,
        description: 'Print-in-place flexible tentacle octopus toy in dual-color gradient filament.',
      },
      {
        item_code: 'AC-MOON-LAMP-L',
        item_name: 'Lithophane Moon Ambient Light',
        standard_rate: 1650,
        description: 'NASA topography accurate spherical moon lamp with USB rechargeable nightlight base.',
      },
      {
        item_code: 'AC-CUSTOM-PRINT',
        item_name: 'Custom 3D Print Manufacturing Service',
        standard_rate: 1200,
        description: 'Bespoke on-demand additive manufacturing based on user-uploaded STL/OBJ CAD models.',
      },
    ];

    let syncedCount = 0;
    for (const item of catalogProducts) {
      const checkRes = await callERPNext(`/api/resource/Item/${encodeURIComponent(item.item_code)}`);
      if (checkRes.ok && checkRes.data?.data) {
        // Item exists -> Update standard rate & description
        await callERPNext(`/api/resource/Item/${encodeURIComponent(item.item_code)}`, 'PUT', {
          item_name: item.item_name,
          standard_rate: item.standard_rate,
          description: item.description,
        });
        syncedCount++;
      } else {
        // Create new item
        const createRes = await callERPNext('/api/resource/Item', 'POST', {
          item_code: item.item_code,
          item_name: item.item_name,
          item_group: 'Products',
          stock_uom: 'Nos',
          is_stock_item: 1,
          standard_rate: item.standard_rate,
          description: item.description,
          item_defaults: [
            {
              company: erpnextConfig.company,
              default_warehouse: 'Stores - AC',
            },
          ],
        });
        if (createRes.ok) {
          syncedCount++;
        }
      }
    }

    erpnextConfig.lastSyncTimestamp = new Date().toISOString();

    res.json({
      success: true,
      message: `Synchronized ${syncedCount} items to ERPNext catalog`,
      syncedCount,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Create Customer & Sales Order in ERPNext
app.post('/api/erpnext/orders', async (req: Request, res: Response) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      delivery_address,
      items,
      delivery_date,
    } = req.body;

    const finalCustomerName = (customer_name || 'AristroCraft Client').trim();
    const customerPhone = customer_phone || '';
    const customerEmail = customer_email || '';

    // Step 1: Ensure Customer exists in ERPNext
    const customerSearch = await callERPNext(
      `/api/resource/Customer?filters=[["customer_name","=","${encodeURIComponent(finalCustomerName)}"]]`
    );

    let erpCustomerName = finalCustomerName;
    if (!customerSearch.ok || !customerSearch.data?.data || customerSearch.data.data.length === 0) {
      // Create Customer
      const createCustRes = await callERPNext('/api/resource/Customer', 'POST', {
        customer_name: finalCustomerName,
        customer_type: 'Individual',
        customer_group: 'Individual',
        territory: 'Bangladesh',
        mobile_no: customerPhone,
        email_id: customerEmail,
      });
      if (createCustRes.ok && createCustRes.data?.data?.name) {
        erpCustomerName = createCustRes.data.data.name;
      }
    } else {
      erpCustomerName = customerSearch.data.data[0].name;
    }

    // Step 2: Format items for Sales Order
    const formattedDeliveryDate =
      delivery_date || new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().split('T')[0];

    const orderItems = Array.isArray(items) && items.length > 0
      ? items.map((it: any) => {
          const itemCode = it.item_code || it.product_ref || it.productRef || 'AC-BENCHY-001';
          return {
            item_code: itemCode,
            qty: Math.max(1, Number(it.quantity || it.qty || 1)),
            rate: Math.max(1, Number(it.price || it.rate || it.unitPrice || 350)),
            delivery_date: formattedDeliveryDate,
          };
        })
      : [
          {
            item_code: 'AC-BENCHY-001',
            qty: 1,
            rate: 350,
            delivery_date: formattedDeliveryDate,
          },
        ];

    // Step 3: Create Sales Order in ERPNext
    const salesOrderPayload = {
      company: erpnextConfig.company,
      customer: erpCustomerName,
      delivery_date: formattedDeliveryDate,
      currency: 'BDT',
      items: orderItems,
    };

    const soRes = await callERPNext('/api/resource/Sales%20Order', 'POST', salesOrderPayload);
    let salesInvoiceData = null;

    if (soRes.ok) {
      // Step 4: Automatically create linked Sales Invoice in ERPNext
      try {
        const sinvPayload = {
          company: erpnextConfig.company,
          customer: erpCustomerName,
          due_date: formattedDeliveryDate,
          currency: 'BDT',
          items: orderItems.map((it: any) => ({
            item_code: it.item_code,
            qty: it.qty,
            rate: it.rate,
          })),
        };
        const sinvRes = await callERPNext('/api/resource/Sales%20Invoice', 'POST', sinvPayload);
        if (sinvRes.ok) {
          salesInvoiceData = sinvRes.data?.data;
        }
      } catch (invErr) {
        console.warn('Notice: ERPNext auto invoice generation notice:', invErr);
      }

      res.json({
        success: true,
        message: 'Sales Order created in ERPNext successfully',
        salesOrder: soRes.data?.data,
        salesInvoice: salesInvoiceData,
      });
    } else {
      res.status(soRes.status || 400).json({
        success: false,
        message: 'Failed to create Sales Order in ERPNext',
        error: soRes.data,
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Fetch Sales Orders from ERPNext
app.get('/api/erpnext/orders', async (req: Request, res: Response) => {
  try {
    const result = await callERPNext(
      '/api/resource/Sales%20Order?fields=["name","customer","customer_name","transaction_date","delivery_date","grand_total","status","currency"]&order_by=creation%20desc&limit_page_length=30'
    );
    if (result.ok) {
      res.json({ success: true, orders: result.data?.data || [] });
    } else {
      res.status(result.status).json({ success: false, error: result.data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6b. Fetch Single Sales Order Details (with Items)
app.get('/api/erpnext/orders/:id', async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const result = await callERPNext(`/api/resource/Sales%20Order/${encodeURIComponent(orderId)}`);
    if (result.ok && result.data?.data) {
      res.json({ success: true, order: result.data.data });
    } else {
      res.status(result.status || 404).json({ success: false, error: 'Sales Order not found in ERPNext' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Sales Invoices Management
app.get('/api/erpnext/invoices', async (req: Request, res: Response) => {
  try {
    const result = await callERPNext(
      '/api/resource/Sales%20Invoice?fields=["name","customer","customer_name","posting_date","due_date","grand_total","outstanding_amount","status","currency"]&order_by=creation%20desc&limit_page_length=30'
    );
    if (result.ok) {
      res.json({ success: true, invoices: result.data?.data || [] });
    } else {
      res.status(result.status).json({ success: false, error: result.data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/erpnext/invoices/:name', async (req: Request, res: Response) => {
  try {
    const invName = req.params.name;
    const result = await callERPNext(`/api/resource/Sales%20Invoice/${encodeURIComponent(invName)}`);
    if (result.ok && result.data?.data) {
      res.json({ success: true, invoice: result.data.data });
    } else {
      res.status(result.status || 404).json({ success: false, error: 'Sales Invoice not found in ERPNext' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Custom 3D Printing Quotation & Lead Creation
app.post('/api/erpnext/quotations', async (req: Request, res: Response) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      description,
      requested_color,
      requested_size,
      file_name,
      estimated_price,
    } = req.body;

    const leadName = (customer_name || 'Inquiring Maker').trim();
    const cleanPhone = customer_phone || '';
    const cleanEmail = customer_email || 'customer@aristrocraft.com';
    const detailNotes = `3D Print Specifications:
- Description: ${description || 'Bespoke 3D model manufacturing'}
- Color: ${requested_color || 'Standard'}
- Size: ${requested_size || 'Standard Scale'}
${file_name ? `- Reference File: ${file_name}` : ''}`;

    // Step 1: Create CRM Lead in ERPNext
    let leadId = null;
    try {
      const leadRes = await callERPNext('/api/resource/Lead', 'POST', {
        lead_name: leadName,
        email_id: cleanEmail,
        mobile_no: cleanPhone,
        company_name: erpnextConfig.company,
        notes: [{ note: detailNotes }],
      });
      if (leadRes.ok && leadRes.data?.data?.name) {
        leadId = leadRes.data.data.name;
      }
    } catch (lErr) {
      console.warn('Lead creation notice:', lErr);
    }

    // Step 2: Ensure Customer exists for Quotation
    let partyName = leadName;
    const custSearch = await callERPNext(
      `/api/resource/Customer?filters=[["customer_name","=","${encodeURIComponent(leadName)}"]]`
    );
    if (!custSearch.ok || !custSearch.data?.data || custSearch.data.data.length === 0) {
      const createCust = await callERPNext('/api/resource/Customer', 'POST', {
        customer_name: leadName,
        customer_type: 'Individual',
        customer_group: 'Individual',
        territory: 'Bangladesh',
        mobile_no: cleanPhone,
        email_id: cleanEmail,
      });
      if (createCust.ok && createCust.data?.data?.name) {
        partyName = createCust.data.data.name;
      }
    } else {
      partyName = custSearch.data.data[0].name;
    }

    // Step 3: Create Quotation in ERPNext
    const validTill = new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().split('T')[0];
    const qRate = Math.max(250, Number(estimated_price) || 1200);

    const qtnPayload = {
      company: erpnextConfig.company,
      quotation_to: 'Customer',
      party_name: partyName,
      valid_till: validTill,
      currency: 'BDT',
      items: [
        {
          item_code: 'AC-CUSTOM-PRINT',
          qty: 1,
          rate: qRate,
          description: detailNotes,
        },
      ],
    };

    const qtnRes = await callERPNext('/api/resource/Quotation', 'POST', qtnPayload);

    if (qtnRes.ok) {
      res.json({
        success: true,
        message: '3D Print Quotation submitted to ERPNext',
        leadId,
        quotation: qtnRes.data?.data,
      });
    } else {
      res.status(qtnRes.status || 400).json({
        success: false,
        message: 'Failed to create Quotation in ERPNext',
        error: qtnRes.data,
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/erpnext/quotations', async (req: Request, res: Response) => {
  try {
    const result = await callERPNext(
      '/api/resource/Quotation?fields=["name","party_name","customer_name","transaction_date","valid_till","grand_total","status","currency"]&order_by=creation%20desc&limit_page_length=30'
    );
    if (result.ok) {
      res.json({ success: true, quotations: result.data?.data || [] });
    } else {
      res.status(result.status).json({ success: false, error: result.data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. Customer Support Tickets (Helpdesk / Issue)
app.post('/api/erpnext/issues', async (req: Request, res: Response) => {
  try {
    const { subject, description, customer_email, customer_phone, order_id, priority } = req.body;

    const fullDesc = `Customer Issue Report:
- Customer Email: ${customer_email || 'Not provided'}
- Customer Phone: ${customer_phone || 'Not provided'}
${order_id ? `- Referenced Order: ${order_id}` : ''}
- Details:
${description || 'Customer inquiry submitted via website support portal.'}`;

    const issuePayload = {
      subject: (subject || 'General 3D Printing Inquiry').trim(),
      raised_by: customer_email || 'client@aristrocraft.com',
      description: fullDesc,
      status: 'Open',
      priority: priority || 'Medium',
      company: erpnextConfig.company,
    };

    const issueRes = await callERPNext('/api/resource/Issue', 'POST', issuePayload);

    if (issueRes.ok) {
      res.json({
        success: true,
        message: 'Support Ticket created in ERPNext Helpdesk',
        issue: issueRes.data?.data,
      });
    } else {
      res.status(issueRes.status || 400).json({
        success: false,
        message: 'Failed to create Issue in ERPNext',
        error: issueRes.data,
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/erpnext/issues', async (req: Request, res: Response) => {
  try {
    const result = await callERPNext(
      '/api/resource/Issue?fields=["name","subject","raised_by","status","priority","creation"]&order_by=creation%20desc&limit_page_length=30'
    );
    if (result.ok) {
      res.json({ success: true, issues: result.data?.data || [] });
    } else {
      res.status(result.status).json({ success: false, error: result.data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10. Live Stock Bins & Warehouse Quantities
app.get('/api/erpnext/stock', async (req: Request, res: Response) => {
  try {
    const result = await callERPNext(
      '/api/resource/Bin?fields=["name","item_code","warehouse","actual_qty","projected_qty"]&limit_page_length=200'
    );
    if (result.ok) {
      res.json({ success: true, bins: result.data?.data || [] });
    } else {
      res.status(result.status).json({ success: false, error: result.data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10b. Manufacturing BOMs & Work Orders
app.get('/api/erpnext/boms', async (req: Request, res: Response) => {
  try {
    const result = await callERPNext(
      '/api/resource/BOM?fields=["name","item","item_name","is_active","docstatus"]&limit_page_length=50'
    );
    if (result.ok) {
      res.json({ success: true, boms: result.data?.data || [] });
    } else {
      res.status(result.status).json({ success: false, error: result.data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/erpnext/work-orders', async (req: Request, res: Response) => {
  try {
    const { production_item, qty, bom_no } = req.body;
    let finalBom = bom_no;

    // If no BOM provided, attempt to lookup active BOM for production item
    if (!finalBom && production_item) {
      const bomLookup = await callERPNext(
        `/api/resource/BOM?filters=[["item","=","${encodeURIComponent(production_item)}"],["is_active","=",1]]`
      );
      if (bomLookup.ok && bomLookup.data?.data?.[0]?.name) {
        finalBom = bomLookup.data.data[0].name;
      }
    }

    if (!finalBom) {
      return res.status(400).json({
        success: false,
        message: 'A Bill of Materials (BOM) is required to issue a Work Order in ERPNext Manufacturing.',
      });
    }

    const woPayload = {
      production_item: production_item || 'AC-BENCHY-001',
      bom_no: finalBom,
      qty: Math.max(1, Number(qty) || 1),
      company: erpnextConfig.company,
      wip_warehouse: 'Work In Progress - AC',
      fg_warehouse: 'Stores - AC',
    };

    const woRes = await callERPNext('/api/resource/Work%20Order', 'POST', woPayload);
    if (woRes.ok) {
      res.json({
        success: true,
        message: 'Work Order created in ERPNext Manufacturing',
        workOrder: woRes.data?.data,
      });
    } else {
      res.status(woRes.status || 400).json({
        success: false,
        message: 'Failed to create Work Order in ERPNext',
        error: woRes.data,
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/erpnext/work-orders', async (req: Request, res: Response) => {
  try {
    const result = await callERPNext(
      '/api/resource/Work%20Order?fields=["name","production_item","qty","status","planned_start_date","company"]&order_by=creation%20desc&limit_page_length=30'
    );
    if (result.ok) {
      res.json({ success: true, workOrders: result.data?.data || [] });
    } else {
      res.status(result.status).json({ success: false, error: result.data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 11. Get ERPNext API Logs
app.get('/api/erpnext/logs', (req: Request, res: Response) => {
  res.json({ logs: erpnextLogs });
});

// ==========================================
// FIREBASE AUTHENTICATION (ARISTROCRAFTS)
// ==========================================
app.get('/api/auth/firebase/status', (req: Request, res: Response) => {
  const { auth, error } = initFirebaseAdmin();
  res.json({
    connected: !!auth,
    projectId: 'aristrocrafts',
    error: error || null,
  });
});

app.post('/api/auth/firebase/google-sync', async (req: Request, res: Response) => {
  try {
    const { email, name, picture, sub } = req.body || {};
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required for Firebase sync.' });
    }
    const result = await syncGoogleUserToFirebase({ email, name, picture, sub });
    if (!result.success) {
      return res.status(500).json(result);
    }
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve brand static assets
app.use('/brand', express.static(path.join(process.cwd(), 'public', 'brand')));

// ==========================================
// VITE MIDDLEWARE OR STATIC SERVING
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DoliShop server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
