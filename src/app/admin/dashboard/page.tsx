import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { useRouter } from '../../../context/RouterContext';
import { adminRepository, DashboardMetrics } from '../../../lib/supabase/repositories/adminRepository';
import {
  ShoppingBag,
  Clock,
  Printer,
  CheckCircle2,
  FileText,
  Box,
  AlertTriangle,
  Plus,
  ArrowRight,
  RefreshCw,
  Eye,
  Loader2,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const data = await adminRepository.getDashboardMetrics();
      setMetrics(data);
    } catch (err) {
      console.warn('Error loading dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-[#FFC43C] text-[#171717] border border-[#171717]">Pending</span>;
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-900 border border-blue-400">Confirmed</span>;
      case 'printing':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-purple-100 text-purple-900 border border-purple-400 animate-pulse">3D Printing</span>;
      case 'ready':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-teal-100 text-teal-900 border border-teal-400">Ready</span>;
      case 'dispatched':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-orange-100 text-orange-900 border border-orange-400">Dispatched</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-400">Delivered</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-red-100 text-red-900 border border-red-400">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-gray-100 text-gray-800 border border-gray-300">{status}</span>;
    }
  };

  return (
    <AdminLayout
      currentTab="dashboard"
      title="STUDIO DASHBOARD"
      subtitle="Live e-commerce metrics, fulfillment pipeline & custom printing orders"
    >
      {/* QUICK ACTIONS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2.5 bg-[#FF8A00] text-white text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#171717] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3px]" />
            <span>Manage Products</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/orders')}
            className="px-4 py-2.5 bg-white text-[#171717] text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#171717] transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders Queue</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/custom-orders')}
            className="px-4 py-2.5 bg-[#FFC43C] text-[#171717] text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#171717] transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Custom Prints</span>
          </button>
        </div>

        <button
          type="button"
          onClick={fetchMetrics}
          disabled={loading}
          className="p-2.5 bg-white border-2 border-[#171717] rounded-2xl shadow-[2px_2px_0px_0px_#171717] text-[#171717] hover:bg-[#FFF9ED] transition-all cursor-pointer"
          title="Refresh Data"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* METRIC CARDS GRID */}
      {loading ? (
        <div className="py-12 text-center bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#171717] mb-8">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FF8A00] mb-2" />
          <p className="text-xs font-bold text-[#6D6D6D]">Fetching metrics from Supabase database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* TOTAL ORDERS */}
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-5 shadow-[5px_5px_0px_0px_#171717] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-black uppercase text-[#888888] tracking-wider">Total Store Orders</p>
              <h3 className="text-3xl font-black font-heading text-[#171717] mt-1">
                {metrics?.totalOrders || 0}
              </h3>
              <p className="text-[10px] font-bold text-[#FF8A00] mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{metrics?.pendingOrders || 0} pending review</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_0px_#171717]">
              <ShoppingBag className="w-6 h-6 stroke-[2.5px]" />
            </div>
          </div>

          {/* ACTIVE PRINT QUEUE */}
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-5 shadow-[5px_5px_0px_0px_#171717] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-black uppercase text-[#888888] tracking-wider">Fulfillment Pipeline</p>
              <h3 className="text-3xl font-black font-heading text-[#171717] mt-1">
                {metrics?.processingOrders || 0}
              </h3>
              <p className="text-[10px] font-bold text-purple-700 mt-1 flex items-center gap-1">
                <Printer className="w-3 h-3" />
                <span>Confirmed & in production</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 text-white border-2 border-[#171717] rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_0px_#171717]">
              <Printer className="w-6 h-6 stroke-[2.5px]" />
            </div>
          </div>

          {/* CUSTOM 3D PRINT REQUESTS */}
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-5 shadow-[5px_5px_0px_0px_#171717] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-black uppercase text-[#888888] tracking-wider">Custom 3D Prints</p>
              <h3 className="text-3xl font-black font-heading text-[#171717] mt-1">
                {metrics?.customOrdersCount || 0}
              </h3>
              <p className="text-[10px] font-bold text-[#171717] mt-1 flex items-center gap-1">
                <FileText className="w-3 h-3 text-[#FFC43C]" />
                <span>Customer files & ideas</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-[#FFC43C] text-[#171717] border-2 border-[#171717] rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_0px_#171717]">
              <FileText className="w-6 h-6 stroke-[2.5px]" />
            </div>
          </div>

          {/* TOTAL PRODUCTS & INVENTORY ALERT */}
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-5 shadow-[5px_5px_0px_0px_#171717] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-black uppercase text-[#888888] tracking-wider">Catalog Products</p>
              <h3 className="text-3xl font-black font-heading text-[#171717] mt-1">
                {metrics?.totalProductsCount || 0}
              </h3>
              <p className="text-[10px] font-bold text-amber-700 mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                <span>{metrics?.lowStockProductsCount || 0} low stock items</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500 text-white border-2 border-[#171717] rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_0px_#171717]">
              <Box className="w-6 h-6 stroke-[2.5px]" />
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TABLES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECENT STORE ORDERS */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
          <div className="flex items-center justify-between pb-4 border-b-2 border-[#171717] mb-4">
            <div>
              <h2 className="text-lg font-black font-heading uppercase text-[#171717]">
                Recent Customer Orders
              </h2>
              <p className="text-xs font-semibold text-[#888888]">Latest purchases from shop</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/admin/orders')}
              className="text-xs font-black text-[#FF8A00] uppercase hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {!metrics?.recentOrders || metrics.recentOrders.length === 0 ? (
            <div className="py-8 text-center text-xs font-bold text-[#888888]">
              No customer orders received yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {metrics.recentOrders.map((order) => (
                <div key={order.id} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs text-[#171717] font-mono">{order.order_number}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-xs font-bold text-[#444444] truncate mt-1">
                      {order.customer_name_snapshot} ({order.customer_phone_snapshot})
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-[#171717]">৳{order.total}</p>
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="mt-1 text-[11px] font-black text-[#FF8A00] hover:underline flex items-center justify-end gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RECENT CUSTOM PRINT REQUESTS */}
        <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
          <div className="flex items-center justify-between pb-4 border-b-2 border-[#171717] mb-4">
            <div>
              <h2 className="text-lg font-black font-heading uppercase text-[#171717]">
                Custom 3D Print Enquiries
              </h2>
              <p className="text-xs font-semibold text-[#888888]">Direct customer requests & uploads</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/admin/custom-orders')}
              className="text-xs font-black text-[#FF8A00] uppercase hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {!metrics?.recentCustomOrders || metrics.recentCustomOrders.length === 0 ? (
            <div className="py-8 text-center text-xs font-bold text-[#888888]">
              No custom 3D print enquiries submitted yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {metrics.recentCustomOrders.map((co) => (
                <div key={co.id} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs text-[#171717]">{co.customer_name}</span>
                      {getStatusBadge(co.status)}
                    </div>
                    <p className="text-xs text-[#666666] truncate mt-1 italic">
                      "{co.description}"
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold text-[#888888] block">
                      {new Date(co.created_at).toLocaleDateString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate('/admin/custom-orders')}
                      className="mt-1 text-[11px] font-black text-[#FF8A00] hover:underline flex items-center justify-end gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Review</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
