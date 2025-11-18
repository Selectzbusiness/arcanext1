import React from 'react';
import { Terminal, Code2, GitBranch, Play } from 'lucide-react';

const VisualShowcase = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0d1117] via-[#0d1117] to-[#161b22] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* AI Copilot Section */}
        <div className="mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                <Code2 className="h-4 w-4 mr-2" />
                AI-Powered Development
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Code faster with
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI assistance
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Get intelligent code suggestions, auto-completions, and instant bug fixes as you type. Our AI understands your project context and coding style.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-3 px-4 py-3 bg-[#161b22] border border-gray-800 rounded-lg">
                  <Terminal className="h-5 w-5 text-purple-400" />
                  <div>
                    <div className="text-white font-semibold text-sm">10x Faster</div>
                    <div className="text-gray-400 text-xs">Code completion</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 px-4 py-3 bg-[#161b22] border border-gray-800 rounded-lg">
                  <Code2 className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white font-semibold text-sm">99.9%</div>
                    <div className="text-gray-400 text-xs">Accuracy rate</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="https://customer-assets.emergentagent.com/job_gh-frontend-clone/artifacts/rdhm3emh_Screenshot%202025-11-18%20164749.png"
                    alt="AI Code Assistant"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="https://customer-assets.emergentagent.com/job_gh-frontend-clone/artifacts/9pvr8w7m_Screenshot%202025-11-18%20164848.png"
                    alt="Security Features"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                <GitBranch className="h-4 w-4 mr-2" />
                Enterprise Security
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Built-in security
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  where found means fixed
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Use AI to find and fix vulnerabilities—freeing your teams to ship more secure software faster. Automated security scanning with every commit.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="p-2 bg-blue-500/10 rounded-lg mr-4 mt-1">
                    <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Dependency scanning</div>
                    <div className="text-gray-400 text-sm">Automatically detect vulnerable dependencies</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="p-2 bg-blue-500/10 rounded-lg mr-4 mt-1">
                    <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Secret detection</div>
                    <div className="text-gray-400 text-sm">Prevent secrets from being committed</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="p-2 bg-blue-500/10 rounded-lg mr-4 mt-1">
                    <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Code scanning</div>
                    <div className="text-gray-400 text-sm">Find and fix vulnerabilities in real-time</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Collaboration Section */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                <Play className="h-4 w-4 mr-2" />
                Team Collaboration
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Work together,
                <br />
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  achieve more
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Collaborate with your teams, use management tools that sync with your projects, and code from anywhere—all on a single, integrated platform.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-[#161b22] border border-gray-800 rounded-lg hover:border-green-500/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/10 rounded">
                        <GitBranch className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Pull Requests</div>
                        <div className="text-gray-400 text-sm">Review and merge with ease</div>
                      </div>
                    </div>
                    <div className="text-green-400 text-2xl font-bold">42</div>
                  </div>
                </div>
                <div className="p-4 bg-[#161b22] border border-gray-800 rounded-lg hover:border-green-500/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/10 rounded">
                        <Code2 className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Code Reviews</div>
                        <div className="text-gray-400 text-sm">Inline comments and suggestions</div>
                      </div>
                    </div>
                    <div className="text-green-400 text-2xl font-bold">128</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="https://customer-assets.emergentagent.com/job_gh-frontend-clone/artifacts/06assgi8_Screenshot%202025-11-18%20164900.png"
                    alt="Team Collaboration"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualShowcase;