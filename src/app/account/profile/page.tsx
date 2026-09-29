import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Building,
  Save,
  RefreshCw,
  Camera,
  Shield,
  KeyRound,
  Check,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useCustomerAuth } from '../../../context/CustomerAuthContext';
import { useRouter } from '../../../context/RouterContext';
import { PageMeta } from '../../../components/common/PageMeta';

const PRESET_AVATARS = [
  { id: 'maker', label: '3D Maker', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80' },
  { id: 'artisan', label: 'Artisan', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80' },
  { id: 'engineer', label: '3D Engineer', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=160&auto=format&fit=crop&q=80' },
  { id: 'designer', label: 'Creative Studio', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80' },
  { id: 'cyber', label: 'Tech Explorer', url: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=160&auto=format&fit=crop&q=80' },
  { id: 'builder', label: 'Craft Builder', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80' },
];

const CITY_ZONES = [
  'Inside Dhaka (৳80)',
  'Dhaka Suburbs (Savar, Gazipur, Narayanganj) (৳120)',
  'Outside Dhaka (All Bangladesh) (৳150)',
];

export default function AccountProfilePage() {
  const { user, profile, updateProfile, resetPassword, isLoading: authLoading } = useCustomerAuth();
  const { navigate } = useRouter();

  const [activeTab, setActiveTab] = useState<'profile' | 'address' | 'security'>('profile');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(CITY_ZONES[0]);
  const [avatarUrl, setAvatarUrl] = useState(PRESET_AVATARS[0].url);
  const [customAvatarInput, setCustomAvatarInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (profile) {
      setName(profile.name || '');
      setPhone(profile.phone || '');
      setAddress(profile.defaultDeliveryAddress || '');
      setCity(profile.city || CITY_ZONES[0]);
      if (profile.avatarUrl) {
        setAvatarUrl(profile.avatarUrl);
      }
    }
  }, [user, profile, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="w-full bg-[#FFF9ED] min-h-[70vh] py-16 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#FF8A00] animate-spin mx-auto" />
        <p className="text-xs font-black font-heading uppercase text-[#171717]">Loading account settings...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const { error } = await updateProfile({
      name,
      phone,
      defaultDeliveryAddress: address,
      city,
      avatarUrl: customAvatarInput.trim() || avatarUrl,
    });

    setIsSaving(false);

    if (error) {
      setStatusMessage({ type: 'error', text: error.message || 'Failed to update account settings.' });
    } else {
      setStatusMessage({ type: 'success', text: '✓ Account settings & profile updated successfully!' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSendPasswordReset = async () => {
    if (!user?.email) return;
    setIsResettingPassword(true);
    setStatusMessage(null);

    const { error } = await resetPassword(user.email);
    setIsResettingPassword(false);

    if (error) {
      setStatusMessage({ type: 'error', text: error.message || 'Could not send password reset request.' });
    } else {
      setStatusMessage({
        type: 'success',
        text: `✓ Password reset link has been dispatched to ${user.email}. Check your inbox or spam folder.`,
      });
    }
  };

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="Account Settings — ARISTROCRAFT 3D Prints"
        description="Manage your account profile, avatar logo, shipping addresses, and security settings."
      />

      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b-3 border-[#171717] pb-4">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => navigate('/account')}
              className="p-2.5 rounded-xl bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFC43C] transition-colors cursor-pointer"
              title="Return to Account Dashboard"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5px]" />
            </button>
            <div>
              <span className="text-[10px] font-black font-heading uppercase text-[#FF8A00] tracking-wider block">
                CUSTOMER PORTAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-heading uppercase text-[#171717]">
                Account Settings
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/account')}
            className="text-xs font-black font-heading uppercase text-[#171717] hover:text-[#FF8A00] underline underline-offset-4 cursor-pointer"
          >
            Dashboard
          </button>
        </div>

        {/* FEEDBACK STATUS ALERT */}
        {statusMessage && (
          <div
            className={`p-4 border-2.5 rounded-2xl text-xs font-black font-heading flex items-center gap-3 shadow-[3px_3px_0px_0px_#171717] animate-popIn ${
              statusMessage.type === 'success'
                ? 'bg-[#10B981]/15 border-[#10B981] text-[#065F46]'
                : 'bg-[#FF4D4D]/15 border-[#FF4D4D] text-[#991B1B]'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
            ) : (
              <Shield className="w-5 h-5 text-[#FF4D4D] shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* TABS SELECTOR */}
        <div className="flex items-center gap-2 border-b-2 border-[#171717]/15 pb-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-black font-heading uppercase tracking-wider border-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'profile'
                ? 'bg-[#FFC43C] border-[#171717] shadow-[2px_2px_0px_0px_#171717] text-[#171717]'
                : 'bg-white border-transparent text-[#6D6D6D] hover:text-[#171717]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Avatar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('address')}
            className={`px-4 py-2 rounded-xl text-xs font-black font-heading uppercase tracking-wider border-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'address'
                ? 'bg-[#FFC43C] border-[#171717] shadow-[2px_2px_0px_0px_#171717] text-[#171717]'
                : 'bg-white border-transparent text-[#6D6D6D] hover:text-[#171717]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Delivery Address</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl text-xs font-black font-heading uppercase tracking-wider border-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'security'
                ? 'bg-[#FFC43C] border-[#171717] shadow-[2px_2px_0px_0px_#171717] text-[#171717]'
                : 'bg-white border-transparent text-[#6D6D6D] hover:text-[#171717]'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Security & Auth</span>
          </button>
        </div>

        {/* MAIN FORM */}
        <form onSubmit={handleSave} className="space-y-6">

          {/* TAB 1: PROFILE & AVATAR LOGO */}
          {activeTab === 'profile' && (
            <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#171717] space-y-6">
              
              {/* AVATAR SELECTOR SECTION */}
              <div className="border-b-2 border-[#171717]/10 pb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-black font-heading uppercase text-[#171717] flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#FF8A00]" />
                      <span>Account Avatar / Logo</span>
                    </h2>
                    <p className="text-[11px] font-semibold text-[#6D6D6D]">
                      This round logo appears in your Navbar, Account header, and Reviews.
                    </p>
                  </div>
                  
                  {/* LIVE AVATAR PREVIEW */}
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full border-2.5 border-[#171717] overflow-hidden bg-[#FFC43C] shadow-[3px_3px_0px_0px_#171717] shrink-0">
                      <img
                        src={customAvatarInput.trim() || avatarUrl}
                        alt="Current Avatar"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* PRESET AVATARS GRID */}
                <div>
                  <label className="block text-[10px] font-black font-heading uppercase text-[#8C8C8C] mb-2">
                    Choose a 3D Craft Avatar
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {PRESET_AVATARS.map((item) => {
                      const isSelected = avatarUrl === item.url && !customAvatarInput.trim();
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setAvatarUrl(item.url);
                            setCustomAvatarInput('');
                          }}
                          className={`relative p-1.5 rounded-2xl border-2 transition-all cursor-pointer text-center group ${
                            isSelected
                              ? 'border-[#171717] bg-[#FFC43C]/40 shadow-[2px_2px_0px_0px_#171717]'
                              : 'border-[#171717]/20 hover:border-[#171717] bg-[#FFF9ED]'
                          }`}
                        >
                          <div className="w-11 h-11 mx-auto rounded-full overflow-hidden border border-[#171717] mb-1">
                            <img
                              src={item.url}
                              alt={item.label}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <span className="text-[9px] font-black font-heading uppercase text-[#171717] block truncate">
                            {item.label}
                          </span>
                          {isSelected && (
                            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center text-[9px] border border-[#171717]">
                              <Check className="w-2.5 h-2.5 stroke-[3px]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CUSTOM IMAGE URL */}
                <div>
                  <label className="block text-[10px] font-black font-heading uppercase text-[#8C8C8C] mb-1">
                    Or Use Custom Image URL / Photo Link
                  </label>
                  <input
                    type="url"
                    value={customAvatarInput}
                    onChange={(e) => setCustomAvatarInput(e.target.value)}
                    placeholder="https://example.com/my-avatar.jpg"
                    className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl px-3.5 py-2 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00]"
                  />
                </div>
              </div>

              {/* PERSONAL INFO FIELDS */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                    Account Email (Verified)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled
                      value={user?.email || ''}
                      className="w-full bg-[#F3F4F6] border-2 border-[#171717] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#4B5563] cursor-not-allowed"
                    />
                    <span className="absolute right-3 top-2.5 px-2 py-0.5 rounded-full bg-[#10B981] text-white text-[9px] font-black font-heading uppercase border border-[#171717]">
                      {profile?.provider || 'Verified'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00]"
                    />
                    <User className="w-4 h-4 text-[#8C8C8C] absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00]"
                    />
                    <Phone className="w-4 h-4 text-[#8C8C8C] absolute left-3 top-3" />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: DELIVERY ADDRESS */}
          {activeTab === 'address' && (
            <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#171717] space-y-5">
              <div>
                <h2 className="text-sm font-black font-heading uppercase text-[#171717] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF8A00]" />
                  <span>Default Shipping Address</span>
                </h2>
                <p className="text-[11px] font-semibold text-[#6D6D6D] mt-0.5">
                  Saved address auto-fills during checkout for fast 1-click ordering.
                </p>
              </div>

              <div>
                <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                  Full Street Address
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Apartment #, Road #, Sector / Ward, Landmark..."
                    className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl p-3 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00] resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                  Delivery City / Zone
                </label>
                <div className="space-y-2">
                  {CITY_ZONES.map((zone) => (
                    <label
                      key={zone}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        city === zone
                          ? 'border-[#171717] bg-[#FFC43C]/20 shadow-[2px_2px_0px_0px_#171717]'
                          : 'border-[#171717]/20 hover:border-[#171717] bg-[#FFF9ED]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="city_zone"
                        checked={city === zone}
                        onChange={() => setCity(zone)}
                        className="accent-[#FF8A00]"
                      />
                      <span className="text-xs font-black font-heading text-[#171717]">
                        {zone}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY & PASSWORD */}
          {activeTab === 'security' && (
            <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#171717] space-y-6">
              <div>
                <h2 className="text-sm font-black font-heading uppercase text-[#171717] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#FF8A00]" />
                  <span>Security & Credentials</span>
                </h2>
                <p className="text-[11px] font-semibold text-[#6D6D6D] mt-0.5">
                  Manage password reset and authentication methods for your account.
                </p>
              </div>

              <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black font-heading uppercase text-[#171717]">
                    Login Provider
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#FF8A00] text-white text-[10px] font-black font-heading uppercase border border-[#171717]">
                    {profile?.provider === 'google' ? 'Google OAuth' : 'Email & Password'}
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-[#6D6D6D]">
                  Signed in as <strong className="text-[#171717]">{user?.email}</strong>.
                </p>
              </div>

              <div className="border-t-2 border-[#171717]/10 pt-4 space-y-3">
                <h3 className="text-xs font-black font-heading uppercase text-[#171717]">
                  Reset Account Password
                </h3>
                <p className="text-xs font-semibold text-[#6D6D6D]">
                  Click the button below to receive an official password reset link directly to your email.
                </p>
                <button
                  type="button"
                  disabled={isResettingPassword}
                  onClick={handleSendPasswordReset}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FFC43C] text-[#171717] border-2 border-[#171717] font-black font-heading text-xs uppercase shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer flex items-center gap-2"
                >
                  {isResettingPassword ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending reset request...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-3.5 h-3.5 stroke-[2.5px] text-[#FF8A00]" />
                      <span>Send Password Reset Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-3.5 rounded-2xl bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] font-black font-heading text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[5px_5px_0px_0px_#171717] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 stroke-[2.5px]" />
                <span>Save Account Settings</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
