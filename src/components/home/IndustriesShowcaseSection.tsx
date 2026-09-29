import React, { useState } from 'react';
import { ArrowRight, Factory, Layers, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useRouter } from '../../context/RouterContext';
import { ScrollReveal, SubtleDepthCard } from '../animation/ScrollReveal';

interface IndustryPreviewItem {
  id: string;
  name: string;
  headline: string;
  shortDesc: string;
  image: string;
  materialUsed: string;
  techBadge: string;
  link: string;
  examples: string[];
}

export const IndustriesShowcaseSection: React.FC = () => {
  const { navigate } = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const industries: IndustryPreviewItem[] = [
    {
      id: 'engineering-industrial',
      name: 'ENGINEERING & INDUSTRIAL',
      headline: 'Heavy-duty brackets, mechanical linkages & factory jigs',
      shortDesc: 'Eliminate tooling delays. Manufacture functional carbon-fiber parts, replacement machine components, and assembly fixtures for factory floors.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
      materialUsed: 'Carbon Fiber Nylon (PA-CF), PETG, PC',
      techBadge: 'Industrial FDM & SLS',
      link: '/industries/engineering-industrial',
      examples: ['Functional Gears', 'Assembly Jigs', 'Custom Mounts', 'Machine Spare Parts'],
    },
    {
      id: 'medical-dental',
      name: 'MEDICAL & DENTAL',
      headline: 'CT-scan bone replicas, surgical guides & dental study arches',
      shortDesc: 'Patient-specific anatomical models for pre-operative rehearsal, medical device prototypes, and dental demonstration arches printed with ultra-crisp resins.',
      image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=1200',
      materialUsed: 'Tough & Biocompatible SLA Resins',
      techBadge: 'Sub-Millimeter SLA',
      link: '/industries/medical-dental',
      examples: ['Anatomical Skulls', 'Orthodontic Dies', 'Surgical Replicas', 'Lab Fluidics'],
    },
    {
      id: 'robotics-drones',
      name: 'ROBOTICS & DRONES',
      headline: 'Lightweight drone arms, servo brackets & gripper claws',
      shortDesc: 'Maximize structural strength while cutting weight. Print shock-absorbing quadcopter frames, motor brackets, and vibration-damped camera mounts.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
      materialUsed: 'PA-CF, TPU 95A, Tough PLA',
      techBadge: 'High Strength-to-Weight',
      link: '/industries/robotics-drones',
      examples: ['Quadcopter Arms', 'Manipulator Grippers', 'Servo Mounts', 'Gimbal Cages'],
    },
    {
      id: 'architecture-interior',
      name: 'ARCHITECTURE & INTERIOR',
      headline: 'High-detail building models, terrain contours & spatial mockups',
      shortDesc: 'Transform CAD schematics into stunning tactile scale models for client pitches, urban planning presentations, and interior volume evaluations.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      materialUsed: 'Architectural Matte PLA, White SLA',
      techBadge: 'Large-Format Precision',
      link: '/industries/architecture-interior',
      examples: ['Skyscraper Models', 'GIS Topographic Maps', 'Floor Cutaways', 'Facade Details'],
    },
    {
      id: 'automotive',
      name: 'AUTOMOTIVE',
      headline: 'Interior cabin trim, heat-tolerant brackets & vintage car parts',
      shortDesc: 'Fast turnarounds for custom dashboard gauge pods, intake ducting prototypes, wire organizers, and out-of-production vintage gear replacements.',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=1200',
      materialUsed: 'ASA (UV Resistant), ABS-HT, Nylon',
      techBadge: 'Thermal & UV Resilient',
      link: '/industries/automotive',
      examples: ['Vent Bezels', 'Wire Brackets', 'Vintage Gears', 'Cabin Organizers'],
    },
    {
      id: 'jewelry-fashion',
      name: 'JEWELRY & FASHION',
      headline: 'Direct investment wax patterns, intricate rings & wearable accessories',
      shortDesc: 'Bypass mechanical limits with castable wax resins. Design intricate geometric pendants, signet rings, and runway fashion accessories.',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200',
      materialUsed: 'Castable Wax Resin, Ultra-Detail SLA',
      techBadge: '25-Micron Resolution',
      link: '/industries/jewelry-fashion',
      examples: ['Wax Ring Molds', 'Custom Pendants', 'Artisan Buckles', 'Fashion Armor'],
    },
  ];

  const current = industries[activeIdx];

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b-3 border-[#171717]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <ScrollReveal>
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC43C] text-[#171717] border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1deg] mb-3.5 select-none">
              <span className="text-[11px] sm:text-xs font-black font-heading tracking-wider uppercase">
                CROSS-DISCIPLINE CAPABILITY
              </span>
            </div>

            <h2
              id="industries-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#171717] uppercase leading-none"
            >
              MADE FOR MORE THAN <span className="text-[#FF8A00]">ONE INDUSTRY.</span>
            </h2>

            <p className="text-base sm:text-lg font-semibold text-[#4A4A4A] mt-3 leading-relaxed">
              3D printing isn&apos;t limited to toys and models. The same technology can create engineering parts, educational tools, architectural models, jewelry, medical visualization aids, and much more.
            </p>
          </div>
        </ScrollReveal>

        {/* LARGE EDITORIAL DUAL-PANE SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column (5 cols): Interactive Industry Nav List */}
          <ScrollReveal delay={0.1} className="lg:col-span-5 flex flex-col gap-2.5 justify-center">
            {industries.map((ind, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`
                    w-full text-left p-4 sm:p-4.5 rounded-2xl border-2.5 transition-all cursor-pointer flex items-center justify-between
                    ${
                      isActive
                        ? 'bg-[#171717] text-white border-[#171717] shadow-[4px_4px_0px_0px_#FF8A00] translate-x-1.5'
                        : 'bg-[#FFF9ED] text-[#171717] border-[#171717]/20 hover:border-[#171717] hover:bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.06)]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`
                        w-7 h-7 rounded-lg border text-xs font-black font-heading flex items-center justify-center
                        ${
                          isActive
                            ? 'bg-[#FF8A00] text-white border-white/20'
                            : 'bg-white text-[#171717] border-[#171717]'
                        }
                      `}
                    >
                      0{idx + 1}
                    </span>
                    <span className="font-black font-heading text-xs sm:text-sm uppercase tracking-wide">
                      {ind.name}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 stroke-[3px] transition-transform ${
                      isActive ? 'text-[#FFC43C] translate-x-1' : 'text-[#171717]/40'
                    }`}
                  />
                </button>
              );
            })}

            <div className="mt-4 pt-4 border-t-2 border-[#171717]/10">
              <button
                onClick={() => navigate('/industries')}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FF8A00] text-white hover:bg-[#E57A00] border-2.5 border-[#171717] rounded-xl py-3 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[3px_3px_0px_0px_#171717] hover:shadow-[5px_5px_0px_0px_#171717] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>EXPLORE ALL INDUSTRIES</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </button>
            </div>
          </ScrollReveal>

          {/* Right Column (7 cols): Large Featured Photography & Deep Details */}
          <ScrollReveal delay={0.2} className="lg:col-span-7 h-full">
            <SubtleDepthCard maxRotate={1.5} className="h-full">
              <div className="bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl overflow-hidden shadow-[7px_7px_0px_0px_#171717] flex flex-col justify-between h-full">
                
                {/* Top Featured Photo */}
                <div className="relative w-full h-[280px] sm:h-[340px] overflow-hidden border-b-3 border-[#171717]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={current.id}
                      src={current.image}
                      alt={current.name}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </AnimatePresence>

                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <span className="px-3 py-1 rounded-lg bg-[#171717] text-white text-[10px] sm:text-xs font-black font-heading uppercase tracking-wider border-2 border-white/20 shadow-[2px_2px_0px_0px_#171717]">
                      {current.techBadge}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#FFC43C] text-[#171717] text-[10px] sm:text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717]">
                      {current.materialUsed}
                    </span>
                  </div>
                </div>

                {/* Bottom Content Body */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-heading uppercase text-[#171717] tracking-tight mb-2">
                      {current.headline}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#4A4A4A] leading-relaxed mb-5">
                      {current.shortDesc}
                    </p>

                    {/* Example Product Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {current.examples.map((ex, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white border-2 border-[#171717] rounded-lg text-[11px] font-black font-heading uppercase tracking-wide text-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717]"
                        >
                          ✓ {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t-2 border-[#171717]/10">
                    <button
                      onClick={() => navigate(current.link)}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading uppercase tracking-wider text-[#FF8A00] hover:text-[#171717] transition-colors cursor-pointer"
                    >
                      <span>VIEW DETAILED {current.name} GUIDE</span>
                      <ArrowRight className="w-4 h-4 stroke-[3px]" />
                    </button>

                    <button
                      onClick={() => navigate('/custom-print')}
                      className="px-4 py-2 bg-[#171717] text-white border-2 border-[#171717] rounded-lg text-xs font-black font-heading uppercase tracking-wider hover:bg-[#FF8A00] transition-colors cursor-pointer"
                    >
                      START ORDER
                    </button>
                  </div>
                </div>

              </div>
            </SubtleDepthCard>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};

