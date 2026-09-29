import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { customOrderRepository, CustomOrderModel } from '../../../lib/supabase/repositories/customOrderRepository';
import { CustomOrderStatus } from '../../../lib/supabase/types';
import {
  FileText,
  Search,
  RefreshCw,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Printer,
  DollarSign,
  Save,
  X,
  Phone,
  Mail,
  Loader2,
  ExternalLink,
} from 'lucide-react';

export const AdminCustomOrdersPage: React.FC = () => {
  const [customOrders, setCustomOrders] = useState<
    Array<CustomOrderModel & { adminNotes?: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Order Modal
  const [selectedOrder, setSelectedOrder] = useState<
    (CustomOrderModel & { adminNotes?: string }) | null
  >(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [fetchingUrl, setFetchingUrl] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | ''>('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchCustomOrders = async () => {
    setLoading(true);
    try {
      const data = await customOrderRepository.getAllCustomOrders({
        status: statusFilter,
        search: searchQuery,
      });
      setCustomOrders(data);
    } catch (err) {
      console.warn('Error loading custom orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomOrders();
  }, [statusFilter]);

  const handleOpenDetail = async (order: CustomOrderModel & { adminNotes?: string }) => {
    setSelectedOrder(order);
    setAdminNotes(order.adminNotes || '');
    setEstimatedPrice(order.estimatedPrice !== undefined ? order.estimatedPrice : '');
    setSignedUrl(null);
    setSaveSuccess(false);

    if (order.uploadedFileUrl) {
      setFetchingUrl(true);
      const url = await customOrderRepository.getFileSignedUrl(order.uploadedFileUrl);
      setSignedUrl(url);
      setFetchingUrl(false);
    }
  };

  const handleUpdateCustomOrder = async (newStatus?: CustomOrderStatus) => {
    if (!selectedOrder) return;
    setUpdatingStatus(true);
    setSaveSuccess(false);

    const targetStatus = newStatus || selectedOrder.status;
    const priceVal = estimatedPrice !== '' ? Number(estimatedPrice) : undefined;

    try {
      const res = await customOrderRepository.updateCustomOrderStatus(
        selectedOrder.id,
        targetStatus,
        adminNotes,
        priceVal
      );

      if (res.success) {
        setSaveSuccess(true);
        setSelectedOrder((prev) =>
          prev
            ? {
                ...prev,
                status: targetStatus,
                adminNotes,
                estimatedPrice: priceVal,
              }
            : null
        );
        fetchCustomOrders();
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert(`Failed to update custom order: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Error updating order: ${err.message}`);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusBadge = (status: CustomOrderStatus) => {
    switch (status) {
      case 'pending':
      case 'submitted':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-[#FFC43C] text-[#171717] border border-[#171717]">Submitted</span>;
      case 'reviewing':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-900 border border-blue-400">Reviewing STL</span>;
      case 'quoted':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-900 border border-amber-400">Quoted</span>;
      case 'approved':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-400">Approved</span>;
      case 'printing':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-purple-100 text-purple-900 border border-purple-400 animate-pulse">Printing</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-teal-100 text-teal-900 border border-teal-400">Completed</span>;
      case 'rejected':
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-red-100 text-red-900 border border-red-400">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-gray-100 text-gray-800 border border-gray-300">{status}</span>;
    }
  };

  return (
    <AdminLayout
      currentTab="custom-orders"
      title="CUSTOM 3D PRINT REQUESTS"
      subtitle="Review customer CAD/STL uploads, estimate pricing, and track custom print jobs"
    >
      {/* FILTER & SEARCH */}
      <div className="bg-white border-3 border-[#171717] rounded-3xl p-5 shadow-[6px_6px_0px_0px_#171717] mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name, phone, email, project description..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold text-[#171717] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Submitted / Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="quoted">Quoted</option>
              <option value="approved">Approved</option>
              <option value="printing">Printing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button
              type="button"
              onClick={fetchCustomOrders}
              disabled={loading}
              className="p-2.5 bg-white border-2 border-[#171717] rounded-2xl text-[#171717] hover:bg-[#FFF9ED] cursor-pointer shadow-[2px_2px_0px_0px_#171717]"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* REQUESTS LIST TABLE */}
      {loading ? (
        <div className="py-16 text-center bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#171717]">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FF8A00] mb-2" />
          <p className="text-xs font-bold text-[#6D6D6D]">Loading custom print requests...</p>
        </div>
      ) : customOrders.length === 0 ? (
        <div className="py-16 text-center bg-white border-3 border-[#171717] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#171717]">
          <FileText className="w-12 h-12 text-[#888888] mx-auto mb-3" />
          <h3 className="text-lg font-black font-heading uppercase text-[#171717]">No Custom Requests Found</h3>
          <p className="text-xs font-semibold text-[#888888] mt-1">
            When users submit custom 3D model ideas or upload STL files, they will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white border-3 border-[#171717] rounded-3xl shadow-[6px_6px_0px_0px_#171717] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#171717] text-white border-b-3 border-[#171717] text-[11px] font-black uppercase tracking-wider font-heading">
                  <th className="p-4">Customer Info</th>
                  <th className="p-4">Project Description</th>
                  <th className="p-4">Requested Specs</th>
                  <th className="p-4">3D Model File</th>
                  <th className="p-4">Status & Price</th>
                  <th className="p-4 text-right">Review Request</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#171717]/10 text-xs font-bold text-[#171717]">
                {customOrders.map((co) => (
                  <tr key={co.id} className="hover:bg-[#FFF9ED]/60 transition-colors">
                    {/* CUSTOMER INFO */}
                    <td className="p-4">
                      <span className="font-black text-sm block">{co.customerName}</span>
                      <span className="text-xs font-mono text-[#555555] block mt-0.5">
                        {co.customerPhone}
                      </span>
                      <span className="text-[10px] text-[#888888] block truncate max-w-[150px]">
                        {co.customerEmail}
                      </span>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="p-4 max-w-xs">
                      <p className="line-clamp-2 text-[#171717] font-semibold italic">
                        "{co.description}"
                      </p>
                      <span className="text-[10px] text-[#888888] block mt-1">
                        Submitted: {new Date(co.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    {/* SPECS */}
                    <td className="p-4">
                      <div className="space-y-1">
                        {co.requestedColor && (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-[#444444] border border-gray-300">
                            Color: {co.requestedColor}
                          </span>
                        )}
                        {co.requestedSize && (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-[#444444] border border-gray-300 ml-1">
                            Size: {co.requestedSize}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* FILE STATUS */}
                    <td className="p-4">
                      {co.uploadedFileUrl ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-400">
                          <FileText className="w-3 h-3" />
                          <span>File Attached</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#888888] italic">No file attached</span>
                      )}
                    </td>

                    {/* STATUS & PRICE */}
                    <td className="p-4">
                      <div className="space-y-1">
                        {getStatusBadge(co.status)}
                        <span className="block font-black text-xs text-[#171717]">
                          {co.estimatedPrice ? `৳${co.estimatedPrice} BDT` : 'Not Quoted'}
                        </span>
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(co)}
                        className="px-3 py-1.5 bg-[#FF8A00] text-white text-[11px] font-black font-heading uppercase tracking-wider rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-3 border-[#171717] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[10px_10px_0px_0px_#171717]">
            {/* MODAL HEADER */}
            <div className="bg-[#171717] text-white p-6 sticky top-0 z-10 flex items-center justify-between border-b-3 border-[#171717]">
              <div>
                <h2 className="text-xl font-black font-heading uppercase text-white">
                  CUSTOM PRINT REVIEW: {selectedOrder.customerName}
                </h2>
                <p className="text-xs text-[#FFC43C] font-semibold">
                  Submitted on {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="p-6 space-y-6">
              {/* CUSTOMER CONTACT CARD */}
              <div className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-4 space-y-2">
                <h3 className="text-xs font-black uppercase text-[#171717]">Customer Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold text-[#171717]">
                  <div>
                    <span className="text-[10px] text-[#888888] uppercase block">Name</span>
                    <span>{selectedOrder.customerName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#888888] uppercase block">Phone</span>
                    <a href={`tel:${selectedOrder.customerPhone}`} className="text-[#FF8A00] underline">
                      {selectedOrder.customerPhone}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#888888] uppercase block">Email</span>
                    <a href={`mailto:${selectedOrder.customerEmail}`} className="underline">
                      {selectedOrder.customerEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* PROJECT DESCRIPTION */}
              <div>
                <h3 className="text-xs font-black uppercase text-[#171717] mb-2">Project Idea & Requirements</h3>
                <div className="p-4 bg-gray-50 border-2 border-[#171717] rounded-2xl text-xs font-medium leading-relaxed text-[#171717]">
                  "{selectedOrder.description}"
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-3">
                  {selectedOrder.requestedColor && (
                    <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                      Requested Color: {selectedOrder.requestedColor}
                    </span>
                  )}
                  {selectedOrder.requestedSize && (
                    <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                      Requested Size: {selectedOrder.requestedSize}
                    </span>
                  )}
                </div>
              </div>

              {/* SECURE STL FILE DOWNLOAD BUTTON */}
              <div>
                <h3 className="text-xs font-black uppercase text-[#171717] mb-2">Customer Attachment (Private Bucket)</h3>
                {selectedOrder.uploadedFileUrl ? (
                  <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-[#171717] block">3D File / Reference Attachment</span>
                      <span className="text-[10px] font-mono text-[#888888] block truncate max-w-sm">
                        {selectedOrder.uploadedFileUrl}
                      </span>
                    </div>

                    {fetchingUrl ? (
                      <Loader2 className="w-5 h-5 animate-spin text-[#FF8A00]" />
                    ) : signedUrl ? (
                      <a
                        href={signedUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-[#FF8A00] text-white text-xs font-black uppercase tracking-wider rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download CAD / STL</span>
                      </a>
                    ) : (
                      <span className="text-xs text-red-600 font-bold">Failed to load download link</span>
                    )}
                  </div>
                ) : (
                  <p className="text-xs font-bold text-[#888888] italic">No file attached by customer.</p>
                )}
              </div>

              {/* STATUS & PRICING CONTROLS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t-2 border-[#171717]">
                <div>
                  <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                    Update Order Status
                  </label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateCustomOrder(e.target.value as CustomOrderStatus)}
                    disabled={updatingStatus}
                    className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-black uppercase cursor-pointer"
                  >
                    <option value="pending">Submitted / Pending</option>
                    <option value="reviewing">Reviewing STL / Slice</option>
                    <option value="quoted">Quoted</option>
                    <option value="approved">Approved</option>
                    <option value="printing">3D Printing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                    Quoted Price (BDT)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={estimatedPrice}
                    onChange={(e) => setEstimatedPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="e.g. 1500"
                    className="w-full px-3.5 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold"
                  />
                </div>
              </div>

              {/* ADMIN NOTES */}
              <div>
                <label className="block text-xs font-black uppercase text-[#171717] mb-1">
                  Internal Studio Notes & Print Estimates
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record filament weight (grams), print duration, nozzle temp..."
                  className="w-full p-3 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl text-xs font-bold text-[#171717]"
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-4 border-t-2 border-[#171717] flex items-center justify-between">
                <div>
                  {saveSuccess && (
                    <span className="text-xs font-bold text-emerald-600">
                      ✓ Changes saved to database!
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-2.5 bg-[#FFF9ED] text-[#171717] text-xs font-black uppercase border-2 border-[#171717] rounded-2xl hover:bg-gray-100 cursor-pointer"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    disabled={updatingStatus}
                    onClick={() => handleUpdateCustomOrder()}
                    className="px-6 py-2.5 bg-[#FF8A00] text-white text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] hover:translate-y-0.5 cursor-pointer flex items-center gap-2"
                  >
                    {updatingStatus ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Updates</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
