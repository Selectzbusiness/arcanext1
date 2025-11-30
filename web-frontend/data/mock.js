// Mock data for Arcanext Security Platform

export const securityFeatures = [
  {
    id: 1,
    title: "Instant Analysis",
    description: "Scan code in 30+ programming languages with millisecond response times. Detect vulnerabilities before they reach production.",
    icon: "Zap",
    languages: "30+"
  },
  {
    id: 2,
    title: "Deep Logic (CPG)",
    description: "Graph-based Code Property Graph analysis detects complex security flaws that traditional SAST tools miss.",
    icon: "Network",
    badge: "Advanced"
  },
  {
    id: 3,
    title: "AI Auto-Fix",
    description: "One-click automated patches for detected vulnerabilities. AI-powered fixes that understand your code context.",
    icon: "Sparkles",
    badge: "AI-Powered"
  },
  {
    id: 4,
    title: "Live Attack Simulation",
    description: "Real-time DAST scanning with simulated attack scenarios to validate your security posture.",
    icon: "Shield",
    badge: "Enterprise"
  },
  {
    id: 5,
    title: "GitHub Integration",
    description: "Seamless PR checks with automated security comments and inline fix suggestions directly in your workflow.",
    icon: "GitPullRequest"
  },
  {
    id: 6,
    title: "Zero False Positives",
    description: "AI-powered triage reduces noise by 95%. Only see vulnerabilities that actually matter to your codebase.",
    icon: "Target"
  }
];

export const stats = [
  { label: "Vulnerabilities Fixed", value: "10M+" },
  { label: "Developers Protected", value: "500K+" },
  { label: "Languages Supported", value: "30+" },
  { label: "False Positive Reduction", value: "95%" }
];

export const features = [
  {
    id: 1,
    title: "AI-Powered Security",
    description: "Advanced AI detects vulnerabilities and provides one-click fixes for your code.",
    icon: "Shield"
  },
  {
    id: 2,
    title: "Real-time Scanning",
    description: "Scan every pull request automatically before it reaches production.",
    icon: "Zap"
  },
  {
    id: 3,
    title: "Team Collaboration",
    description: "Work together seamlessly with built-in code review and security workflows.",
    icon: "Users"
  },
  {
    id: 4,
    title: "Enterprise Security",
    description: "SOC2, GDPR, and HIPAA compliant with enterprise-grade encryption.",
    icon: "Lock"
  },
  {
    id: 5,
    title: "Analytics Dashboard",
    description: "Track vulnerabilities, fixes, and security metrics in real-time.",
    icon: "BarChart3"
  },
  {
    id: 6,
    title: "Cloud Native",
    description: "Deploy anywhere with support for all major cloud providers.",
    icon: "Cloud"
  }
];

export const pricingPlans = [
  {
    id: 1,
    name: "Developer",
    price: "Free",
    period: "forever",
    description: "Perfect for individual developers",
    features: [
      "Basic SAST scanning",
      "Public repositories",
      "30+ languages",
      "GitHub integration",
      "Community support"
    ],
    popular: false
  },
  {
    id: 2,
    name: "Pro",
    price: "$49",
    period: "month",
    description: "For professional teams",
    features: [
      "Everything in Developer",
      "Private repositories",
      "Unlimited AI fixes",
      "Advanced rules",
      "Priority support",
      "Compliance reports"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    period: null,
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "On-premise deployment",
      "CPG Engine",
      "SSO & SAML",
      "Audit logs",
      "Dedicated engineer",
      "SLA guarantee"
    ],
    popular: false
  }
];

export const testimonials = [
  {
    id: 1,
    company: "SecureBank",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop",
    quote: "Arcanext reduced our vulnerability backlog by 80% in the first month. The AI auto-fix feature is a game changer.",
    author: "Sarah Chen",
    role: "CISO",
    category: "Enterprise"
  },
  {
    id: 2,
    company: "TechStartup",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
    quote: "We ship faster knowing Arcanext catches security issues before they reach production. Zero false positives!",
    author: "Marcus Rodriguez",
    role: "VP Engineering",
    category: "Startup"
  },
  {
    id: 3,
    company: "FinTech Corp",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop",
    quote: "The compliance dashboard made our SOC2 audit painless. Arcanext is now essential to our security workflow.",
    author: "Emily Watson",
    role: "Head of Security",
    category: "Enterprise"
  }
];

export const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Enterprise", href: "#enterprise" },
    { name: "Integrations", href: "#integrations" }
  ],
  platform: [
    { name: "Developer API", href: "#api" },
    { name: "Documentation", href: "#docs" },
    { name: "Status", href: "#status" },
    { name: "Changelog", href: "#changelog" }
  ],
  support: [
    { name: "Help Center", href: "#help" },
    { name: "Community", href: "#community" },
    { name: "Contact Us", href: "#contact" },
    { name: "Security", href: "#security" }
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
    { name: "Press", href: "#press" }
  ]
};
