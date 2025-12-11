import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Github, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import UnifiedBackground from '../components/layout/UnifiedBackground';
import Button from '../components/ui/Button';
import Loading from '../components/ui/Loading';

export default function SignIn() {
  const { signinWithGitHub, isSigningIn, authError, clearError } = useAuth();
  
  // Redirect authenticated users to dashboard (or returnUrl)
  const { isRedirecting, isLoading } = useAuthRedirect({
    redirectAuthenticated: '/dashboard',
  });

  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (authError) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [authError, clearError]);

  const handleSignIn = async () => {
    try {
      await signinWithGitHub();
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  // Show loading screen while checking auth state
  if (isLoading || isRedirecting) {
    return <Loading fullScreen />;
  }

  return (
    <>
      <Head>
        <title>Sign In - Arcanext</title>
        <meta name="description" content="Sign in to Arcanext with your GitHub account" />
      </Head>

      <div className="min-h-screen text-white font-sans relative flex items-center justify-center">
        <UnifiedBackground />

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          {/* Glass Panel Card */}
          <div className="bg-background-secondary/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-accent rounded-xl blur-lg opacity-50"></div>
                <div className="relative bg-background-secondary border border-white/10 p-4 rounded-xl">
                  <Shield className="w-10 h-10 text-brand-text" />
                </div>
              </div>
            </motion.div>

            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-center mb-8"
            >
              <h1 className="text-2xl font-bold text-white mb-2">Welcome to Arcanext</h1>
              <p className="text-gray-400 text-sm">
                Sign in with your GitHub account to access your dashboard and manage your repositories.
              </p>
            </motion.div>

            {/* Error Message */}
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <p className="text-red-400 text-sm text-center">{authError}</p>
              </motion.div>
            )}

            {/* GitHub Sign-In Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Button
                onClick={handleSignIn}
                loading={isSigningIn}
                disabled={isSigningIn}
                className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white border border-white/10 hover:border-white/20 transition-all duration-300"
                size="lg"
              >
                <Github className="w-5 h-5 mr-2" />
                {isSigningIn ? 'Signing in...' : 'Continue with GitHub'}
              </Button>
            </motion.div>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-white/10"></div>
              <span className="px-4 text-gray-500 text-xs">or</span>
              <div className="flex-1 border-t border-white/10"></div>
            </div>

            {/* Back to Home Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-center"
            >
              <Link
                href="/"
                className="inline-flex items-center text-gray-400 hover:text-white text-sm transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to home
              </Link>
            </motion.div>
          </div>

          {/* Footer Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-center text-gray-500 text-xs mt-6"
          >
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-brand-accent hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-brand-accent hover:underline">
              Privacy Policy
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
