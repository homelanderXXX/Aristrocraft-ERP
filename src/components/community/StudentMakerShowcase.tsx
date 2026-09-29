import React from 'react';
import { ArrowRight } from 'lucide-react';
import { STUDENT_MAKER_PROJECTS } from '../../data/communityData';

interface StudentMakerShowcaseProps {
  onStartStudentProject?: () => void;
}

export const StudentMakerShowcase: React.FC<StudentMakerShowcaseProps> = ({
  onStartStudentProject,
}) => {
  return (
    <section className="relative w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[2px_2px_0px_0px_#FF8A00]">
            <span>EDUCATION & MAKERS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading text-[#171717] uppercase tracking-tight leading-[0.95]">
            BUILT BY <br />
            <span className="text-[#FF8A00]">CURIOUS MINDS.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#171717]/80 font-medium max-w-2xl">
            From classroom experiments to university prototypes, physical models help ideas become easier to understand, test and improve.
          </p>
        </div>

        {/* 4 Distinct Image-First Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STUDENT_MAKER_PROJECTS.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border-3 border-[#171717] overflow-hidden shadow-[6px_6px_0px_0px_#171717] hover:shadow-[3px_3px_0px_0px_#171717] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#171717] border-b-2 border-[#171717]">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#171717]/90 text-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
                    {item.field}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-[10px] font-mono font-bold text-[#FF8A00] uppercase tracking-wider mb-1">
                    {item.makerType}
                  </div>
                  <h3 className="text-base sm:text-lg font-black font-heading text-[#171717] uppercase leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#171717]/75 mt-2 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Material Footnote */}
              <div className="px-5 py-3 bg-[#FFF9ED] border-t-2 border-[#171717] text-[11px] font-mono font-bold text-[#171717]/70 flex items-center justify-between">
                <span>MATERIAL</span>
                <span className="text-[#171717]">{item.material}</span>
              </div>

            </div>
          ))}
        </div>

        {/* Supporting Educational Discount Banner */}
        <div className="mt-12 p-6 bg-white border-3 border-[#171717] rounded-3xl shadow-[6px_6px_0px_0px_#171717] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-[#FF8A00] uppercase tracking-wider">
              ACADEMIC & STUDENT MAKER SUPPORT
            </div>
            <div className="text-base sm:text-lg font-black font-heading text-[#171717] uppercase mt-0.5">
              Special Rates & Engineering Consultation For Students & Researchers
            </div>
          </div>
          {onStartStudentProject && (
            <button
              type="button"
              onClick={onStartStudentProject}
              className="px-6 py-3 bg-[#171717] hover:bg-[#FF8A00] text-white hover:text-[#171717] font-black font-heading text-xs uppercase tracking-wider rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_0px_#FF8A00] transition-all inline-flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>STUDENT PROJECT INQUIRY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
