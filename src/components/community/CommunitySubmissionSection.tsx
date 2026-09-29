import React, { useState } from 'react';
import { Upload, CheckCircle2, Image as ImageIcon, Send, ArrowRight } from 'lucide-react';
import { CommunityFilterCategory } from '../../data/communityData';

interface CommunitySubmissionSectionProps {
  onSuccess?: () => void;
}

export const CommunitySubmissionSection: React.FC<CommunitySubmissionSectionProps> = ({
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [category, setCategory] = useState<CommunityFilterCategory>('ENGINEERING');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle || !name) return;
    setIsSubmitted(true);
    if (onSuccess) onSuccess();
  };

  return (
    <section id="share-creation" className="relative w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[2px_2px_0px_0px_#FF8A00]">
            <span>COMMUNITY SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading text-[#171717] uppercase tracking-tight leading-[0.98]">
            MADE SOMETHING <br />
            <span className="text-[#FF8A00]">WITH ARISTROCRAFT?</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#171717]/80 font-medium">
            Show us what you created. Share a photo of your printed part, prototype, or finished assembly.
          </p>
        </div>

        {/* Submission Card */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_#171717]">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FF8A00]/20 border-2 border-[#171717] flex items-center justify-center mx-auto text-[#FF8A00]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#171717] uppercase">
                THANK YOU FOR SHARING!
              </h3>
              <p className="text-sm text-[#171717]/80 max-w-md mx-auto font-medium">
                We love seeing physical creations in the wild. Our team will review your submission and add it to our community showcase archive.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setProjectTitle('');
                  setDescription('');
                  setFileName('');
                }}
                className="mt-4 px-6 py-3 bg-[#171717] text-white font-black font-heading text-xs uppercase tracking-wider rounded-xl border-2 border-[#171717] hover:bg-[#FF8A00] hover:text-[#171717] transition-all cursor-pointer"
              >
                SUBMIT ANOTHER CREATION
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Your Name */}
                <div>
                  <label htmlFor="share-name" className="block text-xs font-mono font-bold uppercase text-[#171717] mb-2">
                    YOUR NAME OR TEAM
                  </label>
                  <input
                    id="share-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mahir Ahmed / AeroLab"
                    className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl px-4 py-3 text-xs font-bold text-[#171717] placeholder:text-[#171717]/40 focus:outline-hidden focus:shadow-[2px_2px_0px_0px_#FF8A00]"
                  />
                </div>

                {/* Project Title */}
                <div>
                  <label htmlFor="share-title" className="block text-xs font-mono font-bold uppercase text-[#171717] mb-2">
                    PROJECT TITLE
                  </label>
                  <input
                    id="share-title"
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. Custom Drone Camera Gimbal"
                    className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl px-4 py-3 text-xs font-bold text-[#171717] placeholder:text-[#171717]/40 focus:outline-hidden focus:shadow-[2px_2px_0px_0px_#FF8A00]"
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label htmlFor="share-category" className="block text-xs font-mono font-bold uppercase text-[#171717] mb-2">
                  DISCIPLINE / CATEGORY
                </label>
                <select
                  id="share-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CommunityFilterCategory)}
                  className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl px-4 py-3 text-xs font-bold text-[#171717] focus:outline-hidden focus:shadow-[2px_2px_0px_0px_#FF8A00] cursor-pointer"
                >
                  <option value="ENGINEERING">ENGINEERING & MECHANICAL</option>
                  <option value="EDUCATION">EDUCATION & ANATOMY</option>
                  <option value="ROBOTICS">ROBOTICS & MECHATRONICS</option>
                  <option value="ART">ART & SCULPTURE</option>
                  <option value="JEWELRY">JEWELRY & MICRO-RESIN</option>
                  <option value="ARCHITECTURE">ARCHITECTURE & SCALE MODELS</option>
                  <option value="AUTOMOTIVE">AUTOMOTIVE & MOTORSPORT</option>
                  <option value="CONSUMER">CONSUMER & DESK PRODUCTS</option>
                  <option value="OTHER">CUSTOM PROTOYPE / OTHER</option>
                </select>
              </div>

              {/* Drag & Drop Image Upload */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#171717] mb-2">
                  PROJECT PHOTOGRAPH
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  className={`
                    border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer
                    ${
                      isDragging
                        ? 'border-[#FF8A00] bg-[#FF8A00]/10'
                        : 'border-[#171717] bg-[#FFF9ED] hover:bg-[#FFF4DC]'
                    }
                  `}
                >
                  <input
                    type="file"
                    id="creation-photo-upload"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <label htmlFor="creation-photo-upload" className="cursor-pointer flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-[#171717] flex items-center justify-center text-[#FF8A00] shadow-[2px_2px_0px_0px_#171717] mb-3">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    {fileName ? (
                      <span className="text-xs font-mono font-bold text-[#171717]">
                        Selected: {fileName}
                      </span>
                    ) : (
                      <>
                        <span className="text-xs font-black font-heading uppercase text-[#171717]">
                          CLICK TO UPLOAD OR DRAG PHOTO HERE
                        </span>
                        <span className="text-[11px] font-mono text-[#171717]/60 mt-1">
                          PNG, JPG, WEBP up to 25MB
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label htmlFor="share-desc" className="block text-xs font-mono font-bold uppercase text-[#171717] mb-2">
                  SHORT STORY OR NOTE
                </label>
                <textarea
                  id="share-desc"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us what problem this solved, how you used it, or what material you loved..."
                  className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl p-4 text-xs font-medium text-[#171717] placeholder:text-[#171717]/40 focus:outline-hidden focus:shadow-[2px_2px_0px_0px_#FF8A00]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#FF8A00] hover:bg-[#e07a00] text-white font-black font-heading text-xs uppercase tracking-wider rounded-2xl border-2 border-[#171717] shadow-[4px_4px_0px_0px_#171717] hover:translate-x-[1px] hover:translate-y-[1px] transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SHARE WITH ARISTROCRAFT</span>
                <Send className="w-4 h-4" />
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
