import React from 'react';

const Features = () => {
  return (
    <section className="py-20 bg-[#0d1117] text-white">
      <div className="container mx-auto px-6">
        {/* Deep Code Analysis */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Deep Code Analysis</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-2">SAST Scanning</h3>
              <p className="text-gray-300">Instant static analysis for 30+ languages.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-2">CPG Engine</h3>
              <p className="text-gray-300">Graph-based analysis to find deep logic flaws.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-2">Secret Detection</h3>
              <p className="text-gray-300">Prevent API keys and tokens from leaking.</p>
            </div>
          </div>
        </div>

        {/* Automated Remediation */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Automated Remediation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-2">AI Auto-Fix</h3>
              <p className="text-gray-300">Don't just find bugs. Fix them with one click.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-2">False Positive Reduction</h3>
              <p className="text-gray-300">AI agents filter out noise so you focus on real risks.</p>
            </div>
          </div>
        </div>

        {/* Deployment Security */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Deployment Security</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-2">DAST Scanning</h3>
              <p className="text-gray-300">Live attacks on your staging environment to verify security.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-2">CI/CD Integration</h3>
              <p className="text-gray-300">Blocks vulnerable builds before they merge.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;