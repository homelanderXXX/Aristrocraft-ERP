import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../../components/admin/AdminLayout';
import { useRouter } from '../../../../context/RouterContext';
import { orderRepository, OrderModel } from '../../../../lib/supabase/repositories/orderRepository';
import { OrderStatus } from '../../../../lib/supabase/types';
import {
  ArrowLeft,
  Clock,
  Printer,
  PackageCheck,
  Truck,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  MapPin,
  FileText,
  Save,
  Loader2,
  Printer as PrintIcon,
  Tag,
} from 'lucide-react';

export const AdminOrderDetailPage: React.FC = () => {
  const { navigate, params } = useRouter();
  const orderId = params.id;

  const [order, setOrder] = useState<OrderModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [noteSuccess, setNoteSuccess] = useState(false);

  const fetchOrderDetail = async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const data = await orderRepository.getOrderById(orderId);
      setOrder(data);
      if (data?.notes) {
        setAdminNotes(data.notes);
      }
    } catch (err) {
      console.warn('Error loading order details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!orderId || !order) return;
    setUpdatingStatus(true);
    try {
      const res = await orderRepository.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setOrder({ ...order, status: newStatus });
      } else {
        alert(`Failed to update status: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Error updating order status: ${err.message}`);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!orderId) return;
    setSavingNotes(true);
    setNoteSuccess(false);
    try {
      const res = await orderRepository.updateOrderNotes(orderId, adminNotes);
      if (res.success) {
        setNoteSuccess(true);
        setTimeout(() => setNoteSuccess(false), 3000);
      } else {
        alert(`Failed to save notes: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Error saving notes: ${err.message}`);
    } finally {
      setSavingNotes(false);
    }
  };

  const pipelineSteps: Array<{ id: OrderStatus; label: string; icon: any }> = [
    { id: 'pending', label: 'Pending', icon: Clock },
    { id: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
    { id: 'printing', label: '3D Printing', icon: Printer },
    { id: 'ready', label: 'Ready', icon: PackageCheck },
    { id: 'dispatched', label: 'Dispatched', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle2 },
  ];

  if (loading) {
    return (
      <AdminLayout currentTab="orders" title="ORDER DETAILS">
        <div className="py-20 text-center bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#171717]">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FF8A00] mb-2" />
          <p className="text-xs font-bold text-[#6D6D6D]">Loading order breakdown from Supabase...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout currentTab="orders" title="ORDER NOT FOUND">
        <div className="py-16 text-center bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#171717]">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-black font-heading uppercase text-[#171717]">Order Not Found</h2>
          <p className="text-xs font-semibold text-[#888888] mt-1 mb-6">
            The requested order ID does not exist or was removed.
          </p>
          <button
            type="button"
            onClick={() => navigate('/admin/orders')}
            className="px-6 py-3 bg-[#FF8A00] text-white text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] hover:translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Orders List</span>
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      currentTab="orders"
      title={`ORDER ${order.orderNumber}`}
      subtitle={`Placed on ${new Date(order.createdAt).toLocaleString('en-US')}`}
    >
      {/* BACK BUTTON & TOP BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          type="button"
          onClick={() => navigate('/admin/orders')}
          className="px-4 py-2 bg-white text-[#171717] text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] hover:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="px-4 py-2 bg-[#FFC43C] text-[#171717] text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] hover:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
        >
          <PrintIcon className="w-4 h-4" />
          <span>Print Packing Slip</span>
        </button>
      </div>

      {/* INTERACTIVE FULFILLMENT PIPELINE */}
      <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717] mb-8">
        <h2 className="text-sm font-black font-heading uppercase text-[#171717] mb-4">
          Fulfillment Status Pipeline
        </h2>

        {/* PIPELINE BUTTONS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
          {pipelineSteps.map((step) => {
            const Icon = step.icon;
            const isCurrent = order.status === step.id;

            return (
              <button
                key={step.id}
                type="button"
                disabled={updatingStatus}
                onClick={() => handleStatusChange(step.id)}
                className={`
                  p-3 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5
                  ${
                    isCurrent
                      ? 'bg-[#FF8A00] text-white border-[#171717] shadow-[3px_3px_0px_0px_#171717] scale-102'
                      : 'bg-[#FFF9ED] text-[#171717] border-[#171717]/30 hover:border-[#171717]'
                  }
                `}
              >
                <Icon className="w-5 h-5 stroke-[2.5px]" />
                <span className="text-[11px] font-black font-heading uppercase">{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* CANCEL ORDER ACTION */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
          <span className="text-xs font-bold text-[#666666]">
            Current Status: <strong className="uppercase text-[#171717]">{order.status}</strong>
          </span>

          {order.status !== 'cancelled' ? (
            <button
              type="button"
              disabled={updatingStatus}
              onClick={() => {
                if (window.confirm('Are you sure you want to mark this order as CANCELLED?')) {
                  handleStatusChange('cancelled');
                }
              }}
              className="px-3 py-1.5 bg-red-100 text-red-800 text-[11px] font-black uppercase rounded-xl border border-red-300 hover:bg-red-200 cursor-pointer"
            >
              Cancel Order
            </button>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-red-600 text-white border border-[#171717]">
              Order Cancelled
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: ORDER ITEMS & FINANCIALS */}
        <div className="lg:col-span-2 space-y-8">
          {/* ORDERED ITEMS LIST */}
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] pb-4 border-b-2 border-[#171717] mb-4">
              Ordered Items ({order.items?.length || 0})
            </h2>

            {!order.items || order.items.length === 0 ? (
              <p className="text-xs text-[#888888] py-4">No item snapshot records attached.</p>
            ) : (
              <div className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <div key={item.id} className="py-4 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-12 h-12 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl flex items-center justify-center font-black text-xl shrink-0">
                        📦
                      </div>
                      <div>
                        <h3 className="font-black text-sm text-[#171717]">
                          {item.product_name_snapshot}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {item.selected_color && (
                            <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-[#444444] border border-gray-300">
                              Color: {item.selected_color}
                            </span>
                          )}
                          {item.selected_size && (
                            <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-[#444444] border border-gray-300">
                              Size: {item.selected_size}
                            </span>
                          )}
                          {item.selected_material && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-[10px] font-bold text-amber-900 border border-amber-300">
                              Material: {item.selected_material}
                            </span>
                          )}
                        </div>

                        {item.personalization_text && (
                          <div className="mt-2 p-2 bg-[#FFF9ED] border border-[#171717] rounded-xl text-xs font-semibold text-[#171717]">
                            <strong className="text-[#FF8A00] uppercase text-[10px] block">Personalization Note:</strong>
                            "{item.personalization_text}"
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-mono text-xs font-bold text-[#555555]">
                        ৳{item.unit_price} × {item.quantity}
                      </p>
                      <p className="font-black text-sm text-[#171717] mt-0.5">
                        ৳{item.line_total}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FINANCIAL SUMMARY */}
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] pb-4 border-b-2 border-[#171717] mb-4">
              Payment & Total Breakdown
            </h2>

            <div className="space-y-3 text-xs font-bold text-[#444444]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#171717]">৳{order.subtotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery Fee</span>
                <span className="font-mono text-[#171717]">৳{order.deliveryFee}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex items-center justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-mono">-৳{order.discount}</span>
                </div>
              )}
              <div className="pt-3 border-t-2 border-[#171717] flex items-center justify-between text-base font-black text-[#171717]">
                <span className="font-heading uppercase">Grand Total (COD)</span>
                <span className="font-mono text-xl text-[#FF8A00]">৳{order.total} BDT</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CUSTOMER DETAILS & ADMIN NOTES */}
        <div className="space-y-8">
          {/* CUSTOMER INFORMATION CARD */}
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
            <h2 className="text-lg font-black font-heading uppercase text-[#171717] pb-4 border-b-2 border-[#171717] mb-4">
              Customer Details
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase text-[#888888]">Full Name</p>
                <p className="text-sm font-black text-[#171717] mt-0.5">{order.customerName}</p>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase text-[#888888]">Phone Number</p>
                <a
                  href={`tel:${order.customerPhone}`}
                  className="text-xs font-black text-[#FF8A00] underline flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{order.customerPhone}</span>
                </a>
              </div>

              {order.customerEmail && (
                <div>
                  <p className="text-[10px] font-black uppercase text-[#888888]">Email Address</p>
                  <a
                    href={`mailto:${order.customerEmail}`}
                    className="text-xs font-bold text-[#171717] underline flex items-center gap-1.5 mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{order.customerEmail}</span>
                  </a>
                </div>
              )}

              <div>
                <p className="text-[10px] font-black uppercase text-[#888888]">Delivery Address</p>
                <div className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl mt-1 text-xs font-bold text-[#171717] flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#FF8A00] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-black">{order.city || 'Standard City'}</span>
                    <span className="block text-[#555555] font-normal">{order.deliveryAddress}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INTERNAL ADMIN NOTES */}
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#171717] mb-4">
              <h2 className="text-lg font-black font-heading uppercase text-[#171717]">
                Internal Studio Notes
              </h2>
              <FileText className="w-5 h-5 text-[#FF8A00]" />
            </div>

            <textarea
              rows={4}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Record printer settings, tracking IDs, or customer call notes..."
              className="w-full p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-semibold text-[#171717] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
            />

            <button
              type="button"
              disabled={savingNotes}
              onClick={handleSaveNotes}
              className="w-full mt-3 py-2.5 bg-[#171717] text-white text-xs font-black font-heading uppercase tracking-wider rounded-2xl border-2 border-[#171717] hover:bg-[#FF8A00] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {savingNotes ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Internal Notes</span>
                </>
              )}
            </button>

            {noteSuccess && (
              <p className="text-[11px] font-bold text-emerald-600 text-center mt-2">
                ✓ Admin notes saved to database!
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
