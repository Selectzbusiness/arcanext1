import React from 'react';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import Loading from '../ui/Loading';

/**
 * AuthGuard - Higher-order component that protects routes requiring authentication
 * Shows loading screen while auth state is being determined
 * Redirects to sign-in page if unauthenticated
 * Preserves original URL in query parameter for post-auth redirect
 */
const AuthGuard = ({ children, fallbackUrl = '/signin' }) => {
  const { isRedirecting, isLoading } = useAuthRedirect({
    redirectUnauthenticated: fallbackUrl,
    preserveUrl: true,
  });

  // Show loading screen while checking auth state or redirecting
  if (isLoading || isRedirecting) {
    return <Loading fullScreen />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default AuthGuard;
