import React from 'react';
import { Search, X } from 'lucide-react';

interface ProductSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  onClear: () => void;
  totalResults: number;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  query,
  onQueryChange,
  onClear,
  totalResults,
}) => {
  return (
    <div className="w-full">
      <div className="relative">
        <label htmlFor="product-search-input" className="sr-only">
          Search prints and 3D models
        </label>

        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#171717]">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5px]" />
        </div>

        {/* Input */}
        <input
          id="product-search-input"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search prints..."
          className="w-full pl-10 sm:pl-11 pr-10 sm:pr-12 py-3 bg-white border-2.5 border-[#171717] rounded-2xl text-xs sm:text-sm font-bold text-[#171717] placeholder:text-[#8C8C8C] shadow-[3px_3px_0px_0px_#171717] outline-none focus:border-[#FF8A00] transition-colors"
        />

        {/* Clear query button */}
        {query && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search query"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#171717] hover:text-[#FF8A00] cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-[#FFF9ED] border-1.5 border-[#171717] flex items-center justify-center shadow-[1px_1px_0px_0px_#171717]">
              <X className="w-3.5 h-3.5 stroke-[3px]" />
            </div>
          </button>
        )}
      </div>

      {query && (
        <div className="mt-2 text-xs font-semibold text-[#6D6D6D] flex items-center justify-between">
          <span>
            Found <strong>{totalResults}</strong> {totalResults === 1 ? 'print' : 'prints'} matching "{query}"
          </span>
          <button
            type="button"
            onClick={onClear}
            className="text-[#FF8A00] font-black uppercase text-[11px] hover:underline cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};
