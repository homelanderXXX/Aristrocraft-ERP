import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Workflow,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Package,
} from 'lucide-react';
import { EDUCATION_WORKFLOW } from '../../data/educationData';

interface EducationWorkflowProps {
  onStartWorkflow: () => void;
}

export const EducationWorkflow: React.FC<EducationWorkflowProps> = ({ onStartWorkflow }) => {
  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b-3 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9ED] border-2 border-[#171717] text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] mb-3">
              <Workflow className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span>THE ARISTROCRAFT ACADEMIC PIPELINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#171717] tracking-tight">
              From Classroom Idea to Physical Model
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#525252] max-w-2xl mt-2">
              How we partner with teachers, faculty members, and lab coordinators to turn educational concepts into robust physical teaching apparatuses.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartWorkflow}
            className="px-6 py-3.5 bg-[#FF8A00] hover:bg-[#FF9B26] text-white border-3 border-[#171717] rounded-xl font-black font-heading text-xs uppercase shadow-[3px_3px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <span>Start an Academic Project</span>
            <ArrowRight className="w-4 h-4 stroke-[3px]" />
          </button>
        </div>

        {/* 6-STEP VISUAL WORKFLOW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {EDUCATION_WORKFLOW.map((wf) => (
            <div
              key={wf.step}
              className="group bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717] hover:shadow-[8px_8px_0px_0px_#171717] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* PHOTO HEADER WITH STEP BADGE */}
                <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden relative border-2 border-[#171717] mb-5 bg-white">
                  <img
                    src={wf.image}
                    alt={wf.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#171717] text-white font-mono text-xs font-black shadow-[2px_2px_0px_0px_#FF8A00]">
                    STEP {wf.step}
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-[10px] font-black font-heading uppercase text-[#FFC43C] tracking-wider block">
                      {wf.badge}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-black font-heading text-[#171717] leading-tight mb-2.5">
                  {wf.title}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-[#404040] leading-relaxed mb-3">
                  {wf.description}
                </p>

                <p className="text-xs font-medium text-[#6D6D6D] leading-relaxed">
                  {wf.detail}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#171717]/10 flex items-center gap-2 text-[10px] font-bold text-[#059669]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Quality Verified at this Stage</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
