import React from 'react';
import { Eye, ArrowUpRight } from 'lucide-react';
import { FeaturedPrint } from '../../types';

interface PrintShowcaseCardProps {
  print: FeaturedPrint;
  onViewProduct?: (print: FeaturedPrint) => void;
}

export const PrintShowcaseCard: React.FC<PrintShowcaseCardProps> = ({
  print,
  onViewProduct,
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    if (onViewProduct) {
      e.preventDefault();
      onViewProduct(print);
    }
  };

  const isYellowBadge = print.badgeColor === 'yellow';
  const isOrangeBadge = print.badgeColor === 'orange';

  return (
    <div
      id={`print-card-${print.id}`}
      className="group relative bg-white border-2.5 sm:border-3 border-[#171717] rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#171717] hover:shadow-[7px_7px_0px_0px_#171717] hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between select-none"
    >
      {/* 1. PRODUCT IMAGE / 3D ILLUSTRATION CONTAINER */}
      <a
        href={`/shop/${print.slug}`}
        onClick={handleCardClick}
        className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl bg-[#FFF9ED] border-2 border-[#171717] mb-4 flex items-center justify-center overflow-hidden cursor-pointer group/img shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)]"
        aria-label={`View ${print.name}`}
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:10px_10px]"
          aria-hidden="true"
        />

        {/* Top-Right Tag Badge */}
        {print.tag && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black font-heading uppercase tracking-wider bg-white/95 border-1.5 border-[#171717] text-[#171717] shadow-[1px_1px_0px_0px_#171717]">
              {print.tag}
            </span>
          </div>
        )}

        {/* 3D Visual Object Stage */}
        <div
          className={`
            w-18 h-18 sm:w-22 sm:h-22 rounded-2xl border-2.5 border-[#171717] ${print.illustration.accentColor}
            flex items-center justify-center text-3xl sm:text-4xl shadow-[3px_3px_0px_0px_#171717]
            transition-transform duration-200 group-hover/img:scale-105 group-hover/img:rotate-3
          `}
        >
          <span className="drop-shadow-xs">{print.illustration.emoji}</span>
        </div>

        {/* Subtle Hover Action Overlay */}
        <div className="absolute inset-0 bg-[#171717]/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-150 flex items-center justify-center">
          <div className="bg-white border-2 border-[#171717] rounded-full px-3 py-1 text-[10px] font-black font-heading uppercase text-[#171717] flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#171717] transform translate-y-1 group-hover/img:translate-y-0 transition-transform">
            <Eye className="w-3 h-3 stroke-[2.5px]" />
            <span>Quick View</span>
          </div>
        </div>
      </a>

      {/* 2. CATEGORY BADGE */}
      <div className="mb-2">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black font-heading uppercase tracking-wider bg-[#FFF9ED] text-[#FF8A00] border-1.5 border-[#171717]/30">
          {print.category}
        </span>
      </div>

      {/* 3. PRODUCT NAME */}
      <div className="mb-1.5">
        <a
          href={`/shop/${print.slug}`}
          onClick={handleCardClick}
          className="text-base sm:text-lg font-black font-heading uppercase text-[#171717] tracking-tight leading-snug line-clamp-1 hover:text-[#FF8A00] transition-colors"
        >
          {print.name}
        </a>
      </div>

      {/* 4. SHORT DESCRIPTION */}
      <p className="text-xs font-semibold text-[#6D6D6D] leading-relaxed line-clamp-2 mb-4">
        {print.description}
      </p>

      {/* 5. STARTING PRICE & 6. CTA BUTTON */}
      <div className="pt-3.5 border-t-2 border-[#171717]/10 flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase text-[#6D6D6D] leading-none">
            STARTING
          </span>
          <span className="text-sm sm:text-base font-black font-heading text-[#171717] tracking-tight mt-0.5">
            From ৳{print.startingPrice.toLocaleString()}
          </span>
        </div>

        <a
          href={`/shop/${print.slug}`}
          onClick={handleCardClick}
          aria-label={`View details for ${print.name}`}
          className="px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-2xl border-2 border-[#171717] bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] text-xs font-black font-heading uppercase tracking-wide shadow-[2px_2px_0px_0px_#171717] hover:shadow-[3px_3px_0px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#171717] transition-all duration-150 flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>View Product</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[3px]" />
        </a>
      </div>
    </div>
  );
};
