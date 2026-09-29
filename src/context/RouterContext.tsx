import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface RouteState {
  pathname: string;
  params: Record<string, string>;
  hash: string;
}

interface RouterContextType {
  pathname: string;
  params: Record<string, string>;
  hash: string;
  navigate: (url: string) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function parseUrl(url: string): { pathname: string; params: Record<string, string>; hash: string } {
  let path = url;
  let hash = '';

  const hashIndex = path.indexOf('#');
  if (hashIndex !== -1) {
    hash = path.substring(hashIndex + 1);
    path = path.substring(0, hashIndex);
  }

  const params: Record<string, string> = {};

  // Extract query string
  const queryIndex = path.indexOf('?');
  if (queryIndex !== -1) {
    const queryString = path.substring(queryIndex + 1);
    path = path.substring(0, queryIndex);
    const searchParams = new URLSearchParams(queryString);
    searchParams.forEach((val, key) => {
      params[key] = val;
    });
  }

  if (!path) path = '/';
  // Ensure starts with '/'
  if (!path.startsWith('/')) path = '/' + path;

  // Handle clean trailing slashes
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // Check for /shop/category/:slug
  if (path.startsWith('/shop/category/')) {
    const categorySlug = path.replace('/shop/category/', '');
    if (categorySlug) {
      params.categorySlug = categorySlug;
    }
  } else if (path.startsWith('/shop/')) {
    const slug = path.replace('/shop/', '');
    if (slug) {
      params.slug = slug;
    }
  }

  // Check for /admin/orders/:id
  if (path.startsWith('/admin/orders/') && path !== '/admin/orders') {
    const id = path.replace('/admin/orders/', '');
    if (id) {
      params.id = id;
    }
  }

  // Check for /account/orders/:id
  if (path.startsWith('/account/orders/') && path !== '/account/orders') {
    const id = path.replace('/account/orders/', '');
    if (id) {
      params.id = id;
    }
  }

  // Check for /admin/products/:id
  if (path.startsWith('/admin/products/') && path !== '/admin/products') {
    const id = path.replace('/admin/products/', '');
    if (id) {
      params.id = id;
    }
  }

  return { pathname: path, params, hash };
}

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RouteState>(() => {
    if (typeof window !== 'undefined') {
      const parsed = parseUrl(window.location.pathname + window.location.hash);
      return parsed;
    }
    return { pathname: '/', params: {}, hash: '' };
  });

  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseUrl(window.location.pathname + window.location.hash);
      setCurrentRoute(parsed);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (url: string) => {
    const parsed = parseUrl(url);

    // Update history state if supported
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({}, '', url);
      } catch {
        // Fallback
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setCurrentRoute(parsed);
  };

  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/shop');
    }
  };

  return (
    <RouterContext.Provider
      value={{
        pathname: currentRoute.pathname,
        params: currentRoute.params,
        hash: currentRoute.hash,
        navigate,
        goBack,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
