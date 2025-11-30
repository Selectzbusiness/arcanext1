// Design Tokens and Constants for Arcanext

export const COLORS = {
  background: {
    primary: '#0d1117',
    secondary: '#161b22',
    tertiary: '#21262d',
  },
  text: {
    primary: '#ffffff',
    secondary: '#8b949e',
    tertiary: '#6e7681',
  },
  brand: {
    purple: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
    secondary: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)',
    hero: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
    purpleBlue: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
    pinkPurple: 'linear-gradient(to right, #ec4899, #8b5cf6)',
    greenEmerald: 'linear-gradient(to right, #10b981, #059669)',
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

export const SPACING = {
  section: {
    mobile: '4rem',
    tablet: '6rem',
    desktop: '8rem',
  },
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const TYPOGRAPHY = {
  fontFamily: {
    sans: 'var(--font-inter), system-ui, -apple-system, sans-serif',
    mono: 'ui-monospace, monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const ANIMATION_DURATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
};

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Feature data for landing page
export const FEATURES = [
  {
    id: 'ai-analysis',
    icon: 'Brain',
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning models detect vulnerabilities that traditional tools miss, with context-aware analysis.',
    metric: '99.9% accuracy',
    gradient: 'from-purple-500 to-pink-500',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'fast-scanning',
    icon: 'Zap',
    title: 'Lightning Fast Scanning',
    description: 'Scan entire codebases in seconds with our optimized parallel processing engine.',
    metric: '<30s average',
    gradient: 'from-yellow-500 to-orange-500',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'ai-fixes',
    icon: 'Sparkles',
    title: 'One-Click AI Fixes',
    description: 'AI generates secure code fixes with detailed explanations and implementation guidance.',
    metric: '95% auto-fix rate',
    gradient: 'from-green-500 to-emerald-500',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'github-integration',
    icon: 'GitBranch',
    title: 'GitHub Integration',
    description: 'Seamless PR checks with inline comments, automated fixes, and workflow integration.',
    metric: 'Native integration',
    gradient: 'from-blue-500 to-cyan-500',
    className: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 'multi-language',
    icon: 'Code2',
    title: '30+ Languages',
    description: 'Comprehensive support for JavaScript, Python, Java, Go, Ruby, PHP, C++, and more.',
    metric: '30+ languages',
    gradient: 'from-indigo-500 to-purple-500',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 'zero-false-positives',
    icon: 'Target',
    title: 'Zero False Positives',
    description: 'AI-powered triage reduces noise by 95% - only see vulnerabilities that actually matter.',
    metric: '95% noise reduction',
    gradient: 'from-red-500 to-pink-500',
    className: 'md:col-span-1 md:row-span-1',
  },
];

export const STATS = [
  { value: 10000000, label: 'Vulnerabilities Fixed', suffix: '+', prefix: '' },
  { value: 500000, label: 'Developers Protected', suffix: '+', prefix: '' },
  { value: 30, label: 'Languages Supported', suffix: '+', prefix: '' },
  { value: 95, label: 'False Positive Reduction', suffix: '%', prefix: '' },
];

export const TRUST_INDICATORS = [
  { icon: 'Check', text: 'Free for public repos' },
  { icon: 'Zap', text: '30+ languages supported' },
  { icon: 'Lock', text: 'SOC2 & GDPR compliant' },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Staff Security Engineer',
    company: 'TechFlow',
    image: 'https://i.pravatar.cc/150?u=1',
    content: "Arcanext has completely transformed our AppSec workflow. The AI fixes are incredibly accurate and save our developers hours every week.",
  },
  {
    id: 2,
    name: 'Michael Ross',
    role: 'CTO',
    company: 'BuildScale',
    image: 'https://i.pravatar.cc/150?u=2',
    content: "The false positive reduction is real. My team actually trusts the alerts now. It's like having a senior security engineer on every PR.",
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'VP of Engineering',
    company: 'DataSphere',
    image: 'https://i.pravatar.cc/150?u=3',
    content: "Setup took less than 5 minutes. The immediate value we got from the first scan was mind-blowing. Best security investment we've made.",
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Lead DevOps',
    company: 'CloudNine',
    image: 'https://i.pravatar.cc/150?u=4',
    content: "Finally, a security tool that developers love. The inline comments and auto-fixes make security part of the dev process, not a blocker.",
  },
];
