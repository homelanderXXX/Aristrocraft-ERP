import React from 'react';
import { ShieldCheck, Cpu, FlaskConical, Wrench, Microscope, Compass, CheckCircle2 } from 'lucide-react';

interface ManufacturingPositioningProps {
  onStartInstitutional: () => void;
}

export const ManufacturingPositioningSection: React.FC<ManufacturingPositioningProps> = ({
  onStartInstitutional,
}) => {
  const capabilities = [
    {
      title: 'Anatomical Teaching Models',
      detail: 'Multi-part magnetic hearts, cranial skulls, and cellular organelle cross-sections with sub-millimeter precision.',
      icon: Microscope,
      specs: '±0.15mm Tolerances • Non-Toxic Polymers',
    },
    {
      title: 'Engineering Kinematics & Gearboxes',
      detail: 'Working planetary gear trains, engine cutaways, differential drives, and standard bearing press-fit housings.',
      icon: Wrench,
      specs: 'Carbon Fiber Infused • High Load Durability',
    },
    {
      title: 'Robotics & Mechatronics Chassis',
      detail: 'Modular rover frames, 6-DOF robotic arms, sensor mounts, and custom TPU grippers for university labs.',
      icon: Cpu,
      specs: 'Standard Servo Pockets • Drop-Resistant',
    },
    {
      title: 'Laboratory Organizers & Fixtures',
      detail: 'Chemical-resistant test tube racks, custom cuvette holders, microscope slide organizers, and optical rigs.',
      icon: FlaskConical,
      specs: 'PETG & Chemical Resistant • Custom CAD Fit',
    },
    {
      title: 'Tactile & Inclusive Education Aids',
      detail: 'Dual-script Braille alphabet tiles, high-contrast sensory textures, and ergonomic adaptive writing grips.',
      icon: Compass,
      specs: 'Soft Medical TPU • Rounded Safety Chamfers',
    },
    {
      title: 'Architectural & Heritage Replicas',
      detail: '1:100 scale site massings, parametric structural vaults, and museum-grade archaeological cuneiform tablets.',
      icon: ShieldCheck,
      specs: '8K Ultra SLA Resin • Sandstone/Marble Finish',
    },
  ];

  return (
    <section className="w-full py-16 md:py-28 bg-[#171717] text-white border-b-2 border-[#171717] relative overflow-hidden">
      
      {/* Visual Ambient Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FF8A00]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Headline */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF8A00] text-[#171717] rounded-full text-xs font-mono font-black uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> INDUSTRIAL QUALITY STANDARD
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight uppercase leading-[1.05]">
            NOT JUST TOYS. <br />
            <span className="text-[#FF8A00] underline decoration-4 decoration-white underline-offset-8">
              REAL LEARNING TOOLS.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-xl text-white/85 font-normal leading-relaxed">
            ARISTROCRAFT creates educational models, classroom tools, prototypes, teaching aids and custom physical learning objects for schools, universities, training centers and research environments.
          </p>
        </div>

        {/* Manufacturing Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all duration-300 shadow-md"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#FF8A00]/20 border border-[#FF8A00]/40 flex items-center justify-center text-[#FF8A00] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black font-heading uppercase text-white tracking-tight mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4">
                    {cap.detail}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-[#FFC43C]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8A00] shrink-0" />
                  <span>{cap.specs}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white/10 border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="text-xs font-mono font-bold text-[#FF8A00] uppercase tracking-wider block">
              INSTITUTIONAL MANUFACTURING PARTNER
            </span>
            <p className="text-sm sm:text-base font-bold text-white mt-1">
              Bulk production, institutional purchase orders (PO), and faculty tax invoices available.
            </p>
          </div>
          <button
            onClick={onStartInstitutional}
            className="px-6 py-3 bg-[#FF8A00] hover:bg-[#e07a00] text-white font-black font-heading text-xs uppercase tracking-wider rounded-xl border border-white/30 shadow-[3px_3px_0px_0px_#ffffff] shrink-0 transition-all"
          >
            REQUEST INSTITUTIONAL QUOTE
          </button>
        </div>

      </div>
    </section>
  );
};
