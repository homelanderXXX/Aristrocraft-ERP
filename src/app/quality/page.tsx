import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Printer,
  PackageCheck,
  Search,
  Box,
  Layers,
  Award,
  ArrowRight,
  Upload,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { CustomOrderModal } from '../../components/shop/CustomOrderModal';
import { PageMeta } from '../../components/common/PageMeta';

export default function QualityPage() {
  const { navigate } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PROCESS_STEPS = [
    {
      num: '01',
      title: 'Model Geometry Repair',
      desc: 'We inspect imported STL files for non-manifold edges, inverted normals, or self-intersecting meshes using professional CAD slicer inspection tools.',
    },
    {
      num: '02',
      title: 'Precision Slicing & Support Tuning',
      desc: 'Slicing parameters (perimeters, top/bottom layers, infill pattern, tree support placement) are customized per product geometry for maximum structural integrity.',
    },
    {
      num: '03',
      title: 'Calibrated Bambu Lab Printer Cluster',
      desc: 'Prints execute on auto-calibrated Bambu Lab AMS high-speed 3D printers featuring active bed leveling, vibration compensation, and input shaping.',
    },
    {
      num: '04',
      title: 'Real-Time First Layer & Print Monitoring',
      desc: 'First layer squish and bead consistency are verified manually to guarantee 100% bed adhesion before proceeding with high-speed printing.',
    },
    {
      num: '05',
      title: 'Post-Processing & Clean Support Removal',
      desc: 'Tree supports are removed carefully using micro-cutters and deburring tools to leave minimal interface contact marks on cosmetic surfaces.',
    },
    {
      num: '06',
      title: 'Dimensional & Surface Inspection',
      desc: 'Parts undergo caliper measurements for fit-critical dimensions (like keychains, wall brackets, or snap-fit lids) before final sign-off.',
    },
    {
      num: '07',
      title: 'Rigid Eco Protective Packaging',
      desc: 'Items are wrapped in multi-layer protective bubble wrap and sealed inside custom rigid box packaging to withstand courier handling across Bangladesh.',
    },
    {
      num: '08',
      title: 'Dispatch & Live Tracking',
      desc: 'Orders are dispatched via trusted courier partners with SMS notifications and live tracking enabled on /track.',
    },
  ];

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="Quality Assurance & Print Standards — ARISTROCRAFT"
        description="Learn about ARISTROCRAFT's 8-step quality inspection, precision slicer calibration, Bambu Lab AMS cluster standards, and protective packaging."
      />

      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading tracking-widest uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>UNCOMPROMISING STANDARDS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading uppercase tracking-tight text-[#171717]">
            Quality <span className="text-[#FF8A00]">Assurance & Standards</span>
          </h1>

          <p className="text-xs sm:text-base font-semibold text-[#525252] max-w-2xl mx-auto leading-relaxed">
            Every 3D print that leaves our Dhaka studio undergoes a rigorous 8-step quality protocol — from digital slicing inspection to final doorstep dispatch.
          </p>
        </div>

        {/* QUALITY PROTOCOL STEPS */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_0px_#171717] space-y-8">
          <div className="border-b-2 border-[#171717]/10 pb-4">
            <span className="text-xs font-black font-heading uppercase text-[#FF8A00] tracking-wider block">
              OUR 8-STEP WORKFLOW
            </span>
            <h2 className="text-2xl font-black font-heading uppercase text-[#171717]">
              The ARISTROCRAFT Print Quality Protocol
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-6 shadow-[3.5px_3.5px_0px_0px_#171717] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-[#FFC43C] border-2 border-[#171717] text-[#171717] font-mono font-black text-xs flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#171717]">
                    {step.num}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                </div>
                <h3 className="text-base font-black font-heading uppercase text-[#171717]">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* GUARANTEE & REPLACEMENT POLICY */}
        <div className="bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#10B981] text-white text-[10px] font-black uppercase tracking-wider">
              CUSTOMER PROTECTION
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-heading uppercase text-[#171717]">
              48-Hour Replacement Guarantee
            </h3>
            <p className="text-xs font-semibold text-[#525252] leading-relaxed">
              If your order arrives damaged during courier transit, exhibits structural delamination, or fails to meet specifications, simply inform us on WhatsApp within 48 hours of delivery. We will reprint and re-dispatch your replacement free of charge.
            </p>
          </div>

          <div className="md:col-span-4 text-right shrink-0">
            <button
              type="button"
              onClick={() => navigate('/shipping')}
              className="px-6 py-3 rounded-full bg-[#171717] hover:bg-[#FF8A00] text-white text-xs font-black font-heading uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2 shadow-[3px_3px_0px_0px_#171717]"
            >
              <span>View Shipping Policy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      <CustomOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
