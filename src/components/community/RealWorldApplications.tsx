import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { APPLICATION_PILLARS } from '../../data/communityData';

interface RealWorldApplicationsProps {
  onStartCustomOrder?: () => void;
}

export const RealWorldApplications: React.FC<RealWorldApplicationsProps> = ({
  onStartCustomOrder,
}) => {
  return (
    <section className="relative w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[2px_2px_0px_0px_#FF8A00]">
            <span>APPLIED MANUFACTURING</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading text-[#171717] uppercase tracking-tight leading-[0.95]">
            FAR BEYOND <br />
            <span className="text-[#FF8A00]">PLASTIC NOVELTIES.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#171717]/80 font-medium max-w-2xl">
            From precision mechanical gears in aerospace prototypes to castable resin masters in high-carat jewelry, 3D printing is an industrial digital production tool.
          </p>
        </div>

        {/* 3 Large Visual Editorial Compositions */}
        <div className="space-y-16 sm:space-y-24">
          {APPLICATION_PILLARS.map((pillar, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={pillar.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                
                {/* Visual Imagery Duo (7 cols) */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="grid grid-cols-12 gap-4 items-center">
                    
                    {/* Dominant Primary Photograph */}
                    <div className="col-span-8 rounded-3xl border-3 border-[#171717] overflow-hidden bg-[#171717] shadow-[8px_8px_0px_0px_#171717] aspect-[4/3] relative group">
                      <img
                        src={pillar.mainImage}
                        alt={pillar.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/60 via-transparent to-transparent" />
                    </div>

                    {/* Secondary Detail Photograph */}
                    <div className="col-span-4 rounded-2xl border-2 border-[#171717] overflow-hidden bg-[#171717] shadow-[4px_4px_0px_0px_#171717] aspect-[3/4] relative group">
                      <img
                        src={pillar.secondaryImage}
                        alt={`${pillar.title} Detail`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                      />
                    </div>

                  </div>
                </div>

                {/* Narrative & Highlights (5 cols) */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="text-xs font-mono font-bold uppercase text-[#FF8A00] tracking-wider mb-2">
                    {pillar.category}
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-[#171717] uppercase tracking-tight leading-tight mb-4">
                    {pillar.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#171717]/80 font-normal leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2.5 mb-6">
                    {pillar.highlightItems.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#FF8A00] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#171717]/85 font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Callout Note */}
                  <div className="p-4 bg-white border-2 border-[#171717] rounded-xl shadow-[3px_3px_0px_0px_#171717] flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#171717]">
                      {pillar.accentNote}
                    </span>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
