import React from 'react';
import { Lightbulb, PenTool, Printer, ArrowDown, CheckCircle2 } from 'lucide-react';

export const CustomOrderVisual: React.FC = () => {
  return (
    <div
      className="relative w-full max-w-lg mx-auto lg:max-w-none flex flex-col items-center justify-center p-2 sm:p-4 select-none"
      aria-hidden="true"
    >
      {/* Decorative Background Filament Ring & Grid behind cards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Filament curved loops */}
        <svg
          className="w-full h-full max-w-[420px] max-h-[420px] text-[#FF8A00]/20 absolute"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="8 8"
          />
          <circle
            cx="200"
            cy="200"
            r="110"
            stroke="#FFC43C"
            strokeOpacity="0.3"
            strokeWidth="4"
          />
        </svg>
      </div>

      {/* Floating 3-Stage Progress Stack */}
      <div className="relative z-10 w-full flex flex-col gap-3.5 sm:gap-4 max-w-[380px] sm:max-w-[420px]">
        
        {/* STAGE 01: IDEA */}
        <div className="bg-white border-2.5 sm:border-3 border-[#171717] rounded-2xl p-4 sm:p-4.5 shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-1 hover:rotate-0 rotate-[-2deg] transition-all duration-200 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl border-2 border-[#171717] bg-[#FFC43C] flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0px_0px_#171717]">
            <Lightbulb className="w-6 h-6 text-[#171717] stroke-[2.5px]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-black font-heading tracking-widest text-[#FF8A00] uppercase">
                STAGE 01
              </span>
              <span className="text-[10px] font-bold text-[#6D6D6D] uppercase">
                PHOTO / SKETCH
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black font-heading uppercase text-[#171717] leading-tight mt-0.5">
              YOUR IDEA
            </h4>
            <p className="text-xs font-semibold text-[#6D6D6D] truncate">
              Describe what you want or send a reference image
            </p>
          </div>
        </div>

        {/* Progression Indicator Arrow 1 */}
        <div className="flex items-center justify-center -my-2 z-20">
          <div className="w-7 h-7 rounded-full bg-[#171717] text-[#FFC43C] border-2 border-[#171717] flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#FFC43C]">
            <ArrowDown className="w-3.5 h-3.5 stroke-[3px]" />
          </div>
        </div>

        {/* STAGE 02: DESIGN & 3D MODEL */}
        <div className="bg-white border-2.5 sm:border-3 border-[#171717] rounded-2xl p-4 sm:p-4.5 shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-1 hover:rotate-0 rotate-[2deg] transition-all duration-200 flex items-center gap-3.5 ml-2 sm:ml-4">
          <div className="w-12 h-12 rounded-xl border-2 border-[#171717] bg-[#FF8A00] text-white flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0px_0px_#171717]">
            <PenTool className="w-6 h-6 text-white stroke-[2.5px]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-black font-heading tracking-widest text-[#FFC43C] bg-[#171717] px-1.5 py-0.2 rounded">
                STAGE 02
              </span>
              <span className="text-[10px] font-bold text-[#6D6D6D] uppercase">
                CAD OPTIMIZATION
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black font-heading uppercase text-[#171717] leading-tight mt-0.5">
              3D MODEL & QUOTE
            </h4>
            <p className="text-xs font-semibold text-[#6D6D6D] truncate">
              We review geometry, colors, and calculate exact pricing
            </p>
          </div>
        </div>

        {/* Progression Indicator Arrow 2 */}
        <div className="flex items-center justify-center -my-2 z-20">
          <div className="w-7 h-7 rounded-full bg-[#171717] text-[#34D399] border-2 border-[#171717] flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#34D399]">
            <ArrowDown className="w-3.5 h-3.5 stroke-[3px]" />
          </div>
        </div>

        {/* STAGE 03: PRINT & DELIVERY */}
        <div className="bg-white border-2.5 sm:border-3 border-[#171717] rounded-2xl p-4 sm:p-4.5 shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-1 hover:rotate-0 rotate-[-1deg] transition-all duration-200 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl border-2 border-[#171717] bg-[#34D399] text-[#171717] flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0px_0px_#171717]">
            <Printer className="w-6 h-6 text-[#171717] stroke-[2.5px]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-black font-heading tracking-widest text-[#34D399] bg-[#171717] px-1.5 py-0.2 rounded">
                STAGE 03
              </span>
              <span className="text-[10px] font-bold text-[#6D6D6D] uppercase">
                FINISHED PRODUCT
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black font-heading uppercase text-[#171717] leading-tight mt-0.5">
              PRECISION PRINT
            </h4>
            <p className="text-xs font-semibold text-[#6D6D6D] truncate">
              Layer-by-layer craftsmanship delivered safely to you
            </p>
          </div>
        </div>

      </div>

      {/* Floating Micro Badge */}
      <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-2 border-[#171717] text-[10px] font-black font-heading text-[#171717] shadow-[2px_2px_0px_0px_#171717]">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] stroke-[3px]" />
        <span>100% QUALITY GUARANTEED</span>
      </div>
    </div>
  );
};
