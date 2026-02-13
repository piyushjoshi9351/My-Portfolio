'use client';

import { useRef, useEffect, useState } from 'react';
import { Code2, Zap, Brain, Rocket, Target, Star } from 'lucide-react';

interface Badge {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const badges: Badge[] = [
  {
    icon: <Code2 className="h-8 w-8" />,
    title: 'Full Stack Developer',
    description: 'Building complete web applications',
    color: 'from-purple-500 to-blue-500',
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: 'AI/ML Enthusiast',
    description: 'Exploring artificial intelligence',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Performance Driven',
    description: 'Creating fast & efficient solutions',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: 'Innovation Focus',
    description: 'Always learning new technologies',
    color: 'from-pink-500 to-red-500',
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: 'Problem Solver',
    description: 'Finding elegant solutions',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: 'Quality First',
    description: 'Delivering excellence always',
    color: 'from-indigo-500 to-purple-500',
  },
];

const BadgeCard = ({ badge, index }: { badge: Badge; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
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
    <div
      ref={ref}
      className={`group relative p-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-secondary/50 to-secondary/20 hover:border-purple-500/50 transition-all duration-500 cursor-pointer ${
        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'
      }`}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${badge.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${badge.color} p-2.5 text-white group-hover:scale-110 transition-transform duration-300`}>
          {badge.icon}
        </div>
        <h3 className="text-lg font-bold text-foreground">{badge.title}</h3>
        <p className="text-sm text-muted-foreground">{badge.description}</p>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-500/50 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300" />
    </div>
  );
};

export default function AchievementBadges() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              My Strengths
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              What I bring to every project
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <BadgeCard key={badge.title} badge={badge} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
