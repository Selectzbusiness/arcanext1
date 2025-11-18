import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import LandingPage from '../components/landing-page';
import { initToolbar } from '@21st-extension/toolbar';

const stagewiseConfig = {
  plugins: [],
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Arcanext - AI Security Engineer</title>
      </Head>
      <Header />
      <Hero />
      <Features />
      <Footer />
    </>
  );
}
