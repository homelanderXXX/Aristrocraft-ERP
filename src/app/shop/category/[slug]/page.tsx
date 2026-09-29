import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  ChevronRight,
  ShoppingBag,
  Upload,
  RefreshCw,
  FolderOpen,
  CheckCircle2,
  AlertCircle,
  FileText,
  Layers,
  Wrench,
  Shield,
  Clock,
  Coins,
  Share2,
} from 'lucide-react';
import { Product, ProductCategorySlug } from '../../../../types';
import { ProductCard } from '../../../../components/products/ProductCard';
import { ProductSort, SortOption } from '../../../../components/shop/ProductSort';
import { useRouter } from '../../../../context/RouterContext';
import { productRepository } from '../../../../lib/supabase/repositories/productRepository';
import { PRODUCTS } from '../../../../data/products';
import { getCategoryBySlug, CATEGORIES_DATA, CategoryData } from '../../../../data/categories';
import { CustomOrderModal } from '../../../../components/shop/CustomOrderModal';
import { PageMeta } from '../../../../components/common/PageMeta';
import { getCategoryIcon } from '../../../../components/shop/CategoryVisualSection';

export default function CategoryShopPage() {
  const { params, navigate } = useRouter();
  const rawSlug = params?.categorySlug || 'home-living';

  const categoryData: CategoryData | undefined = useMemo(() => {
    return getCategoryBySlug(rawSlug);
  }, [rawSlug]);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customModalPrefill, setCustomModalPrefill] = useState<string>('');

  // Check query params for subcategory filter
  useEffect(() => {
    if (params?.sub) {
      setSelectedSubcategory(params.sub);
    }
  }, [params?.sub]);

  // Load products
  useEffect(() => {
    let isMounted = true;

    async function loadCatalog() {
      setIsLoading(true);
      setError(null);
      try {
        const live = await productRepository.getProducts();
        if (isMounted) {
          setProducts(live && live.length > 0 ? live : PRODUCTS);
        }
      } catch (err) {
        console.warn('Error loading products for category page:', err);
        if (isMounted) {
          setProducts(PRODUCTS);
          setError('Could not connect to live database. Showing local catalog.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenCustomOrder = (prefillText?: string) => {
    setCustomModalPrefill(prefillText || (categoryData ? `[Category: ${categoryData.name}]\n` : ''));
    setIsCustomModalOpen(true);
  };

  // Filter products by category slug
  const filteredProducts = useMemo(() => {
    const targetSlug = categoryData?.slug || rawSlug;
    let result = products.filter((p) => {
      if (p.categorySlug === targetSlug) return true;
      // Check legacy mapping
      if (targetSlug === 'home-living' && (p.categorySlug === 'keychains-tags' || p.categorySlug === 'home-wall-decor')) return true;
      if (targetSlug === 'gadgets-electronics' && p.categorySlug === 'desk-accessories') return true;
      if (targetSlug === 'toys-games' && p.categorySlug === 'figures-minis') return true;
      if (targetSlug === 'art-collectibles' && (p.categorySlug === 'custom-gifts' || p.categorySlug === 'figures-minis')) return true;
      if (targetSlug === 'mechanical-engineering' && p.categorySlug === 'functional-parts') return true;
      return false;
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort((a, b) => (a.badge === 'NEW' ? -1 : 1));
        break;
      case 'featured':
      default:
        break;
    }

    return result;
  }, [products, categoryData, rawSlug, searchQuery, sortBy]);

  // Gallery items filtered by selected subcategory if applicable
  const displayedGalleryItems = useMemo(() => {
    if (!categoryData) return [];
    if (selectedSubcategory === 'all') return categoryData.galleryImages;
    return categoryData.galleryImages.filter(
      (item) => item.tag.toLowerCase().includes(selectedSubcategory.toLowerCase()) ||
                item.title.toLowerCase().includes(selectedSubcategory.toLowerCase())
    );
  }, [categoryData, selectedSubcategory]);

  const categoryTitle = categoryData ? categoryData.name : rawSlug.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const categoryDesc = categoryData?.description || `Explore precision 3D printed ${categoryTitle} manufactured at ARISTROCRAFT.`;
  const IconComp = categoryData ? getCategoryIcon(categoryData.iconName) : Layers;

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title={`${categoryTitle} — ARISTROCRAFT Digital Manufacturing`}
        description={`Custom 3D printing and digital manufacturing for ${categoryTitle}. ${categoryDesc}`}
      />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* ================================================== */}
        {/* BREADCRUMB NAVIGATION */}
        {/* ================================================== */}
        <nav className="flex items-center gap-2 text-xs font-bold text-[#6D6D6D]">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="hover:text-[#FF8A00] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="hover:text-[#FF8A00] transition-colors cursor-pointer"
          >
            Shop & Disciplines
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#171717] font-black">{categoryTitle}</span>
        </nav>

        {/* ================================================== */}
        {/* CATEGORY HERO BANNER */}
        {/* ================================================== */}
        <section className="w-full bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-10 lg:p-14 shadow-[8px_8px_0px_0px_#171717] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT: TITLE, TAGLINE, CAPABILITIES */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] shrink-0">
                  <IconComp className="w-6 h-6 stroke-[2.5px]" />
                </div>
                <div>
                  <span className="text-xs font-black font-heading text-[#FF8A00] uppercase tracking-widest block">
                    MANUFACTURING DISCIPLINE
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#171717] tracking-tight">
                    {categoryTitle}
                  </h1>
                </div>
              </div>

              <p className="text-base sm:text-lg font-bold text-[#171717] leading-snug">
                {categoryData?.tagline}
              </p>

              <p className="text-sm text-[#555] leading-relaxed">
                {categoryData?.description}
              </p>

              {/* STATS / CAPABILITIES PILLS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl">
                  <span className="text-[10px] font-black font-heading text-[#6D6D6D] uppercase block">
                    LEAD TIME
                  </span>
                  <span className="text-sm font-black text-[#171717]">
                    {categoryData?.leadTime || '24-48 Hours'}
                  </span>
                </div>
                <div className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl">
                  <span className="text-[10px] font-black font-heading text-[#6D6D6D] uppercase block">
                    STARTING FROM
                  </span>
                  <span className="text-sm font-black text-[#FF8A00]">
                    ৳{categoryData?.startingPriceBDT || 250}
                  </span>
                </div>
                <div className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-black font-heading text-[#6D6D6D] uppercase block">
                    ACCURACY
                  </span>
                  <span className="text-sm font-black text-[#171717]">
                    ±0.15mm Slicing
                  </span>
                </div>
              </div>

              {/* CTAS */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenCustomOrder(`[Category: ${categoryTitle}]\nI would like to commission a custom 3D printing project for ${categoryTitle}.`)}
                  className="px-6 py-3.5 bg-[#FF8A00] hover:bg-[#FF9B26] border-2 border-[#171717] rounded-xl font-black font-heading text-xs sm:text-sm uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Start Custom Order In This Category</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('application-gallery');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3.5 bg-white hover:bg-[#FFF9ED] border-2 border-[#171717] rounded-xl font-black font-heading text-xs sm:text-sm uppercase tracking-wider text-[#171717] shadow-[3px_3px_0px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Browse Showcase Gallery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* RIGHT: HERO PHOTOGRAPHY */}
            <div className="lg:col-span-5">
              <div className="relative w-full h-72 sm:h-96 rounded-2xl border-3 border-[#171717] overflow-hidden shadow-[6px_6px_0px_0px_#171717] group">
                <img
                  src={categoryData?.heroImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'}
                  alt={categoryTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent flex items-end p-6">
                  <span className="px-3 py-1 bg-[#FFC43C] text-[#171717] border border-[#171717] font-black font-heading text-xs uppercase tracking-wider rounded-lg shadow-[2px_2px_0px_0px_#171717]">
                    ARISTROCRAFT STUDIO SPEC
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* SUBCATEGORY FILTER TABS */}
        {/* ================================================== */}
        {categoryData && categoryData.subcategories.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black font-heading uppercase text-[#171717] tracking-wider">
                EXPLORE SUBCATEGORIES ({categoryData.subcategories.length})
              </span>
              <span className="text-[11px] font-bold text-[#6D6D6D]">
                Click to filter application gallery below
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedSubcategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] shrink-0 transition-all cursor-pointer ${
                  selectedSubcategory === 'all'
                    ? 'bg-[#171717] text-white shadow-[3px_3px_0px_0px_#FF8A00]'
                    : 'bg-white text-[#171717] hover:bg-[#FFF9ED] shadow-[2px_2px_0px_0px_#171717]'
                }`}
              >
                All Subcategories
              </button>
              {categoryData.subcategories.map((sub) => {
                const isActive = selectedSubcategory.toLowerCase() === sub.toLowerCase();
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FF8A00] text-white shadow-[3px_3px_0px_0px_#171717]'
                        : 'bg-white text-[#171717] hover:bg-[#FFF9ED] shadow-[2px_2px_0px_0px_#171717]'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ================================================== */}
        {/* VISUAL APPLICATION GALLERY (REAL EXAMPLES) */}
        {/* ================================================== */}
        <section id="application-gallery" className="space-y-8 scroll-mt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b-3 border-[#171717]">
            <div>
              <span className="text-xs font-black font-heading text-[#FF8A00] uppercase tracking-widest">
                REAL APPLICATION GALLERY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#171717] tracking-tight mt-1">
                WHAT WE MANUFACTURE IN {categoryTitle.toUpperCase()}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[#6D6D6D] mt-1">
                Concrete examples of bespoke parts, functional tooling, and prototypes engineered for our clients.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedGalleryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border-3 border-[#171717] rounded-2xl p-5 shadow-[6px_6px_0px_0px_#171717] flex flex-col justify-between hover:shadow-[8px_8px_0px_0px_#171717] transition-all group"
              >
                <div>
                  {/* LARGE IMAGE */}
                  <div className="relative w-full h-56 sm:h-64 rounded-xl border-2 border-[#171717] overflow-hidden mb-4 bg-[#FFF9ED]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#171717]/90 text-white text-[10px] font-black font-heading uppercase tracking-wider backdrop-blur-sm">
                      {item.tag}
                    </div>
                  </div>

                  {/* TITLE & DESCRIPTION */}
                  <h3 className="text-lg sm:text-xl font-black font-heading text-[#171717] group-hover:text-[#FF8A00] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-[#6D6D6D] mt-0.5">
                    {item.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#444] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* BOTTOM SPEC & ORDER CTA */}
                <div className="mt-5 pt-3 border-t-2 border-[#171717]/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF8A00]">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{item.suggestedMaterial}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenCustomOrder(`[${categoryTitle} - ${item.title}]\nI need a custom part similar to: ${item.title} (${item.subtitle}).`)}
                    className="px-4 py-2 bg-[#FFF9ED] hover:bg-[#FFC43C] border-2 border-[#171717] rounded-xl text-xs font-black font-heading uppercase tracking-wider text-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center gap-1.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <span>Order Similar Part</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================== */}
        {/* RECOMMENDED MATERIALS & APPLICATIONS BREAKDOWN */}
        {/* ================================================== */}
        {categoryData && (
          <section className="w-full bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_#171717] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#171717]/20">
              <div>
                <span className="text-xs font-black font-heading text-[#FF8A00] uppercase tracking-wider">
                  ENGINEERING SPECIFICATIONS
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-[#171717]">
                  RECOMMENDED POLYMERS FOR {categoryTitle.toUpperCase()}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/custom-print')}
                className="px-4 py-2 bg-white hover:bg-[#FFC43C] border-2 border-[#171717] rounded-xl text-xs font-black font-heading uppercase tracking-wider shadow-[2px_2px_0px_0px_#171717] flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <span>Order Custom Part</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryData.recommendedMaterials.map((mat) => (
                <div
                  key={mat}
                  className="bg-white border-2 border-[#171717] rounded-xl p-4 shadow-[3px_3px_0px_0px_#171717]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#FF8A00]" />
                    <span className="text-sm font-black font-heading text-[#171717]">
                      {mat}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6D6D6D] font-medium leading-normal">
                    Optimized for layer adhesion, heat deflection, and dimensional stability in {categoryTitle}.
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================================================== */}
        {/* READY-TO-ORDER PRODUCTS IN THIS CATEGORY */}
        {/* ================================================== */}
        <section className="w-full space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b-3 border-[#171717]">
            <div>
              <span className="text-xs font-black font-heading text-[#FF8A00] uppercase tracking-widest">
                INSTANT CHECKOUT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#171717] tracking-tight mt-1">
                READY-TO-ORDER {categoryTitle.toUpperCase()} PRINTS
              </h2>
            </div>
            <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          {filteredProducts.length === 0 ? (
            <div className="w-full bg-white border-3 border-[#171717] rounded-3xl p-10 text-center shadow-[4px_4px_0px_0px_#171717] space-y-3">
              <p className="text-base font-black font-heading text-[#171717]">
                No pre-listed store items in this specific category yet.
              </p>
              <p className="text-xs font-semibold text-[#6D6D6D]">
                We manufacture custom CAD orders for {categoryTitle} daily!
              </p>
              <button
                type="button"
                onClick={() => handleOpenCustomOrder(`[Custom ${categoryTitle} Order]\nI have a CAD file/STL or idea for this category.`)}
                className="px-5 py-2.5 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_#171717] cursor-pointer"
              >
                Submit Custom Design for Quote
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* ================================================== */}
        {/* NEED SOMETHING SIMILAR? CUSTOM ORDER CTA */}
        {/* ================================================== */}
        <section className="w-full bg-[#171717] text-white border-3 border-[#171717] rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[8px_8px_0px_0px_#FF8A00] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-black font-heading uppercase text-[#FF8A00] tracking-wider">
                CUSTOM CAD COMMISSION
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight">
                NEED A CUSTOM {categoryTitle.toUpperCase()} PART?
              </h2>
              <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
                Whether you need a one-off replacement, a scaled prototype, or a 50-unit production batch, our engineering studio handles slicing, optimization, and fast fabrication.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={() => handleOpenCustomOrder(`[Custom Request: ${categoryTitle}]\nDescription of what I need manufactured:`)}
                className="w-full py-4 px-6 bg-[#FF8A00] hover:bg-[#FF9B26] border-2 border-white rounded-2xl font-black font-heading text-xs sm:text-sm uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_white] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Send Your Design / CAD File</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* CUSTOM ORDER MODAL */}
      <CustomOrderModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        initialMaterial={customModalPrefill}
      />
    </div>
  );
}
