import React from 'react';
import { ArrowRight, Compass, Upload, Layers } from 'lucide-react';

interface EducationHeroProps {
  onExploreSubjects: () => void;
  onRequestCustom: () => void;
  onViewInstitutional: () => void;
}

export const EducationHero: React.FC<EducationHeroProps> = ({
  onExploreSubjects,
  onRequestCustom,
  onViewInstitutional,
}) => {
  return (
    <section className="relative w-full pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b-2 border-[#171717] bg-[#FFF9ED]">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#171717]/15">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse" />
            ARISTROCRAFT EDUCATION & STEM LABS
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-[#171717]/70">
            <span>DHAKA FABRICATION HUB</span>
            <span>•</span>
            <span>TOLERANCE ±0.15mm</span>
            <span>•</span>
            <span>K-12 TO UNIVERSITY</span>
          </div>
        </div>

        {/* Hero Editorial Headline & Intro */}
        <div className="max-w-4xl mb-10 md:mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight text-[#171717] leading-[1.05] uppercase">
            TURN LESSONS INTO <br className="hidden sm:inline" />
            <span className="text-[#FF8A00] underline decoration-4 decoration-[#171717] underline-offset-8">
              SOMETHING STUDENTS
            </span>{' '}
            CAN TOUCH.
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-[#171717]/85 font-normal leading-relaxed max-w-3xl">
            From anatomy and physics to robotics, geography and engineering, ARISTROCRAFT creates physical 3D learning tools that make difficult ideas easier to see, understand and remember.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreSubjects}
              className="px-6 py-3.5 bg-[#FF8A00] hover:bg-[#e07a00] text-white font-black font-heading text-sm uppercase tracking-wider rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] hover:shadow-[1px_1px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-2"
            >
              <span>EXPLORE 12 SUBJECTS</span>
              <Compass className="w-4 h-4" />
            </button>

            <button
              onClick={onRequestCustom}
              className="px-6 py-3.5 bg-white hover:bg-[#FFF9ED] text-[#171717] font-black font-heading text-sm uppercase tracking-wider rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] hover:shadow-[1px_1px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-2"
            >
              <span>CUSTOM CURRICULUM PROJECT</span>
              <ArrowRight className="w-4 h-4 text-[#FF8A00]" />
            </button>

            <button
              onClick={onViewInstitutional}
              className="px-4 py-3 text-xs font-mono font-bold text-[#171717]/80 hover:text-[#171717] underline underline-offset-4 transition-colors"
            >
              Institutional Orders &gt;
            </button>
          </div>
        </div>

        {/* HERO VISUAL COMPOSITION (LARGE EDITORIAL SPREAD) */}
        <div className="relative mt-6 lg:mt-10">
          
          {/* Main Panoramic Showcase */}
          <div className="relative rounded-2xl md:rounded-3xl border-2 border-[#171717] overflow-hidden shadow-[6px_6px_0px_0px_#171717] bg-black">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=85&w=2000"
              alt="ARISTROCRAFT 3D Printed Educational Models and Laboratory Classroom Specimens"
              className="w-full h-[360px] sm:h-[480px] md:h-[580px] object-cover opacity-90 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Overlaid Editorial Highlights on Image */}
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 text-white">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FF8A00] text-white text-[10px] font-mono font-black uppercase rounded-md mb-2">
                  REAL PHYSICAL CLASSROOM SPECIMENS
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-heading tracking-tight leading-tight">
                  Dissectible Hearts • Epicyclic Gearboxes • Tactile Topography • STEM Kits
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-mono mt-1">
                  Engineered in Dhaka with bio-grade tough polymers & 8K precision resin.
                </p>
              </div>

              <div className="hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-xs font-mono">
                <div>
                  <span className="block text-[#FFC43C] font-bold">14+ PRODUCT LINES</span>
                  <span className="text-white/70">For Schools & Labs</span>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <div>
                  <span className="block text-[#FFC43C] font-bold">24-48H DISPATCH</span>
                  <span className="text-white/70">Across Bangladesh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overlapping Specimen Badges & Visual Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 -mt-6 sm:-mt-10 mx-2 sm:mx-6 relative z-20">
            
            <div className="bg-white p-3 sm:p-4 rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#171717]/20">
                <img
                  src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=200"
                  alt="Anatomical Heart"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-mono text-[#171717]/60 uppercase">Biology</span>
                <span className="block text-xs sm:text-sm font-black font-heading text-[#171717] truncate">Anatomical Heart</span>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#171717]/20">
                <img
                  src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=200"
                  alt="Planetary Gearbox"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-mono text-[#171717]/60 uppercase">Engineering</span>
                <span className="block text-xs sm:text-sm font-black font-heading text-[#171717] truncate">Kinematic Gears</span>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#171717]/20">
                <img
                  src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=200"
                  alt="Topographic Relief"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-mono text-[#171717]/60 uppercase">Geography</span>
                <span className="block text-xs sm:text-sm font-black font-heading text-[#171717] truncate">Tactile Terrain</span>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#171717]/20">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200"
                  alt="Robotics Chassis"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-mono text-[#171717]/60 uppercase">Robotics</span>
                <span className="block text-xs sm:text-sm font-black font-heading text-[#171717] truncate">Robot Arm 6-DOF</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
