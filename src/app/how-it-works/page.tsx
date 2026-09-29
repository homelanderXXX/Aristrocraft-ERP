import React, { useState } from 'react';
import {
  PenTool,
  ShoppingBag,
  Sliders,
  CreditCard,
  Printer,
  PackageCheck,
  Truck,
  MapPin,
  Upload,
  FileSearch,
  Receipt,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { CustomOrderModal } from '../../components/shop/CustomOrderModal';
import { PageMeta } from '../../components/common/PageMeta';

export default function HowItWorksPage() {
  const { navigate } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CATALOG_STEPS = [
    { num: '01', title: 'Browse Catalog', desc: 'Explore curated desk setups, figures, keychains, & home decor.', icon: ShoppingBag },
    { num: '02', title: 'Choose & Customize', desc: 'Select your preferred size, material grade, and filament color.', icon: Sliders },
    { num: '03', title: 'Add Custom Note', desc: 'Add personalized name embossing or custom notes if desired.', icon: PenTool },
    { num: '04', title: 'Cart & Checkout', desc: 'Enter delivery address in Dhaka or anywhere in Bangladesh.', icon: CreditCard },
    { num: '05', title: 'Cash on Delivery', desc: 'Place order seamlessly with zero upfront card requirement.', icon: Receipt },
    { num: '06', title: 'Precision 3D Print', desc: 'Printed on Bambu Lab high-speed multi-color AMS cluster.', icon: Printer },
    { num: '07', title: 'Quality Check', desc: 'Inspected for layer adhesion, clean seams, & smooth finish.', icon: PackageCheck },
    { num: '08', title: 'Courier Dispatch', desc: 'Handed over to courier with protective bubble wrap packaging.', icon: Truck },
    { num: '09', title: 'Doorstep Delivery', desc: 'Delivered in 1-2 days (Dhaka) or 2-4 days (Nationwide).', icon: MapPin },
  ];

  const CUSTOM_STEPS = [
    { step: '01', title: 'Idea or CAD File', desc: 'Upload your .STL/.OBJ or share a sketch with dimensions.', icon: Upload },
    { step: '02', title: 'Slicer & Geometry Review', desc: 'We inspect model mesh, wall thickness, and print feasibility.', icon: FileSearch },
    { step: '03', title: 'Price Quote', desc: 'Receive transparent pricing based on print hours and weight.', icon: Receipt },
    { step: '04', title: 'Queue & Print', desc: 'Staged with high-strength PLA+, PETG, TPU, or resin.', icon: Printer },
    { step: '05', title: 'Post-Process & QA', desc: 'Support removal, deburring, and dimensional measurement.', icon: PackageCheck },
    { step: '06', title: 'Nationwide Delivery', desc: 'Shipped to your doorstep with live tracking via /track.', icon: Truck },
  ];

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="How It Works — ARISTROCRAFT 3D Printing Process"
        description="Discover how catalog orders and custom 3D print requests are processed, sliced, printed, quality inspected, and delivered in Bangladesh."
      />

      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading tracking-widest uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717]">
            <span>TRANSPARENT PROCESS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading uppercase tracking-tight text-[#171717]">
            How <span className="text-[#FF8A00]">ARISTROCRAFT</span> Works
          </h1>

          <p className="text-xs sm:text-base font-semibold text-[#525252] max-w-xl mx-auto leading-relaxed">
            From digital pixels on screen to tangible precision in your hands — explore our catalog fulfillment and custom printing workflows.
          </p>
        </div>

        {/* SECTION 1: CATALOG ORDER WORKFLOW */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_0px_#171717] space-y-8">
          <div className="border-b-2 border-[#171717]/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-black font-heading uppercase text-[#FF8A00] tracking-wider block">
                PATHWAY A
              </span>
              <h2 className="text-2xl font-black font-heading uppercase text-[#171717]">
                Catalog Order Journey (9 Steps)
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="px-5 py-2.5 rounded-full bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2 border-[#171717] text-xs font-black font-heading uppercase tracking-wider transition-all cursor-pointer shadow-[2px_2px_0px_0px_#171717] inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Explore Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATALOG_STEPS.map((step) => {
              const IconComp = step.icon;
              return (
                <div key={step.num} className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#171717] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-lg bg-[#171717] text-white font-mono font-black text-xs flex items-center justify-center">
                        {step.num}
                      </span>
                      <IconComp className="w-5 h-5 text-[#FF8A00]" />
                    </div>
                    <h3 className="text-sm font-black font-heading uppercase text-[#171717] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: CUSTOM PRINTING WORKFLOW */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_0px_#171717] space-y-8">
          <div className="border-b-2 border-[#171717]/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-black font-heading uppercase text-[#FF8A00] tracking-wider block">
                PATHWAY B
              </span>
              <h2 className="text-2xl font-black font-heading uppercase text-[#171717]">
                Custom 3D Printing Journey (6 Steps)
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#FF8A00] text-white text-xs font-black font-heading uppercase tracking-wider transition-all cursor-pointer shadow-[2px_2px_0px_0px_#171717] inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Request Custom Print</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CUSTOM_STEPS.map((cStep) => {
              const IconComponent = cStep.icon;
              return (
                <div key={cStep.step} className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-6 shadow-[3.5px_3.5px_0px_0px_#171717] relative">
                  <div className="w-10 h-10 rounded-xl bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center font-black text-[#171717] mb-4 shadow-[2px_2px_0px_0px_#171717]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black font-mono text-[#FF8A00] block mb-1">
                    STEP {cStep.step}
                  </span>
                  <h3 className="text-base font-black font-heading uppercase text-[#171717] mb-2">
                    {cStep.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                    {cStep.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="bg-[#FFC43C] border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717] text-center space-y-4">
          <h2 className="text-2xl font-black font-heading uppercase text-[#171717]">
            Have an Order in Progress?
          </h2>
          <p className="text-xs font-bold text-[#171717] max-w-lg mx-auto">
            Track your live order stage using your Order Number and phone number on our tracking dashboard.
          </p>
          <button
            type="button"
            onClick={() => navigate('/track')}
            className="px-8 py-3.5 rounded-full bg-[#171717] hover:bg-[#FF8A00] text-white text-xs font-black font-heading uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2 shadow-[3px_3px_0px_0px_#171717]"
          >
            <span>Track Order Status</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      <CustomOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
