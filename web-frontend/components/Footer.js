import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0d1117] text-gray-400 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="mb-6 md:mb-0">
          <span className="text-lg font-bold text-white">Arcanext</span>
          <p className="text-sm">&copy; {new Date().getFullYear()} Arcanext. All rights reserved.</p>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-white font-medium mb-2">Product</h4>
            <ul>
              <li><a href="/features" className="hover:text-white">Features</a></li>
              <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="/demo" className="hover:text-white">Demo</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Resources</h4>
            <ul>
              <li><a href="/docs" className="hover:text-white">Documentation</a></li>
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><a href="/support" className="hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Company</h4>
            <ul>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/careers" className="hover:text-white">Careers</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;