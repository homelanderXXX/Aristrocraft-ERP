import React, { useState, useEffect } from 'react';
import { erpnextService } from '../../lib/erpnext/service';
import {
  ERPNextConfig,
  ERPNextStats,
  ERPNextApiLog,
  ERPNextSalesInvoice,
  ERPNextQuotation,
  ERPNextIssue,
  ERPNextStockBin,
} from '../../types';
import {
  Server,
  Key,
  Globe,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Package,
  ShoppingCart,
  Users,
  ChevronDown,
  ChevronUp,
  Terminal,
  Clock,
  Eye,
  EyeOff,
  Copy,
  Check,
  Building2,
  Boxes,
  FileText,
  LifeBuoy,
  Printer,
  DollarSign,
  Layers,
  Mail,
} from 'lucide-react';
import { ERPNextInvoiceModal } from '../invoice/ERPNextInvoiceModal';
import { ERPNextPrintFormatGuide } from './ERPNextPrintFormatGuide';
import { ERPNextEmailSyncCard } from './ERPNextEmailSyncCard';

type ActiveTab = 'overview' | 'print_format' | 'email_sync' | 'invoices' | 'quotations' | 'tickets' | 'stock' | 'logs';

export const ERPNextConfigCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [config, setConfig] = useState<ERPNextConfig | null>(null);
  const [stats, setStats] = useState<ERPNextStats | null>(null);
  const [logs, setLogs] = useState<ERPNextApiLog[]>([]);

  // Tab Data States
  const [invoices, setInvoices] = useState<ERPNextSalesInvoice[]>([]);
  const [quotations, setQuotations] = useState<ERPNextQuotation[]>([]);
  const [issues, setIssues] = useState<ERPNextIssue[]>([]);
  const [stockBins, setStockBins] = useState<ERPNextStockBin[]>([]);
  const [isLoadingTab, setIsLoadingTab] = useState(false);

  // Connection settings
  const [apiUrl, setApiUrl] = useState('https://erpnext.ovisoft.tech');
  const [apiKey, setApiKey] = useState('a60ae72ff6f8cbb');
  const [apiSecret, setApiSecret] = useState('8c5d0aa43865737');
  const [company, setCompany] = useState('Aristro Craft');
  const [showSecret, setShowSecret] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncingCatalog, setIsSyncingCatalog] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Selected Invoice for Modal
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const fetchERPNextData = async () => {
    const data = await erpnextService.getConfig();
    if (data) {
      setConfig(data.config);
      setStats(data.stats);
      if (data.config.apiUrl) setApiUrl(data.config.apiUrl);
      if (data.config.apiKey) setApiKey(data.config.apiKey);
      if (data.config.company) setCompany(data.config.company);
    }
    const logData = await erpnextService.getLogs();
    if (logData?.logs) {
      setLogs(logData.logs.slice(0, 12));
    }
  };

  const loadTabData = async (tab: ActiveTab) => {
    setIsLoadingTab(true);
    try {
      if (tab === 'invoices') {
        const res = await erpnextService.getInvoices();
        if (res.success) setInvoices(res.invoices);
      } else if (tab === 'quotations') {
        const res = await erpnextService.getQuotations();
        if (res.success) setQuotations(res.quotations);
      } else if (tab === 'tickets') {
        const res = await erpnextService.getIssues();
        if (res.success) setIssues(res.issues);
      } else if (tab === 'stock') {
        const res = await erpnextService.getStock();
        if (res.success) setStockBins(res.bins);
      }
    } catch (err) {
      console.warn('Error loading tab data:', err);
    } finally {
      setIsLoadingTab(false);
    }
  };

  useEffect(() => {
    fetchERPNextData();
    const interval = setInterval(fetchERPNextData, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab !== 'overview' && activeTab !== 'logs') {
      loadTabData(activeTab);
    }
  }, [activeTab]);

  const handleTestConnection = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!apiUrl.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your ERPNext URL (e.g. https://erpnext.ovisoft.tech)' });
      return;
    }

    setIsTesting(true);
    setFeedback(null);
    try {
      const res = await erpnextService.updateConfig({
        apiUrl: apiUrl.trim(),
        apiKey: apiKey.trim() || undefined,
        apiSecret: apiSecret.trim() || undefined,
        company: company.trim() || undefined,
      });

      if (res.success) {
        setFeedback({ type: 'success', message: res.message || 'Successfully connected to ERPNext!' });
        if (res.config) setConfig(res.config);
        fetchERPNextData();
      } else {
        setFeedback({ type: 'error', message: res.message || 'Failed to connect to ERPNext instance.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Network error communicating with ERPNext bridge.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSyncCatalog = async () => {
    setIsSyncingCatalog(true);
    setFeedback(null);
    try {
      const res = await erpnextService.syncCatalog();
      if (res.success) {
        setFeedback({
          type: 'success',
          message: `Successfully synchronized ${res.syncedCount} store products into ERPNext Items catalog!`,
        });
        fetchERPNextData();
      } else {
        setFeedback({ type: 'error', message: res.message || 'Failed to sync catalog items to ERPNext.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Error during catalog sync.' });
    } finally {
      setIsSyncingCatalog(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const isConnected = config?.connected ?? false;

  return (
    <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717] flex flex-col gap-6">
      {/* HEADER WITH BRANDING & LIVE STATUS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#171717]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#0070F3] text-white border-2 border-[#171717] rounded-2xl flex items-center justify-center font-black shadow-[3px_3px_0px_0px_#171717]">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black font-heading uppercase text-[#171717]">
                ERPNext Enterprise Hub
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#E0F2FE] border border-[#0284C7] text-[#0284C7] text-[10px] font-black uppercase">
                Direct Host
              </span>
            </div>
            <p className="text-xs font-bold text-[#666666] flex items-center gap-1.5 mt-0.5">
              <span>Host:</span>
              <span className="font-mono text-[#171717]">{config?.apiUrl || 'erpnext.ovisoft.tech'}</span>
              <span>•</span>
              <span>Company:</span>
              <span className="font-mono text-[#171717]">{config?.company || 'Aristro Craft'}</span>
            </p>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1.5 rounded-full border-2 border-[#171717] text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[2px_2px_0px_0px_#171717] ${
              isConnected
                ? 'bg-[#E6F4EA] text-[#137333]'
                : 'bg-[#FCE8E6] text-[#C5221F]'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isConnected ? 'bg-[#137333] animate-pulse' : 'bg-[#C5221F]'
              }`}
            />
            <span>{isConnected ? 'ERPNext Online & Linked' : 'Disconnected'}</span>
          </div>

          <button
            type="button"
            onClick={fetchERPNextData}
            title="Refresh connection status"
            className="w-8 h-8 rounded-full border-2 border-[#171717] bg-[#FFF9ED] hover:bg-[#FFC43C] flex items-center justify-center transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#171717]" />
          </button>
        </div>
      </div>

      {/* FEEDBACK BANNER */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl border-2 flex items-start gap-2.5 text-xs font-bold ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
              : 'bg-red-50 border-red-600 text-red-900'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">{feedback.message}</div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs opacity-60 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* NAVIGATION SUB-TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b-2 border-[#171717]/10">
        {[
          { key: 'overview', label: 'Overview & Sync', icon: Server },
          { key: 'email_sync', label: 'Email & SMTP Sync', icon: Mail },
          { key: 'print_format', label: 'Print Format (Invoice & Logo)', icon: Printer },
          { key: 'invoices', label: 'Sales Invoices', icon: FileText, count: invoices.length || undefined },
          { key: 'quotations', label: 'Quotations & Leads', icon: DollarSign, count: quotations.length || undefined },
          { key: 'tickets', label: 'Support Tickets', icon: LifeBuoy, count: issues.length || undefined },
          { key: 'stock', label: 'Stock Bins', icon: Boxes, count: stockBins.length || undefined },
          { key: 'logs', label: 'API Stream', icon: Terminal, count: logs.length || undefined },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as ActiveTab)}
              className={`px-3.5 py-2 rounded-xl border-2 font-black font-heading text-xs uppercase tracking-wide flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#FFC43C] text-[#171717] border-[#171717] shadow-[2px_2px_0px_0px_#171717]'
                  : 'bg-[#FFFDF7] hover:bg-[#FFF9ED] text-[#666] border-[#171717]/20 hover:border-[#171717]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="px-1.5 py-0.2 bg-[#171717] text-white rounded-full text-[10px] font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: 1. OVERVIEW & SYNC */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#888888]">
                <Package className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>Catalog Items</span>
              </div>
              <p className="text-xl font-black font-heading text-[#171717] mt-1">
                {stats?.itemsCount ?? 0}
              </p>
              <span className="text-[10px] font-bold text-emerald-600">Synced in ERP</span>
            </div>

            <div className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#888888]">
                <ShoppingCart className="w-3.5 h-3.5 text-[#0070F3]" />
                <span>Sales Orders</span>
              </div>
              <p className="text-xl font-black font-heading text-[#171717] mt-1">
                {stats?.ordersCount ?? 0}
              </p>
              <span className="text-[10px] font-bold text-[#666666]">Automated push</span>
            </div>

            <div className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#888888]">
                <Users className="w-3.5 h-3.5 text-purple-600" />
                <span>Customers</span>
              </div>
              <p className="text-xl font-black font-heading text-[#171717] mt-1">
                {stats?.customersCount ?? 0}
              </p>
              <span className="text-[10px] font-bold text-[#666666]">In ERP Directory</span>
            </div>

            <div className="p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#888888]">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Company</span>
              </div>
              <p className="text-sm font-black font-heading text-[#171717] mt-1 truncate">
                {config?.company || 'Aristro Craft'}
              </p>
              <span className="text-[10px] font-bold text-emerald-600">Default Currency: BDT</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={handleSyncCatalog}
              disabled={isSyncingCatalog || !isConnected}
              className="px-4 py-3 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2 border-[#171717] rounded-2xl font-black font-heading text-xs shadow-[3px_3px_0px_0px_#171717] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncingCatalog ? 'animate-spin' : ''}`} />
              <span>{isSyncingCatalog ? 'Syncing Catalog...' : 'Sync Catalog to ERP'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleTestConnection()}
              disabled={isTesting}
              className="px-4 py-3 bg-white hover:bg-[#FFF9ED] text-[#171717] border-2 border-[#171717] rounded-2xl font-black font-heading text-xs shadow-[3px_3px_0px_0px_#171717] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 text-[#FF8A00] ${isTesting ? 'animate-bounce' : ''}`} />
              <span>{isTesting ? 'Testing API...' : 'Test Live Connection'}</span>
            </button>

            <a
              href="https://erpnext.ovisoft.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-[#171717] hover:bg-[#333333] text-white border-2 border-[#171717] rounded-2xl font-black font-heading text-xs shadow-[3px_3px_0px_0px_#FFC43C] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-[#FFC43C]" />
              <span>Open ERPNext Desk ↗</span>
            </a>
          </div>

          {/* Collapsible Connection Credentials */}
          <div className="border-2 border-[#171717] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setConfigOpen(!configOpen)}
              className="w-full px-4 py-3 bg-[#FFFDF7] flex items-center justify-between text-xs font-black font-heading uppercase text-[#171717] hover:bg-[#FFF9ED] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-[#FF8A00]" />
                <span>Connection Credentials & Instance Settings</span>
              </div>
              {configOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {configOpen && (
              <form onSubmit={handleTestConnection} className="p-4 bg-white border-t-2 border-[#171717] flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-[#888888] mb-1">
                      ERPNext Host URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                        placeholder="https://erpnext.ovisoft.tech"
                        className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl px-3 py-2 text-xs font-bold font-mono text-[#171717] outline-none focus:border-[#FF8A00]"
                      />
                      <Globe className="w-4 h-4 text-[#888888] absolute right-3 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-[#888888] mb-1">
                      Company Name in ERPNext
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Aristro Craft"
                      className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl px-3 py-2 text-xs font-bold text-[#171717] outline-none focus:border-[#FF8A00]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-[#888888] mb-1">
                      API Key
                    </label>
                    <input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="a60ae72ff6f8cbb"
                      className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl px-3 py-2 text-xs font-bold font-mono text-[#171717] outline-none focus:border-[#FF8A00]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-[#888888] mb-1">
                      API Secret
                    </label>
                    <div className="relative">
                      <input
                        type={showSecret ? 'text' : 'password'}
                        value={apiSecret}
                        onChange={(e) => setApiSecret(e.target.value)}
                        placeholder="8c5d0aa43865737"
                        className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl px-3 py-2 text-xs font-bold font-mono text-[#171717] outline-none focus:border-[#FF8A00]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSecret(!showSecret)}
                        className="absolute right-3 top-2.5 text-[#888888] hover:text-[#171717] cursor-pointer"
                      >
                        {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={isTesting}
                    className="px-5 py-2.5 bg-[#FF8A00] hover:bg-[#E07900] text-white border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase tracking-wide shadow-[2px_2px_0px_0px_#171717] cursor-pointer"
                  >
                    {isTesting ? 'Saving & Testing...' : 'Save & Reconnect'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: EMAIL & SMTP SYNCHRONIZATION */}
      {activeTab === 'email_sync' && (
        <ERPNextEmailSyncCard />
      )}

      {/* TAB CONTENT: PRINT FORMAT GUIDE & TEMPLATE */}
      {activeTab === 'print_format' && (
        <ERPNextPrintFormatGuide />
      )}

      {/* TAB CONTENT: 2. SALES INVOICES */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#666]">
              Real-time synchronization with ERPNext Accounts Receivable (`Sales Invoice`)
            </span>
            <button
              type="button"
              onClick={() => loadTabData('invoices')}
              disabled={isLoadingTab}
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF8A00] hover:underline cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingTab ? 'animate-spin' : ''}`} />
              <span>Refresh Invoices</span>
            </button>
          </div>

          <div className="border-2 border-[#171717] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#171717] text-white font-heading font-black uppercase text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Invoice Number</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Due Date</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717]/10">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500 font-semibold">
                      {isLoadingTab ? 'Loading invoices from ERPNext...' : 'No sales invoices found in ERPNext.'}
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.name} className="hover:bg-[#FFF9ED]">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#171717]">{inv.name}</td>
                      <td className="py-2.5 px-3 font-semibold text-[#171717]">{inv.customer_name || inv.customer}</td>
                      <td className="py-2.5 px-3 text-gray-600">{inv.due_date || inv.posting_date}</td>
                      <td className="py-2.5 px-3 text-right font-black font-mono">৳{Number(inv.grand_total || 0).toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#E0F2FE] text-[#0284C7] border border-[#0284C7]/30">
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedInvoice({
                              invoiceNumber: inv.name,
                              orderNumber: inv.name,
                              customerName: inv.customer_name || inv.customer,
                              date: inv.posting_date || new Date().toISOString(),
                              subtotal: inv.grand_total,
                              deliveryFee: 0,
                              total: inv.grand_total,
                              items: [{ productName: '3D Print Order Fulfillment', qty: 1, rate: inv.grand_total }],
                            })
                          }
                          className="px-2.5 py-1 bg-white hover:bg-[#FFC43C] text-[#171717] border border-[#171717] rounded-lg text-[10px] font-black uppercase cursor-pointer"
                        >
                          Print
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. QUOTATIONS & LEADS */}
      {activeTab === 'quotations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#666]">
              Custom 3D Printing inquiries synced with ERPNext CRM (`Quotation`)
            </span>
            <button
              type="button"
              onClick={() => loadTabData('quotations')}
              disabled={isLoadingTab}
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF8A00] hover:underline cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingTab ? 'animate-spin' : ''}`} />
              <span>Refresh Quotations</span>
            </button>
          </div>

          <div className="border-2 border-[#171717] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#171717] text-white font-heading font-black uppercase text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Quotation ID</th>
                  <th className="py-2.5 px-3">Party / Client</th>
                  <th className="py-2.5 px-3">Valid Until</th>
                  <th className="py-2.5 px-3 text-right">Estimated Total</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717]/10">
                {quotations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500 font-semibold">
                      {isLoadingTab ? 'Loading quotations from ERPNext...' : 'No active quotations in ERPNext.'}
                    </td>
                  </tr>
                ) : (
                  quotations.map((qtn) => (
                    <tr key={qtn.name} className="hover:bg-[#FFF9ED]">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#171717]">{qtn.name}</td>
                      <td className="py-2.5 px-3 font-semibold text-[#171717]">{qtn.customer_name || qtn.party_name}</td>
                      <td className="py-2.5 px-3 text-gray-600">{qtn.valid_till || qtn.transaction_date}</td>
                      <td className="py-2.5 px-3 text-right font-black font-mono">৳{Number(qtn.grand_total || 0).toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/30">
                          {qtn.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. SUPPORT TICKETS (ISSUES) */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#666]">
              Customer inquiries & print issues synced directly with ERPNext Helpdesk (`Issue`)
            </span>
            <button
              type="button"
              onClick={() => loadTabData('tickets')}
              disabled={isLoadingTab}
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF8A00] hover:underline cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingTab ? 'animate-spin' : ''}`} />
              <span>Refresh Tickets</span>
            </button>
          </div>

          <div className="border-2 border-[#171717] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#171717] text-white font-heading font-black uppercase text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Ticket ID</th>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Raised By</th>
                  <th className="py-2.5 px-3 text-center">Priority</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717]/10">
                {issues.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500 font-semibold">
                      {isLoadingTab ? 'Loading issues from ERPNext...' : 'No open support tickets in ERPNext.'}
                    </td>
                  </tr>
                ) : (
                  issues.map((iss) => (
                    <tr key={iss.name} className="hover:bg-[#FFF9ED]">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#171717]">{iss.name}</td>
                      <td className="py-2.5 px-3 font-semibold text-[#171717]">{iss.subject}</td>
                      <td className="py-2.5 px-3 text-gray-600 font-mono text-[11px]">{iss.raised_by}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#FEE2E2] text-[#DC2626]">
                          {iss.priority}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#DCFCE7] text-[#16A34A]">
                          {iss.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 5. STOCK BINS */}
      {activeTab === 'stock' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#666]">
              ERPNext Live Stock Ledger (`Bin` warehouse inventory balances)
            </span>
            <button
              type="button"
              onClick={() => loadTabData('stock')}
              disabled={isLoadingTab}
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF8A00] hover:underline cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingTab ? 'animate-spin' : ''}`} />
              <span>Refresh Stock</span>
            </button>
          </div>

          <div className="border-2 border-[#171717] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#171717] text-white font-heading font-black uppercase text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Item Code</th>
                  <th className="py-2.5 px-3">Warehouse</th>
                  <th className="py-2.5 px-3 text-right">Actual Qty</th>
                  <th className="py-2.5 px-3 text-right">Projected Qty</th>
                  <th className="py-2.5 px-3 text-center">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717]/10">
                {stockBins.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500 font-semibold">
                      {isLoadingTab ? 'Loading stock from ERPNext...' : 'All catalog items set to Print-on-Demand (Made to Order). Bins populate on Stock Entry.'}
                    </td>
                  </tr>
                ) : (
                  stockBins.map((bin) => (
                    <tr key={bin.name} className="hover:bg-[#FFF9ED]">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#171717]">{bin.item_code}</td>
                      <td className="py-2.5 px-3 font-semibold text-[#171717]">{bin.warehouse}</td>
                      <td className="py-2.5 px-3 text-right font-black font-mono">{bin.actual_qty}</td>
                      <td className="py-2.5 px-3 text-right font-black font-mono">{bin.projected_qty}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${bin.actual_qty > 0 ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEF3C7] text-[#D97706]'}`}>
                          {bin.actual_qty > 0 ? 'In Stock' : 'On-Demand'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 6. API REQUEST STREAM */}
      {activeTab === 'logs' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#666]">
              Real-time audit log of HTTP calls made to `{config?.apiUrl || 'erpnext.ovisoft.tech'}`
            </span>
            <button
              type="button"
              onClick={fetchERPNextData}
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF8A00] hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Logs</span>
            </button>
          </div>

          <div className="p-4 bg-[#171717] text-white rounded-2xl border-2 border-[#171717] font-mono text-xs max-h-72 overflow-y-auto space-y-2">
            {logs.length === 0 ? (
              <p className="text-gray-400 italic">No recent API requests logged yet.</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-start justify-between gap-3 pb-2 border-b border-gray-800 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.5 rounded font-black text-[10px] ${
                        log.method === 'GET'
                          ? 'bg-blue-900 text-blue-300'
                          : log.method === 'POST'
                          ? 'bg-emerald-900 text-emerald-300'
                          : 'bg-purple-900 text-purple-300'
                      }`}
                    >
                      {log.method}
                    </span>
                    <span className="text-gray-200">{log.endpoint}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`font-bold ${
                        log.status >= 200 && log.status < 300
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    >
                      {log.status}
                    </span>
                    <span className="text-gray-500">{log.durationMs}ms</span>
                    <span className="text-gray-400 text-[10px]">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Invoice Viewer Modal */}
      {selectedInvoice && (
        <ERPNextInvoiceModal
          isOpen={true}
          onClose={() => setSelectedInvoice(null)}
          invoiceData={selectedInvoice}
        />
      )}
    </div>
  );
};
