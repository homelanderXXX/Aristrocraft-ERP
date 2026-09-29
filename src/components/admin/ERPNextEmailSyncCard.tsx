import React, { useState } from 'react';
import {
  Mail,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Zap,
  Server,
  FileText,
  AlertCircle,
  HelpCircle,
  Eye,
  RefreshCw,
  Send,
  Sparkles,
  Inbox,
  ArrowUpRight,
} from 'lucide-react';
import { BRAND_MAILBOXES, ERPNEXT_EMAIL_SMTP_CONFIG } from '../../config/brandEmails';

export const ERPNextEmailSyncCard: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeMailbox, setActiveMailbox] = useState<'info' | 'sales' | 'support' | 'billing'>('sales');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const invoiceEmailTemplate = `Dear {{ doc.customer_name or "Valued Customer" }},

Thank you for choosing ARISTROCRAFT 3D Labs!

Your custom 3D printed order has been processed and officially registered. Attached with this email is your official Commercial Tax Invoice #{{ doc.name }}.

ORDER SUMMARY:
• Invoice Number: {{ doc.name }}
• Posting Date: {{ frappe.utils.formatdate(doc.posting_date, "dd MMM yyyy") }}
• Grand Total: ৳{{ frappe.format_value(doc.grand_total, doc.meta.get_field("grand_total")) }} BDT
• Payment Status: {{ (doc.status or "Paid")|upper }}

Each precision 3D print undergoes structural and dimensional inspection prior to package dispatch. 

For real-time delivery tracking, visit: https://aristrocrafts.com/track
If you have any questions or need technical support, reply directly to this email or reach us at support@aristrocrafts.com.

Warm regards,
The Engineering & Craft Studio
ARISTROCRAFT 3D LABS • Dhaka, Bangladesh
Web: https://aristrocrafts.com | Email: info@aristrocrafts.com`;

  return (
    <div className="space-y-6">
      {/* STATUS BANNER */}
      <div className="bg-gradient-to-r from-[#FFF9ED] via-white to-[#F0FDF4] border-2 border-[#171717] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#171717]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 bg-[#10B981] text-white border-2 border-[#171717] rounded-2xl flex items-center justify-center font-black shrink-0 shadow-[2px_2px_0px_0px_#171717]">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-black font-heading uppercase text-[#171717]">
                  Brand Mail & ERPNext SMTP Hub
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] border border-[#16A34A] text-[#16A34A] text-[10px] font-black uppercase">
                  Connected Domain
                </span>
              </div>
              <p className="text-xs font-semibold text-[#666666] mt-0.5">
                Domain: <strong className="text-[#171717]">aristrocrafts.com</strong> • Single inbox or dedicated department routing for automated invoice dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={ERPNEXT_EMAIL_SMTP_CONFIG.erpnextEmailAccountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0070F3] hover:bg-[#0051B3] text-white border-2 border-[#171717] rounded-xl text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#171717] transition-all hover:-translate-y-0.5"
            >
              <span>ERPNext Email Accounts</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FFC43C] hover:bg-[#FFAE00] text-[#171717] border-2 border-[#171717] rounded-xl text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#171717] transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Invoice Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAILBOX ARCHITECTURE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.values(BRAND_MAILBOXES).map((box) => {
          const isSelected = activeMailbox === box.id;
          const isMainCreated = box.id === 'info';

          return (
            <div
              key={box.id}
              onClick={() => setActiveMailbox(box.id as any)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left relative ${
                isSelected
                  ? 'bg-white border-[#0070F3] shadow-[4px_4px_0px_0px_#0070F3] -translate-y-1'
                  : 'bg-[#FAF9F6] border-[#171717] hover:bg-white shadow-[2px_2px_0px_0px_#171717]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border bg-white border-[#171717]">
                  {box.label.split('&')[0]}
                </span>
                {isMainCreated ? (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full border border-[#16A34A]">
                    <CheckCircle2 className="w-3 h-3" />
                    Live
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded-full border border-[#0284C7]">
                    Ready
                  </span>
                )}
              </div>

              <div className="font-mono text-xs font-black text-[#171717] truncate mb-1">
                {box.email}
              </div>
              <p className="text-[11px] font-semibold text-[#666666] line-clamp-2 leading-relaxed mb-3">
                {box.purpose}
              </p>

              <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between text-[10px] font-bold text-[#888888]">
                <span>ERP: {box.erpModule.split('(')[0]}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(box.email, box.id);
                  }}
                  className="text-[#0070F3] hover:underline flex items-center gap-1"
                >
                  {copiedKey === box.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === box.id ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAILED SMTP & ERPNEXT CONFIGURATION SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: STEP-BY-STEP ERPNEXT SETUP */}
        <div className="lg:col-span-7 bg-white border-2 border-[#171717] rounded-3xl p-6 shadow-[4px_4px_0px_0px_#171717] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#171717]/10 mb-5">
              <div>
                <h4 className="text-sm font-black font-heading uppercase text-[#171717] flex items-center gap-2">
                  <span>ERPNext Email Account Settings</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#FFF4D6] text-[#D97706] text-[10px] font-black">
                    Copy & Paste
                  </span>
                </h4>
                <p className="text-xs text-[#666] mt-0.5">
                  Enter these parameters into ERPNext Email Account to link your domain.
                </p>
              </div>

              <a
                href={ERPNEXT_EMAIL_SMTP_CONFIG.erpnextEmailAccountUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-black text-[#0070F3] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Add Account</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-3 text-xs">
              {/* Field 1 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">Email Address</span>
                  <span className="font-mono font-black text-[#0F172A]">{BRAND_MAILBOXES[activeMailbox].email}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(BRAND_MAILBOXES[activeMailbox].email, 'email')}
                  className="px-2.5 py-1 bg-white border border-[#CBD5E1] rounded-lg font-bold text-[11px] text-[#0F172A] hover:bg-[#F1F5F9] flex items-center gap-1 shadow-sm"
                >
                  {copiedKey === 'email' ? <Check className="w-3 h-3 text-[#16A34A]" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'email' ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Field 2 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">Account Name</span>
                  <span className="font-bold text-[#0F172A]">ARISTROCRAFT {BRAND_MAILBOXES[activeMailbox].label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(`ARISTROCRAFT ${BRAND_MAILBOXES[activeMailbox].label}`, 'name')}
                  className="px-2.5 py-1 bg-white border border-[#CBD5E1] rounded-lg font-bold text-[11px] text-[#0F172A] hover:bg-[#F1F5F9] flex items-center gap-1 shadow-sm"
                >
                  {copiedKey === 'name' ? <Check className="w-3 h-3 text-[#16A34A]" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'name' ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Field 3 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">SMTP Server Host</span>
                  <span className="font-mono font-black text-[#0F172A]">{ERPNEXT_EMAIL_SMTP_CONFIG.smtpServer}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(ERPNEXT_EMAIL_SMTP_CONFIG.smtpServer, 'smtp')}
                  className="px-2.5 py-1 bg-white border border-[#CBD5E1] rounded-lg font-bold text-[11px] text-[#0F172A] hover:bg-[#F1F5F9] flex items-center gap-1 shadow-sm"
                >
                  {copiedKey === 'smtp' ? <Check className="w-3 h-3 text-[#16A34A]" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'smtp' ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Ports & Protocol */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">SSL Port (Recommended)</span>
                  <span className="font-mono font-black text-[#0F172A]">Port 465 (Use SSL: Checked)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">TLS Port (Alternative)</span>
                  <span className="font-mono font-black text-[#0F172A]">Port 587 (Use TLS: Checked)</span>
                </div>
              </div>

              {/* Mandatory Flags */}
              <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[11px] font-bold text-[#92400E] space-y-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span><strong>Enable Outgoing:</strong> Check this box so ERPNext can send emails.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span><strong>Default Outgoing:</strong> Check this box if you want this to be the primary sender for invoices.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs">
            <span className="font-bold text-[#666666]">
              Configuring currently: <strong className="text-[#171717]">{BRAND_MAILBOXES[activeMailbox].email}</strong>
            </span>
            <a
              href="https://erpnext.ovisoft.tech/app/email-account/new-email-account"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-[#0070F3] hover:underline"
            >
              Open New Form in ERPNext &rarr;
            </a>
          </div>
        </div>

        {/* RIGHT: AUTO NOTIFICATION & JINJA TEMPLATE */}
        <div className="lg:col-span-5 bg-white border-2 border-[#171717] rounded-3xl p-6 shadow-[4px_4px_0px_0px_#171717] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#171717]/10 mb-4">
              <div>
                <h4 className="text-sm font-black font-heading uppercase text-[#171717] flex items-center gap-2">
                  <span>Auto-Send Invoice Rule</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#16A34A] text-[10px] font-black">
                    Notification
                  </span>
                </h4>
                <p className="text-xs text-[#666] mt-0.5">
                  Automatically email customers their Tax Invoice PDF upon order submission.
                </p>
              </div>

              <a
                href={ERPNEXT_EMAIL_SMTP_CONFIG.erpnextNotificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-black text-[#0070F3] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Setup</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-2.5 text-xs font-semibold text-[#444444]">
              <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                <span className="text-[#64748B]">Document Type:</span>
                <span className="font-black text-[#0F172A]">Sales Invoice</span>
              </div>

              <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                <span className="text-[#64748B]">Trigger Event:</span>
                <span className="font-black text-[#16A34A]">Submit (On Invoice Generation)</span>
              </div>

              <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                <span className="text-[#64748B]">Receiver By Document Field:</span>
                <span className="font-mono font-black text-[#0F172A]">contact_email</span>
              </div>

              <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                <span className="text-[#64748B]">Attach Print Format:</span>
                <span className="font-black text-[#0F172A]">ARISTROCRAFT Clean Modern Tax Invoice</span>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-black uppercase text-[#171717]">Email Subject & Body:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(invoiceEmailTemplate, 'body')}
                    className="text-[11px] font-black text-[#0070F3] hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'body' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === 'body' ? 'Copied Template' : 'Copy Jinja Template'}
                  </button>
                </div>
                <div className="p-2.5 rounded-xl bg-[#1E293B] text-[#E2E8F0] font-mono text-[11px] h-32 overflow-y-auto leading-relaxed border border-[#0F172A]">
                  {invoiceEmailTemplate}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E5E5E5] flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748B]">
              Ready to dispatch via {BRAND_MAILBOXES.info.email}
            </span>
            <button
              type="button"
              onClick={() => {
                setTestSent(true);
                setTimeout(() => setTestSent(false), 3000);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-[#171717] flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer ${
                testSent
                  ? 'bg-[#10B981] text-white'
                  : 'bg-[#FF8A00] hover:bg-[#E07A00] text-white'
              }`}
            >
              {testSent ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              <span>{testSent ? 'Simulation Dispatched!' : 'Send Test Simulation'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK CPANEL GUIDE (FOR COMPLETING ALL 3 MAILBOXES) */}
      <div className="bg-[#FAF9F6] border-2 border-[#171717] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#171717]">
        <h4 className="text-xs font-black font-heading uppercase text-[#171717] mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF8A00]" />
          <span>cPanel / Hosting Shortcut for Creating Additional Addresses</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-[#444444]">
          <div className="p-3 rounded-xl bg-white border border-[#E5E5E5]">
            <strong className="text-[#171717] block mb-1">Option A: Create 2 More Mailboxes</strong>
            In your cPanel &rarr; <em>Email Accounts</em> &rarr; Click <em>+ Create</em>. Add <code className="font-mono text-[#0070F3]">sales</code> and <code className="font-mono text-[#0070F3]">support</code> with their passwords.
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#E5E5E5]">
            <strong className="text-[#171717] block mb-1">Option B: Email Forwarders (Recommended)</strong>
            If you want all emails in one place, go to cPanel &rarr; <em>Forwarders</em> &rarr; forward <code className="font-mono text-[#0070F3]">sales@</code> and <code className="font-mono text-[#0070F3]">support@</code> to <code className="font-mono text-[#10B981]">info@aristrocrafts.com</code>!
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#E5E5E5]">
            <strong className="text-[#171717] block mb-1">Option C: Keep info@ as Master</strong>
            You can keep using solely <code className="font-mono text-[#10B981]">info@aristrocrafts.com</code> for both website contact and ERPNext invoices without creating anything else!
          </div>
        </div>
      </div>

      {/* INVOICE EMAIL PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-3 border-[#171717] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[8px_8px_0px_0px_#171717]">
            {/* Modal Header */}
            <div className="p-5 border-b-2 border-[#171717] flex items-center justify-between bg-[#FFF9ED] sticky top-0 z-10">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FF8A00] block">
                  Customer Experience Simulation
                </span>
                <h3 className="text-base font-black font-heading uppercase text-[#171717]">
                  Automated Invoice Email Preview
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="w-8 h-8 rounded-full border-2 border-[#171717] bg-white hover:bg-[#FF8A00] hover:text-white flex items-center justify-center font-black transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Email Shell */}
            <div className="p-6 space-y-4">
              {/* Mail Meta Header */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5 text-xs">
                <div className="flex">
                  <span className="w-16 font-bold text-[#64748B]">From:</span>
                  <span className="font-bold text-[#0F172A]">ARISTROCRAFT 3D Labs &lt;sales@aristrocrafts.com&gt;</span>
                </div>
                <div className="flex">
                  <span className="w-16 font-bold text-[#64748B]">To:</span>
                  <span className="font-bold text-[#0F172A]">customer@example.com</span>
                </div>
                <div className="flex">
                  <span className="w-16 font-bold text-[#64748B]">Subject:</span>
                  <span className="font-black text-[#0F172A]">Tax Invoice ACC-INV-2026-00042 from ARISTROCRAFT 3D Labs</span>
                </div>
                <div className="flex">
                  <span className="w-16 font-bold text-[#64748B]">Attachment:</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[#0070F3] bg-white px-2 py-0.5 rounded border border-[#CBD5E1]">
                    <FileText className="w-3.5 h-3.5" />
                    ARISTROCRAFT_Invoice_ACC-INV-2026-00042.pdf (142 KB)
                  </span>
                </div>
              </div>

              {/* Rendered Email Body */}
              <div className="border-2 border-[#171717] rounded-2xl p-6 bg-white space-y-4 text-xs font-sans leading-relaxed text-[#333333]">
                <div className="flex items-center justify-between border-b-2 border-[#171717] pb-4">
                  <img src="/brand/logo.png" alt="ARISTROCRAFT" className="h-10 w-auto object-contain" />
                  <span className="px-2.5 py-1 bg-[#171717] text-[#FFC43C] font-black text-[10px] uppercase rounded-md font-heading">
                    Precision Additive Labs
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-black text-[#171717] mb-1">
                    Thank you for your order!
                  </h4>
                  <p className="text-xs text-[#555555]">
                    Your custom 3D printed components have been scheduled into our production queue. Your official Commercial Tax Invoice has been generated electronically.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FFF9ED] border border-[#FF8A00]/30 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Invoice Number:</span>
                    <span className="font-mono text-[#171717]">ACC-INV-2026-00042</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total Amount:</span>
                    <span className="text-[#FF8A00] font-black">৳ 3,450 BDT</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Payment Method:</span>
                    <span className="text-[#10B981]">Cash on Delivery (COD) / Verified</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Production Stage:</span>
                    <span className="text-[#0070F3]">Queue Assigned (Bambu Lab High-Precision)</span>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <a
                    href="https://aristrocrafts.com/track"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2.5 bg-[#FF8A00] text-white font-black uppercase text-xs rounded-xl shadow-[3px_3px_0px_0px_#171717] border-2 border-[#171717]"
                  >
                    Track Live Print Status
                  </a>
                </div>

                <div className="pt-4 border-t border-[#E5E5E5] text-[11px] text-[#777777] text-center">
                  Aristro Craft Precision Labs Ltd. • Dhaka, Bangladesh<br />
                  Web: <strong>aristrocrafts.com</strong> • Inquiries: <strong>info@aristrocrafts.com</strong>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t-2 border-[#171717] bg-[#FAF9F6] flex justify-end">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-[#171717] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
