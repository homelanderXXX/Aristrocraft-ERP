import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  ShoppingBag,
  Search,
  Flame,
  Upload,
  Layers,
  CheckCircle2,
  Grid,
  ChevronDown,
} from 'lucide-react';
import { FEATURED_PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';
import { useRouter } from '../../context/RouterContext';
import { ScrollReveal } from '../animation/ScrollReveal';

type CategoryFilter = 'all' | 'bestseller' | 'home-living' | 'gadgets' | 'engineering' | 'art-toys' | 'stem';

export const WhatCanWeMakeSection: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const categories = [
    { id: 'all' as CategoryFilter, label: 'All Products', count: FEATURED_PRODUCTS.length },
    { id: 'bestseller' as CategoryFilter, label: 'Bestsellers', icon: Flame },
    { id: 'home-living' as CategoryFilter, label: 'Home & Living' },
    { id: 'gadgets' as CategoryFilter, label: 'Gadgets & Tech' },
    { id: 'engineering' as CategoryFilter, label: 'Engineering Parts' },
    { id: 'art-toys' as CategoryFilter, label: 'Toys & Art' },
    { id: 'stem' as CategoryFilter, label: 'Education & STEM' },
  ];

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return FEATURED_PRODUCTS.filter((product) => {
      // Category condition
      let matchesCategory = true;
      if (selectedCategory === 'bestseller') {
        matchesCategory = product.badge === 'BESTSELLER' || product.badge === 'POPULAR' || product.rating >= 4.9;
      } else if (selectedCategory === 'home-living') {
        matchesCategory = product.categorySlug === 'home-living' || product.category.toLowerCase().includes('home');
      } else if (selectedCategory === 'gadgets') {
        matchesCategory = product.categorySlug === 'gadgets-electronics' || product.category.toLowerCase().includes('gadget') || product.category.toLowerCase().includes('electronics');
      } else if (selectedCategory === 'engineering') {
        matchesCategory = product.categorySlug === 'mechanical-engineering' || product.categorySlug === 'robotics-drones' || product.categorySlug === 'automotive' || product.category.toLowerCase().includes('mechanical') || product.category.toLowerCase().includes('engineering');
      } else if (selectedCategory === 'art-toys') {
        matchesCategory = product.categorySlug === 'toys-games' || product.categorySlug === 'art-collectibles' || product.categorySlug === 'jewelry-fashion' || product.category.toLowerCase().includes('art') || product.category.toLowerCase().includes('toy');
      } else if (selectedCategory === 'stem') {
        matchesCategory = product.categorySlug === 'education-stem' || product.categorySlug === 'medical-dental' || product.category.toLowerCase().includes('education') || product.category.toLowerCase().includes('medical');
      }

      // Search query condition
      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <section
      id="what-we-make"
      aria-labelledby="what-we-make-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF9ED] border-b-3 border-[#171717]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8A00] text-white border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1deg] mb-3.5 select-none">
                <Grid className="w-3.5 h-3.5" />
                <span className="text-[11px] sm:text-xs font-black font-heading tracking-wider uppercase">
                  EXPLORE WHAT WE MAKE
                </span>
              </div>
              <h2
                id="what-we-make-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#171717] uppercase leading-none"
              >
                EXPLORE WHAT WE <span className="text-[#FF8A00]">MAKE</span>
              </h2>
              <p className="text-base sm:text-lg font-semibold text-[#6D6D6D] mt-2 max-w-2xl">
                Ready-to-order 3D printed creations, desk setups, and mechanical components. Add directly to cart with Cash on Delivery across Bangladesh.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
              <button
                onClick={() => navigate('/custom-print')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading uppercase text-[#171717] hover:text-[#FF8A00] bg-white border-2 border-[#171717] rounded-xl px-4 sm:px-5 py-3 shadow-[3px_3px_0px_0px_#171717] hover:shadow-[5px_5px_0px_0px_#171717] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 stroke-[2.5px] text-[#FF8A00]" />
                <span>UPLOAD CUSTOM STL</span>
              </button>

              <button
                onClick={() => navigate('/shop')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading uppercase text-white bg-[#FF8A00] hover:bg-[#E57A00] border-2 border-[#171717] rounded-xl px-4 sm:px-5 py-3 shadow-[3px_3px_0px_0px_#171717] hover:shadow-[5px_5px_0px_0px_#171717] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>OPEN FULL SHOP</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* QUICK SEARCH & FILTER PILLS */}
        <div className="bg-white border-2.5 sm:border-3 border-[#171717] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#171717] mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setVisibleCount(8);
                    }}
                    className={`
                      px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black font-heading uppercase tracking-wide
                      border-2 border-[#171717] transition-all cursor-pointer flex items-center gap-1.5
                      ${
                        isActive
                          ? 'bg-[#FF8A00] text-white shadow-[2px_2px_0px_0px_#171717] -translate-y-0.5'
                          : 'bg-[#FFF9ED] text-[#171717] hover:bg-[#FFC43C] shadow-[1.5px_1.5px_0px_0px_#171717]'
                      }
                    `}
                  >
                    {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                    <span>{cat.label}</span>
                    {cat.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-white' : 'bg-[#171717]/10 text-[#171717]'}`}>
                        {cat.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Instant Search input */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-[#6D6D6D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(8);
                }}
                className="w-full pl-9 pr-3 py-2 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl text-xs sm:text-sm font-bold text-[#171717] placeholder:text-[#8C8C8C] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[inset_1.5px_1.5px_0px_rgba(0,0,0,0.05)]"
              />
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-5">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border-2.5 border-[#171717] rounded-2xl p-10 text-center shadow-[4px_4px_0px_0px_#171717]">
            <Layers className="w-12 h-12 mx-auto text-[#6D6D6D] mb-3" />
            <h3 className="text-lg font-black font-heading uppercase text-[#171717] mb-1">
              No matching products found
            </h3>
            <p className="text-sm font-semibold text-[#6D6D6D] max-w-md mx-auto mb-4">
              We couldn&apos;t find an item matching &quot;{searchQuery}&quot;. Have a custom design or STL file? We can print anything!
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#FFC43C] text-[#171717] border-2 border-[#171717] rounded-xl text-xs font-black font-heading uppercase shadow-[2px_2px_0px_0px_#171717] cursor-pointer"
              >
                Clear Filters
              </button>
              <button
                onClick={() => navigate('/custom-print')}
                className="px-4 py-2 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-xl text-xs font-black font-heading uppercase shadow-[2px_2px_0px_0px_#171717] cursor-pointer"
              >
                Upload Custom File
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM ACTION BAR */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border-2.5 border-[#171717] rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_#171717]">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#34D399] border-2 border-[#171717] flex items-center justify-center text-[#171717] shrink-0 shadow-[2px_2px_0px_0px_#171717]">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5px]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black font-heading uppercase text-[#171717]">
                Showing {displayedProducts.length} of {filteredProducts.length} Products
              </p>
              <p className="text-xs font-semibold text-[#6D6D6D]">
                Cash on Delivery • Safe Packaging • 24–48hr Dispatch across Bangladesh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasMore && (
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading uppercase text-[#171717] hover:text-[#FF8A00] bg-[#FFF9ED] hover:bg-[#FFC43C] border-2 border-[#171717] rounded-xl px-4 py-2.5 shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer"
              >
                <span>SHOW MORE</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading uppercase text-white bg-[#171717] hover:bg-[#FF8A00] border-2 border-[#171717] rounded-xl px-5 py-2.5 shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>EXPLORE ENTIRE SHOP</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};


