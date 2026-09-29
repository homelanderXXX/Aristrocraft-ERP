import React, { useEffect } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Maximize2,
  GraduationCap,
} from 'lucide-react';
import { EducationalProject } from '../../data/educationData';

interface EducationLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: EducationalProject | null;
  customImage?: {
    url: string;
    title: string;
    caption: string;
  } | null;
  onRequestModel: (modelTitle: string) => void;
}

export const EducationLightboxModal: React.FC<EducationLightboxModalProps> = ({
  isOpen,
  onClose,
  project,
  customImage,
  onRequestModel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const title = project?.title || customImage?.title || 'Educational Model Inspection';
  const imageUrl = project?.image || customImage?.url || '';
  const caption = project?.caption || customImage?.caption || '';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="education-lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171717]/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FFF9ED] border-4 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[10px_10px_0px_0px_#171717] overflow-y-auto max-h-[90vh] animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white border-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FF8A00] hover:text-white shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[2.5px]" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT: LARGE PHOTO */}
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border-3 border-[#171717] bg-white shadow-[4px_4px_0px_0px_#171717] relative">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/60 via-transparent to-transparent pointer-events-none" />
              
              {project && (
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-black font-heading uppercase text-[#FFC43C] tracking-wider block">
                    {project.subject} • {project.targetAge}
                  </span>
                  <h4 className="text-sm font-black font-heading leading-tight">
                    {project.caption}
                  </h4>
                </div>
              )}
            </div>

            {project?.educationalNotes && (
              <div className="mt-3 p-3 rounded-xl bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] text-[11px] font-semibold text-[#525252]">
                <span className="font-black text-[#171717] uppercase block mb-0.5">Pedagogical Note:</span>
                {project.educationalNotes}
              </div>
            )}
          </div>

          {/* RIGHT: SPECIFICATIONS & ACTIONS */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#FF8A00] text-white text-[10px] font-black font-heading uppercase">
                ACADEMIC SPECIMEN
              </span>
              {project && (
                <span className="px-2 py-0.5 rounded-md bg-white border border-[#171717] text-[10px] font-bold text-[#171717]">
                  {project.difficulty}
                </span>
              )}
            </div>

            <h3 id="education-lightbox-title" className="text-xl sm:text-2xl font-black font-heading text-[#171717] tracking-tight mb-2">
              {title}
            </h3>

            <p className="text-xs sm:text-sm font-medium text-[#404040] leading-relaxed mb-4">
              {project?.description || caption}
            </p>

            {project && (
              <div className="bg-white border-2 border-[#171717] rounded-2xl p-4 shadow-[3px_3px_0px_0px_#171717] space-y-2.5 mb-5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#171717]/10">
                  <span className="font-bold text-[#737373]">DIMENSIONS / SCALE:</span>
                  <span className="font-black text-[#171717]">{project.detailedSpecs.scale}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#171717]/10">
                  <span className="font-bold text-[#737373]">PRINT TECHNOLOGY:</span>
                  <span className="font-black text-[#171717]">{project.detailedSpecs.printTechnology}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#171717]/10">
                  <span className="font-bold text-[#737373]">MATERIAL(S):</span>
                  <span className="font-black text-[#171717]">{project.detailedSpecs.materials.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#171717]/10">
                  <span className="font-bold text-[#737373]">ASSEMBLY / FASTENERS:</span>
                  <span className="font-black text-[#171717]">{project.detailedSpecs.assemblyType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#737373]">STUDIO LEAD TIME:</span>
                  <span className="font-black text-[#059669]">{project.detailedSpecs.estimatedLeadTime}</span>
                </div>
              </div>
            )}

            {project?.applications && (
              <div className="mb-5">
                <span className="text-[10px] font-black font-heading uppercase text-[#737373] block mb-1.5">
                  RECOMMENDED CLASSROOM APPLICATIONS:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg bg-white border border-[#171717] text-[10px] font-bold text-[#171717]"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t-2 border-[#171717]/10 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestModel(title);
                }}
                className="w-full py-3.5 bg-[#FF8A00] hover:bg-[#FF9B26] text-white border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase shadow-[3px_3px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Quotation for this Model</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
