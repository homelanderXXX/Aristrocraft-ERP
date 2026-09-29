import React, { useRef } from 'react';
import {
  X,
  Printer,
  FileText,
  Download,
  CheckCircle2,
  Building2,
  QrCode,
  ShieldCheck,
  CreditCard,
  MapPin,
  Calendar,
  Phone,
  Mail,
} from 'lucide-react';

interface InvoiceItem {
  name?: string;
  item_code?: string;
  productName?: string;
  qty?: number;
  quantity?: number;
  rate?: number;
  unitPrice?: number;
  lineTotal?: number;
  amount?: number;
}

interface ERPNextInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: {
    invoiceNumber?: string;
    orderNumber: string;
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    deliveryAddress?: string;
    city?: string;
    date: string;
    items: InvoiceItem[];
    subtotal: number;
    deliveryFee: number;
    discount?: number;
    total: number;
    currency?: string;
    status?: string;
  };
}

export const ERPNextInvoiceModal: React.FC<ERPNextInvoiceModalProps> = ({
  isOpen,
  onClose,
  invoiceData,
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNum =
    invoiceData.invoiceNumber ||
    `INV-${invoiceData.orderNumber.replace(/[^A-Z0-9]/gi, '')}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border-3 border-[#171717] rounded-3xl shadow-[10px_10px_0px_0px_#171717] max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Actions Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#171717] bg-[#FFF9ED] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF8A00] text-white flex items-center justify-center font-bold border border-[#171717]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-[#FF8A00] tracking-wider">
                Official Document
              </span>
              <h4 className="text-sm font-black font-heading uppercase text-[#171717]">
                ERPNext Tax Invoice
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#FFC43C] text-[#171717] border-2 border-[#171717] rounded-xl text-xs font-black font-heading uppercase tracking-wide shadow-[2px_2px_0px_0px_#171717] cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E5E5E5] hover:bg-[#171717] hover:text-white text-[#171717] border-2 border-[#171717] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div ref={invoiceRef} className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-white text-[#171717]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-[#171717]">
            <div>
              <img
                src="/brand/logo.png"
                alt="ARISTROCRAFT"
                className="h-12 w-auto object-contain mb-2"
              />
              <div className="inline-block px-2.5 py-0.5 bg-[#171717] text-[#FFC43C] rounded-md text-[10px] font-black uppercase font-heading tracking-wider mb-2">
                ARISTRO CRAFT 3D LABS
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-[#171717]">
                COMMERCIAL INVOICE
              </h2>
              <p className="text-xs text-[#666] font-semibold mt-1 leading-relaxed">
                Aristro Craft Precision Additive Manufacturing Ltd.<br />
                Dhaka, Bangladesh • aristrocrafts.com • sales@aristrocrafts.com<br />
                Company Reg: AC-2026-BD • VAT Reg: 00482910-0101
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="inline-block px-3 py-1 rounded-full bg-[#E0F2FE] border border-[#0284C7] text-[#0284C7] text-[11px] font-black uppercase tracking-wider mb-2">
                Verified in ERPNext
              </div>
              <div className="font-mono text-sm font-black text-[#171717]">
                INV: {invoiceNum}
              </div>
              <div className="text-xs font-bold text-[#666] mt-0.5">
                Sales Order Ref: {invoiceData.orderNumber}
              </div>
              <div className="text-xs font-semibold text-[#666] mt-0.5">
                Date: {new Date(invoiceData.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Customer & Billing Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF8A00] block mb-1">
                Billed & Shipped To:
              </span>
              <div className="text-sm font-black text-[#171717]">
                {invoiceData.customerName}
              </div>
              {invoiceData.deliveryAddress && (
                <div className="text-xs text-[#525252] font-semibold mt-1 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#FF8A00]" />
                  <span>{invoiceData.deliveryAddress}{invoiceData.city ? `, ${invoiceData.city}` : ''}</span>
                </div>
              )}
              {invoiceData.customerPhone && (
                <div className="text-xs text-[#525252] font-semibold mt-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-[#FF8A00]" />
                  <span>{invoiceData.customerPhone}</span>
                </div>
              )}
            </div>

            <div className="sm:text-right sm:border-l-2 sm:border-[#171717]/10 sm:pl-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF8A00] block mb-1">
                Payment & Fulfillment:
              </span>
              <div className="text-xs font-black text-[#171717] uppercase">
                Status: {invoiceData.status || 'Cash on Delivery (COD)'}
              </div>
              <div className="text-xs text-[#525252] font-semibold mt-1">
                Currency: BDT (Bangladeshi Taka)
              </div>
              <div className="text-xs text-[#525252] font-semibold mt-1">
                Fulfillment: Standard Courier (Paperfly / Steadfast)
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border-2 border-[#171717] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#171717] text-white font-heading font-black uppercase text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Rate</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717]/15">
                {invoiceData.items.map((item, idx) => {
                  const qty = Number(item.quantity || item.qty || 1);
                  const rate = Number(item.unitPrice || item.rate || 0);
                  const lineTotal = Number(item.lineTotal || item.amount || qty * rate);
                  const name = item.productName || item.item_code || '3D Printed Part';

                  return (
                    <tr key={idx} className="hover:bg-[#F9F9F9]">
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-[#171717]">{name}</div>
                        {item.item_code && item.item_code !== name && (
                          <div className="font-mono text-[10px] text-[#666]">{item.item_code}</div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-[#171717]">{qty}</td>
                      <td className="py-2.5 px-3 text-right font-semibold text-[#525252]">৳{rate.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right font-black text-[#171717]">৳{lineTotal.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Financial Totals Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
            <div className="flex items-center gap-3 text-xs text-[#666] font-semibold">
              <div className="w-16 h-16 border border-[#171717]/30 rounded-xl flex items-center justify-center p-1 bg-white">
                <QrCode className="w-full h-full text-[#171717]" />
              </div>
              <div className="text-[11px] leading-tight">
                <strong>Digitally Certified</strong><br />
                ERPNext Hash: {invoiceNum.slice(-8)}<br />
                Thank you for choosing Aristro Craft!
              </div>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold text-[#525252]">
                <span>Subtotal:</span>
                <span>৳{invoiceData.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold text-[#525252]">
                <span>Delivery / Shipping:</span>
                <span>৳{invoiceData.deliveryFee.toLocaleString()}</span>
              </div>
              {Boolean(invoiceData.discount) && (
                <div className="flex justify-between font-semibold text-[#10B981]">
                  <span>Discount:</span>
                  <span>-৳{invoiceData.discount?.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t-2 border-[#171717] flex justify-between text-sm font-black font-heading text-[#171717]">
                <span>GRAND TOTAL:</span>
                <span className="text-[#FF8A00]">৳{invoiceData.total.toLocaleString()} BDT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
