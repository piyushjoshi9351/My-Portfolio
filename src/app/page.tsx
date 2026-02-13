'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import SkillsSection from '@/components/skills-section';
import EnhancedSkillsSection from '@/components/enhanced-skills-section';
import ProjectsSection from '@/components/projects-section';
import ContactSection from '@/components/contact-section';
import CTASection from '@/components/cta-section';
import Footer from '@/components/footer';
import ExperienceSection from '@/components/experience-section';
import Preloader from '@/components/preloader';
import ScrollProgress from '@/components/scroll-progress';
import FloatingParticles from '@/components/floating-particles';
import StatsSection from '@/components/stats-section';
import CursorGlow from '@/components/cursor-glow';
import InteractiveTimeline from '@/components/interactive-timeline';
import AchievementBadges from '@/components/achievement-badges';
import TestimonialsSection from '@/components/testimonials-section';
import SmoothScroll from '@/components/smooth-scroll';

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
      <SmoothScroll />
      <ScrollProgress />
      <FloatingParticles />
      <CursorGlow />
      {loading && <Preloader />}
      <div className={`flex min-h-screen flex-col transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <main className="flex-1">
          <HeroSection />
          <StatsSection />
          <AboutSection />
          <AchievementBadges />
          <InteractiveTimeline />
          <EnhancedSkillsSection />
          <ProjectsSection />
          <TestimonialsSection />
          <CTASection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
