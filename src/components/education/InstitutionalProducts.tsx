import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Sliders,
  Maximize2,
} from 'lucide-react';
import { INSTITUTIONAL_SOLUTIONS } from '../../data/educationData';

interface InstitutionalProductsProps {
  onOrderSolution: (solutionName: string) => void;
  onOpenLightbox: (imageUrl: string, title: string, caption: string) => void;
}

export const InstitutionalProducts: React.FC<InstitutionalProductsProps> = ({
  onOrderSolution,
  onOpenLightbox,
}) => {
  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b-3 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9ED] border-2 border-[#171717] text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] mb-3">
              <Building2 className="w-3.5 h-3.5 text-[#059669]" />
              <span>MANUFACTURED PRODUCTS & SOLUTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#171717] tracking-tight">
              What a School or University Can Order
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#525252] max-w-2xl mt-2">
              From single university capstone prototypes to 50-unit classroom sets with custom packaging, explore our practical manufactured product lines.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFF9ED] border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
            <span className="text-xs font-bold text-[#171717]">
              All items are 100% custom-produced to your specifications
            </span>
          </div>
        </div>

        {/* 14 SOLUTIONS MASONRY/GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {INSTITUTIONAL_SOLUTIONS.map((sol) => (
            <div
              key={sol.id}
              className="group bg-[#FFF9ED] border-3 border-[#171717] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* PHOTO CONTAINER */}
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden relative border-2 border-[#171717] mb-3.5 bg-white">
                  <img
                    src={sol.image}
                    alt={sol.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/70 via-transparent to-transparent opacity-60" />
                  
                  {/* TAG BADGE */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white border border-[#171717] text-[8px] font-black font-heading uppercase text-[#171717]">
                    {sol.tag}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(sol.image, sol.name, sol.description);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-md bg-white/90 border border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FFC43C] transition-colors"
                    aria-label="Zoom image"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-sm sm:text-base font-black font-heading text-[#171717] leading-snug mb-1.5 group-hover:text-[#FF8A00] transition-colors">
                  {sol.name}
                </h3>

                <p className="text-xs font-medium text-[#525252] leading-relaxed mb-3">
                  {sol.description}
                </p>
              </div>

              <div>
                <div className="pt-2.5 pb-3 border-t border-[#171717]/10 flex items-center justify-between text-[10px] font-bold text-[#737373]">
                  <span>SPECS:</span>
                  <span className="text-[#171717] font-mono">{sol.specs}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onOrderSolution(sol.name)}
                  className="w-full py-2 bg-white hover:bg-[#FF8A00] hover:text-white border-2 border-[#171717] rounded-xl text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Order {sol.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
