import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Folder, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthGuard from '../../components/auth/AuthGuard';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatsGrid from '../../components/dashboard/StatsGrid';
import OnboardingBanner from '../../components/dashboard/OnboardingBanner';
import RepositoryList from '../../components/dashboard/RepositoryList';
import RecentScans from '../../components/dashboard/RecentScans';
import { apiClient, APIError } from '../../lib/api';

function DashboardContent() {
  const { currentUser } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [scans, setScans] = useState([]);
  const [stats, setStats] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    setError(null);

    try {
      const token = await currentUser.getIdToken();
      const [reposData, scansData, statsData] = await Promise.all([
        apiClient.getRepositories(token).catch(() => []),
        apiClient.getScanJobs(token).catch(() => []),
        apiClient.getStats(token).catch(() => ({ repo_count: 0, scan_count: 0, vulnerability_count: 0 })),
      ]);
      setRepositories(reposData);
      setScans(scansData);
      setStats(statsData);
    } catch (err) {
      if (err instanceof APIError && err.isAuthError) {
        router.push('/signin');
        return;
      }
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [currentUser, router]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    const { installation_id, setup_action } = router.query;
    if (installation_id && setup_action === 'install') {
      fetchDashboardData();
      router.replace('/dashboard', undefined, { shallow: true });
    }
  }, [router.query, fetchDashboardData, router]);

  const handleInstallGitHubApp = () => {
    const installUrl = apiClient.getGitHubInstallUrlSync();
    window.location.href = installUrl;
  };

  const showOnboarding = !loading && repositories.length === 0;

  return (
    <>
      <Head>
        <title>Dashboard - Arcanext</title>
        <meta name="description" content="Manage your security scans and repositories" />
      </Head>

      <DashboardLayout 
        activePage="dashboard" 
        title="Dashboard" 
        subtitle="Welcome back! Here's your security overview."
      >
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
          >
            <p className="text-red-400">{error}</p>
            <button onClick={fetchDashboardData} className="mt-2 text-sm text-red-300 hover:text-red-200 underline">
              Try again
            </button>
          </motion.div>
        )}

        {showOnboarding && (
          <OnboardingBanner onInstallClick={handleInstallGitHubApp} loading={loading} />
        )}

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <StatsGrid stats={stats} loading={loading} />
          </div>

          <div className="col-span-12 xl:col-span-7">
            <RepositoryList repositories={repositories} loading={loading} />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <RecentScans scans={scans} loading={loading} />
          </div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-12 xl:col-span-4 relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent" />
            <div className="relative bg-black/40 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/dashboard/repositories" className="w-full flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors text-left">
                  <div className="p-2 bg-violet-500/20 rounded-lg">
                    <Folder className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Add Repository</p>
                    <p className="text-sm text-gray-400">Connect a new repo</p>
                  </div>
                </Link>
                <Link href="/dashboard/scans" className="w-full flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors text-left">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Activity className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">View Scans</p>
                    <p className="text-sm text-gray-400">Check scan history</p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Security Score */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-12 xl:col-span-4 relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
            <div className="relative bg-black/40 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Security Score</h3>
              <div className="flex items-center justify-center py-6">
                <div className="relative">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/10" />
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" 
                      className="text-emerald-400" strokeDasharray="352" strokeDashoffset="70" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">80</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-400">Your code is well protected</p>
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-12 xl:col-span-4 relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
            <div className="relative bg-black/40 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { text: 'New scan completed', time: '2 min ago' },
                  { text: 'Repository connected', time: '1 hour ago' },
                  { text: 'Vulnerability fixed', time: '3 hours ago' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm text-white">{item.text}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
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

export default function Dashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
