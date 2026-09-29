import React, { useState, useEffect } from 'react';
import { dolibarrService } from '../../lib/dolibarr/service';
import { DolibarrConfig, DolibarrStats, DolibarrApiLog } from '../../types';
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
  Layers,
  ChevronDown,
  ChevronUp,
  Terminal,
  Clock,
  Eye,
  EyeOff,
  Copy,
  Check,
} from 'lucide-react';

export const DolibarrConfigCard: React.FC = () => {
  const [config, setConfig] = useState<DolibarrConfig | null>(null);
  const [stats, setStats] = useState<DolibarrStats | null>(null);
  const [logs, setLogs] = useState<DolibarrApiLog[]>([]);
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [logsOpen, setLogsOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const fetchDolibarrData = async () => {
    const data = await dolibarrService.getConfig();
    if (data) {
      setConfig(data.config);
      setStats(data.stats);
      if (data.config.apiUrl) setApiUrl(data.config.apiUrl);
    }
    const logData = await dolibarrService.getLogs();
    if (logData?.logs) {
      setLogs(logData.logs.slice(0, 8));
    }
  };

  useEffect(() => {
    fetchDolibarrData();
    const interval = setInterval(fetchDolibarrData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleTestConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiUrl.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your Dolibarr API URL (e.g. https://erp.domain.com/api/index.php)' });
      return;
    }
    if (!apiKey.trim() && !config?.hasApiKey) {
      setFeedback({ type: 'error', message: 'Please enter your Dolibarr API Key (DOLAPIKEY)' });
      return;
    }

    setIsTesting(true);
    setFeedback(null);
    try {
      const res = await dolibarrService.updateConfig({
        apiUrl: apiUrl.trim(),
        apiKey: apiKey.trim() || undefined,
        isSandbox: false,
      });

      if (res.success) {
        setFeedback({ type: 'success', message: res.message || 'Successfully connected to Dolibarr ERP!' });
        if (res.config) setConfig(res.config);
        fetchDolibarrData();
      } else {
        setFeedback({ type: 'error', message: res.message || 'Failed to connect to Dolibarr server.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Network error communicating with bridge.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSwitchSandbox = async () => {
    setIsTesting(true);
    setFeedback(null);
    try {
      const res = await dolibarrService.updateConfig({ isSandbox: true });
      if (res.success) {
        setFeedback({ type: 'success', message: 'Switched to Dolibarr Sandbox Simulation mode with loaded sample data.' });
        if (res.config) setConfig(res.config);
        fetchDolibarrData();
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setIsTesting(false);
    }
  };

  const handleTriggerSync = async () => {
    setIsSyncing(true);
    try {
      const res = await dolibarrService.triggerSync();
      if (res.success) {
        setFeedback({ type: 'success', message: `Sync complete: ${res.stats.products} products, ${res.stats.orders} orders active.` });
        fetchDolibarrData();
      } else {
        setFeedback({ type: 'error', message: res.message });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setIsSyncing(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const isLive = config?.connected && !config?.isSandbox;
  const isSandbox = config?.connected && config?.isSandbox;

  return (
    <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717] col-span-1 lg:col-span-2">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-[#171717] mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-2xl flex items-center justify-center font-black shadow-hard-sm">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black font-heading uppercase text-[#171717]">
                Dolibarr ERP Direct Integration
              </h2>
              {isLive && (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Connected
                </span>
              )}
              {isSandbox && (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black uppercase bg-[#FFC43C] text-[#171717] border border-[#171717]">
                  <span className="w-2 h-2 rounded-full bg-[#FF8A00]"></span>
                  Sandbox Engine Active
                </span>
              )}
              {!config?.connected && (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black uppercase bg-rose-100 text-rose-800 border border-rose-400">
                  Disconnected
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-[#666666]">
              Real-time synchronization for 3D printing orders, inventory, filament stock & invoices
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTriggerSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2 bg-[#FFF9ED] text-[#171717] border-2 border-[#171717] rounded-xl font-black text-xs uppercase shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#FF8A00]' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Catalog & Stock'}
          </button>
        </div>
      </div>

      {/* FEEDBACK ALERT */}
      {feedback && (
        <div
          className={`mb-6 p-4 rounded-2xl border-2 flex items-start gap-3 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
              : 'bg-rose-50 border-rose-500 text-rose-900'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="text-xs font-bold">{feedback.message}</div>
        </div>
      )}

      {/* LIVE STATS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl shadow-hard-sm">
          <div className="flex items-center justify-between text-[#888888] mb-1">
            <span className="text-[10px] font-black uppercase">Catalog Items</span>
            <Package className="w-4 h-4 text-[#FF8A00]" />
          </div>
          <div className="text-2xl font-black font-heading text-[#171717]">
            {stats?.productsCount ?? 0}
          </div>
          <span className="text-[10px] font-bold text-[#666666]">Products in ERP</span>
        </div>

        <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl shadow-hard-sm">
          <div className="flex items-center justify-between text-[#888888] mb-1">
            <span className="text-[10px] font-black uppercase">Sales Orders</span>
            <ShoppingCart className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black font-heading text-[#171717]">
            {stats?.ordersCount ?? 0}
          </div>
          <span className="text-[10px] font-bold text-[#666666]">Dolibarr Commandes</span>
        </div>

        <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl shadow-hard-sm">
          <div className="flex items-center justify-between text-[#888888] mb-1">
            <span className="text-[10px] font-black uppercase">Customers</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black font-heading text-[#171717]">
            {stats?.thirdpartiesCount ?? 0}
          </div>
          <span className="text-[10px] font-bold text-[#666666]">Third Parties</span>
        </div>

        <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl shadow-hard-sm">
          <div className="flex items-center justify-between text-[#888888] mb-1">
            <span className="text-[10px] font-black uppercase">Stock Available</span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black font-heading text-[#171717]">
            {stats?.totalInventoryUnits ?? 0}
          </div>
          <span className="text-[10px] font-bold text-[#666666]">Units & Spools</span>
        </div>
      </div>

      {/* CREDENTIALS FORM */}
      <form onSubmit={handleTestConnection} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase text-[#171717] mb-1.5 flex items-center justify-between">
              <span>Dolibarr REST API URL</span>
              <span className="text-[10px] text-[#888888] font-semibold lowercase">https://your-domain/api/index.php</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://erp.yourdomain.com/api/index.php"
                className="w-full px-4 py-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl text-xs font-mono font-bold text-[#171717] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all"
              />
              <Globe className="w-4 h-4 text-[#888888] absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-[#171717] mb-1.5 flex items-center justify-between">
              <span>API Key (DOLAPIKEY)</span>
              <span className="text-[10px] text-[#888888] font-semibold">User Security Profile Key</span>
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={config?.hasApiKey ? '•••••••••••••••••••••••• (Saved in Server)' : 'Enter 32+ char DOLAPIKEY'}
                className="w-full px-4 py-3 pr-20 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl text-xs font-mono font-bold text-[#171717] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-3 text-[#888888] hover:text-[#171717] p-1 transition-colors"
                title={showApiKey ? 'Hide Key' : 'Show Key'}
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isTesting}
              className="flex items-center gap-2 px-6 py-3 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-xl font-black text-xs uppercase shadow-hard-md hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
            >
              {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-white" />}
              {isTesting ? 'Connecting to Server...' : 'Test & Connect Live Dolibarr'}
            </button>

            <button
              type="button"
              onClick={handleSwitchSandbox}
              disabled={isTesting}
              className="px-4 py-3 bg-white text-[#171717] border-2 border-[#171717] rounded-xl font-black text-xs uppercase shadow-hard-sm hover:bg-[#FFF9ED] transition-all"
            >
              Run In Sandbox Mode
            </button>
          </div>

          <div className="text-[11px] font-bold text-[#666666]">
            Active Engine: <span className="text-[#171717] font-black">{config?.version || 'Dolibarr ERP v20.0'}</span>
          </div>
        </div>
      </form>

      {/* STEP-BY-STEP SERVER GUIDE (ACCORDION) */}
      <div className="border-2 border-[#171717] rounded-2xl overflow-hidden mb-6">
        <button
          type="button"
          onClick={() => setGuideOpen(!guideOpen)}
          className="w-full flex items-center justify-between px-5 py-3.5 bg-[#FFF9ED] hover:bg-[#FFEECB] text-left font-black text-xs uppercase text-[#171717] transition-colors"
        >
          <span className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#FF8A00]" />
            সার্ভারে Dolibarr-এ কী কী করতে হবে (Step-by-Step Server Setup Guide)
          </span>
          {guideOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {guideOpen && (
          <div className="p-5 bg-white space-y-4 text-xs font-semibold text-[#171717] border-t-2 border-[#171717]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1 */}
              <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl space-y-2">
                <div className="w-7 h-7 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-lg flex items-center justify-center font-black text-xs">
                  ১
                </div>
                <div className="font-black text-sm uppercase font-heading">REST API মডিউল অন করুন</div>
                <p className="text-[#666666] text-[11px] leading-relaxed">
                  আপনার Dolibarr-এ লগইন করে যান:
                  <br />
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#ddd] mt-1 inline-block">
                    Home &gt; Setup &gt; Modules/Applications
                  </span>
                  <br />
                  খুঁজে বের করুন <strong>Web Services (REST API)</strong> এবং সুইচটি <strong>ON</strong> করে দিন।
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl space-y-2">
                <div className="w-7 h-7 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-lg flex items-center justify-center font-black text-xs">
                  ২
                </div>
                <div className="font-black text-sm uppercase font-heading">API Key (DOLAPIKEY) নিন</div>
                <p className="text-[#666666] text-[11px] leading-relaxed">
                  যান:
                  <br />
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#ddd] mt-1 inline-block">
                    Home &gt; Users &amp; Groups
                  </span>
                  <br />
                  আপনার ইউজার অ্যাকাউন্টে ক্লিক করে <strong>Modify</strong> চাপুন। <strong>API Key</strong> ফিল্ডের পাশে <strong>Generate</strong> বাটনে ক্লিক করে সিক্রেট কি-টি কপি করুন।
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl space-y-2">
                <div className="w-7 h-7 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-lg flex items-center justify-center font-black text-xs">
                  ৩
                </div>
                <div className="font-black text-sm uppercase font-heading">কানেক্ট ও টেস্ট করুন</div>
                <p className="text-[#666666] text-[11px] leading-relaxed">
                  উপরের ফর্মে আপনার ডোমেনের সম্পূর্ণ API URL (যেমন: <code className="font-mono">https://erp.domain.com/api/index.php</code>) এবং API Key পেস্ট করে <strong>Test &amp; Connect</strong> চাপুন!
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#171717] text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px]">
              <div>
                <span className="text-[#FFC43C] font-black block">💡 প্রো-টিপ (.env ফাইল কনফিগারেশন):</span>
                <span>সার্ভারে রিস্টার্ট দিলেও যাতে কানেকশন অটো থাকে, আপনার .env ফাইলে এগুলো লিখে দিন:</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    `DOLIBARR_API_URL=${apiUrl || 'https://erp.yourdomain.com/api/index.php'}\nDOLIBARR_API_KEY=${apiKey || 'YOUR_DOLAPIKEY_HERE'}`,
                    'env'
                  )
                }
                className="px-3 py-1.5 bg-[#FF8A00] text-white rounded-lg font-black text-[10px] uppercase flex items-center gap-1.5 shrink-0"
              >
                {copiedText === 'env' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedText === 'env' ? 'Copied' : 'Copy .env variables'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* LIVE TRAFFIC LOGS (ACCORDION) */}
      <div className="border-2 border-[#171717] rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setLogsOpen(!logsOpen)}
          className="w-full flex items-center justify-between px-5 py-3.5 bg-[#FFF9ED] hover:bg-[#FFEECB] text-left font-black text-xs uppercase text-[#171717] transition-colors"
        >
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            Live Dolibarr REST API Traffic Stream ({logs.length} calls logged)
          </span>
          {logsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {logsOpen && (
          <div className="p-4 bg-[#171717] text-white overflow-x-auto border-t-2 border-[#171717]">
            {logs.length === 0 ? (
              <div className="text-center py-6 text-[#888888] text-xs font-mono">
                No API calls recorded yet. Place an order or click &apos;Sync&apos; to trigger traffic.
              </div>
            ) : (
              <table className="w-full text-left font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-[#333333] text-[#888888]">
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Method</th>
                    <th className="pb-2">Endpoint</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626]">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#222222]">
                      <td className="py-2 text-[#888888]">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${
                            log.method === 'GET'
                              ? 'bg-blue-900/60 text-blue-300'
                              : log.method === 'POST'
                              ? 'bg-emerald-900/60 text-emerald-300'
                              : 'bg-yellow-900/60 text-yellow-300'
                          }`}
                        >
                          {log.method}
                        </span>
                      </td>
                      <td className="py-2 font-bold text-white truncate max-w-xs">{log.endpoint}</td>
                      <td className="py-2">
                        <span
                          className={`font-black ${
                            log.status >= 200 && log.status < 300
                              ? 'text-emerald-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="py-2 text-[#888888]">{log.durationMs}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
