import React, { useState } from 'react';
import { ArrowLeft, UserCheck, Lock, Mail, ArrowRight, ShieldCheck, Chrome, Facebook, Github, Loader2 } from 'lucide-react';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { useRouter } from '../../context/RouterContext';
import { PageMeta } from '../../components/common/PageMeta';

export default function LoginPage() {
  const { signIn, signInWithOAuth, resetPassword, user } = useCustomerAuth();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | 'github' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  React.useEffect(() => {
    if (user) {
      navigate('/account');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const { error } = await signIn(email.trim(), password);
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message || 'Invalid email or password. Please try again.');
    } else {
      navigate('/account');
    }
  };

  const handleSocialConnect = async (provider: 'google' | 'facebook' | 'github') => {
    setSocialLoading(provider);
    setErrorMessage(null);

    const { error } = await signInWithOAuth(provider);
    setSocialLoading(null);

    if (error) {
      setErrorMessage(error.message || `Could not sign in with ${provider}. Please try again.`);
    } else {
      navigate('/account');
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email address above to reset password.');
      return;
    }
    setErrorMessage(null);
    const { error } = await resetPassword(email.trim());
    if (error) {
      setErrorMessage(error.message);
    } else {
      setResetSent(true);
    }
  };

  return (
    <div className="w-full bg-[#FFF9ED] min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <PageMeta
        title="Customer Login — ARISTROCRAFT 3D Prints"
        description="Sign in to your ARISTROCRAFT account to track 3D print orders and manage saved items."
      />

      <div className="max-w-md w-full bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717] space-y-6">
        {/* TOP HEADER */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#FFC43C] border-2.5 border-[#171717] flex items-center justify-center text-[#171717] mx-auto shadow-[3px_3px_0px_0px_#171717]">
            <UserCheck className="w-7 h-7 stroke-[2.5px]" />
          </div>
          <h1 className="text-2xl font-black font-heading uppercase text-[#171717]">
            Customer Login
          </h1>
          <p className="text-xs font-semibold text-[#525252]">
            Sign in to view your order history and manage your account
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-[#FF4D4D]/10 border-2 border-[#FF4D4D] rounded-xl text-xs font-bold text-[#FF4D4D]">
            {errorMessage}
          </div>
        )}

        {resetSent && (
          <div className="p-3 bg-[#10B981]/10 border-2 border-[#10B981] rounded-xl text-xs font-bold text-[#10B981]">
            ✓ Password reset email sent. Please check your inbox.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00]"
              />
              <Mail className="w-4 h-4 text-[#8C8C8C] absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-black font-heading uppercase text-[#171717]">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[10px] font-black font-heading uppercase text-[#FF8A00] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00]"
              />
              <Lock className="w-4 h-4 text-[#8C8C8C] absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || socialLoading !== null}
            className="w-full py-3.5 rounded-2xl bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] font-black font-heading text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[5px_5px_0px_0px_#171717] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isSubmitting ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </>
            )}
          </button>

          {/* OR CONNECT DIVIDER */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t-2 border-[#171717]/15"></div>
            <span className="flex-shrink mx-3 text-[10px] font-black font-heading uppercase tracking-wider text-[#171717]/60 bg-white px-2">
              Or Fast Sign In With OAuth
            </span>
            <div className="flex-grow border-t-2 border-[#171717]/15"></div>
          </div>

          {/* PROMINENT GOOGLE OAUTH BUTTON */}
          <button
            type="button"
            disabled={socialLoading !== null || isSubmitting}
            onClick={() => handleSocialConnect('google')}
            className="w-full py-3 px-4 bg-white hover:bg-[#FFF9ED] text-[#171717] border-2.5 border-[#171717] rounded-2xl font-black font-heading text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#171717] hover:shadow-[4px_4px_0px_0px_#171717] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            {socialLoading === 'google' ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#FF8A00]" />
            ) : (
              <div className="w-5 h-5 flex items-center justify-center text-[#EA4335]">
                <Chrome className="w-5 h-5 stroke-[2.5px]" />
              </div>
            )}
            <span>Continue with Google (Google OAuth)</span>
          </button>

          {/* SECONDARY SOCIAL OPTIONS (FACEBOOK & GITHUB) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* FACEBOOK */}
            <button
              type="button"
              disabled={socialLoading !== null || isSubmitting}
              onClick={() => handleSocialConnect('facebook')}
              className="py-2.5 px-3 bg-[#FFF9ED] hover:bg-[#1877F2]/10 text-[#171717] border-2 border-[#171717] rounded-xl font-black font-heading text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_0px_#171717] hover:shadow-[3px_3px_0px_0px_#171717] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {socialLoading === 'facebook' ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#1877F2]" />
              ) : (
                <div className="w-4 h-4 flex items-center justify-center text-[#1877F2]">
                  <Facebook className="w-4 h-4 stroke-[2.5px]" />
                </div>
              )}
              <span>Facebook</span>
            </button>

            {/* GITHUB */}
            <button
              type="button"
              disabled={socialLoading !== null || isSubmitting}
              onClick={() => handleSocialConnect('github')}
              className="py-2.5 px-3 bg-[#FFF9ED] hover:bg-[#171717]/10 text-[#171717] border-2 border-[#171717] rounded-xl font-black font-heading text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_0px_#171717] hover:shadow-[3px_3px_0px_0px_#171717] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {socialLoading === 'github' ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#171717]" />
              ) : (
                <div className="w-4 h-4 flex items-center justify-center text-[#171717]">
                  <Github className="w-4 h-4 stroke-[2.5px]" />
                </div>
              )}
              <span>GitHub</span>
            </button>
          </div>
        </form>

        <div className="pt-4 border-t-2 border-[#171717]/10 text-center space-y-2">
          <p className="text-xs font-semibold text-[#525252]">
            Don't have an account yet?
          </p>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase text-[#171717] hover:text-[#FF8A00] transition-colors"
          >
            <span>Create New Customer Account</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
          </button>
        </div>

        <div className="p-3 bg-[#FFF9ED] border border-[#171717]/20 rounded-xl flex items-center gap-2 text-[11px] font-bold text-[#6D6D6D]">
          <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>Guest checkout remains fully supported without registering!</span>
        </div>
      </div>
    </div>
  );
}
