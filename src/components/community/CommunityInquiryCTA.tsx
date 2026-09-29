import React from 'react';
import { ArrowRight, Compass, Upload, Layers } from 'lucide-react';

interface CommunityInquiryCTAProps {
  onStartCustomProject: () => void;
  onViewIndustries: () => void;
}

export const CommunityInquiryCTA: React.FC<CommunityInquiryCTAProps> = ({
  onStartCustomProject,
  onViewIndustries,
}) => {
  return (
    <section className="relative w-full py-20 md:py-32 bg-[#171717] text-white overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#FFF9ED_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Typography Column (7 cols) */}
          <div className="lg:col-span-7">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FF8A00] text-[#171717] rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-6 shadow-[2px_2px_0px_0px_#fff]">
              <span>CUSTOM DIGITAL FABRICATION</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading text-white uppercase tracking-tight leading-[0.92]">
              YOU HAVE THE IDEA. <br />
              <span className="text-[#FF8A00]">WE'LL HELP MAKE IT REAL.</span>
            </h2>

            <p className="mt-6 text-lg sm:text-xl md:text-2xl text-white/85 font-normal leading-relaxed max-w-2xl">
              Have something unusual in mind? Send us your idea, drawing, reference image or 3D file.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStartCustomProject}
                className="px-8 py-4 bg-[#FF8A00] hover:bg-[#e07a00] text-white font-black font-heading text-sm uppercase tracking-wider rounded-2xl border-2 border-white shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-2.5 cursor-pointer"
              >
                <span>START A CUSTOM PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onViewIndustries}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-black font-heading text-sm uppercase tracking-wider rounded-2xl border-2 border-white/30 backdrop-blur-sm transition-all inline-flex items-center gap-2.5 cursor-pointer"
              >
                <span>VIEW OUR INDUSTRIES</span>
                <Compass className="w-4 h-4 text-[#FF8A00]" />
              </button>
            </div>

          </div>

          {/* Photographic Showcase Frame (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border-3 border-white/20 overflow-hidden bg-black shadow-[12px_12px_0px_0px_#FF8A00] aspect-[4/3] sm:aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200"
                alt="High-precision finished 3D printed mechanical assembly in hand"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#FFF9ED]/95 backdrop-blur-md rounded-2xl border-2 border-[#171717] text-[#171717]">
                <div className="text-[10px] font-mono font-bold uppercase text-[#FF8A00]">
                  READY FOR PRODUCTION
                </div>
                <div className="text-sm font-black font-heading uppercase">
                  Fast Turnaround • Dhaka Digital Lab
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
