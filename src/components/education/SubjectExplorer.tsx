import React, { useState } from 'react';
import {
  ArrowRight,
  Filter,
  Layers,
  Cpu,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  Sliders,
  Award,
} from 'lucide-react';
import {
  EDUCATIONAL_PROJECTS,
  EducationalProject,
  SUBJECT_FILTER_LIST,
} from '../../data/educationData';

interface SubjectExplorerProps {
  onSelectProject: (project: EducationalProject) => void;
  onRequestCustomSubject: (subjectName: string) => void;
}

export const SubjectExplorer: React.FC<SubjectExplorerProps> = ({
  onSelectProject,
  onRequestCustomSubject,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredProjects = EDUCATIONAL_PROJECTS.filter((proj) => {
    if (selectedSubject !== 'all') {
      const subjectSlug = proj.subject.toLowerCase();
      if (selectedSubject === 'math' && !subjectSlug.includes('math')) return false;
      if (selectedSubject === 'physics' && !subjectSlug.includes('physics')) return false;
      if (selectedSubject === 'biology' && !subjectSlug.includes('bio')) return false;
      if (selectedSubject === 'chemistry' && !subjectSlug.includes('chem')) return false;
      if (selectedSubject === 'engineering' && !subjectSlug.includes('eng')) return false;
      if (selectedSubject === 'electronics' && !subjectSlug.includes('elec')) return false;
      if (selectedSubject === 'robotics' && !subjectSlug.includes('robot')) return false;
      if (selectedSubject === 'geography' && !subjectSlug.includes('geo')) return false;
      if (selectedSubject === 'architecture' && !subjectSlug.includes('arch')) return false;
    }

    if (selectedAge !== 'all') {
      if (selectedAge === 'early' && proj.targetAge !== 'Ages 3–9' && proj.targetAge !== 'All Ages')
        return false;
      if (
        selectedAge === 'school' &&
        proj.targetAge !== 'Ages 10–14' &&
        proj.targetAge !== 'All Ages'
      )
        return false;
      if (
        selectedAge === 'advanced' &&
        proj.targetAge !== 'Ages 15+ / University' &&
        proj.targetAge !== 'All Ages'
      )
        return false;
    }

    if (selectedDifficulty !== 'all') {
      if (proj.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) return false;
    }

    return true;
  });

  return (
    <section id="subject-explorer" className="w-full py-16 lg:py-24 bg-[#FFF9ED] border-b-3 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#171717] text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] mb-3">
              <Filter className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span>INTERACTIVE SYLLABUS CATALOG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#171717] tracking-tight">
              Subject Explorer
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#525252] max-w-2xl mt-2">
              Browse physical models and teaching demonstrators by academic discipline, target age group, and classroom complexity.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#171717]">
            <span className="px-3 py-1.5 rounded-lg bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717]">
              Showing <strong>{filteredProjects.length}</strong> Featured Teaching Artifacts
            </span>
          </div>
        </div>

        {/* HORIZONTAL SUBJECT PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {SUBJECT_FILTER_LIST.map((subj) => {
            const isSelected = selectedSubject === subj.id;
            return (
              <button
                key={subj.id}
                type="button"
                onClick={() => setSelectedSubject(subj.id)}
                className={`
                  px-4 py-2 rounded-xl border-2 font-black font-heading text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 cursor-pointer
                  ${
                    isSelected
                      ? 'bg-[#FF8A00] text-white border-[#171717] shadow-[3px_3px_0px_0px_#171717] -translate-y-0.5'
                      : 'bg-white text-[#171717] border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFC43C]'
                  }
                `}
              >
                <span>{subj.label}</span>
              </button>
            );
          })}
        </div>

        {/* SUB-FILTERS: AGE & DIFFICULTY */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] mb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[11px] font-black font-heading uppercase text-[#737373]">
              TARGET LEVEL:
            </span>
            {[
              { id: 'all', label: 'All Levels' },
              { id: 'early', label: 'Ages 3–9' },
              { id: 'school', label: 'Ages 10–14' },
              { id: 'advanced', label: '15+ / University' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setSelectedAge(lvl.id)}
                className={`
                  px-2.5 py-1 rounded-lg border text-[11px] font-black font-heading uppercase transition-colors cursor-pointer
                  ${
                    selectedAge === lvl.id
                      ? 'bg-[#171717] text-white border-[#171717]'
                      : 'bg-[#FFF9ED] text-[#171717] border-[#171717]/30 hover:border-[#171717]'
                  }
                `}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-black font-heading uppercase text-[#737373]">
              DIFFICULTY:
            </span>
            {['all', 'beginner', 'intermediate', 'advanced'].map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`
                  px-2.5 py-1 rounded-lg border text-[11px] font-black font-heading uppercase transition-colors cursor-pointer
                  ${
                    selectedDifficulty === diff
                      ? 'bg-[#FFC43C] text-[#171717] border-[#171717]'
                      : 'bg-[#FFF9ED] text-[#171717] border-[#171717]/30 hover:border-[#171717]'
                  }
                `}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS HORIZONTAL / EDITORIAL LAYOUT LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className="group bg-white border-3 border-[#171717] rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* PHOTO HEADER */}
                <div className="aspect-[16/10] w-full overflow-hidden relative border-b-2 border-[#171717]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent opacity-75" />
                  
                  {/* Subject and Target Level Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#171717] text-white text-[9px] font-black font-heading uppercase">
                      {proj.subject}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#FFC43C] border border-[#171717] text-[#171717] text-[9px] font-black font-heading uppercase">
                      {proj.targetAge}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <span className="text-[10px] font-bold text-[#FFC43C] block uppercase tracking-wider">
                      {proj.caption}
                    </span>
                  </div>
                </div>

                {/* DETAILS & CONTENT */}
                <div className="p-4 sm:p-5 flex flex-col gap-3">
                  <h3 className="text-base sm:text-lg font-black font-heading text-[#171717] leading-tight group-hover:text-[#FF8A00] transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#525252] line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* METADATA CHIPS */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#171717]/10 text-[10px] font-bold text-[#404040]">
                    <div>
                      <span className="text-[#8C8C8C] block">DIMENSIONS / SCALE</span>
                      <span className="truncate block">{proj.detailedSpecs.scale}</span>
                    </div>
                    <div>
                      <span className="text-[#8C8C8C] block">MATERIAL</span>
                      <span className="truncate block">{proj.detailedSpecs.materials[0]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER CTA */}
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                <div className="w-full py-2.5 px-3 rounded-xl bg-[#FFF9ED] group-hover:bg-[#FF8A00] group-hover:text-white border-2 border-[#171717] text-xs font-black font-heading uppercase text-[#171717] flex items-center justify-between transition-colors shadow-[2px_2px_0px_0px_#171717]">
                  <span>Inspect Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PROMPT BANNER FOR MISSING SUBJECTS */}
        <div className="mt-12 p-6 rounded-3xl bg-white border-3 border-[#171717] shadow-[6px_6px_0px_0px_#171717] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#171717]">
              <Sliders className="w-6 h-6 text-[#171717]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black font-heading uppercase text-[#171717]">
                Teaching a Specific Topic Not Listed Above?
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-[#6D6D6D]">
                We routinely engineer bespoke teaching models directly from teacher sketches, textbook figures, or university research syllabi.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onRequestCustomSubject('Custom Subject Model')}
            className="px-6 py-3 bg-[#FF8A00] hover:bg-[#FF9B26] text-white border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase shadow-[3px_3px_0px_0px_#171717] shrink-0 hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <span>Request Custom Subject Model</span>
          </button>
        </div>

      </div>
    </section>
  );
};
