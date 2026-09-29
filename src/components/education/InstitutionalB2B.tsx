import React from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Package,
  Layers,
  GraduationCap,
  FileText,
  PhoneCall,
  Users,
  Award,
} from 'lucide-react';

interface InstitutionalB2BProps {
  onConsultationClick: () => void;
}

export const InstitutionalB2B: React.FC<InstitutionalB2BProps> = ({ onConsultationClick }) => {
  const institutionalClients = [
    'Schools & High Schools',
    'Colleges & Polytechnic Institutes',
    'Universities & Medical Colleges',
    'Vocational Training Centers',
    'Scientific Research Labs',
    'Science Museums & Planetariums',
    'Robotics & STEM Clubs',
    'NGOs & Educational Foundations',
  ];

  const orderCapacities = [
    {
      title: 'Single Prototype or Custom Specimen',
      desc: 'High-detail one-off demonstration models for specialized lecture halls or thesis defense presentations.',
      badge: '1 Unit',
    },
    {
      title: 'Classroom Sets (10–50x Identical Models)',
      desc: 'Uniform, durable student manipulative sets allowing every lab bench or student pair to interact simultaneously.',
      badge: '10–50 Units',
    },
    {
      title: 'Small-Batch Serial Production',
      desc: 'Quarterly or annual curriculum kits fabricated and quality-checked with consistent batch tolerances.',
      badge: '50–500+ Units',
    },
    {
      title: 'Custom Branded Educational Kits',
      desc: 'Embossed with your university crest, school logo, or lab department identifier with custom modular storage crates.',
      badge: 'Bespoke Branding',
    },
  ];

  return (
    <section id="institutional-orders" className="w-full py-16 lg:py-24 bg-[#FFF9ED] border-b-3 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#171717] text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] mb-3">
              <Building2 className="w-3.5 h-3.5 text-[#059669]" />
              <span>INSTITUTIONAL B2B & ACADEMIC PARTNERSHIPS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#171717] tracking-tight">
              Institutional & Bulk Academic Orders
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#525252] max-w-2xl mt-2">
              Whether you need a single mechanical demonstrator for a lecture hall or 40 identical classroom sets for student physics labs, ARISTROCRAFT provides end-to-end institutional manufacturing.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] flex items-center gap-2 text-xs font-bold text-[#171717]">
            <FileText className="w-4 h-4 text-[#FF8A00]" />
            <span>Formal Invoices, Chalan & Purchase Orders Supported</span>
          </div>
        </div>

        {/* INSTITUTION TYPE PILLS */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#171717] mb-10">
          <span className="text-xs font-black font-heading uppercase text-[#737373] block mb-3.5 tracking-wider">
            TRUSTED PARTNER ACROSS BANGLADESH FOR:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {institutionalClients.map((client, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#FFF9ED] border-2 border-[#171717] text-xs font-bold text-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#059669] shrink-0" />
                <span>{client}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 CAPACITY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {orderCapacities.map((cap, i) => (
            <div
              key={i}
              className="bg-white border-3 border-[#171717] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FFC43C] border border-[#171717] text-[10px] font-black font-heading uppercase text-[#171717]">
                    {cap.badge}
                  </span>
                  <Package className="w-4 h-4 text-[#737373]" />
                </div>
                <h3 className="text-sm font-black font-heading text-[#171717] mb-2 leading-snug">
                  {cap.title}
                </h3>
                <p className="text-xs font-medium text-[#525252] leading-relaxed">
                  {cap.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#171717]/10 flex items-center gap-1.5 text-[10px] font-bold text-[#059669]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Standardized QA Inspection</span>
              </div>
            </div>
          ))}
        </div>

        {/* CONSULTATION BANNER */}
        <div className="bg-[#171717] border-3 border-[#171717] rounded-3xl p-8 sm:p-10 text-white shadow-[8px_8px_0px_0px_#FF8A00] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col max-w-xl">
            <span className="text-xs font-black font-heading uppercase text-[#FFC43C] tracking-widest mb-2">
              DISCUSS YOUR FACULTY LABS & STEM CURRICULUM
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight mb-3">
              Ready to Upgrade Your Classroom & Lab Models?
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[#D4D4D4] leading-relaxed">
              Schedule a direct consultation with our digital manufacturing engineering team. We will review your syllabus requirements, recommend cost-effective polymers, and generate a transparent formal institutional quotation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onConsultationClick}
              className="w-full sm:w-auto px-6 py-4 bg-[#FF8A00] hover:bg-[#FF9B26] text-white border-2 border-white rounded-xl font-black font-heading text-xs uppercase shadow-[3px_3px_0px_0px_#000000] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Talk About Your Educational Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
