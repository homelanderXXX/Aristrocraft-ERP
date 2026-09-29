import React, { useState, useEffect } from 'react';
import { Lightbulb, ArrowRight, Instagram, X, Layers, Clock, Award, CheckCircle2 } from 'lucide-react';
import { CUSTOMER_CREATIONS, CustomerCreation } from '../../data/customerCreations';
import { CustomerCreationCard } from './CustomerCreationCard';

interface CustomerCreationsSectionProps {
  onStartCustomOrder?: () => void;
}

export const CustomerCreationsSection: React.FC<CustomerCreationsSectionProps> = ({
  onStartCustomOrder,
}) => {
  const [selectedCreation, setSelectedCreation] = useState<CustomerCreation | null>(null);

  // Close lightbox on Escape key & manage body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCreation) {
        setSelectedCreation(null);
      }
    };

    if (selectedCreation) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCreation]);

  const handleCustomOrderClick = (e: React.MouseEvent) => {
    if (onStartCustomOrder) {
      e.preventDefault();
      onStartCustomOrder();
    }
  };

  const handleModalOrderClick = () => {
    setSelectedCreation(null);
    if (onStartCustomOrder) {
      onStartCustomOrder();
    }
  };

  return (
    <section
      id="customer-creations"
      aria-labelledby="customer-creations-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF9ED] overflow-hidden border-b-2 border-[#171717]/10"
    >
      {/* ================================================== */}
      {/* BACKGROUND DECORATIVE ACCENTS (aria-hidden) */}
      {/* ================================================== */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-10 right-8 w-44 h-44 opacity-15 bg-[radial-gradient(#171717_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
        <div className="absolute bottom-16 left-10 w-48 h-48 opacity-15 bg-[radial-gradient(#FF8A00_2px,transparent_2px)] [background-size:16px_16px]" />

        {/* 3D Print Layer Lines */}
        <div className="absolute top-1/4 right-0 w-28 h-56 opacity-10 bg-[repeating-linear-gradient(0deg,#FF8A00,#FF8A00_2px,transparent_2px,transparent_8px)]" />
        <div className="absolute bottom-1/3 left-0 w-28 h-56 opacity-10 bg-[repeating-linear-gradient(0deg,#171717,#171717_2px,transparent_2px,transparent_8px)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          
          {/* Eyebrow Label Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8A00] text-white border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1.2deg] hover:rotate-0 transition-transform duration-200 mb-4 select-none">
            <span className="text-xs font-black font-heading tracking-wider uppercase">
              FROM OUR COMMUNITY
            </span>
          </div>

          {/* Main Heading */}
          <h2
            id="customer-creations-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black font-heading tracking-tight text-[#171717] uppercase leading-[1.08]"
          >
            Made For You.{' '}
            <span className="text-[#FF8A00] relative inline-block mt-1 sm:mt-0">
              Shared By You.
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
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-[#6D6D6D] font-semibold text-sm sm:text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            See how our creations come to life in real spaces, gaming setups, workstations, and collections.
          </p>

          {/* Social Handle / Community CTA */}
          <div className="mt-5 inline-flex items-center gap-3 flex-wrap justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] text-xs font-black font-heading uppercase text-[#171717]">
              <Instagram className="w-3.5 h-3.5 text-[#FF8A00] stroke-[2.5px]" />
              <span>@ARISTROCRAFT</span>
            </div>
            <span className="text-xs font-black font-heading text-[#FF8A00] uppercase tracking-wider">
              FOLLOW OUR CREATIONS →
            </span>
          </div>
        </div>

        {/* ================================================== */}
        {/* EDITORIAL GALLERY GRID */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 mb-12 sm:mb-16">
          {CUSTOMER_CREATIONS.map((creation) => (
            <CustomerCreationCard
              key={creation.id}
              creation={creation}
              onSelect={setSelectedCreation}
            />
          ))}
        </div>

        {/* ================================================== */}
        {/* COMMUNITY MESSAGE & BOTTOM CTA */}
        {/* ================================================== */}
        <div className="bg-white border-2.5 sm:border-3 border-[#171717] rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_#171717] text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center shadow-[2px_2px_0px_0px_#171717] mb-3">
            <Lightbulb className="w-6 h-6 text-[#171717]" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase text-[#171717] tracking-tight">
            Your idea could be next.
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-[#6D6D6D] mt-1.5 mb-6 max-w-md">
            Whether it's a tabletop hero, a personalized workspace mount, or a bespoke gift, we can 3D print it for you.
          </p>

          <a
            href="/custom"
            onClick={handleCustomOrderClick}
            className="inline-flex items-center justify-center gap-2.5 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] rounded-full px-8 sm:px-10 py-4 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[7px_7px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717] transition-all cursor-pointer select-none text-center"
          >
            <span>START A CUSTOM ORDER</span>
            <ArrowRight className="w-4 h-4 stroke-[3px]" />
          </a>
        </div>

      </div>

      {/* ================================================== */}
      {/* ACCESSIBLE LIGHTBOX MODAL */}
      {/* ================================================== */}
      {selectedCreation && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-creation-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171717]/80 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setSelectedCreation(null)}
        >
          <div
            className="relative w-full max-w-xl bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#FFC43C] overflow-hidden select-none animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedCreation(null)}
              aria-label="Close creation details"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FFF9ED] hover:bg-[#FF8A00] hover:text-white border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer z-20"
            >
              <X className="w-4 h-4 stroke-[3px]" />
            </button>

            {/* Modal Stage Display */}
            <div
              className={`
                w-full aspect-[16/9] rounded-2xl border-2.5 border-[#171717] mb-5
                bg-gradient-to-br ${selectedCreation.illustration.bgGradient}
                flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]
                relative overflow-hidden
              `}
            >
              <div
                className={`
                  w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2.5 border-[#171717] ${selectedCreation.illustration.accentColor}
                  flex items-center justify-center text-4xl sm:text-5xl shadow-[4px_4px_0px_0px_#171717]
                `}
              >
                <span>{selectedCreation.illustration.emoji}</span>
              </div>

              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-3 py-1 rounded-md text-[10px] font-black font-heading uppercase tracking-wider bg-white border-1.5 border-[#171717] text-[#171717] shadow-[1px_1px_0px_0px_#171717]">
                  {selectedCreation.category}
                </span>
              </div>
            </div>

            {/* Creation Content */}
            <h3
              id="modal-creation-title"
              className="text-2xl sm:text-3xl font-black font-heading uppercase text-[#171717] tracking-tight mb-2"
            >
              {selectedCreation.title}
            </h3>

            <p className="text-sm font-semibold text-[#525252] leading-relaxed mb-4">
              {selectedCreation.description}
            </p>

            {/* Spec Details Bar */}
            <div className="grid grid-cols-2 gap-3 mb-5 p-3 rounded-xl bg-[#FFF9ED] border-2 border-[#171717]/20 text-xs font-bold text-[#171717]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FF8A00] shrink-0" />
                <span className="truncate">{selectedCreation.material}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#34D399] shrink-0" />
                <span className="truncate">{selectedCreation.printTime}</span>
              </div>
            </div>

            {/* Customer Review Quote */}
            <div className="mb-6 p-4 rounded-2xl bg-white border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717]">
              <div className="flex items-center gap-1.5 text-xs font-black font-heading text-[#FF8A00] uppercase mb-1">
                <Award className="w-3.5 h-3.5 stroke-[2.5px]" />
                <span>Verified Customer</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold italic text-[#171717] leading-relaxed">
                {selectedCreation.customerNote}
              </p>
            </div>

            {/* Modal Action CTA */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedCreation(null)}
                className="px-4 py-2.5 text-xs font-black font-heading uppercase text-[#171717] hover:underline cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleModalOrderClick}
                className="px-6 py-3 rounded-full bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2 border-[#171717] text-xs font-black font-heading uppercase shadow-[3px_3px_0px_0px_#171717] hover:shadow-[4px_4px_0px_0px_#171717] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>CUSTOMIZE THIS IDEA</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
