import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Plus, RefreshCw, Folder, Zap, Check, Lock, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthGuard from '../../components/auth/AuthGuard';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Button from '../../components/ui/Button';
import { apiClient, APIError } from '../../lib/api';

function RepositoriesContent() {
  const { currentUser, githubAccessToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);
  const [githubRepos, setGithubRepos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadingGithubRepos, setLoadingGithubRepos] = useState(false);
  const [connecting, setConnecting] = useState(null);

  const fetchRepositories = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const token = await currentUser.getIdToken();
      const data = await apiClient.getRepositories(token);
      setRepositories(data);
    } catch (err) {
      if (err instanceof APIError && err.isAuthError) {
        router.push('/signin');
      }
    } finally {
      setLoading(false);
    }
  }, [currentUser, router]);

  const fetchGithubRepos = useCallback(async () => {
    if (!currentUser || !githubAccessToken) return;
    setLoadingGithubRepos(true);
    try {
      const token = await currentUser.getIdToken();
      const data = await apiClient.getGitHubUserRepos(token, githubAccessToken);
      setGithubRepos(data);
    } catch (err) {
      console.error('Failed to fetch GitHub repos:', err);
    } finally {
      setLoadingGithubRepos(false);
    }
  }, [currentUser, githubAccessToken]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  const handleAddRepository = () => {
    if (githubAccessToken) {
      setShowAddModal(true);
      fetchGithubRepos();
    } else {
      // Fallback to GitHub App installation
      const installUrl = apiClient.getGitHubInstallUrlSync();
      window.location.href = installUrl;
    }
  };

  const handleConnectRepo = async (repoFullName) => {
    if (!currentUser || !githubAccessToken) return;
    setConnecting(repoFullName);
    try {
      const token = await currentUser.getIdToken();
      await apiClient.connectGitHubRepo(token, repoFullName, githubAccessToken);
      await fetchRepositories();
      setShowAddModal(false);
    } catch (err) {
      console.error('Failed to connect repo:', err);
    } finally {
      setConnecting(null);
    }
  };

  const connectedRepoNames = repositories.map(r => r.repo_name);

  return (
    <>
      <Head>
        <title>Repositories - Arcanext</title>
      </Head>

      <DashboardLayout 
        activePage="repositories" 
        title="Repositories" 
        subtitle="Manage your connected repositories"
      >
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button onClick={handleAddRepository} className="bg-violet-500 hover:bg-violet-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Repository
            </Button>
            <Button variant="outline" onClick={fetchRepositories} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <span className="text-gray-400">{repositories.length} repositories connected</span>
        </div>

        {/* Repository Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-black/40 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-5 w-32 bg-white/10 rounded mb-2" />
                    <div className="h-4 w-20 bg-white/5 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : repositories.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-2xl" />
              <div className="relative p-6 bg-black/40 border border-white/10 rounded-full">
                <Folder className="w-12 h-12 text-gray-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No repositories connected</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              {githubAccessToken 
                ? "Click 'Add Repository' to connect your GitHub repositories for scanning."
                : "Connect your GitHub repositories to start scanning for security vulnerabilities."}
            </p>
            <Button onClick={handleAddRepository} className="bg-violet-500 hover:bg-violet-600">
              <Github className="w-5 h-5 mr-2" />
              {githubAccessToken ? 'Add Repository' : 'Install GitHub App'}
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {repositories.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative overflow-hidden bg-black/40 border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-white/20 transition-all group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-violet-500/30 transition-colors">
                        <Github className="w-6 h-6 text-gray-400 group-hover:text-violet-400 transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors">
                          {repo.repo_name?.split('/')[1] || repo.repo_name}
                        </h3>
                        <p className="text-sm text-gray-500">{repo.repo_name?.split('/')[0]}</p>
                      </div>
                    </div>
                    <a
                      href={`https://github.com/${repo.repo_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      Active
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full">
                      <Zap className="w-3 h-3" />
                      Protected
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Add Repository Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-2xl max-h-[80vh] bg-black/90 border border-white/10 rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white">Add Repository</h2>
                  <p className="text-gray-400 text-sm mt-1">Select a repository to connect for security scanning</p>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  {loadingGithubRepos ? (
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                          <div className="w-10 h-10 bg-white/10 rounded-lg" />
                          <div className="flex-1">
                            <div className="h-4 w-40 bg-white/10 rounded mb-2" />
                            <div className="h-3 w-60 bg-white/5 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : githubRepos.length === 0 ? (
                    <div className="text-center py-12">
                      <Folder className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">No repositories found</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {githubRepos.map((repo) => {
                        const isConnected = connectedRepoNames.includes(repo.full_name);
                        return (
                          <div
                            key={repo.id}
                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                              isConnected 
                                ? 'bg-emerald-500/10 border-emerald-500/30' 
                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            <div className="p-2 bg-black/30 rounded-lg">
                              <Github className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-white truncate">{repo.name}</h4>
                                {repo.private ? (
                                  <Lock className="w-3 h-3 text-amber-400" />
                                ) : (
                                  <Globe className="w-3 h-3 text-gray-500" />
                                )}
                              </div>
                              <p className="text-sm text-gray-500 truncate">{repo.full_name}</p>
                            </div>
                            {isConnected ? (
                              <span className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-sm rounded-lg">
                                <Check className="w-4 h-4" />
                                Connected
                              </span>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => handleConnectRepo(repo.full_name)}
                                disabled={connecting === repo.full_name}
                                className="bg-violet-500 hover:bg-violet-600"
                              >
                                {connecting === repo.full_name ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  'Connect'
                                )}
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-white/10 flex justify-end">
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardLayout>
    </>
  );
}

export default function Repositories() {
  return (
    <AuthGuard>
      <RepositoriesContent />
    </AuthGuard>
  );
}
