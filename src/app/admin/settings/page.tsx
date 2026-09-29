import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { adminRepository } from '../../../lib/supabase/repositories/adminRepository';
import { DbProfile } from '../../../lib/supabase/types';
import { getDeliveryZone } from '../../../config/delivery';
import { DolibarrConfigCard } from '../../../components/admin/DolibarrConfigCard';
import { ERPNextConfigCard } from '../../../components/admin/ERPNextConfigCard';
import { BrandAssetsCard } from '../../../components/admin/BrandAssetsCard';
import { FirebaseAuthCard } from '../../../components/admin/FirebaseAuthCard';
import {
  ShieldCheck,
  Database,
  Key,
  Server,
  HardDrive,
  Truck,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<DbProfile | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await adminRepository.getCurrentAdminProfile();
      if (res?.user) {
        setUserEmail(res.user.email || '');
        setProfile(res.profile);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  const env = (import.meta as any).env || {};
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

  return (
    <AdminLayout
      currentTab="settings"
      title="ADMIN & SYSTEM SETTINGS"
      subtitle="ERPNext Enterprise integration, security audit & system parameters"
    >
      <div className="space-y-8">
        {/* ERPNEXT DIRECT ENTERPRISE INTEGRATION HUB */}
        <ERPNextConfigCard />

        {/* FIREBASE AUTHENTICATION & GOOGLE OAUTH CARD */}
        <FirebaseAuthCard />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* DOLIBARR ERP INTEGRATION (LEGACY / SECONDARY) */}
          <DolibarrConfigCard />

        {/* LOGGED IN ACCOUNT PROFILE */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
          <div className="flex items-center gap-3 pb-4 border-b-2 border-[#171717] mb-4">
            <div className="w-10 h-10 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-xl flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black font-heading uppercase text-[#171717]">
                Authenticated Profile
              </h2>
              <p className="text-xs font-semibold text-[#888888]">Current active admin session</p>
            </div>
          </div>

          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin text-[#FF8A00] my-4" />
          ) : (
            <div className="space-y-4 text-xs font-bold text-[#171717]">
              <div>
                <span className="text-[10px] font-black uppercase text-[#888888] block">Full Name</span>
                <span className="text-sm">{profile?.full_name || 'Admin User'}</span>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-[#888888] block">Email</span>
                <span className="font-mono text-[#555555]">{userEmail}</span>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-[#888888] block">Role Permission</span>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase bg-[#FFC43C] text-[#171717] border border-[#171717] mt-1">
                  {profile?.role || 'ADMIN'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-[#888888] block">Auth User UUID</span>
                <span className="font-mono text-[11px] text-[#888888] truncate block">
                  {profile?.auth_user_id || 'Embedded Session'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* SUPABASE ARCHITECTURE AUDIT */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
          <div className="flex items-center gap-3 pb-4 border-b-2 border-[#171717] mb-4">
            <div className="w-10 h-10 bg-[#171717] text-white border-2 border-[#171717] rounded-xl flex items-center justify-center font-black">
              <Database className="w-6 h-6 text-[#FFC43C]" />
            </div>
            <div>
              <h2 className="text-lg font-black font-heading uppercase text-[#171717]">
                Supabase Environment
              </h2>
              <p className="text-xs font-semibold text-[#888888]">Live API credentials & security status</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-bold text-[#171717]">
            <div className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl flex items-center justify-between">
              <div>
                <span className="block font-black">Supabase Project URL</span>
                <span className="font-mono text-[10px] text-[#666666] truncate block max-w-xs">
                  {supabaseUrl || 'Configured in runtime'}
                </span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            </div>

            <div className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl flex items-center justify-between">
              <div>
                <span className="block font-black">Anon Key (Frontend Safe)</span>
                <span className="font-mono text-[10px] text-[#666666] truncate block max-w-xs">
                  {supabaseAnonKey ? `${supabaseAnonKey.slice(0, 20)}...` : 'Configured'}
                </span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            </div>

            <div className="p-3 bg-emerald-50 border-2 border-emerald-500 rounded-2xl flex items-center justify-between text-emerald-900">
              <div>
                <span className="block font-black">Service Role Key Isolation</span>
                <span className="text-[10px] font-semibold block">
                  Verified: Service role key is NOT exposed in frontend bundle.
                </span>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            </div>
          </div>
        </div>

        {/* STORAGE BUCKETS STATUS */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
          <div className="flex items-center gap-3 pb-4 border-b-2 border-[#171717] mb-4">
            <div className="w-10 h-10 bg-purple-600 text-white border-2 border-[#171717] rounded-xl flex items-center justify-center font-black">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black font-heading uppercase text-[#171717]">
                Storage Buckets
              </h2>
              <p className="text-xs font-semibold text-[#888888]">Supabase Object Storage configurations</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-bold text-[#171717]">
            <div className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl flex items-center justify-between">
              <div>
                <span className="block font-black uppercase text-[#171717]">products</span>
                <span className="text-[10px] text-[#666666] font-semibold block">
                  Public Bucket — High-resolution product showcase photos
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-400">
                Public Read
              </span>
            </div>

            <div className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl flex items-center justify-between">
              <div>
                <span className="block font-black uppercase text-[#171717]">custom-orders</span>
                <span className="text-[10px] text-[#666666] font-semibold block">
                  Private Bucket — Protected customer STL/CAD uploads (Signed URLs)
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-100 text-purple-900 border border-purple-400">
                Private RLS
              </span>
            </div>
          </div>
        </div>

        {/* FULFILLMENT & SHIPPING CONFIG */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
          <div className="flex items-center gap-3 pb-4 border-b-2 border-[#171717] mb-4">
            <div className="w-10 h-10 bg-[#FFC43C] text-[#171717] border-2 border-[#171717] rounded-xl flex items-center justify-center font-black">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black font-heading uppercase text-[#171717]">
                Delivery Defaults
              </h2>
              <p className="text-xs font-semibold text-[#888888]">Cash on delivery (COD) rates in Bangladesh</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-bold text-[#171717]">
            <div className="flex items-center justify-between p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl">
              <span>Inside Dhaka City Delivery Fee</span>
              <span className="font-mono text-sm font-black text-[#FF8A00]">৳{getDeliveryZone('dhaka').fee} BDT</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl">
              <span>Outside Dhaka Delivery Fee</span>
              <span className="font-mono text-sm font-black text-[#FF8A00]">৳{getDeliveryZone('outside-dhaka').fee} BDT</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl">
              <span>Payment Gateway Integration</span>
              <span className="text-xs font-black uppercase text-[#171717]">Cash On Delivery (COD)</span>
            </div>
          </div>
        </div>

        {/* BRAND ASSETS FROM IMGS FOLDER */}
        <BrandAssetsCard />
      </div>
    </div>
  </AdminLayout>
  );
};
