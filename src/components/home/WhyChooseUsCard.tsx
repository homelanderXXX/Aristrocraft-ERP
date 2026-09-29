import React from 'react';
import { WhyChooseUsItem } from '../../data/whyChooseUs';

interface WhyChooseUsCardProps {
  item: WhyChooseUsItem;
  index: number;
}

export const WhyChooseUsCard: React.FC<WhyChooseUsCardProps> = ({ item, index }) => {
  const Icon = item.icon;
  const isDark = item.accentColor === 'bg-[#171717]';
  const isOrange = item.accentColor === 'bg-[#FF8A00]';

  return (
    <div
      id={`why-card-${item.id}`}
      className={`
        group relative bg-white border-2.5 sm:border-3 border-[#171717] rounded-2xl sm:rounded-3xl p-6 sm:p-8
        shadow-[5px_5px_0px_0px_#171717] hover:shadow-[8px_8px_0px_0px_#171717]
        hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between select-none
        overflow-hidden
      `}
    >
      {/* Subtle background layer pattern */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-5 bg-[radial-gradient(#171717_1.5px,transparent_1.5px)] [background-size:12px_12px] pointer-events-none"
        aria-hidden="true"
      />

      <div>
        {/* Top Bar: Icon Stage + Tag Badge */}
        <div className="flex items-center justify-between gap-3 mb-6">
          {/* Icon Box with tactile border & shadow */}
          <div
            className={`
              w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2.5 border-[#171717] ${item.accentColor}
              flex items-center justify-center shadow-[3px_3px_0px_0px_#171717]
              group-hover:scale-105 group-hover:rotate-3 transition-transform duration-200
            `}
          >
            <Icon
              className={`w-7 h-7 sm:w-8 sm:h-8 ${isDark || isOrange ? 'text-white' : 'text-[#171717]'} stroke-[2.5px]`}
              aria-hidden="true"
            />
          </div>

          {/* Micro Tag Badge */}
          <div className="flex flex-col items-end">
            <span
              className={`
                inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px]
                font-black font-heading uppercase tracking-wide border-2 border-[#171717]
                ${item.badgeBg} ${item.badgeText} shadow-[1.5px_1.5px_0px_0px_#171717]
              `}
            >
              {item.tag}
            </span>
          </div>
        </div>

        {/* Feature Title */}
        <h3 className="text-xl sm:text-2xl font-black font-heading uppercase text-[#171717] tracking-tight leading-tight mb-3">
          {item.title}
        </h3>

        {/* Feature Description */}
        <p className="text-xs sm:text-sm md:text-base font-semibold text-[#525252] leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Card Footer Micro-indicator */}
      <div className="pt-5 mt-6 border-t-2 border-[#171717]/10 flex items-center justify-between text-[11px] font-black font-heading text-[#171717]/50">
        <span className="uppercase tracking-wider">ARISTROCRAFT STANDARD</span>
        <span className="text-[#FF8A00] font-bold">0{index + 1} / 04</span>
      </div>
    </div>
  );
};
