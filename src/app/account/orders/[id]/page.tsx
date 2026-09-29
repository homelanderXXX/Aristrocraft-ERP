import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle2, RefreshCw } from 'lucide-react';
import { useCustomerAuth } from '../../../../context/CustomerAuthContext';
import { useRouter } from '../../../../context/RouterContext';
import { customerRepository } from '../../../../lib/supabase/repositories/customerRepository';
import { DbOrder, DbOrderItem } from '../../../../lib/supabase/types';
import { PageMeta } from '../../../../components/common/PageMeta';

export function AccountOrderDetailPage({ orderId }: { orderId?: string }) {
  const { user, profile, isLoading: authLoading } = useCustomerAuth();
  const { navigate, params } = useRouter();

  const id = orderId || params.id;

  const [order, setOrder] = useState<DbOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (profile?.id && id) {
      customerRepository.getCustomerOrders(profile.id).then((orders) => {
        const found = orders.find((o) => o.id === id || o.order_number === id);
        setOrder(found || null);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [user, profile, authLoading, id, navigate]);

  if (authLoading || isLoading) {
    return (
      <div className="w-full bg-[#FFF9ED] min-h-[70vh] py-16 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#FF8A00] animate-spin mx-auto" />
        <p className="text-xs font-black font-heading uppercase text-[#171717]">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="w-full bg-[#FFF9ED] min-h-[70vh] py-12 px-4 text-center space-y-4">
        <Package className="w-12 h-12 text-[#FF4D4D] mx-auto" />
        <h2 className="text-2xl font-black font-heading uppercase text-[#171717]">Order Not Found</h2>
        <p className="text-xs font-semibold text-[#6D6D6D]">This order does not exist or you do not have permission to view it.</p>
        <button
          type="button"
          onClick={() => navigate('/account/orders')}
          className="px-5 py-2.5 rounded-full bg-[#FFC43C] text-[#171717] border-2 border-[#171717] font-black font-heading text-xs uppercase shadow-[2px_2px_0px_0px_#171717]"
        >
          Back to Order History
        </button>
      </div>
    );
  }

  const items = (order.order_items || []) as unknown as DbOrderItem[];

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-[80vh] py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title={`Order ${order.order_number} — ARISTROCRAFT`}
        description={`Order breakdown for ${order.order_number}`}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b-3 border-[#171717] pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/account/orders')}
              className="p-2.5 rounded-xl bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFC43C] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5px]" />
            </button>
            <div>
              <span className="text-[10px] font-black font-heading uppercase text-[#FF8A00] block">ORDER DETAILS</span>
              <h1 className="text-2xl font-black font-heading uppercase text-[#171717]">
                {order.order_number}
              </h1>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading uppercase shadow-[2px_2px_0px_0px_#171717]">
            {order.status}
          </span>
        </div>

        {/* ORDER SUMMARY CARD */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717] space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b-2 border-[#171717]/10 pb-4 text-xs font-bold text-[#171717]">
            <div>
              <span className="text-[10px] font-black font-heading uppercase text-[#FF8A00] block mb-1">CUSTOMER INFO</span>
              <p>{order.customer_name_snapshot}</p>
              <p className="text-[#6D6D6D]">{order.customer_phone_snapshot}</p>
              <p className="text-[#6D6D6D]">{order.customer_email_snapshot}</p>
            </div>
            <div>
              <span className="text-[10px] font-black font-heading uppercase text-[#FF8A00] block mb-1">DELIVERY ADDRESS</span>
              <p>{order.delivery_address_snapshot}</p>
              <p className="text-[#6D6D6D]">{order.delivery_city_snapshot || 'Inside/Outside Dhaka'}</p>
            </div>
          </div>

          {/* LINE ITEMS */}
          <div>
            <h3 className="text-xs font-black font-heading uppercase text-[#171717] mb-3">
              Order Items ({items.length})
            </h3>
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl flex items-center justify-between text-xs font-bold"
                >
                  <div className="space-y-0.5">
                    <span className="font-black text-[#171717]">{item.product_name_snapshot}</span>
                    <p className="text-[10px] text-[#6D6D6D]">
                      Qty: {item.quantity} × ৳{Number(item.unit_price).toLocaleString()}
                      {item.selected_color && ` • Color: ${item.selected_color}`}
                      {item.selected_material && ` • Material: ${item.selected_material}`}
                    </p>
                  </div>
                  <span className="font-black text-[#FF8A00]">
                    ৳{Number(item.line_total).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TOTALS */}
          <div className="pt-4 border-t-2 border-[#171717]/10 space-y-1.5 text-xs font-bold text-[#171717]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{Number(order.subtotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>৳{Number(order.delivery_fee).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-black font-heading text-[#FF8A00] pt-2 border-t border-[#171717]/10">
              <span>Grand Total</span>
              <span>৳{Number(order.total).toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AccountOrderDetailPage;
