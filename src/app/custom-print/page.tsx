import React, { useState } from 'react';
import {
  Upload,
  FileCode,
  Layers,
  Palette,
  Maximize2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Printer,
  HelpCircle,
  Clock,
  Zap,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { CustomOrderModal } from '../../components/shop/CustomOrderModal';
import { PageMeta } from '../../components/common/PageMeta';

export default function CustomPrintPage() {
  const { navigate } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const FILE_FORMATS = [
    { ext: '.STL', name: 'Standard Stereolithography', desc: 'Universal 3D mesh format for rapid slicing.' },
    { ext: '.OBJ', name: 'Wavefront Object', desc: '3D geometry file with polygon vertex maps.' },
    { ext: '.3MF', name: '3D Manufacturing Format', desc: 'Preserves color, material, and multi-part data.' },
    { ext: '.STEP', name: 'Standard CAD Exchange', desc: 'High-precision solid geometry for engineering parts.' },
    { ext: '.PNG / .JPG', name: 'Reference Image / Sketch', desc: 'Send photos, diagrams, or sketches for custom CAD modeling.' },
  ];

  const MATERIALS = [
    { name: 'Tough PLA+', tag: 'Most Popular', desc: 'Enhanced impact resistance, smooth layer finish, matte aesthetic.', colors: '12+ Colors' },
    { name: 'High-Temp PETG', tag: 'Functional', desc: 'Chemical & UV resistant, high tensile strength for industrial parts.', colors: '8 Colors' },
    { name: 'Flexible TPU 95A', tag: 'Rubber-Like', desc: 'Elastic, shock-absorbing, bendable without deformation.', colors: '5 Colors' },
    { name: 'Silk PLA', tag: 'Luster Finish', desc: 'High-gloss metallic shimmer, perfect for display pieces & awards.', colors: '6 Colors' },
    { name: 'ABS / ASA', tag: 'Outdoor / Thermal', desc: 'High temperature deflection (100°C+), weather resistant.', colors: '4 Colors' },
    { name: 'Micro-Detail Resin', tag: 'Ultra-Fine', desc: '0.08mm layer precision for miniatures and delicate jewelry.', colors: 'Grey / Clear' },
  ];

  const PROCESS_STEPS = [
    { step: '01', title: 'Submit Idea or File', desc: 'Upload your .STL/.OBJ or describe your idea with dimensions.' },
    { step: '02', title: 'Engineering Review', desc: 'We inspect model geometry, wall thickness, and print orientation.' },
    { step: '03', title: 'Instant Quote', desc: 'Receive a transparent price estimate based on material & print hours.' },
    { step: '04', title: 'Bambu Lab Printing', desc: 'Printed on precision Bambu Lab cluster with high infill integrity.' },
    { step: '05', title: 'Quality & Delivery', desc: 'Hand-inspected, cleaned, and dispatched to your doorstep nationwide.' },
  ];

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="Custom 3D Printing Service in Bangladesh"
        description="Upload your CAD file, STL model, or design sketch for bespoke 3D printing in Dhaka, Bangladesh. Bambu Lab high-precision printing with nationwide delivery."
      />

      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_0px_#171717] relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading tracking-widest uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717]">
              <span>BESPOKE MANUFACTURING STUDIO</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading uppercase tracking-tight text-[#171717] leading-tight">
              Turn Your CAD & Ideas Into <span className="text-[#FF8A00]">Physical Reality</span>
            </h1>

            <p className="text-sm sm:text-base font-semibold text-[#525252] leading-relaxed">
              Have a 3D model, mechanical CAD part, gaming figure, or custom product concept? Our Dhaka-based studio delivers high-precision FDM & SLA 3D printing with fast turnaround and nationwide delivery.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 rounded-full bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] font-black font-heading text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] transition-all cursor-pointer flex items-center gap-2"
              >
                <Upload className="w-4 h-4 stroke-[3px]" />
                <span>Upload Model / Request Quote</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/how-it-works')}
                className="px-6 py-4 rounded-full bg-white hover:bg-[#FFF9ED] text-[#171717] border-2 border-[#171717] font-black font-heading text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#171717] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>How Process Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* WHAT CUSTOM PRINTING MEANS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center text-[#171717] mb-4 shadow-[2px_2px_0px_0px_#171717]">
              <Printer className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black font-heading uppercase text-[#171717] mb-2">Bespoke Fabrication</h3>
            <p className="text-xs font-semibold text-[#525252] leading-relaxed">
              We fabricate single prototypes, replacement mechanical gears, custom desk setups, architectural models, and cosplay props without minimum order limits.
            </p>
          </div>

          <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
            <div className="w-12 h-12 rounded-2xl bg-[#FF8A00] border-2 border-[#171717] flex items-center justify-center text-white mb-4 shadow-[2px_2px_0px_0px_#171717]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black font-heading uppercase text-[#171717] mb-2">Multi-Color AMS</h3>
            <p className="text-xs font-semibold text-[#525252] leading-relaxed">
              Our Bambu Lab printer cluster supports up to 4 simultaneous filament color shifts per object, creating clean embossed logos and multi-hue designs.
            </p>
          </div>

          <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
            <div className="w-12 h-12 rounded-2xl bg-[#171717] border-2 border-[#171717] flex items-center justify-center text-white mb-4 shadow-[2px_2px_0px_0px_#171717]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black font-heading uppercase text-[#171717] mb-2">Pre-Print Geometry Check</h3>
            <p className="text-xs font-semibold text-[#525252] leading-relaxed">
              Every file is manually inspected in slicer software to optimize orientation, layer adhesion, wall thickness, and infill structure before printing.
            </p>
          </div>
        </div>

        {/* SUPPORTED FILE FORMATS */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717]">
          <h2 className="text-2xl font-black font-heading uppercase text-[#171717] mb-6 flex items-center gap-2">
            <FileCode className="w-6 h-6 text-[#FF8A00]" />
            <span>Supported File Formats & Submissions</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FILE_FORMATS.map((fmt) => (
              <div key={fmt.ext} className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-4 shadow-[3px_3px_0px_0px_#171717]">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#171717] text-white font-mono font-black text-xs mb-2">
                  {fmt.ext}
                </span>
                <h4 className="text-xs font-black font-heading uppercase text-[#171717]">{fmt.name}</h4>
                <p className="text-[11px] font-semibold text-[#525252] mt-1">{fmt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AVAILABLE MATERIALS & COLORS */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-black font-heading uppercase text-[#171717] flex items-center gap-2">
                <Layers className="w-6 h-6 text-[#FF8A00]" />
                <span>Available Materials & Filament Grades</span>
              </h2>
              <p className="text-xs font-semibold text-[#525252] mt-1">
                Choose the exact material grade matching your strength, thermal, or aesthetic needs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/creations')}
              className="text-xs font-black font-heading uppercase text-[#FF8A00] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>See Real Creations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MATERIALS.map((mat) => (
              <div key={mat.name} className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#171717] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-black font-heading uppercase text-[#171717]">{mat.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#FFC43C] border border-[#171717] text-[10px] font-black uppercase text-[#171717]">
                      {mat.tag}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#525252] leading-relaxed mb-3">{mat.desc}</p>
                </div>
                <div className="pt-2 border-t border-[#171717]/10 flex items-center justify-between text-[11px] font-bold text-[#171717]">
                  <span className="flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>Colors:</span>
                  </span>
                  <span className="font-mono text-[#FF8A00]">{mat.colors}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BUILD VOLUME & SIZE CAPACITY */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717]">
          <h2 className="text-2xl font-black font-heading uppercase text-[#171717] mb-4 flex items-center gap-2">
            <Maximize2 className="w-6 h-6 text-[#FF8A00]" />
            <span>Build Dimensions & Multi-Part Scale</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3 text-xs font-semibold text-[#525252]">
              <div className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-4 shadow-[2px_2px_0px_0px_#171717]">
                <h4 className="font-black font-heading uppercase text-[#171717] mb-1">Single Volume Envelope</h4>
                <p>256 × 256 × 256 mm (10 × 10 × 10 inches) per single continuous print run.</p>
              </div>
              <div className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-4 shadow-[2px_2px_0px_0px_#171717]">
                <h4 className="font-black font-heading uppercase text-[#171717] mb-1">Large Assembly Assemblies</h4>
                <p>For large architectural models or cosplay helmets over 25cm, models are split with dovetail or pin alignment joints and assembled seamlessly.</p>
              </div>
            </div>

            <div className="bg-[#171717] text-white rounded-2xl p-6 border-2 border-[#171717] shadow-[4px_4px_0px_0px_#FFC43C] space-y-3 text-center">
              <span className="text-xs font-black font-heading uppercase tracking-widest text-[#FFC43C]">
                MAX PRECISION
              </span>
              <p className="text-3xl font-black font-mono text-white">0.08mm - 0.28mm</p>
              <p className="text-xs font-medium text-[#D4D4D4]">
                Selectable layer heights depending on whether speed or ultra-smooth cosmetic finish is required.
              </p>
            </div>
          </div>
        </div>

        {/* PROCESS STEPS */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717]">
          <h2 className="text-2xl font-black font-heading uppercase text-[#171717] mb-6 text-center">
            5-Step Custom Print Workflow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((ps) => (
              <div key={ps.step} className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-4 shadow-[3px_3px_0px_0px_#171717] relative">
                <span className="text-xs font-black font-mono text-[#FF8A00] block mb-1">{ps.step}</span>
                <h3 className="text-xs font-black font-heading uppercase text-[#171717] mb-1.5">{ps.title}</h3>
                <p className="text-[11px] font-semibold text-[#525252] leading-tight">{ps.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA CARD */}
        <div className="bg-[#FFC43C] border-3 border-[#171717] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_0px_#171717] text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black font-heading uppercase text-[#171717]">
            Ready to Bring Your Design to Life?
          </h2>
          <p className="text-xs sm:text-sm font-bold text-[#171717] max-w-xl mx-auto">
            Submit your CAD file or design description now. Our engineering team reviews all requests within 2 hours.
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3.5 rounded-full bg-[#171717] hover:bg-[#FF8A00] text-white font-black font-heading text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2 shadow-[3px_3px_0px_0px_#171717]"
          >
            <Upload className="w-4 h-4" />
            <span>Submit Custom Request</span>
          </button>
        </div>

      </div>

      <CustomOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
