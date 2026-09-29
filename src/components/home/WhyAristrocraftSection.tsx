import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Factory, MapPin, Sliders } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { ScrollReveal, StaggerContainer, StaggerItem, SubtleDepthCard } from '../animation/ScrollReveal';

export const WhyAristrocraftSection: React.FC = () => {
  const { navigate } = useRouter();

  const reasons = [
    {
      number: '01',
      title: 'CUSTOM TO YOUR EXACT SPEC',
      description: 'Every part is sized, reinforced, and configured for your exact mechanical dimensions or visual requirements.',
      icon: Sliders,
      tag: 'Bespoke Engineering',
    },
    {
      number: '02',
      title: 'FUNCTIONAL, LOAD-BEARING REAL USE',
      description: 'Not merely decorative models. We use high-impact PETG, ABS, and Carbon-Fiber Nylon engineered for physical stress.',
      icon: ShieldCheck,
      tag: 'Real-World Strength',
    },
    {
      number: '03',
      title: 'SMALL-BATCH & ON-DEMAND FRIENDLY',
      description: 'Zero injection-molding tooling fees. Order a single prototype iteration or a production batch of 50 to 500 units.',
      icon: Factory,
      tag: 'No MOQ Overhead',
    },
    {
      number: '04',
      title: 'PRECISION TOLERANCES & FINISHING',
      description: 'Bambu Lab precision clusters and sub-50-micron SLA resin systems deliver tight clearances for snap-fits and moving threads.',
      icon: Zap,
      tag: '±0.1mm Accuracy',
    },
    {
      number: '05',
      title: 'LOCAL MANUFACTURING IN BANGLADESH',
      description: 'Produced and inspected locally in Dhaka. Direct engineering communication via WhatsApp and nationwide courier delivery.',
      icon: MapPin,
      tag: 'Dhaka Based',
    },
  ];

  return (
    <section
      id="why-aristrocraft"
      aria-labelledby="why-aristrocraft-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b-3 border-[#171717]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8A00] text-white border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1deg] mb-3.5 select-none">
              <span className="text-[11px] sm:text-xs font-black font-heading tracking-wider uppercase">
                STUDIO STANDARD & RELIABILITY
              </span>
            </div>

            <h2
              id="why-aristrocraft-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#171717] uppercase leading-none"
            >
              WHY <span className="text-[#FF8A00]">ARISTROCRAFT?</span>
            </h2>

            <p className="text-base sm:text-lg font-semibold text-[#4A4A4A] mt-3 leading-relaxed">
              We bridge the gap between digital design and real manufacturing, giving makers, engineers, and businesses a reliable production partner in Bangladesh.
            </p>
          </div>
        </ScrollReveal>

        {/* 5 REASONS EDITORIAL COMPOSITION */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" staggerDelay={0.08}>
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            const isFeatured = idx === 0;
            return (
              <StaggerItem
                key={r.number}
                className={isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <SubtleDepthCard maxRotate={1.5} className="h-full">
                  <div
                    className={`
                      bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl p-6 sm:p-7
                      shadow-[5px_5px_0px_0px_#171717] hover:shadow-[8px_8px_0px_0px_#171717]
                      hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full
                      ${isFeatured ? 'bg-[#171717] text-white' : 'text-[#171717]'}
                    `}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span
                          className={`
                            w-9 h-9 rounded-xl border-2 font-black font-heading text-sm flex items-center justify-center
                            ${
                              isFeatured
                                ? 'bg-[#FF8A00] text-white border-white/30 shadow-[2px_2px_0px_0px_#000]'
                                : 'bg-[#FFC43C] text-[#171717] border-[#171717] shadow-[2px_2px_0px_0px_#171717]'
                            }
                          `}
                        >
                          {r.number}
                        </span>

                        <span
                          className={`
                            text-[11px] font-black font-heading uppercase px-3 py-1 rounded-full border-2
                            ${
                              isFeatured
                                ? 'bg-white/10 text-[#FFC43C] border-white/20'
                                : 'bg-white text-[#171717] border-[#171717]'
                            }
                          `}
                        >
                          {r.tag}
                        </span>
                      </div>

                      <h3
                        className={`
                          text-xl sm:text-2xl font-black font-heading uppercase tracking-tight mb-2
                          ${isFeatured ? 'text-white' : 'text-[#171717]'}
                        `}
                      >
                        {r.title}
                      </h3>

                      <p
                        className={`
                          text-xs sm:text-sm font-semibold leading-relaxed
                          ${isFeatured ? 'text-white/80 max-w-xl' : 'text-[#4A4A4A]'}
                        `}
                      >
                        {r.description}
                      </p>
                    </div>

                    <div
                      className={`
                        mt-6 pt-4 border-t flex items-center gap-2 text-xs font-black font-heading uppercase
                        ${isFeatured ? 'border-white/15 text-[#FFC43C]' : 'border-[#171717]/10 text-[#FF8A00]'}
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span>ARISTROCRAFT STANDARD</span>
                    </div>
                  </div>
                </SubtleDepthCard>
              </StaggerItem>
            );
          })}

          {/* Quick Action Box */}
          <StaggerItem>
            <SubtleDepthCard maxRotate={1.5} className="h-full">
              <div className="bg-[#FF8A00] text-white border-3 border-[#171717] rounded-3xl p-6 sm:p-7 shadow-[5px_5px_0px_0px_#171717] flex flex-col justify-between h-full">
                <div>
                  <span className="inline-block px-3 py-1 bg-white text-[#171717] border-2 border-[#171717] rounded-full text-[10px] font-black font-heading uppercase mb-4 shadow-[2px_2px_0px_0px_#171717]">
                    READY TO START?
                  </span>
                  <h3 className="text-2xl font-black font-heading uppercase tracking-tight text-white mb-2">
                    LET&apos;S DISCUSS YOUR PROJECT
                  </h3>
                  <p className="text-xs font-semibold text-white/90 leading-relaxed">
                    Send your files, photos, or idea descriptions directly to our engineering team.
                  </p>
                </div>

                <button
                  onClick={() => navigate('/custom-print')}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#262626] text-white border-2 border-white rounded-xl py-3 text-xs font-black font-heading uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] cursor-pointer"
                >
                  <span>GET A QUOTE</span>
                  <ArrowRight className="w-4 h-4 stroke-[3px]" />
                </button>
              </div>
            </SubtleDepthCard>
          </StaggerItem>
        </StaggerContainer>

      </div>
    </section>
  );
};

