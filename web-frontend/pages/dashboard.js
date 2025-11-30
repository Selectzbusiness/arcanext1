import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const { currentUser, arcanextUser, loading } = useAuth();
  const router = useRouter();
  const [repos, setRepos] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/');
    }

    if (arcanextUser && currentUser) {
      const fetchData = async () => {
        try {
          const token = await currentUser.getIdToken();
          const headers = { 'Authorization': `Bearer ${token}` };

          const repoRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/repositories`, { headers });
          if (repoRes.ok) setRepos(await repoRes.json());

          const jobRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs`, { headers });
          if (jobRes.ok) setJobs(await jobRes.json());
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }
  }, [currentUser, arcanextUser, loading, router]);

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - Arcanext</title>
      </Head>

      <div className="min-h-screen bg-[#0d1117]">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117] border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <span className="text-xl font-bold text-white">Arcanext Dashboard</span>
            <button 
              onClick={() => router.push('/')}
              className="text-gray-300 hover:text-white px-4 py-2"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="pt-24 px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome, {currentUser.email}
            </h1>
            <p className="text-gray-400 mb-8">Arcanext ID: {arcanextUser?.id}</p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6">
                <div className="text-2xl font-bold text-white">{repos.length}</div>
                <div className="text-sm text-gray-400">Repositories</div>
              </div>
              <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6">
                <div className="text-2xl font-bold text-white">{jobs.length}</div>
                <div className="text-sm text-gray-400">Scan Jobs</div>
              </div>
              <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6">
                <div className="text-2xl font-bold text-green-400">0</div>
                <div className="text-sm text-gray-400">Vulnerabilities</div>
              </div>
            </div>

            {/* Repositories */}
            <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Repositories</h2>
              {repos.length > 0 ? (
                <div className="space-y-2">
                  {repos.map(repo => (
                    <div key={repo.id} className="bg-[#0d1117] p-4 rounded-lg border border-gray-800">
                      <div className="text-white font-medium">{repo.repo_name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No repositories found. Install the GitHub app.</p>
              )}
            </div>

            {/* Recent Scans */}
            <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Recent Scans</h2>
              {jobs.length > 0 ? (
                <div className="space-y-2">
                  {jobs.map(job => (
                    <div key={job.id} className="bg-[#0d1117] p-4 rounded-lg border border-gray-800">
                      <div className="text-white">PR #{job.pr_number}</div>
                      <div className="text-sm text-gray-400">Status: {job.status}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No scans yet.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
