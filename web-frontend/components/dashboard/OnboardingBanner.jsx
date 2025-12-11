import { Github, ArrowRight, Shield } from 'lucide-react';
import Button from '../ui/Button';

export default function OnboardingBanner({ onInstallClick, loading }) {
  return (
    <div className="bg-gradient-to-r from-brand-accent/20 to-blue-600/20 border border-brand-accent/30 rounded-2xl p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-accent rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-background-secondary border border-white/10 p-4 rounded-2xl">
              <Shield className="w-12 h-12 text-brand-text" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome to Arcanext! 🎉
          </h2>
          <p className="text-gray-400 mb-4 max-w-xl">
            To start scanning your repositories for security vulnerabilities, 
            you need to install the Arcanext GitHub App. This gives us permission 
            to analyze your pull requests and provide AI-powered security fixes.
          </p>
          <Button
            onClick={onInstallClick}
            disabled={loading}
            className="bg-[#24292e] hover:bg-[#2f363d] text-white"
            size="lg"
          >
            <Github className="w-5 h-5 mr-2" />
            Install GitHub App
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
