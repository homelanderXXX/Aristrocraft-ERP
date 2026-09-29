import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input, Checkbox } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { PopColor, ButtonVariant } from '../../types';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Play,
  Heart,
  Zap,
  Star,
  MessageCircle,
  Eye,
} from 'lucide-react';

export const InteractivePlayground: React.FC = () => {
  const [componentType, setComponentType] = useState<'button' | 'card' | 'input' | 'badge'>('button');
  const [colorTheme, setColorTheme] = useState<PopColor>('accent');
  const [buttonVariant, setButtonVariant] = useState<ButtonVariant>('candy');
  const [buttonText, setButtonText] = useState('Click The Candy!');
  const [cardTitle, setCardTitle] = useState('Sticker Card Title');
  const [cardSubtitle, setCardSubtitle] = useState('Memphis pop style card subtitle.');
  const [badgeText, setBadgeText] = useState('NEW STICKER');
  const [badgeVariant, setBadgeVariant] = useState<'pill' | 'star' | 'sticker'>('sticker');
  const [inputLabel, setInputLabel] = useState('User Email');
  const [inputPlaceholder, setInputPlaceholder] = useState('hello@playful.design');
  const [showModal, setShowModal] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [copied, setCopied] = useState(false);

  // Generate React JSX code snippet based on selections
  const getCodeSnippet = () => {
    if (componentType === 'button') {
      return `<Button\n  variant="${buttonVariant}"\n  colorTheme="${colorTheme}"\n  size="md"\n>\n  ${buttonText}\n</Button>`;
    }
    if (componentType === 'card') {
      return `<Card\n  title="${cardTitle}"\n  subtitle="${cardSubtitle}"\n  icon={Sparkles}\n  iconBgColor="${colorTheme}"\n  shadowColor="${colorTheme}"\n  badgeText="POP!"\n>\n  <p className="text-sm font-medium">Card content goes here.</p>\n</Card>`;
    }
    if (componentType === 'input') {
      return `<Input\n  label="${inputLabel}"\n  placeholder="${inputPlaceholder}"\n  focusColor="${colorTheme}"\n/>`;
    }
    return `<Badge\n  color="${colorTheme}"\n  variant="${badgeVariant}"\n>\n  ${badgeText}\n</Badge>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge color="tertiary" variant="sticker" rotation="right" className="mb-3">
          <Sliders className="w-3.5 h-3.5 inline mr-1 stroke-[3px]" /> LIVE STUDIO
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#1E293B] tracking-tight">
          Interactive Design Playground
        </h2>
        <p className="text-base sm:text-lg font-medium text-[#64748B] mt-3">
          Customize tokens, test live interactions, and copy clean React + Tailwind code.
        </p>
      </div>

      {/* Main Studio Workbench Container */}
      <div className="bg-white border-4 border-[#1E293B] rounded-3xl shadow-[12px_12px_0px_0px_#1E293B] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Control Panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 border-b-4 lg:border-b-0 lg:border-r-4 border-[#1E293B] bg-[#FFFDF5]">
          <h3 className="text-xl font-black font-heading text-[#1E293B] mb-6 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#8B5CF6] stroke-[2.5px]" />
            Component Settings
          </h3>

          {/* Component Selector Tabs */}
          <div className="mb-6">
            <label className="text-xs font-bold font-heading uppercase text-[#1E293B] block mb-2">
              Select Component
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'button', label: 'Button' },
                { id: 'card', label: 'Card' },
                { id: 'input', label: 'Input' },
                { id: 'badge', label: 'Badge' },
              ].map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => setComponentType(comp.id as any)}
                  className={`
                    px-3 py-2 text-xs font-black font-heading rounded-xl border-2 border-[#1E293B]
                    transition-all cursor-pointer ${
                      componentType === comp.id
                        ? 'bg-[#8B5CF6] text-white shadow-[2px_2px_0px_0px_#1E293B]'
                        : 'bg-white text-[#1E293B] hover:bg-[#F1F5F9]'
                    }
                  `}
                >
                  {comp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Theme Swatches */}
          <div className="mb-6">
            <label className="text-xs font-bold font-heading uppercase text-[#1E293B] block mb-2">
              Color Theme Token
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'accent', bg: 'bg-[#8B5CF6]', name: 'Violet' },
                { id: 'secondary', bg: 'bg-[#F472B6]', name: 'Pink' },
                { id: 'tertiary', bg: 'bg-[#FBBF24]', name: 'Yellow' },
                { id: 'quaternary', bg: 'bg-[#34D399]', name: 'Mint' },
                { id: 'slate', bg: 'bg-[#1E293B]', name: 'Slate' },
              ].map((color) => (
                <button
                  key={color.id}
                  onClick={() => setColorTheme(color.id as PopColor)}
                  className={`
                    w-10 h-10 rounded-full border-2 border-[#1E293B] ${color.bg}
                    flex items-center justify-center cursor-pointer transition-transform
                    ${colorTheme === color.id ? 'scale-110 shadow-[3px_3px_0px_0px_#1E293B] ring-2 ring-offset-2 ring-[#1E293B]' : 'hover:scale-105'}
                  `}
                  title={color.name}
                >
                  {colorTheme === color.id && (
                    <Check
                      className={`w-4 h-4 stroke-[3px] ${
                        color.id === 'tertiary' || color.id === 'quaternary'
                          ? 'text-[#1E293B]'
                          : 'text-white'
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Component Specific Controls */}
          {componentType === 'button' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold font-heading uppercase text-[#1E293B] block mb-2">
                  Button Variant
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['candy', 'secondary', 'sticker', 'outline'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setButtonVariant(v as ButtonVariant)}
                      className={`px-3 py-1.5 text-xs font-bold capitalize rounded-lg border-2 border-[#1E293B] cursor-pointer ${
                        buttonVariant === v
                          ? 'bg-[#1E293B] text-white'
                          : 'bg-white text-[#1E293B] hover:bg-[#F1F5F9]'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Button Label"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
          )}

          {componentType === 'card' && (
            <div className="space-y-4">
              <Input
                label="Card Title"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
              />
              <Input
                label="Card Subtitle"
                value={cardSubtitle}
                onChange={(e) => setCardSubtitle(e.target.value)}
              />
            </div>
          )}

          {componentType === 'input' && (
            <div className="space-y-4">
              <Input
                label="Input Label"
                value={inputLabel}
                onChange={(e) => setInputLabel(e.target.value)}
              />
              <Input
                label="Placeholder"
                value={inputPlaceholder}
                onChange={(e) => setInputPlaceholder(e.target.value)}
              />
            </div>
          )}

          {componentType === 'badge' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold font-heading uppercase text-[#1E293B] block mb-2">
                  Badge Shape Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['sticker', 'star', 'pill'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setBadgeVariant(v as any)}
                      className={`px-3 py-1.5 text-xs font-bold capitalize rounded-lg border-2 border-[#1E293B] cursor-pointer ${
                        badgeVariant === v
                          ? 'bg-[#1E293B] text-white'
                          : 'bg-white text-[#1E293B] hover:bg-[#F1F5F9]'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <Input
                label="Badge Text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
              />
            </div>
          )}

          {/* Modal Tester Trigger */}
          <div className="mt-8 pt-6 border-t-2 border-[#1E293B]">
            <Button
              variant="candy"
              colorTheme="secondary"
              size="sm"
              fullWidth
              onClick={() => setShowModal(true)}
              icon={Eye}
            >
              Test Pop Modal Dialog
            </Button>
          </div>
        </div>

        {/* Right Live Stage & Code Output */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-dot-grid-subtle bg-[#FFFDF5]/40">
          {/* Live Component Render Stage */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black font-heading text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-[#8B5CF6] fill-[#8B5CF6]" /> Live Interactive Stage
              </span>
              <span className="text-xs font-bold text-[#34D399] bg-[#34D399]/20 px-2.5 py-1 rounded-full border border-[#34D399]">
                Interactive Hover / Click Active
              </span>
            </div>

            {/* Stage Container */}
            <div className="min-h-[260px] bg-white border-3 border-[#1E293B] rounded-2xl p-8 shadow-[6px_6px_0px_0px_#1E293B] flex items-center justify-center relative overflow-hidden">
              {componentType === 'button' && (
                <Button variant={buttonVariant} colorTheme={colorTheme} size="lg" icon={Sparkles}>
                  {buttonText}
                </Button>
              )}

              {componentType === 'card' && (
                <Card
                  title={cardTitle}
                  subtitle={cardSubtitle}
                  icon={Sparkles}
                  iconBgColor={colorTheme}
                  shadowColor={colorTheme}
                  badgeText="POP!"
                  className="max-w-xs"
                >
                  <p className="text-sm font-medium text-[#64748B]">
                    This card demonstrates the hard offset shadow and subtle wiggle hover animation!
                  </p>
                  <div className="mt-4 pt-3 border-t-2 border-[#1E293B]">
                    <Checkbox
                      label="Enable Pop Effects"
                      color={colorTheme}
                      checked={checkboxChecked}
                      onChange={(e) => setCheckboxChecked(e.target.checked)}
                    />
                  </div>
                </Card>
              )}

              {componentType === 'input' && (
                <div className="w-full max-w-sm">
                  <Input
                    label={inputLabel}
                    placeholder={inputPlaceholder}
                    focusColor={colorTheme}
                    icon={Sparkles}
                    helperText="Try clicking to see the hard shadow focus effect!"
                  />
                </div>
              )}

              {componentType === 'badge' && (
                <div className="flex items-center gap-4 flex-wrap justify-center">
                  <Badge color={colorTheme} variant={badgeVariant}>
                    {badgeText}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Generated Code Snippet Block */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold font-heading uppercase text-[#1E293B]">
                React + Tailwind Code
              </span>
              <button
                onClick={handleCopy}
                className="
                  inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black
                  bg-[#1E293B] text-white border border-[#1E293B] hover:bg-[#8B5CF6]
                  transition-colors cursor-pointer
                "
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3px]" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Code
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 bg-[#1E293B] text-[#F1F5F9] rounded-xl font-mono text-xs overflow-x-auto border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B]">
              <code>{getCodeSnippet()}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Modal Studio Component */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Playful Pop Modal"
        subtitle="Tactile sticker-style dialog box with hard shadows."
      >
        <p className="text-sm font-medium text-[#64748B] leading-relaxed">
          Modals in the Playful Geometric system use chunky 4px borders, hard offset drop shadows, and off-white backgrounds to stay fun and memorable.
        </p>
        <div className="mt-4 p-4 rounded-2xl bg-[#F1F5F9] border-2 border-[#1E293B]">
          <Checkbox label="I love hard shadows and bright pop colors!" color="accent" defaultChecked />
        </div>
      </Modal>
    </section>
  );
};
