import React from 'react';
import { ArrowRight, Layers, Cpu, Wrench, ShieldCheck } from 'lucide-react';
import { FEATURED_CASE_STUDY } from '../../data/communityData';

interface FeaturedProjectSectionProps {
  onStartCustomOrder?: () => void;
}

export const FeaturedProjectSection: React.FC<FeaturedProjectSectionProps> = ({
  onStartCustomOrder,
}) => {
  const { title, subtitle, badge, image, processImage, story, specs } = FEATURED_CASE_STUDY;

  return (
    <section className="relative w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF8A00] text-white rounded-full text-xs font-mono font-bold tracking-widest uppercase shadow-[2px_2px_0px_0px_#171717]">
            <span>{badge}</span>
          </div>
          <span className="text-xs font-mono text-[#171717]/60 font-bold uppercase">
            CASE STUDY ARCHIVE
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading text-[#171717] uppercase tracking-tight leading-[0.98]">
            {title}
          </h2>
          <p className="mt-3 text-base sm:text-xl text-[#171717]/80 font-medium">
            {subtitle}
          </p>
        </div>

        {/* Magazine-Style Split: Large Visual Side + Structured Story Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          
          {/* Visual Column (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Main Hero Photo of the finished assembly */}
            <div className="relative rounded-3xl border-3 border-[#171717] overflow-hidden bg-[#171717] shadow-[8px_8px_0px_0px_#171717] aspect-[4/3] group">
              <img
                src={image}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#171717]/90 text-white border border-white/20 rounded-lg text-xs font-mono font-bold uppercase">
                FINISHED ASSEMBLY
              </div>
            </div>

            {/* In-Process CAD / Slicing Photo */}
            <div className="relative rounded-2xl border-2 border-[#171717] overflow-hidden bg-[#171717] shadow-[4px_4px_0px_0px_#171717] aspect-[16/7] group">
              <img
                src={processImage}
                alt="CAD Topology Optimization Process"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
                <span className="text-xs font-mono text-white/90 font-bold uppercase">
                  CAD Slicing & Fiber Orientation Setup
                </span>
              </div>
            </div>

            {/* Spec Bar */}
            <div className="p-4 bg-white border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div>
                <div className="text-[10px] font-mono text-[#171717]/60 uppercase">MATERIAL</div>
                <div className="text-xs font-black font-heading text-[#171717] mt-0.5">{specs.material}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#171717]/60 uppercase">TOLERANCE</div>
                <div className="text-xs font-black font-heading text-[#171717] mt-0.5">{specs.tolerance}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#171717]/60 uppercase">BATCH</div>
                <div className="text-xs font-black font-heading text-[#171717] mt-0.5">{specs.components}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#171717]/60 uppercase">TURNAROUND</div>
                <div className="text-xs font-black font-heading text-[#171717] mt-0.5">{specs.printTime}</div>
              </div>
            </div>

          </div>

          {/* Story Narrative Column (6 cols) */}
          <div className="lg:col-span-6 bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_#171717] flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* Need */}
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#FF8A00] tracking-wider mb-1 flex items-center gap-1.5">
                  <span>01.</span>
                  <span>THE REQUIREMENT</span>
                </div>
                <p className="text-sm sm:text-base text-[#171717]/85 leading-relaxed font-medium">
                  {story.clientNeed}
                </p>
              </div>

              {/* Challenge */}
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#FF8A00] tracking-wider mb-1 flex items-center gap-1.5">
                  <span>02.</span>
                  <span>THE CHALLENGE</span>
                </div>
                <p className="text-sm sm:text-base text-[#171717]/85 leading-relaxed font-medium">
                  {story.challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#FF8A00] tracking-wider mb-1 flex items-center gap-1.5">
                  <span>03.</span>
                  <span>THE MANUFACTURING SOLUTION</span>
                </div>
                <p className="text-sm sm:text-base text-[#171717]/85 leading-relaxed font-medium">
                  {story.solution}
                </p>
              </div>

              {/* Result */}
              <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl">
                <div className="text-xs font-mono font-bold uppercase text-[#171717] tracking-wider mb-1 flex items-center gap-1.5">
                  <span>04.</span>
                  <span>PHYSICAL OUTCOME</span>
                </div>
                <p className="text-xs sm:text-sm text-[#171717]/90 leading-relaxed font-bold">
                  {story.result}
                </p>
              </div>

            </div>

            {/* CTA */}
            {onStartCustomOrder && (
              <div className="pt-6 mt-6 border-t-2 border-[#171717]/15 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#171717]">
                  HAVE A COMPLEX PROTOTYPE?
                </span>
                <button
                  type="button"
                  onClick={onStartCustomOrder}
                  className="px-5 py-2.5 bg-[#FF8A00] hover:bg-[#e07a00] text-white font-black font-heading text-xs uppercase tracking-wider rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:translate-x-[1px] hover:translate-y-[1px] transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>START CUSTOM PROTOTYPE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
