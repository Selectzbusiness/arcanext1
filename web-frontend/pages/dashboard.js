

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Assuming Navbar is in components/Navbar.js

export default function Dashboard() {
  const { currentUser, arcanextUser, loading } = useAuth();
  const router = useRouter();

  const [repos, setRepos] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Protect the route
    if (!loading && !currentUser) {
      router.push('/');
    }

    // 2. Fetch data only when we have the Arcanext user and token
    if (arcanextUser && currentUser) {
      const fetchData = async () => {
        try {
          const token = await currentUser.getIdToken();
          const headers = { 'Authorization': `Bearer ${token}` };

          // Fetch repositories
          const repoRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/repositories`, { headers });
          if (!repoRes.ok) throw new Error('Failed to fetch repositories');
          const repoData = await repoRes.json();
          setRepos(repoData);

          // Fetch jobs
          const jobRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs`, { headers });
          if (!jobRes.ok) throw new Error('Failed to fetch jobs');
          const jobData = await jobRes.json();
          setJobs(jobData);

        } catch (err) {
          setError(err.message);
        }
      };

      fetchData();
    }
  }, [currentUser, arcanextUser, loading, router]);

  if (loading || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {currentUser.email}</h1>
        <h2 className="text-xl text-gray-400 mb-8">Your Arcanext ID: {arcanextUser?.id}</h2>

        {error && <div className="text-red-500 bg-red-100 border border-red-500 p-4 rounded mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Repositories Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Repositories</h2>
            <a
              href="YOUR_GITHUB_APP_INSTALL_URL" // <-- IMPORTANT: You will get this URL from GitHub
              className="mb-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install Arcanext GitHub App
            </a>
            <ul className="space-y-2">
              {repos.length > 0 ? (
                repos.map(repo => (
                  <li key={repo.id} className="bg-gray-700 p-3 rounded">{repo.repo_name}</li>
                ))
              ) : (
                <li className="text-gray-400">No repositories found. Install the GitHub app.</li>
              )}
            </ul>
          </div>

          {/* Scan Jobs Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Recent Scan Jobs</h2>
            <ul className="space-y-2">
              {jobs.length > 0 ? (
                jobs.map(job => (
                  <li key={job.id} className="bg-gray-700 p-3 rounded">
                    <div className="font-mono text-sm">Job ID: {job.id}</div>
                    <div className="text-lg">PR #{job.pr_number}</div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      job.status === 'queued' ? 'bg-yellow-500 text-gray-900' :
                      job.status === 'failed' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}>
                      {job.status}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">No scan jobs found.</li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
