import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, Home, Folder, Activity, Settings, LogOut, 
  Key, Building2, FileText, Plus, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { BeamsBackground } from '../ui/BeamsBackground';

// Sidebar Navigation Component
function Sidebar({ currentUser, onSignOut, activePage }) {
  const navItems = [
    { icon: Home, label: 'Home', href: '/dashboard', id: 'dashboard' },
    { icon: FileText, label: 'Custom Rules', href: '/dashboard/rules', id: 'rules' },
    { icon: Folder, label: 'Repositories', href: '/dashboard/repositories', id: 'repositories' },
    { icon: Key, label: 'API Keys', href: '/dashboard/api-keys', id: 'api-keys' },
    { icon: Building2, label: 'Organization', href: '/dashboard/organization', id: 'organization' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings', id: 'settings' },
  ];

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 bottom-0 w-56 bg-[#0a0a0a] border-r border-white/5 z-50 flex flex-col"
    >
      {/* Organization Selector */}
      <div className="p-3 border-b border-white/5">
        <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-white/5 rounded-lg transition-colors">
          <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-white flex-1 text-left">Personal</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* New Scan Button */}
      <div className="p-3">
        <Link
          href="/dashboard/new-scan"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Scan
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
                isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
            {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">
              {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-gray-500">Free Tier</p>
          </div>
          <button
            onClick={onSignOut}
            className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

// Breadcrumb Component
function Breadcrumb({ items }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-600">›</span>}
          {item.href ? (
            <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function DashboardLayout({ children, activePage, title, breadcrumbs }) {
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

  const defaultBreadcrumbs = [
    { label: 'Personal', href: '/dashboard' },
    { label: title }
  ];

  return (
    <BeamsBackground intensity="subtle" className="min-h-screen">
      <Sidebar currentUser={currentUser} onSignOut={handleSignOut} activePage={activePage} />
      <div className="ml-56 min-h-screen">
        {/* Header */}
        <header className="px-8 pt-6 pb-4">
          <Breadcrumb items={breadcrumbs || defaultBreadcrumbs} />
          <h1 className="text-2xl font-semibold text-white mt-4">{title}</h1>
        </header>
        
        {/* Main Content */}
        <main className="px-8 pb-8">
          {children}
        </main>
      </div>
    </BeamsBackground>
  );
}
