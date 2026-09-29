import React, { useEffect } from 'react';
import { X, ArrowRight, Layers, Cpu, CheckCircle2 } from 'lucide-react';
import { GalleryItem } from '../../data/communityData';

interface CommunityLightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onMakeSimilar: (item: GalleryItem) => void;
}

export const CommunityLightboxModal: React.FC<CommunityLightboxModalProps> = ({
  item,
  onClose,
  onMakeSimilar,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_#171717] my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#FFF9ED] border-b-2 border-[#171717] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              {item.category}
            </span>
            <span className="text-xs font-mono text-[#171717]/70 font-semibold hidden sm:inline">
              ARISTROCRAFT DIGITAL FABRICATION
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-white border-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FF8A00] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#171717]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Main Visual Photo */}
          <div className="relative aspect-[16/10] w-full rounded-2xl border-3 border-[#171717] overflow-hidden bg-[#171717] shadow-[6px_6px_0px_0px_#171717]">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-3 left-3 bg-[#171717]/90 text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase backdrop-blur-sm border border-white/20">
              MATERIAL: {item.material}
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <div className="text-xs font-mono font-bold uppercase text-[#FF8A00] tracking-wider mb-1">
              {item.caption}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading uppercase text-[#171717] tracking-tight">
              {item.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#171717]/85 font-medium leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Technical Specs if available */}
          {item.specs && (
            <div className="p-5 bg-white border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717]">
              <div className="text-xs font-mono font-bold uppercase text-[#171717] mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#FF8A00]" />
                <span>FABRICATION SPECIFICATIONS</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-[10px] font-mono text-[#171717]/60 uppercase">TECHNOLOGY</div>
                  <div className="text-xs font-bold text-[#171717] mt-0.5">{item.specs.technology || 'Industrial Additive'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#171717]/60 uppercase">TOLERANCE</div>
                  <div className="text-xs font-bold text-[#171717] mt-0.5">{item.specs.tolerance || '±0.1 mm'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#171717]/60 uppercase">LAYER HEIGHT</div>
                  <div className="text-xs font-bold text-[#171717] mt-0.5">{item.specs.layerHeight || '0.12 mm'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#171717]/60 uppercase">FINISH</div>
                  <div className="text-xs font-bold text-[#171717] mt-0.5">{item.specs.finish || 'Standard Clean'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action CTA */}
          <div className="p-5 bg-[#171717] text-white rounded-2xl border-2 border-[#171717] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-[#FF8A00] uppercase">
                WANT TO MANUFACTURE SOMETHING SIMILAR?
              </div>
              <div className="text-xs sm:text-sm text-white/80 mt-0.5">
                Send your sketch or 3D model for instant manufacturing advice.
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onMakeSimilar(item);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#FF8A00] hover:bg-[#e07a00] text-white font-black font-heading text-xs uppercase tracking-wider rounded-xl border-2 border-white shadow-[2px_2px_0px_0px_#fff] hover:translate-x-[1px] hover:translate-y-[1px] transition-all inline-flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>MAKE SOMETHING SIMILAR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
