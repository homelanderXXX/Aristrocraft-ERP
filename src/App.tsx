import React, { useEffect, useState, lazy, Suspense } from 'react';
import RootLayout from './app/layout';

// Lazy Loaded Pages (Default Exports)
const HomePage = lazy(() => import('./app/page'));
const ShopPage = lazy(() => import('./app/shop/page'));
const ProductDetailPage = lazy(() => import('./app/shop/[slug]/page'));
const CategoryShopPage = lazy(() => import('./app/shop/category/[slug]/page'));
const CartPage = lazy(() => import('./app/cart/page'));
const OrderTrackingPage = lazy(() => import('./app/track/page'));
const CustomPrintPage = lazy(() => import('./app/custom-print/page'));
const AboutPage = lazy(() => import('./app/about/page'));
const IndustriesPage = lazy(() => import('./app/industries/page'));
const HowItWorksPage = lazy(() => import('./app/how-it-works/page'));
const EducationPage = lazy(() => import('./app/education/page'));
const QualityPage = lazy(() => import('./app/quality/page'));
const CustomerCreationsPage = lazy(() => import('./app/creations/page'));
const FAQPage = lazy(() => import('./app/faq/page'));
const ShippingPage = lazy(() => import('./app/shipping/page'));
const PrivacyPage = lazy(() => import('./app/privacy/page'));
const TermsPage = lazy(() => import('./app/terms/page'));
const RefundPage = lazy(() => import('./app/refund/page'));

const WishlistPage = lazy(() => import('./app/wishlist/page'));

const LoginPage = lazy(() => import('./app/login/page'));
const RegisterPage = lazy(() => import('./app/register/page'));
const AccountPage = lazy(() => import('./app/account/page'));
const AccountOrdersPage = lazy(() => import('./app/account/orders/page'));
const AccountOrderDetailPage = lazy(() => import('./app/account/orders/[id]/page'));
const AccountProfilePage = lazy(() => import('./app/account/profile/page'));

// Lazy Loaded Admin Pages (Named Exports)
const AdminLoginPage = lazy(() => import('./app/admin/login/page').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./app/admin/dashboard/page').then(m => ({ default: m.AdminDashboardPage })));
const AdminOrdersPage = lazy(() => import('./app/admin/orders/page').then(m => ({ default: m.AdminOrdersPage })));
const AdminOrderDetailPage = lazy(() => import('./app/admin/orders/[id]/page').then(m => ({ default: m.AdminOrderDetailPage })));
const AdminProductsPage = lazy(() => import('./app/admin/products/page').then(m => ({ default: m.AdminProductsPage })));
const AdminCategoriesPage = lazy(() => import('./app/admin/categories/page').then(m => ({ default: m.AdminCategoriesPage })));
const AdminCustomOrdersPage = lazy(() => import('./app/admin/custom-orders/page').then(m => ({ default: m.AdminCustomOrdersPage })));
const AdminCustomersPage = lazy(() => import('./app/admin/customers/page').then(m => ({ default: m.AdminCustomersPage })));
const AdminReviewsPage = lazy(() => import('./app/admin/reviews/page').then(m => ({ default: m.AdminReviewsPage })));
const AdminSettingsPage = lazy(() => import('./app/admin/settings/page').then(m => ({ default: m.AdminSettingsPage })));

import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CustomerAuthProvider } from './context/CustomerAuthContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

function AppContent() {
  const { pathname, params, navigate } = useRouter();
  const { totalItems, toastMessage, dismissToast } = useCart();
  const [activeSection, setActiveSection] = useState('shop');

  // Scroll to top on route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  // Handle cross-page section navigation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);

    // Direct path navigation
    if (sectionId.startsWith('/')) {
      navigate(sectionId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'shop') {
      navigate('/shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'cart') {
      navigate('/cart');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'track') {
      navigate('/track');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'custom' || sectionId === 'custom-print') {
      navigate('/custom-print');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'about') {
      navigate('/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'how-it-works') {
      navigate('/how-it-works');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'materials') {
      navigate('/custom-print');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'quality') {
      navigate('/quality');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'creations' || sectionId === 'community') {
      navigate('/creations');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'faq') {
      navigate('/faq');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'shipping') {
      navigate('/shipping');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'privacy') {
      navigate('/privacy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'terms') {
      navigate('/terms');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'refund') {
      navigate('/refund');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'industries') {
      navigate('/industries');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'education' || sectionId === 'education-stem') {
      navigate('/education');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'hero' || sectionId === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Anchor-based navigation: if not on homepage, navigate to homepage first
    if (pathname !== '/' && pathname !== '') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // If already on homepage
    const targetId =
      sectionId === 'why-aristrocraft'
        ? 'why-choose-us'
        : sectionId === 'contact'
        ? 'custom'
        : sectionId === 'categories'
        ? 'category-section'
        : sectionId;

    const elem = document.getElementById(targetId) || document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper wrapper for user-facing pages
  const wrapPage = (content: React.ReactNode, activeSec = 'shop') => (
    <>
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSec}
        cartCount={totalItems}
        onOpenCart={() => navigate('/cart')}
      />
      {content}
      <Footer onNavigate={handleNavigate} />
    </>
  );

  // Render current view
  const renderCurrentView = () => {
    // Admin routes render in dedicated standalone layout
    if (pathname === '/admin/login') {
      return <AdminLoginPage />;
    }

    if (pathname === '/admin' || pathname === '/admin/dashboard') {
      return <AdminDashboardPage />;
    }

    if (pathname === '/admin/orders') {
      return <AdminOrdersPage />;
    }

    if (pathname.startsWith('/admin/orders/') && params.id) {
      return <AdminOrderDetailPage />;
    }

    if (pathname === '/admin/products') {
      return <AdminProductsPage />;
    }

    if (pathname === '/admin/categories') {
      return <AdminCategoriesPage />;
    }

    if (pathname === '/admin/custom-orders') {
      return <AdminCustomOrdersPage />;
    }

    if (pathname === '/admin/customers') {
      return <AdminCustomersPage />;
    }

    if (pathname === '/admin/reviews') {
      return <AdminReviewsPage />;
    }

    if (pathname === '/admin/settings') {
      return <AdminSettingsPage />;
    }

    // Customer Account & Authentication Routes
    if (pathname === '/login') {
      return wrapPage(<LoginPage />, 'account');
    }

    if (pathname === '/register') {
      return wrapPage(<RegisterPage />, 'account');
    }

    if (pathname === '/account') {
      return wrapPage(<AccountPage />, 'account');
    }

    if (pathname === '/account/orders') {
      return wrapPage(<AccountOrdersPage />, 'account');
    }

    if (pathname.startsWith('/account/orders/') && params.id) {
      return wrapPage(<AccountOrderDetailPage />, 'account');
    }

    if (pathname === '/account/profile' || pathname === '/account/settings') {
      return wrapPage(<AccountProfilePage />, 'account');
    }

    // Shop Routes
    if (pathname === '/shop') {
      return wrapPage(<ShopPage />, 'shop');
    }

    if (pathname.startsWith('/shop/category/') && params.categorySlug) {
      return wrapPage(<CategoryShopPage />, 'shop');
    }

    if (pathname.startsWith('/shop/') && params.slug) {
      return wrapPage(<ProductDetailPage slug={params.slug} />, 'shop');
    }

    if (pathname === '/cart') {
      return wrapPage(<CartPage />, 'cart');
    }

    if (pathname === '/wishlist') {
      return wrapPage(<WishlistPage />, 'wishlist');
    }

    if (pathname === '/track') {
      return wrapPage(<OrderTrackingPage />, 'track');
    }

    // Phase 6 Multi-Page Routes
    if (pathname === '/custom-print' || pathname === '/custom') {
      return wrapPage(<CustomPrintPage />, 'custom-print');
    }

    if (pathname === '/about') {
      return wrapPage(<AboutPage />, 'about');
    }

    if (pathname === '/industries') {
      return wrapPage(<IndustriesPage />, 'about');
    }

    if (pathname === '/how-it-works') {
      return wrapPage(<HowItWorksPage />, 'how-it-works');
    }

    if (pathname === '/education') {
      return wrapPage(<EducationPage />, 'education');
    }

    if (pathname === '/quality') {
      return wrapPage(<QualityPage />, 'quality');
    }

    if (pathname === '/creations' || pathname === '/community' || pathname === '/materials') {
      return wrapPage(<CustomerCreationsPage />, 'creations');
    }

    if (pathname === '/faq') {
      return wrapPage(<FAQPage />, 'faq');
    }

    if (pathname === '/shipping') {
      return wrapPage(<ShippingPage />, 'shipping');
    }

    if (pathname === '/privacy') {
      return wrapPage(<PrivacyPage />, 'privacy');
    }

    if (pathname === '/terms') {
      return wrapPage(<TermsPage />, 'terms');
    }

    if (pathname === '/refund') {
      return wrapPage(<RefundPage />, 'refund');
    }

    // Default to Full Homepage (Sections 01 - 12)
    return <HomePage />;
  };


  return (
    <RootLayout>
      <Suspense fallback={
        <div className="min-h-screen bg-[#FDFCF7] flex flex-col items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#E5E5E5] border-t-[#FF8A00]"></div>
          <p className="font-heading font-black text-[#171717] text-sm uppercase tracking-widest">LOADING ARISTROCRAFT...</p>
        </div>
      }>
        {renderCurrentView()}
      </Suspense>

      {/* Cart Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-popIn">
          <div className="bg-[#171717] text-white border-2.5 border-white rounded-2xl p-4 shadow-[5px_5px_0px_0px_#FF8A00] flex items-center gap-3 max-w-sm">
            <div className="w-8 h-8 rounded-xl bg-[#10B981] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5px]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black font-heading text-white truncate">
                {toastMessage}
              </p>
              <button
                type="button"
                onClick={() => {
                  dismissToast();
                  navigate('/cart');
                }}
                className="text-[11px] font-black uppercase text-[#FFC43C] hover:underline flex items-center gap-1 mt-0.5 cursor-pointer"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>View Cart & Checkout →</span>
              </button>
            </div>
            <button
              type="button"
              onClick={dismissToast}
              aria-label="Close notification"
              className="text-[#A3A3A3] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </RootLayout>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <CustomerAuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </CustomerAuthProvider>
    </RouterProvider>
  );
}
