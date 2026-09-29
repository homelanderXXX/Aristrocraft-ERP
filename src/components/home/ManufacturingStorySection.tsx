import React from 'react';
import { ArrowRight, Layers, Cpu, PenTool, CheckCircle2 } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { ScrollReveal, StaggerContainer, StaggerItem, SubtleDepthCard } from '../animation/ScrollReveal';

interface StoryStep {
  step: string;
  stageName: string;
  title: string;
  caption: string;
  image: string;
  tag: string;
}

export const ManufacturingStorySection: React.FC = () => {
  const { navigate } = useRouter();

  const storySteps: StoryStep[] = [
    {
      step: '01',
      stageName: 'THE IDEA',
      title: 'Concept & Reference',
      caption: 'A hand sketch on paper, a broken original part, or dimensions sent via WhatsApp.',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
      tag: 'Sketch / Dimension',
    },
    {
      step: '02',
      stageName: 'DIGITAL DESIGN',
      title: 'Parametric CAD Modeling',
      caption: 'Converted into a high-precision 3D digital model optimized for wall strength and mechanical fit.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      tag: 'Solid 3D Geometry',
    },
    {
      step: '03',
      stageName: '3D PRINTING',
      title: 'Layer-by-Layer Fabrication',
      caption: 'High-speed Bambu Lab and SLA clusters build the geometry with sub-millimeter precision.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800',
      tag: 'Additive Precision',
    },
    {
      step: '04',
      stageName: 'POST-PROCESSING',
      title: 'Finishing & Inspection',
      caption: 'Support removal, heat-set thread inserts, chemical smoothing, and dimensional quality verification.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
      tag: 'Hand-Inspected',
    },
    {
      step: '05',
      stageName: 'REAL OBJECT',
      title: 'In Your Hands',
      caption: 'A functional, durable physical product ready for testing, deployment, or everyday use.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
      tag: 'Tested & Delivered',
    },
  ];

  return (
    <section
      id="manufacturing-story"
      aria-labelledby="manufacturing-story-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#171717] text-white border-b-3 border-[#171717]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8A00] text-white border-2 border-white/30 shadow-[2.5px_2.5px_0px_0px_#FFC43C] rotate-[-1deg] mb-3.5 select-none">
              <span className="text-[11px] sm:text-xs font-black font-heading tracking-wider uppercase">
                THE MANUFACTURING JOURNEY
              </span>
            </div>

            <h2
              id="manufacturing-story-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white uppercase leading-none"
            >
              FROM A DIGITAL IDEA TO <br className="hidden sm:inline" />
              <span className="text-[#FFC43C]">SOMETHING YOU CAN HOLD.</span>
            </h2>

            <p className="text-base sm:text-lg font-medium text-white/80 mt-3 leading-relaxed">
              You don&apos;t need CAD expertise or expensive manufacturing tooling. Bring us the concept — we handle engineering, slicing, fabrication, and finishing.
            </p>
          </div>
        </ScrollReveal>

        {/* CONTINUOUS 5-STAGE SEQUENTIAL VISUAL FLOW */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5" staggerDelay={0.09}>
          {storySteps.map((step, idx) => (
            <StaggerItem key={step.step} className="h-full">
              <SubtleDepthCard maxRotate={2} className="h-full">
                <div
                  className="group relative bg-[#222222] border-2.5 border-white/20 hover:border-[#FFC43C] rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_0px_0px_#FF8A00] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  {/* Photo Area */}
                  <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden border-b-2 border-white/10">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-transparent to-transparent" />

                    {/* Step Number Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#FF8A00] text-white font-black font-heading text-xs flex items-center justify-center border border-white/30 shadow-[1.5px_1.5px_0px_0px_#000]">
                        {step.step}
                      </span>
                      <span className="text-[10px] font-black font-heading uppercase tracking-wider bg-[#171717]/90 text-white px-2 py-0.5 rounded border border-white/20">
                        {step.stageName}
                      </span>
                    </div>
                  </div>

                  {/* Text Caption Area */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-base sm:text-lg font-black font-heading uppercase text-white tracking-tight mb-1 group-hover:text-[#FFC43C] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-medium text-white/70 leading-relaxed">
                        {step.caption}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#FFC43C]">
                        {step.tag}
                      </span>
                      {idx < storySteps.length - 1 && (
                        <ArrowRight className="hidden lg:block w-3.5 h-3.5 text-white/40" />
                      )}
                    </div>
                  </div>
                </div>
              </SubtleDepthCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* BOTTOM STORY CONVERSION STRIP */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 pt-8 border-t-2 border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#262626] border-2 border-white/20 rounded-2xl p-6 sm:p-8">
            <div>
              <h4 className="text-xl sm:text-2xl font-black font-heading uppercase text-white tracking-tight">
                HAVE A SKETCH, STL, OR PHYSICAL SAMPLE?
              </h4>
              <p className="text-xs sm:text-sm font-medium text-white/70 mt-1">
                Upload your files or photos for an engineering review and direct quote.
              </p>
            </div>

            <button
              onClick={() => navigate('/custom-print')}
              className="shrink-0 inline-flex items-center gap-2 bg-[#FF8A00] hover:bg-[#FF9B26] text-white border-2 border-white rounded-xl px-6 py-3.5 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[3px_3px_0px_0px_#FFF] hover:shadow-[5px_5px_0px_0px_#FFF] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>SUBMIT AN IDEA OR FILE</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

