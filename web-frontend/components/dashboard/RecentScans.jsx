import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Loader2, GitPullRequest, Activity } from 'lucide-react';

const statusConfig = {
  queued: {
    icon: Clock,
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-orange-500/20',
    glow: 'shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)]',
    label: 'Queued',
  },
  running: {
    icon: Loader2,
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    glow: 'shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]',
    label: 'Running',
    animate: true,
  },
  completed: {
    icon: CheckCircle,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-green-500/20',
    glow: 'shadow-[0_0_20px_-5px_rgba(52,211,153,0.3)]',
    label: 'Completed',
  },
  failed: {
    icon: XCircle,
    color: 'text-rose-400',
    gradient: 'from-rose-500/20 to-red-500/20',
    glow: 'shadow-[0_0_20px_-5px_rgba(251,113,133,0.3)]',
    label: 'Failed',
  },
};

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function truncateSha(sha) {
  return sha ? sha.substring(0, 7) : 'N/A';
}

export default function RecentScans({ scans, loading }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />
        <div className="relative bg-black/40 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-400" />
            Recent Scans
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 bg-white/10 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-4 w-32 bg-white/10 rounded mb-2"></div>
                  <div className="h-3 w-48 bg-white/5 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!scans || scans.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />
        <div className="relative bg-black/40 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-400" />
            Recent Scans
          </h2>
          <div className="text-center py-12">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-xl" />
              <div className="relative p-4 bg-white/5 border border-white/10 rounded-full">
                <GitPullRequest className="w-8 h-8 text-gray-500" />
              </div>
            </div>
            <p className="text-gray-400 font-medium">No scans yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Scans will appear here when you open pull requests
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />
      <div className="relative bg-black/40 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-400" />
            Recent Scans
          </h2>
          <span className="px-3 py-1 text-sm text-gray-400 bg-white/5 border border-white/10 rounded-full">
            {scans.length} scans
          </span>
        </div>

        <motion.div 
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {scans.map((scan) => {
            const status = statusConfig[scan.status] || statusConfig.queued;
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={scan.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01, x: 4 }}
                className={`flex items-center gap-4 p-4 bg-gradient-to-r ${status.gradient} border border-white/10 rounded-xl transition-all duration-300 cursor-pointer hover:border-white/20 ${status.glow}`}
              >
                <div className={`p-2.5 rounded-xl bg-black/30 border border-white/10`}>
                  <StatusIcon className={`w-5 h-5 ${status.color} ${status.animate ? 'animate-spin' : ''}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">PR #{scan.pr_number || 'N/A'}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full bg-black/30 ${status.color} font-medium`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                    <span className="font-mono">{truncateSha(scan.commit_sha)}</span>
                    <span className="text-gray-600">•</span>
                    <span>{formatDate(scan.created_at)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
