import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Upload,
  Layers,
  Cpu,
  ArrowLeft,
  ChevronRight,
  HelpCircle,
  FileText,
  Workflow,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Activity,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from '../../context/RouterContext';
import { CustomOrderModal } from '../../components/shop/CustomOrderModal';
import { PageMeta } from '../../components/common/PageMeta';
import { INDUSTRIES, Industry, IndustryProduct } from '../../data/industries';

export default function IndustriesPage() {
  const { navigate } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('medical-dental');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Setup scroll listener to update active index on sidebar
  useEffect(() => {
    const handleScroll = () => {
      let currentActive = 'medical-dental';
      let minDistance = Infinity;

      INDUSTRIES.forEach((ind) => {
        const el = sectionRefs.current[ind.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - 120); // offset for navbar
          if (distance < minDistance && rect.top < window.innerHeight * 0.6) {
            minDistance = distance;
            currentActive = ind.id;
          }
        }
      });
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const yOffset = -90; // offset for sticky navigation
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-screen pb-24 relative selection:bg-[#FF8A00] selection:text-white">
      <PageMeta
        title="Industries We Serve — Visual Gallery & Capabilities — ARISTROCRAFT"
        description="A premium visual story and high-fidelity 3D printing portfolio. Discover how ARISTROCRAFT manufactures functional prototypes, engineering parts, and custom models."
      />

      {/* ================================================== */}
      {/* SECTION 01 — HERO (EDITORIAL & MINIMALIST) */}
      {/* ================================================== */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-24 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC43C]/20 border border-[#171717]/20 text-[10px] sm:text-xs font-black tracking-widest uppercase text-[#FF8A00] select-none">
          <span>PRODUCTION-GRADE ADDITIVE GALLERY</span>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-7xl font-black font-heading uppercase tracking-tighter text-[#171717] leading-none">
            Built for <br className="hidden sm:inline" />
            <span className="text-[#FF8A00]">Every Industry</span>
          </h1>

          <p className="text-sm sm:text-xl font-medium text-[#525252] max-w-3xl mx-auto leading-relaxed">
            "Whatever you can design, we can help turn it into a real physical product."
          </p>
          <p className="text-xs sm:text-sm text-[#737373] max-w-2xl mx-auto leading-relaxed">
            From mechanical prototypes and durable engineering parts to high-fidelity anatomical models, custom device enclosures, and detailed architectural structures.
          </p>
        </div>

        {/* Global CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <button
            type="button"
            onClick={handleCtaClick}
            className="px-8 py-4 rounded-full bg-[#FF8A00] hover:bg-[#FFC43C] text-white hover:text-[#171717] border-2 border-[#171717] text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2 select-none"
          >
            <Upload className="w-4 h-4 stroke-[3px]" />
            <span>Start a Custom Project</span>
          </button>
        </div>
      </section>

      {/* ================================================== */}
      {/* STICKY INDUSTRY NAVIGATOR BAR (MOBILE) */}
      {/* ================================================== */}
      <div className="xl:hidden sticky top-0 z-30 bg-[#FFF9ED]/95 backdrop-blur border-b border-[#171717]/10 py-3.5 overflow-x-auto whitespace-nowrap scrollbar-none px-4 flex gap-3">
        {INDUSTRIES.map((ind, idx) => {
          const isSel = activeSection === ind.id;
          return (
            <button
              key={ind.id}
              onClick={() => scrollToSection(ind.id)}
              className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer inline-block ${
                isSel
                  ? 'bg-[#FF8A00] text-white border-[#171717] shadow-[2px_2px_0px_0px_#171717]'
                  : 'bg-white text-[#525252] border-[#171717]/10'
              }`}
            >
              {ind.name}
            </button>
          );
        })}
      </div>

      {/* ================================================== */}
      {/* MAIN TWO-COLUMN CONTENT AREA (BOUNDED TO PREVENT FOOTER OVERLAP) */}
      {/* ================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mt-12 sm:mt-16">
        <div className="flex flex-col xl:flex-row items-start gap-12 xl:gap-16">

          {/* Desktop Sticky Index (Left Sidebar) - Bounded strictly inside this container! */}
          <aside className="hidden xl:block w-64 shrink-0 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-none py-2 pr-4">
            <span className="text-[10px] font-black tracking-widest text-[#A3A3A3] uppercase block mb-4">
              INDUSTRY INDEX
            </span>
            <div className="space-y-2.5">
              {INDUSTRIES.map((ind, idx) => {
                const isSel = activeSection === ind.id;
                return (
                  <button
                    key={ind.id}
                    onClick={() => scrollToSection(ind.id)}
                    className="group flex items-center gap-3 w-full text-left focus:outline-none cursor-pointer"
                  >
                    <span className={`font-mono text-[11px] font-bold ${isSel ? 'text-[#FF8A00]' : 'text-[#A3A3A3]'}`}>
                      {idx < 9 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span
                      className={`text-xs font-black font-heading uppercase tracking-wider transition-all ${
                        isSel ? 'text-[#FF8A00] translate-x-1.5' : 'text-[#525252] group-hover:text-[#171717]'
                      }`}
                    >
                      {ind.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* EDITORIAL STORIES FOR THE 12 INDUSTRIES */}
          <div className="flex-1 min-w-0 space-y-40">
            {INDUSTRIES.map((ind, idx) => {
              return (
                <div
                  key={ind.id}
                  ref={(el) => {
                    sectionRefs.current[ind.id] = el;
                  }}
                  className="space-y-16 scroll-mt-28"
                >
              {/* Index Separator & Label */}
              <div className="flex items-center gap-4 pt-10 border-t border-[#171717]/10">
                <span className="font-mono text-3xl sm:text-6xl font-black text-[#FF8A00]/20 select-none">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                </span>
                <div className="h-[2px] bg-[#171717]/10 flex-grow" />
                <span className="text-xs font-black tracking-widest text-[#A3A3A3] uppercase">
                  APPLICATION CHAPTER
                </span>
              </div>

              {/* INTRO DUO-COLUMN */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Editorial text copy column */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-3">
                    <span className="text-[11px] font-black tracking-widest text-[#FF8A00] uppercase block">
                      {ind.name} MANUFACTURING
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black font-heading uppercase text-[#171717] leading-tight">
                      3D Printing For <br />
                      {ind.name}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed">
                    {ind.detailedDescription}
                  </p>

                  {/* Safety & Non-clinical Disclosures */}
                  {ind.id === 'medical-dental' && (
                    <div className="py-2.5 border-l-2 border-amber-500 pl-4 space-y-1">
                      <span className="text-[10px] font-black uppercase text-[#171717] block tracking-wider">
                        NON-CLINICAL DISCLOSURE
                      </span>
                      <p className="text-[10px] font-semibold text-[#737373] leading-relaxed">
                        Anatomical model structures and dental arches are designed strictly as non-sterile, pre-clinical visualization and educational aids. They are not certified for medical implants.
                      </p>
                    </div>
                  )}

                  {/* Plain application list (no cards, no boxes) */}
                  <div className="space-y-3 pt-4">
                    <span className="text-[10px] font-black tracking-wider text-[#A3A3A3] uppercase block">
                      WHAT WE CAN MANUFACTURE
                    </span>
                    <div className="space-y-2">
                      {ind.products.map((p) => (
                        <div key={p.num} className="flex items-start gap-2.5">
                          <span className="text-xs text-[#FF8A00] mt-0.5">→</span>
                          <div className="space-y-0.5">
                            <span className="text-xs font-black uppercase text-[#171717] block">
                              {p.name}
                            </span>
                            <span className="text-[11px] font-medium text-[#737373] block">
                              {p.examples.join(' · ')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Small contextual action */}
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={handleCtaClick}
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FF8A00] hover:text-[#171717] transition-colors focus:outline-none cursor-pointer"
                    >
                      <span>Request Custom {ind.name} Quote</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
                    </button>
                  </div>
                </div>

                {/* Dominant Primary visual column */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden rounded-2xl border border-[#171717]/10">
                    <img
                      src={ind.visual.bannerImage}
                      alt={ind.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <span className="text-[10px] font-semibold italic text-[#737373] block text-right pr-2">
                    Fig. {idx + 1}.1 — Professional {ind.name} additive composition
                  </span>
                </div>
              </div>

              {/* ASYMMETRICAL EDITORIAL GALLERY */}
              <div className="space-y-6 pt-6">
                <span className="text-[10px] font-black tracking-widest text-[#A3A3A3] uppercase block">
                  CAPABILITIES GALLERY
                </span>

                {/* Beautiful custom visual layouts with large high-quality images */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  {ind.products.slice(0, 4).map((prod, pIdx) => {
                    // Create an asymmetric grid structure based on index
                    const colSpan = pIdx === 0 ? 'md:col-span-8' : pIdx === 1 ? 'md:col-span-4' : pIdx === 2 ? 'md:col-span-4' : 'md:col-span-8';
                    const aspect = pIdx === 0 || pIdx === 3 ? 'aspect-[16/10]' : 'aspect-[4/5]';

                    return (
                      <div key={prod.num} className={`${colSpan} flex flex-col justify-between space-y-3 group`}>
                        {/* Large Image container */}
                        <div className={`${aspect} w-full bg-slate-100 overflow-hidden rounded-xl border border-[#171717]/10 relative`}>
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-[#171717]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/20 backdrop-blur">
                            CAPABILITY {prod.num}
                          </div>
                        </div>

                        {/* Plain caption underneath — strictly no boxes or card containers */}
                        <div className="px-1 space-y-1">
                          <h4 className="text-xs font-black uppercase text-[#171717]">
                            {prod.name}
                          </h4>
                          <p className="text-[11px] font-semibold text-[#525252] leading-relaxed">
                            {prod.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TECHNICAL MATERIAL REVEAL LINE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 px-8 bg-white border border-[#171717]/10 rounded-2xl">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black tracking-wider text-[#A3A3A3] uppercase block">
                    RECOMMENDED POLYMERS
                  </span>
                  <p className="text-xs font-bold text-[#171717]">
                    {ind.materials.join(' · ')}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black tracking-wider text-[#A3A3A3] uppercase block">
                    PRINTER ARCHITECTURE
                  </span>
                  <p className="text-xs font-bold text-[#FF8A00]">
                    {ind.techUsed.join(' & ')}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* FINAL SECTION — MAJESTIC FULL-WIDTH DARK BLOCK */}
      {/* ================================================== */}
      <section className="max-w-5xl mx-auto px-4 mt-32 sm:mt-40 mb-20">
        <div className="bg-[#171717] text-white rounded-3xl p-8 sm:p-16 text-center space-y-8 relative overflow-hidden border border-[#FF8A00]/20 shadow-2xl">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:16px_16px]" />

          <div className="space-y-4 max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#262626] border border-[#404040] text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#FFC43C]">
              <Cpu className="w-3 h-3 text-[#FF8A00]" />
              <span>CUSTOM DIGITAL MANUFACTURING</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading uppercase text-white tracking-tight leading-none">
              Your Industry. Your Idea. <br />
              Our 3D Printing.
            </h2>

            <p className="text-xs sm:text-base font-semibold text-[#A3A3A3] leading-relaxed">
              Don't see exactly what you're looking for? Tell us what you're trying to build. We'll explore the best way to turn your idea into a physical product.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 relative z-10">
            <button
              type="button"
              onClick={handleCtaClick}
              className="px-8 py-4 rounded-full bg-[#FF8A00] hover:bg-white hover:text-[#171717] text-white border-2 border-white text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#000000] hover:-translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2 select-none"
            >
              <span>Start a Custom Project</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>
        </div>
      </section>

      {/* Reusable Custom Order Modal */}
      <CustomOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
