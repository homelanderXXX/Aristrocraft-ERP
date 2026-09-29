import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { useRouter } from '../../../context/RouterContext';
import { orderRepository, OrderModel } from '../../../lib/supabase/repositories/orderRepository';
import { OrderStatus } from '../../../lib/supabase/types';
import {
  Search,
  RefreshCw,
  Eye,
  Filter,
  CheckCircle2,
  Clock,
  Printer,
  PackageCheck,
  Truck,
  XCircle,
  Loader2,
  ShoppingBag,
} from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const { navigate } = useRouter();
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderRepository.getAllOrders({
        status: statusFilter,
        search: searchQuery,
      });
      setOrders(data);
    } catch (err) {
      console.warn('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await orderRepository.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        alert(`Failed to update status: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Error updating order: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusOptions: Array<{ id: string; label: string }> = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'printing', label: 'Printing' },
    { id: 'ready', label: 'Ready' },
    { id: 'dispatched', label: 'Dispatched' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <AdminLayout
      currentTab="orders"
      title="CUSTOMER ORDERS"
      subtitle="Fulfill 3D print purchases, track delivery statuses, and update order progress"
    >
      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="bg-white border-3 border-[#171717] rounded-3xl p-5 shadow-[6px_6px_0px_0px_#171717] mb-8 space-y-4">
        {/* STATUS FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {statusOptions.map((opt) => {
            const isActive = statusFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setStatusFilter(opt.id)}
                className={`
                  px-4 py-2 rounded-2xl font-heading font-black text-xs uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all border-2
                  ${
                    isActive
                      ? 'bg-[#FF8A00] text-white border-[#171717] shadow-[2px_2px_0px_0px_#171717]'
                      : 'bg-[#FFF9ED] text-[#171717] border-transparent hover:border-[#171717]'
                  }
                `}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* SEARCH FORM & REFRESH */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t-2 border-[#171717]">
          <form onSubmit={handleSearch} className="w-full sm:w-auto flex-1 max-w-md flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by order #, customer name, phone..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold text-[#171717] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#171717] text-white text-xs font-black uppercase tracking-wider rounded-2xl border-2 border-[#171717] hover:bg-[#FF8A00] transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          <button
            type="button"
            onClick={fetchOrders}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2.5 bg-white border-2 border-[#171717] rounded-2xl text-xs font-black uppercase tracking-wider text-[#171717] hover:bg-[#FFF9ED] flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_#171717]"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Reload Orders</span>
          </button>
        </div>
      </div>

      {/* ORDERS TABLE */}
      {loading ? (
        <div className="py-16 text-center bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#171717]">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FF8A00] mb-2" />
          <p className="text-xs font-bold text-[#6D6D6D]">Loading customer orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="py-16 text-center bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#171717]">
          <ShoppingBag className="w-12 h-12 text-[#888888] mx-auto mb-3" />
          <h3 className="text-lg font-black font-heading uppercase text-[#171717]">No Orders Found</h3>
          <p className="text-xs font-semibold text-[#888888] mt-1 max-w-sm mx-auto">
            {searchQuery || statusFilter !== 'all'
              ? 'No orders match your filter criteria or search phrase.'
              : 'When customers place cash-on-delivery orders, they will appear here.'}
          </p>
        </div>
      ) : (
        <div className="bg-white border-3 border-[#171717] rounded-3xl shadow-[6px_6px_0px_0px_#171717] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#171717] text-white border-b-3 border-[#171717] text-[11px] font-black uppercase tracking-wider font-heading">
                  <th className="p-4">Order Details</th>
                  <th className="p-4">Customer Info</th>
                  <th className="p-4">Delivery Zone</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status & Action</th>
                  <th className="p-4 text-right">Detail View</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#171717]/10 text-xs font-bold text-[#171717]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FFF9ED]/60 transition-colors">
                    {/* ORDER # & DATE */}
                    <td className="p-4">
                      <span className="font-mono font-black text-sm text-[#FF8A00] block">
                        {order.orderNumber}
                      </span>
                      <span className="text-[10px] text-[#888888] block mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span className="text-[10px] text-[#555555] block mt-1">
                        {order.items?.length || 0} item(s) ordered
                      </span>
                    </td>

                    {/* CUSTOMER CONTACT */}
                    <td className="p-4">
                      <span className="font-black text-sm block">{order.customerName}</span>
                      <span className="text-xs font-mono text-[#555555] block mt-0.5">
                        {order.customerPhone}
                      </span>
                      {order.customerEmail && (
                        <span className="text-[10px] text-[#888888] block truncate max-w-[160px]">
                          {order.customerEmail}
                        </span>
                      )}
                    </td>

                    {/* DELIVERY LOCATION */}
                    <td className="p-4 max-w-[200px]">
                      <span className="font-bold text-[#171717] block truncate">
                        {order.city ? `${order.city}` : 'Standard Shipping'}
                      </span>
                      <span className="text-[11px] text-[#666666] line-clamp-2 mt-0.5 font-normal">
                        {order.deliveryAddress}
                      </span>
                    </td>

                    {/* FINANCIALS */}
                    <td className="p-4">
                      <span className="font-black text-sm text-[#171717] block">
                        ৳{order.total}
                      </span>
                      <span className="text-[10px] text-[#888888] block">
                        COD Payment
                      </span>
                    </td>

                    {/* QUICK STATUS SWITCHER */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {updatingId === order.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-[#FF8A00]" />
                        ) : (
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value as OrderStatus)
                            }
                            className="bg-[#FFF9ED] border-2 border-[#171717] text-[11px] font-black uppercase rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="printing">Printing</option>
                            <option value="ready">Ready</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        )}
                      </div>
                    </td>

                    {/* ACTION LINK */}
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                        className="px-3 py-1.5 bg-[#FF8A00] text-white text-[11px] font-black font-heading uppercase tracking-wider rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:translate-y-0.5 hover:shadow-[0px_0px_0px_0px_#171717] transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
