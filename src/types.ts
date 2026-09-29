export type PopColor = 'accent' | 'secondary' | 'tertiary' | 'quaternary' | 'slate' | 'cream';

export type ButtonVariant = 'candy' | 'secondary' | 'outline' | 'ghost' | 'sticker';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ShadowSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ComponentPreset {
  id: string;
  name: string;
  category: 'buttons' | 'cards' | 'inputs' | 'badges' | 'shapes';
  description: string;
}

export type ProductCategorySlug =
  | 'all'
  | 'home-living'
  | 'gadgets-electronics'
  | 'mechanical-engineering'
  | 'automotive'
  | 'medical-dental'
  | 'robotics-drones'
  | 'toys-games'
  | 'art-collectibles'
  | 'jewelry-fashion'
  | 'architecture-models'
  | 'education-stem'
  | 'business-industrial'
  | 'custom-manufacturing'
  | 'new-arrivals'
  | 'best-sellers'
  // Legacy aliases for backward compatibility
  | 'keychains-tags'
  | 'desk-accessories'
  | 'figures-minis'
  | 'home-wall-decor'
  | 'custom-gifts'
  | 'functional-parts'
  | 'keychains'
  | 'desk'
  | 'miniatures'
  | 'home-decor'
  | 'gifts'
  | 'custom-parts';

export type ProductBadge =
  | 'BESTSELLER'
  | 'POPULAR'
  | 'NEW'
  | 'CUSTOM'
  | 'MADE TO ORDER'
  | 'CASTABLE'
  | 'SCALE 1:100'
  | 'B2B SCALE'
  | (string & {});

export interface ProductIllustration {
  emoji: string;
  bgAccent: string;
  tag: string;
}

export interface ProductSpecs {
  material?: string;
  layerHeight?: string;
  infill?: string;
  dimensions?: string;
  weight?: string;
  printTime?: string;
}

export interface ProductGalleryItem {
  id: string;
  emoji: string;
  label: string;
  bgAccent: string;
  imageUrl?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: ProductCategorySlug;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge: ProductBadge;
  badgeColor: 'yellow' | 'orange';
  description: string;
  longDescription?: string;
  material?: string;
  colors?: string[];
  sizes?: string[];
  featured?: boolean;
  availability?: string;
  specs?: ProductSpecs;
  gallery?: ProductGalleryItem[];
  illustration: ProductIllustration;
  image?: string;
  images?: string[];
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  customNote?: string;
  unitPrice: number;
}

export type PrintCategorySlug =
  | 'all'
  | 'home-decor'
  | 'gaming'
  | 'figures'
  | 'utility'
  | 'gifts';

export interface FeaturedPrint {
  id: string;
  slug: string;
  name: string;
  category: 'Home & Decor' | 'Gaming' | 'Figures' | 'Utility' | 'Gifts';
  categorySlug: 'home-decor' | 'gaming' | 'figures' | 'utility' | 'gifts';
  description: string;
  startingPrice: number;
  tag?: string;
  badge?: string;
  badgeColor?: 'yellow' | 'orange' | 'green';
  illustration: {
    emoji: string;
    bgGradient: string;
    accentColor: string;
    badgeLabel?: string;
    shadowColor?: string;
  };
}

export interface ERPNextConfig {
  apiUrl: string;
  apiKey: string;
  apiSecret?: string;
  company: string;
  connected: boolean;
  version: string;
  user: string;
  lastSyncTimestamp: string;
  hasApiSecret?: boolean;
}

export interface ERPNextStats {
  itemsCount: number;
  ordersCount: number;
  customersCount: number;
  totalInventoryUnits: number;
}

export interface ERPNextApiLog {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  status: number;
  durationMs: number;
  timestamp: string;
  requestSnippet?: string;
  responseSnippet?: string;
}

export interface ERPNextItem {
  name: string;
  item_code: string;
  item_name: string;
  item_group: string;
  stock_uom: string;
  standard_rate: number;
  description?: string;
  image?: string;
  actual_qty?: number;
  disabled?: number;
}

export interface ERPNextSalesOrder {
  name: string;
  customer: string;
  customer_name: string;
  transaction_date: string;
  delivery_date: string;
  grand_total: number;
  status: string;
  currency: string;
  items?: Array<{
    item_code: string;
    item_name: string;
    qty: number;
    rate: number;
    amount: number;
  }>;
}

export interface ERPNextSalesInvoice {
  name: string;
  customer: string;
  customer_name: string;
  posting_date: string;
  due_date: string;
  grand_total: number;
  outstanding_amount: number;
  status: string;
  currency: string;
  items?: Array<{
    item_code: string;
    item_name: string;
    qty: number;
    rate: number;
    amount: number;
  }>;
}

export interface ERPNextQuotation {
  name: string;
  party_name: string;
  customer_name: string;
  transaction_date: string;
  valid_till: string;
  grand_total: number;
  status: string;
  currency: string;
}

export interface ERPNextIssue {
  name: string;
  subject: string;
  raised_by: string;
  status: string;
  priority: string;
  creation: string;
}

export interface ERPNextStockBin {
  name: string;
  item_code: string;
  warehouse: string;
  actual_qty: number;
  projected_qty: number;
}

export interface DolibarrConfig {

  apiUrl: string;
  apiKey: string;
  isSandbox: boolean;
  connected: boolean;
  version: string;
  lastSyncTimestamp: string;
  hasApiKey?: boolean;
}

export interface DolibarrStats {
  productsCount: number;
  ordersCount: number;
  thirdpartiesCount: number;
  totalInventoryUnits: number;
}

export interface DolibarrApiLog {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  status: number;
  durationMs: number;
  timestamp: string;
  requestSnippet?: string;
  responseSnippet?: string;
}

export interface DolibarrProduct {
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
  weight?: string;
  date_creation: string;
}

export interface DolibarrOrder {
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
    id: number;
    fk_product: number;
    product_ref: string;
    product_label: string;
    qty: number;
    subprice: number;
    tva_tx: number;
    total_ht: number;
    total_ttc: number;
  }>;
  note_public: string;
  warehouse_dispatched: boolean;
}

