import React from 'react';
import { ArrowRight, BookOpen, Layers, Hand, Users, Sparkles } from 'lucide-react';

interface TextbookToTableProps {
  onStartProject: () => void;
}

export const TextbookToTableSection: React.FC<TextbookToTableProps> = ({
  onStartProject,
}) => {
  const steps = [
    {
      step: '01',
      title: 'TEXTBOOK / DIAGRAM',
      subtitle: 'Flat 2D concepts on paper',
      description: 'Abstract textbook equations, anatomical cross-sections, and circuit diagrams often feel theoretical and hard to visualize in three dimensions.',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
      icon: BookOpen,
      badge: 'Step 1: Input Idea',
    },
    {
      step: '02',
      title: '3D CAD MODEL',
      subtitle: 'Engineered for pedagogical clarity',
      description: 'We translate the syllabus diagram into precision-toleranced CAD parts with snap-fit joints, color-coded layers, or magnetic alignment pins.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      icon: Layers,
      badge: 'Step 2: Digital Modeling',
    },
    {
      step: '03',
      title: 'STUDENT HANDS',
      subtitle: 'Tactile physical manipulation',
      description: 'Students physically hold, rotate, dissect, and measure the manufactured parts, building instant intuitive understanding through touch.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800',
      icon: Hand,
      badge: 'Step 3: Tactile Learning',
    },
    {
      step: '04',
      title: 'CLASSROOM DISCOVERY',
      subtitle: 'Active interactive engagement',
      description: 'Lectures transform from passive listening into dynamic laboratory experiments, collaborative team building, and memorable Eureka moments.',
      image: 'https://images.unsplash.com/photo-1584697964190-7c26573c79a9?auto=format&fit=crop&q=80&w=800',
      icon: Users,
      badge: 'Step 4: Real Retention',
    },
  ];

  return (
    <section className="w-full py-16 md:py-28 bg-[#171717] text-white border-b-2 border-[#171717] relative overflow-hidden">
      
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8A00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF8A00] text-[#171717] rounded-full text-xs font-mono font-black uppercase tracking-widest mb-4">
            CINEMATIC LEARNING TRANSFORMATION
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight uppercase leading-[1.05]">
            FROM TEXTBOOK <br />
            <span className="text-[#FF8A00] underline decoration-4 decoration-white underline-offset-8">
              TO TABLE.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-xl text-white/80 font-normal leading-relaxed">
            We turn difficult concepts into physical learning tools students can see, hold, assemble and explore.
          </p>
        </div>

        {/* 4-Step Visual Flow (Large Imagery Sequence) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-4 sm:p-5 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 shadow-lg"
              >
                <div>
                  {/* Step Image */}
                  <div className="relative rounded-xl overflow-hidden mb-4 border border-white/20 bg-black aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#FF8A00] text-[#171717] text-[10px] font-mono font-black rounded uppercase">
                      {item.step}
                    </span>

                    <span className="absolute bottom-3 left-3 right-3 text-xs font-mono text-white/90 truncate">
                      {item.badge}
                    </span>
                  </div>

                  {/* Step Heading */}
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-[#FF8A00]" />
                    <h3 className="text-base sm:text-lg font-black font-heading tracking-tight text-white uppercase">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs font-mono text-[#FFC43C] mb-3">
                    {item.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Arrow connector indicator on desktop */}
                {idx < 3 && (
                  <div className="hidden lg:flex items-center justify-end pt-4 text-[#FF8A00]/50">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-black font-heading uppercase text-white">
              Have a difficult syllabus topic you want to physicalize?
            </h4>
            <p className="text-xs sm:text-sm font-mono text-white/80 mt-1">
              Send us any textbook diagram, paper sketch, or 3D STL file for immediate prototyping.
            </p>
          </div>
          <button
            onClick={onStartProject}
            className="px-6 py-3.5 bg-[#FF8A00] hover:bg-[#e07a00] text-white font-black font-heading text-xs uppercase tracking-wider rounded-xl border border-white/30 shadow-[3px_3px_0px_0px_#ffffff] shrink-0 transition-all inline-flex items-center gap-2"
          >
            <span>SUBMIT A DIAGRAM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
