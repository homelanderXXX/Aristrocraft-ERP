import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { useRouter } from '../../../context/RouterContext';
import { productRepository, HydratedDbProduct } from '../../../lib/supabase/repositories/productRepository';
import { categoryRepository, CategoryModel } from '../../../lib/supabase/repositories/categoryRepository';
import { ProductFormModal } from '../../../components/admin/ProductFormModal';
import {
  Plus,
  Search,
  RefreshCw,
  Edit,
  Trash2,
  Box,
  Eye,
  EyeOff,
  Star,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [products, setProducts] = useState<HydratedDbProduct[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal controls
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<HydratedDbProduct | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        productRepository.getAllProductsAdmin(),
        categoryRepository.getAllCategoriesAdmin(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.warn('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleActive = async (product: HydratedDbProduct) => {
    const newActiveState = !product.is_active;
    try {
      const res = await productRepository.toggleProductActiveAdmin(product.id, newActiveState);
      if (res.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, is_active: newActiveState } : p))
        );
      } else {
        alert(`Failed to update active state: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Error toggling product status: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (productId: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await productRepository.deleteProductAdmin(productId);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } else {
        alert(`Delete error: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Error deleting product: ${err.message}`);
    }
  };

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (product: HydratedDbProduct) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat =
      selectedCategory === 'all' || p.category_id === selectedCategory || p.category?.slug === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.material && p.material.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <AdminLayout
      currentTab="products"
      title="PRODUCT CATALOG"
      subtitle="Create, edit, feature, and manage 3D printing products in live inventory"
    >
      {/* FILTER & CREATE HEADER */}
      <div className="bg-white border-3 border-[#171717] rounded-3xl p-5 shadow-[6px_6px_0px_0px_#171717] mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleOpenCreate}
              className="w-full sm:w-auto px-5 py-3 bg-[#FF8A00] text-white text-xs font-black font-heading uppercase tracking-wider rounded-2xl border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              <span>Add New Product</span>
            </button>

            <button
              type="button"
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-3 bg-white border-2 border-[#171717] rounded-2xl text-xs font-black uppercase text-[#171717] hover:bg-[#FFF9ED] flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_#171717]"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Catalog</span>
            </button>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold text-[#171717] cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      {loading ? (
        <div className="py-16 text-center bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#171717]">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FF8A00] mb-2" />
          <p className="text-xs font-bold text-[#6D6D6D]">Loading product catalog...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#171717]">
          <Box className="w-12 h-12 text-[#888888] mx-auto mb-3" />
          <h3 className="text-lg font-black font-heading uppercase text-[#171717]">No Products Found</h3>
          <p className="text-xs font-semibold text-[#888888] mt-1 mb-4">
            No items match your search filter or category selection.
          </p>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-5 py-2.5 bg-[#FF8A00] text-white text-xs font-black uppercase tracking-wider rounded-2xl border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Product</span>
          </button>
        </div>
      ) : (
        <div className="bg-white border-3 border-[#171717] rounded-3xl shadow-[6px_6px_0px_0px_#171717] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#171717] text-white border-b-3 border-[#171717] text-[11px] font-black uppercase tracking-wider font-heading">
                  <th className="p-4">Product Info</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price (BDT)</th>
                  <th className="p-4">3D Material & Specs</th>
                  <th className="p-4">Status & Visibility</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#171717]/10 text-xs font-bold text-[#171717]">
                {filteredProducts.map((p) => {
                  const primaryImg = p.images?.find((i) => i.is_primary) || p.images?.[0];

                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-[#FFF9ED]/60 transition-colors ${
                        !p.is_active ? 'opacity-60 bg-gray-50' : ''
                      }`}
                    >
                      {/* PRODUCT INFO */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl flex items-center justify-center font-black text-xl shrink-0 overflow-hidden">
                            {primaryImg?.public_url ? (
                              <img
                                src={primaryImg.public_url}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span>📦</span>
                            )}
                          </div>
                          <div>
                            <span className="font-black text-sm text-[#171717] block">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-[#888888] font-mono block mt-0.5">
                              /{p.slug}
                            </span>
                            {p.badge && (
                              <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#FFC43C] text-[#171717] border border-[#171717] mt-1">
                                {p.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td className="p-4">
                        <span className="font-bold text-xs block text-[#171717]">
                          {p.category?.name || 'Uncategorized'}
                        </span>
                      </td>

                      {/* PRICE */}
                      <td className="p-4 font-mono">
                        <span className="font-black text-sm text-[#171717] block">
                          ৳{p.base_price}
                        </span>
                        {p.original_price && (
                          <span className="text-[10px] text-[#888888] line-through block">
                            ৳{p.original_price}
                          </span>
                        )}
                      </td>

                      {/* SPECS */}
                      <td className="p-4">
                        <span className="text-xs font-bold text-[#444444] block">
                          {p.material || 'PLA+'}
                        </span>
                        <span className="text-[10px] text-[#888888] block mt-0.5">
                          {p.specs?.layer_height || '0.16mm'} • {p.specs?.infill || '20% Infill'}
                        </span>
                      </td>

                      {/* VISIBILITY TOGGLES */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleActive(p)}
                            className={`
                              px-2.5 py-1 rounded-full text-[10px] font-black uppercase cursor-pointer border transition-all flex items-center gap-1
                              ${
                                p.is_active
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                                  : 'bg-gray-200 text-gray-700 border-gray-400'
                              }
                            `}
                          >
                            {p.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{p.is_active ? 'Active' : 'Hidden'}</span>
                          </button>

                          {p.featured && (
                            <span className="px-2 py-1 rounded-full text-[10px] font-black uppercase bg-[#FF8A00] text-white border border-[#171717] flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              <span>Featured</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="p-2 bg-white text-[#171717] border-2 border-[#171717] rounded-xl hover:bg-[#FFF9ED] shadow-[2px_2px_0px_0px_#171717] cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-2 bg-red-50 text-red-600 border-2 border-red-500 rounded-xl hover:bg-red-100 cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FORM MODAL */}
      <ProductFormModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaveSuccess={fetchData}
      />
    </AdminLayout>
  );
};
