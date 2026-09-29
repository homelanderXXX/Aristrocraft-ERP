import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Sliders,
  FileCheck,
  Cpu,
  GraduationCap,
  Microscope,
  CheckCircle2,
  Building2,
  FolderPlus,
} from 'lucide-react';

interface CustomEducationRequestProps {
  onRequestCustom: () => void;
}

export const CustomEducationRequest: React.FC<CustomEducationRequestProps> = ({
  onRequestCustom,
}) => {
  const customUseCases = [
    {
      title: 'University Course-Specific Models',
      desc: 'Bespoke kinematic rigs or biological specimens tailored to match specific midterm lecture topics and syllabus modules.',
      icon: GraduationCap,
    },
    {
      title: "A Teacher's Own CAD / STL Design",
      desc: 'Upload an existing 3D model found on open-source repositories or created by your faculty for slicing and manufacturing.',
      icon: FolderPlus,
    },
    {
      title: 'Postgraduate Research Demonstrations',
      desc: 'Custom microfluidic arrays, optical mounting brackets, and sensor calibration fixtures with sub-millimeter tolerances.',
      icon: Microscope,
    },
    {
      title: 'Custom Laboratory Teaching Aids',
      desc: 'Specialized pipette stands, chemical-resistant cuvette holders, and organizers scaled to your physical lab benches.',
      icon: Sliders,
    },
    {
      title: 'School STEM Challenge Kits',
      desc: 'Uniform components for student engineering contests (e.g. bridge collapse testers, rubber-band cars, wind turbines).',
      icon: Cpu,
    },
    {
      title: 'Museum & Heritage Educational Replicas',
      desc: 'Durable, tactile replicas of delicate historical artifacts and archaeological relics for hands-on visitor engagement.',
      icon: Building2,
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b-3 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl p-8 sm:p-10 lg:p-14 shadow-[8px_8px_0px_0px_#171717]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COPY */}
            <div className="lg:col-span-6 flex flex-col">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#171717] text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] mb-4 self-start">
                <Sliders className="w-4 h-4 text-[#FF8A00]" />
                <span>BESPOKE MANUFACTURING ON DEMAND</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#171717] tracking-tight leading-tight mb-4">
                Can’t Find the Model <br />
                <span className="text-[#FF8A00]">You Need?</span>
              </h2>

              <p className="text-base sm:text-lg font-semibold text-[#404040] leading-relaxed mb-6">
                Teachers, lecturers, researchers, and educational institutions can request completely custom educational models tailored directly to your curriculum.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-[#171717]">
                  <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs font-black shrink-0">
                    ✓
                  </div>
                  <span>We accept sketches, 2D diagrams, textbook figures, or 3D files</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-[#171717]">
                  <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs font-black shrink-0">
                    ✓
                  </div>
                  <span>Engineering team adapts clearances and tolerances for printability</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-[#171717]">
                  <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs font-black shrink-0">
                    ✓
                  </div>
                  <span>Rapid 24–48 hour prototype turnaround from our Dhaka studio</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onRequestCustom}
                className="px-6 py-4 bg-[#FF8A00] hover:bg-[#FF9B26] text-white border-3 border-[#171717] rounded-2xl font-black font-heading text-sm uppercase shadow-[4px_4px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 self-start cursor-pointer"
              >
                <span>Request a Custom Educational Model</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </button>

            </div>

            {/* RIGHT: 6 REAL-WORLD CUSTOM REQUEST SCENARIOS */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {customUseCases.map((useCase, idx) => {
                const Icon = useCase.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] flex flex-col gap-2"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#FFF9ED] border-2 border-[#171717] flex items-center justify-center text-[#FF8A00] shrink-0">
                      <Icon className="w-4 h-4 stroke-[2.5px]" />
                    </div>
                    <h3 className="text-xs font-black font-heading uppercase text-[#171717] leading-snug">
                      {useCase.title}
                    </h3>
                    <p className="text-[11px] font-medium text-[#525252] leading-relaxed">
                      {useCase.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
