import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GalleryItem, EDITORIAL_GALLERY_ITEMS } from '../../data/communityData';

interface WhatPeopleAreMakingGalleryProps {
  onSelectItem: (item: GalleryItem) => void;
}

export const WhatPeopleAreMakingGallery: React.FC<WhatPeopleAreMakingGalleryProps> = ({
  onSelectItem,
}) => {
  return (
    <section className="relative w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[2px_2px_0px_0px_#FF8A00]">
              <span>VISUAL PORTFOLIO</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading text-[#171717] uppercase tracking-tight leading-[0.95]">
              WHAT PEOPLE <br />
              <span className="text-[#FF8A00]">ARE MAKING.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#171717]/80 font-medium max-w-2xl">
              An editorial glimpse into physical parts, functional mechanisms, prototypes, and artistic objects manufactured across Bangladesh.
            </p>
          </div>

          <div className="text-xs font-mono font-bold text-[#171717]/60 uppercase tracking-widest hidden md:block">
            CLICK ANY CREATION TO EXPAND DETAILS &rarr;
          </div>
        </div>

        {/* Asymmetrical / Masonry Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          
          {/* Row 1: Large Wide (8 cols) + Tall Portrait (4 cols) */}
          <div
            onClick={() => onSelectItem(EDITORIAL_GALLERY_ITEMS[0])}
            className="lg:col-span-8 group relative rounded-3xl border-3 border-[#171717] overflow-hidden bg-[#171717] shadow-[8px_8px_0px_0px_#171717] hover:shadow-[4px_4px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer aspect-[16/10]"
          >
            <img
              src={EDITORIAL_GALLERY_ITEMS[0].image}
              alt={EDITORIAL_GALLERY_ITEMS[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-transparent to-black/20" />
            
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] group-hover:bg-[#FF8A00] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-mono font-bold text-[#FF8A00] uppercase tracking-wider block mb-1">
                {EDITORIAL_GALLERY_ITEMS[0].caption}
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-white uppercase leading-tight">
                {EDITORIAL_GALLERY_ITEMS[0].title}
              </h3>
            </div>
          </div>

          <div
            onClick={() => onSelectItem(EDITORIAL_GALLERY_ITEMS[1])}
            className="lg:col-span-4 group relative rounded-3xl border-3 border-[#171717] overflow-hidden bg-[#171717] shadow-[8px_8px_0px_0px_#171717] hover:shadow-[4px_4px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer aspect-[4/5]"
          >
            <img
              src={EDITORIAL_GALLERY_ITEMS[1].image}
              alt={EDITORIAL_GALLERY_ITEMS[1].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-transparent to-black/20" />
            
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] group-hover:bg-[#FF8A00] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-mono font-bold text-[#FF8A00] uppercase tracking-wider block mb-1">
                {EDITORIAL_GALLERY_ITEMS[1].caption}
              </span>
              <h3 className="text-lg sm:text-xl font-black font-heading text-white uppercase leading-tight">
                {EDITORIAL_GALLERY_ITEMS[1].title}
              </h3>
            </div>
          </div>

          {/* Row 2: Three Items (4 cols + 4 cols + 4 cols) */}
          <div
            onClick={() => onSelectItem(EDITORIAL_GALLERY_ITEMS[2])}
            className="lg:col-span-4 group relative rounded-3xl border-3 border-[#171717] overflow-hidden bg-[#171717] shadow-[8px_8px_0px_0px_#171717] hover:shadow-[4px_4px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer aspect-[4/4]"
          >
            <img
              src={EDITORIAL_GALLERY_ITEMS[2].image}
              alt={EDITORIAL_GALLERY_ITEMS[2].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-transparent to-black/20" />
            
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] group-hover:bg-[#FF8A00] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-mono font-bold text-[#FF8A00] uppercase tracking-wider block mb-1">
                {EDITORIAL_GALLERY_ITEMS[2].caption}
              </span>
              <h3 className="text-lg font-black font-heading text-white uppercase leading-tight">
                {EDITORIAL_GALLERY_ITEMS[2].title}
              </h3>
            </div>
          </div>

          <div
            onClick={() => onSelectItem(EDITORIAL_GALLERY_ITEMS[3])}
            className="lg:col-span-4 group relative rounded-3xl border-3 border-[#171717] overflow-hidden bg-[#171717] shadow-[8px_8px_0px_0px_#171717] hover:shadow-[4px_4px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer aspect-[4/4]"
          >
            <img
              src={EDITORIAL_GALLERY_ITEMS[3].image}
              alt={EDITORIAL_GALLERY_ITEMS[3].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-transparent to-black/20" />
            
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] group-hover:bg-[#FF8A00] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-mono font-bold text-[#FF8A00] uppercase tracking-wider block mb-1">
                {EDITORIAL_GALLERY_ITEMS[3].caption}
              </span>
              <h3 className="text-lg font-black font-heading text-white uppercase leading-tight">
                {EDITORIAL_GALLERY_ITEMS[3].title}
              </h3>
            </div>
          </div>

          <div
            onClick={() => onSelectItem(EDITORIAL_GALLERY_ITEMS[4])}
            className="lg:col-span-4 group relative rounded-3xl border-3 border-[#171717] overflow-hidden bg-[#171717] shadow-[8px_8px_0px_0px_#171717] hover:shadow-[4px_4px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer aspect-[4/4]"
          >
            <img
              src={EDITORIAL_GALLERY_ITEMS[4].image}
              alt={EDITORIAL_GALLERY_ITEMS[4].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-transparent to-black/20" />
            
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] group-hover:bg-[#FF8A00] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-mono font-bold text-[#FF8A00] uppercase tracking-wider block mb-1">
                {EDITORIAL_GALLERY_ITEMS[4].caption}
              </span>
              <h3 className="text-lg font-black font-heading text-white uppercase leading-tight">
                {EDITORIAL_GALLERY_ITEMS[4].title}
              </h3>
            </div>
          </div>

          {/* Row 3: Portrait (4 cols) + Wide Feature (8 cols) */}
          <div
            onClick={() => onSelectItem(EDITORIAL_GALLERY_ITEMS[5])}
            className="lg:col-span-4 group relative rounded-3xl border-3 border-[#171717] overflow-hidden bg-[#171717] shadow-[8px_8px_0px_0px_#171717] hover:shadow-[4px_4px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer aspect-[4/5]"
          >
            <img
              src={EDITORIAL_GALLERY_ITEMS[5].image}
              alt={EDITORIAL_GALLERY_ITEMS[5].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-transparent to-black/20" />
            
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] group-hover:bg-[#FF8A00] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-mono font-bold text-[#FF8A00] uppercase tracking-wider block mb-1">
                {EDITORIAL_GALLERY_ITEMS[5].caption}
              </span>
              <h3 className="text-lg sm:text-xl font-black font-heading text-white uppercase leading-tight">
                {EDITORIAL_GALLERY_ITEMS[5].title}
              </h3>
            </div>
          </div>

          <div
            onClick={() => onSelectItem(EDITORIAL_GALLERY_ITEMS[6])}
            className="lg:col-span-8 group relative rounded-3xl border-3 border-[#171717] overflow-hidden bg-[#171717] shadow-[8px_8px_0px_0px_#171717] hover:shadow-[4px_4px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer aspect-[16/10]"
          >
            <img
              src={EDITORIAL_GALLERY_ITEMS[6].image}
              alt={EDITORIAL_GALLERY_ITEMS[6].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-transparent to-black/20" />
            
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] group-hover:bg-[#FF8A00] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-mono font-bold text-[#FF8A00] uppercase tracking-wider block mb-1">
                {EDITORIAL_GALLERY_ITEMS[6].caption}
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-white uppercase leading-tight">
                {EDITORIAL_GALLERY_ITEMS[6].title}
              </h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
