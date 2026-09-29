import React from 'react';
import { ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { ScrollReveal, StaggerContainer, StaggerItem, SubtleDepthCard } from '../animation/ScrollReveal';

interface MaterialVisualCard {
  name: string;
  category: string;
  finishedObject: string;
  keyCharacteristic: string;
  image: string;
  accentBg: string;
  badge: string;
}

export const MaterialsSection: React.FC = () => {
  const { navigate } = useRouter();

  const materials: MaterialVisualCard[] = [
    {
      name: 'PETG',
      category: 'Tough Polymer',
      finishedObject: 'Impact-Resistant Mounts & Outdoor Casings',
      keyCharacteristic: 'Durable, weather-tolerant, and high impact absorption.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800',
      accentBg: 'bg-[#FF8A00]',
      badge: 'FUNCTIONAL TOUGH',
    },
    {
      name: 'TPU 95A',
      category: 'Rubberized Elastomer',
      finishedObject: 'Gaskets, Drone Bumpers & Ergonomic Grips',
      keyCharacteristic: 'Flexible, elastic, and shock-absorbing without tearing.',
      image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800',
      accentBg: 'bg-[#34D399]',
      badge: 'FLEXIBLE & DAMPING',
    },
    {
      name: 'SLA RESIN',
      category: 'Photopolymer',
      finishedObject: 'Miniatures, Wax Ring Casts & Dental Models',
      keyCharacteristic: 'Ultra-fine 25–50 micron details and silky smooth surfaces.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
      accentBg: 'bg-[#FFC43C]',
      badge: 'MICRO DETAIL',
    },
    {
      name: 'CARBON FIBER NYLON',
      category: 'Composite (PA-CF)',
      finishedObject: 'Industrial Brackets, Gears & Structural Links',
      keyCharacteristic: 'Extreme stiffness, heat tolerance (140°C+), and light weight.',
      image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&q=80&w=800',
      accentBg: 'bg-[#171717]',
      badge: 'HIGH STRENGTH',
    },
  ];

  return (
    <section
      id="materials"
      aria-labelledby="materials-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF9ED] border-b-3 border-[#171717]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC43C] text-[#171717] border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1deg] mb-3.5 select-none">
                <Layers className="w-3.5 h-3.5 text-[#171717] stroke-[3px]" />
                <span className="text-[11px] sm:text-xs font-black font-heading tracking-wider uppercase">
                  ENGINEERING POLYMERS & RESINS
                </span>
              </div>

              <h2
                id="materials-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#171717] uppercase leading-none"
              >
                THE MATERIAL <span className="text-[#FF8A00]">CHANGES THE RESULT.</span>
              </h2>

              <p className="text-base sm:text-lg font-semibold text-[#6D6D6D] mt-2 max-w-xl">
                We match polymer chemistry to your physical requirements — from high-impact structural strength to rubbery elasticity and microscopic detail.
              </p>
            </div>

            <button
              onClick={() => navigate('/custom-print')}
              className="inline-flex items-center gap-2 bg-[#171717] hover:bg-[#262626] text-white border-2.5 border-[#171717] rounded-xl px-6 py-3.5 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 transition-all self-start md:self-end cursor-pointer"
            >
              <span>ORDER WITH THESE MATERIALS</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>
        </ScrollReveal>

        {/* 4 STRONG MATERIAL VISUAL PILLARS */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6" staggerDelay={0.08}>
          {materials.map((mat) => (
            <StaggerItem key={mat.name} className="h-full">
              <SubtleDepthCard maxRotate={2} className="h-full">
                <div
                  onClick={() => navigate('/custom-print')}
                  className="group bg-white border-3 border-[#171717] rounded-3xl overflow-hidden shadow-[5px_5px_0px_0px_#171717] hover:shadow-[8px_8px_0px_0px_#171717] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
                >
                  {/* Photo representation of actual object in this material */}
                  <div className="relative w-full h-[200px] overflow-hidden border-b-3 border-[#171717]">
                    <img
                      src={mat.image}
                      alt={mat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#171717] text-white text-[10px] font-black font-heading uppercase tracking-wider border border-white/20 shadow-[1.5px_1.5px_0px_0px_#000]">
                        {mat.badge}
                      </span>
                    </div>
                  </div>

                  {/* Material Details */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl sm:text-2xl font-black font-heading uppercase text-[#171717]">
                          {mat.name}
                        </h3>
                        <span className="text-[11px] font-bold text-[#6D6D6D]">
                          {mat.category}
                        </span>
                      </div>

                      <p className="text-xs font-black font-heading uppercase text-[#FF8A00] mt-1 mb-2">
                        {mat.finishedObject}
                      </p>

                      <p className="text-xs font-semibold text-[#4A4A4A] leading-relaxed">
                        {mat.keyCharacteristic}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t-2 border-[#171717]/10 flex items-center justify-between text-xs font-black font-heading uppercase text-[#171717] group-hover:text-[#FF8A00]">
                      <span>VIEW SPEC SHEET</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
                    </div>
                  </div>
                </div>
              </SubtleDepthCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};

