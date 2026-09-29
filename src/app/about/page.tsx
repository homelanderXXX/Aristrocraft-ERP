import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Cpu,
  Layers,
  ShieldCheck,
  ShoppingBag,
  Upload,
  ArrowRight,
  Heart,
  Hammer,
  CheckCircle2,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { CustomOrderModal } from '../../components/shop/CustomOrderModal';
import { PageMeta } from '../../components/common/PageMeta';
import { AboutScrollAnimation } from '../../components/about/AboutScrollAnimation';

export default function AboutPage() {
  const { navigate } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const VALUES = [
    {
      title: 'Tactile Precision',
      desc: 'We calibrate every layer height, infill density, and temperature profile to produce crisp geometric edges and structural durability.',
      icon: Layers,
    },
    {
      title: 'Local Craftsmanship',
      desc: 'Proudly operating from Dhaka, Bangladesh — offering fast local customer support, zero international shipping delays, and direct WhatsApp consultations.',
      icon: MapPin,
    },
    {
      title: 'Design-First Ethos',
      desc: 'Every product in our catalog is engineered to solve a daily functional need — from clean desk routing to custom organizer aesthetics.',
      icon: Compass,
    },
    {
      title: 'Transparent Quality',
      desc: 'No hidden claims or artificial renders. What you see in our product cards is exactly what comes off our print beds.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="relative w-full bg-[#FFF9ED] text-[#171717] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="About ARISTROCRAFT — 3D Printing Studio in Bangladesh"
        description="Learn about ARISTROCRAFT, a Dhaka-based digital manufacturing and 3D printing studio crafting precision desk accessories, figures, and custom bespoke prints."
      />

      {/* 3D SCROLL & MOTION ANIMATION BACKGROUND */}
      <AboutScrollAnimation opacity={0.55} />

      <div className="relative z-10 max-w-5xl mx-auto space-y-16">
        
        {/* HERO SECTION - NARROW CRISP NEOBRUTALIST CARD */}
        <div className="flex justify-center">
          <div className="max-w-2xl w-full bg-white/95 backdrop-blur-md border-3 border-[#171717] rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-[6px_6px_0px_0px_#171717]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading tracking-widest uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717]">
              <span>OUR STORY & PHILOSOPHY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading uppercase tracking-tight text-[#171717]">
              About <span className="text-[#FF8A00]">ARISTROCRAFT</span>
            </h1>

            <p className="text-xs sm:text-base font-semibold text-[#525252] max-w-xl mx-auto leading-relaxed">
              Bridging digital CAD design and physical craftsmanship — a specialized 3D printing studio operating from Dhaka, Bangladesh.
            </p>
          </div>
        </div>

        {/* BRAND STORY & MISSION */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_0px_#171717] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4 text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed">
            <span className="text-xs font-black font-heading uppercase text-[#FF8A00] tracking-wider block">
              DHAKA-BASED ADDITIVE MANUFACTURING
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading uppercase text-[#171717] leading-tight">
              Reinventing How Objects Are Made
            </h2>
            <p>
              ARISTROCRAFT was founded with a singular focus: bringing modern 3D additive manufacturing directly to creators, gamers, engineers, and homeowners across Bangladesh.
            </p>
            <p>
              Rather than relying on mass-produced plastic items imported from overseas, we print objects on-demand using high-performance engineering thermoplastics like PLA+, PETG, and TPU.
            </p>
            <p>
              By combining high-speed Bambu Lab printer clusters with meticulous hand-finishing, we create tactile, durable, and visually distinct products built to last.
            </p>
          </div>

          <div className="md:col-span-5 bg-[#FFF9ED] border-2.5 border-[#171717] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#171717] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center font-black">
              <Hammer className="w-5 h-5 text-[#171717]" />
            </div>
            <h3 className="text-lg font-black font-heading uppercase text-[#171717]">
              Studio Snapshot
            </h3>
            <ul className="space-y-2.5 text-xs font-bold text-[#171717]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Based in Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Bambu Lab AMS Printer Cluster</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Custom CAD & Slicing Expertise</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Nationwide Doorstep Courier Delivery</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CORE VALUES */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="inline-flex flex-col items-center bg-white/95 backdrop-blur-md border-3 border-[#171717] rounded-2xl px-6 py-3 shadow-[4px_4px_0px_0px_#171717] text-center">
              <span className="text-[10px] font-black font-heading tracking-widest uppercase text-[#FF8A00] mb-0.5">
                GUIDING PRINCIPLES
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading uppercase text-[#171717]">
                Our Brand Values
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((val) => {
              const IconComponent = val.icon;
              return (
                <div key={val.title} className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center text-[#171717] mb-4 shadow-[2px_2px_0px_0px_#171717]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black font-heading uppercase text-[#171717] mb-2">{val.title}</h3>
                  <p className="text-xs font-semibold text-[#525252] leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* WORKSHOP & STUDIO VISUAL SHOWCASE AREA */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717] text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] text-white text-[11px] font-black font-heading uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 text-[#FFC43C]" />
            <span>STUDIO EQUIPMENT & PRODUCTION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-heading uppercase text-[#171717]">
            Inside Our Print Lab
          </h2>

          <p className="text-xs sm:text-sm font-semibold text-[#525252] max-w-xl mx-auto leading-relaxed">
            Equipped with multi-material automatic filament systems, hardened steel nozzles for abrasive carbon fiber blends, and strict post-print dimensional QA procedures.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#171717] text-left">
              <span className="text-xs font-black font-mono text-[#FF8A00] block mb-1">01. SLICER & CAD</span>
              <h4 className="text-xs font-black font-heading uppercase text-[#171717]">Oversized Bed Preparation</h4>
              <p className="text-[11px] font-semibold text-[#525252] mt-1">Manual seam alignment and layer thickness tuning.</p>
            </div>
            <div className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#171717] text-left">
              <span className="text-xs font-black font-mono text-[#FF8A00] block mb-1">02. AMS CLUSTER</span>
              <h4 className="text-xs font-black font-heading uppercase text-[#171717]">Multi-Color Filament</h4>
              <p className="text-[11px] font-semibold text-[#525252] mt-1">Automatic filament switching with zero manual pauses.</p>
            </div>
            <div className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#171717] text-left">
              <span className="text-xs font-black font-mono text-[#FF8A00] block mb-1">03. HAND QA</span>
              <h4 className="text-xs font-black font-heading uppercase text-[#171717]">Post-Print Cleanup</h4>
              <p className="text-[11px] font-semibold text-[#525252] mt-1">Deburring, support removal, and protective packaging.</p>
            </div>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="bg-[#FFC43C] border-3 border-[#171717] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_0px_#171717] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black font-heading uppercase text-[#171717]">
              Start Exploring or Print Custom
            </h3>
            <p className="text-xs font-bold text-[#171717] mt-1">
              Browse our ready-to-ship product collection or submit your own custom 3D file.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="px-6 py-3 rounded-full bg-[#171717] hover:bg-[#FF8A00] text-white text-xs font-black font-heading uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2 shadow-[3px_3px_0px_0px_#171717]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Shop</span>
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-full bg-white hover:bg-[#FFF9ED] text-[#171717] border-2 border-[#171717] text-xs font-black font-heading uppercase tracking-wider shadow-[3px_3px_0px_0px_#171717] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Custom Print</span>
            </button>
          </div>
        </div>

      </div>

      <CustomOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
