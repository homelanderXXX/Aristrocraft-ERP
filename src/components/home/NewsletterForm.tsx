import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Mail } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Client-side validated success state (ready for API integration)
    setStatus('success');
    setErrorMessage('');
  };

  const handleReset = () => {
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="w-full">
      {status === 'success' ? (
        <div
          role="status"
          aria-live="polite"
          className="bg-white border-2.5 sm:border-3 border-[#171717] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[5px_5px_0px_0px_#171717] animate-in fade-in zoom-in-95 duration-200 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#34D399] border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717]">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5px]" />
            </div>
            <div>
              <span className="text-[10px] font-black font-heading tracking-wider uppercase text-[#34D399] bg-[#171717] px-2 py-0.5 rounded">
                CONFIRMED
              </span>
              <h4 className="text-lg sm:text-xl font-black font-heading uppercase text-[#171717] mt-0.5">
                You're on the list!
              </h4>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed mb-4">
            We'll keep you posted on fresh drops, custom design releases, and exclusive 3D print updates.
          </p>

          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-black font-heading uppercase tracking-wide text-[#FF8A00] hover:text-[#171717] underline cursor-pointer"
          >
            ← Register another email
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full flex flex-col gap-3"
          aria-label="Newsletter subscription form"
        >
          {/* Label for accessibility */}
          <label htmlFor="newsletter-email-input" className="sr-only">
            Email address
          </label>

          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {/* Email Input Field */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#171717]/40">
                <Mail className="w-4 h-4 stroke-[2.5px]" />
              </div>
              <input
                id="newsletter-email-input"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') {
                    setStatus('idle');
                    setErrorMessage('');
                  }
                }}
                placeholder="Enter your email address"
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'newsletter-error-message' : undefined}
                className={`
                  w-full bg-white border-2.5 sm:border-3 border-[#171717] rounded-full pl-11 pr-5 py-3.5 sm:py-4
                  text-xs sm:text-sm font-bold text-[#171717] placeholder:text-[#8C8C8C]
                  shadow-[3px_3px_0px_0px_#171717] outline-none transition-all duration-150
                  focus:bg-[#FFFDF5] focus:shadow-[4px_4px_0px_0px_#FF8A00]
                  ${status === 'error' ? 'border-[#EF4444] ring-2 ring-[#EF4444]/20' : ''}
                `}
              />
            </div>

            {/* Subscribe Submit Button */}
            <button
              type="submit"
              className="
                inline-flex items-center justify-center gap-2 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white
                text-[#171717] border-2.5 sm:border-3 border-[#171717] rounded-full px-7 sm:px-8 py-3.5 sm:py-4
                text-xs sm:text-sm font-black font-heading uppercase tracking-wider
                shadow-[3px_3px_0px_0px_#171717] hover:shadow-[5px_5px_0px_0px_#171717]
                hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#171717]
                transition-all cursor-pointer select-none shrink-0 text-center
              "
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>

          {/* Accessible Error Message */}
          {status === 'error' && (
            <div
              id="newsletter-error-message"
              role="alert"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DC2626] bg-[#FEE2E2] border-1.5 border-[#DC2626] px-3.5 py-1.5 rounded-xl w-fit"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Privacy Microcopy */}
          <p className="text-[11px] sm:text-xs font-semibold text-[#6D6D6D] mt-1 pl-1">
            🔒 No spam. Just occasional ARISTROCRAFT updates. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
};
