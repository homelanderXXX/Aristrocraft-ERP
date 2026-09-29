import React, { useState } from 'react';
import {
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
  Send,
  Copy,
  Check,
} from 'lucide-react';
import { customOrderRepository, CustomOrderModel } from '../../lib/supabase/repositories/customOrderRepository';
import { useCustomerAuth } from '../../context/CustomerAuthContext';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMaterial?: string;
}

export const CustomOrderModal: React.FC<CustomOrderModalProps> = ({
  isOpen,
  onClose,
  initialMaterial = '',
}) => {
  const { profile, user } = useCustomerAuth();
  const [customerName, setCustomerName] = useState(profile?.name || '');
  const [customerPhone, setCustomerPhone] = useState(profile?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(profile?.email || user?.email || '');
  const [description, setDescription] = useState(
    initialMaterial ? `[Material Preferred: ${initialMaterial}]\n` : ''
  );
  const [requestedColor, setRequestedColor] = useState('Any / Recommended');
  const [requestedSize, setRequestedSize] = useState('Standard / Medium');
  const [referenceFile, setReferenceFile] = useState<File | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      if (profile) {
        if (!customerName && profile.name) setCustomerName(profile.name);
        if (!customerPhone && profile.phone) setCustomerPhone(profile.phone);
        if (!customerEmail && (profile.email || user?.email)) setCustomerEmail(profile.email || user?.email || '');
      } else if (typeof window !== 'undefined') {
        try {
          const savedRaw = localStorage.getItem('aristro_checkout_saved_details');
          if (savedRaw) {
            const saved = JSON.parse(savedRaw);
            if (!customerName && saved.name) setCustomerName(saved.name);
            if (!customerPhone && saved.phone) setCustomerPhone(saved.phone);
            if (!customerEmail && saved.email) setCustomerEmail(saved.email);
          }
        } catch {
          // ignore
        }
      }
    }
  }, [isOpen, profile, user]);

  React.useEffect(() => {
    if (initialMaterial && isOpen) {
      setDescription((prev) => {
        if (!prev.includes(`[Material Preferred:`)) {
          return `[Material Preferred: ${initialMaterial}]\n` + prev;
        }
        return prev;
      });
    }
  }, [initialMaterial, isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<CustomOrderModel | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedExts = ['stl', 'obj', '3mf', 'step', 'stp', 'png', 'jpg', 'jpeg', 'zip'];
      const ext = file.name.split('.').pop()?.toLowerCase() || '';

      if (!allowedExts.includes(ext)) {
        setError('Supported file formats are: .STL, .OBJ, .3MF, .STEP, .STP, .PNG, .JPG, .JPEG, .ZIP');
        return;
      }

      // Max 50MB limit
      if (file.size > 50 * 1024 * 1024) {
        setError('File size exceeds the 50MB limit.');
        return;
      }
      setReferenceFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!customerName.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      setError('Please provide a valid phone number (e.g. 017XXXXXXXX).');
      return;
    }
    if (!description.trim()) {
      setError('Please describe what you want to 3D print.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { customOrder, error: submitError } = await customOrderRepository.submitCustomOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || 'not-provided@aristrocrafts.com',
        description: description.trim(),
        requestedColor,
        requestedSize,
        referenceFile: referenceFile || undefined,
      });

      if (submitError || !customOrder) {
        throw submitError || new Error('Could not submit custom order.');
      }

      setSubmittedOrder(customOrder);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to submit request. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (submittedOrder?.id) {
      navigator.clipboard.writeText(submittedOrder.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedOrder(null);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setDescription('');
    setReferenceFile(null);
    setError(null);
    onClose();
  };

  return (
    <div
      id="custom-order-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#171717]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-[#FFF9ED] border-3 border-[#171717] rounded-3xl sm:rounded-[32px] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717] my-8 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white hover:bg-[#FF8A00] hover:text-white border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2.5px]" />
        </button>

        {submittedOrder ? (
          /* ================================================== */
          /* SUCCESS CONFIRMATION VIEW */
          /* ================================================== */
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-3xl bg-[#34D399] border-3 border-[#171717] text-white flex items-center justify-center text-4xl mx-auto mb-5 shadow-[4px_4px_0px_0px_#171717] rotate-[-3deg]">
              🎉
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading tracking-wider uppercase text-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717] mb-3">
              <span>CUSTOM REQUEST RECEIVED</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-heading uppercase text-[#171717] tracking-tight mb-2">
              We're on it, {submittedOrder.customerName}!
            </h2>

            <p className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed max-w-md mx-auto mb-6">
              Our 3D printing engineering team will inspect your design, calculate exact slicing specs and pricing, and contact you within <strong>24 business hours</strong>.
            </p>

            {/* Reference ID card */}
            <div className="bg-white border-2.5 border-[#171717] rounded-2xl p-4 max-w-md mx-auto mb-6 text-left shadow-[3px_3px_0px_0px_#171717]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-black font-heading uppercase text-[#6D6D6D]">
                  Custom Request ID:
                </span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1 text-[11px] font-black text-[#FF8A00] hover:underline cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy Reference'}</span>
                </button>
              </div>
              <div className="font-mono text-sm font-black text-[#171717] bg-[#FFF9ED] border border-[#171717]/20 p-2.5 rounded-xl break-all">
                {submittedOrder.id}
              </div>
              {submittedOrder.erpnextQuotationId && (
                <div className="mt-2.5 flex items-center justify-between gap-2 px-2.5 py-1.5 bg-[#E0F2FE] border border-[#0284C7]/40 rounded-lg text-left">
                  <span className="text-[10px] font-bold text-[#0369A1] uppercase tracking-wider">
                    ERPNext Quotation
                  </span>
                  <span className="font-mono text-[11px] font-black text-[#0284C7]">
                    {submittedOrder.erpnextQuotationId}
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="inline-flex items-center justify-center gap-2 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] rounded-full px-8 py-3.5 text-xs sm:text-sm font-black font-heading uppercase tracking-wide shadow-[3px_3px_0px_0px_#171717] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[3px]" />
              <span>DONE / BACK TO BROWSING</span>
            </button>
          </div>
        ) : (
          /* ================================================== */
          /* CUSTOM ORDER FORM VIEW */
          /* ================================================== */
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00] text-white border-2 border-[#171717] text-xs font-black font-heading tracking-widest uppercase shadow-[2px_2px_0px_0px_#171717] mb-3">
              <span>CUSTOM 3D PRINT LAB</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-heading uppercase text-[#171717] tracking-tight mb-2">
              Start Your Custom Print
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed mb-6">
              Have an idea, CAD drawing, or STL model from Thingiverse or Printables? Share the details below for a fast price estimate.
            </p>

            {error && (
              <div className="p-3 mb-5 bg-[#FEE2E2] border-2 border-[#EF4444] rounded-2xl flex items-center gap-2 text-xs font-bold text-[#B91C1C]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#171717] rounded-xl text-xs sm:text-sm font-semibold text-[#171717] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 01712345678"
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#171717] rounded-xl text-xs sm:text-sm font-semibold text-[#171717] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. tanvir@example.com"
                  className="w-full px-4 py-2.5 bg-white border-2 border-[#171717] rounded-xl text-xs sm:text-sm font-semibold text-[#171717] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                />
              </div>

              <div>
                <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                  Project Description & Specifications *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe dimensions, intended usage, link to Thingiverse / Printables, or special requirements..."
                  className="w-full px-4 py-2.5 bg-white border-2 border-[#171717] rounded-xl text-xs sm:text-sm font-semibold text-[#171717] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                    Preferred Color
                  </label>
                  <select
                    value={requestedColor}
                    onChange={(e) => setRequestedColor(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#171717] rounded-xl text-xs font-bold text-[#171717] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                  >
                    <option value="Any / Recommended">Any / Recommended</option>
                    <option value="Matte Black">Matte Black</option>
                    <option value="Crisp White">Crisp White</option>
                    <option value="Electric Orange">Electric Orange</option>
                    <option value="Sunflower Yellow">Sunflower Yellow</option>
                    <option value="Dual-Color (Black & White)">Dual-Color (Black & White)</option>
                    <option value="Silk Gold">Silk Gold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                    Approximate Size
                  </label>
                  <select
                    value={requestedSize}
                    onChange={(e) => setRequestedSize(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#171717] rounded-xl text-xs font-bold text-[#171717] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                  >
                    <option value="Small (< 5cm)">Small (&lt; 5cm)</option>
                    <option value="Standard / Medium (5-15cm)">Standard / Medium (5-15cm)</option>
                    <option value="Large (15-25cm)">Large (15-25cm)</option>
                    <option value="Custom / Industrial">Custom / Industrial</option>
                  </select>
                </div>
              </div>

              {/* STL / CAD / Image file upload */}
              <div>
                <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                  Upload Reference File or 3D Model (STL, OBJ, STEP, PNG, JPG — Max 50MB)
                </label>
                <div className="relative border-2 border-dashed border-[#171717] rounded-2xl p-4 bg-white hover:bg-[#FFF9ED] transition-colors text-center cursor-pointer">
                  <input
                    type="file"
                    accept=".stl,.obj,.step,.stp,.3mf,.png,.jpg,.jpeg,.zip"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  {referenceFile ? (
                    <div className="flex items-center justify-center gap-2 text-xs font-black font-heading text-[#FF8A00]">
                      <FileText className="w-5 h-5" />
                      <span>{referenceFile.name} ({(referenceFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-[#525252]">
                      <Upload className="w-6 h-6 text-[#FF8A00]" />
                      <span className="font-bold text-[#171717]">Click or drag & drop 3D file or image</span>
                      <span className="text-[10px] text-[#6D6D6D]">STL, 3MF, STEP, OBJ, PNG or ZIP</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white disabled:opacity-50 text-[#171717] border-2.5 border-[#171717] font-black font-heading text-xs sm:text-sm uppercase tracking-wider text-center shadow-[4px_4px_0px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 stroke-[3px]" />
                  <span>{isSubmitting ? 'Submitting & Slicing...' : 'SUBMIT CUSTOM REQUEST'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-[#6D6D6D] pt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#FF8A00]" />
                  24h Review
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                  No Upfront Payment Required
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
