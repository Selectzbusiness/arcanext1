import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, LogOut, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useRouter } from 'next/router';

export default function DashboardHeader() {
  const { currentUser, signout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signout();
      router.push('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl border-b border-white/10" />
      
      {/* Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-violet-500 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-black/50 backdrop-blur-xl border border-white/20 p-2.5 rounded-xl">
                <Shield className="w-5 h-5 text-violet-400" />
              </div>
            </motion.div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">Arcanext</span>
              <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-violet-500/20 border border-violet-500/30 rounded-full text-xs text-violet-300 font-medium">
                <Zap className="w-3 h-3" />
                Pro
              </span>
            </div>
          </Link>

          {/* User Info & Sign Out */}
          <div className="flex items-center gap-4">
            {/* User Email with Glow */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300 font-medium">
                {currentUser?.email}
              </span>
            </div>
            
            {/* Sign Out Button */}
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Sign Out</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
