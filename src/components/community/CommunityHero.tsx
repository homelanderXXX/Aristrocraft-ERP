import React from 'react';
import { ArrowRight, Compass, Upload, Layers } from 'lucide-react';

interface CommunityHeroProps {
  onStartProject: () => void;
  onExploreCreations: () => void;
}

export const CommunityHero: React.FC<CommunityHeroProps> = ({
  onStartProject,
  onExploreCreations,
}) => {
  return (
    <section className="relative w-full pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden bg-[#FFF9ED] border-b-2 border-[#171717]">
      {/* Subtle architectural dot grid background */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Top Eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold tracking-widest uppercase shadow-[2px_2px_0px_0px_#FF8A00]">
            <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse" />
            <span>CREATIONS & COMMUNITY SHOWCASE</span>
          </div>

          <div className="text-xs font-mono font-bold text-[#171717]/70 uppercase tracking-wider hidden sm:block">
            REAL 3D CREATIONS • COMMUNITY MAKERS • CLIENT SHOWCASE
          </div>
        </div>

        {/* Cinematic Typography Header */}
        <div className="max-w-5xl mb-12 sm:mb-16">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-heading tracking-tight text-[#171717] leading-[0.92] uppercase">
            CREATIONS & <br />
            <span className="text-[#FF8A00]">COMMUNITY.</span>
          </h1>

          <p className="mt-6 sm:mt-8 text-xl sm:text-2xl md:text-3xl text-[#171717]/85 font-normal leading-snug max-w-3xl">
            See what people, creators, and engineers are designing, building and bringing to life with ARISTROCRAFT custom 3D printing.
          </p>

          <p className="mt-3 text-sm sm:text-base font-mono font-bold text-[#171717]/65 uppercase tracking-wider">
            From first sketch to finished physical object.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onStartProject}
              className="px-8 py-4 bg-[#FF8A00] hover:bg-[#e07a00] text-white font-black font-heading text-sm uppercase tracking-wider rounded-2xl border-2 border-[#171717] shadow-[4px_4px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-2.5 cursor-pointer"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onExploreCreations}
              className="px-8 py-4 bg-white hover:bg-[#FFF4DC] text-[#171717] font-black font-heading text-sm uppercase tracking-wider rounded-2xl border-2 border-[#171717] shadow-[4px_4px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-2.5 cursor-pointer"
            >
              <span>EXPLORE CREATIONS</span>
              <Compass className="w-4 h-4 text-[#FF8A00]" />
            </button>
          </div>
        </div>

        {/* Grand Photographic Panorama Composition (Displaying variety of printed physical objects) */}
        <div className="relative rounded-3xl border-3 border-[#171717] overflow-hidden bg-[#171717] shadow-[10px_10px_0px_0px_#171717]">
          
          {/* Main Visual Image Banner */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2000"
              alt="Physical 3D printed components across mechanical, architectural, jewelry and robotics applications"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700 filter brightness-95 contrast-105"
            />
            
            {/* Cinematic Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-black/20 to-transparent" />

            {/* Visual Variety Showcase Pills (Highlighting mechanical, educational, jewelry, architecture, artistic, enclosure, robotics) */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-xl bg-white/95 backdrop-blur-md border-2 border-[#171717] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#171717]">
                <div className="text-[11px] font-mono font-bold uppercase text-[#FF8A00] tracking-wider mb-1">
                  MANUFACTURING SPECTRUM
                </div>
                <div className="text-base sm:text-lg font-black font-heading text-[#171717] uppercase leading-snug">
                  Mechanical • Educational • Jewelry • Architecture • Robotics • Sculptures
                </div>
                <p className="text-xs text-[#171717]/75 mt-1 font-medium">
                  We bridge the gap between imagination and physical form using high-precision additive manufacturing.
                </p>
              </div>

              {/* Minimalist Live Studio Note */}
              <div className="hidden lg:flex items-center gap-3 px-4 py-2.5 bg-[#171717]/90 text-white rounded-xl border border-white/20 backdrop-blur-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A00] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  24–48h Digital Production Studio
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
