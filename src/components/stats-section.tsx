'use client';

import { useEffect, useRef, useState } from 'react';

const StatCard = ({ number, label }: { number: number; label: string }) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let currentNumber = 0;
          const increment = number / 50;
          const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= number) {
              setDisplayNumber(number);
              clearInterval(timer);
            } else {
              setDisplayNumber(Math.floor(currentNumber));
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [number]);

  return (
    <div
      ref={ref}
      className="group relative rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 p-6 text-center transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
    >
      <div className="space-y-2">
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          {displayNumber}+
        </div>
        <p className="text-muted-foreground font-medium">{label}</p>
      </div>
    </div>
  );
};

export default function StatsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              My Journey
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              Building amazing projects and growing as a developer
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard number={10} label="Projects Completed" />
            <StatCard number={50} label="Happy Code Lines" />
            <StatCard number={5} label="Years of Learning" />
            <StatCard number={100} label="Cups of Coffee" />
          </div>
        </div>
      </div>
    </section>
  );
}
