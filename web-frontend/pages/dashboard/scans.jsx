import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  Clock, CheckCircle, XCircle, Loader2, GitPullRequest, 
  Activity, Filter, RefreshCw, Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthGuard from '../../components/auth/AuthGuard';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Button from '../../components/ui/Button';
import { apiClient, APIError } from '../../lib/api';

const statusConfig = {
  queued: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Queued' },
  running: { icon: Loader2, color: 'text-cyan-400', bg: 'bg-cyan-500/10', label: 'Running', animate: true },
  completed: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Completed' },
  failed: { icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-500/10', label: 'Failed' },
};

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function ScansContent() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [scans, setScans] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchScans = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const token = await currentUser.getIdToken();
      const data = await apiClient.getScanJobs(token);
      setScans(data);
    } catch (err) {
      if (err instanceof APIError && err.isAuthError) {
        router.push('/signin');
      }
    } finally {
      setLoading(false);
    }
  }, [currentUser, router]);

  useEffect(() => {
    fetchScans();
  }, [fetchScans]);

  const filteredScans = filter === 'all' ? scans : scans.filter(s => s.status === filter);

  return (
    <>
      <Head>
        <title>Scans - Arcanext</title>
      </Head>

      <DashboardLayout 
        activePage="scans" 
        title="Security Scans" 
        subtitle="View and manage your security scan history"
      >
        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            {['all', 'completed', 'running', 'queued', 'failed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === f 
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' 
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <Button variant="outline" onClick={fetchScans} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Scans List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse bg-black/40 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-5 w-40 bg-white/10 rounded mb-2" />
                    <div className="h-4 w-60 bg-white/5 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredScans.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-2xl" />
              <div className="relative p-6 bg-black/40 border border-white/10 rounded-full">
                <Activity className="w-12 h-12 text-gray-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {filter === 'all' ? 'No scans yet' : `No ${filter} scans`}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Security scans will appear here when you open pull requests on connected repositories.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {filteredScans.map((scan, index) => {
              const status = statusConfig[scan.status] || statusConfig.queued;
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="relative overflow-hidden bg-black/40 border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-white/20 transition-all group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative flex items-center gap-6">
                    {/* Status Icon */}
                    <div className={`p-4 rounded-xl ${status.bg} border border-white/10`}>
                      <StatusIcon className={`w-6 h-6 ${status.color} ${status.animate ? 'animate-spin' : ''}`} />
                    </div>

                    {/* Scan Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-white">
                          Pull Request #{scan.pr_number || 'N/A'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                          <GitPullRequest className="w-4 h-4" />
                          {scan.repo_name || 'Unknown repo'}
                        </span>
                        <span>•</span>
                        <span className="font-mono">{scan.commit_sha?.substring(0, 7) || 'N/A'}</span>
                        <span>•</span>
                        <span>{formatDate(scan.created_at)}</span>
                      </div>
                    </div>

                    {/* Vulnerabilities Count */}
                    {scan.status === 'completed' && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{scan.vulnerability_count || 0}</p>
                        <p className="text-sm text-gray-400">vulnerabilities</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </DashboardLayout>
    </>
  );
}

export default function Scans() {
  return (
    <AuthGuard>
      <ScansContent />
    </AuthGuard>
  );
}
