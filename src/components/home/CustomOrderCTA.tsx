import React from 'react';
import { ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { CustomOrderVisual } from './CustomOrderVisual';

interface CustomOrderCTAProps {
  onCustomOrderClick?: () => void;
  onViewProducts?: () => void;
}

export const CustomOrderCTA: React.FC<CustomOrderCTAProps> = ({
  onCustomOrderClick,
  onViewProducts,
}) => {
  const handleCustomOrder = (e: React.MouseEvent) => {
    if (onCustomOrderClick) {
      e.preventDefault();
      onCustomOrderClick();
    }
  };

  const handleViewProducts = (e: React.MouseEvent) => {
    if (onViewProducts) {
      e.preventDefault();
      onViewProducts();
    }
  };

  return (
    <section
      id="custom"
      aria-labelledby="custom-order-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-b-2 border-[#171717]/10"
    >
      {/* ================================================== */}
      {/* BACKGROUND DECORATIVE ACCENTS (aria-hidden) */}
      {/* ================================================== */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle dot matrices */}
        <div className="absolute top-10 left-10 w-44 h-44 opacity-10 bg-[radial-gradient(#171717_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
        <div className="absolute bottom-12 right-12 w-48 h-48 opacity-15 bg-[radial-gradient(#FFC43C_2.5px,transparent_2.5px)] [background-size:14px_14px]" />

        {/* Decorative layer lines */}
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full border-8 border-dashed border-[#FF8A00]/10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Container Banner Card */}
        <div className="bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-[8px_8px_0px_0px_#171717] relative overflow-hidden">
          
          {/* Subtle Corner Badge */}
          <div
            className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-32 h-32 bg-[#FFC43C]/20 rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* ================================================== */}
            {/* LEFT COLUMN: COPY & CALLS TO ACTION (7 Cols) */}
            {/* ================================================== */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* 1. SECTION EYEBROW */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8A00] text-white border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1.5deg] hover:rotate-0 transition-transform duration-200 mb-4 select-none">
                <span className="text-xs font-black font-heading tracking-wider uppercase">
                  GOT AN IDEA?
                </span>
              </div>

              {/* 2. MAIN HEADING */}
              <h2
                id="custom-order-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black font-heading tracking-tight text-[#171717] uppercase leading-[1.06]"
              >
                Bring{' '}
                <span className="text-[#FF8A00] relative inline-block">
                  Your Idea
                  {/* Signature hand-drawn wave underline */}
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
                </span>{' '}
                to Life.
              </h2>

              {/* 3. SUPPORTING TEXT */}
              <p className="text-sm sm:text-base md:text-lg font-semibold text-[#525252] leading-relaxed mt-4 mb-8 max-w-xl">
                Have a design in mind? Send us your idea and we'll help turn it into a real 3D printed creation.
              </p>

              {/* 4. KEY PERKS LIST */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-8 text-xs sm:text-sm font-bold text-[#171717]">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-[#34D399] border-1.5 border-[#171717] flex items-center justify-center text-[#171717]">
                    <Check className="w-2.5 h-2.5 stroke-[3.5px]" />
                  </div>
                  <span>Free Design Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-[#34D399] border-1.5 border-[#171717] flex items-center justify-center text-[#171717]">
                    <Check className="w-2.5 h-2.5 stroke-[3.5px]" />
                  </div>
                  <span>Instant Price Calculation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-[#34D399] border-1.5 border-[#171717] flex items-center justify-center text-[#171717]">
                    <Check className="w-2.5 h-2.5 stroke-[3.5px]" />
                  </div>
                  <span>Doorstep Delivery Across Bangladesh</span>
                </div>
              </div>

              {/* 5. CTA BUTTONS GROUP */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                {/* PRIMARY CTA */}
                <a
                  href="/custom"
                  onClick={handleCustomOrder}
                  aria-label="Start a custom 3D printing order"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] rounded-full px-7 sm:px-9 py-4 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[7px_7px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717] transition-all cursor-pointer select-none text-center"
                >
                  <span>START A CUSTOM ORDER</span>
                  <ArrowRight className="w-4 h-4 stroke-[3px]" />
                </a>

                {/* SECONDARY CTA */}
                <a
                  href="/shop"
                  onClick={handleViewProducts}
                  aria-label="View all existing 3D printed products"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FFF9ED] text-[#171717] border-2.5 border-[#171717] rounded-full px-6 sm:px-7 py-4 text-xs sm:text-sm font-black font-heading uppercase tracking-wide shadow-[3px_3px_0px_0px_#171717] hover:shadow-[5px_5px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#171717] transition-all cursor-pointer select-none text-center"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5px]" />
                  <span>VIEW PRODUCTS</span>
                </a>
              </div>

            </div>

            {/* ================================================== */}
            {/* RIGHT COLUMN: 3-STAGE VISUAL (5 Cols) */}
            {/* ================================================== */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <CustomOrderVisual />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
