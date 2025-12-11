import { Clock, CheckCircle, XCircle, Loader2, GitPullRequest } from 'lucide-react';

const statusConfig = {
  queued: {
    icon: Clock,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    label: 'Queued',
  },
  running: {
    icon: Loader2,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    label: 'Running',
    animate: true,
  },
  completed: {
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    label: 'Completed',
  },
  failed: {
    icon: XCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
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
  if (loading) {
    return (
      <div className="bg-background-secondary/50 backdrop-blur-sm border border-white/5 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Scans</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-white/10 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 w-32 bg-white/10 rounded mb-2"></div>
                <div className="h-3 w-48 bg-white/5 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!scans || scans.length === 0) {
    return (
      <div className="bg-background-secondary/50 backdrop-blur-sm border border-white/5 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Scans</h2>
        <div className="text-center py-8">
          <GitPullRequest className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No scans yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Scans will appear here when you open pull requests
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-secondary/50 backdrop-blur-sm border border-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Recent Scans</h2>
        <span className="text-sm text-gray-400">{scans.length} scans</span>
      </div>

      <div className="space-y-3">
        {scans.map((scan) => {
          const status = statusConfig[scan.status] || statusConfig.queued;
          const StatusIcon = status.icon;

          return (
            <div
              key={scan.id}
              className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              {/* Status Icon */}
              <div className={`p-2 rounded-full ${status.bgColor}`}>
                <StatusIcon
                  className={`w-4 h-4 ${status.color} ${status.animate ? 'animate-spin' : ''}`}
                />
              </div>

              {/* Scan Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    PR #{scan.pr_number || 'N/A'}
                  </span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${status.bgColor} ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>Commit: {truncateSha(scan.commit_sha)}</span>
                  <span>•</span>
                  <span>{formatDate(scan.created_at)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
