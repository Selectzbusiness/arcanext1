import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Scan, GitBranch, FolderGit2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthGuard from '../../components/auth/AuthGuard';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { apiClient, APIError } from '../../lib/api';

// Empty State Illustration
function EmptyIllustration() {
  return (
    <div className="w-32 h-32 mx-auto mb-6">
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Folder/Document Stack Illustration */}
        <rect x="24" y="40" width="80" height="60" rx="4" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" fill="none" />
        <rect x="28" y="36" width="72" height="56" rx="4" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
        <rect x="32" y="32" width="64" height="52" rx="4" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
        <path d="M32 44h64" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" />
        <circle cx="40" cy="38" r="2" fill="white" fillOpacity="0.3" />
        <circle cx="48" cy="38" r="2" fill="white" fillOpacity="0.3" />
        <circle cx="56" cy="38" r="2" fill="white" fillOpacity="0.3" />
      </svg>
    </div>
  );
}

function DashboardContent() {
  const { currentUser, githubAccessToken } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);
  const [scans, setScans] = useState([]);

  const fetchDashboardData = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);

    try {
      const token = await currentUser.getIdToken();
      const [reposData, scansData] = await Promise.all([
        apiClient.getRepositories(token).catch(() => []),
        apiClient.getScanJobs(token).catch(() => []),
      ]);
      setRepositories(reposData);
      setScans(scansData);
    } catch (err) {
      if (err instanceof APIError && err.isAuthError) {
        router.push('/signin');
        return;
      }
    } finally {
      setLoading(false);
    }
  }, [currentUser, router]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const showEmptyState = !loading && repositories.length === 0 && scans.length === 0;

  return (
    <>
      <Head>
        <title>Home - Arcanext</title>
        <meta name="description" content="Manage your security scans and repositories" />
      </Head>

      <DashboardLayout 
        activePage="dashboard" 
        title="Home"
        breadcrumbs={[{ label: 'Personal', href: '/dashboard' }, { label: 'Home' }]}
      >
        {showEmptyState ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <EmptyIllustration />
            <h2 className="text-xl font-semibold text-white mb-2">Get Started</h2>
            <p className="text-gray-400 text-center max-w-md mb-8">
              You can immediately start scanning your code for vulnerabilities or connect your code repositories to Arcanext.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/new-scan"
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Scan className="w-4 h-4" />
                New Scan
              </Link>
              <Link
                href="/dashboard/repositories"
                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                Connect Code
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-sm text-gray-400 mb-1">Total Repositories</p>
                <p className="text-3xl font-semibold text-white">{repositories.length}</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-sm text-gray-400 mb-1">Total Scans</p>
                <p className="text-3xl font-semibold text-white">{scans.length}</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-sm text-gray-400 mb-1">Vulnerabilities Found</p>
                <p className="text-3xl font-semibold text-white">0</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Recent Scans</h3>
              {scans.length > 0 ? (
                <div className="space-y-3">
                  {scans.slice(0, 5).map((scan, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-3">
                        <FolderGit2 className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-white">{scan.repo_name || 'Unknown Repository'}</p>
                          <p className="text-xs text-gray-500">{scan.status}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{scan.created_at || 'Recently'}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No scans yet. Start your first scan!</p>
              )}
            </div>
          </div>
        )}
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
