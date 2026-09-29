import React from 'react';
import { Mail, Bell, Gift, Zap } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';
import { ScrollReveal } from '../animation/ScrollReveal';

export const NewsletterSection: React.FC = () => {
  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-b-2 border-[#171717]/10"
    >
      {/* ================================================== */}
      {/* BACKGROUND DECORATIVE ACCENTS (aria-hidden) */}
      {/* ================================================== */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle dot matrix patterns */}
        <div className="absolute top-10 left-10 w-44 h-44 opacity-10 bg-[radial-gradient(#171717_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
        <div className="absolute bottom-12 right-12 w-48 h-48 opacity-15 bg-[radial-gradient(#FFC43C_2.5px,transparent_2.5px)] [background-size:14px_14px]" />

        {/* Decorative layer lines / curves */}
        <div className="absolute top-1/2 -right-16 w-48 h-48 rounded-full border-4 border-dashed border-[#FF8A00]/15" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full border-4 border-dashed border-[#171717]/10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ================================================== */}
        {/* MAIN CONTAINER BANNER CARD */}
        {/* ================================================== */}
        <ScrollReveal>
          <div className="bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-[8px_8px_0px_0px_#171717] relative overflow-hidden">
            
            {/* Subtle Corner Glow Accent */}
            <div
              className="absolute top-0 right-0 transform translate-x-10 -translate-y-10 w-40 h-40 bg-[#FFC43C]/25 rounded-full pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* ================================================== */}
              {/* LEFT COLUMN: EYEBROW, HEADING, SUPPORTING TEXT (7 Cols) */}
              {/* ================================================== */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                
                {/* 1. Section Eyebrow */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8A00] text-white border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1.5deg] hover:rotate-0 transition-transform duration-200 mb-4 select-none">
                  <span className="text-xs font-black font-heading tracking-wider uppercase">
                    STAY IN THE LOOP
                  </span>
                </div>

                {/* 2. Main Heading */}
                <h2
                  id="newsletter-heading"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black font-heading tracking-tight text-[#171717] uppercase leading-[1.08]"
                >
                  <span className="text-[#FF8A00] relative inline-block">
                    Fresh Prints. New Ideas.
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
                  </span>{' '}
                  Straight To Your Inbox.
                </h2>

                {/* 3. Supporting Text */}
                <p className="text-xs sm:text-sm md:text-base font-semibold text-[#525252] leading-relaxed mt-4 mb-6 max-w-xl">
                  Get occasional updates about new creations, custom-print ideas, and special drops from ARISTROCRAFT.
                </p>

                {/* 4. Quick Highlights / Micro Badges */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-bold text-[#171717]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-1.5 border-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717]">
                    <Bell className="w-3 h-3 text-[#FF8A00] stroke-[2.5px]" />
                    <span>Early Drop Alerts</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-1.5 border-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717]">
                    <Gift className="w-3 h-3 text-[#34D399] stroke-[2.5px]" />
                    <span>Exclusive Vouchers</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-1.5 border-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717]">
                    <Zap className="w-3 h-3 text-[#FFC43C] stroke-[2.5px]" />
                    <span>Custom Inspo</span>
                  </span>
                </div>
              </div>

              {/* ================================================== */}
              {/* RIGHT COLUMN: NEWSLETTER FORM (5 Cols) */}
              {/* ================================================== */}
              <div className="lg:col-span-5 w-full flex items-center justify-center">
                <NewsletterForm />
              </div>

            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

