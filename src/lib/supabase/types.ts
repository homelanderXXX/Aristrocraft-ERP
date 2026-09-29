/**
 * ARISTROCRAFT — Supabase Database TypeScript Definitions
 * PostgreSQL Relational Schema representation for Phase 3A
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Centralized status definitions
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'printing'
  | 'ready'
  | 'dispatched'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type CustomOrderStatus =
  | 'pending'
  | 'submitted'
  | 'reviewing'
  | 'quoted'
  | 'approved'
  | 'printing'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export type AvailabilityStatus =
  | 'in_stock'
  | 'made_to_order'
  | 'custom_queue'
  | 'out_of_stock';

export type VariantType = 'color' | 'size' | 'material';

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          short_description: string | null;
          description: string | null;
          category_id: string | null;
          base_price: number;
          original_price: number | null;
          currency: string;
          featured: boolean;
          availability_status: AvailabilityStatus;
          stock_quantity: number | null;
          material: string | null;
          badge: string | null;
          badge_color: string | null;
          rating: number;
          reviews_count: number;
          supports_personalization: boolean;
          personalization_prompt: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          short_description?: string | null;
          description?: string | null;
          category_id?: string | null;
          base_price: number;
          original_price?: number | null;
          currency?: string;
          featured?: boolean;
          availability_status?: AvailabilityStatus;
          stock_quantity?: number | null;
          material?: string | null;
          badge?: string | null;
          badge_color?: string | null;
          rating?: number;
          reviews_count?: number;
          supports_personalization?: boolean;
          personalization_prompt?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          short_description?: string | null;
          description?: string | null;
          category_id?: string | null;
          base_price?: number;
          original_price?: number | null;
          currency?: string;
          featured?: boolean;
          availability_status?: AvailabilityStatus;
          stock_quantity?: number | null;
          material?: string | null;
          badge?: string | null;
          badge_color?: string | null;
          rating?: number;
          reviews_count?: number;
          supports_personalization?: boolean;
          personalization_prompt?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_specs: {
        Row: {
          id: string;
          product_id: string;
          layer_height: string;
          infill: string;
          print_time: string;
          material_grade: string;
          nozzle_size: string | null;
          additional_specs: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          layer_height?: string;
          infill?: string;
          print_time?: string;
          material_grade?: string;
          nozzle_size?: string | null;
          additional_specs?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          layer_height?: string;
          infill?: string;
          print_time?: string;
          material_grade?: string;
          nozzle_size?: string | null;
          additional_specs?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          storage_path: string | null;
          public_url: string;
          alt_text: string | null;
          sort_order: number;
          is_primary: boolean;
          emoji_placeholder: string | null;
          bg_accent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          storage_path?: string | null;
          public_url: string;
          alt_text?: string | null;
          sort_order?: number;
          is_primary?: boolean;
          emoji_placeholder?: string | null;
          bg_accent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          storage_path?: string | null;
          public_url?: string;
          alt_text?: string | null;
          sort_order?: number;
          is_primary?: boolean;
          emoji_placeholder?: string | null;
          bg_accent?: string | null;
          created_at?: string;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          variant_type: VariantType;
          name: string;
          price_adjustment: number;
          sku: string | null;
          stock_quantity: number | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          variant_type: VariantType;
          name: string;
          price_adjustment?: number;
          sku?: string | null;
          stock_quantity?: number | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          variant_type?: VariantType;
          name?: string;
          price_adjustment?: number;
          sku?: string | null;
          stock_quantity?: number | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      customers: {
        Row: {
          id: string;
          auth_user_id: string | null;
          name: string;
          email: string;
          phone: string | null;
          default_delivery_address: string | null;
          city: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id?: string | null;
          name: string;
          email: string;
          phone?: string | null;
          default_delivery_address?: string | null;
          city?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string | null;
          name?: string;
          email?: string;
          phone?: string | null;
          default_delivery_address?: string | null;
          city?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_id: string | null;
          status: OrderStatus;
          subtotal: number;
          delivery_fee: number;
          discount: number;
          total: number;
          currency: string;
          customer_name_snapshot: string;
          customer_phone_snapshot: string;
          customer_email_snapshot: string | null;
          delivery_address_snapshot: string;
          delivery_city_snapshot: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          customer_id?: string | null;
          status?: OrderStatus;
          subtotal: number;
          delivery_fee?: number;
          discount?: number;
          total: number;
          currency?: string;
          customer_name_snapshot: string;
          customer_phone_snapshot: string;
          customer_email_snapshot?: string | null;
          delivery_address_snapshot: string;
          delivery_city_snapshot?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_id?: string | null;
          status?: OrderStatus;
          subtotal?: number;
          delivery_fee?: number;
          discount?: number;
          total?: number;
          currency?: string;
          customer_name_snapshot?: string;
          customer_phone_snapshot?: string;
          customer_email_snapshot?: string | null;
          delivery_address_snapshot?: string;
          delivery_city_snapshot?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_name_snapshot: string;
          unit_price: number;
          quantity: number;
          selected_color: string | null;
          selected_size: string | null;
          selected_material: string | null;
          personalization_text: string | null;
          line_total: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_name_snapshot: string;
          unit_price: number;
          quantity?: number;
          selected_color?: string | null;
          selected_size?: string | null;
          selected_material?: string | null;
          personalization_text?: string | null;
          line_total: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          product_name_snapshot?: string;
          unit_price?: number;
          quantity?: number;
          selected_color?: string | null;
          selected_size?: string | null;
          selected_material?: string | null;
          personalization_text?: string | null;
          line_total?: number;
          created_at?: string;
        };
      };
      custom_orders: {
        Row: {
          id: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          description: string;
          reference_image_url: string | null;
          uploaded_file_url: string | null;
          requested_color: string | null;
          requested_size: string | null;
          estimated_price: number | null;
          status: CustomOrderStatus;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          description: string;
          reference_image_url?: string | null;
          uploaded_file_url?: string | null;
          requested_color?: string | null;
          requested_size?: string | null;
          estimated_price?: number | null;
          status?: CustomOrderStatus;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          description?: string;
          reference_image_url?: string | null;
          uploaded_file_url?: string | null;
          requested_color?: string | null;
          requested_size?: string | null;
          estimated_price?: number | null;
          status?: CustomOrderStatus;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          auth_user_id: string;
          full_name: string | null;
          role: 'admin' | 'staff';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id: string;
          full_name?: string | null;
          role?: 'admin' | 'staff';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string;
          full_name?: string | null;
          role?: 'admin' | 'staff';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Database helper type shortcuts
export type DbCategory = Database['public']['Tables']['categories']['Row'];
export type DbProduct = Database['public']['Tables']['products']['Row'];
export type DbProductSpecs = Database['public']['Tables']['product_specs']['Row'];
export type DbProductImage = Database['public']['Tables']['product_images']['Row'];
export type DbProductVariant = Database['public']['Tables']['product_variants']['Row'];
export type DbCustomer = Database['public']['Tables']['customers']['Row'];
export type DbOrder = Database['public']['Tables']['orders']['Row'];
export type DbOrderItem = Database['public']['Tables']['order_items']['Row'];
export type DbCustomOrder = Database['public']['Tables']['custom_orders']['Row'];
export type DbProfile = Database['public']['Tables']['profiles']['Row'];
