import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Printer,
  PackageCheck,
  Truck,
  MapPin,
  XCircle,
  AlertCircle,
  ShoppingBag,
  Phone,
  User,
  Calendar,
  ArrowRight,
  Copy,
  Check,
  RefreshCw,
  HelpCircle,
  FileText,
  LifeBuoy,
  ShieldCheck,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { orderRepository, TrackedOrderModel } from '../../lib/supabase/repositories/orderRepository';
import { OrderStatus } from '../../lib/supabase/types';
import { ERPNextInvoiceModal } from '../../components/invoice/ERPNextInvoiceModal';
import { SupportTicketModal } from '../../components/support/SupportTicketModal';

interface StatusStep {
  key: OrderStatus;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const TIMELINE_STEPS: StatusStep[] = [
  {
    key: 'pending',
    label: 'Order Received',
    sublabel: 'Awaiting slicing & queue confirmation',
    icon: Clock,
  },
  {
    key: 'confirmed',
    label: 'Order Confirmed',
    sublabel: 'Filament & print parameters staged',
    icon: CheckCircle2,
  },
  {
    key: 'printing',
    label: '3D Printing',
    sublabel: 'Printing on high-precision Bambu Lab cluster',
    icon: Printer,
  },
  {
    key: 'ready',
    label: 'Quality Checked & Ready',
    sublabel: 'Inspected, cleaned & securely packaged',
    icon: PackageCheck,
  },
  {
    key: 'dispatched',
    label: 'Dispatched',
    sublabel: 'Handed over to delivery courier',
    icon: Truck,
  },
  {
    key: 'delivered',
    label: 'Delivered',
    sublabel: 'Successfully delivered to customer',
    icon: MapPin,
  },
];

const STATUS_ORDER_MAP: Record<string, number> = {
  pending: 0,
  confirmed: 1,
  printing: 2,
  ready: 3,
  dispatched: 4,
  shipped: 4, // Aliased to dispatched step
  delivered: 5,
};

export default function OrderTrackingPage() {
  const { params, navigate } = useRouter();

  const [orderNumber, setOrderNumber] = useState(params.orderNumber || '');
  const [phone, setPhone] = useState(params.phone || '');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackedOrder, setTrackedOrder] = useState<TrackedOrderModel | null>(null);
  const [copied, setCopied] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  // Auto-search if query params are present in URL
  useEffect(() => {
    if (params.orderNumber && params.phone) {
      setOrderNumber(params.orderNumber);
      setPhone(params.phone);
      executeSearch(params.orderNumber, params.phone);
    }
  }, [params.orderNumber, params.phone]);

  const executeSearch = async (numToSearch: string, phoneToSearch: string) => {
    if (!numToSearch.trim()) {
      setError('Please enter your Order Number (e.g. AC-260821-4891).');
      return;
    }
    if (!phoneToSearch.trim()) {
      setError('Please enter the Phone Number used during checkout.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTrackedOrder(null);

    try {
      const { order, error: trackError } = await orderRepository.trackOrder(
        numToSearch,
        phoneToSearch
      );

      if (trackError || !order) {
        setError(trackError || 'No order found matching those credentials.');
      } else {
        setTrackedOrder(order);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error retrieving order status.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(orderNumber, phone);
  };

  const handleCopyOrderDetails = () => {
    if (!trackedOrder) return;
    const text = `ARISTROCRAFT Order #${trackedOrder.orderNumber}\nStatus: ${trackedOrder.status.toUpperCase()}\nTotal: ৳${trackedOrder.total.toLocaleString()} BDT\nCustomer: ${trackedOrder.customerName}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentStepIndex = trackedOrder ? (STATUS_ORDER_MAP[trackedOrder.status] ?? 0) : 0;
  const isCancelled = trackedOrder?.status === 'cancelled';

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* ================================================== */}
        {/* HEADER & BREADCRUMB */}
        {/* ================================================== */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading tracking-widest uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] mb-3">
            <span>LIVE STUDIO QUEUE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading uppercase text-[#171717] tracking-tight mb-2">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#525252] max-w-md mx-auto">
            Check live 3D print queue progress, package status, and delivery details.
          </p>
        </div>

        {/* ================================================== */}
        {/* SEARCH FORM CARD */}
        {/* ================================================== */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717] mb-10">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-end">
            
            <div className="md:col-span-5">
              <label htmlFor="track-order-num" className="block text-xs font-black font-heading uppercase text-[#171717] mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>Order Number</span>
              </label>
              <input
                id="track-order-num"
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. AC-260821-4891"
                className="w-full bg-[#FFF9ED] border-2.5 border-[#171717] rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-[#171717] placeholder:text-[#A3A3A3] shadow-[2px_2px_0px_0px_#171717] outline-none focus:border-[#FF8A00]"
              />
            </div>

            <div className="md:col-span-4">
              <label htmlFor="track-phone" className="block text-xs font-black font-heading uppercase text-[#171717] mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>Phone Number</span>
              </label>
              <input
                id="track-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 01712345678"
                className="w-full bg-[#FFF9ED] border-2.5 border-[#171717] rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-[#171717] placeholder:text-[#A3A3A3] shadow-[2px_2px_0px_0px_#171717] outline-none focus:border-[#FF8A00]"
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-5 rounded-xl bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] font-black font-heading text-xs sm:text-sm uppercase tracking-wider shadow-[3px_3px_0px_0px_#171717] hover:shadow-[4px_4px_0px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#171717] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 stroke-[3px]" />
                    <span>Track Order</span>
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Quick Info & Hint */}
          <div className="mt-4 pt-4 border-t border-[#171717]/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-[#6D6D6D]">
            <span>💡 Enter your Order Number and phone number used during checkout to track live progress.</span>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="text-[#FF8A00] hover:underline flex items-center gap-1 font-black cursor-pointer"
            >
              <span>Back to Store</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* ================================================== */}
        {/* LOADING STATE */}
        {/* ================================================== */}
        {isLoading && (
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-10 text-center shadow-[8px_8px_0px_0px_#171717] animate-pulse">
            <div className="w-16 h-16 rounded-2xl bg-[#FFC43C] border-2.5 border-[#171717] text-[#171717] flex items-center justify-center text-2xl mx-auto mb-4 shadow-[3px_3px_0px_0px_#171717]">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>
            <h3 className="text-xl font-black font-heading uppercase text-[#171717] mb-1">
              Checking Studio Queue...
            </h3>
            <p className="text-xs font-semibold text-[#525252]">
              Retrieving live print parameters and status for your order.
            </p>
          </div>
        )}

        {/* ================================================== */}
        {/* ERROR / INVALID ORDER STATE */}
        {/* ================================================== */}
        {!isLoading && error && (
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_0px_#EF4444] text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#FEE2E2] border-2.5 border-[#171717] text-[#EF4444] flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_0px_#171717]">
              <AlertCircle className="w-8 h-8 stroke-[2.5px]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading uppercase text-[#171717] mb-2">
              Order Not Found
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#525252] max-w-md mx-auto mb-6">
              {error}
            </p>
            <div className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-4 max-w-md mx-auto text-left text-xs font-bold text-[#171717] space-y-2 mb-6">
              <p className="font-black text-[#FF8A00] uppercase text-[11px] flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Troubleshooting Tips:</span>
              </p>
              <ul className="list-disc list-inside space-y-1 text-[#525252]">
                <li>Verify your Order Number format (e.g., <code className="font-mono text-[#171717] bg-white px-1.5 py-0.5 rounded border border-[#171717]">AC-260821-4891</code>).</li>
                <li>Ensure the phone number matches the one provided at checkout.</li>
                <li>Check your order confirmation message or WhatsApp receipt.</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => {
                setError(null);
                setOrderNumber('');
                setPhone('');
              }}
              className="px-6 py-2.5 rounded-full bg-[#171717] text-white text-xs font-black font-heading uppercase tracking-wider hover:bg-[#FF8A00] transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ================================================== */}
        {/* SUCCESSFUL TRACKING RESULT VIEW */}
        {/* ================================================== */}
        {!isLoading && trackedOrder && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* 1. ORDER HIGHLIGHT BANNER */}
            <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#171717]/10 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black font-heading uppercase tracking-widest text-[#6D6D6D]">
                      Order Tracking ID
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyOrderDetails}
                      className="inline-flex items-center gap-1 text-[11px] font-black text-[#FF8A00] hover:underline cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-heading font-mono text-[#171717]">
                    #{trackedOrder.orderNumber}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-black font-heading uppercase text-[#6D6D6D] block">
                      Placed On
                    </span>
                    <span className="text-xs font-bold font-mono text-[#171717]">
                      {new Date(trackedOrder.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`
                      px-4 py-2 rounded-2xl border-2.5 border-[#171717] font-black font-heading text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_#171717] flex items-center gap-2
                      ${
                        isCancelled
                          ? 'bg-[#FEE2E2] text-[#EF4444]'
                          : trackedOrder.status === 'delivered'
                          ? 'bg-[#D1FAE5] text-[#059669]'
                          : 'bg-[#FFC43C] text-[#171717]'
                      }
                    `}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current animate-pulse" />
                    <span>STATUS: {trackedOrder.status.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Customer & Delivery Quick Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-[#525252]">
                <div className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-3.5 shadow-[2px_2px_0px_0px_#171717]">
                  <span className="text-[10px] font-black font-heading uppercase text-[#FF8A00] block mb-0.5">
                    Customer Name
                  </span>
                  <p className="font-bold text-[#171717] truncate">{trackedOrder.customerName}</p>
                </div>
                <div className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-3.5 shadow-[2px_2px_0px_0px_#171717]">
                  <span className="text-[10px] font-black font-heading uppercase text-[#FF8A00] block mb-0.5">
                    Delivery Area / City
                  </span>
                  <p className="font-bold text-[#171717] truncate">{trackedOrder.city || 'Standard Delivery'}</p>
                </div>
                <div className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-3.5 shadow-[2px_2px_0px_0px_#171717]">
                  <span className="text-[10px] font-black font-heading uppercase text-[#FF8A00] block mb-0.5">
                    Order Total
                  </span>
                  <p className="font-black text-[#171717] font-mono text-sm">
                    ৳{trackedOrder.total.toLocaleString()} {trackedOrder.currency}
                  </p>
                </div>
              </div>

              {/* ERPNext Integrated Action Bar */}
              <div className="mt-4 pt-4 border-t-2 border-[#171717]/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E0F2FE] border border-[#0284C7] rounded-full text-[11px] font-bold text-[#0284C7]">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {trackedOrder.erpnextSalesOrder
                        ? `ERPNext ID: ${trackedOrder.erpnextSalesOrder}`
                        : 'ERPNext Synchronized'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setInvoiceModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFF9ED] hover:bg-[#FFC43C] text-[#171717] border-2 border-[#171717] rounded-xl text-xs font-black font-heading uppercase tracking-wide shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>View Tax Invoice</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSupportModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-[#171717] hover:text-white text-[#171717] border-2 border-[#171717] rounded-xl text-xs font-black font-heading uppercase tracking-wide shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer"
                  >
                    <LifeBuoy className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>Raise Support Ticket</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. CANCELLED STATE BANNER OR VISUAL STATUS TIMELINE */}
            {isCancelled ? (
              <div className="bg-[#FEE2E2] border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717] text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EF4444] text-white border-2 border-[#171717] flex items-center justify-center font-black">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black font-heading uppercase text-[#171717]">
                      Order Cancelled
                    </h3>
                    <p className="text-xs font-bold text-[#991B1B]">
                      This order was cancelled and is not active in our 3D print queue.
                    </p>
                  </div>
                </div>
                <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                  If you have questions regarding a refund or wish to modify your order parameters, please contact our studio via WhatsApp or email.
                </p>
              </div>
            ) : (
              /* VISUAL STATUS TIMELINE */
              <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717]">
                <h3 className="text-lg sm:text-xl font-black font-heading uppercase text-[#171717] mb-6 flex items-center gap-2">
                  <Printer className="w-5 h-5 text-[#FF8A00]" />
                  <span>Production & Delivery Progress</span>
                </h3>

                {/* Progress Bar Line */}
                <div className="relative mb-8 px-2 hidden md:block">
                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-[#E5E5E5] border-2 border-[#171717] rounded-full -translate-y-1/2" />
                  <div
                    className="absolute top-1/2 left-0 h-2 bg-[#FF8A00] border-2 border-[#171717] rounded-full -translate-y-1/2 transition-all duration-500"
                    style={{
                      width: `${(currentStepIndex / (TIMELINE_STEPS.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                {/* Vertical / Grid Steps */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 relative">
                  {TIMELINE_STEPS.map((step, index) => {
                    const isPassed = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const IconComp = step.icon;

                    return (
                      <div
                        key={step.key}
                        className={`
                          relative p-4 rounded-2xl border-2.5 border-[#171717] transition-all flex flex-col justify-between
                          ${
                            isCurrent
                              ? 'bg-[#FFC43C] shadow-[4px_4px_0px_0px_#171717] scale-102 z-10'
                              : isPassed
                              ? 'bg-[#FFF9ED] shadow-[2px_2px_0px_0px_#171717]'
                              : 'bg-white opacity-50 border-dashed'
                          }
                        `}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div
                              className={`
                                w-8 h-8 rounded-xl border-2 border-[#171717] flex items-center justify-center text-sm font-black
                                ${
                                  isCurrent
                                    ? 'bg-[#171717] text-white'
                                    : isPassed
                                    ? 'bg-[#10B981] text-white'
                                    : 'bg-[#F5F5F5] text-[#171717]'
                                }
                              `}
                            >
                              {isPassed && !isCurrent ? (
                                <Check className="w-4 h-4 stroke-[3px]" />
                              ) : (
                                <IconComp className="w-4 h-4 stroke-[2.5px]" />
                              )}
                            </div>
                            <span className="text-[10px] font-black font-mono text-[#171717]/60">
                              0{index + 1}
                            </span>
                          </div>

                          <h4 className="text-xs font-black font-heading uppercase text-[#171717] leading-tight mb-1">
                            {step.label}
                          </h4>
                          <p className="text-[10px] font-semibold text-[#525252] leading-tight">
                            {step.sublabel}
                          </p>
                        </div>

                        {isCurrent && (
                          <div className="mt-3 pt-2 border-t border-[#171717]/20 flex items-center gap-1 text-[9px] font-black uppercase text-[#171717] tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#171717] animate-ping" />
                            <span>CURRENT STAGE</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. ORDER ITEMS & FINANCIAL SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Items List (8 Cols) */}
              <div className="lg:col-span-8 bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717]">
                <h3 className="text-lg font-black font-heading uppercase text-[#171717] mb-4 flex items-center gap-2 pb-3 border-b-2 border-[#171717]/10">
                  <ShoppingBag className="w-5 h-5 text-[#FF8A00]" />
                  <span>Order Items ({trackedOrder.items.length})</span>
                </h3>

                <div className="divide-y-2 divide-[#171717]/10">
                  {trackedOrder.items.map((item, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-black font-heading text-[#171717] uppercase">
                          {item.productName}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-[#6D6D6D] mt-1">
                          {item.selectedColor && (
                            <span className="px-2 py-0.5 rounded-md bg-[#FFF9ED] border border-[#171717]">
                              Color: {item.selectedColor}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="px-2 py-0.5 rounded-md bg-[#FFF9ED] border border-[#171717]">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedMaterial && (
                            <span className="px-2 py-0.5 rounded-md bg-[#FFF9ED] border border-[#171717]">
                              Material: {item.selectedMaterial}
                            </span>
                          )}
                        </div>

                        {item.personalizationText && (
                          <div className="mt-2 text-[11px] font-semibold text-[#FF8A00] bg-[#FFF9ED] p-2 rounded-lg border border-[#FF8A00]/40">
                            <strong>Custom Note:</strong> "{item.personalizationText}"
                          </div>
                        )}
                      </div>

                      <div className="text-right shrink-0 font-mono">
                        <span className="text-xs font-bold text-[#6D6D6D] block">
                          ৳{item.unitPrice.toLocaleString()} × {item.quantity}
                        </span>
                        <span className="text-sm font-black text-[#171717]">
                          ৳{item.lineTotal.toLocaleString()} {trackedOrder.currency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Delivery Breakdown (4 Cols) */}
              <div className="lg:col-span-4 bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black font-heading uppercase text-[#171717] mb-4 pb-3 border-b-2 border-[#171717]/10 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#FF8A00]" />
                    <span>Summary</span>
                  </h3>

                  <div className="space-y-3 text-xs font-bold text-[#525252] mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-mono text-[#171717]">৳{trackedOrder.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee ({trackedOrder.city || 'Standard'}):</span>
                      <span className="font-mono text-[#171717]">৳{trackedOrder.deliveryFee.toLocaleString()}</span>
                    </div>
                    {trackedOrder.discount > 0 && (
                      <div className="flex justify-between text-[#10B981]">
                        <span>Discount:</span>
                        <span className="font-mono">-৳{trackedOrder.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t-2 border-[#171717] flex justify-between text-sm font-black text-[#171717]">
                      <span>Grand Total:</span>
                      <span className="font-mono text-[#FF8A00]">
                        ৳{trackedOrder.total.toLocaleString()} {trackedOrder.currency}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-[#171717]/10">
                    <span className="text-[10px] font-black font-heading uppercase text-[#FF8A00] block mb-1">
                      Delivery Destination
                    </span>
                    <p className="text-xs font-bold text-[#171717] leading-relaxed">
                      {trackedOrder.deliveryAddress}
                    </p>
                    {trackedOrder.city && (
                      <span className="text-[11px] font-semibold text-[#6D6D6D] block mt-0.5">
                        {trackedOrder.city}, Bangladesh
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-[#171717]/10">
                  <button
                    type="button"
                    onClick={() => {
                      setTrackedOrder(null);
                      setOrderNumber('');
                      setPhone('');
                    }}
                    className="w-full py-3 rounded-full bg-[#171717] text-white hover:bg-[#FF8A00] font-black font-heading text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    Track Another Order
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ERPNext Modals */}
        {trackedOrder && (
          <ERPNextInvoiceModal
            isOpen={invoiceModalOpen}
            onClose={() => setInvoiceModalOpen(false)}
            invoiceData={{
              invoiceNumber: trackedOrder.erpnextSalesInvoice,
              orderNumber: trackedOrder.orderNumber,
              customerName: trackedOrder.customerName,
              customerEmail: trackedOrder.customerEmail,
              customerPhone: trackedOrder.customerPhone,
              deliveryAddress: trackedOrder.deliveryAddress,
              city: trackedOrder.city,
              date: trackedOrder.createdAt,
              items: trackedOrder.items,
              subtotal: trackedOrder.subtotal,
              deliveryFee: trackedOrder.deliveryFee,
              discount: trackedOrder.discount,
              total: trackedOrder.total,
              currency: trackedOrder.currency,
              status: trackedOrder.status === 'delivered' ? 'Paid / Delivered' : 'Cash on Delivery (Pending)',
            }}
          />
        )}

        <SupportTicketModal
          isOpen={supportModalOpen}
          onClose={() => setSupportModalOpen(false)}
          defaultOrderNumber={trackedOrder?.orderNumber || orderNumber}
          defaultCustomerEmail={trackedOrder?.customerEmail}
          defaultCustomerPhone={trackedOrder?.customerPhone || phone}
        />

      </div>
    </div>
  );
}
