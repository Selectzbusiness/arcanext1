import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Shield, Zap, CheckCircle2, GitBranch, Terminal } from 'lucide-react';
import Badge from '../ui/Badge';
import FadeIn from '../animations/FadeIn';
import { cn } from '../../lib/utils';

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);
  const tabRefs = useRef([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  const tabs = [
    {
      id: 'integrate',
      label: '1. Connect',
      icon: GitBranch,
      title: 'Install & Integrate',
      description: 'Connect Arcanext to your GitHub repository in seconds. No complex configuration required.',
      code: `# .github/workflows/arcanext.yml
name: Arcanext Security Scan
on: [pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: arcanext/scan-action@v1
        with:
          auto-fix: true
          token: \${{ secrets.GITHUB_TOKEN }}`,
    },
    {
      id: 'scan',
      label: '2. Analyze',
      icon: Shield,
      title: 'AI-Powered Analysis',
      description: 'Our advanced AI models scan every pull request in real-time, detecting vulnerabilities with context-aware precision.',
      code: `// 🔍 Scanning src/auth/login.ts...
// ⚠️ Vulnerability Detected: SQL Injection

const query = "SELECT * FROM users WHERE id = " + userId;

// Analysis:
// User input 'userId' is directly concatenated 
// into the query string, allowing SQL injection.`,
    },
    {
      id: 'fix',
      label: '3. Auto-Fix',
      icon: Zap,
      title: 'One-Click Remediation',
      description: 'Arcanext generates secure, production-ready code fixes. Approve and merge directly from the PR.',
      code: `// ✅ Fix Applied: Parameterized Query

// Before:
// const query = "SELECT * FROM users WHERE id = " + userId;

// After:
const query = "SELECT * FROM users WHERE id = ?";
await db.execute(query, [userId]);`,
    },
    {
      id: 'results',
      label: '4. Report',
      icon: CheckCircle2,
      title: 'Continuous Compliance',
      description: 'Get detailed security reports, track metrics over time, and maintain SOC2/GDPR compliance.',
      code: `✓ Scan Complete
----------------------------------------
🛡️ Security Score: A+ (98/100)

✅ 0 Critical Issues
✅ 0 High Issues
✅ 1 Medium Issue (Fixed)

📊 Compliance Status:
  • SOC2: Passing
  • GDPR: Passing
  • OWASP Top 10: Clean`,
    },
  ];

  useEffect(() => {
    const activeElement = tabRefs.current[activeTab];
    if (activeElement) {
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      {/* Global background handles this now */}

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-6">
              How It Works
            </Badge>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Security Automation in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-glow">
                4 Simple Steps
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              From installation to remediation, Arcanext handles the heavy lifting so you can focus on shipping features.
            </p>
          </div>
        </FadeIn>

        {/* Tabs Navigation */}
        <FadeIn delay={0.2}>
          <div className="relative mb-12">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-background-primary/50 backdrop-blur-sm p-2 rounded-2xl border border-white/5 inline-flex left-1/2 -translate-x-1/2 relative">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => (tabRefs.current[index] = el)}
                    onClick={() => setActiveTab(index)}
                    className={cn(
                      'relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 z-10',
                      activeTab === index
                        ? 'text-white'
                        : 'text-gray-400 hover:text-gray-200'
                    )}
                  >
                    <Icon className={cn("w-4 h-4", activeTab === index ? "text-brand-accent" : "text-gray-500")} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  </button>
                );
              })}
              {/* Animated Tab Background */}
              <motion.div
                className="absolute top-2 bottom-2 bg-white/10 rounded-lg -z-0"
                animate={indicatorStyle}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-background-primary rounded-3xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left: Description */}
                <div className="p-8 sm:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 bg-gradient-to-br from-background-primary to-background-secondary">
                  <div className="inline-flex items-center gap-2 text-brand-accent font-semibold mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-sm">
                      {activeTab + 1}
                    </span>
                    Step {activeTab + 1}
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    {tabs[activeTab].title}
                  </h3>

                  <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                    {tabs[activeTab].description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    {activeTab === 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <GitBranch className="w-4 h-4" /> Works with GitHub Actions
                      </div>
                    )}
                    {activeTab === 1 && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Shield className="w-4 h-4" /> Context-Aware Analysis
                      </div>
                    )}
                    {activeTab === 2 && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Zap className="w-4 h-4" /> Instant Remediation
                      </div>
                    )}
                    {activeTab === 3 && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle2 className="w-4 h-4" /> Audit Ready
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Code Example */}
                <div className="relative bg-[#0d1117] p-6 sm:p-8 flex flex-col h-full min-h-[400px]">
                  {/* Window Controls */}
                  <div className="flex items-center gap-2 mb-6 opacity-50">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-4 text-xs font-mono text-gray-500 flex items-center gap-2">
                      <Terminal className="w-3 h-3" />
                      arcanext-cli
                    </div>
                  </div>

                  {/* Code Block */}
                  <div className="relative flex-1 font-mono text-sm overflow-hidden">
                    <div className="absolute inset-0 overflow-auto custom-scrollbar">
                      <pre className="text-gray-300 leading-relaxed">
                        <code>{tabs[activeTab].code}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Gradient Glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-accent/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
};

export default InteractiveDemo;
