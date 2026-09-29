import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ArrowRight,
  Filter,
  Layers,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { CATEGORIES_DATA, CategoryData, searchCategoriesAndSubcategories } from '../../data/categories';
import { getCategoryIcon } from './CategoryVisualSection';
import { useRouter } from '../../context/RouterContext';

interface CategorySearchAndFilterProps {
  activeCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilterType: 'all' | 'categories' | 'products';
  onFilterTypeChange: (type: 'all' | 'categories' | 'products') => void;
}

export const CategorySearchAndFilter: React.FC<CategorySearchAndFilterProps> = ({
  activeCategorySlug,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  activeFilterType,
  onFilterTypeChange,
}) => {
  const { navigate } = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Quick suggestions based on search
  const searchResults = searchCategoriesAndSubcategories(searchQuery);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularSearches = [
    'Raspberry Pi Enclosure',
    'Custom Gears',
    'Phone Stand',
    'Anatomical Bone',
    'Drone Mount',
    'Planter',
    'Castable Ring',
    'Wall Sign',
  ];

  return (
    <div className="w-full space-y-6" ref={containerRef}>
      
      {/* 1. LARGE SEARCH BAR WITH LIVE RESULTS DROPDOWN */}
      <div className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 sm:left-5 text-[#171717]/60 pointer-events-none">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5px]" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search by part, use-case, category (e.g. 'gear', 'phone stand', 'anatomical', 'drone')..."
            className="w-full pl-12 sm:pl-14 pr-12 py-4 sm:py-5 bg-white border-3 border-[#171717] rounded-2xl text-base sm:text-lg font-bold text-[#171717] placeholder:text-[#6D6D6D]/70 shadow-[5px_5px_0px_0px_#171717] focus:shadow-[7px_7px_0px_0px_#171717] focus:outline-none transition-all"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-4 p-1.5 rounded-lg bg-[#FFF9ED] hover:bg-[#FFC43C] border border-[#171717] text-[#171717] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.5px]" />
            </button>
          )}
        </div>

        {/* SEARCH SUGGESTIONS DROPDOWN */}
        {isFocused && searchQuery.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-3 border-[#171717] rounded-2xl p-4 shadow-[8px_8px_0px_0px_#171717] z-50 animate-popIn max-h-[420px] overflow-y-auto space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#171717]/10">
              <span className="text-xs font-black font-heading text-[#FF8A00] uppercase tracking-wider">
                Matching Categories & Applications ({searchResults.length})
              </span>
              <span className="text-[10px] font-bold text-[#6D6D6D]">
                Press item to navigate
              </span>
            </div>

            {searchResults.length === 0 ? (
              <div className="p-4 text-center text-sm font-bold text-[#6D6D6D]">
                No direct category matches for "{searchQuery}". Try searching for specific parts or explore categories below.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {searchResults.map((res, idx) => {
                  const Icon = getCategoryIcon(res.category.iconName);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        navigate(`/shop/category/${res.category.slug}`);
                        setIsFocused(false);
                      }}
                      className="p-3 text-left bg-[#FFF9ED] hover:bg-[#FFC43C] border-2 border-[#171717] rounded-xl flex items-start gap-3 transition-colors group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#171717] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-[#171717]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black font-heading uppercase text-[#171717] truncate">
                            {res.category.name}
                          </span>
                          {res.category.badge && (
                            <span className="px-1.5 py-0.2 bg-[#171717] text-white text-[8px] font-black rounded">
                              {res.category.badge}
                            </span>
                          )}
                        </div>
                        {res.matchedSubcategory && (
                          <span className="text-[11px] font-bold text-[#FF8A00] block truncate">
                            Subcategory: {res.matchedSubcategory}
                          </span>
                        )}
                        {res.matchedApplication && (
                          <span className="text-[10px] font-semibold text-[#555] block truncate">
                            {res.matchedApplication}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#171717] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 self-center" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. POPULAR QUICK SEARCH TAGS */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-black font-heading uppercase text-[#6D6D6D] flex items-center gap-1 mr-1">
          TRENDING SEARCHES:
        </span>
        {popularSearches.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onSearchChange(term)}
            className="px-2.5 py-1 bg-white hover:bg-[#FFC43C] border border-[#171717] rounded-lg font-bold text-[#171717] shadow-[1px_1px_0px_0px_#171717] transition-all cursor-pointer"
          >
            {term}
          </button>
        ))}
      </div>

      {/* 3. CATEGORY PILLS HORIZONTAL BAR */}
      <div className="pt-2 border-t-2 border-[#171717]/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black font-heading uppercase text-[#171717] tracking-wider">
            QUICK CATEGORY JUMP ({CATEGORIES_DATA.length} DISCIPLINES)
          </span>
          <span className="text-[11px] font-bold text-[#6D6D6D] hidden sm:block">
            Click any discipline to filter or view
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {/* ALL OPTION */}
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] shrink-0 transition-all cursor-pointer ${
              activeCategorySlug === 'all'
                ? 'bg-[#171717] text-white shadow-[3px_3px_0px_0px_#FF8A00]'
                : 'bg-white text-[#171717] hover:bg-[#FFF9ED] shadow-[2px_2px_0px_0px_#171717]'
            }`}
          >
            All Categories
          </button>

          {CATEGORIES_DATA.map((cat) => {
            const Icon = getCategoryIcon(cat.iconName);
            const isActive = activeCategorySlug === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] shrink-0 flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FF8A00] text-white shadow-[3px_3px_0px_0px_#171717]'
                    : 'bg-white text-[#171717] hover:bg-[#FFF9ED] shadow-[2px_2px_0px_0px_#171717]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 stroke-[2.5px]" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
