import React from 'react';
import { Badge } from '../ui/Badge';
import { Sparkles, Palette, Type, Box, ShieldCheck, Sun, Layers } from 'lucide-react';

export const DesignTokenGuide: React.FC = () => {
  const colors = [
    { name: 'Background (Paper)', hex: '#FFFDF5', usage: 'Warm Cream Off-White', border: true },
    { name: 'Foreground (Slate)', hex: '#1E293B', usage: 'Chunky Borders & Shadows' },
    { name: 'Accent (Violet)', hex: '#8B5CF6', usage: 'Primary Brand & Candy Buttons' },
    { name: 'Secondary (Hot Pink)', hex: '#F472B6', usage: 'Playful Pop Accents' },
    { name: 'Tertiary (Yellow)', hex: '#FBBF24', usage: 'Optimism & Hover Fills' },
    { name: 'Quaternary (Mint)', hex: '#34D399', usage: 'Freshness & Badges' },
  ];

  return (
    <section id="tokens" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge color="accent" variant="sticker" rotation="left" className="mb-3">
          <Palette className="w-3.5 h-3.5 inline mr-1 stroke-[3px]" /> TOKEN SPECIFICATION
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#1E293B] tracking-tight">
          Design Token Architecture
        </h2>
        <p className="text-base sm:text-lg font-medium text-[#64748B] mt-3">
          Centralized design tokens ensuring visual rhythm, AAA accessibility, and long-term maintainability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Tokens Panel */}
        <div className="bg-white border-3 border-[#1E293B] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1E293B]">
          <h3 className="text-xl font-black font-heading text-[#1E293B] mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#8B5CF6] stroke-[2.5px]" /> Color Palette Tokens
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {colors.map((c, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl border-2 border-[#1E293B] bg-[#FFFDF5] shadow-[3px_3px_0px_0px_#1E293B] flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl border-2 border-[#1E293B] shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <div>
                  <div className="text-xs font-black font-heading text-[#1E293B]">{c.name}</div>
                  <div className="text-xs font-mono text-[#8B5CF6] font-bold">{c.hex}</div>
                  <div className="text-[11px] font-medium text-[#64748B]">{c.usage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography & Shadow Rules Panel */}
        <div className="bg-white border-3 border-[#1E293B] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1E293B]">
          <h3 className="text-xl font-black font-heading text-[#1E293B] mb-6 flex items-center gap-2">
            <Type className="w-5 h-5 text-[#F472B6] stroke-[2.5px]" /> Typography & Scale
          </h3>

          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B]">
              <div className="text-xs font-bold font-heading uppercase text-[#8B5CF6] mb-1">
                Headings: Outfit (700 / 800)
              </div>
              <p className="text-2xl font-black font-heading text-[#1E293B]">
                Geometric Sans with Rounded Terminals
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B]">
              <div className="text-xs font-bold font-heading uppercase text-[#F472B6] mb-1">
                Body: Plus Jakarta Sans (400 / 500 / 700)
              </div>
              <p className="text-sm font-medium text-[#1E293B] leading-relaxed">
                Highly legible, humanist-geometric body font designed for long-form readability and high UI contrast.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B]">
              <div className="text-xs font-bold font-heading uppercase text-[#34D399] mb-2">
                Hard Offset Shadow Physics
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_#1E293B] text-xs font-bold">
                  2px Sm
                </span>
                <span className="px-3 py-1 bg-white border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] text-xs font-bold">
                  4px Md
                </span>
                <span className="px-3 py-1 bg-white border-2 border-[#1E293B] shadow-[6px_6px_0px_0px_#1E293B] text-xs font-bold">
                  6px Lg
                </span>
                <span className="px-3 py-1 bg-white border-2 border-[#1E293B] shadow-[8px_8px_0px_0px_#1E293B] text-xs font-bold">
                  8px Xl
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
