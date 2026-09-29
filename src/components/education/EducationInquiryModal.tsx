import React, { useState } from 'react';
import {
  X,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
  Send,
  Building2,
  GraduationCap,
  Copy,
  Check,
} from 'lucide-react';
import { customOrderRepository, CustomOrderModel } from '../../lib/supabase/repositories/customOrderRepository';

interface EducationInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const EducationInquiryModal: React.FC<EducationInquiryModalProps> = ({
  isOpen,
  onClose,
  initialTopic = '',
}) => {
  const [institutionName, setInstitutionName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subjectDiscipline, setSubjectDiscipline] = useState('Physics / Mechanics');
  const [learningTier, setLearningTier] = useState('University / Advanced (15+)');
  const [estimatedQuantity, setEstimatedQuantity] = useState('1 Demo Prototype');
  const [projectDescription, setProjectDescription] = useState(
    initialTopic ? `[Inquiry for: ${initialTopic}]\n` : ''
  );
  const [referenceFile, setReferenceFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<CustomOrderModel | null>(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (initialTopic && isOpen) {
      setProjectDescription((prev) => {
        if (!prev.includes(`[Inquiry for: ${initialTopic}]`)) {
          return `[Inquiry for: ${initialTopic}]\n` + prev;
        }
        return prev;
      });
    }
  }, [initialTopic, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedExts = ['stl', 'obj', '3mf', 'step', 'stp', 'png', 'jpg', 'jpeg', 'zip', 'pdf'];
      const ext = file.name.split('.').pop()?.toLowerCase() || '';

      if (!allowedExts.includes(ext)) {
        setError('Please upload a 3D model (.stl, .step, .obj), diagram (.pdf, .png, .jpg), or ZIP archive.');
        return;
      }

      if (file.size > 25 * 1024 * 1024) {
        setError('File size must be under 25MB.');
        return;
      }

      setError(null);
      setReferenceFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPerson.trim() || !phone.trim() || !projectDescription.trim()) {
      setError('Please provide your name, phone number, and a brief description of what students need.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const fullDescription = `[INSTITUTIONAL / EDUCATION REQUEST]
Institution: ${institutionName || 'Not specified'}
Discipline: ${subjectDiscipline}
Target Level: ${learningTier}
Quantity: ${estimatedQuantity}
----------------------------------------
Details:
${projectDescription.trim()}`;

    try {
      const { customOrder, error: submitError } = await customOrderRepository.submitCustomOrder({
        customerName: contactPerson.trim(),
        customerEmail: email.trim() || 'institution@education.edu',
        customerPhone: phone.trim(),
        description: fullDescription,
        requestedColor: 'Classroom Optimized',
        requestedSize: estimatedQuantity,
        referenceFile: referenceFile || undefined,
      });

      if (submitError) {
        setError(submitError.message || 'Failed to submit inquiry. Please try again.');
      } else {
        setSubmittedOrder(customOrder);
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyOrderId = () => {
    if (submittedOrder?.id) {
      navigator.clipboard.writeText(submittedOrder.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Hello ARISTROCRAFT Studio! I have submitted an educational 3D printing inquiry for ${institutionName || 'my classroom'} (Reference #${submittedOrder?.id || 'NEW'}). Details: ${projectDescription.slice(0, 100)}...`
    );
    window.open(`https://wa.me/8801700000000?text=${text}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="education-inquiry-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171717]/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FFF9ED] border-4 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[10px_10px_0px_0px_#171717] overflow-y-auto max-h-[90vh] animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white border-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FF8A00] hover:text-white shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[2.5px]" />
        </button>

        {submittedOrder ? (
          /* SUCCESS CONFIRMATION VIEW */
          <div className="py-6 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-3xl bg-[#059669] text-white border-3 border-[#171717] flex items-center justify-center shadow-[4px_4px_0px_0px_#171717] mb-4 rotate-[-4deg]">
              <CheckCircle2 className="w-9 h-9 stroke-[3px]" />
            </div>

            <h3 className="text-2xl font-black font-heading text-[#171717] mb-2">
              Academic Inquiry Received!
            </h3>

            <p className="text-sm font-semibold text-[#525252] max-w-md mb-6">
              Thank you, <strong>{contactPerson}</strong>. Our educational engineering team will review your pedagogical requirements and reach out within 2–4 hours.
            </p>

            <div className="w-full max-w-md p-4 bg-white border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] mb-6 text-left flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black font-heading text-[#737373] uppercase block">
                  INQUIRY REFERENCE ID
                </span>
                <span className="text-xs font-mono font-black text-[#171717]">
                  {submittedOrder.id}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyOrderId}
                className="px-3 py-1.5 bg-[#FFF9ED] hover:bg-[#FFC43C] border border-[#171717] rounded-lg text-xs font-bold text-[#171717] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
              <button
                type="button"
                onClick={handleWhatsAppContact}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase shadow-[3px_3px_0px_0px_#171717] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Instant WhatsApp Consultation</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#FFF9ED] text-[#171717] border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase shadow-[3px_3px_0px_0px_#171717] cursor-pointer"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-[#FF8A00]" />
              <span className="text-xs font-black font-heading uppercase text-[#FF8A00] tracking-wider">
                CUSTOM EDUCATIONAL PROJECT INQUIRY
              </span>
            </div>

            <h3 id="education-inquiry-title" className="text-2xl sm:text-3xl font-black font-heading text-[#171717] tracking-tight mb-2">
              Request Educational 3D Manufacturing
            </h3>

            <p className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed mb-6">
              Tell us what your students or faculty need. We fabricate single prototypes, multi-part demonstration rigs, or entire classroom sets.
            </p>

            {error && (
              <div className="p-3.5 mb-5 rounded-xl bg-red-50 border-2 border-red-500 text-red-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Institution Name */}
              <div>
                <label className="text-xs font-black font-heading uppercase text-[#171717] block mb-1.5">
                  School / University / Lab Name
                </label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="e.g. BUET, North South University, Rajshahi College"
                  className="w-full bg-white border-2 border-[#171717] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                />
              </div>

              {/* Contact Person Name */}
              <div>
                <label className="text-xs font-black font-heading uppercase text-[#171717] block mb-1.5">
                  Your Name / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Dr. Faisal Rahman / Physics Lecturer"
                  className="w-full bg-white border-2 border-[#171717] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-black font-heading uppercase text-[#171717] block mb-1.5">
                  Phone / WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01712345678"
                  className="w-full bg-white border-2 border-[#171717] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-black font-heading uppercase text-[#171717] block mb-1.5">
                  Institutional Email (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. faculty@university.edu.bd"
                  className="w-full bg-white border-2 border-[#171717] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                />
              </div>

              {/* Discipline */}
              <div>
                <label className="text-xs font-black font-heading uppercase text-[#171717] block mb-1.5">
                  Academic Discipline
                </label>
                <select
                  value={subjectDiscipline}
                  onChange={(e) => setSubjectDiscipline(e.target.value)}
                  className="w-full bg-white border-2 border-[#171717] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                >
                  <option value="Mathematics & Geometry">Mathematics & Geometry</option>
                  <option value="Physics / Kinematics / Optics">Physics / Kinematics / Optics</option>
                  <option value="Biology & Anatomy Replicas">Biology & Anatomy Replicas</option>
                  <option value="Chemistry & Molecular Lattice">Chemistry & Molecular Lattice</option>
                  <option value="Mechanical & Industrial Engineering">Mechanical & Industrial Engineering</option>
                  <option value="Robotics & Computer Science">Robotics & Computer Science</option>
                  <option value="Geography & Topographic DEM">Geography & Topographic DEM</option>
                  <option value="Architecture & Scale Models">Architecture & Scale Models</option>
                  <option value="Special Education & Accessibility">Special Education & Accessibility</option>
                  <option value="Other STEM Curriculum">Other STEM Curriculum</option>
                </select>
              </div>

              {/* Target Age / Tier */}
              <div>
                <label className="text-xs font-black font-heading uppercase text-[#171717] block mb-1.5">
                  Target Student Level
                </label>
                <select
                  value={learningTier}
                  onChange={(e) => setLearningTier(e.target.value)}
                  className="w-full bg-white border-2 border-[#171717] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                >
                  <option value="Early Learning (Ages 3–9)">Early Learning (Ages 3–9)</option>
                  <option value="School STEM (Ages 10–14)">School STEM (Ages 10–14)</option>
                  <option value="High School & College (Ages 15–18)">High School & College (Ages 15–18)</option>
                  <option value="University & Postgraduate (18+)">University & Postgraduate (18+)</option>
                </select>
              </div>
            </div>

            {/* Estimated Quantity */}
            <div className="mb-4">
              <label className="text-xs font-black font-heading uppercase text-[#171717] block mb-1.5">
                Estimated Order Scope
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  '1 Demo Prototype',
                  '5–10 Lab Units',
                  'Classroom Set (20–40x)',
                  'Custom Bulk (50+)',
                ].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setEstimatedQuantity(qty)}
                    className={`
                      py-2 px-2.5 rounded-xl border text-[11px] font-black font-heading uppercase transition-colors cursor-pointer text-center
                      ${
                        estimatedQuantity === qty
                          ? 'bg-[#171717] text-white border-[#171717]'
                          : 'bg-white text-[#171717] border-[#171717] hover:bg-[#FFC43C]'
                      }
                    `}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>

            {/* Description & Syllabus details */}
            <div className="mb-4">
              <label className="text-xs font-black font-heading uppercase text-[#171717] block mb-1.5">
                Describe What You Need <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Detail the mechanism, organ cutaway, scale dimensions, key learning goals, or specific syllabus topic..."
                className="w-full bg-white border-2 border-[#171717] rounded-xl p-3 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
              />
            </div>

            {/* Optional File Upload */}
            <div className="mb-6">
              <label className="text-xs font-black font-heading uppercase text-[#171717] block mb-1.5">
                Attach File, Sketch or 3D Model (Optional)
              </label>
              <div className="p-3 bg-white border-2 border-dashed border-[#171717] rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#525252] overflow-hidden">
                  <Upload className="w-4 h-4 text-[#FF8A00] shrink-0" />
                  <span className="truncate">
                    {referenceFile ? referenceFile.name : 'Upload STL, STEP, OBJ, PDF, or Photo (Max 25MB)'}
                  </span>
                </div>
                <label className="px-3 py-1.5 bg-[#FFF9ED] hover:bg-[#FFC43C] border border-[#171717] rounded-lg text-xs font-black font-heading uppercase text-[#171717] cursor-pointer shrink-0">
                  <span>Browse</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".stl,.obj,.3mf,.step,.stp,.png,.jpg,.jpeg,.zip,.pdf"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#FF8A00] hover:bg-[#FF9B26] text-white border-3 border-[#171717] rounded-2xl font-black font-heading text-sm uppercase shadow-[4px_4px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting Project Details...' : 'Submit Academic Project Inquiry'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
