'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import SkillsSection from '@/components/skills-section';
import ProjectsSection from '@/components/projects-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import ExperienceSection from '@/components/experience-section';
import Preloader from '@/components/preloader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On component mount, disable scroll
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    const timer = setTimeout(() => {
      setLoading(false);
       if (typeof window !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    }, 3500); // This duration should be slightly longer than the preloader's animation

    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <div className={`flex min-h-screen flex-col transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
