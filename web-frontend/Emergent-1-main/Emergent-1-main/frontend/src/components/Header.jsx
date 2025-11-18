import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    {
      name: 'Product',
      items: ['Features', 'Security', 'Enterprise', 'Pricing']
    },
    {
      name: 'Solutions',
      items: ['CI/CD', 'DevOps', 'Security', 'Collaboration']
    },
    {
      name: 'Resources',
      items: ['Documentation', 'Blog', 'Community', 'Support']
    },
    {
      name: 'Company',
      items: ['About', 'Careers', 'Partners', 'Contact']
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117] border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://images.unsplash.com/photo-1677144649497-238168e2339c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxndWFyZCUyMGRvZyUyMGxvZ298ZW58MHx8fHwxNzYzNDY0MjkxfDA&ixlib=rb-4.1.0&q=85" 
              alt="Arcanext Logo" 
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="text-xl font-bold text-white">Arcanext</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 flex items-center transition-colors">
                  {item.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-[#161b22] border border-gray-700 rounded-md shadow-xl py-2">
                    {item.items.map((subItem) => (
                      <a
                        key={subItem}
                        href={`#${subItem.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
              Sign in
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium px-4 py-2">
              Start free trial
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {navItems.map((item) => (
              <div key={item.name} className="mb-4">
                <div className="px-3 py-2 text-sm font-semibold text-white">{item.name}</div>
                {item.items.map((subItem) => (
                  <a
                    key={subItem}
                    href={`#${subItem.toLowerCase()}`}
                    className="block px-6 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    {subItem}
                  </a>
                ))}
              </div>
            ))}
            <div className="flex flex-col space-y-2 px-3 mt-4">
              <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800">
                Sign in
              </Button>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white">
                Start free trial
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;