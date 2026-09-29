import React from 'react';
import { RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { PageMeta } from '../../components/common/PageMeta';

export default function RefundPage() {
  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="Refund & Replacement Policy — ARISTROCRAFT Studio"
        description="48-hour replacement and transit damage policy for ARISTROCRAFT 3D print orders in Bangladesh."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading tracking-widest uppercase text-[#171717] mb-4 shadow-[2px_2px_0px_0px_#171717]">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>48-HOUR GUARANTEE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-heading uppercase text-[#171717]">
            Refund & Replacement Policy
          </h1>
          <p className="text-xs font-bold text-[#6D6D6D] mt-1 font-mono">
            Last Updated: August 2026 | ARISTROCRAFT Studio
          </p>
        </div>

        {/* CONTENT */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717] space-y-6 text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              1. 48-Hour Transit Damage Replacement
            </h2>
            <p>
              We inspect all 3D printed products before packing. If your parcel arrives damaged or broken during courier transit, notify our studio team on WhatsApp within 48 hours of delivery with photo or unboxing video evidence. We will reprint and dispatch a replacement parcel at no additional charge.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              2. Custom Bespoke Print Non-Refundability
            </h2>
            <p>
              Custom 3D prints produced from client-submitted STL/CAD files or customized name plaques are manufactured exclusively for the ordering customer. Once filament printing has commenced, custom orders cannot be cancelled or refunded unless structural printing defects are present.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              3. Order Cancellations
            </h2>
            <p>
              Standard catalog orders can be cancelled without penalty within 2 hours of placement before printer queue assignment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              4. How to Claim a Replacement
            </h2>
            <p>
              To claim a replacement, send your Order Number (found on your invoice or /track page) along with photos of the issue to support@aristrocrafts.com or via WhatsApp.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
