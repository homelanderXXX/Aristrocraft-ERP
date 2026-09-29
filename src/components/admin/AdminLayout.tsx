import React, { useEffect, useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { adminRepository } from '../../lib/supabase/repositories/adminRepository';
import { DbProfile } from '../../lib/supabase/types';
import {
  LayoutDashboard,
  ShoppingBag,
  Box,
  FolderTree,
  FileText,
  Users,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  Loader2,
  ChevronRight,
  ExternalLink,
  Server,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  currentTab: 'dashboard' | 'orders' | 'products' | 'categories' | 'custom-orders' | 'customers' | 'reviews' | 'settings';
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  currentTab,
}) => {
  const { navigate, pathname } = useRouter();
  const [profile, setProfile] = useState<DbProfile | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const result = await adminRepository.getCurrentAdminProfile();
        if (!isMounted) return;

        if (!result || !result.user) {
          navigate('/admin/login');
          return;
        }

        setUserEmail(result.user.email || '');
        setProfile(result.profile);
      } catch (err) {
        console.warn('Admin auth check failed:', err);
        navigate('/admin/login');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [navigate, pathname]);

  const handleLogout = async () => {
    await adminRepository.logoutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { id: 'products', label: 'Products', href: '/admin/products', icon: Box },
    { id: 'categories', label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { id: 'custom-orders', label: 'Custom Requests', href: '/admin/custom-orders', icon: FileText },
    { id: 'customers', label: 'Customers', href: '/admin/customers', icon: Users },
    { id: 'reviews', label: 'Reviews', href: '/admin/reviews', icon: Star },
    { id: 'settings', label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9ED] flex flex-col items-center justify-center p-6">
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#171717] text-center max-w-sm w-full">
          <div className="w-14 h-14 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_0px_#171717]">
            <Loader2 className="w-7 h-7 animate-spin stroke-[2.5px]" />
          </div>
          <h2 className="text-xl font-black font-heading uppercase text-[#171717]">
            VERIFYING ADMIN AUTH
          </h2>
          <p className="text-xs font-semibold text-[#6D6D6D] mt-2">
            Securing access to ARISTROCRAFT Control Center...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#171717] flex flex-col lg:flex-row font-sans">
      {/* MOBILE TOPBAR */}
      <header className="lg:hidden bg-[#171717] text-white p-4 border-b-3 border-[#171717] flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div>
            <span className="text-xs font-black font-heading text-[#FFC43C] tracking-wider uppercase block">
              ARISTROCRAFT
            </span>
            <span className="text-[10px] font-bold uppercase text-white/70 tracking-widest block">
              ADMIN CONTROL
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-xs font-bold bg-[#FF8A00] text-white px-3 py-1.5 rounded-xl border border-white flex items-center gap-1 cursor-pointer"
        >
          <span>Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* DESKTOP & MOBILE SIDEBAR */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#171717] text-white p-5 flex flex-col justify-between
          transition-transform duration-200 border-r-3 border-[#171717]
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div>
          {/* BRAND LOGO BADGE */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-white/10">
            <div className="flex items-center gap-3">
              <img
                src="/brand/logo.png"
                alt="AristroCraft"
                className="h-11 w-auto object-contain shrink-0"
              />
              <div>
                <h1 className="text-sm font-extrabold font-heading uppercase text-white tracking-tight">
                  ARISTROCRAFT
                </h1>
                <p className="text-[9px] font-bold text-[#FFC43C] uppercase tracking-widest">
                  3D PRINT STUDIO HQ
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* USER PROFILE INFO CARD */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 mb-6 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <p className="text-xs font-black text-white truncate">
                {profile?.full_name || userEmail.split('@')[0] || 'Admin'}
              </p>
              <p className="text-[10px] text-white/60 truncate">{userEmail}</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FFC43C] text-[#171717] shrink-0 border border-[#171717]">
              {profile?.role || 'ADMIN'}
            </span>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    navigate(item.href);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-2xl font-heading font-black text-xs uppercase tracking-wider
                    transition-all duration-150 cursor-pointer border-2
                    ${
                      isActive
                        ? 'bg-[#FF8A00] text-white border-white shadow-[3px_3px_0px_0px_#FFC43C]'
                        : 'bg-transparent text-white/80 border-transparent hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 stroke-[2.5px]" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'rotate-90' : ''}`} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM SIDEBAR ACTIONS */}
        <div className="pt-6 border-t-2 border-white/10 space-y-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Public Website</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/30 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* DESKTOP HEADER */}
        <header className="hidden lg:flex bg-white border-b-3 border-[#171717] px-8 py-5 items-center justify-between shadow-xs">
          <div>
            <h1 className="text-2xl font-black font-heading uppercase text-[#171717] tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs font-semibold text-[#6D6D6D] mt-0.5">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/settings')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-[#0070F3]/10 text-[#0070F3] border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#0070F3]/20 cursor-pointer transition-colors"
              title="Configure ERPNext Integration"
            >
              <Server className="w-3.5 h-3.5 text-[#0070F3]" />
              <span>ERPNEXT v15</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-xs font-black uppercase tracking-wider bg-[#FF8A00] text-white px-4 py-2 rounded-2xl border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#171717] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>PUBLIC STOREFRONT</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
