import React, { useState, useEffect } from 'react';
import { Package, ArrowLeft, ArrowRight, RefreshCw, ChevronRight } from 'lucide-react';
import { useCustomerAuth } from '../../../context/CustomerAuthContext';
import { useRouter } from '../../../context/RouterContext';
import { customerRepository } from '../../../lib/supabase/repositories/customerRepository';
import { DbOrder } from '../../../lib/supabase/types';
import { PageMeta } from '../../../components/common/PageMeta';

export default function AccountOrdersPage() {
  const { user, profile, isLoading: authLoading } = useCustomerAuth();
  const { navigate } = useRouter();

  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (profile?.id) {
      customerRepository.getCustomerOrders(profile.id).then((data) => {
        setOrders(data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [user, profile, authLoading, navigate]);

  if (authLoading || isLoading) {
    return (
      <div className="w-full bg-[#FFF9ED] min-h-[70vh] py-16 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#FF8A00] animate-spin mx-auto" />
        <p className="text-xs font-black font-heading uppercase text-[#171717]">Loading order history...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-[80vh] py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="My Orders — ARISTROCRAFT 3D Prints"
        description="View past order history and order statuses at ARISTROCRAFT."
      />

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b-3 border-[#171717] pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/account')}
              className="p-2.5 rounded-xl bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFC43C] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5px]" />
            </button>
            <div>
              <span className="text-[10px] font-black font-heading uppercase text-[#FF8A00] block">CUSTOMER PORTAL</span>
              <h1 className="text-2xl sm:text-3xl font-black font-heading uppercase text-[#171717]">
                My Order History ({orders.length})
              </h1>
            </div>
          </div>
        </div>

        {/* ORDERS LIST */}
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/account/orders/${order.id}`)}
                className="bg-white border-3 border-[#171717] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 transition-all cursor-pointer space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-[#171717]/10 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-[#171717]">{order.order_number}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFC43C] text-[10px] font-black font-heading uppercase border border-[#171717]">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#6D6D6D]">
                      Placed on {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs font-black font-heading uppercase text-[#6D6D6D] block">TOTAL</span>
                    <span className="text-lg font-black font-heading text-[#FF8A00]">
                      ৳{Number(order.total).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#171717]">
                  <span>Delivery Address: {order.delivery_address_snapshot}</span>
                  <div className="flex items-center gap-1 font-black font-heading uppercase text-[#FF8A00]">
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-10 text-center space-y-4 shadow-[6px_6px_0px_0px_#171717]">
            <Package className="w-12 h-12 text-[#FF8A00] mx-auto opacity-70" />
            <h2 className="text-xl font-black font-heading uppercase text-[#171717]">No Orders Found</h2>
            <p className="text-xs font-semibold text-[#525252]">You haven't placed any 3D print orders on this account yet.</p>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="px-6 py-3 rounded-full bg-[#FFC43C] text-[#171717] border-2 border-[#171717] font-black font-heading text-xs uppercase shadow-[3px_3px_0px_0px_#171717] hover:bg-[#FF8A00] hover:text-white transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Shop Catalog</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
