'use client';

import { experienceData } from '@/lib/portfolio-data';
import { useRef, useEffect, useState } from 'react';

const TimelineItem = ({ item, index }: { item: typeof experienceData[0]; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [index]);

  return (
    <div ref={ref} className="relative">
      {/* Timeline node */}
      <div className={`absolute left-0 top-0 w-6 h-6 rounded-full border-4 border-background bg-gradient-to-r from-purple-500 to-cyan-500 transform -translate-x-5 transition-all duration-500 ${isVisible ? 'scale-100 shadow-lg shadow-purple-500/50' : 'scale-0'}`} />

      {/* Content */}
      <div className={`ml-8 pb-12 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
        <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
          <h3 className="text-xl font-bold text-foreground">{item.role}</h3>
          <p className="text-sm text-purple-300 font-medium mt-1">{item.company}</p>
          <p className="text-xs text-muted-foreground mt-2">{item.period}</p>
          <p className="text-foreground mt-3">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function InteractiveTimeline() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              My Journey
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              Timeline of my education and experience
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 transform -translate-x-[11px]" />

            {/* Timeline items */}
            <div>
              {experienceData.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
