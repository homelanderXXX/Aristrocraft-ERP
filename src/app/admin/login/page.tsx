import React, { useState } from 'react';
import { useRouter } from '../../../context/RouterContext';
import { adminRepository } from '../../../lib/supabase/repositories/adminRepository';
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await adminRepository.loginAdmin(email, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setErrorMsg(res.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      {/* BRANDING CARD CONTAINER */}
      <div className="w-full max-w-md bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717]">
        {/* HEADER BADGE */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FF8A00] text-white border-3 border-[#171717] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_#FFC43C] font-black font-heading text-2xl">
            AC
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-[#FFC43C] text-[#171717] border border-[#171717] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECURE MANAGEMENT PORTAL</span>
          </span>
          <h1 className="text-2xl font-black font-heading uppercase text-[#171717]">
            ARISTROCRAFT ADMIN
          </h1>
          <p className="text-xs font-semibold text-[#6D6D6D] mt-1">
            Log in with your studio credentials to access orders, product catalog, and custom prints.
          </p>
        </div>

        {/* ERROR NOTIFICATION ALERT */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border-2 border-red-500 text-red-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs font-bold leading-relaxed">{errorMsg}</div>
          </div>
        )}

        {/* QUICK CREDENTIAL HELPER BADGE */}
        <div className="mb-6 p-3.5 rounded-2xl bg-[#FFF9ED] border-2 border-[#171717] flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-[#171717] block">Studio Admin:</span>
            <code className="text-[#FF8A00] font-mono text-[11px] font-bold">admin@aristrocrafts.com / admin123</code>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail('admin@aristrocrafts.com');
              setPassword('admin123');
              setErrorMsg(null);
            }}
            className="px-2.5 py-1 bg-[#171717] hover:bg-[#FF8A00] text-white rounded-lg font-bold text-[10px] uppercase transition-colors cursor-pointer"
          >
            Auto Fill
          </button>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#171717] mb-2">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aristrocrafts.com"
                className="w-full pl-11 pr-4 py-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-sm font-bold text-[#171717] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#171717] mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-sm font-bold text-[#171717] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 bg-[#FF8A00] hover:bg-[#E57B00] active:translate-y-0.5 text-white font-black font-heading text-sm uppercase tracking-wider border-3 border-[#171717] rounded-2xl shadow-[4px_4px_0px_0px_#171717] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>AUTHENTICATING...</span>
              </>
            ) : (
              <>
                <span>ACCESS ADMIN DASHBOARD</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-[#E5E5E5] text-center">
          <p className="text-[11px] font-semibold text-[#888888]">
            Need credentials or initial setup help?
          </p>
          <p className="text-[11px] font-bold text-[#171717] mt-0.5">
            Check your Supabase Auth dashboard or <button type="button" onClick={() => navigate('/')} className="text-[#FF8A00] underline font-black cursor-pointer">Return to Shop</button>
          </p>
        </div>
      </div>
    </div>
  );
};
