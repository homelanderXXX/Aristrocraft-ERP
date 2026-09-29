import { getSupabaseClient } from './client';

export const STORAGE_BUCKETS = {
  PRODUCTS: 'products',
  CUSTOM_ORDERS: 'custom-orders',
} as const;

/**
 * Generates a standard migration-friendly object storage path for a product asset.
 * Example: "products/p1000000-0000-0000-0000-000000000001/main.webp"
 */
export function buildProductStoragePath(productId: string, filename: string): string {
  const sanitizedFilename = filename.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
  return `products/${productId}/${sanitizedFilename}`;
}

/**
 * Generates a storage path for custom order files (STL, CAD, 3MF, images).
 * Example: "custom-orders/co-12345/file.stl"
 */
export function buildCustomOrderStoragePath(orderId: string, filename: string): string {
  const sanitizedFilename = filename.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
  const timestamp = Date.now();
  return `custom-orders/${orderId}/${timestamp}-${sanitizedFilename}`;
}

/**
 * Resolves a public URL for a product image.
 * Falls back to local asset or provided fallback URL if Supabase is unconfigured or file is external.
 */
export function getProductImageUrl(storagePathOrUrl: string, fallbackUrl?: string): string {
  if (!storagePathOrUrl) return fallbackUrl || '/images/products/placeholder.webp';

  // Already a full URL or absolute path
  if (storagePathOrUrl.startsWith('http://') || storagePathOrUrl.startsWith('https://') || storagePathOrUrl.startsWith('/')) {
    return storagePathOrUrl;
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return fallbackUrl || storagePathOrUrl;
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKETS.PRODUCTS)
    .getPublicUrl(storagePathOrUrl);

  return data?.publicUrl || fallbackUrl || storagePathOrUrl;
}

/**
 * Uploads a customer 3D model/file to the custom-orders private storage bucket.
 */
export async function uploadCustomOrderFile(
  orderId: string,
  file: File
): Promise<{ path: string; error: Error | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { path: '', error: new Error('Supabase client is not configured.') };
  }

  const filePath = buildCustomOrderStoragePath(orderId, file.name);

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKETS.CUSTOM_ORDERS)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    return { path: '', error };
  }

  return { path: data.path, error: null };
}
