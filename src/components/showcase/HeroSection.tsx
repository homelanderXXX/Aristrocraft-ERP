import React from 'react';
import { Button } from '../ui/Button';
import { Sparkles, ArrowRight, Layers, Box, Cpu, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onPlaygroundClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onPlaygroundClick,
}) => {
  return (
    <section id="hero" className="pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        {/* Left Column: Text & Value Prop */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC43C] border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] mb-6">
            <span className="text-[11px] sm:text-xs font-black font-heading uppercase tracking-wider text-[#171717]">
              CUSTOM 3D PRINTING STUDIO
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight leading-[0.95] text-[#171717] uppercase mb-6">
            TURN YOUR <br />
            <span className="text-[#171717] relative inline-block">
              IDEAS
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#FFC43C] -z-10"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 10 Q 25 20, 50 10 T 100 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                />
              </svg>
            </span>{' '}
            INTO <br />
            <span className="text-[#FF8A00]">REALITY.</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl font-medium text-[#404040] max-w-xl mb-8 leading-relaxed">
            From precision prototypes to playful desk toys, custom keychains, and personalized gifts. Handcrafted with high-detail 3D printing right here in Bangladesh.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Button
              variant="candy"
              colorTheme="accent"
              size="lg"
              onClick={onExploreClick}
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              SHOP PRODUCTS
            </Button>

            <Button
              variant="candy"
              colorTheme="cream"
              size="lg"
              onClick={onPlaygroundClick}
              icon={Layers}
              className="w-full sm:w-auto"
            >
              CREATE YOUR OWN
            </Button>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t-2 border-[#E5E5E5] w-full">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center shadow-[2px_2px_0px_0px_#171717]">
                <Box className="w-4 h-4 text-[#171717] stroke-[2.5px]" />
              </div>
              <span className="text-xs font-bold text-[#171717]">Custom Made</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF8A00] border-2 border-[#171717] flex items-center justify-center shadow-[2px_2px_0px_0px_#171717]">
                <Cpu className="w-4 h-4 text-white stroke-[2.5px]" />
              </div>
              <span className="text-xs font-bold text-[#171717]">High-Res PLA & PETG</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#34D399] border-2 border-[#171717] flex items-center justify-center shadow-[2px_2px_0px_0px_#171717]">
                <ShieldCheck className="w-4 h-4 text-[#171717] stroke-[2.5px]" />
              </div>
              <span className="text-xs font-bold text-[#171717]">Nationwide Shipping</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Stage */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full max-w-md bg-[#FFF9ED] border-4 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[12px_12px_0px_0px_#171717] relative">
            {/* Sticker Badge */}
            <div className="absolute -top-4 -right-4 bg-[#FFC43C] border-2.5 border-[#171717] rounded-full px-4 py-1.5 shadow-[4px_4px_0px_0px_#171717] rotate-6">
              <span className="text-xs font-black font-heading uppercase text-[#171717]">
                MADE TO ORDER
              </span>
            </div>

            {/* Stage Showcase Card */}
            <div className="bg-white border-3 border-[#171717] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#FF8A00] mb-6 flex flex-col items-center justify-center min-h-[220px]">
              <div className="w-24 h-24 bg-[#FFC43C] rounded-2xl border-3 border-[#171717] shadow-[4px_4px_0px_0px_#171717] flex items-center justify-center mb-4 rotate-[-4deg] animate-float">
                <Box className="w-12 h-12 text-[#171717] stroke-[2px]" />
              </div>
              <h3 className="text-lg font-black font-heading text-[#171717] uppercase">
                3D PRINT PREVIEW
              </h3>
              <p className="text-xs text-[#737373] font-semibold mt-1">
                0.12mm Ultra Detail • Eco PLA+
              </p>
            </div>

            {/* Mini Specs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FFFDF5] border-2 border-[#171717] rounded-xl p-3 shadow-[2px_2px_0px_0px_#171717]">
                <span className="text-[10px] font-black uppercase text-[#737373] block">Material</span>
                <span className="text-xs font-black text-[#171717]">PLA / Tough Matte</span>
              </div>
              <div className="bg-[#FFFDF5] border-2 border-[#171717] rounded-xl p-3 shadow-[2px_2px_0px_0px_#171717]">
                <span className="text-[10px] font-black uppercase text-[#737373] block">Speed</span>
                <span className="text-xs font-black text-[#FF8A00]">2-3 Days Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
