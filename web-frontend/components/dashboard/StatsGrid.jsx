import { GitBranch, Scan, AlertTriangle } from 'lucide-react';

export default function StatsGrid({ stats, loading }) {
  const statItems = [
    {
      label: 'Repositories',
      value: stats?.repo_count ?? 0,
      icon: GitBranch,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Total Scans',
      value: stats?.scan_count ?? 0,
      icon: Scan,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Vulnerabilities',
      value: stats?.vulnerability_count ?? 0,
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {statItems.map((item) => (
        <div
          key={item.label}
          className="bg-background-secondary/50 backdrop-blur-sm border border-white/5 rounded-xl p-6"
        >
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 w-16 bg-white/10 rounded mb-2"></div>
              <div className="h-4 w-24 bg-white/5 rounded"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${item.bgColor}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {item.value.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">{item.label}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
