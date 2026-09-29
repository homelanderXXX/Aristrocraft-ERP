import { getSupabaseClient } from '../client';
import { DbProduct, DbProductSpecs, DbProductImage, DbProductVariant } from '../types';
import { Product, ProductSpecs, ProductGalleryItem, ProductBadge, ProductCategorySlug } from '../../../types';
import { PRODUCTS, getProductBySlug as getStaticProductBySlug } from '../../../data/products';

export interface HydratedDbProduct extends DbProduct {
  category?: { id: string; name: string; slug: string } | null;
  specs?: DbProductSpecs | null;
  images?: DbProductImage[];
  variants?: DbProductVariant[];
}

const VALID_BADGES: Record<string, ProductBadge> = {
  BESTSELLER: 'BESTSELLER',
  POPULAR: 'POPULAR',
  NEW: 'NEW',
  CUSTOM: 'CUSTOM',
  'MADE TO ORDER': 'MADE TO ORDER',
  CUSTOMIZABLE: 'CUSTOM',
  'FAN FAVORITE': 'POPULAR',
  PREMIUM: 'BESTSELLER',
  FUNCTIONAL: 'MADE TO ORDER',
  'EDC FAVORITE': 'BESTSELLER',
  'STUDIO GEAR': 'POPULAR',
};

const VALID_CATEGORIES: Array<'gifts' | 'keychains' | 'home-decor' | 'desk' | 'miniatures' | 'custom-parts'> = [
  'gifts',
  'keychains',
  'home-decor',
  'desk',
  'miniatures',
  'custom-parts',
];

/**
 * Maps relational database entities into the standard frontend Product model.
 */
export function mapDbProductToDomain(db: HydratedDbProduct): Product {
  const images = db.images || [];
  const primaryImage = images.find((img) => img.is_primary) || images[0];

  const gallery: ProductGalleryItem[] = images.map((img, idx) => ({
    id: img.id || `g-${idx}`,
    label: img.alt_text || 'View Angle',
    emoji: img.emoji_placeholder || '📦',
    bgAccent: img.bg_accent || 'bg-[#FFF9ED]',
  }));

  const colors = db.variants
    ?.filter((v) => v.variant_type === 'color' && v.is_active)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((v) => v.name) || ['Standard'];

  const sizes = db.variants
    ?.filter((v) => v.variant_type === 'size' && v.is_active)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((v) => v.name) || ['Standard'];

  const specs: ProductSpecs = {
    material: db.specs?.material_grade || db.material || 'Eco-grade PLA+',
    layerHeight: db.specs?.layer_height || '0.16mm High Detail',
    infill: db.specs?.infill || '100% Solid Core',
    printTime: db.specs?.print_time || '2-4 hours',
  };

  const matchedBadge = db.badge && VALID_BADGES[db.badge.toUpperCase()] ? VALID_BADGES[db.badge.toUpperCase()] : 'BESTSELLER';
  const categorySlug = (db.category?.slug as 'gifts' | 'keychains' | 'home-decor' | 'desk' | 'miniatures' | 'custom-parts') ||
    VALID_CATEGORIES.find((c) => c === db.category_id || db.slug.includes(c)) ||
    'desk';
  const categoryName = db.category?.name || db.category_id || 'Desk Accessories';

  return {
    id: db.id,
    slug: db.slug,
    name: db.name,
    category: categoryName,
    categorySlug,
    price: Number(db.base_price),
    originalPrice: db.original_price ? Number(db.original_price) : undefined,
    rating: Number(db.rating),
    reviewsCount: db.reviews_count,
    badge: matchedBadge,
    badgeColor: db.badge_color === 'yellow' ? 'yellow' : 'orange',
    featured: db.featured,
    description: db.short_description || '',
    longDescription: db.description || '',
    material: db.material || 'PLA+ Bio-Plastic',
    availability: db.availability_status === 'in_stock' ? 'In Stock — Ready to Print' : 'Made to Order',
    colors: colors.length > 0 ? colors : ['Standard'],
    sizes: sizes.length > 0 ? sizes : ['Standard'],
    specs,
    gallery: gallery.length > 0 ? gallery : [
      { id: 'g1', label: 'Front Perspective', emoji: primaryImage?.emoji_placeholder || '📦', bgAccent: 'bg-[#FFF9ED]' }
    ],
    illustration: {
      emoji: primaryImage?.emoji_placeholder || '🏷️',
      bgAccent: primaryImage?.bg_accent || 'bg-[#FFC43C]',
      tag: db.material || 'PLA+',
    },
  };
}

// Known mapping of ERPNext item codes to existing local product slugs
const ERP_TO_LOCAL_SLUG_MAP: Record<string, string> = {
  'AC-BENCHY-001': '3d-benchy-boat',
  'AC-DRAGON-01': 'articulated-crystal-dragon',
  'AC-KEYCHAIN-01': 'personalized-keychain',
  'AC-PLANTER-HEX': 'geometric-planter',
  'AC-CONTROLLER-STAND': 'controller-stand',
  'AC-CYBER-SKULL': 'cyber-skull-lamp',
  'AC-CABLE-MGMT-6X': 'cable-management-clips',
  'AC-FLEXI-OCTOPUS': 'flexi-octopus',
  'AC-MOON-LAMP-L': 'moon-lamp',
  'AC-CUSTOM-PRINT': 'custom-manufacturing-service',
};

interface ERPNextRawItem {
  name: string;
  item_code: string;
  item_name: string;
  item_group: string;
  standard_rate: number;
  stock_uom: string;
  description: string;
  image: string | null;
  images?: string[];
  disabled: number;
}

let cachedERPProducts: Product[] = [];
let lastERPFetchTime = 0;
const ERP_CACHE_TTL_MS = 3000; // 3 seconds cache for swift real-time reactivity

async function fetchLiveERPNextProducts(): Promise<Product[]> {
  const now = Date.now();
  if (cachedERPProducts.length > 0 && now - lastERPFetchTime < ERP_CACHE_TTL_MS) {
    return cachedERPProducts;
  }

  if (typeof window === 'undefined') return [];

  try {
    const res = await fetch('/api/erpnext/products');
    if (!res.ok) return cachedERPProducts;
    const json = await res.json();
    if (!json.success || !Array.isArray(json.items)) return cachedERPProducts;

    const erpItems: ERPNextRawItem[] = json.items;

    const mapped: Product[] = erpItems.map((item) => {
      const code = (item.item_code || item.name || '').trim();
      const directSlug = ERP_TO_LOCAL_SLUG_MAP[code];
      const rawSlug = directSlug || code.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item';
      const name = (item.item_name || code).trim();
      const rate = Number(item.standard_rate) > 0 ? Number(item.standard_rate) : 350;
      const desc = (item.description || '').replace(/<[^>]*>?/gm, '').trim() || 'High-precision 3D printed model manufactured in high-grade PLA+.';

      // Pick contextual icon
      let emoji = '📦';
      const lower = name.toLowerCase();
      if (lower.includes('dragon')) emoji = '🐉';
      else if (lower.includes('boat') || lower.includes('benchy')) emoji = '⛵';
      else if (lower.includes('skull') || lower.includes('lamp') || lower.includes('moon')) emoji = '💡';
      else if (lower.includes('planter') || lower.includes('pot') || lower.includes('flower')) emoji = '🪴';
      else if (lower.includes('keychain') || lower.includes('tag')) emoji = '🏷️';
      else if (lower.includes('controller') || lower.includes('game') || lower.includes('stand')) emoji = '🎮';
      else if (lower.includes('clip') || lower.includes('cable')) emoji = '📎';
      else if (lower.includes('octopus') || lower.includes('flexi')) emoji = '🐙';
      else if (lower.includes('print') || lower.includes('service')) emoji = '🖨️';
      else if (lower.includes('3d') || lower.includes('object')) emoji = '🧊';

      let categorySlug: ProductCategorySlug = 'custom-parts';
      const catLower = (item.item_group || '').toLowerCase();
      if (catLower.includes('home') || catLower.includes('decor')) categorySlug = 'home-decor';
      else if (catLower.includes('desk')) categorySlug = 'desk';
      else if (catLower.includes('gift')) categorySlug = 'gifts';
      else if (catLower.includes('mini')) categorySlug = 'miniatures';
      else if (catLower.includes('keychain')) categorySlug = 'keychains';

      const allImages: string[] = [];
      if (item.image) allImages.push(item.image);
      if (Array.isArray(item.images)) {
        for (const imgUrl of item.images) {
          if (imgUrl && !allImages.includes(imgUrl)) {
            allImages.push(imgUrl);
          }
        }
      }

      const gallery: ProductGalleryItem[] = allImages.length > 0
        ? allImages.map((imgUrl, idx) => ({
            id: `erp-img-${idx}`,
            label: idx === 0 ? 'Perspective Angle' : `View ${idx + 1}`,
            emoji,
            bgAccent: 'bg-[#FFF9ED]',
            imageUrl: imgUrl,
          }))
        : [
            { id: 'g1', label: 'Perspective Angle', emoji, bgAccent: 'bg-[#FFF9ED]' },
          ];

      return {
        id: `erp-${code}`,
        slug: rawSlug,
        name,
        category: item.item_group || 'Products',
        categorySlug,
        price: rate,
        originalPrice: rate > 0 ? Math.round(rate * 1.15) : undefined,
        rating: 5.0,
        reviewsCount: 12,
        badge: 'NEW',
        badgeColor: 'yellow',
        featured: true,
        description: desc,
        longDescription: desc,
        material: 'PLA+ Bio-Plastic',
        availability: 'In Stock — Ready to Print',
        colors: ['Standard', 'Silk Gold', 'Matte Black', 'Glacier White'],
        sizes: ['Standard Scale'],
        specs: {
          material: 'Eco PLA+ Bio-Plastic',
          layerHeight: '0.16mm Ultra Detail',
          infill: '20% Gyroid',
          printTime: '2-4 hours',
        },
        gallery,
        illustration: {
          emoji,
          bgAccent: 'bg-[#FFF9ED]',
          tag: item.stock_uom || 'Nos',
        },
        image: allImages[0] || item.image || undefined,
        images: allImages,
      };
    });

    cachedERPProducts = mapped;
    lastERPFetchTime = Date.now();
    return mapped;
  } catch (err) {
    console.warn('Live ERPNext fetch notice:', err);
    return cachedERPProducts;
  }
}

async function mergeProductsWithERPNext(baseProducts: Product[]): Promise<Product[]> {
  const erpProducts = await fetchLiveERPNextProducts();
  if (!erpProducts || erpProducts.length === 0) {
    return baseProducts;
  }

  // Clone base list
  const merged = [...baseProducts];
  const matchedCodes = new Set<string>();

  // 1. Update matched base products with ERPNext live data (e.g. rate, image, gallery)
  for (const erp of erpProducts) {
    const cleanCode = erp.id.replace(/^erp-/, '');
    const mappedSlug = ERP_TO_LOCAL_SLUG_MAP[cleanCode] || erp.slug;

    const baseIndex = merged.findIndex(
      (b) => b.slug === mappedSlug || b.slug === erp.slug || b.id === cleanCode || b.id === erp.id
    );

    if (baseIndex >= 0) {
      matchedCodes.add(cleanCode);
      const existing = merged[baseIndex];
      merged[baseIndex] = {
        ...existing,
        price: erp.price > 0 ? erp.price : existing.price,
        image: erp.image || existing.image,
        images: erp.images && erp.images.length > 0 ? erp.images : existing.images,
        gallery: erp.gallery && erp.gallery.length > 0 ? erp.gallery : existing.gallery,
        description: erp.description && erp.description.length > 10 ? erp.description : existing.description,
      };
    }
  }

  // 2. Prepend any newly created items in ERPNext that do not exist in the base catalog
  const newERPItems = erpProducts.filter((erp) => {
    const cleanCode = erp.id.replace(/^erp-/, '');
    return !matchedCodes.has(cleanCode);
  });

  return [...newERPItems, ...merged];
}

export const productRepository = {
  /**
   * Fetches all active products, with optional category/search filters.
   * Seamlessly merges real-time catalog items from ERPNext.
   */
  async getProducts(options?: {
    category?: string;
    search?: string;
    featured?: boolean;
  }): Promise<Product[]> {
    const supabase = getSupabaseClient();
    let baseList: Product[] = [...PRODUCTS];

    if (supabase) {
      try {
        let query = supabase
          .from('products')
          .select(`
            *,
            category:categories(id, name, slug),
            specs:product_specs(*),
            images:product_images(*),
            variants:product_variants(*)
          `)
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (options?.featured) {
          query = query.eq('featured', true);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          baseList = (data as unknown as HydratedDbProduct[]).map(mapDbProductToDomain);
        }
      } catch (err) {
        console.warn('Database query notice:', err);
      }
    }

    // Merge live real-time items from ERPNext
    let results = await mergeProductsWithERPNext(baseList);

    if (options?.category && options.category !== 'all') {
      results = results.filter(
        (p) => p.categorySlug === options.category || p.category.toLowerCase() === options.category?.toLowerCase()
      );
    }
    if (options?.featured) {
      results = results.filter((p) => p.featured);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q))
      );
    }

    return results;
  },

  /**
   * Fetches a single product by its slug, checking both base catalog and live ERPNext items.
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();

    // Check live products (which already includes ERPNext items)
    const all = await this.getProducts();
    const found = all.find(
      (p) =>
        p.slug.toLowerCase() === cleanSlug ||
        p.id.toLowerCase() === cleanSlug ||
        p.id.toLowerCase() === `erp-${cleanSlug}`
    );

    if (found) return found;

    return getStaticProductBySlug(slug) || null;
  },

  /**
   * Forces a fresh catalog fetch by clearing ERPNext cache.
   */
  clearCache() {
    cachedERPProducts = [];
    lastERPFetchTime = 0;
  },

  /**
   * Fetches featured products for homepage showcase.
   */
  async getFeaturedProducts(): Promise<Product[]> {
    return this.getProducts({ featured: true });
  },

  /**
   * Admin: Fetches all products including inactive ones.
   * Seamlessly returns live catalog and ERPNext items when DB is in fallback mode.
   */
  async getAllProductsAdmin(): Promise<HydratedDbProduct[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(id, name, slug),
            specs:product_specs(*),
            images:product_images(*),
            variants:product_variants(*)
          `)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data as unknown as HydratedDbProduct[];
        }
      } catch (e) {
        console.warn('Admin products DB query notice:', e);
      }
    }

    // Fallback: convert live products (including ERPNext items)
    const prods = await this.getProducts();
    return prods.map((prod, idx) => ({
      id: prod.id,
      name: prod.name,
      slug: prod.slug,
      category_id: prod.categorySlug,
      base_price: prod.price,
      original_price: prod.originalPrice || null,
      rating: prod.rating,
      reviews_count: prod.reviewsCount,
      badge: prod.badge,
      badge_color: prod.badgeColor,
      featured: prod.featured || false,
      short_description: prod.description,
      description: prod.longDescription || prod.description,
      material: prod.material || 'PLA+',
      availability_status: 'in_stock',
      sort_order: idx + 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: {
        id: prod.categorySlug,
        name: prod.category,
        slug: prod.categorySlug,
      },
      images: prod.image ? [{
        id: `img-${prod.id}`,
        product_id: prod.id,
        image_url: prod.image,
        alt_text: prod.name,
        is_primary: true,
        sort_order: 1,
        emoji_placeholder: prod.illustration.emoji,
        bg_accent: prod.illustration.bgAccent,
        created_at: new Date().toISOString(),
      }] : [],
      variants: [],
      specs: {
        id: `spec-${prod.id}`,
        product_id: prod.id,
        material_grade: prod.specs?.material || 'PLA+',
        layer_height: prod.specs?.layerHeight || '0.16mm',
        infill: prod.specs?.infill || '20%',
        print_time: prod.specs?.printTime || '2h',
        dimensions: prod.specs?.dimensions || null,
        weight: prod.specs?.weight || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    }));
  },

  /**
   * Admin: Fetches single raw product by ID for editing.
   */
  async getProductByIdAdmin(id: string): Promise<HydratedDbProduct | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name, slug),
        specs:product_specs(*),
        images:product_images(*),
        variants:product_variants(*)
      `)
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return data as unknown as HydratedDbProduct;
  },

  /**
   * Admin: Creates a new product with optional specs, variants, and images.
   */
  async createProductAdmin(payload: {
    name: string;
    slug: string;
    categoryId?: string;
    basePrice: number;
    originalPrice?: number;
    shortDescription?: string;
    description?: string;
    material?: string;
    badge?: string;
    badgeColor?: string;
    featured?: boolean;
    availabilityStatus?: 'in_stock' | 'made_to_order' | 'custom_queue' | 'out_of_stock';
    stockQuantity?: number;
    supportsPersonalization?: boolean;
    personalizationPrompt?: string;
    isActive?: boolean;
    specs?: {
      layerHeight?: string;
      infill?: string;
      printTime?: string;
      materialGrade?: string;
      nozzleSize?: string;
    };
    variants?: Array<{
      variantType: 'color' | 'size' | 'material';
      name: string;
      priceAdjustment?: number;
      stockQuantity?: number;
    }>;
  }): Promise<{ product: HydratedDbProduct | null; error?: string }> {
    const supabase = getSupabaseClient();
    if (!supabase) return { product: null, error: 'Database unconfigured' };

    const cleanSlug = payload.slug.toLowerCase().trim().replace(/\s+/g, '-');

    // Insert Product parent row
    const { data: productRow, error: pErr } = await (supabase
      .from('products') as any)
      .insert({
        name: payload.name,
        slug: cleanSlug,
        category_id: payload.categoryId || null,
        base_price: payload.basePrice,
        original_price: payload.originalPrice || null,
        short_description: payload.shortDescription || null,
        description: payload.description || null,
        material: payload.material || 'PLA+',
        badge: payload.badge || null,
        badge_color: payload.badgeColor || 'orange',
        featured: payload.featured ?? false,
        availability_status: payload.availabilityStatus || 'in_stock',
        stock_quantity: payload.stockQuantity ?? null,
        supports_personalization: payload.supportsPersonalization ?? false,
        personalization_prompt: payload.personalizationPrompt || null,
        is_active: payload.isActive ?? true,
      })
      .select()
      .single();

    if (pErr || !productRow) {
      return { product: null, error: pErr?.message || 'Failed to create product' };
    }

    const createdProduct = productRow as unknown as DbProduct;

    // Insert Product Specs if provided
    if (payload.specs) {
      await (supabase.from('product_specs') as any).insert({
        product_id: createdProduct.id,
        layer_height: payload.specs.layerHeight || '0.16mm',
        infill: payload.specs.infill || '20% Gyroid',
        print_time: payload.specs.printTime || '2-4 hours',
        material_grade: payload.specs.materialGrade || payload.material || 'Eco-Grade PLA+',
        nozzle_size: payload.specs.nozzleSize || '0.4mm',
      });
    }

    // Insert Variants if provided
    if (payload.variants && payload.variants.length > 0) {
      const variantRows = payload.variants.map((v, i) => ({
        product_id: createdProduct.id,
        variant_type: v.variantType,
        name: v.name,
        price_adjustment: v.priceAdjustment || 0,
        stock_quantity: v.stockQuantity ?? null,
        sort_order: i + 1,
        is_active: true,
      }));

      await (supabase.from('product_variants') as any).insert(variantRows);
    }

    const freshProduct = await this.getProductByIdAdmin(createdProduct.id);
    return { product: freshProduct, error: undefined };
  },

  /**
   * Admin: Updates an existing product.
   */
  async updateProductAdmin(
    id: string,
    payload: {
      name?: string;
      slug?: string;
      categoryId?: string | null;
      basePrice?: number;
      originalPrice?: number | null;
      shortDescription?: string;
      description?: string;
      material?: string;
      badge?: string | null;
      badgeColor?: string;
      featured?: boolean;
      availabilityStatus?: 'in_stock' | 'made_to_order' | 'custom_queue' | 'out_of_stock';
      stockQuantity?: number | null;
      supportsPersonalization?: boolean;
      personalizationPrompt?: string | null;
      isActive?: boolean;
      specs?: {
        layerHeight?: string;
        infill?: string;
        printTime?: string;
        materialGrade?: string;
        nozzleSize?: string;
      };
    }
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const updateData: Record<string, any> = {};
    if (payload.name !== undefined) updateData.name = payload.name;
    if (payload.slug !== undefined) updateData.slug = payload.slug.toLowerCase().trim().replace(/\s+/g, '-');
    if (payload.categoryId !== undefined) updateData.category_id = payload.categoryId;
    if (payload.basePrice !== undefined) updateData.base_price = payload.basePrice;
    if (payload.originalPrice !== undefined) updateData.original_price = payload.originalPrice;
    if (payload.shortDescription !== undefined) updateData.short_description = payload.shortDescription;
    if (payload.description !== undefined) updateData.description = payload.description;
    if (payload.material !== undefined) updateData.material = payload.material;
    if (payload.badge !== undefined) updateData.badge = payload.badge;
    if (payload.badgeColor !== undefined) updateData.badge_color = payload.badgeColor;
    if (payload.featured !== undefined) updateData.featured = payload.featured;
    if (payload.availabilityStatus !== undefined) updateData.availability_status = payload.availabilityStatus;
    if (payload.stockQuantity !== undefined) updateData.stock_quantity = payload.stockQuantity;
    if (payload.supportsPersonalization !== undefined) updateData.supports_personalization = payload.supportsPersonalization;
    if (payload.personalizationPrompt !== undefined) updateData.personalization_prompt = payload.personalizationPrompt;
    if (payload.isActive !== undefined) updateData.is_active = payload.isActive;

    const { error: pErr } = await (supabase.from('products') as any).update(updateData).eq('id', id);
    if (pErr) return { success: false, error: pErr.message };

    // Update or upsert specs if payload.specs is provided
    if (payload.specs) {
      const { data: existingSpecs } = await supabase
        .from('product_specs')
        .select('id')
        .eq('product_id', id)
        .maybeSingle();

      const specData = {
        product_id: id,
        layer_height: payload.specs.layerHeight || '0.16mm',
        infill: payload.specs.infill || '20% Gyroid',
        print_time: payload.specs.printTime || '2-4 hours',
        material_grade: payload.specs.materialGrade || payload.material || 'Eco-Grade PLA+',
        nozzle_size: payload.specs.nozzleSize || '0.4mm',
      };

      if (existingSpecs) {
        await (supabase.from('product_specs') as any).update(specData).eq('id', (existingSpecs as any).id);
      } else {
        await (supabase.from('product_specs') as any).insert(specData);
      }
    }

    return { success: true };
  },

  /**
   * Admin: Toggles product active state.
   */
  async toggleProductActiveAdmin(id: string, isActive: boolean): Promise<{ success: boolean; error?: string }> {
    return this.updateProductAdmin(id, { isActive });
  },

  /**
   * Admin: Deletes a product.
   */
  async deleteProductAdmin(id: string): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },

  /**
   * Admin: Uploads product image to Supabase Storage products bucket and adds product_images row.
   */
  async uploadProductImage(
    productId: string,
    file: File,
    isPrimary = false
  ): Promise<{ image: DbProductImage | null; error?: string }> {
    const supabase = getSupabaseClient();
    if (!supabase) return { image: null, error: 'Database unconfigured' };

    const fileExt = file.name.split('.').pop() || 'png';
    const cleanFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const storagePath = `products/${productId}/${cleanFileName}`;

    // Upload file to products storage bucket
    const { error: uploadErr } = await supabase.storage
      .from('products')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadErr) {
      return { image: null, error: uploadErr.message };
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('products').getPublicUrl(storagePath);
    const publicUrl = publicUrlData.publicUrl;

    // Insert image record in product_images
    const { data: imgData, error: dbErr } = await (supabase
      .from('product_images') as any)
      .insert({
        product_id: productId,
        storage_path: storagePath,
        public_url: publicUrl,
        alt_text: file.name,
        is_primary: isPrimary,
        bg_accent: 'bg-[#FFF9ED]',
      })
      .select()
      .single();

    if (dbErr || !imgData) {
      return { image: null, error: dbErr?.message || 'Failed to record image in database' };
    }

    return { image: imgData as unknown as DbProductImage, error: undefined };
  },

  /**
   * Admin: Deletes product image from storage and database.
   */
  async deleteProductImage(imageId: string, storagePath?: string): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    if (storagePath) {
      await supabase.storage.from('products').remove([storagePath]);
    }

    const { error } = await supabase.from('product_images').delete().eq('id', imageId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
};

