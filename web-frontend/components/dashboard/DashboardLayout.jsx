import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, Home, Folder, Activity, Settings, LogOut, 
  ChevronRight, Bell, Search, Command
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { BeamsBackground } from '../ui/BeamsBackground';

// Sidebar Navigation Component
function Sidebar({ currentUser, onSignOut, activePage }) {
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', id: 'dashboard' },
    { icon: Folder, label: 'Repositories', href: '/dashboard/repositories', id: 'repositories' },
    { icon: Activity, label: 'Scans', href: '/dashboard/scans', id: 'scans' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings', id: 'settings' },
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 bottom-0 w-72 bg-black/40 backdrop-blur-2xl border-r border-white/10 z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-violet-500 rounded-xl blur-lg opacity-50" />
            <div className="relative bg-black/50 border border-white/20 p-2.5 rounded-xl">
              <Shield className="w-6 h-6 text-violet-400" />
            </div>
          </div>
          <span className="text-xl font-bold text-white">Arcanext</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-pointer hover:bg-white/10 transition-colors">
          <Search className="w-4 h-4" />
          <span className="text-sm flex-1">Search...</span>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-white/10 rounded text-xs">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-violet-500/20 text-white border border-violet-500/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-violet-400' : ''}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto text-violet-400" />}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold">
            {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {currentUser?.displayName || 'User'}
            </p>
            <p className="text-xs text-gray-400 truncate">{currentUser?.email}</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </motion.aside>
  );
}

// Top Bar Component
function TopBar({ title, subtitle }) {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-black/20 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full" />
        </button>
      </div>
    </motion.header>
  );
}

export default function DashboardLayout({ children, activePage, title, subtitle }) {
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
    <BeamsBackground intensity="subtle" className="min-h-screen">
      <Sidebar currentUser={currentUser} onSignOut={handleSignOut} activePage={activePage} />
      <div className="ml-72 min-h-screen">
        <TopBar title={title} subtitle={subtitle} />
        <main className="p-8">
          {children}
        </main>
      </div>
    </BeamsBackground>
  );
}
