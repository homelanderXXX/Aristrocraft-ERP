import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, XCircle, Trash2, RefreshCw, ArrowLeft, Shield } from 'lucide-react';
import { reviewRepository, ReviewModel } from '../../../lib/supabase/repositories/reviewRepository';
import { PageMeta } from '../../../components/common/PageMeta';
import { useRouter } from '../../../context/RouterContext';

export function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const { navigate } = useRouter();

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setIsLoading(true);
    const data = await reviewRepository.getAllReviews();
    setReviews(data);
    setIsLoading(false);
  };

  const handleApprove = async (id: string) => {
    await reviewRepository.updateReviewStatus(id, 'approved');
    loadReviews();
  };

  const handleReject = async (id: string) => {
    await reviewRepository.updateReviewStatus(id, 'rejected');
    loadReviews();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to permanently delete this review?')) {
      await reviewRepository.deleteReview(id);
      loadReviews();
    }
  };

  const filteredReviews = reviews.filter((r) => filterStatus === 'all' || r.status === filterStatus);

  return (
    <div className="w-full bg-[#171717] text-white min-h-[85vh] p-6 space-y-6">
      <PageMeta title="Admin Reviews Moderation — ARISTROCRAFT" description="Moderate customer product reviews" />

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
              <Star className="w-6 h-6 text-[#FFC43C] fill-[#FFC43C]" />
              <span>Customer Reviews ({reviews.length})</span>
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={loadReviews}
          className="px-4 py-2 rounded-xl bg-[#FFC43C] text-[#171717] font-black font-heading text-xs uppercase shadow-[2px_2px_0px_0px_#FFF] hover:bg-[#FF8A00] hover:text-white transition-all cursor-pointer flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        {(['all', 'approved', 'pending', 'rejected'] as const).map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setFilterStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black font-heading uppercase transition-all cursor-pointer ${
              filterStatus === st
                ? 'bg-[#FFC43C] text-[#171717]'
                : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* REVIEWS LIST */}
      {isLoading ? (
        <div className="py-12 text-center text-xs font-bold text-white/60">Loading reviews...</div>
      ) : filteredReviews.length > 0 ? (
        <div className="space-y-3">
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="p-4 bg-white/5 border border-white/15 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#FFC43C]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-[#FFC43C]' : 'text-white/20'}`}
                      />
                    ))}
                  </div>
                  <span className="font-black text-xs text-white">{r.author}</span>
                  <span
                    className={`px-2 py-0.2 rounded-full text-[9px] font-black uppercase border ${
                      r.status === 'approved'
                        ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                        : r.status === 'rejected'
                        ? 'bg-[#FF4D4D]/20 border-[#FF4D4D] text-[#FF4D4D]'
                        : 'bg-[#FFC43C]/20 border-[#FFC43C] text-[#FFC43C]'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-white/80">{r.comment}</p>
                <p className="text-[10px] text-white/40">Product Slug: {r.productId} • Posted on {r.date}</p>
              </div>

              {/* MODERATION ACTIONS */}
              <div className="flex items-center gap-2 shrink-0">
                {r.status !== 'approved' && (
                  <button
                    type="button"
                    onClick={() => handleApprove(r.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#10B981]/20 border border-[#10B981] text-[#10B981] text-[10px] font-black uppercase hover:bg-[#10B981] hover:text-white transition-all cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3" />
                    <span>Approve</span>
                  </button>
                )}

                {r.status !== 'rejected' && (
                  <button
                    type="button"
                    onClick={() => handleReject(r.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#FF8A00]/20 border border-[#FF8A00] text-[#FF8A00] text-[10px] font-black uppercase hover:bg-[#FF8A00] hover:text-white transition-all cursor-pointer flex items-center gap-1"
                  >
                    <XCircle className="w-3 h-3" />
                    <span>Reject</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(r.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#FF4D4D]/20 border border-[#FF4D4D] text-[#FF4D4D] text-[10px] font-black uppercase hover:bg-[#FF4D4D] hover:text-white transition-all cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 bg-white/5 border border-white/10 rounded-2xl text-center text-xs font-bold text-white/60">
          No customer reviews found matching filter.
        </div>
      )}
    </div>
  );
}

export default AdminReviewsPage;
