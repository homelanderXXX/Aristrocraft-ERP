import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Send, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      <div className="bg-[#FFF9ED] border-4 border-[#171717] rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_0px_#171717]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00] text-white text-xs font-black font-heading uppercase mb-4">
          EXCLUSIVE DROPS
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-heading uppercase text-[#171717]">
          GET NEW DROPS & CUSTOM IDEAS
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-[#525252] mt-2 mb-6 max-w-md mx-auto">
          Be the first to hear about seasonal limited-run 3D prints, filament restocks, and discount vouchers.
        </p>

        {submitted ? (
          <div className="bg-[#34D399] border-2 border-[#171717] rounded-full p-4 inline-flex items-center gap-2 font-black text-sm text-[#171717] shadow-[4px_4px_0px_0px_#171717]">
            <CheckCircle2 className="w-5 h-5 text-[#171717]" />
            Thanks for joining the AristroCraft club!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 bg-white border-3 border-[#171717] rounded-full px-5 py-3 text-sm font-bold text-[#171717] placeholder:text-[#a3a3a3] shadow-[3px_3px_0px_0px_#171717] outline-none focus:bg-[#FFFDF5]"
            />
            <Button variant="candy" colorTheme="accent" size="md" icon={Send}>
              SUBSCRIBE
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};
