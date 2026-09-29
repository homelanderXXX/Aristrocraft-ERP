import React, { useState } from 'react';
import {
  Maximize2,
  Filter,
  ArrowRight,
  Eye,
  Sliders,
} from 'lucide-react';
import { EDUCATIONAL_PROJECTS, EducationalProject } from '../../data/educationData';

interface EducationGalleryProps {
  onSelectProject: (project: EducationalProject) => void;
  onRequestCustom: () => void;
}

export const EducationGallery: React.FC<EducationGalleryProps> = ({
  onSelectProject,
  onRequestCustom,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const galleryItems = [
    {
      id: 'gal-heart',
      title: 'Human Heart with Magnetic Valves',
      caption: 'Human Heart — Anatomy Teaching Model',
      category: 'Biology',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
      aspect: 'aspect-[4/5]',
      projectRef: 'proj-human-heart',
    },
    {
      id: 'gal-gearbox',
      title: 'Cutaway Planetary Gearbox',
      caption: 'Planetary Gearbox — Mechanical Engineering',
      category: 'Engineering',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      aspect: 'aspect-[1/1]',
      projectRef: 'proj-planetary-gearbox',
    },
    {
      id: 'gal-cell',
      title: 'Eukaryotic Cell Organelles',
      caption: 'Cell Model — Biology',
      category: 'Biology',
      image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=800',
      aspect: 'aspect-[4/3]',
      projectRef: 'proj-cell-organelle',
    },
    {
      id: 'gal-terrain',
      title: 'River Delta Topographic Relief',
      caption: 'Terrain Relief — Geography',
      category: 'Geography',
      image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800',
      aspect: 'aspect-[16/9]',
      projectRef: 'proj-terrain-relief',
    },
    {
      id: 'gal-robot',
      title: '6-DOF Articulated Manipulator',
      caption: 'Robot Arm — Robotics',
      category: 'Robotics',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
      aspect: 'aspect-[4/5]',
      projectRef: 'proj-robot-arm',
    },
    {
      id: 'gal-dna',
      title: 'DNA Double Helix Base Pairs',
      caption: 'DNA — Molecular Biology',
      category: 'Biology',
      image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800',
      aspect: 'aspect-[1/1]',
      projectRef: 'proj-dna-double-helix',
    },
    {
      id: 'gal-engine',
      title: '4-Stroke Engine Cam Cutaway',
      caption: 'Engine Cutaway — Thermodynamics',
      category: 'Engineering',
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=800',
      aspect: 'aspect-[4/3]',
      projectRef: 'proj-4stroke-engine',
    },
    {
      id: 'gal-molecule',
      title: 'Magnetic Crystal Lattice Structure',
      caption: 'Molecular Structure — Chemistry',
      category: 'Chemistry',
      image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=800',
      aspect: 'aspect-[16/10]',
      projectRef: 'proj-molecular-bonding-kit',
    },
    {
      id: 'gal-geometry',
      title: 'Dual Polyhedra Nesting Set',
      caption: 'Geometry Kit — Mathematics',
      category: 'Math',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
      aspect: 'aspect-[1/1]',
      projectRef: 'proj-geometry-solids',
    },
    {
      id: 'gal-circuit',
      title: 'Microcontroller Lab Breadboard Rig',
      caption: 'Circuit Model — Electronics & CS',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      aspect: 'aspect-[4/3]',
      projectRef: 'proj-circuit-trainer',
    },
    {
      id: 'gal-arch',
      title: 'Modular Structural Truss Bridge',
      caption: 'Architectural Model — Structural Engineering',
      category: 'Architecture',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
      aspect: 'aspect-[16/9]',
      projectRef: 'proj-arch-truss',
    },
    {
      id: 'gal-solar',
      title: 'Scale Solar System Geared Orrery',
      caption: 'Solar System — Astronomy & Earth Science',
      category: 'Geography',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      aspect: 'aspect-[4/3]',
      projectRef: 'proj-solar-system',
    },
  ];

  const filteredGallery =
    filter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category.toLowerCase() === filter.toLowerCase());

  const handleItemClick = (projectRef: string) => {
    const proj = EDUCATIONAL_PROJECTS.find((p) => p.id === projectRef);
    if (proj) {
      onSelectProject(proj);
    }
  };

  return (
    <section id="gallery" className="w-full py-16 lg:py-24 bg-[#FFF9ED] border-b-3 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#171717] text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] mb-3">
              <Eye className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span>EDITORIAL VISUAL ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#171717] tracking-tight">
              Educational Project Gallery
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#525252] max-w-2xl mt-2">
              High-resolution photography of real manufactured teaching specimens. Click any item to inspect technical dimensions, materials, and ordering specifications.
            </p>
          </div>

          {/* FILTER PILLS */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
            {['all', 'biology', 'engineering', 'chemistry', 'math', 'robotics', 'geography'].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`
                    px-3 py-1.5 rounded-xl border-2 text-xs font-black font-heading uppercase transition-colors cursor-pointer
                    ${
                      filter === cat
                        ? 'bg-[#171717] text-white border-[#171717] shadow-[2px_2px_0px_0px_#FF8A00]'
                        : 'bg-white text-[#171717] border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFC43C]'
                    }
                  `}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* MASONRY / EDITORIAL COMPOSITION */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.projectRef)}
              className="break-inside-avoid group relative rounded-2xl border-3 border-[#171717] overflow-hidden bg-white shadow-[4px_4px_0px_0px_#171717] hover:shadow-[8px_8px_0px_0px_#171717] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-full overflow-hidden relative ${item.aspect}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* TOP CATEGORY BADGE */}
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-white border border-[#171717] text-[9px] font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717]">
                  {item.category}
                </span>

                {/* ZOOM ICON */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center text-[#171717] opacity-0 group-hover:opacity-100 transition-opacity shadow-[2px_2px_0px_0px_#171717]">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* EDITORIAL CAPTION OVERLAY */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-black font-heading uppercase text-[#FFC43C] tracking-wider block mb-0.5">
                    {item.caption}
                  </span>
                  <h4 className="text-sm sm:text-base font-black font-heading leading-tight">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/80 mt-2">
                    <span>Inspect Model</span>
                    <ArrowRight className="w-3 h-3 text-[#FF8A00]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM PROMPT BANNER */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onRequestCustom}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF8A00] hover:bg-[#FF9B26] text-white border-3 border-[#171717] rounded-xl font-black font-heading text-xs uppercase shadow-[4px_4px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>Have a Custom Model or STL to Fabricate? Request Quote</span>
            <ArrowRight className="w-4 h-4 stroke-[3px]" />
          </button>
        </div>

      </div>
    </section>
  );
};
