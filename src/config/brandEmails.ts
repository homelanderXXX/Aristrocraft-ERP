/**
 * ARISTROCRAFT Brand Emails & ERPNext SMTP Mailbox Configuration
 * Single source of truth for brand email routing and ERPNext notifications
 */

export interface MailboxSpec {
  id: string;
  email: string;
  label: string;
  purpose: string;
  erpModule: string;
  status: 'active' | 'configured' | 'pending_cpanel';
  incomingProtocol: 'IMAP' | 'POP3';
  outgoingProtocol: 'SMTP';
}

export const BRAND_DOMAIN = 'aristrocrafts.com';
export const BRAND_WEBSITE_URL = 'https://aristrocrafts.com';

export const BRAND_MAILBOXES: Record<string, MailboxSpec> = {
  info: {
    id: 'info',
    email: 'info@aristrocrafts.com',
    label: 'Official & General Inquiries',
    purpose: 'Main contact address, website general forms, B2B queries, brand partnerships.',
    erpModule: 'Communication & Lead Management',
    status: 'active', // Already created by user
    incomingProtocol: 'IMAP',
    outgoingProtocol: 'SMTP',
  },
  sales: {
    id: 'sales',
    email: 'sales@aristrocrafts.com',
    label: 'Sales, Invoices & Orders',
    purpose: 'Automated ERPNext Sales Invoices, Quotations, Order dispatch alerts, payment receipts.',
    erpModule: 'Accounts & Selling (Sales Invoice / Sales Order)',
    status: 'configured',
    incomingProtocol: 'IMAP',
    outgoingProtocol: 'SMTP',
  },
  support: {
    id: 'support',
    email: 'support@aristrocrafts.com',
    label: 'Customer Support & Helpdesk',
    purpose: 'Post-purchase help, custom print file revisions, replacement requests, warranty claims.',
    erpModule: 'Support & Issue Tickets (HD-TICKET)',
    status: 'configured',
    incomingProtocol: 'IMAP',
    outgoingProtocol: 'SMTP',
  },
  billing: {
    id: 'billing',
    email: 'billing@aristrocrafts.com',
    label: 'Billing & Accounts (bKash / Nagad / Bank)',
    purpose: 'Payment verification, accountant communications, tax statements.',
    erpModule: 'Payment Entry & Accounts Receivable',
    status: 'configured',
    incomingProtocol: 'IMAP',
    outgoingProtocol: 'SMTP',
  },
};

export const ERPNEXT_EMAIL_SMTP_CONFIG = {
  domain: BRAND_DOMAIN,
  smtpServer: `mail.${BRAND_DOMAIN}`,
  smtpPortSSL: 465,
  smtpPortTLS: 587,
  imapServer: `mail.${BRAND_DOMAIN}`,
  imapPortSSL: 993,
  pop3PortSSL: 995,
  defaultSenderName: 'ARISTROCRAFT 3D Labs',
  defaultSenderEmail: 'info@aristrocrafts.com',
  erpnextEmailAccountUrl: 'https://erpnext.ovisoft.tech/app/email-account',
  erpnextNotificationUrl: 'https://erpnext.ovisoft.tech/app/notification',
};
