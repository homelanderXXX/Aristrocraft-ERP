import React, { useRef } from 'react';
import { ArrowRight, Box, Check, Cpu, Eye, ShieldCheck, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { SubtleDepthCard } from '../animation/ScrollReveal';
import { HeroCarouselBanner } from './HeroCarouselBanner';

interface HeroSectionProps {
  onStartCustomProject?: () => void;
  onExploreWhatWeMake?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartCustomProject,
  onExploreWhatWeMake,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scroll transformations for cinematic opening sequence
  const heroTextY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -30]), {
    damping: 25,
    stiffness: 120,
  });

  const heroImageParallax = useSpring(useTransform(scrollYProgress, [0, 1], [0, 25]), {
    damping: 25,
    stiffness: 120,
  });

  const heroImageScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.04]), {
    damping: 25,
    stiffness: 120,
  });

  const handleCustomClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onStartCustomProject) onStartCustomProject();
  };

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreWhatWeMake) {
      onExploreWhatWeMake();
    } else {
      const el = document.getElementById('what-we-make');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero Section"
      className="relative w-full overflow-hidden bg-[#FFF9ED] pb-16 sm:pb-20 lg:pb-24 border-b-3 border-[#171717]"
    >
      {/* 1. FULL-BLEED BORDERLESS IMAGE CAROUSEL BANNER (GSAP SCROLL DISSOLVE + ANIME.JS + THREE.JS) */}
      <HeroCarouselBanner />

      {/* Background Architectural Grid for the headline area */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20" aria-hidden="true">
        <div className="w-full h-full bg-[radial-gradient(#171717_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 md:pt-24 lg:pt-28">
        {/* MAIN HEADLINE + SUBHEAD SPLIT ROW (EXPANDED HEIGHT & LUXURY BREATHING ROOM) */}
        <motion.div
          style={shouldReduceMotion ? {} : { y: heroTextY }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] py-6 sm:py-10 mb-14 sm:mb-20"
        >
          
          <div className="lg:col-span-8">
            <motion.h1
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-black font-heading tracking-tight leading-[0.94] text-[#171717] uppercase"
            >
              TURN YOUR IDEAS <br className="hidden sm:inline" />
              INTO <span className="text-[#FF8A00] underline decoration-[#171717] decoration-4 underline-offset-8">REAL OBJECTS.</span>
            </motion.h1>
          </div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex flex-col justify-end"
          >
            <p className="text-base sm:text-lg md:text-xl font-semibold text-[#4A4A4A] leading-relaxed mb-6">
              Custom 3D printing, rapid prototyping, and digital manufacturing for products, engineering parts, educational models, art, and small-batch production.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="/custom-print"
                onClick={handleCustomClick}
                className="inline-flex items-center justify-center gap-2 bg-[#FF8A00] text-white hover:bg-[#E57A00] border-2.5 border-[#171717] rounded-xl px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer select-none"
              >
                <span>START A CUSTOM PROJECT</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </a>

              <a
                href="#what-we-make"
                onClick={handleExploreClick}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#171717] hover:bg-[#FFF9ED] border-2.5 border-[#171717] rounded-xl px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer select-none"
              >
                <span>EXPLORE WHAT WE MAKE</span>
              </a>
            </div>
          </motion.div>

        </motion.div>

        {/* HERO COMPOSITION: MULTI-OBJECT EDITORIAL MOSAIC */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 35, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
        >
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
            
            {/* Primary Large Object: Industrial / Functional Robotics Joint */}
            <SubtleDepthCard maxRotate={2} className="md:col-span-7">
              <div className="w-full bg-[#171717] text-white border-3 border-[#171717] rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#171717] group relative min-h-[360px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-8">
                <motion.img
                  style={shouldReduceMotion ? {} : { y: heroImageParallax, scale: heroImageScale }}
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200"
                  alt="Engineering mechanical gear and robotic linkage 3D printed with precision tolerances"
                  className="absolute inset-0 w-full h-[115%] object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 pointer-events-none will-change-transform"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent pointer-events-none" />

                {/* Floating Top Pill */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FF8A00] text-white text-[11px] font-black font-heading uppercase tracking-wider border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717]">
                    01 / FUNCTIONAL & ENGINEERING
                  </span>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-white/80 bg-[#171717]/80 px-2.5 py-1 rounded-md border border-white/20 backdrop-blur-sm">
                    TOLERANCE ±0.1mm
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="relative z-10 max-w-lg mt-auto">
                  <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase tracking-tight text-white mb-2">
                    MECHANICAL ASSEMBLIES, GEARS & LOAD-BEARING PARTS
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-white/80 leading-relaxed">
                    Printed in Carbon-Fiber Nylon (PA-CF), PETG, and Polycarbonate for industrial machinery, drones, and workshop testing.
                  </p>
                </div>
              </div>
            </SubtleDepthCard>

            {/* Right Stack: Split Editorial Highlights */}
            <div className="md:col-span-5 flex flex-col gap-4 sm:gap-5">
              
              {/* Secondary Object: Anatomical & Educational Model */}
              <SubtleDepthCard maxRotate={2.5}>
                <div className="bg-white border-3 border-[#171717] rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#171717] group relative h-[210px] sm:h-[230px] p-5 sm:p-6 flex flex-col justify-between">
                  <img
                    src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800"
                    alt="High-detail medical bone anatomy and educational visualization model"
                    className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#FFC43C] text-[#171717] text-[10px] font-black font-heading uppercase tracking-wider border-2 border-[#171717]">
                      02 / MEDICAL & STEM
                    </span>
                    <span className="text-[10px] font-black font-heading text-[#171717] uppercase">
                      HIGH ACCURACY
                    </span>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-lg sm:text-xl font-black font-heading uppercase text-[#171717] leading-tight">
                      ANATOMICAL & TEACHING MODELS
                    </h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#4A4A4A] mt-1">
                      Tactile models derived from 3D scans for classrooms, surgeons, and research labs.
                    </p>
                  </div>
                </div>
              </SubtleDepthCard>

              {/* Tertiary Object: Prototyping & Consumer Product Enclosure */}
              <SubtleDepthCard maxRotate={2.5}>
                <div className="bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#171717] group relative h-[210px] sm:h-[230px] p-5 sm:p-6 flex flex-col justify-between">
                  <img
                    src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800"
                    alt="Snap-fit electronics enclosure and customized hardware casing"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#171717] text-white text-[10px] font-black font-heading uppercase tracking-wider border-2 border-[#171717]">
                      03 / ELECTRONICS & PROTOTYPES
                    </span>
                    <span className="text-[10px] font-black font-heading text-[#171717] uppercase">
                      SNAP-FIT READY
                    </span>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-lg sm:text-xl font-black font-heading uppercase text-[#171717] leading-tight">
                      DEVICE CASINGS & CONSUMER MVPS
                    </h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#4A4A4A] mt-1">
                      Custom Arduino/Pi enclosures, sensor brackets, and product packaging test batches.
                    </p>
                  </div>
                </div>
              </SubtleDepthCard>

            </div>

          </div>

          {/* Quick Real Manufacturing Stats Bar */}
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs font-bold">
            <div className="bg-white border-2.5 border-[#171717] rounded-xl p-3 sm:p-3.5 shadow-[3px_3px_0px_0px_#171717] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#34D399] border-2 border-[#171717] flex items-center justify-center text-[#171717] font-black text-sm shrink-0">
                ✓
              </span>
              <div>
                <p className="font-black font-heading text-[#171717] uppercase text-[11px] leading-none">NO TOOLING COST</p>
                <p className="text-[10px] text-[#6D6D6D] mt-0.5">Order 1 part or 500 units</p>
              </div>
            </div>

            <div className="bg-white border-2.5 border-[#171717] rounded-xl p-3 sm:p-3.5 shadow-[3px_3px_0px_0px_#171717] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center text-[#171717] font-black text-sm shrink-0">
                ⚡
              </span>
              <div>
                <p className="font-black font-heading text-[#171717] uppercase text-[11px] leading-none">24–48H RAPID TURN</p>
                <p className="text-[10px] text-[#6D6D6D] mt-0.5">Fast production pipeline</p>
              </div>
            </div>

            <div className="bg-white border-2.5 border-[#171717] rounded-xl p-3 sm:p-3.5 shadow-[3px_3px_0px_0px_#171717] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#FF8A00] border-2 border-[#171717] flex items-center justify-center text-white font-black text-sm shrink-0">
                ⚙
              </span>
              <div>
                <p className="font-black font-heading text-[#171717] uppercase text-[11px] leading-none">10+ POLYMERS & RESIN</p>
                <p className="text-[10px] text-[#6D6D6D] mt-0.5">From PA-CF to Flex TPU</p>
              </div>
            </div>

            <div className="bg-white border-2.5 border-[#171717] rounded-xl p-3 sm:p-3.5 shadow-[3px_3px_0px_0px_#171717] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#171717] border-2 border-[#171717] flex items-center justify-center text-white shrink-0">
                <MapPin className="w-3.5 h-3.5 text-[#FF8A00]" />
              </span>
              <div>
                <p className="font-black font-heading text-[#171717] uppercase text-[11px] leading-none">MADE IN DHAKA</p>
                <p className="text-[10px] text-[#6D6D6D] mt-0.5">Nationwide delivery</p>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

