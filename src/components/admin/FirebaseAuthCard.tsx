import React, { useEffect, useState } from 'react';
import { Flame, CheckCircle2, AlertTriangle, ShieldCheck, Mail, Key, ExternalLink, RefreshCw } from 'lucide-react';
import { getGoogleClientId, setGoogleClientId } from '../../lib/auth/googleOAuth';

export const FirebaseAuthCard: React.FC = () => {
  const [status, setStatus] = useState<{ connected: boolean; projectId?: string; error?: string | null }>({
    connected: false,
  });
  const [loading, setLoading] = useState(true);
  const [customClientId, setCustomClientId] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/firebase/status');
      const data = await res.json();
      setStatus(data);
    } catch (err: any) {
      setStatus({ connected: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    setCustomClientId(getGoogleClientId());
  }, []);

  const handleSaveClientId = (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleClientId(customClientId);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717] space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-[#171717]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-xl flex items-center justify-center font-black">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h2 className="text-lg font-black font-heading uppercase text-[#171717]">
              Firebase Authentication & Google OAuth
            </h2>
            <p className="text-xs font-semibold text-[#888888]">
              Project: <span className="font-mono text-[#FF8A00] font-bold">aristrocrafts</span> (Service Account Connected)
            </p>
          </div>
        </div>

        <button
          onClick={fetchStatus}
          disabled={loading}
          className="p-2 border-2 border-[#171717] rounded-xl hover:bg-[#FFF9ED] transition-colors cursor-pointer"
          title="Refresh connection status"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* STATUS BADGE */}
      <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {status.connected ? (
            <div className="w-9 h-9 bg-emerald-100 text-emerald-700 border-2 border-[#171717] rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5px]" />
            </div>
          ) : (
            <div className="w-9 h-9 bg-amber-100 text-amber-700 border-2 border-[#171717] rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 stroke-[2.5px]" />
            </div>
          )}
          <div>
            <div className="text-xs font-black uppercase text-[#171717]">
              {status.connected ? 'Firebase Admin SDK Connected' : 'Connecting to Firebase...'}
            </div>
            <div className="text-[11px] font-semibold text-[#666666]">
              {status.connected
                ? 'Backend Admin SDK successfully authenticates with project aristrocrafts'
                : status.error || 'Check service account JSON credentials.'}
            </div>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 border-[#171717] ${
            status.connected ? 'bg-emerald-300 text-[#171717]' : 'bg-amber-300 text-[#171717]'
          }`}
        >
          {status.connected ? 'Live & Synced' : 'Checking'}
        </span>
      </div>

      {/* GOOGLE CLIENT ID CONFIGURATION */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase text-[#171717] flex items-center gap-1.5">
          <Key className="w-3.5 h-3.5 text-[#FF8A00]" />
          Google Cloud Web Client ID (Optional for Custom Domain OAuth)
        </label>
        <form onSubmit={handleSaveClientId} className="flex gap-2">
          <input
            type="text"
            value={customClientId}
            onChange={(e) => setCustomClientId(e.target.value)}
            placeholder="e.g. 16113429439-xxxxxx.apps.googleusercontent.com"
            className="flex-1 px-3 py-2 bg-white border-2 border-[#171717] rounded-xl text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#FFC43C] hover:bg-[#FF8A00] text-[#171717] border-2 border-[#171717] rounded-xl text-xs font-black uppercase shadow-[2px_2px_0px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            Save
          </button>
        </form>
        {savedSuccess && (
          <p className="text-[11px] font-bold text-emerald-600">Saved successfully!</p>
        )}
      </div>

      {/* FIREBASE SMTP GUIDE (EXPLAINING USER'S SCREENSHOT) */}
      <div className="p-4 bg-blue-50 border-2 border-[#171717] rounded-2xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-[#171717]">
          <Mail className="w-4 h-4 text-blue-600" />
          Firebase Console SMTP Settings গাইড
        </div>
        <p className="text-[11px] font-medium text-[#444444] leading-relaxed">
          Firebase Console-এর <strong>Authentication &gt; Templates &gt; SMTP settings</strong> অপশনে আপনি নিজের মেইল সার্ভারের তথ্য দিয়ে <strong>Enable</strong> করে নিতে পারেন। এতে Firebase এর পাসওয়ার্ড রিসেট ও ভেরিফিকেশন মেইলগুলো <code>info@aristrocrafts.com</code> ডোমেইন থেকে সরাসরি সেন্ড হবে:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono bg-white p-3 border border-[#171717]/20 rounded-xl">
          <div><strong className="text-[#171717]">Sender address:</strong> info@aristrocrafts.com</div>
          <div><strong className="text-[#171717]">SMTP server host:</strong> mail.aristrocrafts.com</div>
          <div><strong className="text-[#171717]">SMTP server port:</strong> 587 (TLS)</div>
          <div><strong className="text-[#171717]">SMTP username:</strong> info@aristrocrafts.com</div>
        </div>
      </div>
    </div>
  );
};
