import React from 'react';
import { ArrowRight, GraduationCap, BookOpen, Layers, Check } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { ScrollReveal, StaggerContainer, StaggerItem, SubtleDepthCard } from '../animation/ScrollReveal';

export const EducationTeaserSection: React.FC = () => {
  const { navigate } = useRouter();

  const stemHighlights = [
    {
      title: 'ANATOMY & BIOLOGY',
      desc: 'Heart chambers, vertebrae, skeletal joints & cellular cross-sections.',
      image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=800',
      tag: 'Biology Lab',
    },
    {
      title: 'PHYSICS & MECHANICS',
      desc: 'Planetary gear systems, differential cutaways, and pendulum kits.',
      image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=800',
      tag: 'Interactive STEM',
    },
    {
      title: 'ASTRONOMY & GEOGRAPHY',
      desc: 'Topographic mountain elevation maps and scaled planetary orbit models.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      tag: 'Classroom Physicals',
    },
    {
      title: 'GEOMETRY & MATH',
      desc: 'Polyhedra, interlocking math cubes, and geometric projection shapes.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
      tag: 'Manipulatives',
    },
  ];

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b-3 border-[#171717]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP SPLIT BANNER: HEADLINE + CTA */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8A00] text-white border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1deg] mb-3.5 select-none">
                <GraduationCap className="w-3.5 h-3.5 text-white stroke-[2.5px]" />
                <span className="text-[11px] sm:text-xs font-black font-heading tracking-wider uppercase">
                  EDUCATION, UNIVERSITIES & STEM LABS
                </span>
              </div>

              <h2
                id="education-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#171717] uppercase leading-none"
              >
                LEARNING IS BETTER WHEN <br className="hidden sm:inline" />
                <span className="text-[#FF8A00]">YOU CAN HOLD IT.</span>
              </h2>

              <p className="text-base sm:text-lg font-semibold text-[#4A4A4A] mt-3 max-w-2xl leading-relaxed">
                We help schools, teachers, university departments, and researchers turn abstract textbook diagrams into durable, tactile physical models students can interact with.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => navigate('/education')}
                className="inline-flex items-center gap-2 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] rounded-xl px-6 py-4 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>EXPLORE EDUCATION & STEM</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 STRONG VISUAL HIGHLIGHTS */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6" staggerDelay={0.08}>
          {stemHighlights.map((item, idx) => (
            <StaggerItem key={idx} className="h-full">
              <SubtleDepthCard maxRotate={2} className="h-full">
                <div
                  onClick={() => navigate('/education')}
                  className="group bg-[#FFF9ED] border-3 border-[#171717] rounded-2xl overflow-hidden shadow-[5px_5px_0px_0px_#171717] hover:shadow-[8px_8px_0px_0px_#171717] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
                >
                  <div className="relative w-full h-[190px] overflow-hidden border-b-2.5 border-[#171717]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#171717] text-white text-[10px] font-black font-heading uppercase tracking-wider border border-white/20">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-black font-heading uppercase text-[#171717] tracking-tight mb-1 group-hover:text-[#FF8A00] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-[#4A4A4A] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t-2 border-[#171717]/10 flex items-center justify-between text-xs font-black font-heading uppercase text-[#171717] group-hover:text-[#FF8A00]">
                      <span>VIEW DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
                    </div>
                  </div>
                </div>
              </SubtleDepthCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Institutional Trust Line */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 p-5 bg-[#FFF9ED] border-2.5 border-[#171717] rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-[#171717]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#34D399] border border-[#171717] flex items-center justify-center font-black">✓</span>
              <span>Classroom-safe non-toxic biodegradable filaments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#FFC43C] border border-[#171717] flex items-center justify-center font-black">✓</span>
              <span>Bulk classroom sets & institutional invoices supported</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#FF8A00] border border-[#171717] flex items-center justify-center text-white font-black">✓</span>
              <span>Direct curriculum model custom design services</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

