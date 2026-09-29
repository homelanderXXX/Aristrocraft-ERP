import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';
import { PageMeta } from '../../components/common/PageMeta';

export default function TermsPage() {
  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="Terms of Service — ARISTROCRAFT Studio"
        description="Terms of service and customer conditions for purchasing 3D prints, custom CAD submissions, Cash on Delivery terms, and intellectual property."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading tracking-widest uppercase text-[#171717] mb-4 shadow-[2px_2px_0px_0px_#171717]">
            <FileText className="w-3.5 h-3.5" />
            <span>TERMS & CONDITIONS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-heading uppercase text-[#171717]">
            Terms of Service
          </h1>
          <p className="text-xs font-bold text-[#6D6D6D] mt-1 font-mono">
            Last Updated: August 2026 | ARISTROCRAFT Studio
          </p>
        </div>

        {/* CONTENT */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717] space-y-6 text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the ARISTROCRAFT website, purchasing catalog products, or submitting custom 3D files for printing, you agree to comply with these Terms of Service and applicable laws of Bangladesh.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              2. Additive Manufacturing Nature
            </h2>
            <p>
              All products are produced using FDM (Fused Deposition Modeling) or SLA (Stereolithography) 3D printing technology. Minor surface layer texture lines or support point touch marks are an inherent characteristic of additive manufacturing and do not constitute product defects.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              3. Cash on Delivery (COD) Commitments
            </h2>
            <p>
              When selecting Cash on Delivery at checkout, you commit to accepting delivery and paying the courier rider the total order amount (including applicable delivery fees). Frivolous order placement without intent to receive packages harms studio resources and logistics operations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              4. Prohibited Custom Submissions
            </h2>
            <p>
              ARISTROCRAFT strictly refuses custom print requests involving illegal items, functional firearm components, dangerous weapons, or hate speech symbols prohibited under Bangladeshi law.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              5. Governing Law
            </h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the People's Republic of Bangladesh.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
