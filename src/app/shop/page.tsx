import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowRight,
  RefreshCw,
  SlidersHorizontal,
  AlertCircle,
  Filter,
  X,
  Upload,
  CheckCircle2,
  FileText,
  MessageSquare,
  Search,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { ProductCategorySlug, Product } from '../../types';
import { ProductCard } from '../../components/products/ProductCard';
import { ProductSort, SortOption } from '../../components/shop/ProductSort';
import { useRouter } from '../../context/RouterContext';
import { productRepository } from '../../lib/supabase/repositories/productRepository';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES_DATA, CategoryData, getCategoryBySlug } from '../../data/categories';
import { CustomOrderModal } from '../../components/shop/CustomOrderModal';
import { CategoryVisualSection } from '../../components/shop/CategoryVisualSection';
import { CategorySearchAndFilter } from '../../components/shop/CategorySearchAndFilter';
import { PageMeta } from '../../components/common/PageMeta';

export default function ShopPage() {
  const { params, navigate } = useRouter();
  const initialCategory = (params?.category as string) || (params?.categorySlug as string) || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Active Category State
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(params?.search || '');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState<string>('all');
  const [activeFilterType, setActiveFilterType] = useState<'all' | 'categories' | 'products'>('all');

  // Custom Order Modal State
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customOrderPrefill, setCustomOrderPrefill] = useState<string>('');

  // Sync category and search if router params change
  useEffect(() => {
    if (params?.categorySlug) {
      setActiveCategory(params.categorySlug);
    } else if (params?.category) {
      setActiveCategory(params.category);
    }
    if (params?.search) {
      setSearchQuery(params.search);
    }
  }, [params?.category, params?.categorySlug, params?.search]);

  // Fetch live products from ERPNext / Supabase (with static fallback)
  const fetchProducts = async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);
    try {
      if (forceRefresh) {
        productRepository.clearCache();
      }
      const data = await productRepository.getProducts();
      setProducts(data && data.length > 0 ? data : PRODUCTS);
    } catch (err: unknown) {
      console.warn('Error fetching live catalog, falling back to static catalog:', err);
      setProducts(PRODUCTS);
      setError('Could not connect to live database. Serving cached local catalog.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStartCustomOrder = (contextText?: string) => {
    setCustomOrderPrefill(contextText || '');
    setIsCustomModalOpen(true);
  };

  // Filter Categories for Large Visual Showcase
  const displayedCategories = useMemo(() => {
    let list = CATEGORIES_DATA;

    if (activeCategory !== 'all') {
      const matched = list.filter((c) => c.slug === activeCategory);
      if (matched.length > 0) return matched;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.subcategories.some((sub) => sub.toLowerCase().includes(q)) ||
          c.applications.some((app) => app.toLowerCase().includes(q)) ||
          c.recommendedMaterials.some((mat) => mat.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeCategory, searchQuery]);

  // Filter Ready-to-Order Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => {
        if (p.categorySlug === activeCategory) return true;
        // Legacy alias checks
        if (activeCategory === 'home-living' && (p.categorySlug === 'keychains-tags' || p.categorySlug === 'home-wall-decor')) return true;
        if (activeCategory === 'gadgets-electronics' && p.categorySlug === 'desk-accessories') return true;
        if (activeCategory === 'toys-games' && p.categorySlug === 'figures-minis') return true;
        if (activeCategory === 'art-collectibles' && (p.categorySlug === 'custom-gifts' || p.categorySlug === 'figures-minis')) return true;
        if (activeCategory === 'mechanical-engineering' && p.categorySlug === 'functional-parts') return true;
        return false;
      });
    }

    // 2. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q))
      );
    }

    // 3. Material filter
    if (selectedMaterialFilter !== 'all') {
      result = result.filter((p) =>
        p.material?.toLowerCase().includes(selectedMaterialFilter.toLowerCase())
      );
    }

    // 4. Sort
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
  }, [products, activeCategory, searchQuery, selectedMaterialFilter, sortBy]);

  const scrollToCategories = () => {
    const el = document.getElementById('explore-categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="What Can We Make For You? — ARISTROCRAFT 3D Printing & Digital Manufacturing"
        description="Explore 13 core disciplines of precision 3D printing: mechanical parts, electronics enclosures, automotive components, medical training models, robotics, fine art, and custom CAD manufacturing."
      />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* ================================================== */}
        {/* 1. HERO SECTION: "WHAT CAN WE MAKE FOR YOU?" */}
        {/* ================================================== */}
        <section className="relative w-full bg-white border-3 border-[#171717] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-[8px_8px_0px_0px_#171717] overflow-hidden">
          
          {/* Subtle Background Geometry */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC43C]/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF8A00]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            
            {/* STUDIO BADGE */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF9ED] border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A00] animate-pulse" />
              <span className="text-xs font-black font-heading tracking-wider uppercase text-[#171717]">
                DIGITAL MANUFACTURING & 3D STUDIO
              </span>
            </div>

            {/* MAIN HEADLINE */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-[#171717] tracking-tight leading-[1.1]">
              WHAT CAN WE MAKE FOR YOU?
            </h1>

            {/* SUPPORTING STATEMENT */}
            <p className="text-base sm:text-xl font-medium text-[#444] leading-relaxed max-w-3xl">
              From a single replacement part to a completely custom product,{' '}
              <strong className="text-[#171717] font-black">ARISTROCRAFT</strong> turns digital designs into real-world objects.
            </p>

            {/* HERO CTAS */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => handleStartCustomOrder('General Custom Order Inquiry')}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FF8A00] hover:bg-[#FF9B26] border-2 border-[#171717] rounded-xl font-black font-heading text-sm sm:text-base uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2.5 cursor-pointer"
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5px]" />
                <span>Start Custom Order</span>
              </button>

              <button
                type="button"
                onClick={scrollToCategories}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-[#FFF9ED] border-2 border-[#171717] rounded-xl font-black font-heading text-sm sm:text-base uppercase tracking-wider text-[#171717] shadow-[4px_4px_0px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Categories</span>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5px]" />
              </button>
            </div>

            {/* KEY MANUFACTURING PILLARS */}
            <div className="pt-6 border-t-2 border-[#171717]/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#FF8A00] shrink-0" />
                <span>FDM & 8K SLA Resins</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#FF8A00] shrink-0" />
                <span>±0.15mm Tolerance</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#FF8A00] shrink-0" />
                <span>Engineering Polymers</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#FF8A00] shrink-0" />
                <span>24-48h Dispatch</span>
              </div>
            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* 2. SEARCH & DISCOVERY BAR */}
        {/* ================================================== */}
        <section id="search-section" className="w-full">
          <CategorySearchAndFilter
            activeCategorySlug={activeCategory}
            onSelectCategory={(slug) => {
              setActiveCategory(slug);
              if (slug !== 'all') {
                setTimeout(() => {
                  const target = document.getElementById(`category-${slug}`);
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilterType={activeFilterType}
            onFilterTypeChange={setActiveFilterType}
          />
        </section>

        {/* ================================================== */}
        {/* 3. "EXPLORE WHAT WE MAKE" — DIRECT PRODUCT GRID & CATALOG */}
        {/* ================================================== */}
        <section id="explore-categories" className="space-y-6 scroll-mt-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b-3 border-[#171717]">
            <div>
              <div className="flex items-center gap-2 text-xs font-black font-heading text-[#FF8A00] uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse" />
                <span>DISCOVERY SHOWROOM & PRODUCT CATALOG</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#171717] tracking-tight mt-1">
                EXPLORE WHAT WE MAKE
              </h2>
              <p className="text-sm text-[#6D6D6D] font-bold mt-1 max-w-2xl">
                Direct in-stock 3D prints, desk gear, and precision components. Cash on Delivery across Bangladesh.
              </p>
            </div>

            {/* SORT & REFRESH ACTIONS */}
            <div className="flex flex-wrap items-center gap-3">
              <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
              
              <button
                type="button"
                onClick={() => fetchProducts(true)}
                title="Refresh product catalog from ERPNext"
                className="inline-flex items-center gap-2 px-3 py-2 bg-white hover:bg-[#FFF9ED] border-2 border-[#171717] rounded-xl shadow-[2px_2px_0px_0px_#171717] cursor-pointer text-xs font-black font-heading uppercase text-[#171717]"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#0070F3] ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Sync ERPNext</span>
              </button>

              {activeCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className="px-3 py-2 bg-white hover:bg-[#FFF9ED] border-2 border-[#171717] rounded-xl text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 text-[#FF8A00]" />
                  <span>Show All Products</span>
                </button>
              )}
            </div>
          </div>

          {/* QUICK CATEGORY PILLS FILTER */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black font-heading uppercase tracking-wide border-2 border-[#171717] transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[#FF8A00] text-white shadow-[2px_2px_0px_0px_#171717] -translate-y-0.5'
                  : 'bg-white text-[#171717] hover:bg-[#FFF9ED] shadow-[1.5px_1.5px_0px_0px_#171717]'
              }`}
            >
              All Products ({products.length})
            </button>
            {CATEGORIES_DATA.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black font-heading uppercase tracking-wide border-2 border-[#171717] transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#FF8A00] text-white shadow-[2px_2px_0px_0px_#171717] -translate-y-0.5'
                      : 'bg-white text-[#171717] hover:bg-[#FFF9ED] shadow-[1.5px_1.5px_0px_0px_#171717]'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* STATUS LINE */}
          <div className="flex items-center justify-between text-xs font-black font-heading uppercase text-[#6D6D6D]">
            <div className="flex flex-wrap items-center gap-2">
              <span>
                Showing {filteredProducts.length} verified item{filteredProducts.length !== 1 ? 's' : ''}
                {activeCategory !== 'all' && ` in ${activeCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0070F3]/10 text-[#0070F3] border border-[#0070F3]/30 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>Live ERPNext</span>
              </span>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#FF8A00] hover:underline cursor-pointer"
              >
                Clear Search &times;
              </button>
            )}
          </div>

          {/* THE PRODUCT GRID — IMMEDIATELY VISIBLE UNDER 'EXPLORE WHAT WE MAKE' */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-80 bg-white border-2.5 border-[#171717] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#171717] animate-pulse flex flex-col justify-between"
                >
                  <div className="w-full h-44 bg-[#FFF9ED] rounded-xl border border-[#171717]/20" />
                  <div className="space-y-2">
                    <div className="w-3/4 h-4 bg-[#171717]/10 rounded" />
                    <div className="w-1/2 h-3 bg-[#171717]/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="w-full bg-white border-3 border-[#171717] rounded-3xl p-10 sm:p-12 text-center shadow-[6px_6px_0px_0px_#171717] space-y-4">
              <AlertCircle className="w-12 h-12 text-[#FF8A00] mx-auto" />
              <h3 className="text-xl font-black font-heading text-[#171717]">
                No products match &quot;{searchQuery || activeCategory}&quot;
              </h3>
              <p className="text-sm font-medium text-[#6D6D6D] max-w-md mx-auto">
                Can&apos;t find what you need? We can custom print any 3D model, CAD file, or replacement part!
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-5 py-2.5 bg-[#FFF9ED] text-[#171717] border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_#171717] cursor-pointer"
                >
                  Reset All Filters
                </button>
                <button
                  type="button"
                  onClick={() => handleStartCustomOrder('Custom Request from Empty Catalog View')}
                  className="px-5 py-2.5 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_#171717] cursor-pointer"
                >
                  Upload Custom STL Instead
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* OPTIONAL MANUFACTURING DISCIPLINES & CAPABILITIES COLLAPSIBLE ACCORDION */}
          <div className="pt-10">
            <details className="group bg-white border-3 border-[#171717] rounded-3xl shadow-[5px_5px_0px_0px_#171717] overflow-hidden transition-all">
              <summary className="p-6 sm:p-7 flex items-center justify-between cursor-pointer list-none select-none bg-[#FFF9ED] hover:bg-[#FFC43C]/20 border-b-2 border-[#171717]/10 group-open:border-b-3 group-open:border-[#171717]">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FF8A00] text-white border-2 border-[#171717] flex items-center justify-center shadow-[2px_2px_0px_0px_#171717]">
                    <Layers className="w-5 h-5 stroke-[2.5px]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black font-heading uppercase text-[#171717]">
                      LOOKING FOR CUSTOM FABRICATION? BROWSE OUR 13 CORE DISCIPLINES
                    </h3>
                    <p className="text-xs font-semibold text-[#6D6D6D]">
                      Click to explore detailed engineering capabilities, medical, robotics, and architectural prototyping.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white border-2 border-[#171717] flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#171717] group-open:rotate-180 transition-transform">
                  <ChevronDown className="w-4 h-4 text-[#171717]" />
                </div>
              </summary>

              <div className="p-6 sm:p-8 space-y-10 bg-[#FFFDF8]">
                {displayedCategories.map((cat, idx) => (
                  <CategoryVisualSection
                    key={cat.id}
                    category={cat}
                    index={idx}
                    onStartCustomOrder={(context) => handleStartCustomOrder(context)}
                  />
                ))}
              </div>
            </details>
          </div>

        </section>

        {/* ================================================== */}
        {/* 5. "IF YOU CAN DESIGN IT, WE CAN HELP MAKE IT" CTA */}
        {/* ================================================== */}
        <section className="w-full bg-[#171717] text-white border-3 border-[#171717] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-[8px_8px_0px_0px_#FF8A00] relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 bg-[#FF8A00] text-white border border-white/20 rounded-full text-xs font-black font-heading uppercase tracking-wider">
                COMMISSION STUDIO & CAD SERVICE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight">
                IF YOU CAN DESIGN IT, WE CAN HELP MAKE IT.
              </h2>
              <p className="text-sm sm:text-base font-normal text-white/80 max-w-2xl leading-relaxed">
                Have an STL or STEP file from Thingiverse, Printables, or your own CAD workspace? Or simply a broken physical part you need duplicated? Send it to ARISTROCRAFT for an immediate material evaluation, tolerance check, and quote.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-[#FFC43C]">
                <span>✓ Direct .STL / .STEP / .OBJ support</span>
                <span>✓ In-house CAD modeling from photos</span>
                <span>✓ Express 24h turnarounds available</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                type="button"
                onClick={() => handleStartCustomOrder('Custom Project Submission')}
                className="w-full py-4 px-6 bg-[#FF8A00] hover:bg-[#FF9B26] border-2 border-white rounded-2xl font-black font-heading text-sm uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_white] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Design / Request Quote</span>
              </button>

              <a
                href="https://wa.me/8801700000000?text=Hello%20ARISTROCRAFT,%20I%20have%20a%20custom%203D%20printing%20inquiry"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 bg-white/10 hover:bg-white/20 border-2 border-white/40 rounded-2xl font-black font-heading text-xs uppercase tracking-wider text-white text-center transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#FFC43C]" />
                <span>Chat with Studio Engineer</span>
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* CUSTOM ORDER MODAL */}
      <CustomOrderModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        initialMaterial={customOrderPrefill}
      />
    </div>
  );
}
