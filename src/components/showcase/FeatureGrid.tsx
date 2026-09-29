import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Sparkles, Palette, Zap, Box, Compass, Layers } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      title: 'Stable Grid System',
      subtitle: 'Structured 12-Column Layout',
      description:
        'Clean, readable typography and strict spacing rules keep your text accessible and structured while decorative elements dance around it.',
      icon: Box,
      iconBg: 'accent' as const,
      headerBg: 'accent' as const,
      badgeText: '01 / LAYOUT',
      badgeBg: 'tertiary' as const,
      shadowColor: 'accent' as const,
    },
    {
      title: 'Wild Pop Decoration',
      subtitle: 'Memphis-Inspired Shapes',
      description:
        'Circles, triangles, polka dots, squiggles, and confetti fills breathe life and personality into every screen without overwhelming usability.',
      icon: Palette,
      iconBg: 'secondary' as const,
      headerBg: 'secondary' as const,
      badgeText: '02 / VIBE',
      badgeBg: 'quaternary' as const,
      shadowColor: 'secondary' as const,
    },
    {
      title: 'Tactile Candy Motion',
      subtitle: 'Elastic Spring Feedback',
      description:
        'Buttons and cards feature solid 2px–8px offset hard drop shadows with bouncy click states and smooth hover rotations.',
      icon: Zap,
      iconBg: 'tertiary' as const,
      headerBg: 'tertiary' as const,
      badgeText: '03 / MOTION',
      badgeBg: 'accent' as const,
      shadowColor: 'tertiary' as const,
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <Badge color="tertiary" variant="sticker" rotation="right" className="mb-3">
          <Compass className="w-3.5 h-3.5 inline mr-1 stroke-[3px]" /> CORE PRINCIPLES
        </Badge>

        <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#1E293B] tracking-tight">
          Designed for Joy & Interaction
        </h2>
        <p className="text-base sm:text-lg font-medium text-[#64748B] mt-3">
          A design token engine that balances high usability with expressive visual pop.
        </p>
      </div>

      {/* Dashed Connecting SVG Line in Background (Desktop) */}
      <div className="absolute top-1/2 left-8 right-8 hidden lg:block -z-10 pointer-events-none">
        <svg width="100%" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0"
            y1="10"
            x2="100%"
            y2="10"
            stroke="#1E293B"
            strokeWidth="3"
            strokeDasharray="12 12"
          />
        </svg>
      </div>

      {/* Grid of 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Card
              key={idx}
              title={feature.title}
              subtitle={feature.subtitle}
              icon={Icon}
              iconBgColor={feature.iconBg}
              headerBgColor={feature.headerBg}
              shadowColor={feature.shadowColor}
              badgeText={feature.badgeText}
              badgeBgColor={feature.badgeBg}
              wiggleOnHover={true}
              footer={
                <div className="flex items-center justify-between text-xs font-bold text-[#1E293B]">
                  <span className="flex items-center gap-1.5">
                    Hard Offset Shadow
                  </span>
                  <span className="underline decoration-2 cursor-pointer hover:text-[#8B5CF6]">
                    Details →
                  </span>
                </div>
              }
            >
              <p className="text-sm font-medium text-[#64748B] leading-relaxed">
                {feature.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
