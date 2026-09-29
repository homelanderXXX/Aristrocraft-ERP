import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ShoppingBag,
  Printer,
  Layers,
  Truck,
  CreditCard,
  RotateCcw,
  Upload,
  Box,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { CustomOrderModal } from '../../components/shop/CustomOrderModal';
import { PageMeta } from '../../components/common/PageMeta';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  items: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    id: 'orders',
    title: 'Orders & Tracking',
    icon: ShoppingBag,
    items: [
      {
        q: 'How do I track my order status?',
        a: 'You can track live 3D print queue progress anytime on our /track page by entering your Order Number (e.g., AC-260821-4891) and the phone number provided at checkout.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'Orders can be modified or cancelled within 2 hours of placement before filament slicing and printer queue staging begin. Contact us on WhatsApp immediately if you need changes.',
      },
      {
        q: 'Do I need an account to place an order?',
        a: 'No account registration is required! You can complete checkout seamlessly in seconds using Cash on Delivery.',
      },
    ],
  },
  {
    id: 'products',
    title: 'Products & Print Quality',
    icon: Box,
    items: [
      {
        q: 'What is the infill density and durability of catalog items?',
        a: 'Our catalog products use optimized infill (15%-30% Gyroid or Grid infill with 3-4 outer wall perimeters) ensuring rigid structural durability without unnecessary weight.',
      },
      {
        q: 'Are visible layer lines normal in 3D printing?',
        a: 'Yes, additive FDM 3D printing builds objects layer by layer. We tune our Bambu Lab printers to fine 0.12mm - 0.20mm layer heights for a crisp, high-end tactile finish.',
      },
      {
        q: 'How should I clean and maintain my 3D printed items?',
        a: 'Clean items with a soft damp cloth or mild soap water. Avoid exposing PLA items to extreme temperatures above 55°C (such as direct hot car dashboards).',
      },
    ],
  },
  {
    id: 'custom',
    title: 'Custom Printing',
    icon: Printer,
    items: [
      {
        q: 'What file formats do you accept for custom printing?',
        a: 'We accept .STL, .OBJ, .3MF, .STEP, and .PLY 3D CAD files up to 50MB. If you do not have a 3D model, you can upload sketches or photo references.',
      },
      {
        q: 'How fast will I receive a price quote for my custom model?',
        a: 'Our studio engineers review custom submissions and send transparent price quotes via phone/WhatsApp within 2 hours.',
      },
      {
        q: 'Can you help design a 3D model from scratch?',
        a: 'Yes! We offer custom CAD modeling services for mechanical parts, corporate gifts, and personalized desk plaques.',
      },
    ],
  },
  {
    id: 'materials',
    title: 'Materials & Filaments',
    icon: Layers,
    items: [
      {
        q: 'What is the difference between Tough PLA+ and PETG?',
        a: 'Tough PLA+ offers superior surface finish and high rigidity for desk items. High-Temp PETG is impact-resistant, chemical-resistant, and handles higher temperatures up to 75°C.',
      },
      {
        q: 'Do you offer flexible rubber-like printing?',
        a: 'Yes! We stock Flexible TPU 95A for shock-absorbing phone bumpers, anti-vibration feet, and flexible gaskets.',
      },
      {
        q: 'Are your filaments safe and non-toxic?',
        a: 'Yes, our PLA+ filaments are derived from renewable cornstarch and are non-toxic and odorless.',
      },
    ],
  },
  {
    id: 'delivery',
    title: 'Shipping & Delivery',
    icon: Truck,
    items: [
      {
        q: 'What are your delivery fees and timelines in Bangladesh?',
        a: 'Inside Dhaka City: ৳60 delivery fee (1-2 business days). Outside Dhaka / Nationwide: ৳120 delivery fee (2-4 business days).',
      },
      {
        q: 'Which courier services do you use?',
        a: 'We partner with Pathao Courier, Steadfast Courier, and Paperfly for reliable doorstep delivery across all 64 districts of Bangladesh.',
      },
    ],
  },
  {
    id: 'payment',
    title: 'Payment Methods',
    icon: CreditCard,
    items: [
      {
        q: 'What payment methods are currently accepted?',
        a: 'We currently accept Cash on Delivery (COD) nationwide across Bangladesh. Online digital payment gateways (bKash / Nagad / Cards) are planned for future studio phases.',
      },
      {
        q: 'Is an advance payment required for custom orders?',
        a: 'For small standard catalog orders, no advance is required. For oversized multi-part custom CAD prints exceeding ৳2,500, a small partial advance may be requested.',
      },
    ],
  },
  {
    id: 'returns',
    title: 'Returns & Replacements',
    icon: RotateCcw,
    items: [
      {
        q: 'What is your replacement policy if an item arrives broken?',
        a: 'If your package suffers courier damage or exhibits print defect, report it to us within 48 hours of delivery with a photo. We will reprint and send a replacement free of charge.',
      },
    ],
  },
];

export default function FAQPage() {
  const { navigate } = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('orders');
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentCategoryData = FAQ_DATA.find((c) => c.id === activeCategory) || FAQ_DATA[0];

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="Frequently Asked Questions (FAQ) — ARISTROCRAFT"
        description="Find answers to common questions about 3D printing orders, file uploads, PLA+ vs PETG materials, Cash on Delivery in Bangladesh, and shipping estimates."
      />

      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading tracking-widest uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>STUDIO HELP CENTER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading uppercase tracking-tight text-[#171717]">
            Frequently Asked <span className="text-[#FF8A00]">Questions</span>
          </h1>

          <p className="text-xs sm:text-base font-semibold text-[#525252] max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our catalog orders, custom 3D file submissions, materials, delivery, and guarantees.
          </p>
        </div>

        {/* CATEGORY SELECTOR TABS */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {FAQ_DATA.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenQuestionIndex(0);
                }}
                className={`
                  px-4 py-2.5 rounded-2xl font-black font-heading text-xs uppercase tracking-wider transition-all cursor-pointer border-2 border-[#171717] flex items-center gap-2
                  ${
                    isActive
                      ? 'bg-[#171717] text-white shadow-[3px_3px_0px_0px_#FFC43C]'
                      : 'bg-white text-[#171717] hover:bg-[#FFF9ED] shadow-[2px_2px_0px_0px_#171717]'
                  }
                `}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#FFC43C]' : 'text-[#FF8A00]'}`} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* ACCORDION CONTAINER */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717] space-y-4">
          <h2 className="text-xl font-black font-heading uppercase text-[#171717] mb-6 flex items-center gap-2 border-b-2 border-[#171717]/10 pb-4">
            <currentCategoryData.icon className="w-5 h-5 text-[#FF8A00]" />
            <span>{currentCategoryData.title} FAQs</span>
          </h2>

          <div className="space-y-3">
            {currentCategoryData.items.map((item, idx) => {
              const isOpen = openQuestionIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl overflow-hidden shadow-[2.5px_2.5px_0px_0px_#171717] transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenQuestionIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-black font-heading text-xs sm:text-sm uppercase text-[#171717] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FFC43C]/20 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#FF8A00] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs font-semibold text-[#525252] leading-relaxed border-t border-[#171717]/10">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* STILL HAVE QUESTIONS BANNER */}
        <div className="bg-[#FFC43C] border-3 border-[#171717] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black font-heading uppercase text-[#171717]">
              Still Have Questions?
            </h3>
            <p className="text-xs font-bold text-[#171717] mt-1">
              Contact our studio team or submit a custom order inquiry for personalized assistance.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 rounded-full bg-[#171717] hover:bg-[#FF8A00] text-white text-xs font-black font-heading uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2 shadow-[3px_3px_0px_0px_#171717] shrink-0"
          >
            <Upload className="w-4 h-4" />
            <span>Contact Studio</span>
          </button>
        </div>

      </div>

      <CustomOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
