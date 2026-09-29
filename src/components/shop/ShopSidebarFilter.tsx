import React from 'react';
import { Search, X, SlidersHorizontal, RefreshCw, Filter, Check } from 'lucide-react';
import { ProductCategorySlug } from '../../types';

export interface CategoryOption {
  slug: ProductCategorySlug;
  label: string;
  count: number;
}

export type PriceRangePreset = 'all' | 'under-400' | '400-800' | 'above-800';
export type AvailabilityFilter = 'all' | 'in-stock' | 'ready-to-print' | 'made-to-order';
export type MaterialFilter = 'all' | 'PLA+' | 'PETG' | 'TPU' | 'ABS' | 'Resin';

interface ShopSidebarFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: CategoryOption[];
  activeCategory: ProductCategorySlug;
  onSelectCategory: (category: ProductCategorySlug) => void;
  pricePreset: PriceRangePreset;
  onPricePresetChange: (preset: PriceRangePreset) => void;
  minPriceInput: string;
  maxPriceInput: string;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  availability: AvailabilityFilter;
  onAvailabilityChange: (val: AvailabilityFilter) => void;
  material: MaterialFilter;
  onMaterialChange: (val: MaterialFilter) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  totalResults: number;
  onCloseMobileDrawer?: () => void;
}

export const ShopSidebarFilter: React.FC<ShopSidebarFilterProps> = ({
  searchQuery,
  onSearchChange,
  categories,
  activeCategory,
  onSelectCategory,
  pricePreset,
  onPricePresetChange,
  minPriceInput,
  maxPriceInput,
  onMinPriceChange,
  onMaxPriceChange,
  availability,
  onAvailabilityChange,
  material,
  onMaterialChange,
  onResetFilters,
  hasActiveFilters,
  totalResults,
  onCloseMobileDrawer,
}) => {
  const materialsList: MaterialFilter[] = ['all', 'PLA+', 'PETG', 'TPU', 'ABS', 'Resin'];
  const availabilityList: { id: AvailabilityFilter; label: string }[] = [
    { id: 'all', label: 'All Availability' },
    { id: 'in-stock', label: 'In Stock' },
    { id: 'ready-to-print', label: 'Ready to Print' },
    { id: 'made-to-order', label: 'Made to Order' },
  ];

  return (
    <div className="w-full flex flex-col gap-6 text-[#171717]">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#FF8A00] stroke-[2.5px]" />
          <h2 className="text-sm font-black font-heading uppercase tracking-wider text-[#171717]">
            Filter Products
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-[11px] font-black font-heading uppercase text-[#FF8A00] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}

        {onCloseMobileDrawer && (
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="lg:hidden w-7 h-7 rounded-lg bg-white border border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FFC43C] cursor-pointer"
            aria-label="Close filters"
          >
            <X className="w-4 h-4 stroke-[2.5px]" />
          </button>
        )}
      </div>

      {/* 1. SEARCH INPUT */}
      <div className="space-y-1.5">
        <label htmlFor="sidebar-search-input" className="block text-xs font-black font-heading uppercase text-[#171717]">
          Search Catalog
        </label>
        <div className="relative">
          <input
            id="sidebar-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Name, material, keyword..."
            className="w-full bg-white border-2 border-[#171717] rounded-xl pl-9 pr-8 py-2 text-xs font-bold text-[#171717] placeholder:text-[#8C8C8C] shadow-[2px_2px_0px_0px_#171717] outline-none focus:border-[#FF8A00]"
          />
          <Search className="w-4 h-4 text-[#8C8C8C] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5px]" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8C8C] hover:text-[#171717] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. CATEGORIES FILTER */}
      <div className="space-y-2">
        <h3 className="text-xs font-black font-heading uppercase text-[#171717]">
          Categories
        </h3>
        <div className="flex flex-col gap-1 max-h-56 overflow-y-auto pr-1">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`
                  w-full px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between text-left cursor-pointer border
                  ${
                    isSelected
                      ? 'bg-[#FFC43C] text-[#171717] border-[#171717] font-black shadow-[2px_2px_0px_0px_#171717]'
                      : 'bg-white text-[#525252] border-[#171717]/20 hover:border-[#171717] hover:bg-[#FFF9ED]'
                  }
                `}
              >
                <span className="truncate">{cat.label}</span>
                <span
                  className={`
                    text-[10px] font-black px-1.5 py-0.5 rounded-md shrink-0 ml-2
                    ${isSelected ? 'bg-[#171717] text-white' : 'bg-[#FFF9ED] text-[#171717] border border-[#171717]/20'}
                  `}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. PRICE RANGE FILTER */}
      <div className="space-y-2.5 pt-2 border-t border-[#171717]/10">
        <h3 className="text-xs font-black font-heading uppercase text-[#171717]">
          Price Range (৳)
        </h3>
        
        {/* Price Presets */}
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All Prices' },
            { id: 'under-400', label: 'Under ৳400' },
            { id: '400-800', label: '৳400 – ৳800' },
            { id: 'above-800', label: '৳800+' },
          ].map((preset) => {
            const isSelected = pricePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onPricePresetChange(preset.id as PriceRangePreset)}
                className={`
                  py-1.5 px-2 rounded-lg text-[11px] font-black font-heading uppercase border text-center transition-all cursor-pointer
                  ${
                    isSelected
                      ? 'bg-[#171717] text-white border-[#171717]'
                      : 'bg-white text-[#525252] border-[#171717]/30 hover:border-[#171717]'
                  }
                `}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Custom Min / Max Inputs */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex-1">
            <span className="text-[10px] font-bold text-[#6D6D6D] uppercase block mb-0.5">Min ৳</span>
            <input
              type="number"
              placeholder="0"
              value={minPriceInput}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="w-full bg-white border border-[#171717] rounded-lg px-2.5 py-1 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00]"
            />
          </div>
          <span className="text-xs font-black text-[#171717] mt-4">–</span>
          <div className="flex-1">
            <span className="text-[10px] font-bold text-[#6D6D6D] uppercase block mb-0.5">Max ৳</span>
            <input
              type="number"
              placeholder="5000"
              value={maxPriceInput}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="w-full bg-white border border-[#171717] rounded-lg px-2.5 py-1 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00]"
            />
          </div>
        </div>
      </div>

      {/* 4. AVAILABILITY FILTER */}
      <div className="space-y-2 pt-2 border-t border-[#171717]/10">
        <h3 className="text-xs font-black font-heading uppercase text-[#171717]">
          Availability
        </h3>
        <div className="flex flex-col gap-1">
          {availabilityList.map((item) => {
            const isSelected = availability === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onAvailabilityChange(item.id)}
                className={`
                  w-full px-3 py-1.5 rounded-lg text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between border
                  ${
                    isSelected
                      ? 'bg-[#171717] text-white border-[#171717]'
                      : 'bg-white text-[#525252] border-[#171717]/20 hover:border-[#171717]'
                  }
                `}
              >
                <span>{item.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#FFC43C]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. MATERIAL FILTER */}
      <div className="space-y-2 pt-2 border-t border-[#171717]/10">
        <h3 className="text-xs font-black font-heading uppercase text-[#171717]">
          Filament / Material
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {materialsList.map((mat) => {
            const isSelected = material === mat;
            return (
              <button
                key={mat}
                type="button"
                onClick={() => onMaterialChange(mat)}
                className={`
                  px-2.5 py-1 rounded-lg text-xs font-black font-heading uppercase border transition-all cursor-pointer
                  ${
                    isSelected
                      ? 'bg-[#FF8A00] text-white border-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717]'
                      : 'bg-white text-[#525252] border-[#171717]/30 hover:border-[#171717]'
                  }
                `}
              >
                {mat === 'all' ? 'All Materials' : mat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action footer for mobile drawer */}
      {onCloseMobileDrawer && (
        <div className="pt-4 border-t-2 border-[#171717] mt-auto">
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="w-full py-3 rounded-xl bg-[#FFC43C] text-[#171717] border-2 border-[#171717] font-black font-heading text-xs uppercase shadow-[3px_3px_0px_0px_#171717] cursor-pointer"
          >
            Show {totalResults} Results
          </button>
        </div>
      )}
    </div>
  );
};
