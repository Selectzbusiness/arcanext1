import Link from 'next/link';
import { Shield, LogOut } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background-primary/95 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-accent rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-background-secondary border border-white/10 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-brand-text" />
              </div>
            </div>
            <span className="text-xl font-bold text-white">Arcanext</span>
          </Link>

          {/* User Info & Sign Out */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">
              {currentUser?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
