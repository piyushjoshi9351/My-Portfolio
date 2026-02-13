'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Smooth scroll behavior is already in CSS with scroll-smooth
    // But we can add more refined scroll behavior
    const handleScroll = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
    };

    handleScroll();

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return null;
}
