import Link from "next/link";
import ShaderBackground from "./ui/animated-shader-background"; // Ensure this path is correct based on your file structure
import { ShieldCheck, Lock, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* LAYER 0: The Animation Background */}
      {/* We force this to the back with z-0 */}
      <ShaderBackground className="absolute inset-0 z-0" />

      {/* LAYER 1: The Content */}
      {/* We force this to the front with relative z-10 */}
      <section className="relative z-10 bg-[#0d1117] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-100">AI-Powered Security</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Your AI Security Engineer.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Arcanext scans every pull request for deep-code vulnerabilities and provides 
            <span className="text-white font-semibold"> one-click AI fixes</span>. 
            Secure your code in minutes.
          </p>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mb-12">
            <Link 
              href="/dashboard" 
              className="bg-brand-500 text-white px-6 py-3 rounded-md font-medium hover:bg-brand-600"
            >
              Start for Free
            </Link>
            <Link 
              href="#pricing" 
              className="border border-brand-500 text-brand-500 px-6 py-3 rounded-md font-medium hover:bg-gray-800"
            >
              View Pricing
            </Link>
          </div>

          {/* Code Editor Visual */}
          <div className="relative bg-gray-800 rounded-lg shadow-lg p-6 text-left text-sm font-mono leading-relaxed">
            <div className="absolute top-0 left-0 w-full h-8 bg-gray-700 rounded-t-lg flex items-center px-4 space-x-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <pre className="mt-8 text-gray-300">
              <code>
                {`
                # Vulnerability Found: SQL Injection
                - query = f"SELECT * FROM users WHERE id = {user_input}"
                # Arcanext AI Fix applied:
                + query = "SELECT * FROM users WHERE id = %s"
                + cursor.execute(query, (user_input,))
                `}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}