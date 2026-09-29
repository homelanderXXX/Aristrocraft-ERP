import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Filter } from 'lucide-react';
import { GalleryItem, CommunityFilterCategory, EDITORIAL_GALLERY_ITEMS } from '../../data/communityData';

interface CommunityGalleryProps {
  onSelectItem: (item: GalleryItem) => void;
}

const CATEGORIES: CommunityFilterCategory[] = [
  'ALL',
  'ENGINEERING',
  'EDUCATION',
  'ROBOTICS',
  'ART',
  'JEWELRY',
  'ARCHITECTURE',
  'AUTOMOTIVE',
  'CONSUMER',
  'OTHER',
];

export const CommunityGallery: React.FC<CommunityGalleryProps> = ({ onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<CommunityFilterCategory>('ALL');

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'ALL') return EDITORIAL_GALLERY_ITEMS;
    return EDITORIAL_GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="community-creations" className="relative w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[2px_2px_0px_0px_#FF8A00]">
            <span>FULL PRODUCTION SHOWCASE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading text-[#171717] uppercase tracking-tight leading-[0.95]">
            CREATION <br />
            <span className="text-[#FF8A00]">ARCHIVE.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#171717]/80 font-medium max-w-2xl">
            Browse through custom projects across disciplines. Click on any item to view materials, tolerances, and design details.
          </p>
        </div>

        {/* Minimal & Elegant Category Filter Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-4 py-2 rounded-full text-xs font-black font-heading uppercase tracking-wider whitespace-nowrap transition-all border-2 cursor-pointer shrink-0
                  ${
                    isSelected
                      ? 'bg-[#171717] text-white border-[#171717] shadow-[3px_3px_0px_0px_#FF8A00]'
                      : 'bg-white text-[#171717] border-[#171717] hover:bg-[#FFF4DC] shadow-[2px_2px_0px_0px_#171717]'
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Image-First Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group bg-white rounded-3xl border-3 border-[#171717] overflow-hidden shadow-[6px_6px_0px_0px_#171717] hover:shadow-[3px_3px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#171717] border-b-2 border-[#171717]">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#171717]/90 text-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
                    {item.category}
                  </div>

                  {/* Corner Inspection Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] group-hover:bg-[#FF8A00] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  {/* Bottom Material Pill */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-[#171717] text-[10px] font-mono font-bold text-[#171717]">
                    {item.material}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-[11px] font-mono font-bold text-[#FF8A00] uppercase tracking-wider mb-1">
                    {item.caption}
                  </div>
                  <h3 className="text-xl font-black font-heading text-[#171717] uppercase group-hover:text-[#FF8A00] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171717]/75 font-normal mt-2 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3.5 bg-[#FFF9ED] border-t-2 border-[#171717] flex items-center justify-between text-xs font-black font-heading uppercase text-[#171717]">
                <span>VIEW SPECIFICATIONS</span>
                <span className="text-[#FF8A00] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  DETAILS &rarr;
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
