import React from 'react';
import { EDITORIAL_GALLERY, GalleryItem } from '../../data/educationData';
import { Sparkles, Eye, Maximize2 } from 'lucide-react';

interface EditorialGalleryProps {
  onOpenLightbox: (url: string, title: string, caption: string) => void;
  onRequestCustom: () => void;
}

export const EditorialGallerySection: React.FC<EditorialGalleryProps> = ({
  onOpenLightbox,
  onRequestCustom,
}) => {
  return (
    <section className="w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-3">
              WORKSHOP ARCHIVE
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] tracking-tight uppercase leading-[1.05]">
              WALK THROUGH OUR <br />
              <span className="text-[#FF8A00]">EDUCATIONAL WORKSHOP.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#171717]/80 font-mono">
            Every specimen shown is a physical, 3D printed model manufactured in our Dhaka lab for real classroom use.
          </p>
        </div>

        {/* MASONRY / ASYMMETRICAL EDITORIAL GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px]">
          {EDITORIAL_GALLERY.map((item: GalleryItem) => {
            // Determine span classes
            let spanClass = 'col-span-1 row-span-1';
            if (item.span === 'large') spanClass = 'col-span-1 sm:col-span-2 row-span-2';
            else if (item.span === 'tall') spanClass = 'col-span-1 row-span-2';
            else if (item.span === 'wide') spanClass = 'col-span-1 sm:col-span-2 row-span-1';

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item.image, item.title, item.caption)}
                className={`relative rounded-2xl md:rounded-3xl border-2 border-[#171717] overflow-hidden shadow-[4px_4px_0px_0px_#171717] bg-[#171717] cursor-pointer group transition-all duration-300 hover:shadow-[6px_6px_0px_0px_#FF8A00] ${spanClass}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                {/* Top Caption Pill */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-white/90 backdrop-blur-sm text-[#171717] font-mono text-[10px] font-bold uppercase rounded-md border border-[#171717]/20 shadow-sm">
                    {item.caption}
                  </span>
                </div>

                {/* Inspect Icon on Hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Title & Specs */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="text-sm sm:text-base font-black font-heading tracking-tight leading-tight">
                    {item.title}
                  </h4>
                  {item.specs && (
                    <p className="text-[10px] font-mono text-white/80 truncate mt-0.5">
                      {item.specs}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Footer Action */}
        <div className="mt-12 text-center">
          <button
            onClick={onRequestCustom}
            className="px-6 py-3.5 bg-white hover:bg-[#FFF9ED] text-[#171717] font-black font-heading text-xs uppercase tracking-wider rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] hover:shadow-[1px_1px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-2"
          >
            <span>COMMISSION A CUSTOM WORKSHOP SPECIMEN</span>
            <Eye className="w-4 h-4 text-[#FF8A00]" />
          </button>
        </div>

      </div>
    </section>
  );
};
