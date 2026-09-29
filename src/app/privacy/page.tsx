import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { PageMeta } from '../../components/common/PageMeta';

export default function PrivacyPage() {
  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="Privacy Policy — ARISTROCRAFT 3D Printing Studio"
        description="Privacy policy details for ARISTROCRAFT Bangladesh regarding customer phone numbers, delivery addresses, uploaded CAD files, and order data security."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading tracking-widest uppercase text-[#171717] mb-4 shadow-[2px_2px_0px_0px_#171717]">
            <Lock className="w-3.5 h-3.5" />
            <span>DATA PROTECTION & PRIVACY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-heading uppercase text-[#171717]">
            Privacy Policy
          </h1>
          <p className="text-xs font-bold text-[#6D6D6D] mt-1 font-mono">
            Last Updated: August 2026 | ARISTROCRAFT Studio
          </p>
        </div>

        {/* POLICY CONTENT */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717] space-y-6 text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              1. Information We Collect
            </h2>
            <p>
              When you place an order or request a custom 3D print quote on ARISTROCRAFT, we collect necessary fulfillment information including your full name, mobile phone number, delivery address, and uploaded 3D CAD/reference files.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              2. How We Use Your Information
            </h2>
            <p>
              Your personal information is strictly used for order processing, 3D printing preparation, shipping label generation for courier partners (Pathao, Steadfast, Paperfly), order tracking verification on /track, and direct customer support.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              3. Protection of Custom 3D Models & Files
            </h2>
            <p>
              Intellectual property and proprietary CAD models submitted via our custom order system remain 100% owned by the submitting client. We never sell, share, redistribute, or catalog client-submitted CAD models for public commercial sale without explicit written consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              4. Data Sharing & Third Parties
            </h2>
            <p>
              We do not sell or lease customer contact lists to advertisers. We share delivery addresses and mobile numbers solely with authorized Bangladeshi logistics courier services to ensure successful doorstep package delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] border-b-2 border-[#171717]/10 pb-2">
              5. Contacting Our Studio
            </h2>
            <p>
              For privacy inquiries, file deletion requests, or order data assistance, please reach out to our studio team in Dhaka via support@aristrocrafts.com or our official WhatsApp helpline.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
