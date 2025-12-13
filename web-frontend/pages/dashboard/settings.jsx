import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthGuard from '../../components/auth/AuthGuard';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

// GitHub Icon
const GitHubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// GitLab Icon
const GitLabIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
  </svg>
);

// Slack Icon
const SlackIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
  </svg>
);

function SettingsContent() {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [scansUsed] = useState(0);
  const [scansTotal] = useState(10);

  return (
    <>
      <Head>
        <title>Settings - Arcanext</title>
        <meta name="description" content="Manage your account settings" />
      </Head>

      <DashboardLayout 
        activePage="settings" 
        title="Settings"
        breadcrumbs={[{ label: 'Personal', href: '/dashboard' }, { label: 'Settings' }]}
      >
        <div className="max-w-3xl space-y-6">
          {/* Name Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <h3 className="text-lg font-medium text-white mb-1">Name</h3>
            <p className="text-sm text-gray-400 mb-4">Your display name across Arcanext</p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                maxLength={24}
                className="flex-1 max-w-sm px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/20"
              />
              <button className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
                Save
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Please use 24 characters at maximum</p>
          </motion.div>

          {/* Integrations Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <h3 className="text-lg font-medium text-white mb-1">Integrations</h3>
            <p className="text-sm text-gray-400 mb-4">Connect third-party services for notifications and alerts</p>
            
            <div className="flex items-center justify-between py-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4A154B] rounded-lg flex items-center justify-center">
                  <SlackIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium">Connect Slack</p>
                  <p className="text-xs text-gray-500">Send vulnerability findings to a Slack channel</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
                Upgrade to Pro
              </button>
            </div>
          </motion.div>

          {/* Code Providers Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <h3 className="text-lg font-medium text-white mb-1">Code Providers</h3>
            <p className="text-sm text-gray-400 mb-4">Connect your GitHub or GitLab accounts to scan repositories</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <GitHubIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">Connect GitHub</p>
                    <p className="text-xs text-gray-500">Connect GitHub to sync pull requests and branches with Arcanext</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  Connect
                </button>
              </div>

              <div className="flex items-center justify-between py-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <GitLabIcon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">Connect GitLab</p>
                    <p className="text-xs text-gray-500">Sync repositories, merge requests, and branches with Arcanext</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  Connect
                </button>
              </div>
            </div>
          </motion.div>

          {/* Free Plan Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Free Plan</h3>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
                Upgrade
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2">Usage</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">Lifetime Scans</span>
                <span className="text-sm text-gray-400">Remaining</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">{scansUsed} / {scansTotal} scans</span>
                <span className="text-sm text-white">{scansTotal - scansUsed}</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${(scansUsed / scansTotal) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-3">What's Included</p>
              <div className="space-y-2">
                {[
                  '10 lifetime scans (GitHub, GitLab, or ZIP)',
                  'Basic vulnerability scanning',
                  'Basic PoCs and remediations'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default function Settings() {
  return (
    <AuthGuard>
      <SettingsContent />
    </AuthGuard>
  );
}
