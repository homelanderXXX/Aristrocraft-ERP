import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TRANSFORMATION_STEPS } from '../../data/communityData';

interface MadeRealSectionProps {
  onStartCustomOrder?: () => void;
}

export const MadeRealSection: React.FC<MadeRealSectionProps> = ({ onStartCustomOrder }) => {
  return (
    <section className="relative w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[2px_2px_0px_0px_#FF8A00]">
            <span>HOW IT HAPPENS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading text-[#171717] uppercase tracking-tight leading-[0.95]">
            FROM AN IDEA TO <br />
            <span className="text-[#FF8A00]">SOMETHING YOU CAN HOLD.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#171717]/80 font-medium max-w-2xl">
            You bring the idea, sketch, or digital file. We handle the geometry, engineering, and manufacturing to place a finished physical part in your hands.
          </p>
        </div>

        {/* 4 Large Images Horizontal Storytelling Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {TRANSFORMATION_STEPS.map((step, idx) => (
            <div key={step.number} className="flex flex-col">
              
              {/* Image Frame */}
              <div className="relative aspect-[4/5] w-full rounded-2xl border-3 border-[#171717] overflow-hidden bg-[#171717] shadow-[6px_6px_0px_0px_#171717] group">
                <img
                  src={step.image}
                  alt={`${step.title} - ${step.subtitle}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-black/30" />

                {/* Step Marker Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#FF8A00] text-[#171717] rounded-lg border-2 border-[#171717] text-xs font-black font-heading tracking-wider uppercase shadow-[2px_2px_0px_0px_#171717]">
                  {step.number}
                </div>

                {/* Subtle Sequential Arrow Indicator (for desktop) */}
                {idx < 3 && (
                  <div className="hidden lg:flex absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border-2 border-[#171717] items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}

                {/* Bottom Image Caption Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-[#171717] shadow-[2px_2px_0px_0px_#171717]">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#FF8A00] tracking-wider">
                    {step.subtitle}
                  </div>
                  <div className="text-sm font-black font-heading text-[#171717] uppercase leading-tight">
                    {step.title}
                  </div>
                  <div className="text-[11px] text-[#171717]/75 font-medium mt-0.5 leading-snug">
                    {step.caption}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Minimalist Narrative Footnote */}
        <div className="mt-12 pt-8 border-t border-[#171717]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#171717]/70">
          <div>
            <span>ACCEPTED INPUTS: HAND SKETCHES • 2D DRAWINGS • CAD (.STEP, .STL, .OBJ, .3MF)</span>
          </div>
          {onStartCustomOrder && (
            <button
              type="button"
              onClick={onStartCustomOrder}
              className="text-[#FF8A00] hover:text-[#171717] font-bold uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>BRING YOUR IDEA TO LIFE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
