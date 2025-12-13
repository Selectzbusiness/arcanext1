import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Search, Plus, GitBranch, FolderGit2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthGuard from '../../components/auth/AuthGuard';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { apiClient, APIError } from '../../lib/api';

// GitHub Icon
const GitHubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// GitLab Icon
const GitLabIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
  </svg>
);

// Empty State Illustration
function EmptyIllustration() {
  return (
    <div className="w-32 h-32 mx-auto mb-6">
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
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

function RepositoriesContent() {
  const { currentUser, githubAccessToken } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRepositories = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);

    try {
      const token = await currentUser.getIdToken();
      const data = await apiClient.getRepositories(token).catch(() => []);
      setRepositories(data);
    } catch (err) {
      if (err instanceof APIError && err.isAuthError) {
        router.push('/signin');
      }
    } finally {
      setLoading(false);
    }
  }, [currentUser, router]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  const filteredRepos = repositories.filter(repo => 
    repo.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showEmptyState = !loading && repositories.length === 0;

  return (
    <>
      <Head>
        <title>Repositories - Arcanext</title>
        <meta name="description" content="Manage your connected repositories" />
      </Head>

      <DashboardLayout 
        activePage="repositories" 
        title="Repositories"
        breadcrumbs={[{ label: 'Personal', href: '/dashboard' }, { label: 'Repositories' }]}
      >
        {/* Header Actions */}
        {!showEmptyState && (
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Repo not found? Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/20"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add Repositories
            </button>
          </div>
        )}

        {showEmptyState ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-12"
          >
            <div className="flex flex-col items-center justify-center">
              <EmptyIllustration />
              <h2 className="text-lg font-medium text-white mb-2">Connect your repositories</h2>
              <p className="text-gray-400 text-center max-w-md mb-8 text-sm">
                Connect GitHub or GitLab to manage and scan repositories.
              </p>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
                  <GitHubIcon className="w-4 h-4" />
                  Connect GitHub
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors">
                  <GitLabIcon className="w-4 h-4 text-orange-500" />
                  Connect GitLab
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            {filteredRepos.length > 0 ? (
              <div className="divide-y divide-white/5">
                {filteredRepos.map((repo, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <FolderGit2 className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-white font-medium">{repo.name}</p>
                        <p className="text-xs text-gray-500">{repo.full_name || repo.owner}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors">
                      Scan
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 text-sm">No repositories match your search.</p>
              </div>
            )}
          </div>
        )}
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
