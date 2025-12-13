import { motion } from 'framer-motion';
import { GitBranch, Github, ExternalLink, Folder, Zap } from 'lucide-react';

export default function RepositoryList({ repositories, loading }) {
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
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5" />
        <div className="relative bg-black/40 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Folder className="w-5 h-5 text-cyan-400" />
            Your Repositories
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-12 h-12 bg-white/10 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-4 w-48 bg-white/10 rounded mb-2"></div>
                  <div className="h-3 w-24 bg-white/5 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!repositories || repositories.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5" />
      <div className="relative bg-black/40 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Folder className="w-5 h-5 text-cyan-400" />
            Your Repositories
          </h2>
          <span className="px-3 py-1 text-sm text-gray-400 bg-white/5 border border-white/10 rounded-full">
            {repositories.length} connected
          </span>
        </div>

        <motion.div 
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {repositories.map((repo) => (
            <motion.div
              key={repo.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01, x: 4 }}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-xl transition-all duration-300 cursor-pointer hover:border-white/20 hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.2)] group"
            >
              {/* Provider Icon with Glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-3 bg-black/30 border border-white/10 rounded-xl group-hover:border-cyan-500/30 transition-colors">
                  {repo.provider === 'github' ? (
                    <Github className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  ) : (
                    <GitBranch className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  )}
                </div>
              </div>

              {/* Repo Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold truncate group-hover:text-cyan-300 transition-colors">
                    {repo.repo_name}
                  </span>
                  <a
                    href={`https://github.com/${repo.repo_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                  </a>
                </div>
                <span className="text-sm text-gray-500 capitalize flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                  {repo.provider}
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex-shrink-0">
                <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-medium">
                  <Zap className="w-3 h-3" />
                  Active
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
