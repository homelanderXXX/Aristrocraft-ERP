import React from 'react';
import { ArrowRight, Upload, MessageCircle, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { ScrollReveal, SubtleDepthCard } from '../animation/ScrollReveal';

interface CustomOrderBannerSectionProps {
  onStartCustomProject?: () => void;
}

export const CustomOrderBannerSection: React.FC<CustomOrderBannerSectionProps> = ({
  onStartCustomProject,
}) => {
  const { navigate } = useRouter();

  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onStartCustomProject) {
      onStartCustomProject();
    } else {
      navigate('/custom-print');
    }
  };

  return (
    <section
      id="custom-order-cta"
      aria-labelledby="custom-order-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        <ScrollReveal>
          <div className="relative bg-[#FF8A00] text-white border-3 border-[#171717] rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_#171717] p-8 sm:p-12 lg:p-16">
            
            {/* Subtle Background Geometry */}
            <div className="absolute inset-0 pointer-events-none select-none opacity-10" aria-hidden="true">
              <div className="w-full h-full bg-[radial-gradient(#FFFFFF_2px,transparent_2px)] [background-size:24px_24px]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column (7 cols): Headline + Explanation + Benefits */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] text-white border-2 border-white/40 shadow-[2px_2px_0px_0px_#000] rotate-[-1deg] mb-5 select-none">
                  <span className="text-[11px] sm:text-xs font-black font-heading tracking-wider uppercase">
                    CUSTOM DIGITAL MANUFACTURING
                  </span>
                </div>

                <h2
                  id="custom-order-heading"
                  className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white uppercase leading-[0.95] mb-4"
                >
                  HAVE AN <span className="text-[#FFC43C] underline decoration-white decoration-4 underline-offset-6">IDEA?</span>
                </h2>

                <p className="text-base sm:text-lg md:text-xl font-medium text-white/95 leading-relaxed max-w-xl mb-8">
                  Send us your design, reference image, STL file, or simply explain what you need. We&apos;ll help turn it into a real, durable physical object.
                </p>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t-2 border-white/20 text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#171717] text-[#FFC43C] flex items-center justify-center font-black text-[11px]">✓</span>
                    <span>Fast Quote in Hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#171717] text-[#FFC43C] flex items-center justify-center font-black text-[11px]">✓</span>
                    <span>CAD & Slicing Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#171717] text-[#FFC43C] flex items-center justify-center font-black text-[11px]">✓</span>
                    <span>Nationwide Courier</span>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Direct Action Card */}
              <div className="lg:col-span-5 flex flex-col items-stretch">
                <SubtleDepthCard maxRotate={2}>
                  <div className="bg-white text-[#171717] border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#171717] flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black font-heading uppercase text-[#171717] tracking-tight mb-2">
                        START YOUR PROJECT
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#6D6D6D] leading-relaxed mb-6">
                        Choose from standard 3D formats (.STL, .OBJ, .STEP) or upload a photo sketch with dimensions.
                      </p>

                      <div className="space-y-2.5 mb-6 text-xs font-bold text-[#171717]">
                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FFF9ED] border-2 border-[#171717]">
                          <Upload className="w-4 h-4 text-[#FF8A00] stroke-[2.5px]" />
                          <span>Upload STL, OBJ, STEP, or Reference Photos</span>
                        </div>
                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FFF9ED] border-2 border-[#171717]">
                          <MessageCircle className="w-4 h-4 text-[#FF8A00] stroke-[2.5px]" />
                          <span>Direct Engineering Advice & Material Selection</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href="/custom-print"
                      onClick={handleStart}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#262626] text-white border-2.5 border-[#171717] rounded-2xl py-4 text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#FFC43C] hover:shadow-[6px_6px_0px_0px_#FFC43C] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer select-none text-center"
                    >
                      <span>START A CUSTOM PROJECT</span>
                      <ArrowRight className="w-4 h-4 stroke-[3px]" />
                    </a>
                  </div>
                </SubtleDepthCard>
              </div>

            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

