"use client";

import Link from "next/link";
import { ShaderAnimation } from "../components/ui/shader-animation";
import { ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* 1. The Shader Animation Background */}
      {/* It's positioned absolutely to fill the whole screen behind everything */}
      <ShaderAnimation />

      {/* 2. The Navigation Bar */}
      {/* Positioned absolutely at the top, over the animation */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <nav className="container mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold">Arcanext</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            {/* These links point to the dashboard, which will
                trigger your Firebase auth flow if the user is not logged in. */}
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </div>
          
          {/* Mobile Menu (placeholder) */}
          <div className="md:hidden">
            {/* You can add a mobile menu button here */}
          </div>
        </nav>
      </header>

      {/* 3. The Hero Content */}
      {/* Positioned in the center, over the animation */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mb-4">
          Your AI Security Engineer
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Arcanext scans every pull request for deep-code vulnerabilities and provides one-click AI fixes. Secure your code in minutes.
        </p>
        
        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-6 py-3 rounded-lg transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            href="#pricing"
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold text-lg px-6 py-3 rounded-lg transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </main>
    </div>
  );
}