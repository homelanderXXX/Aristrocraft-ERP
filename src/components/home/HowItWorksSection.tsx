import React from 'react';
import {
  Lightbulb,
  PenTool,
  Printer,
  Package,
  ArrowRight,
  Check,
  Zap,
} from 'lucide-react';

interface StepData {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  emoji: string;
  accent: 'yellow' | 'orange';
  rotation: string;
}

interface HowItWorksSectionProps {
  onStartCustomOrder?: () => void;
  onShopProducts?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onStartCustomOrder,
  onShopProducts,
}) => {
  const steps: StepData[] = [
    {
      number: '01',
      title: 'SHARE YOUR IDEA',
      description:
        'Tell us what you want to make. Send us a photo, sketch, reference or simply describe your idea.',
      icon: Lightbulb,
      emoji: '💡',
      accent: 'yellow',
      rotation: 'rotate-[-1deg]',
    },
    {
      number: '02',
      title: 'WE DESIGN & QUOTE',
      description:
        'We review your idea, prepare the design if needed and give you a price and estimated delivery time.',
      icon: PenTool,
      emoji: '✏️',
      accent: 'orange',
      rotation: 'rotate-[1deg]',
    },
    {
      number: '03',
      title: 'WE PRINT IT',
      description:
        'Once you approve the design and price, we carefully 3D print your product with precision.',
      icon: Printer,
      emoji: '🖨️',
      accent: 'yellow',
      rotation: 'rotate-[-1deg]',
    },
    {
      number: '04',
      title: 'GET YOUR CREATION',
      description:
        'Your finished product is packed and delivered to you, ready to enjoy or gift.',
      icon: Package,
      emoji: '📦',
      accent: 'orange',
      rotation: 'rotate-[1deg]',
    },
  ];

  const handleCustomClick = (e: React.MouseEvent) => {
    if (onStartCustomOrder) {
      e.preventDefault();
      onStartCustomOrder();
    }
  };

  const handleShopClick = (e: React.MouseEvent) => {
    if (onShopProducts) {
      e.preventDefault();
      onShopProducts();
    }
  };

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF9ED] overflow-hidden border-b-2 border-[#171717]/10"
    >
      {/* ================================================== */}
      {/* BACKGROUND DECORATIONS (aria-hidden) */}
      {/* ================================================== */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-16 right-12 w-44 h-44 opacity-15 bg-[radial-gradient(#171717_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
        <div className="absolute bottom-16 left-8 w-40 h-40 opacity-15 bg-[radial-gradient(#FF8A00_2px,transparent_2px)] [background-size:16px_16px]" />
        
        {/* Floating playful symbols */}
        <div className="absolute bottom-28 right-1/3 text-[#171717] font-black text-2xl opacity-20 rotate-12">▲</div>
        <div className="absolute bottom-1/2 left-1/4 text-[#FFC43C] font-black text-3xl opacity-35">●</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC43C] text-[#171717] border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1.5deg] hover:rotate-0 transition-transform duration-200 mb-4 select-none">
            <span className="text-xs font-black font-heading tracking-wider uppercase">
              SIMPLE PROCESS
            </span>
          </div>

          {/* Main Section Heading */}
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black font-heading tracking-tight text-[#171717] uppercase leading-[1.05]"
          >
            HOW IT{' '}
            <span className="text-[#FF8A00] relative inline-block">
              WORKS
              {/* Playful wave underline */}
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
          <p className="text-[#6D6D6D] font-semibold text-sm sm:text-base md:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            From your idea to a finished product — we make the process simple.
          </p>
        </div>

        {/* ================================================== */}
        {/* 4 STEPS PROCESS (Desktop Horizontal, Mobile Vertical) */}
        {/* ================================================== */}
        <div className="relative mb-14 sm:mb-20">
          
          {/* Desktop Connecting Dotted Progression Line */}
          <div
            className="hidden lg:block absolute top-1/3 left-16 right-16 h-1 border-t-3 border-dashed border-[#171717]/30 -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isYellow = step.accent === 'yellow';
              const numberBg = isYellow ? 'bg-[#FFC43C]' : 'bg-[#FF8A00]';
              const numberText = isYellow ? 'text-[#171717]' : 'text-white';

              return (
                <div key={step.number} className="relative flex flex-col items-center">
                  
                  {/* Mobile Vertical Connector Line (shown between cards on mobile) */}
                  {idx < steps.length - 1 && (
                    <div
                      className="lg:hidden absolute bottom-[-24px] left-1/2 -translate-x-1/2 w-0.5 h-6 border-l-2 border-dashed border-[#171717]/40 z-0"
                      aria-hidden="true"
                    />
                  )}

                  {/* Step Card */}
                  <div
                    className={`
                      w-full bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-7
                      shadow-[5px_5px_0px_0px_#171717] hover:shadow-[8px_8px_0px_0px_#171717]
                      hover:-translate-y-1.5 hover:rotate-0 transition-all duration-200
                      flex flex-col items-start justify-between min-h-[300px] select-none ${step.rotation}
                    `}
                  >
                    {/* Top Row: Prominent Sticker Number + Icon Frame */}
                    <div className="w-full flex items-center justify-between gap-3 mb-6">
                      {/* Large Sticker Number (01, 02, 03, 04) */}
                      <div
                        className={`
                          w-12 h-12 rounded-2xl border-2.5 border-[#171717] ${numberBg} ${numberText}
                          font-black font-heading text-lg sm:text-xl flex items-center justify-center
                          shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-3deg]
                        `}
                      >
                        {step.number}
                      </div>

                      {/* Icon/Emoji Badge */}
                      <div className="w-12 h-12 rounded-2xl border-2 border-[#171717] bg-[#FFF9ED] flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_#171717] group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-[#171717] stroke-[2.5px]" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 flex flex-col justify-start">
                      <h3 className="text-lg sm:text-xl font-black font-heading uppercase text-[#171717] tracking-tight mb-2.5">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#6D6D6D] leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom Micro Step Indicator / Progress Dot */}
                    <div className="w-full pt-4 mt-4 border-t-2 border-[#171717]/10 flex items-center justify-between text-[11px] font-black font-heading text-[#171717]/60">
                      <span>STEP {step.number} OF 04</span>
                      <span className="text-[#FF8A00]">●</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================== */}
        {/* BOTTOM CTA AREA: READY TO MAKE YOUR IDEA REAL? */}
        {/* ================================================== */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#FFFFFF] border-3 border-[#171717] rounded-3xl p-7 sm:p-9 lg:p-11 shadow-[7px_7px_0px_0px_#171717] text-center flex flex-col items-center">
            
            {/* Top decorative badge */}
            <div className="absolute -top-3.5 bg-[#34D399] text-[#171717] border-2 border-[#171717] rounded-full px-4 py-1 text-[11px] sm:text-xs font-black font-heading uppercase shadow-[2px_2px_0px_0px_#171717] rotate-[-2deg] select-none">
              FAST TURNAROUND
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-[#171717] uppercase tracking-tight mb-2">
              READY TO MAKE YOUR IDEA REAL?
            </h3>
            <p className="text-sm sm:text-base font-semibold text-[#6D6D6D] max-w-lg mb-6">
              Send us your idea and let&apos;s create something custom.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-6">
              {/* Primary Button */}
              <a
                href="/custom"
                onClick={handleCustomClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] rounded-full px-7 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717] transition-all cursor-pointer select-none text-center"
              >
                <span>START A CUSTOM ORDER</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </a>

              {/* Secondary Small Link */}
              <a
                href="/shop"
                onClick={handleShopClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 text-xs sm:text-xs font-black font-heading uppercase text-[#171717] hover:text-[#FF8A00] transition-colors cursor-pointer select-none underline decoration-2 underline-offset-4"
              >
                OR SHOP READY-MADE PRODUCTS
              </a>
            </div>

            {/* Trust Line */}
            <div className="pt-4 border-t-2 border-[#171717]/10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-[#171717]/80">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#34D399] stroke-[3px]" /> Custom designs
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FFC43C] stroke-[3px]" /> Made to order
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FF8A00] stroke-[3px]" /> Quality checked
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
