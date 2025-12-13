import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Scan } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { BeamsBackground } from '../components/ui/BeamsBackground';
import Button from '../components/ui/Button';
import Loading from '../components/ui/Loading';

// GitHub Icon Component
const GitHubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export default function SignIn() {
  const router = useRouter();
  const { currentUser, loading, signinWithGitHub, isSigningIn, authError, clearError } = useAuth();
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && currentUser) {
      const returnUrl = router.query.returnUrl || '/dashboard';
      router.push(returnUrl);
    }
  }, [currentUser, loading, router]);

  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (authError) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [authError, clearError]);

  const handleGitHubSignIn = async () => {
    try {
      await signinWithGitHub();
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  // Show loading only if user is authenticated and being redirected
  if (!loading && currentUser) {
    return <Loading fullScreen />;
  }


  return (
    <>
      <Head>
        <title>Sign In - Arcanext</title>
        <meta name="description" content="Sign in to Arcanext with your GitHub account" />
      </Head>

      <BeamsBackground intensity="medium" className="min-h-screen">
        <div className="min-h-screen flex items-center justify-center">
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
                  Sign in with GitHub to access your dashboard and start scanning your repositories for security vulnerabilities.
                </p>
              </motion.div>

              {/* Error Message */}
              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                >
                  <p className="text-sm text-center text-red-400">{authError}</p>
                </motion.div>
              )}

              {/* GitHub Sign-In Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="space-y-4"
              >
                <Button
                  onClick={handleGitHubSignIn}
                  loading={isSigningIn}
                  disabled={isSigningIn}
                  className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white border border-white/10 hover:border-white/20 transition-all duration-300"
                  size="lg"
                >
                  <GitHubIcon className="w-5 h-5 mr-2" />
                  {isSigningIn ? 'Signing in...' : 'Continue with GitHub'}
                </Button>
                
                <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                  <Scan className="w-3 h-3" />
                  Secure OAuth authentication with repository access
                </p>
              </motion.div>

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl"
              >
                <p className="text-xs text-gray-400 text-center">
                  <span className="text-violet-400 font-medium">Why GitHub?</span> Arcanext needs access to your repositories to scan for security vulnerabilities. We only request the permissions we need.
                </p>
              </motion.div>

              {/* Back to Home Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-center mt-6"
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
              transition={{ delay: 0.6, duration: 0.4 }}
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
      </BeamsBackground>
    </>
  );
}
