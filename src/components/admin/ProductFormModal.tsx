import React, { useState, useEffect } from 'react';
import { productRepository, HydratedDbProduct } from '../../lib/supabase/repositories/productRepository';
import { categoryRepository, CategoryModel } from '../../lib/supabase/repositories/categoryRepository';
import { X, Upload, Trash2, Loader2, Image as ImageIcon, Plus, Check } from 'lucide-react';

interface ProductFormModalProps {
  product?: HydratedDbProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  product,
  isOpen,
  onClose,
  onSaveSuccess,
}) => {
  const isEdit = !!product;

  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [basePrice, setBasePrice] = useState<number | ''>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('PLA+ Bio-Plastic');
  const [badge, setBadge] = useState('BESTSELLER');
  const [badgeColor, setBadgeColor] = useState('orange');
  const [featured, setFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [availabilityStatus, setAvailabilityStatus] = useState<
    'in_stock' | 'made_to_order' | 'custom_queue' | 'out_of_stock'
  >('in_stock');
  const [stockQuantity, setStockQuantity] = useState<number | ''>(20);
  const [supportsPersonalization, setSupportsPersonalization] = useState(false);
  const [personalizationPrompt, setPersonalizationPrompt] = useState('');

  // Specs states
  const [layerHeight, setLayerHeight] = useState('0.16mm High Detail');
  const [infill, setInfill] = useState('20% Gyroid');
  const [printTime, setPrintTime] = useState('2-4 hours');
  const [nozzleSize, setNozzleSize] = useState('0.4mm');

  // Image upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [images, setImages] = useState(product?.images || []);

  useEffect(() => {
    async function loadCategories() {
      const cats = await categoryRepository.getAllCategoriesAdmin();
      setCategories(cats);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setSlug(product.slug || '');
      setCategoryId(product.category_id || '');
      setBasePrice(product.base_price ? Number(product.base_price) : '');
      setOriginalPrice(product.original_price ? Number(product.original_price) : '');
      setShortDescription(product.short_description || '');
      setDescription(product.description || '');
      setMaterial(product.material || 'PLA+ Bio-Plastic');
      setBadge(product.badge || 'BESTSELLER');
      setBadgeColor(product.badge_color || 'orange');
      setFeatured(!!product.featured);
      setIsActive(!!product.is_active);
      setAvailabilityStatus(product.availability_status || 'in_stock');
      setStockQuantity(product.stock_quantity !== null ? product.stock_quantity : '');
      setSupportsPersonalization(!!product.supports_personalization);
      setPersonalizationPrompt(product.personalization_prompt || '');

      if (product.specs) {
        setLayerHeight(product.specs.layer_height || '0.16mm High Detail');
        setInfill(product.specs.infill || '20% Gyroid');
        setPrintTime(product.specs.print_time || '2-4 hours');
        setNozzleSize(product.specs.nozzle_size || '0.4mm');
      }

      setImages(product.images || []);
    } else {
      // Reset form
      setName('');
      setSlug('');
      setCategoryId('');
      setBasePrice('');
      setOriginalPrice('');
      setShortDescription('');
      setDescription('');
      setMaterial('PLA+ Bio-Plastic');
      setBadge('BESTSELLER');
      setBadgeColor('orange');
      setFeatured(false);
      setIsActive(true);
      setAvailabilityStatus('in_stock');
      setStockQuantity(20);
      setSupportsPersonalization(false);
      setPersonalizationPrompt('');
      setLayerHeight('0.16mm High Detail');
      setInfill('20% Gyroid');
      setPrintTime('2-4 hours');
      setNozzleSize('0.4mm');
      setImages([]);
    }
  }, [product, isOpen]);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit) {
      setSlug(val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !product?.id) return;

    setUploadingImage(true);
    try {
      const res = await productRepository.uploadProductImage(product.id, file, images.length === 0);
      if (res.image) {
        setImages((prev) => [...prev, res.image!]);
      } else {
        alert(`Upload error: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Failed to upload file: ${err.message}`);
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleDeleteImage = async (imageId: string, storagePath?: string) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      const res = await productRepository.deleteProductImage(imageId, storagePath);
      if (res.success) {
        setImages((prev) => prev.filter((img) => img.id !== imageId));
      } else {
        alert(`Delete error: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Error deleting image: ${err.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || basePrice === '') {
      setErrorMsg('Product name and base price are required.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const payload = {
      name,
      slug: slug || name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
      categoryId: categoryId || undefined,
      basePrice: Number(basePrice),
      originalPrice: originalPrice !== '' ? Number(originalPrice) : undefined,
      shortDescription,
      description,
      material,
      badge,
      badgeColor,
      featured,
      isActive,
      availabilityStatus,
      stockQuantity: stockQuantity !== '' ? Number(stockQuantity) : undefined,
      supportsPersonalization,
      personalizationPrompt,
      specs: {
        layerHeight,
        infill,
        printTime,
        materialGrade: material,
        nozzleSize,
      },
    };

    try {
      if (isEdit && product?.id) {
        const res = await productRepository.updateProductAdmin(product.id, payload);
        if (res.success) {
          onSaveSuccess();
          onClose();
        } else {
          setErrorMsg(res.error || 'Failed to update product.');
        }
      } else {
        const res = await productRepository.createProductAdmin(payload as any);
        if (res.product) {
          onSaveSuccess();
          onClose();
        } else {
          setErrorMsg(res.error || 'Failed to create product.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error saving product.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-3 border-[#171717] rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-[10px_10px_0px_0px_#171717]">
        {/* MODAL HEADER */}
        <div className="bg-[#171717] text-white p-6 sticky top-0 z-10 flex items-center justify-between border-b-3 border-[#171717]">
          <div>
            <h2 className="text-xl font-black font-heading uppercase text-white">
              {isEdit ? `EDIT PRODUCT: ${product?.name}` : 'CREATE NEW CATALOG PRODUCT'}
            </h2>
            <p className="text-xs text-[#FFC43C] font-semibold">
              Configure pricing, 3D printing specs, availability & image assets
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* MODAL BODY */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-500 text-red-900 text-xs font-bold">
              {errorMsg}
            </div>
          )}

          {/* BASIC PRODUCT INFORMATION */}
          <div className="space-y-4">
            <h3 className="text-sm font-black font-heading uppercase text-[#171717] pb-2 border-b-2 border-[#171717]">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Voronoi Geometric Lamp"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="voronoi-geometric-lamp"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold cursor-pointer"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Base Price (BDT) *
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="750"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Original Price (BDT)
                </label>
                <input
                  type="number"
                  min={0}
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="950"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                Short Description (Card Subtitle)
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Intricate Voronoi lattice shade with warm ambient glow."
                className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                Full Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed features, materials, bulb compatibility..."
                className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>
          </div>

          {/* 3D PRINT TECHNICAL SPECS & AVAILABILITY */}
          <div className="space-y-4">
            <h3 className="text-sm font-black font-heading uppercase text-[#171717] pb-2 border-b-2 border-[#171717]">
              2. Technical 3D Specs & Inventory
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Primary Material
                </label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="Eco-grade PLA+"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Layer Height
                </label>
                <input
                  type="text"
                  value={layerHeight}
                  onChange={(e) => setLayerHeight(e.target.value)}
                  placeholder="0.16mm High Detail"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Infill Density
                </label>
                <input
                  type="text"
                  value={infill}
                  onChange={(e) => setInfill(e.target.value)}
                  placeholder="20% Gyroid"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Print Duration
                </label>
                <input
                  type="text"
                  value={printTime}
                  onChange={(e) => setPrintTime(e.target.value)}
                  placeholder="2-4 hours"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Availability Status
                </label>
                <select
                  value={availabilityStatus}
                  onChange={(e) => setAvailabilityStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold cursor-pointer"
                >
                  <option value="in_stock">In Stock — Ready to Ship</option>
                  <option value="made_to_order">Made to Order</option>
                  <option value="custom_queue">Custom Print Queue</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Badge Tag
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="BESTSELLER"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Stock Units
                </label>
                <input
                  type="number"
                  min={0}
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="20"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-black uppercase text-[#171717]">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#FF8A00] rounded-md border-2 border-[#171717] focus:ring-0"
                />
                <span>Feature on Homepage Showcase</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-black uppercase text-[#171717]">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-[#FF8A00] rounded-md border-2 border-[#171717] focus:ring-0"
                />
                <span>Active (Visible in Shop)</span>
              </label>
            </div>
          </div>

          {/* PERSONALIZATION OPTIONS */}
          <div className="space-y-3">
            <h3 className="text-sm font-black font-heading uppercase text-[#171717] pb-2 border-b-2 border-[#171717]">
              3. Personalization & Engraving
            </h3>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-black uppercase text-[#171717]">
              <input
                type="checkbox"
                checked={supportsPersonalization}
                onChange={(e) => setSupportsPersonalization(e.target.checked)}
                className="w-4 h-4 text-[#FF8A00] rounded-md border-2 border-[#171717] focus:ring-0"
              />
              <span>Enable Custom Name / Text Input for Buyer</span>
            </label>

            {supportsPersonalization && (
              <input
                type="text"
                value={personalizationPrompt}
                onChange={(e) => setPersonalizationPrompt(e.target.value)}
                placeholder="e.g. Enter name or custom text to emboss on keychain (max 15 characters)..."
                className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold"
              />
            )}
          </div>

          {/* IMAGE ASSETS & GALLERY MANAGER */}
          {isEdit && product?.id && (
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-black font-heading uppercase text-[#171717] pb-2 border-b-2 border-[#171717]">
                4. Image Upload & Gallery (Supabase Storage)
              </h3>

              {/* UPLOAD CONTROL */}
              <div className="flex items-center gap-3">
                <label className="px-4 py-2.5 bg-[#FF8A00] text-white text-xs font-black uppercase tracking-wider rounded-2xl border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2">
                  {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>{uploadingImage ? 'Uploading Image...' : 'Upload Product Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
                <span className="text-[11px] font-semibold text-[#888888]">
                  Saves directly to 'products' bucket
                </span>
              </div>

              {/* PREVIEW GALLERY GRID */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="relative border-2 border-[#171717] rounded-2xl bg-[#FFF9ED] p-2 overflow-hidden shadow-[2px_2px_0px_0px_#171717]"
                    >
                      <img
                        src={img.public_url}
                        alt={img.alt_text || 'Product view'}
                        className="w-full h-24 object-cover rounded-xl border border-[#171717]"
                      />
                      <div className="flex items-center justify-between mt-2 px-1">
                        <span className="text-[10px] font-bold text-[#171717] truncate max-w-[80px]">
                          {img.is_primary ? 'Primary' : 'Gallery'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(img.id, img.storage_path || undefined)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Delete Image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SUBMIT BUTTONS */}
          <div className="pt-6 border-t-3 border-[#171717] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-[#FFF9ED] text-[#171717] text-xs font-black font-heading uppercase border-2 border-[#171717] rounded-2xl hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#FF8A00] text-white text-xs font-black font-heading uppercase tracking-wider border-3 border-[#171717] rounded-2xl shadow-[4px_4px_0px_0px_#171717] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#171717] transition-all cursor-pointer flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SAVING...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3px]" />
                  <span>{isEdit ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
