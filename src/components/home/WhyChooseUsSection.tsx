import React from 'react';
import { Shield, CheckCircle2, Award } from 'lucide-react';
import { WHY_CHOOSE_US_DATA, TRUST_STATS } from '../../data/whyChooseUs';
import { WhyChooseUsCard } from './WhyChooseUsCard';

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-aristrocraft-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF9ED] overflow-hidden border-b-2 border-[#171717]/10"
    >
      {/* ================================================== */}
      {/* BACKGROUND DECORATIVE ACCENTS (aria-hidden) */}
      {/* ================================================== */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Geometric dot matrices */}
        <div className="absolute top-12 right-10 w-48 h-48 opacity-15 bg-[radial-gradient(#171717_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
        <div className="absolute bottom-16 left-8 w-44 h-44 opacity-15 bg-[radial-gradient(#FF8A00_2px,transparent_2px)] [background-size:16px_16px]" />

        {/* Abstract 3D print layer line simulation */}
        <div className="absolute top-1/3 left-0 w-32 h-64 opacity-10 bg-[repeating-linear-gradient(0deg,#171717,#171717_2px,transparent_2px,transparent_8px)]" />
        <div className="absolute bottom-1/4 right-0 w-32 h-64 opacity-10 bg-[repeating-linear-gradient(0deg,#FF8A00,#FF8A00_2px,transparent_2px,transparent_8px)]" />

        {/* Playful geometric floating shapes */}
        <div className="absolute bottom-20 left-1/3 text-[#171717] font-black text-2xl opacity-15 rotate-12">▲</div>
        <div className="absolute bottom-12 right-1/4 text-[#FFC43C] font-black text-3xl opacity-35">●</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          
          {/* Eyebrow Label Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC43C] text-[#171717] border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1.5deg] hover:rotate-0 transition-transform duration-200 mb-4 select-none">
            <span className="text-xs font-black font-heading tracking-wider uppercase">
              WHY ARISTROCRAFT
            </span>
          </div>

          {/* Main Heading */}
          <h2
            id="why-aristrocraft-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black font-heading tracking-tight text-[#171717] uppercase leading-[1.08]"
          >
            Made With Purpose.{' '}
            <span className="text-[#FF8A00] relative inline-block mt-1 sm:mt-0">
              Printed With Precision.
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
            From everyday essentials to completely custom creations, we combine thoughtful design with precision 3D printing to bring your ideas to life.
          </p>
        </div>

        {/* ================================================== */}
        {/* 2 × 2 VALUE PROPOSITION GRID */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 mb-12 sm:mb-16">
          {WHY_CHOOSE_US_DATA.map((item, idx) => (
            <WhyChooseUsCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        {/* ================================================== */}
        {/* TRUST / STATS STRIP */}
        {/* ================================================== */}
        <div className="bg-white border-2.5 sm:border-3 border-[#171717] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#171717]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#171717]/10">
            {TRUST_STATS.map((stat, i) => (
              <div
                key={i}
                className={`
                  flex flex-col items-center text-center justify-center
                  ${i > 1 ? 'pt-6 lg:pt-0' : ''}
                  ${i % 2 === 1 ? 'border-l-2 lg:border-l-0 border-[#171717]/10 pl-4 sm:pl-6 lg:pl-0' : ''}
                  ${i === 0 ? 'lg:pl-0' : 'lg:pl-8'}
                  ${i === TRUST_STATS.length - 1 ? 'lg:pr-0' : 'lg:pr-8'}
                `}
              >
                {/* Stat Badge */}
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black font-heading uppercase tracking-wider bg-[#FFF9ED] border-1.5 border-[#171717] text-[#171717] shadow-[1px_1px_0px_0px_#171717] mb-2">
                  {stat.badge}
                </span>

                {/* Big Metric Value */}
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#171717] tracking-tight leading-none">
                  {stat.value}
                </span>

                {/* Stat Label */}
                <span className="text-xs sm:text-sm font-bold text-[#6D6D6D] uppercase tracking-wider mt-1.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
