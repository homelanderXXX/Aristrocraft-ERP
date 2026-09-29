import React, { useState, useEffect } from 'react';
import { Users, Search, RefreshCw, ShoppingBag, ArrowLeft, Calendar, Mail, Phone, DollarSign } from 'lucide-react';
import { customerRepository, AdminCustomerSummary } from '../../../lib/supabase/repositories/customerRepository';
import { PageMeta } from '../../../components/common/PageMeta';
import { useRouter } from '../../../context/RouterContext';

export function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomerSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomerSummary | null>(null);

  const { navigate } = useRouter();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setIsLoading(true);
    const data = await customerRepository.getAllCustomersForAdmin();
    setCustomers(data);
    setIsLoading(false);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone?.includes(searchQuery)
  );

  return (
    <div className="w-full bg-[#171717] text-white min-h-[85vh] p-6 space-y-6">
      <PageMeta title="Admin Customers — ARISTROCRAFT" description="Manage customer profiles and order histories" />

      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] font-black font-heading uppercase text-[#FF8A00]">ADMIN PANEL</span>
            <h1 className="text-2xl font-black font-heading uppercase text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-[#FFC43C]" />
              <span>Customer Accounts ({customers.length})</span>
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={loadCustomers}
          className="px-4 py-2 rounded-xl bg-[#FFC43C] text-[#171717] font-black font-heading text-xs uppercase shadow-[2px_2px_0px_0px_#FFF] hover:bg-[#FF8A00] hover:text-white transition-all cursor-pointer flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search customer by name, email, or phone..."
          className="w-full bg-white/5 border border-white/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-white/40 outline-none focus:border-[#FFC43C]"
        />
        <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
      </div>

      {/* CUSTOMERS TABLE */}
      {isLoading ? (
        <div className="py-12 text-center text-xs font-bold text-white/60">Loading customers database...</div>
      ) : filteredCustomers.length > 0 ? (
        <div className="bg-white/5 border border-white/15 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/10 border-b border-white/15 font-black font-heading text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Orders</th>
                  <th className="p-3.5">Total Spent</th>
                  <th className="p-3.5">Last Order</th>
                  <th className="p-3.5">Registered</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-bold">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-black text-white">{c.name}</td>
                    <td className="p-3.5 text-white/80">
                      <div className="flex flex-col text-[11px]">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[#FFC43C]" /> {c.email}</span>
                        {c.phone && <span className="flex items-center gap-1 text-white/60"><Phone className="w-3 h-3 text-[#10B981]" /> {c.phone}</span>}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFC43C]/20 border border-[#FFC43C]/40 text-[#FFC43C]">
                        {c.orderCount} Orders
                      </span>
                    </td>
                    <td className="p-3.5 font-black text-[#10B981]">
                      ৳{c.totalSpent.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-white/60">
                      {c.lastOrderDate ? new Date(c.lastOrderDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-3.5 text-white/60">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedCustomer(c)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FFC43C] hover:text-[#171717] border border-white/20 text-[10px] font-black uppercase transition-all cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="py-12 bg-white/5 border border-white/10 rounded-2xl text-center text-xs font-bold text-white/60">
          No registered customer accounts found.
        </div>
      )}

      {/* CUSTOMER DETAIL MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#262626] border-2 border-white/20 rounded-2xl p-6 space-y-4 text-white">
            <h2 className="text-xl font-black font-heading uppercase text-[#FFC43C]">
              Customer Details
            </h2>
            <div className="space-y-2 text-xs font-semibold text-white/80 border-y border-white/10 py-3">
              <p><strong className="text-white">Name:</strong> {selectedCustomer.name}</p>
              <p><strong className="text-white">Email:</strong> {selectedCustomer.email}</p>
              <p><strong className="text-white">Phone:</strong> {selectedCustomer.phone || 'N/A'}</p>
              <p><strong className="text-white">Orders Placed:</strong> {selectedCustomer.orderCount}</p>
              <p><strong className="text-white">Total Spent:</strong> ৳{selectedCustomer.totalSpent.toLocaleString()}</p>
              <p><strong className="text-white">Account Created:</strong> {new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCustomer(null)}
              className="w-full py-2.5 bg-[#FFC43C] text-[#171717] font-black font-heading text-xs uppercase rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCustomersPage;
