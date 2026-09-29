const fs = require('fs');
const path = require('path');

const base64Logo = fs.readFileSync(path.join(__dirname, '../public/brand/logo-clean-base64.txt'), 'utf8').trim();

const jinjaTemplate = `<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body, .print-format {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
  color: #0F172A !important;
  background-color: #FFFFFF !important;
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

.invoice-sheet {
  max-width: 800px;
  margin: 0 auto;
  background: #FFFFFF;
  padding: 24px 28px;
}

/* Accent Header Line */
.top-brand-bar {
  height: 4px;
  background: linear-gradient(90deg, #F59E0B 0%, #D97706 45%, #0F172A 100%);
  border-radius: 2px;
  margin-bottom: 24px;
}

/* Header Area */
.header-grid {
  display: table;
  width: 100%;
  margin-bottom: 22px;
}

.header-left {
  display: table-cell;
  width: 58%;
  vertical-align: top;
}

.header-right {
  display: table-cell;
  width: 42%;
  vertical-align: top;
  text-align: right;
}

/* Clean Borderless Brand Logo */
.brand-logo-clean {
  height: 50px;
  width: auto;
  max-width: 230px;
  object-fit: contain;
  display: block;
  border: none !important;
  outline: none !important;
  background: transparent !important;
  margin-bottom: 8px;
}

.company-tagline {
  font-size: 10.5px;
  font-weight: 700;
  color: #D97706;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 4px;
}

.company-meta-text {
  font-size: 10.5px;
  color: #64748B;
  line-height: 1.5;
}

/* Invoice Title & Meta on Right */
.doc-title {
  font-size: 22px;
  font-weight: 800;
  color: #0F172A;
  letter-spacing: 0.5px;
  line-height: 1.1;
  margin-bottom: 4px;
}

.doc-number {
  font-family: 'Courier New', Consolas, monospace;
  font-size: 13px;
  font-weight: 700;
  color: #D97706;
  margin-bottom: 8px;
}

.meta-item {
  font-size: 11px;
  margin-bottom: 2.5px;
  color: #475569;
}

.meta-item strong {
  color: #0F172A;
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 9.5px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
}

.status-paid {
  background: #DCFCE7;
  color: #15803D;
  border: 1px solid #86EFAC;
}

.status-draft {
  background: #FEF3C7;
  color: #B45309;
  border: 1px solid #FCD34D;
}

.status-unpaid, .status-overdue {
  background: #FEE2E2;
  color: #B91C1C;
  border: 1px solid #FCA5A5;
}

/* Section Divider */
.thin-divider {
  height: 1px;
  background: #E2E8F0;
  margin: 18px 0;
}

/* Customer & Shipping Info (Clean Minimalist Cards) */
.parties-grid {
  display: table;
  width: 100%;
  margin-bottom: 22px;
}

.party-col {
  display: table-cell;
  width: 48%;
  vertical-align: top;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 12px 14px;
}

.party-spacer {
  display: table-cell;
  width: 4%;
}

.section-label {
  font-size: 9.5px;
  font-weight: 800;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
  border-bottom: 1px solid #EDF2F7;
  padding-bottom: 4px;
}

.party-name {
  font-size: 13.5px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 4px;
}

.party-line {
  font-size: 11px;
  color: #475569;
  margin-bottom: 2.5px;
  line-height: 1.4;
}

.party-line strong {
  color: #1E293B;
}

/* Itemized Products Table */
.invoice-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.invoice-table th {
  background: #F8FAFC;
  color: #475569;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  padding: 9px 12px;
  border-top: 1px solid #CBD5E1;
  border-bottom: 1px solid #CBD5E1;
}

.invoice-table td {
  padding: 12px;
  border-bottom: 1px solid #E2E8F0;
  font-size: 11.5px;
  vertical-align: top;
  color: #1E293B;
}

.invoice-table tr:last-child td {
  border-bottom: 1px solid #CBD5E1;
}

.col-sr { width: 5%; text-align: center; }
.col-item { width: 52%; text-align: left; }
.col-qty { width: 13%; text-align: center; }
.col-rate { width: 15%; text-align: right; }
.col-amt { width: 15%; text-align: right; }

.item-main-title {
  font-weight: 700;
  color: #0F172A;
  font-size: 12px;
}

.item-sub-desc {
  font-size: 10.5px;
  color: #64748B;
  margin-top: 3px;
  line-height: 1.4;
}

.num-val {
  font-family: 'Courier New', Consolas, monospace;
  font-weight: 600;
}

/* Totals and Summary Block */
.bottom-grid {
  display: table;
  width: 100%;
  margin-bottom: 24px;
}

.notes-cell {
  display: table-cell;
  width: 55%;
  vertical-align: top;
  padding-right: 20px;
}

.calc-cell {
  display: table-cell;
  width: 45%;
  vertical-align: top;
}

.amount-words-card {
  background: #FFFBEB;
  border-left: 3px solid #F59E0B;
  padding: 9px 12px;
  border-radius: 0 6px 6px 0;
  margin-bottom: 12px;
}

.words-lbl {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  color: #D97706;
  letter-spacing: 0.6px;
}

.words-val {
  font-size: 11px;
  font-weight: 600;
  color: #1E293B;
  font-style: italic;
  margin-top: 2px;
}

.security-seal {
  display: table;
  width: 100%;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 8px 10px;
}

.seal-badge {
  display: table-cell;
  width: 76px;
  vertical-align: middle;
  text-align: center;
  font-size: 8px;
  font-weight: 900;
  background: #0F172A;
  color: #F59E0B;
  padding: 6px 4px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.seal-text {
  display: table-cell;
  vertical-align: middle;
  padding-left: 10px;
  font-size: 9.5px;
  color: #64748B;
  line-height: 1.35;
}

/* Calculation Table */
.calc-table {
  width: 100%;
  border-collapse: collapse;
}

.calc-table td {
  padding: 5px 0;
  font-size: 11.5px;
}

.calc-lbl {
  color: #64748B;
  font-weight: 500;
  text-align: left;
}

.calc-val {
  color: #0F172A;
  font-weight: 600;
  font-family: 'Courier New', Consolas, monospace;
  text-align: right;
}

.row-grand-total td {
  padding-top: 8px;
  padding-bottom: 4px;
  border-top: 2px solid #0F172A;
}

.row-grand-total .calc-lbl {
  font-size: 12.5px;
  font-weight: 800;
  color: #0F172A;
  letter-spacing: 0.5px;
}

.row-grand-total .calc-val {
  font-size: 16px;
  font-weight: 800;
  color: #D97706;
}

.row-balance td {
  padding-top: 4px;
}

.row-balance .calc-lbl {
  color: #B91C1C;
  font-weight: 700;
}

.row-balance .calc-val {
  color: #B91C1C;
  font-weight: 700;
}

/* Footer Section */
.footer-row {
  display: table;
  width: 100%;
  border-top: 1px solid #E2E8F0;
  padding-top: 16px;
  margin-bottom: 14px;
}

.footer-left {
  display: table-cell;
  width: 65%;
  vertical-align: top;
  padding-right: 20px;
}

.footer-right {
  display: table-cell;
  width: 35%;
  vertical-align: bottom;
  text-align: center;
  padding-top: 16px;
}

.terms-heading {
  font-size: 9.5px;
  font-weight: 800;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 4px;
}

.terms-body {
  font-size: 9.5px;
  color: #64748B;
  line-height: 1.45;
  margin: 0;
  padding-left: 12px;
}

.sign-underline {
  border-bottom: 1px solid #0F172A;
  width: 80%;
  margin: 0 auto 6px auto;
}

.sign-text {
  font-size: 10px;
  font-weight: 700;
  color: #0F172A;
  text-transform: uppercase;
}

.sign-company {
  font-size: 8.5px;
  color: #94A3B8;
  letter-spacing: 0.5px;
}

.bottom-acknowledgement {
  text-align: center;
  font-size: 10px;
  font-weight: 600;
  color: #64748B;
  padding-top: 8px;
  border-top: 1px dashed #E2E8F0;
}

@media print {
  body { background: #FFFFFF !important; }
  .invoice-sheet { padding: 0 !important; }
}
</style>

<div class="invoice-sheet">
  <!-- Accent Line -->
  <div class="top-brand-bar"></div>

  <!-- Header: Borderless Logo & Invoice Title -->
  <div class="header-grid">
    <div class="header-left">
      <!-- 100% Clean Borderless Official Logo -->
      {% if doc.company_logo %}
        <img src="{{ doc.company_logo }}" alt="ARISTROCRAFT" class="brand-logo-clean" />
      {% else %}
        <img src="data:image/png;base64,${base64Logo}" alt="ARISTROCRAFT" class="brand-logo-clean" />
      {% endif %}

      <div class="company-tagline">Precision 3D Printing & Additive Manufacturing</div>
      <div class="company-meta-text">
        Aristro Craft Precision Labs Ltd. • Dhaka, Bangladesh<br/>
        Web: <strong>aristrocraft.com</strong> • Email: <strong>support@aristrocraft.com</strong>
      </div>
    </div>

    <div class="header-right">
      <div class="doc-title">TAX INVOICE</div>
      <div class="doc-number">{{ doc.name }}</div>
      
      <div class="meta-item">
        Date: <strong>{{ frappe.utils.formatdate(doc.posting_date, "dd MMM yyyy") }}</strong>
      </div>
      <div class="meta-item">
        Due Date: <strong>{{ frappe.utils.formatdate(doc.due_date, "dd MMM yyyy") if doc.due_date else frappe.utils.formatdate(doc.posting_date, "dd MMM yyyy") }}</strong>
      </div>
      {% if doc.po_no or doc.sales_order %}
      <div class="meta-item">
        Order Ref: <strong>{{ doc.po_no or doc.sales_order }}</strong>
      </div>
      {% endif %}
      
      <div>
        <span class="status-badge status-{{ (doc.status or 'Paid')|lower|replace(' ', '-') }}">
          {{ (doc.status or 'PAID')|upper }}
        </span>
      </div>
    </div>
  </div>

  <div class="thin-divider"></div>

  <!-- Billing & Dispatch Specifications -->
  <div class="parties-grid">
    <div class="party-col">
      <div class="section-label">Billed & Shipped To</div>
      <div class="party-name">{{ doc.customer_name or doc.customer or "Valued Customer" }}</div>
      {% if doc.contact_phone or doc.contact_mobile or doc.phone %}
      <div class="party-line">
        <strong>Phone:</strong> {{ doc.contact_phone or doc.contact_mobile or doc.phone }}
      </div>
      {% endif %}
      {% if doc.contact_email or doc.customer_email %}
      <div class="party-line">
        <strong>Email:</strong> {{ doc.contact_email or doc.customer_email }}
      </div>
      {% endif %}
      <div class="party-line" style="margin-top: 4px;">
        <strong>Delivery Address:</strong><br/>
        {{ doc.shipping_address or doc.address_display or doc.customer_address or "Dhaka, Bangladesh" }}
      </div>
    </div>

    <div class="party-spacer"></div>

    <div class="party-col">
      <div class="section-label">Order & Dispatch Specifications</div>
      <div class="party-line">
        <strong>Payment Method:</strong> {{ doc.payment_terms_template or "Cash on Delivery (COD) / bKash" }}
      </div>
      <div class="party-line">
        <strong>Technology:</strong> High-Precision Multi-Material FDM / SLA
      </div>
      <div class="party-line">
        <strong>Currency:</strong> BDT (৳ - Bangladesh Taka)
      </div>
      <div class="party-line" style="color: #16A34A; font-weight: 600; margin-top: 4px;">
        ✓ 100% Inspected & Quality Certified Prior to Dispatch
      </div>
    </div>
  </div>

  <!-- Items Table -->
  <table class="invoice-table">
    <thead>
      <tr>
        <th class="col-sr">#</th>
        <th class="col-item">Item & Description</th>
        <th class="col-qty">Quantity</th>
        <th class="col-rate">Unit Rate</th>
        <th class="col-amt">Total Amount</th>
      </tr>
    </thead>
    <tbody>
      {% for item in doc.items %}
      <tr>
        <td class="col-sr num-val">{{ loop.index }}</td>
        <td class="col-item">
          <div class="item-main-title">{{ item.item_name or item.item_code }}</div>
          {% if item.description and item.description != item.item_name %}
          <div class="item-sub-desc">{{ item.description }}</div>
          {% endif %}
        </td>
        <td class="col-qty num-val">{{ item.qty }} {{ item.uom or "Nos" }}</td>
        <td class="col-rate num-val">{{ frappe.format_value(item.rate, doc.meta.get_field("grand_total")) }}</td>
        <td class="col-amt num-val" style="font-weight: 700;">{{ frappe.format_value(item.amount, doc.meta.get_field("grand_total")) }}</td>
      </tr>
      {% endfor %}
    </tbody>
  </table>

  <!-- Bottom Calculation and Notes -->
  <div class="bottom-grid">
    <div class="notes-cell">
      <div class="amount-words-card">
        <div class="words-lbl">Total in Words</div>
        <div class="words-val">{{ doc.in_words or "Bangladeshi Taka Only" }}</div>
      </div>

      <div class="security-seal">
        <div class="seal-badge">AUTHENTIC</div>
        <div class="seal-text">
          Certified digital tax invoice generated electronically via ARISTROCRAFT ERPNext Core.
        </div>
      </div>
    </div>

    <div class="calc-cell">
      <table class="calc-table">
        <tr>
          <td class="calc-lbl">Subtotal (Net):</td>
          <td class="calc-val">{{ frappe.format_value(doc.net_total, doc.meta.get_field("net_total")) }}</td>
        </tr>
        {% if doc.total_taxes_and_charges and doc.total_taxes_and_charges > 0 %}
        <tr>
          <td class="calc-lbl">Delivery / Shipping:</td>
          <td class="calc-val">{{ frappe.format_value(doc.total_taxes_and_charges, doc.meta.get_field("grand_total")) }}</td>
        </tr>
        {% endif %}
        {% if doc.discount_amount and doc.discount_amount > 0 %}
        <tr>
          <td class="calc-lbl">Discount:</td>
          <td class="calc-val" style="color: #16A34A;">-{{ frappe.format_value(doc.discount_amount, doc.meta.get_field("grand_total")) }}</td>
        </tr>
        {% endif %}
        <tr class="row-grand-total">
          <td class="calc-lbl">GRAND TOTAL:</td>
          <td class="calc-val">{{ frappe.format_value(doc.grand_total, doc.meta.get_field("grand_total")) }}</td>
        </tr>
        {% if doc.outstanding_amount is defined and doc.outstanding_amount > 0 and doc.outstanding_amount != doc.grand_total %}
        <tr class="row-balance">
          <td class="calc-lbl">Balance Due:</td>
          <td class="calc-val">{{ frappe.format_value(doc.outstanding_amount, doc.meta.get_field("grand_total")) }}</td>
        </tr>
        {% endif %}
      </table>
    </div>
  </div>

  <!-- Terms & Signatory Footer -->
  <div class="footer-row">
    <div class="footer-left">
      <div class="terms-heading">Terms & Quality Assurance</div>
      <ul class="terms-body">
        <li>Precision custom 3D prints undergo structural, layer-adhesion, and dimensional testing prior to dispatch.</li>
        <li>For inquiries, order status, or technical support, contact <strong>support@aristrocraft.com</strong> quoting Invoice No: <strong>{{ doc.name }}</strong>.</li>
      </ul>
    </div>

    <div class="footer-right">
      <div class="sign-underline"></div>
      <div class="sign-text">Authorized Signature</div>
      <div class="sign-company">ARISTROCRAFT 3D LABS</div>
    </div>
  </div>

  <div class="bottom-acknowledgement">
    Thank you for choosing ARISTROCRAFT — Crafting Your Vision into Reality!
  </div>
</div>`;

fs.writeFileSync(path.join(__dirname, '../public/brand/generated_template.txt'), jinjaTemplate, 'utf8');

const guideContent = `import React, { useState } from 'react';
import {
  Copy,
  Check,
  Printer,
  Sparkles,
  Info,
  CheckCircle2,
  Eye,
  AlertCircle,
} from 'lucide-react';

export const ERPNEXT_INVOICE_JINJA_TEMPLATE = ${JSON.stringify(jinjaTemplate)};

export const ERPNextPrintFormatGuide: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ERPNEXT_INVOICE_JINJA_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: 100% Polish Guarantee */}
      <div className="p-4 bg-[#ECFDF5] border-2 border-[#10B981] rounded-2xl flex items-start gap-3 shadow-[2px_2px_0px_0px_#171717]">
        <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
        <div className="text-xs text-[#065F46] space-y-1">
          <p className="font-black text-sm uppercase text-[#047857]">
            আপডেটেড: ১০০% বর্ডার-ফ্রি লোগো ও প্রিমিয়াম কর্পোরেট ফিনিশিং
          </p>
          <p className="font-medium leading-relaxed">
            • লোগোর চারপাশের সব কালো বক্স ও বর্ডার পুরোপুরি বাদ দেওয়া হয়েছে (১০০% ক্লিন ও ট্রান্সপারেন্ট)।<br/>
            • ৳৳ ডাবল টাকা সাইন সমস্যার স্থায়ী সমাধান করা হয়েছে (এখন শুধু একটি ৳ শো করবে)।<br/>
            • কার্টুনিশ বক্স বাদ দিয়ে ক্লিন আধুনিক বিজনেস ইনভয়েস লেআউট তৈরি করা হয়েছে।
          </p>
        </div>
      </div>

      {/* Step by Step Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="p-5 bg-white border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FF8A00] text-white flex items-center justify-center font-black text-xs">
              1
            </div>
            <h4 className="text-sm font-black font-heading uppercase text-[#171717]">
              আপডেটেড ক্লিন কোড কপি করুন
            </h4>
          </div>
          <p className="text-xs text-[#666666]">
            নিচের বাটনে ক্লিক করে পুরো কোডটি কপি করুন এবং ERPNext-এ আপনার <strong>Print Format</strong> পেজের <strong>HTML</strong> বক্সে রিপ্লেস করে পেস্ট করে Save দিন।
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-2.5 px-4 bg-[#FFC43C] hover:bg-[#FF8A00] text-[#171717] hover:text-white border-2 border-[#171717] rounded-xl text-xs font-black uppercase transition-colors flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_#171717] cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'কোড ক্লিপবোর্ডে কপি হয়েছে!' : 'নতুন পরিচ্ছন্ন কোড কপি করুন'}</span>
          </button>
        </div>

        {/* Card 2 */}
        <div className="p-5 bg-white border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-black text-xs">
              2
            </div>
            <h4 className="text-sm font-black font-heading uppercase text-[#171717]">
              ERPNext-এ আপডেট করার ধাপ
            </h4>
          </div>
          <ul className="text-xs text-[#555555] space-y-1.5 list-disc pl-4 font-medium">
            <li>ERPNext-এ যান: <a href="https://erpnext.ovisoft.tech/app/print-format/ARISTROCRAFT%20Tax%20Invoice" target="_blank" rel="noreferrer" className="text-[#0284C7] font-bold underline">ARISTROCRAFT Tax Invoice</a></li>
            <li>পূর্বের HTML কোড মুছে নতুন কোডটি পেস্ট করুন।</li>
            <li>Custom CSS বক্সটি ফাঁকা রাখুন (কারণ সব স্টাইল এই HTML-এর ভেতরেই অন্তর্ভুক্ত)।</li>
            <li>উপরে <strong>Save</strong> বাটনে চাপ দিন।</li>
          </ul>
        </div>
      </div>

      {/* Code Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#171717]">
            HTML ফিল্ডে পেস্ট করার আপডেটেড কোড:
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="text-xs font-black text-[#FF8A00] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Code</span>
          </button>
        </div>
        <pre className="p-4 bg-[#1E1E1E] text-[#E0E0E0] rounded-2xl text-[11px] font-mono overflow-x-auto max-h-[380px] border-2 border-[#171717]">
          <code>{ERPNEXT_INVOICE_JINJA_TEMPLATE}</code>
        </pre>
      </div>
    </div>
  );
};
`;

fs.writeFileSync(path.join(__dirname, '../src/components/admin/ERPNextPrintFormatGuide.tsx'), guideContent, 'utf8');
console.log('ERPNextPrintFormatGuide.tsx updated successfully');
