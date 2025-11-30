# Arcanext Frontend

Production-ready, scalable Next.js frontend for Arcanext - AI-powered security scanning platform.

## 🚀 Features

- ✨ Modern, responsive design inspired by wope.com
- ⚡ Optimized for millions of concurrent users
- 🎨 Smooth 60fps animations with Framer Motion
- 📱 Mobile-first responsive design
- ♿ WCAG AA accessibility compliant
- 🔍 SEO optimized with meta tags and structured data
- 🚀 Performance optimized (code splitting, lazy loading)
- 🎯 Production-ready with Next.js 16

## 📋 Tech Stack

- **Framework**: Next.js 16.0.3
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Authentication**: Firebase
- **Testing**: Vitest + Fast-check (property-based testing)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your values
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```
web-frontend/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components (Header, Footer)
│   ├── sections/        # Page sections (Hero, Features, etc.)
│   └── animations/      # Animation components
├── lib/
│   ├── api.js          # API client for backend
│   ├── utils.js        # Utility functions
│   ├── constants.js    # Design tokens and constants
│   └── animations.js   # Animation configurations
├── pages/
│   ├── index.js        # Landing page
│   ├── dashboard.js    # Dashboard page
│   └── _app.js         # App wrapper
├── styles/
│   └── globals.css     # Global styles
└── public/             # Static assets
```

## 🌐 Environment Variables

Create a `.env.local` file with:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# API
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build image
docker build -t arcanext-frontend .

# Run container
docker run -p 3000:3000 arcanext-frontend
```

### Static Export

```bash
# Build static site
npm run build

# Deploy the 'out' directory to any static host
```

## 📊 Performance

- **Lighthouse Score**: 90+
- **Bundle Size**: <200KB (gzipped)
- **LCP**: <2.5s
- **FID**: <100ms
- **CLS**: <0.1

## ♿ Accessibility

- WCAG AA compliant
- Keyboard navigation support
- Screen reader optimized
- Reduced motion support
- High contrast mode

## 🔒 Security

- Content Security Policy headers
- XSS protection
- CSRF protection
- Secure headers configured
- Environment variables for sensitive data

## 📝 License

Proprietary - Arcanext Inc.

## 🤝 Contributing

This is a private repository. Contact the team for contribution guidelines.

## 📧 Support

For support, email support@arcanext.com or open an issue.
