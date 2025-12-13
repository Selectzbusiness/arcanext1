import { motion } from 'framer-motion';
import { GitBranch, Scan, AlertTriangle } from 'lucide-react';

export default function StatsGrid({ stats, loading }) {
  const statItems = [
    {
      label: 'Repositories',
      value: stats?.repo_count ?? 0,
      icon: GitBranch,
      color: 'text-cyan-400',
      glowColor: 'cyan',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      borderGlow: 'hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)]',
    },
    {
      label: 'Total Scans',
      value: stats?.scan_count ?? 0,
      icon: Scan,
      color: 'text-emerald-400',
      glowColor: 'emerald',
      gradient: 'from-emerald-500/20 to-green-500/20',
      borderGlow: 'hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.4)]',
    },
    {
      label: 'Vulnerabilities',
      value: stats?.vulnerability_count ?? 0,
      icon: AlertTriangle,
      color: 'text-amber-400',
      glowColor: 'amber',
      gradient: 'from-amber-500/20 to-orange-500/20',
      borderGlow: 'hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.4)]',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -4 }}
          className={`relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-500 ${item.borderGlow}`}
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50`} />
          
          {/* Animated Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} blur-xl`} />
          </div>

          {/* Glass Effect */}
          <div className="relative bg-black/40 backdrop-blur-xl p-6">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-12 w-12 bg-white/10 rounded-xl mb-4"></div>
                <div className="h-10 w-20 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-28 bg-white/5 rounded"></div>
              </div>
            ) : (
              <>
                {/* Icon with Glow */}
                <div className="relative mb-4">
                  <div className={`absolute inset-0 ${item.color} blur-xl opacity-30 group-hover:opacity-60 transition-opacity`} />
                  <div className={`relative p-3 rounded-xl bg-gradient-to-br ${item.gradient} border border-white/10`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                </div>

                {/* Animated Counter */}
                <motion.div 
                  className="text-4xl font-bold text-white mb-1 tracking-tight"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5, type: 'spring' }}
                >
                  {item.value.toLocaleString()}
                </motion.div>
                
                <div className="text-sm text-gray-400 font-medium tracking-wide uppercase">
                  {item.label}
                </div>

                {/* Decorative Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
              </>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
