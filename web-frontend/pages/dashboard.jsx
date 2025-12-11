import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext.jsx';
import AuthGuard from '../components/auth/AuthGuard';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsGrid from '../components/dashboard/StatsGrid';
import OnboardingBanner from '../components/dashboard/OnboardingBanner';
import RepositoryList from '../components/dashboard/RepositoryList';
import RecentScans from '../components/dashboard/RecentScans';
import { apiClient, APIError } from '../lib/api';

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

      // Fetch all data in parallel
      const [reposData, scansData, statsData] = await Promise.all([
        apiClient.getRepositories(token).catch(() => []),
        apiClient.getScanJobs(token).catch(() => []),
        apiClient.getStats(token).catch(() => ({ repo_count: 0, scan_count: 0, vulnerability_count: 0 })),
      ]);

      setRepositories(reposData);
      setScans(scansData);
      setStats(statsData);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      
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

  // Handle GitHub App installation callback
  useEffect(() => {
    const { installation_id, setup_action } = router.query;
    
    if (installation_id && setup_action === 'install') {
      // Refresh data after GitHub App installation
      fetchDashboardData();
      // Clean up URL
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

      <div className="min-h-screen bg-background-primary">
        <DashboardHeader />

        <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Error State */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400">{error}</p>
                <button
                  onClick={fetchDashboardData}
                  className="mt-2 text-sm text-red-300 hover:text-red-200 underline"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Onboarding Banner */}
            {showOnboarding && (
              <OnboardingBanner
                onInstallClick={handleInstallGitHubApp}
                loading={loading}
              />
            )}

            {/* Stats Grid */}
            <StatsGrid stats={stats} loading={loading} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Repositories */}
              <div className="lg:col-span-1">
                <RepositoryList repositories={repositories} loading={loading} />
              </div>

              {/* Recent Scans */}
              <div className="lg:col-span-1">
                <RecentScans scans={scans} loading={loading} />
              </div>
            </div>
          </div>
        </main>
      </div>
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
