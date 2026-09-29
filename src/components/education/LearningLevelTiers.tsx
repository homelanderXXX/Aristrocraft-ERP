import React from 'react';
import {
  ArrowRight,
  GraduationCap,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Boxes,
} from 'lucide-react';
import { LEARNING_LEVEL_TIERS } from '../../data/educationData';

interface LearningLevelTiersProps {
  onSelectTier: (tierName: string) => void;
}

export const LearningLevelTiers: React.FC<LearningLevelTiersProps> = ({ onSelectTier }) => {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#FFF9ED] border-b-3 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#171717] text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span>PEDAGOGICAL ALIGNMENT & ERGONOMICS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#171717] tracking-tight">
              Curriculum Tiers & Age Groups
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#525252] max-w-2xl mt-2">
              We engineer each educational artifact to meet specific developmental needs—from drop-resistant bio-polymers for early sensory learners to sub-millimeter 8K SLA resin for postgrad engineering research.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] text-xs font-bold text-[#171717]">
            3 Pedagogical Manufacturing Tiers
          </div>
        </div>

        {/* 3 EDITORIAL TIERS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {LEARNING_LEVEL_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-7 shadow-[6px_6px_0px_0px_#171717] hover:shadow-[8px_8px_0px_0px_#171717] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* PHOTO HEADER */}
                <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden relative border-2 border-[#171717] mb-5 bg-[#FFF9ED]">
                  <img
                    src={tier.image}
                    alt={tier.level}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/85 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717]">
                    {tier.ageRange}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg sm:text-xl font-black font-heading leading-tight">
                      {tier.level}
                    </h3>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-[#FF8A00] leading-snug mb-3">
                  {tier.headline}
                </h4>

                <p className="text-xs sm:text-sm font-medium text-[#525252] leading-relaxed mb-5">
                  {tier.description}
                </p>

                {/* FOCUS AREAS PILLS */}
                <div className="mb-5">
                  <span className="text-[10px] font-black font-heading uppercase text-[#737373] block mb-2">
                    CORE FOCUS DISCIPLINES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tier.focusAreas.map((area, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#FFF9ED] border border-[#171717] text-[11px] font-bold text-[#171717]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* TECHNICAL SPECIFICATION */}
                <div className="p-3.5 rounded-xl bg-[#FFF9ED] border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] mb-6">
                  <span className="text-[10px] font-black font-heading uppercase text-[#737373] block mb-1">
                    ENGINEERING & PRINT STANDARD:
                  </span>
                  <span className="text-xs font-bold text-[#171717] leading-relaxed block">
                    {tier.recommendedTech}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectTier(tier.level)}
                className="w-full py-3 bg-[#FF8A00] hover:bg-[#FF9B26] text-white border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase shadow-[3px_3px_0px_0px_#171717] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request {tier.level} Models</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
