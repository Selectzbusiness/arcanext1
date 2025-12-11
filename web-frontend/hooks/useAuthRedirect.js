import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Custom hook for handling authentication-based redirects
 * @param {Object} options - Configuration options
 * @param {string} options.redirectAuthenticated - Where to redirect if authenticated
 * @param {string} options.redirectUnauthenticated - Where to redirect if not authenticated
 * @param {boolean} options.preserveUrl - Whether to preserve original URL in returnUrl param
 * @returns {Object} - { isRedirecting, targetUrl }
 */
export function useAuthRedirect(options = {}) {
  const {
    redirectAuthenticated = null,
    redirectUnauthenticated = null,
    preserveUrl = false,
  } = options;

  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [targetUrl, setTargetUrl] = useState(null);

  useEffect(() => {
    if (loading) return;

    const isAuthenticated = !!currentUser;

    // Handle authenticated user redirect
    if (isAuthenticated && redirectAuthenticated) {
      setIsRedirecting(true);
      // Check for returnUrl in query params first
      const returnUrl = router.query.returnUrl;
      const destination = returnUrl || redirectAuthenticated;
      setTargetUrl(destination);
      router.push(destination);
      return;
    }

    // Handle unauthenticated user redirect
    if (!isAuthenticated && redirectUnauthenticated) {
      setIsRedirecting(true);
      let destination = redirectUnauthenticated;
      
      // Preserve the current URL for post-auth redirect
      if (preserveUrl && router.asPath !== '/') {
        const currentPath = router.asPath;
        destination = `${redirectUnauthenticated}?returnUrl=${encodeURIComponent(currentPath)}`;
      }
      
      setTargetUrl(destination);
      router.push(destination);
      return;
    }

    setIsRedirecting(false);
    setTargetUrl(null);
  }, [currentUser, loading, redirectAuthenticated, redirectUnauthenticated, preserveUrl, router]);

  return {
    isRedirecting,
    targetUrl,
    isLoading: loading,
  };
}

export default useAuthRedirect;
