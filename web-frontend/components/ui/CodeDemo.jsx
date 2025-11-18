import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const CodeDemo = () => {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `// AI-powered code completion in action
function analyzeRepository(repo) {
  // Arcanext AI suggests the complete function
  const metrics = {
    codeQuality: calculateQuality(repo.files),
    security: scanVulnerabilities(repo),
    performance: analyzePerformance(repo),
    coverage: getTestCoverage(repo)
  };
  
  return generateReport(metrics);
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Experience the
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent"> developer difference</span>
          </h2>
          <p className="text-xl text-gray-400">
            See how Arcanext transforms your development workflow
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Terminal Header */}
          <div className="bg-[#161b22] border border-gray-800 rounded-t-xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-sm font-mono">src/analysis.js</div>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 text-sm transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Code Block */}
          <div className="bg-[#0d1117] border border-gray-800 border-t-0 rounded-b-xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono">
              <code className="text-gray-300">
                <span className="text-gray-500">// AI-powered code completion in action</span>
                {"\n"}
                <span className="text-purple-400">function</span>{" "}
                <span className="text-blue-400">analyzeRepository</span>
                <span className="text-gray-300">(</span>
                <span className="text-orange-400">repo</span>
                <span className="text-gray-300">)</span>{" "}
                <span className="text-gray-300">{'{'}</span>
                {"\n  "}
                <span className="text-gray-500">// Arcanext AI suggests the complete function</span>
                {"\n  "}
                <span className="text-purple-400">const</span>{" "}
                <span className="text-blue-400">metrics</span>{" "}
                <span className="text-gray-300">=</span>{" "}
                <span className="text-gray-300">{'{'}</span>
                {"\n    "}
                <span className="text-cyan-400">codeQuality</span>
                <span className="text-gray-300">:</span>{" "}
                <span className="text-blue-400">calculateQuality</span>
                <span className="text-gray-300">(</span>
                <span className="text-orange-400">repo</span>
                <span className="text-gray-300">.</span>
                <span className="text-cyan-400">files</span>
                <span className="text-gray-300">),</span>
                {"\n    "}
                <span className="text-cyan-400">security</span>
                <span className="text-gray-300">:</span>{" "}
                <span className="text-blue-400">scanVulnerabilities</span>
                <span className="text-gray-300">(</span>
                <span className="text-orange-400">repo</span>
                <span className="text-gray-300">),</span>
                {"\n    "}
                <span className="text-cyan-400">performance</span>
                <span className="text-gray-300">:</span>{" "}
                <span className="text-blue-400">analyzePerformance</span>
                <span className="text-gray-300">(</span>
                <span className="text-orange-400">repo</span>
                <span className="text-gray-300">),</span>
                {"\n    "}
                <span className="text-cyan-400">coverage</span>
                <span className="text-gray-300">:</span>{" "}
                <span className="text-blue-400">getTestCoverage</span>
                <span className="text-gray-300">(</span>
                <span className="text-orange-400">repo</span>
                <span className="text-gray-300">)</span>
                {"\n  "}
                <span className="text-gray-300">{'};'}</span>
                {"\n  \n  "}
                <span className="text-purple-400">return</span>{" "}
                <span className="text-blue-400">generateReport</span>
                <span className="text-gray-300">(</span>
                <span className="text-orange-400">metrics</span>
                <span className="text-gray-300">);</span>
                {"\n"}
                <span className="text-gray-300">{'}'}</span>
              </code>
            </pre>
          </div>

          {/* Floating AI Suggestion */}
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm max-w-xs">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-purple-500/20 rounded">
                  <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <div className="text-purple-300 font-semibold text-sm mb-1">AI Suggestion</div>
                  <div className="text-gray-400 text-xs">
                    Automatically generated based on your repository structure and best practices.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <div className="px-6 py-3 bg-[#161b22] border border-gray-800 rounded-full text-gray-300 text-sm">
            Smart completions
          </div>
          <div className="px-6 py-3 bg-[#161b22] border border-gray-800 rounded-full text-gray-300 text-sm">
            Context-aware suggestions
          </div>
          <div className="px-6 py-3 bg-[#161b22] border border-gray-800 rounded-full text-gray-300 text-sm">
            Instant documentation
          </div>
          <div className="px-6 py-3 bg-[#161b22] border border-gray-800 rounded-full text-gray-300 text-sm">
            Security scanning
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeDemo;