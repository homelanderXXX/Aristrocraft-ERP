import React from 'react';
import { Layers } from 'lucide-react';
import { ProductCategorySlug } from '../../types';

export interface CategoryOption {
  slug: ProductCategorySlug;
  label: string;
  count: number;
}

interface ProductFiltersProps {
  categories: CategoryOption[];
  activeCategory: ProductCategorySlug;
  onSelectCategory: (category: ProductCategorySlug) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <Layers className="w-4 h-4 text-[#FF8A00] stroke-[2.5px]" />
        <span className="text-xs font-black font-heading uppercase text-[#171717] tracking-wider">
          Filter by Category
        </span>
      </div>

      {/* Horizontal scroll on mobile / flex wrap on desktop */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onSelectCategory(cat.slug)}
              aria-pressed={isActive}
              className={`
                px-4 py-2 rounded-full text-xs font-black font-heading uppercase tracking-wide
                border-2 border-[#171717] transition-all duration-150 cursor-pointer whitespace-nowrap
                flex items-center gap-2 shrink-0
                ${
                  isActive
                    ? 'bg-[#FF8A00] text-white shadow-[3px_3px_0px_0px_#171717] -translate-y-0.5'
                    : 'bg-white text-[#171717] hover:bg-[#FFC43C] shadow-[2px_2px_0px_0px_#171717] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#171717]'
                }
              `}
            >
              <span>{cat.label}</span>
              <span
                className={`
                  px-1.5 py-0.2 rounded-full text-[10px] font-black border border-[#171717]
                  ${isActive ? 'bg-white text-[#171717]' : 'bg-[#FFF9ED] text-[#171717]/80'}
                `}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
