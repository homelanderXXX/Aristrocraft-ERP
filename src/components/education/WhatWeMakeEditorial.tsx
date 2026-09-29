import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Cpu,
  GraduationCap,
  Sliders,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { EDUCATION_CATEGORIES, EducationalCategory } from '../../data/educationData';

interface WhatWeMakeEditorialProps {
  onRequestCustomForCategory: (categoryTitle: string) => void;
  onOpenLightbox: (imageUrl: string, title: string, caption: string) => void;
}

export const WhatWeMakeEditorial: React.FC<WhatWeMakeEditorialProps> = ({
  onRequestCustomForCategory,
  onOpenLightbox,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(EDUCATION_CATEGORIES[0].id);

  const selectedCategory =
    EDUCATION_CATEGORIES.find((c) => c.id === activeCategory) || EDUCATION_CATEGORIES[0];

  return (
    <section id="what-we-make" className="w-full py-16 lg:py-24 bg-white border-b-3 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9ED] border-2 border-[#171717] text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] mb-3">
              <span>12 DIGITAL MANUFACTURING DISCIPLINES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#171717] tracking-tight">
              What Can We Make for Education?
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#525252] max-w-2xl mt-2">
              Explore our comprehensive range of custom 3D printed learning models, STEM experiment rigs, kinematic demonstrators, and tactile teaching aids engineered for real classroom use.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRequestCustomForCategory('Custom Syllabus Request')}
            className="px-5 py-3 bg-[#FF8A00] hover:bg-[#FF9B26] text-white border-3 border-[#171717] rounded-xl font-black font-heading text-xs uppercase shadow-[3px_3px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 self-start md:self-auto shrink-0 cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>Request Custom Model for Syllabus</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* HORIZONTAL CATEGORY SELECTOR TABS (SCROLLABLE ON MOBILE) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {EDUCATION_CATEGORIES.map((cat) => {
            const isSelected = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-4 py-2.5 rounded-xl border-2 font-black font-heading text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-150 flex items-center gap-2 cursor-pointer
                  ${
                    isSelected
                      ? 'bg-[#171717] text-white border-[#171717] shadow-[3px_3px_0px_0px_#FF8A00] -translate-y-0.5'
                      : 'bg-[#FFF9ED] text-[#171717] border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFC43C]'
                  }
                `}
              >
                <span className="text-[10px] text-[#FFC43C] font-mono">{cat.num}</span>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* LARGE EDITORIAL COMPOSITION FOR SELECTED CATEGORY */}
        <div className="bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[8px_8px_0px_0px_#171717] transition-all duration-300">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: TITLE, DESCRIPTION, CONCRETE EXAMPLES & LEARNING OUTCOMES */}
            <div className="lg:col-span-7 flex flex-col">
              
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-md bg-[#171717] text-white font-mono text-xs font-black">
                  DISCIPLINE {selectedCategory.num}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#171717] text-[#171717] text-[10px] font-black font-heading uppercase">
                  {selectedCategory.targetLevels.join(' • ')}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black font-heading text-[#171717] tracking-tight mb-2">
                {selectedCategory.title}
              </h3>

              <h4 className="text-sm sm:text-base font-bold text-[#FF8A00] uppercase tracking-wide mb-4">
                {selectedCategory.subtitle}
              </h4>

              <p className="text-sm sm:text-base font-medium text-[#404040] leading-relaxed mb-6">
                {selectedCategory.description}
              </p>

              {/* CONCRETE MANUFACTURED EXAMPLES */}
              <div className="mb-6">
                <h5 className="text-xs font-black font-heading uppercase text-[#171717] tracking-wider mb-3 flex items-center gap-1.5">
                  <span>WHAT WE COMMONLY MANUFACTURE FOR THIS SUBJECT:</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCategory.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-start gap-2 text-xs font-bold text-[#171717]"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#FFC43C] border border-[#171717] flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TECHNICAL MATERIALS & LEARNING GOALS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] mb-6">
                <div>
                  <span className="text-[10px] font-black font-heading uppercase text-[#737373] block mb-1">
                    SUGGESTED POLYMERS & PROCESSES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCategory.suggestedMaterials.map((mat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#FFF9ED] border border-[#171717] text-[10px] font-bold text-[#171717]"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-black font-heading uppercase text-[#737373] block mb-1">
                    PRIMARY LEARNING OUTCOMES
                  </span>
                  <ul className="text-[11px] font-semibold text-[#525252] space-y-1">
                    {selectedCategory.learningOutcomes.map((out, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ACTION TRIGGER */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onRequestCustomForCategory(selectedCategory.title)}
                  className="px-5 py-3 bg-[#FF8A00] hover:bg-[#FF9B26] text-white border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase shadow-[3px_3px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Request {selectedCategory.title} Models</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: LARGE EDITORIAL PHOTO SHOWCASE + MINI GALLERY */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* MAIN FEATURED PHOTO */}
              <div className="relative rounded-2xl border-3 border-[#171717] overflow-hidden bg-white shadow-[4px_4px_0px_0px_#171717] group">
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img
                    src={selectedCategory.featuredImage}
                    alt={selectedCategory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/85 via-[#171717]/20 to-transparent" />
                  
                  <button
                    type="button"
                    onClick={() =>
                      onOpenLightbox(
                        selectedCategory.featuredImage,
                        selectedCategory.title,
                        `${selectedCategory.title} — 3D Printed Teaching Artifact`
                      )
                    }
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 border-2 border-[#171717] text-[#171717] flex items-center justify-center shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFC43C] transition-colors cursor-pointer"
                    aria-label="Enlarge image"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-black font-heading uppercase text-[#FFC43C] tracking-wider block">
                      STUDIO SPECIMEN REPLICA
                    </span>
                    <h4 className="text-base font-black font-heading leading-tight">
                      {selectedCategory.title} Physical Teaching Aid
                    </h4>
                  </div>
                </div>
              </div>

              {/* 2 SMALLER SUPPORTING GALLERY PHOTOS */}
              <div className="grid grid-cols-2 gap-3">
                {selectedCategory.galleryImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      onOpenLightbox(
                        img,
                        `${selectedCategory.title} Demonstration ${i + 1}`,
                        `Close-up laboratory inspection model for ${selectedCategory.title}.`
                      )
                    }
                    className="group relative rounded-xl border-2 border-[#171717] overflow-hidden bg-white shadow-[2px_2px_0px_0px_#171717] cursor-pointer"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={img}
                        alt={`${selectedCategory.title} example ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#171717]/30 group-hover:bg-transparent transition-colors" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] text-[11px] font-bold text-[#525252] flex items-center justify-between">
                <span>Need a specific CAD modification?</span>
                <span className="text-[#FF8A00] font-black uppercase">Custom Tolerancing Available</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
