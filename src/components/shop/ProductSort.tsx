import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name-asc';

interface ProductSortProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const ProductSort: React.FC<ProductSortProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="flex items-center gap-1.5 text-xs font-black font-heading uppercase text-[#171717]">
        <ArrowUpDown className="w-3.5 h-3.5 text-[#FF8A00] stroke-[3px]" />
        <label htmlFor="product-sort-select" className="hidden sm:inline">
          Sort by:
        </label>
      </div>

      <div className="relative">
        <select
          id="product-sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="appearance-none bg-white border-2 border-[#171717] rounded-xl px-3.5 py-2 pr-8 text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] outline-none focus:border-[#FF8A00] cursor-pointer hover:bg-[#FFF9ED] transition-colors"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A–Z</option>
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#171717]">
          <span className="text-[10px] font-black">▼</span>
        </div>
      </div>
    </div>
  );
};
