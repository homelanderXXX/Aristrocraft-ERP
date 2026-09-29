import React from 'react';
import { Upload, Sparkles, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

interface CustomEducationCTAProps {
  onStartProject: () => void;
  onUploadFile: () => void;
}

export const CustomEducationCTA: React.FC<CustomEducationCTAProps> = ({
  onStartProject,
  onUploadFile,
}) => {
  return (
    <section className="w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Editorial Card Spread */}
        <div className="bg-[#171717] text-white rounded-3xl border-2 border-[#171717] p-8 sm:p-12 md:p-16 shadow-[8px_8px_0px_0px_#171717] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8A00]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text & CTAs */}
          <div className="lg:col-span-7 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF8A00] text-[#171717] rounded-full text-xs font-mono font-black uppercase tracking-widest">
              BESPOKE SYLLABUS MANUFACTURING
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight uppercase leading-[1.05]">
              HAVE A LESSON THAT DOESN'T <br />
              <span className="text-[#FF8A00] underline decoration-4 decoration-white underline-offset-8">
                EXIST AS A MODEL YET?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
              Send us your idea, drawing, reference image, STL or CAD file. We'll help turn it into a physical learning tool tailored specifically to your syllabus.
            </p>

            <div className="space-y-2 pt-2 text-xs sm:text-sm font-mono text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF8A00] shrink-0" />
                <span>Accepts 2D sketches, photos, open-source Thingiverse/Printables links, or 3D STL/STEP files</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF8A00] shrink-0" />
                <span>Engineered with drop-safe materials & snap-together tolerances</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF8A00] shrink-0" />
                <span>Fast prototype delivery across Bangladesh within 24 to 48 hours</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onStartProject}
                className="px-7 py-4 bg-[#FF8A00] hover:bg-[#e07a00] text-white font-black font-heading text-sm uppercase tracking-wider rounded-xl border border-white/30 shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-[2px_2px_0px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-2"
              >
                <span>START AN EDUCATION PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onUploadFile}
                className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold font-mono text-xs uppercase tracking-wider rounded-xl border border-white/30 transition-all inline-flex items-center gap-2 backdrop-blur-sm"
              >
                <Upload className="w-4 h-4 text-[#FFC43C]" />
                <span>UPLOAD YOUR FILE (STL/CAD/SKETCH)</span>
              </button>
            </div>
          </div>

          {/* Right Showcase Image */}
          <div className="lg:col-span-5 relative z-10">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=85&w=1000"
                alt="Custom 3D printed educational mechanism prototype"
                className="w-full h-72 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono font-bold text-[#FF8A00] uppercase block">
                  BESPOKE ACADEMIC SPECIMEN
                </span>
                <p className="text-sm font-bold font-heading text-white">
                  University kinematics research fixture with custom press-fit tolerance
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
