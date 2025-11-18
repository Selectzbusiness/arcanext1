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

export const complianceBadges = [
  { name: "SOC 2 Type II", icon: "ShieldCheck" },
  { name: "GDPR Compliant", icon: "Shield" },
  { name: "ISO 27001", icon: "Award" },
  { name: "HIPAA Ready", icon: "Lock" }
];

export const trustedCompanies = [
  { name: "Stripe", logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&h=60&fit=crop" },
  { name: "Shopify", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&h=60&fit=crop" },
  { name: "Airbnb", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&h=60&fit=crop" },
  { name: "GitLab", logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&h=60&fit=crop" },
  { name: "Atlassian", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&h=60&fit=crop" },
  { name: "Twilio", logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&h=60&fit=crop" }
];

export const securityPricingPlans = [
  {
    id: 1,
    name: "Developer",
    price: "Free",
    period: "forever",
    description: "Perfect for individual developers and open source projects",
    features: [
      "Basic SAST scanning",
      "AI Triage for public repos",
      "Support for 30+ languages",
      "GitHub integration",
      "Community support",
      "Up to 100 scans/month"
    ],
    popular: false,
    cta: "Install Arcanext"
  },
  {
    id: 2,
    name: "Pro",
    price: "$49",
    period: "per user/month",
    description: "For professional teams building secure applications",
    features: [
      "Everything in Developer",
      "Private repository scanning",
      "Unlimited AI Auto-Fixes",
      "Advanced custom rules",
      "Priority support",
      "DAST basic scanning",
      "Compliance reports (SOC2, GDPR)",
      "Unlimited scans"
    ],
    popular: true,
    cta: "Start Free Trial"
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "Advanced security for large organizations",
    features: [
      "Everything in Pro",
      "Custom on-premise deployment",
      "CPG \"Gecko\" Engine",
      "Full DAST scanning",
      "SSO & SAML integration",
      "Audit logs & compliance",
      "Global architecture scanning",
      "Dedicated security engineer",
      "SLA guarantee"
    ],
    popular: false,
    cta: "Contact Sales"
  }
];

export const enterpriseFeatures = [
  {
    id: 1,
    title: "Global Architecture Scanning",
    description: "Map your entire infrastructure and identify security risks across microservices, containers, and cloud deployments.",
    icon: "Globe"
  },
  {
    id: 2,
    title: "CPG Gecko Engine",
    description: "Our advanced Code Property Graph engine analyzes complex dataflows and identifies vulnerabilities traditional tools miss.",
    icon: "Cpu"
  },
  {
    id: 3,
    title: "Compliance Dashboard",
    description: "Real-time compliance monitoring for SOC2, GDPR, HIPAA, and ISO 27001 with automated audit trail generation.",
    icon: "FileCheck"
  },
  {
    id: 4,
    title: "Custom Security Policies",
    description: "Define organization-wide security rules and enforce them across all teams and repositories automatically.",
    icon: "FileCode"
  }
];

export const stats = [
  { label: "Vulnerabilities Fixed", value: "10M+" },
  { label: "Developers Protected", value: "500K+" },
  { label: "Languages Supported", value: "30+" },
  { label: "False Positive Reduction", value: "95%" }
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
  },
  {
    id: 4,
    company: "DevTools Inc",
    logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=100&h=100&fit=crop",
    quote: "GitHub integration is seamless. Our developers actually love the security bot - it teaches them as they code.",
    author: "Alex Turner",
    role: "Engineering Lead",
    category: "Startup"
  },
  {
    id: 5,
    company: "Enterprise Solutions",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
    quote: "The CPG Gecko engine found critical vulnerabilities in our legacy code that other tools missed for years.",
    author: "James Park",
    role: "Principal Security Engineer",
    category: "Enterprise"
  },
  {
    id: 6,
    company: "CloudNative Co",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop",
    quote: "From installation to first vulnerability fix: 5 minutes. Arcanext pays for itself on day one.",
    author: "Lisa Anderson",
    role: "DevSecOps Manager",
    category: "Startup"
  }
];

export const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Enterprise", href: "#enterprise" },
    { name: "Integrations", href: "#integrations" },
    { name: "Documentation", href: "#docs" }
  ],
  security: [
    { name: "Security Overview", href: "#security" },
    { name: "Compliance", href: "#compliance" },
    { name: "Trust Center", href: "#trust" },
    { name: "Bug Bounty", href: "#bounty" },
    { name: "Security Advisories", href: "#advisories" }
  ],
  resources: [
    { name: "Documentation", href: "#docs" },
    { name: "API Reference", href: "#api" },
    { name: "Community", href: "#community" },
    { name: "Blog", href: "#blog" },
    { name: "Status", href: "#status" }
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" },
    { name: "Partners", href: "#partners" },
    { name: "Press Kit", href: "#press" }
  ]
};