import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  PackageCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  ArrowRight,
  Info,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { DELIVERY_CONFIG } from '../../config/delivery';
import { CustomOrderModal } from '../../components/shop/CustomOrderModal';
import { PageMeta } from '../../components/common/PageMeta';

export default function ShippingPage() {
  const { navigate } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dhakaZone = DELIVERY_CONFIG.zones.find((z) => z.id === 'dhaka') || DELIVERY_CONFIG.zones[0];
  const outsideDhakaZone = DELIVERY_CONFIG.zones.find((z) => z.id === 'outside-dhaka') || DELIVERY_CONFIG.zones[1];

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="Shipping & Delivery Policy — ARISTROCRAFT Bangladesh"
        description="Delivery rates and timelines for ARISTROCRAFT 3D print orders. Inside Dhaka ৳60 (1-2 days), Outside Dhaka ৳120 (2-4 days) via Pathao, Steadfast, and Paperfly."
      />

      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading tracking-widest uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717]">
            <Truck className="w-3.5 h-3.5" />
            <span>BANGLADESH FULFILLMENT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading uppercase tracking-tight text-[#171717]">
            Shipping & <span className="text-[#FF8A00]">Delivery Policy</span>
          </h1>

          <p className="text-xs sm:text-base font-semibold text-[#525252] max-w-xl mx-auto leading-relaxed">
            Fast, secure, and protective doorstep courier delivery across all 64 districts of Bangladesh.
          </p>
        </div>

        {/* DELIVERY ZONES & RATES */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717] space-y-6">
          <h2 className="text-2xl font-black font-heading uppercase text-[#171717] flex items-center gap-2 border-b-2 border-[#171717]/10 pb-4">
            <MapPin className="w-6 h-6 text-[#FF8A00]" />
            <span>Delivery Zones & Courier Rates</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* INSIDE DHAKA */}
            <div className="bg-[#FFF9ED] border-2.5 border-[#171717] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#171717] space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FFC43C] border border-[#171717] text-xs font-black font-heading uppercase text-[#171717]">
                  {dhakaZone.name}
                </span>
                <span className="text-2xl font-black font-mono text-[#171717]">
                  ৳{dhakaZone.fee}
                </span>
              </div>

              <div className="space-y-2 text-xs font-semibold text-[#525252]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF8A00] shrink-0" />
                  <span>Timeline: <strong className="text-[#171717]">{dhakaZone.estimatedDays}</strong></span>
                </div>
                <p>{dhakaZone.description}</p>
              </div>
            </div>

            {/* OUTSIDE DHAKA */}
            <div className="bg-[#FFF9ED] border-2.5 border-[#171717] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#171717] space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FF8A00] border border-[#171717] text-xs font-black font-heading uppercase text-white">
                  {outsideDhakaZone.name}
                </span>
                <span className="text-2xl font-black font-mono text-[#171717]">
                  ৳{outsideDhakaZone.fee}
                </span>
              </div>

              <div className="space-y-2 text-xs font-semibold text-[#525252]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF8A00] shrink-0" />
                  <span>Timeline: <strong className="text-[#171717]">{outsideDhakaZone.estimatedDays}</strong></span>
                </div>
                <p>{outsideDhakaZone.description}</p>
              </div>
            </div>

          </div>
        </div>

        {/* PRODUCTION & PRINT LEAD TIMES */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717] space-y-6">
          <h2 className="text-2xl font-black font-heading uppercase text-[#171717] flex items-center gap-2 border-b-2 border-[#171717]/10 pb-4">
            <Clock className="w-6 h-6 text-[#FF8A00]" />
            <span>Production Lead Times</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-[#525252]">
            <div className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#171717]">
              <span className="text-xs font-black font-heading uppercase text-[#FF8A00] block mb-1">
                CATALOG PRODUCTS
              </span>
              <h3 className="text-base font-black font-heading uppercase text-[#171717] mb-2">
                1-2 Days Print Prep
              </h3>
              <p className="leading-relaxed">
                Pre-calibrated G-code profiles allow us to stage and execute standard catalog items immediately in our Bambu Lab cluster.
              </p>
            </div>

            <div className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#171717]">
              <span className="text-xs font-black font-heading uppercase text-[#FF8A00] block mb-1">
                CUSTOM CAD & STL REQUESTS
              </span>
              <h3 className="text-base font-black font-heading uppercase text-[#171717] mb-2">
                2-4 Days Depending on Print Hours
              </h3>
              <p className="leading-relaxed">
                Custom models require slicer mesh inspection, support generation, and physical test checks prior to full dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* PACKAGING & TRACKING */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center font-black text-[#171717]">
              <PackageCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black font-heading uppercase text-[#171717]">
              Protective Packaging Standards
            </h3>
            <p className="text-xs font-semibold text-[#525252] leading-relaxed">
              Every print is wrapped in thick multi-layer air-bubble film and secured inside a heavy-duty corrugated box to safeguard thin edges and articulated joints.
            </p>
          </div>

          <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF8A00] border-2 border-[#171717] flex items-center justify-center font-black text-white">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black font-heading uppercase text-[#171717]">
              Live Courier Tracking
            </h3>
            <p className="text-xs font-semibold text-[#525252] leading-relaxed">
              Once handed over to Pathao or Steadfast, your Order Status updates on our tracking dashboard with courier tracking codes sent via SMS.
            </p>
          </div>

        </div>

        {/* TRACK ORDER CTA */}
        <div className="bg-[#FFC43C] border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717] text-center space-y-4">
          <h2 className="text-2xl font-black font-heading uppercase text-[#171717]">
            Want to Check an Existing Package?
          </h2>
          <p className="text-xs font-bold text-[#171717] max-w-lg mx-auto">
            Enter your Order Number and phone number on our secure order tracking page.
          </p>
          <button
            type="button"
            onClick={() => navigate('/track')}
            className="px-8 py-3.5 rounded-full bg-[#171717] hover:bg-[#FF8A00] text-white text-xs font-black font-heading uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2 shadow-[3px_3px_0px_0px_#171717]"
          >
            <span>Go to Order Tracking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      <CustomOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
