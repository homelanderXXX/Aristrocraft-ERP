import React from 'react';
import { EDITORIAL_SUBJECTS, SubjectEditorialData } from '../../data/educationData';
import { ArrowRight, CheckCircle2, AlertCircle, Layers } from 'lucide-react';

interface SubjectsEditorialProps {
  onRequestSubject: (subjectTitle: string) => void;
  onOpenLightbox: (url: string, title: string, caption: string) => void;
}

export const SubjectsEditorialSection: React.FC<SubjectsEditorialProps> = ({
  onRequestSubject,
  onOpenLightbox,
}) => {
  return (
    <section id="subjects-editorial" className="w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF8A00]" /> 12 ACADEMIC DISCIPLINES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] tracking-tight uppercase leading-[1.05]">
            PHYSICAL LEARNING ACROSS <br />
            <span className="text-[#FF8A00] underline decoration-4 decoration-[#171717]">
              EVERY CURRICULUM SUBJECT.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#171717]/80 leading-relaxed">
            Scroll through our 12 specialized disciplines. Each model is engineered for hands-on classroom exploration, structural durability, and tactile intuition.
          </p>
        </div>

        {/* ALTERNATING EDITORIAL SPREADS (IMAGE LEFT -> TEXT RIGHT -> IMAGE RIGHT -> TEXT LEFT) */}
        <div className="space-y-24 md:space-y-36">
          {EDITORIAL_SUBJECTS.map((subject: SubjectEditorialData, index: number) => {
            const isEven = index % 2 === 1; // 0 is Image Left, 1 is Image Right, etc.

            return (
              <div
                key={subject.id}
                id={`subject-${subject.id}`}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isEven ? 'lg:grid-flow-dense' : ''
                }`}
              >
                
                {/* LARGE PHOTOGRAPHY & VISUAL COLUMN */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:col-start-6' : ''}`}>
                  <div className="relative group">
                    
                    {/* Main High-Impact Image */}
                    <div
                      onClick={() => onOpenLightbox(subject.heroImage, subject.title, subject.tagline)}
                      className="relative rounded-2xl md:rounded-3xl border-2 border-[#171717] overflow-hidden shadow-[6px_6px_0px_0px_#171717] bg-[#171717] cursor-pointer"
                    >
                      <img
                        src={subject.heroImage}
                        alt={`${subject.title} 3D printed educational models`}
                        className="w-full h-[360px] sm:h-[460px] md:h-[520px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                      
                      {/* Overlaid Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 bg-white text-[#171717] font-black font-heading text-xs tracking-wider uppercase rounded-md border border-[#171717] shadow-sm">
                          {subject.num}
                        </span>
                        <span className="px-2.5 py-1 bg-[#FF8A00] text-white font-mono text-xs font-bold uppercase rounded-md shadow-sm">
                          {subject.title}
                        </span>
                      </div>

                      {/* Overlaid Tagline & Caption */}
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <p className="text-lg sm:text-xl font-bold font-heading leading-tight drop-shadow-md">
                          "{subject.tagline}"
                        </p>
                        <span className="text-[11px] font-mono text-white/80 mt-1 block">
                          Click to inspect high-resolution specimen
                        </span>
                      </div>
                    </div>

                    {/* Secondary Detail Inset Image */}
                    <div
                      onClick={() => onOpenLightbox(subject.secondaryImage, `${subject.title} - Detail`, subject.visualDescription)}
                      className={`absolute -bottom-6 ${
                        isEven ? '-left-4 sm:-left-8' : '-right-4 sm:-right-8'
                      } w-36 sm:w-48 h-28 sm:h-36 rounded-xl border-2 border-[#171717] overflow-hidden shadow-[4px_4px_0px_0px_#171717] bg-white cursor-pointer hidden sm:block`}
                    >
                      <img
                        src={subject.secondaryImage}
                        alt={`${subject.title} detail specimen`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                  </div>
                </div>

                {/* EDITORIAL TEXT & DETAILS COLUMN */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:col-start-1' : ''} space-y-6`}>
                  
                  {/* Subject Tag & Title */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#171717]/60 mb-2 uppercase">
                      <span>DISCIPLINE {subject.num}</span>
                      <span>•</span>
                      <span>LAB SPECIMENS</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-[#171717] tracking-tight uppercase leading-tight">
                      {subject.title}
                    </h3>
                    
                    <p className="mt-2 text-sm sm:text-base font-bold text-[#FF8A00]">
                      {subject.tagline}
                    </p>
                  </div>

                  {/* Descriptions */}
                  <p className="text-sm sm:text-base text-[#171717]/85 leading-relaxed">
                    {subject.shortDescription}
                  </p>

                  {/* Medical / Educational Disclaimer for Biology & Anatomy */}
                  {subject.id === 'biology' && (
                    <div className="p-3 bg-[#FFF3D6] border-2 border-[#171717] rounded-xl flex items-start gap-2.5 text-xs text-[#171717] shadow-[2px_2px_0px_0px_#171717]">
                      <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Pedagogical Visualization Notice:</strong> All anatomical and organ models are engineered strictly as non-clinical educational models for biology, nursing, and secondary classrooms.
                      </div>
                    </div>
                  )}

                  {/* What We Can Make (Bullet List) */}
                  <div className="space-y-2 pt-2 border-t border-[#171717]/15">
                    <h4 className="text-xs font-mono font-black uppercase tracking-wider text-[#171717]">
                      WHAT WE CAN MANUFACTURE:
                    </h4>
                    <ul className="space-y-1.5">
                      {subject.whatWeCanMake.slice(0, 5).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#171717]/90 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#FF8A00] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suitable For Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-mono text-[#171717]/60 mr-1">SUITABLE FOR:</span>
                    {subject.suitableFor.map((lvl, lidx) => (
                      <span
                        key={lidx}
                        className="px-2 py-0.5 bg-white border border-[#171717] rounded text-[10px] font-mono font-bold text-[#171717] shadow-sm"
                      >
                        {lvl}
                      </span>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2">
                    <button
                      onClick={() => onRequestSubject(subject.title)}
                      className="px-5 py-2.5 bg-[#171717] hover:bg-[#333] text-white font-black font-heading text-xs uppercase tracking-wider rounded-xl border border-[#171717] shadow-[3px_3px_0px_0px_#FF8A00] hover:shadow-[1px_1px_0px_0px_#FF8A00] hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-2"
                    >
                      <span>{subject.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FF8A00]" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
