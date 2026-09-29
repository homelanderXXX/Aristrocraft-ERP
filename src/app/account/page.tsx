import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Package,
  Heart,
  Settings,
  LogOut,
  ArrowRight,
  Upload,
  ChevronRight,
  RefreshCw,
  MapPin,
  Phone,
  Edit,
} from 'lucide-react';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { useRouter } from '../../context/RouterContext';
import { customerRepository } from '../../lib/supabase/repositories/customerRepository';
import { DbOrder } from '../../lib/supabase/types';
import { PageMeta } from '../../components/common/PageMeta';

export default function AccountPage() {
  const { user, profile, signOut, isLoading: authLoading } = useCustomerAuth();
  const { navigate } = useRouter();

  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (profile?.id) {
      customerRepository.getCustomerOrders(profile.id).then((data) => {
        setOrders(data);
        setIsLoadingOrders(false);
      });
    } else {
      setIsLoadingOrders(false);
    }
  }, [user, profile, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="w-full bg-[#FFF9ED] min-h-[70vh] py-16 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#FF8A00] animate-spin mx-auto" />
        <p className="text-xs font-black font-heading uppercase text-[#171717]">Loading customer account...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-[80vh] py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="My Account — ARISTROCRAFT 3D Prints"
        description="Customer account portal for tracking orders and managing profiles at ARISTROCRAFT."
      />

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER & WELCOME CARD */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FFC43C] border-2.5 border-[#171717] overflow-hidden flex items-center justify-center shadow-[3px_3px_0px_0px_#171717] shrink-0">
              <img
                src={profile?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80'}
                alt={profile?.name || 'Account Avatar'}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF8A00] text-white text-[9px] font-black font-heading uppercase border border-[#171717]">
                  VERIFIED CUSTOMER
                </span>
                {profile?.provider && (
                  <span className="px-2 py-0.5 rounded-full bg-[#FFC43C] text-[#171717] text-[9px] font-black font-heading uppercase border border-[#171717]">
                    {profile.provider}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-heading uppercase text-[#171717] mt-0.5">
                Welcome, {profile?.name || user.email}
              </h1>
              <p className="text-xs font-semibold text-[#6D6D6D]">
                {user.email} • {profile?.phone || 'No phone added'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              await signOut();
              navigate('/');
            }}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FF4D4D] hover:text-white border-2 border-[#171717] text-xs font-black font-heading uppercase shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            <LogOut className="w-4 h-4 stroke-[2.5px]" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* ACCOUNT NAVIGATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <button
            type="button"
            onClick={() => navigate('/account/orders')}
            className="p-5 bg-white border-3 border-[#171717] rounded-2xl shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 transition-all cursor-pointer text-left space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] group-hover:scale-105 transition-transform">
              <Package className="w-5 h-5 stroke-[2.5px]" />
            </div>
            <div>
              <h3 className="text-sm font-black font-heading uppercase text-[#171717]">
                My Orders
              </h3>
              <p className="text-[11px] font-semibold text-[#6D6D6D] mt-0.5">
                View order history & track status
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-black font-heading text-[#FF8A00]">
              <span>{orders.length} Total Orders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/account/settings')}
            className="p-5 bg-white border-3 border-[#171717] rounded-2xl shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 transition-all cursor-pointer text-left space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF8A00] border-2 border-[#171717] flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#171717] group-hover:scale-105 transition-transform">
              <Settings className="w-5 h-5 stroke-[2.5px]" />
            </div>
            <div>
              <h3 className="text-sm font-black font-heading uppercase text-[#171717]">
                Account Settings
              </h3>
              <p className="text-[11px] font-semibold text-[#6D6D6D] mt-0.5">
                Manage profile, avatar & address
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-black font-heading text-[#FF8A00]">
              <span>Edit Settings</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/wishlist')}
            className="p-5 bg-white border-3 border-[#171717] rounded-2xl shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 transition-all cursor-pointer text-left space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF4D4D] border-2 border-[#171717] flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#171717] group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white stroke-white" />
            </div>
            <div>
              <h3 className="text-sm font-black font-heading uppercase text-[#171717]">
                Saved Wishlist
              </h3>
              <p className="text-[11px] font-semibold text-[#6D6D6D] mt-0.5">
                Your favorite prints & models
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-black font-heading text-[#FF8A00]">
              <span>View Wishlist</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/custom-print')}
            className="p-5 bg-white border-3 border-[#171717] rounded-2xl shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 transition-all cursor-pointer text-left space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#10B981] border-2 border-[#171717] flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#171717] group-hover:scale-105 transition-transform">
              <Upload className="w-5 h-5 stroke-[2.5px]" />
            </div>
            <div>
              <h3 className="text-sm font-black font-heading uppercase text-[#171717]">
                Custom Order
              </h3>
              <p className="text-[11px] font-semibold text-[#6D6D6D] mt-0.5">
                Submit 3D file for quote
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-black font-heading text-[#FF8A00]">
              <span>Request Quote</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

        </div>

        {/* RECENT ORDERS PREVIEW */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717] space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#171717]/10 pb-4">
            <div>
              <span className="text-[10px] font-black font-heading uppercase text-[#FF8A00] block">RECENT ACTIVITY</span>
              <h2 className="text-xl font-black font-heading uppercase text-[#171717]">
                Recent Orders ({orders.length})
              </h2>
            </div>
            {orders.length > 0 && (
              <button
                type="button"
                onClick={() => navigate('/account/orders')}
                className="text-xs font-black font-heading uppercase text-[#171717] hover:text-[#FF8A00] flex items-center gap-1 cursor-pointer"
              >
                <span>View All Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {isLoadingOrders ? (
            <div className="py-8 text-center text-xs font-bold text-[#6D6D6D]">
              Loading order history...
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  onClick={() => navigate(`/account/orders/${order.id}`)}
                  className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:border-[#FF8A00] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs text-[#171717]">{order.order_number}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#FFC43C] text-[9px] font-black font-heading uppercase border border-[#171717]">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-[#6D6D6D]">
                      Placed on {new Date(order.created_at).toLocaleDateString()} • {order.customer_name_snapshot}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-[#171717]/10 pt-2 sm:pt-0">
                    <span className="text-sm font-black font-heading text-[#171717]">
                      ৳{Number(order.total).toLocaleString()}
                    </span>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#171717] text-[10px] font-black font-heading uppercase shadow-[1.5px_1.5px_0px_0px_#171717]"
                    >
                      View Order Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <Package className="w-10 h-10 text-[#FF8A00] mx-auto opacity-70" />
              <p className="text-xs font-semibold text-[#525252]">
                You haven't placed any orders yet.
              </p>
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="px-5 py-2.5 rounded-full bg-[#FFC43C] text-[#171717] border-2 border-[#171717] text-xs font-black font-heading uppercase shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FF8A00] hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Browse Shop Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
              </button>
            </div>
          )}
        </div>

        {/* SAVED SHIPPING & CONTACT CARD */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#171717]/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#10B981] text-white flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#171717]">
                <MapPin className="w-4 h-4 stroke-[2.5px]" />
              </div>
              <div>
                <span className="text-[10px] font-black font-heading uppercase text-[#10B981] block">FAST 1-CLICK CHECKOUT</span>
                <h2 className="text-xl font-black font-heading uppercase text-[#171717]">
                  Saved Delivery & Contact Info
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/account/profile')}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading uppercase shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl space-y-1 shadow-[2px_2px_0px_0px_#171717]">
              <span className="text-[10px] font-black font-heading uppercase text-[#6D6D6D]">Contact Name & Email</span>
              <p className="text-sm font-black text-[#171717]">{profile?.name || user.email}</p>
              <p className="text-xs font-semibold text-[#6D6D6D]">{user.email}</p>
            </div>

            <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl space-y-1 shadow-[2px_2px_0px_0px_#171717]">
              <span className="text-[10px] font-black font-heading uppercase text-[#6D6D6D]">Contact Phone</span>
              <p className="text-sm font-black text-[#171717]">
                {profile?.phone || 'No phone saved yet'}
              </p>
              <p className="text-xs font-semibold text-[#6D6D6D]">
                {profile?.phone ? 'Auto-filled on checkout' : 'Add phone in profile settings'}
              </p>
            </div>

            <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl space-y-1 shadow-[2px_2px_0px_0px_#171717]">
              <span className="text-[10px] font-black font-heading uppercase text-[#6D6D6D]">Default Delivery Address</span>
              <p className="text-sm font-black text-[#171717] truncate">
                {profile?.defaultDeliveryAddress || 'No default address saved'}
              </p>
              <p className="text-xs font-semibold text-[#6D6D6D]">
                {profile?.city || 'Zone not selected'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
