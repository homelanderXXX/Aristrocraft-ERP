import React from 'react';
import { Eye, Heart, ArrowUpRight } from 'lucide-react';
import { CustomerCreation } from '../../data/customerCreations';

interface CustomerCreationCardProps {
  creation: CustomerCreation;
  onSelect: (creation: CustomerCreation) => void;
}

export const CustomerCreationCard: React.FC<CustomerCreationCardProps> = ({
  creation,
  onSelect,
}) => {
  return (
    <div
      id={`creation-card-${creation.id}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(creation)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(creation);
        }
      }}
      aria-label={`View details for ${creation.title} (${creation.category})`}
      className={`
        group relative bg-white border-2.5 sm:border-3 border-[#171717] rounded-2xl sm:rounded-3xl p-4 sm:p-5
        shadow-[4px_4px_0px_0px_#171717] hover:shadow-[7px_7px_0px_0px_#171717]
        hover:-translate-y-1.5 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between
        overflow-hidden focus:outline-none focus:ring-3 focus:ring-[#FF8A00] focus:ring-offset-2
      `}
    >
      {/* Background radial pattern */}
      <div
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top stage container for the 3D visual */}
      <div
        className={`
          relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl border-2 border-[#171717] mb-4
          bg-gradient-to-br ${creation.illustration.bgGradient}
          flex items-center justify-center overflow-hidden
          shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]
        `}
      >
        {/* Top Badges: Category & Tag */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black font-heading uppercase tracking-wider bg-white/95 border-1.5 border-[#171717] text-[#171717] shadow-[1px_1px_0px_0px_#171717]">
            {creation.category}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black font-heading uppercase tracking-wider bg-[#FFC43C] border-1.5 border-[#171717] text-[#171717] shadow-[1px_1px_0px_0px_#171717]">
            <span>{creation.illustration.badgeLabel}</span>
          </span>
        </div>

        {/* 3D Visual Object Center */}
        <div
          className={`
            w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2.5 border-[#171717] ${creation.illustration.accentColor}
            flex items-center justify-center text-3xl sm:text-4xl shadow-[3px_3px_0px_0px_#171717]
            transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3
          `}
        >
          <span className="drop-shadow-xs">{creation.illustration.emoji}</span>
        </div>

        {/* Hover Quick View Pill Overlay */}
        <div className="absolute inset-0 bg-[#171717]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center pointer-events-none">
          <div className="bg-white border-2 border-[#171717] rounded-full px-3.5 py-1 text-[10px] sm:text-[11px] font-black font-heading uppercase text-[#171717] flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#171717] transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 stroke-[2.5px]" />
            <span>View Creation</span>
          </div>
        </div>
      </div>

      {/* Creation Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-black font-heading uppercase text-[#171717] tracking-tight leading-snug group-hover:text-[#FF8A00] transition-colors line-clamp-1 mb-1.5">
            {creation.title}
          </h3>

          <p className="text-xs font-semibold text-[#6D6D6D] leading-relaxed line-clamp-2 mb-3">
            {creation.description}
          </p>
        </div>

        {/* Customer Quote Snippet */}
        <div className="pt-3 border-t-2 border-[#171717]/10 flex items-center justify-between text-[11px] font-bold text-[#171717]">
          <span className="text-[#FF8A00] truncate max-w-[80%] font-semibold italic text-[11px]">
            {creation.customerNote.split('—')[0]}
          </span>
          <div className="w-6 h-6 rounded-full bg-[#FFF9ED] border-1.5 border-[#171717] flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#171717] group-hover:bg-[#FF8A00] group-hover:text-white transition-colors">
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[3px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
