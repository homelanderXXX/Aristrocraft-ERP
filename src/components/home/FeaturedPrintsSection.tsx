import React, { useState, useMemo } from 'react';
import { ArrowRight, Layers, Compass } from 'lucide-react';
import { FEATURED_PRINTS } from '../../data/featuredPrints';
import { PrintShowcaseCard } from './PrintShowcaseCard';
import { FeaturedPrint, PrintCategorySlug } from '../../types';

interface FilterCategory {
  label: string;
  slug: PrintCategorySlug;
}

interface FeaturedPrintsSectionProps {
  onViewAllProducts?: () => void;
  onViewProduct?: (print: FeaturedPrint) => void;
}

export const FeaturedPrintsSection: React.FC<FeaturedPrintsSectionProps> = ({
  onViewAllProducts,
  onViewProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PrintCategorySlug>('all');

  const categories: FilterCategory[] = [
    { label: 'All', slug: 'all' },
    { label: 'Home & Decor', slug: 'home-decor' },
    { label: 'Gaming', slug: 'gaming' },
    { label: 'Figures', slug: 'figures' },
    { label: 'Utility', slug: 'utility' },
    { label: 'Gifts', slug: 'gifts' },
  ];

  const filteredPrints = useMemo(() => {
    if (selectedCategory === 'all') {
      return FEATURED_PRINTS;
    }
    return FEATURED_PRINTS.filter(
      (item) => item.categorySlug === selectedCategory
    );
  }, [selectedCategory]);

  const handleSeeAllClick = (e: React.MouseEvent) => {
    if (onViewAllProducts) {
      e.preventDefault();
      onViewAllProducts();
    }
  };

  return (
    <section
      id="featured-prints"
      aria-labelledby="featured-prints-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-b-2 border-[#171717]/10"
    >
      {/* ================================================== */}
      {/* BACKGROUND DECORATIVE ACCENTS (aria-hidden) */}
      {/* ================================================== */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-10 left-10 w-48 h-48 opacity-10 bg-[radial-gradient(#171717_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
        <div className="absolute bottom-12 right-8 w-48 h-48 opacity-15 bg-[radial-gradient(#FFC43C_2.5px,transparent_2.5px)] [background-size:14px_14px]" />
        
        {/* Playful geometric decorations */}
        <div className="absolute top-1/2 left-6 text-[#171717] font-black text-2xl opacity-15 rotate-45">◆</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          
          {/* Eyebrow Label Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8A00] text-white border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[1.2deg] hover:rotate-0 transition-transform duration-200 mb-4 select-none">
            <span className="text-xs font-black font-heading tracking-wider uppercase">
              OUR CREATIONS
            </span>
          </div>

          {/* Main Heading */}
          <h2
            id="featured-prints-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black font-heading tracking-tight text-[#171717] uppercase leading-[1.05]"
          >
            Featured{' '}
            <span className="text-[#FF8A00] relative inline-block">
              3D Prints
              {/* Playful wave underline */}
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-3 text-[#FFC43C] -z-10"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 14 Q 25 2, 50 12 T 98 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-[#6D6D6D] font-semibold text-sm sm:text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Explore our collection of carefully crafted 3D printed creations, made for your space, your passion, and your ideas.
          </p>
        </div>

        {/* ================================================== */}
        {/* CATEGORY FILTER BAR */}
        {/* ================================================== */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div
            className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 pt-1 px-2 max-w-full no-scrollbar"
            role="toolbar"
            aria-label="Filter 3D prints by category"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  aria-pressed={isSelected}
                  className={`
                    px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-black font-heading tracking-wide uppercase transition-all duration-150 shrink-0 border-2 border-[#171717] cursor-pointer
                    ${
                      isSelected
                        ? 'bg-[#171717] text-white shadow-[3px_3px_0px_0px_#FFC43C] -translate-y-0.5'
                        : 'bg-[#FFF9ED] text-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFC43C]/40 hover:-translate-y-0.5'
                    }
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================== */}
        {/* PRODUCT GRID (Desktop 4 cols, Tablet 2 cols, Mobile 1 col) */}
        {/* ================================================== */}
        {filteredPrints.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
            {filteredPrints.map((print) => (
              <PrintShowcaseCard
                key={print.id}
                print={print}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl p-10 text-center shadow-[5px_5px_0px_0px_#171717] max-w-md mx-auto">
            <span className="text-4xl mb-3 inline-block">🔍</span>
            <h3 className="text-xl font-black font-heading uppercase text-[#171717]">
              No prints found
            </h3>
            <p className="text-sm font-semibold text-[#6D6D6D] mt-1 mb-4">
              Try selecting another category or view all creations.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="px-5 py-2.5 bg-[#FFC43C] text-[#171717] border-2 border-[#171717] rounded-full font-black font-heading text-xs uppercase shadow-[2px_2px_0px_0px_#171717] cursor-pointer"
            >
              Show All Prints
            </button>
          </div>
        )}

        {/* ================================================== */}
        {/* BOTTOM CTA: VIEW ALL PRODUCTS → */}
        {/* ================================================== */}
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href="/shop"
            onClick={handleSeeAllClick}
            className="inline-flex items-center justify-center gap-2.5 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] rounded-full px-8 sm:px-10 py-4 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[7px_7px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717] transition-all cursor-pointer select-none text-center"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-4 h-4 stroke-[3px]" />
          </a>
        </div>

      </div>
    </section>
  );
};
