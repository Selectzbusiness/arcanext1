import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  User, Bell, Shield, Key, Palette, Globe, 
  ChevronRight, Check, Moon, Sun
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthGuard from '../../components/auth/AuthGuard';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Button from '../../components/ui/Button';

function SettingsContent() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <>
      <Head>
        <title>Settings - Arcanext</title>
      </Head>

      <DashboardLayout 
        activePage="settings" 
        title="Settings" 
        subtitle="Manage your account preferences"
      >
        <div className="grid grid-cols-12 gap-8">
          {/* Settings Navigation */}
          <div className="col-span-12 lg:col-span-3">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-violet-500/20 text-white border border-violet-500/30'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-violet-400' : ''}`} />
                  <span className="font-medium">{tab.label}</span>
                  {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto text-violet-400" />}
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="col-span-12 lg:col-span-9">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/40 border border-white/10 rounded-2xl p-8"
            >
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white">
                      {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Change Avatar</Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                      <input
                        type="text"
                        defaultValue={currentUser?.displayName || ''}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        value={currentUser?.email || ''}
                        disabled
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
                      />
                    </div>
                    <Button className="bg-violet-500 hover:bg-violet-600">Save Changes</Button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'email', label: 'Email Notifications', desc: 'Receive scan results via email' },
                      { key: 'push', label: 'Push Notifications', desc: 'Get browser push notifications' },
                      { key: 'weekly', label: 'Weekly Digest', desc: 'Receive weekly security summary' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div>
                          <p className="font-medium text-white">{item.label}</p>
                          <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            notifications[item.key] ? 'bg-violet-500' : 'bg-white/10'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium text-white">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-400">Add an extra layer of security</p>
                        </div>
                        <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-sm rounded-full">Not Enabled</span>
                      </div>
                      <Button variant="outline" size="sm">Enable 2FA</Button>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                      <p className="font-medium text-white mb-2">Active Sessions</p>
                      <p className="text-sm text-gray-400 mb-4">Manage your active login sessions</p>
                      <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-white">Current Session</p>
                            <p className="text-xs text-gray-500">Chrome on Windows</p>
                          </div>
                        </div>
                        <span className="flex items-center gap-1 text-emerald-400 text-sm">
                          <Check className="w-4 h-4" />
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">API Keys</h2>
                  <p className="text-gray-400 mb-6">Manage your API keys for programmatic access.</p>
                  
                  <div className="p-6 border-2 border-dashed border-white/10 rounded-xl text-center">
                    <Key className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No API keys generated yet</p>
                    <Button className="bg-violet-500 hover:bg-violet-600">Generate API Key</Button>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Appearance</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="font-medium text-white mb-4">Theme</p>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-violet-500/20 border border-violet-500/30 rounded-xl text-center">
                          <Moon className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                          <p className="text-white font-medium">Dark</p>
                          <p className="text-xs text-gray-400">Currently active</p>
                        </button>
                        <button className="p-4 bg-white/5 border border-white/10 rounded-xl text-center hover:bg-white/10 transition-colors">
                          <Sun className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-400 font-medium">Light</p>
                          <p className="text-xs text-gray-500">Coming soon</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
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
