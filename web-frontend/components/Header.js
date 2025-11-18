import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-brand-500 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6" />
          <span className="text-lg font-bold">Arcanext</span>
        </div>

        {/* Middle Section */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/product" className="hover:underline">
            Product
          </Link>
          <Link href="/solutions" className="hover:underline">
            Solutions
          </Link>
          <Link href="/pricing" className="hover:underline">
            Pricing
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="hover:underline">
            Sign in
          </Link>
          <Link href="/dashboard">
            <button className="bg-white text-brand-500 px-4 py-2 rounded-md font-medium hover:bg-gray-200">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;