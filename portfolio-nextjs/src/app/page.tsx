import { Suspense } from 'react';
import { Metadata } from 'next';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

export const revalidate = 60; // ISR revalidation every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  // In a real implementation, you would fetch personal info from Sanity here
  return {
    title: 'Aftab Pathan - Full Stack Developer Portfolio',
    description: 'Experienced Full Stack Developer specializing in React, Node.js, and modern web technologies. View my projects, skills, and professional experience.',
    openGraph: {
      title: 'Aftab Pathan - Full Stack Developer Portfolio',
      description: 'Experienced Full Stack Developer specializing in React, Node.js, and modern web technologies.',
      type: 'website',
    },
  };
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>
      
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
          <About />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
          <Experience />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
          <Skills />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
          <Certifications />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
          <Contact />
        </Suspense>
      </main>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  );
}