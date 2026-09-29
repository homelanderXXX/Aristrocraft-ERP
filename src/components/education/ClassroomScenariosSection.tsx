import React, { useState } from 'react';
import { CLASSROOM_SCENARIOS, ClassroomScenario } from '../../data/educationData';
import { Sparkles, Eye, ArrowRight } from 'lucide-react';

interface ClassroomScenariosProps {
  onOpenLightbox: (url: string, title: string, caption: string) => void;
  onRequestCustom: (subject: string) => void;
}

export const ClassroomScenariosSection: React.FC<ClassroomScenariosProps> = ({
  onOpenLightbox,
  onRequestCustom,
}) => {
  const [activeScenario, setActiveScenario] = useState<number>(0);

  return (
    <section className="w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-4">
            REAL-WORLD PEDAGOGY
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] tracking-tight uppercase leading-[1.05]">
            IMAGINE THIS IN <br />
            <span className="text-[#FF8A00]">YOUR CLASSROOM.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#171717]/80 leading-relaxed">
            See how educators and students across Bangladesh use ARISTROCRAFT manufactured models in real daily lessons.
          </p>
        </div>

        {/* Large Featured Scenario Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border-2 border-[#171717] p-6 sm:p-8 md:p-10 shadow-[6px_6px_0px_0px_#171717] mb-12">
          
          {/* Main Showcase Image (Left) */}
          <div className="lg:col-span-7">
            <div
              onClick={() => {
                const scen = CLASSROOM_SCENARIOS[activeScenario];
                onOpenLightbox(scen.image, scen.title, scen.caption);
              }}
              className="relative rounded-2xl overflow-hidden border-2 border-[#171717] aspect-[16/10] bg-black cursor-pointer group shadow-sm"
            >
              <img
                src={CLASSROOM_SCENARIOS[activeScenario].image}
                alt={CLASSROOM_SCENARIOS[activeScenario].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#FF8A00] text-white font-mono text-xs font-bold uppercase rounded-md shadow">
                {CLASSROOM_SCENARIOS[activeScenario].tag}
              </span>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm sm:text-base font-mono font-bold text-[#FFC43C]">
                  {CLASSROOM_SCENARIOS[activeScenario].caption}
                </p>
              </div>
            </div>
          </div>

          {/* Scenario Content & Narrative (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF8A00] uppercase tracking-wider block mb-1">
                SCENARIO 0{activeScenario + 1} • {CLASSROOM_SCENARIOS[activeScenario].subject}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#171717] tracking-tight uppercase leading-tight">
                {CLASSROOM_SCENARIOS[activeScenario].title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#171717]/85 leading-relaxed">
              {CLASSROOM_SCENARIOS[activeScenario].description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onRequestCustom(CLASSROOM_SCENARIOS[activeScenario].subject)}
                className="px-5 py-2.5 bg-[#FF8A00] hover:bg-[#e07a00] text-white font-black font-heading text-xs uppercase tracking-wider rounded-xl border border-[#171717] shadow-[2px_2px_0px_0px_#171717] transition-all inline-flex items-center gap-2"
              >
                <span>ORDER FOR YOUR SCHOOL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  const scen = CLASSROOM_SCENARIOS[activeScenario];
                  onOpenLightbox(scen.image, scen.title, scen.caption);
                }}
                className="px-4 py-2.5 bg-[#FFF9ED] text-[#171717] font-bold font-mono text-xs uppercase rounded-xl border border-[#171717] shadow-sm inline-flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> Fullscreen View
              </button>
            </div>
          </div>

        </div>

        {/* 5 Scenario Selector Tabs / Visual Previews */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CLASSROOM_SCENARIOS.map((scenario: ClassroomScenario, idx: number) => {
            const isSelected = activeScenario === idx;
            return (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(idx)}
                className={`p-3 rounded-2xl border-2 transition-all text-left flex flex-col justify-between gap-2.5 ${
                  isSelected
                    ? 'bg-[#171717] text-white border-[#171717] shadow-[4px_4px_0px_0px_#FF8A00] -translate-y-1'
                    : 'bg-white text-[#171717] border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFF9ED]'
                }`}
              >
                <div className="w-full h-24 rounded-xl overflow-hidden border border-current/20 bg-black">
                  <img
                    src={scenario.image}
                    alt={scenario.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className={`text-[10px] font-mono font-bold block uppercase ${
                    isSelected ? 'text-[#FF8A00]' : 'text-[#171717]/60'
                  }`}>
                    0{idx + 1} • {scenario.subject}
                  </span>
                  <span className="text-xs font-black font-heading line-clamp-1">
                    {scenario.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
