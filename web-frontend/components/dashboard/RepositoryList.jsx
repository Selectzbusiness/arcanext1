import { GitBranch, Github, ExternalLink } from 'lucide-react';

export default function RepositoryList({ repositories, loading }) {
  if (loading) {
    return (
      <div className="bg-background-secondary/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Your Repositories</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-white/5 rounded-lg">
              <div className="w-10 h-10 bg-white/10 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 w-48 bg-white/10 rounded mb-2"></div>
                <div className="h-3 w-24 bg-white/5 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!repositories || repositories.length === 0) {
    return null; // OnboardingBanner will show instead
  }

  return (
    <div className="bg-background-secondary/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Your Repositories</h2>
        <span className="text-sm text-gray-400">{repositories.length} connected</span>
      </div>
      
      <div className="space-y-3">
        {repositories.map((repo) => (
          <div
            key={repo.id}
            className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
          >
            {/* Provider Icon */}
            <div className="flex-shrink-0 p-2 bg-white/5 rounded-lg">
              {repo.provider === 'github' ? (
                <Github className="w-6 h-6 text-gray-400" />
              ) : (
                <GitBranch className="w-6 h-6 text-gray-400" />
              )}
            </div>

            {/* Repo Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium truncate">
                  {repo.repo_name}
                </span>
                <a
                  href={`https://github.com/${repo.repo_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                </a>
              </div>
              <span className="text-sm text-gray-500 capitalize">{repo.provider}</span>
            </div>

            {/* Status Badge */}
            <div className="flex-shrink-0">
              <span className="px-2 py-1 text-xs bg-green-500/10 text-green-400 rounded-full">
                Connected
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
