import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Check, Star, Zap, Sparkles } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: 'Starter Sticker',
      price: isAnnual ? '$12' : '$15',
      period: '/month',
      description: 'Ideal for small apps, landing pages, and prototype UI.',
      features: [
        'Core Playful Design Tokens',
        '30+ Prebuilt UI Components',
        'Tailwind v4 & React Setup',
        'Standard Hard Shadows',
        'Community Discord Support',
      ],
      ctaText: 'Get Starter Kit',
      ctaVariant: 'secondary' as const,
      color: 'accent' as const,
      popular: false,
    },
    {
      name: 'Memphis Pro',
      price: isAnnual ? '$29' : '$36',
      period: '/month',
      description: 'Full design system suite with interactive component playground.',
      features: [
        'Everything in Starter',
        'Interactive Figma Design Files',
        'Custom Pop Animation Keyframes',
        'Unlimited Project Deployments',
        'Priority 1-on-1 Design Support',
        'Figma to Code Export Tools',
      ],
      ctaText: 'Claim Pro System',
      ctaVariant: 'candy' as const,
      color: 'secondary' as const,
      popular: true,
    },
    {
      name: 'Enterprise Pop',
      price: '$99',
      period: '/month',
      description: 'Dedicated team licenses, custom token themes, and SLA.',
      features: [
        'Full Source Code & Tokens',
        'Custom Brand Theme Generator',
        'Dedicated Slack Support Channel',
        'Custom Component Engineering',
        'Security & Accessibility Audit',
      ],
      ctaText: 'Contact Sales',
      ctaVariant: 'secondary' as const,
      color: 'quaternary' as const,
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge color="secondary" variant="sticker" rotation="left" className="mb-3">
          FAIR PRICING
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#1E293B] tracking-tight">
          Simple Plans, Maximum Pop
        </h2>
        <p className="text-base sm:text-lg font-medium text-[#64748B] mt-3">
          Pick the perfect tier to level up your product’s aesthetic.
        </p>

        {/* Annual / Monthly Toggle Pill */}
        <div className="mt-8 inline-flex items-center gap-3 p-1.5 bg-[#FFFDF5] border-2 border-[#1E293B] rounded-full shadow-[3px_3px_0px_0px_#1E293B]">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-5 py-2 text-sm font-extrabold font-heading rounded-full transition-all cursor-pointer ${
              !isAnnual ? 'bg-[#1E293B] text-white shadow-sm' : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-5 py-2 text-sm font-extrabold font-heading rounded-full transition-all flex items-center gap-2 cursor-pointer ${
              isAnnual ? 'bg-[#8B5CF6] text-white shadow-sm' : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            Annual
            <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded-full bg-[#FBBF24] text-[#1E293B] border border-[#1E293B]">
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
        {tiers.map((tier, idx) => {
          return (
            <div
              key={idx}
              className={`
                relative bg-white border-3 border-[#1E293B] rounded-3xl p-8 flex flex-col justify-between
                transition-all duration-300
                ${
                  tier.popular
                    ? 'shadow-[12px_12px_0px_0px_#1E293B] lg:-translate-y-4 lg:scale-105 border-4 z-20 bg-[#FFFDF5]'
                    : 'shadow-[8px_8px_0px_0px_#1E293B] hover:-translate-y-1'
                }
              `}
            >
              {/* Popular Badge for Middle Tier */}
              {tier.popular && (
                <div className="absolute -top-7 right-6 z-30">
                  <Badge color="tertiary" variant="pill" className="scale-110">
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black font-heading uppercase tracking-wider text-[#8B5CF6]">
                    {tier.name}
                  </span>
                  {tier.popular && (
                    <span className="px-3 py-1 text-xs font-black rounded-full bg-[#F472B6] text-white border border-[#1E293B]">
                      POPULAR
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black font-heading text-[#1E293B]">
                    {tier.price}
                  </span>
                  <span className="text-sm font-bold text-[#64748B]">{tier.period}</span>
                </div>

                <p className="text-sm font-medium text-[#64748B] mt-2 mb-6">
                  {tier.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-3 py-6 border-t-2 border-[#1E293B]">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm font-bold text-[#1E293B]">
                      <span className="w-5 h-5 rounded-full bg-[#34D399] border border-[#1E293B] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#1E293B] stroke-[3px]" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Button
                  variant={tier.ctaVariant}
                  colorTheme={tier.popular ? 'accent' : 'slate'}
                  fullWidth
                  size="md"
                  icon={Zap}
                >
                  {tier.ctaText}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
