import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface TouchExplorationProps {
  onExploreMore: () => void;
  onRequestModel: () => void;
}

export const TouchExplorationSection: React.FC<TouchExplorationProps> = ({
  onExploreMore,
  onRequestModel,
}) => {
  const tangibleArtifacts = [
    { label: 'Anatomical 4-Chamber Heart', tag: 'Biology' },
    { label: 'Human Skull & Brain Lobes', tag: 'Anatomy' },
    { label: 'Articulated Knee & Shoulder Joints', tag: 'Orthopedics' },
    { label: 'DNA Double Helix Base-Pairs', tag: 'Genetics' },
    { label: 'Molecular Bonds & Crystal Lattices', tag: 'Chemistry' },
    { label: 'Proportional Solar System Orreries', tag: 'Astronomy' },
    { label: 'Platonic Solids & Calculus Surfaces', tag: 'Mathematics' },
    { label: 'Working Epicyclic Planetary Gearboxes', tag: 'Physics' },
    { label: 'Truss Bridges for Failure Load Testing', tag: 'Civil Engineering' },
    { label: '6-Axis Robotic Arm Manipulators', tag: 'Robotics' },
    { label: 'Arduino & Raspberry Pi Lab Stations', tag: 'Computer Science' },
    { label: 'DEM Satellite Topographic River Relies', tag: 'Geography' },
  ];

  return (
    <section className="w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial 2-Column Spread: Image on Left/Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* HUGE VISUAL SPREAD (LEFT) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl md:rounded-3xl border-2 border-[#171717] overflow-hidden shadow-[6px_6px_0px_0px_#171717] bg-[#171717]">
              <img
                src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=85&w=1400"
                alt="Classroom table filled with physical 3D printed educational models"
                className="w-full h-[400px] sm:h-[500px] md:h-[580px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              {/* Overlaid Editorial Caption */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-3 py-1 bg-[#FF8A00] text-white font-mono text-xs font-bold uppercase rounded-md mb-2 shadow-sm">
                  CLASSROOM TABLETOP SPECIMENS
                </div>
                <p className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight leading-snug">
                  "Abstract ideas become physical objects."
                </p>
                <p className="text-xs sm:text-sm font-mono text-white/80 mt-1">
                  Students learn 3x faster when complex concepts can be rotated, disassembled, and tested by hand.
                </p>
              </div>
            </div>

            {/* Micro-Gallery Secondary Strip */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border-2 border-[#171717] overflow-hidden shadow-[2px_2px_0px_0px_#171717]">
                <img
                  src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=400"
                  alt="Anatomical heart detail"
                  className="w-full h-24 sm:h-28 object-cover"
                />
              </div>
              <div className="rounded-xl border-2 border-[#171717] overflow-hidden shadow-[2px_2px_0px_0px_#171717]">
                <img
                  src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=400"
                  alt="Kinematic mechanism detail"
                  className="w-full h-24 sm:h-28 object-cover"
                />
              </div>
              <div className="rounded-xl border-2 border-[#171717] overflow-hidden shadow-[2px_2px_0px_0px_#171717]">
                <img
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400"
                  alt="Geometric polyhedra detail"
                  className="w-full h-24 sm:h-28 object-cover"
                />
              </div>
            </div>
          </div>

          {/* LARGE TYPOGRAPHY & STORYTELLING (RIGHT) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#171717] rounded-full text-xs font-mono font-bold text-[#171717] mb-4">
                TACTILE PEDAGOGY
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] tracking-tight uppercase leading-[1.05]">
                WHAT CAN STUDENTS <br />
                <span className="text-[#FF8A00]">ACTUALLY TOUCH?</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#171717]/85 leading-relaxed">
              When students only see flat diagrams on a whiteboard, spatial relationships remain theoretical. ARISTROCRAFT manufactures real, durable 3D learning apparatuses that sit right on students’ desks.
            </p>

            {/* List of Physical Objects */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#171717]/60">
                MANUFACTURED LAB & CLASSROOM SPECIMENS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tangibleArtifacts.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-white rounded-lg border border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-between gap-2"
                  >
                    <span className="text-xs font-bold text-[#171717]">{item.label}</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#FFF9ED] border border-[#171717]/30 rounded text-[#171717]/70">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trigger buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreMore}
                className="px-6 py-3 bg-[#171717] hover:bg-[#2e2e2e] text-white font-black font-heading text-xs uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_0px_#FF8A00] transition-all inline-flex items-center gap-2"
              >
                <span>SEE ALL 12 SUBJECTS</span>
                <ArrowRight className="w-4 h-4 text-[#FF8A00]" />
              </button>

              <button
                onClick={onRequestModel}
                className="px-6 py-3 bg-white hover:bg-[#FFF9ED] text-[#171717] font-black font-heading text-xs uppercase tracking-wider rounded-xl border border-[#171717] shadow-[2px_2px_0px_0px_#171717] transition-all"
              >
                REQUEST CUSTOM MODEL
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
