import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { categoryRepository, CategoryModel } from '../../../lib/supabase/repositories/categoryRepository';
import {
  FolderTree,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  X,
  Loader2,
} from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryModel | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryRepository.getAllCategoriesAdmin();
      setCategories(data);
    } catch (err) {
      console.warn('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenCreate = () => {
    setEditCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImageUrl('');
    setSortOrder(categories.length + 1);
    setIsActive(true);
    setErrorMsg(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryModel) => {
    setEditCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setImageUrl(cat.imageUrl || '');
    setSortOrder(cat.sortOrder);
    setIsActive(cat.isActive);
    setErrorMsg(null);
    setModalOpen(true);
  };

  const handleToggleActive = async (cat: CategoryModel) => {
    try {
      const res = await categoryRepository.toggleCategoryActive(cat.id, !cat.isActive);
      if (res.success) {
        setCategories((prev) =>
          prev.map((c) => (c.id === cat.id ? { ...c, isActive: !cat.isActive } : c))
        );
      } else {
        alert(`Failed to toggle category: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Error toggling status: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!window.confirm(`Delete category "${catName}"?`)) return;
    try {
      const res = await categoryRepository.deleteCategory(id);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(`Delete failed: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Error deleting category: ${err.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setErrorMsg('Category name is required.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    const payload = {
      name,
      slug: slug || name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
      description,
      imageUrl,
      sortOrder,
      isActive,
    };

    try {
      if (editCategory) {
        const res = await categoryRepository.updateCategory(editCategory.id, payload);
        if (res.success) {
          fetchCategories();
          setModalOpen(false);
        } else {
          setErrorMsg(res.error || 'Failed to update category.');
        }
      } else {
        const res = await categoryRepository.createCategory(payload);
        if (res.category) {
          fetchCategories();
          setModalOpen(false);
        } else {
          setErrorMsg(res.error || 'Failed to create category.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error processing request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout
      currentTab="categories"
      title="PRODUCT CATEGORIES"
      subtitle="Organize product collections, navigation hierarchy & category descriptions"
    >
      {/* HEADER CONTROLS */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-5 py-3 bg-[#FF8A00] text-white text-xs font-black font-heading uppercase tracking-wider rounded-2xl border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] hover:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3px]" />
          <span>Add New Category</span>
        </button>

        <button
          type="button"
          onClick={fetchCategories}
          disabled={loading}
          className="px-4 py-3 bg-white border-2 border-[#171717] rounded-2xl text-xs font-black uppercase text-[#171717] hover:bg-[#FFF9ED] flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_#171717]"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Reload Categories</span>
        </button>
      </div>

      {/* CATEGORIES GRID */}
      {loading ? (
        <div className="py-16 text-center bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#171717]">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FF8A00] mb-2" />
          <p className="text-xs font-bold text-[#6D6D6D]">Loading product categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="py-16 text-center bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#171717]">
          <FolderTree className="w-12 h-12 text-[#888888] mx-auto mb-3" />
          <h3 className="text-lg font-black font-heading uppercase text-[#171717]">No Categories Found</h3>
          <p className="text-xs font-semibold text-[#888888] mt-1 mb-4">
            Create categories to organize your shop items.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`
                bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717] flex flex-col justify-between
                ${!cat.isActive ? 'opacity-60 bg-gray-50' : ''}
              `}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#FFF9ED] border border-[#171717]">
                    Order #{cat.sortOrder}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleActive(cat)}
                    className={`
                      px-2.5 py-1 rounded-full text-[10px] font-black uppercase cursor-pointer border flex items-center gap-1
                      ${
                        cat.isActive
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                          : 'bg-gray-200 text-gray-700 border-gray-400'
                      }
                    `}
                  >
                    {cat.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{cat.isActive ? 'Active' : 'Disabled'}</span>
                  </button>
                </div>

                <h3 className="text-lg font-black font-heading uppercase text-[#171717] mt-1">
                  {cat.name}
                </h3>
                <p className="text-xs font-mono text-[#888888]">/{cat.slug}</p>
                <p className="text-xs font-medium text-[#555555] mt-2 line-clamp-3">
                  {cat.description || 'No description provided.'}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t-2 border-[#171717]/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(cat)}
                  className="px-3 py-1.5 bg-white text-[#171717] border-2 border-[#171717] rounded-xl text-xs font-black uppercase shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFF9ED] cursor-pointer flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-1.5 bg-red-50 text-red-600 border-2 border-red-500 rounded-xl hover:bg-red-100 cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT CATEGORY MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-3 border-[#171717] rounded-3xl w-full max-w-lg shadow-[8px_8px_0px_0px_#171717] overflow-hidden">
            <div className="bg-[#171717] text-white p-5 flex items-center justify-between border-b-3 border-[#171717]">
              <h3 className="text-lg font-black font-heading uppercase text-white">
                {editCategory ? `EDIT CATEGORY: ${editCategory.name}` : 'CREATE NEW CATEGORY'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border-2 border-red-500 text-red-900 text-xs font-bold rounded-xl">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editCategory) {
                      setSlug(e.target.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  placeholder="e.g. Desk Accessories"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="desk"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this collection..."
                  className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold"
                  />
                </div>

                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-black uppercase text-[#171717]">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="w-4 h-4 text-[#FF8A00] rounded-md border-2 border-[#171717]"
                    />
                    <span>Active Category</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-[#171717] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-[#FFF9ED] text-[#171717] text-xs font-black uppercase border-2 border-[#171717] rounded-2xl hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-[#FF8A00] text-white text-xs font-black uppercase tracking-wider border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] hover:translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[3px]" />
                      <span>{editCategory ? 'SAVE CHANGES' : 'CREATE CATEGORY'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
