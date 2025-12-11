import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import Loading from '../components/ui/Loading';

import UnifiedBackground from '../components/layout/UnifiedBackground';

// Lazy load below-the-fold sections for better performance
const Stats = dynamic(() => import('../components/sections/Stats'));
const Features = dynamic(() => import('../components/sections/Features'));
const InteractiveDemo = dynamic(() => import('../components/sections/InteractiveDemo'));
const Testimonials = dynamic(() => import('../components/sections/Testimonials'));
const Pricing = dynamic(() => import('../components/sections/Pricing'));
const CTA = dynamic(() => import('../components/sections/CTA'));

export default function Home() {
  // Redirect authenticated users to dashboard
  const { isRedirecting } = useAuthRedirect({
    redirectAuthenticated: '/dashboard',
  });

  // Only show loading if actively redirecting (user is authenticated)
  if (isRedirecting) {
    return <Loading fullScreen />;
  }

  return (
    <>
      <Head>
        <title>Arcanext - AI-Powered Security Scanning for GitHub</title>
        <meta name="description" content="Stop vulnerabilities before they merge. Arcanext scans every pull request with AI and provides one-click fixes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen text-white font-sans selection:bg-brand-accent/30 selection:text-white relative">
        <UnifiedBackground />



        <Header />

        <main id="main-content" className="relative z-10">
          <Hero />
          <Stats />
          <Features />
          <InteractiveDemo />
          <Testimonials />
          <Pricing />
          <CTA />
        </main>

        <Footer />
      </div>
    </>
  );
}
