'use client';

import { useRef, useEffect, useState } from 'react';
import { Code2, Zap, Brain, Rocket, Target, Star, Award, Trophy, Mic } from 'lucide-react';
import { supabase, Achievement } from '@/lib/supabase';
import { achievementsData } from '@/lib/portfolio-data';

const CERT_URL_TAG = '[certificate_url]:';
const CERT_IMG_TAG = '[certificate_image]:';

function parseAchievementDescription(description?: string) {
  const raw = description || '';
  const lines = raw.split('\n');
  let certificate_url = '';
  let certificate_image = '';
  const cleanLines: string[] = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.toLowerCase().startsWith(CERT_URL_TAG)) {
      certificate_url = trimmed.slice(CERT_URL_TAG.length).trim();
      return;
    }
    if (trimmed.toLowerCase().startsWith(CERT_IMG_TAG)) {
      certificate_image = trimmed.slice(CERT_IMG_TAG.length).trim();
      return;
    }
    cleanLines.push(line);
  });

  return {
    cleanDescription: cleanLines.join('\n').trim(),
    certificate_url,
    certificate_image,
  };
}

const iconMap: Record<string, React.ReactNode> = {
  'Code2': <Code2 className="h-8 w-8" />,
  'Zap': <Zap className="h-8 w-8" />,
  'Brain': <Brain className="h-8 w-8" />,
  'Rocket': <Rocket className="h-8 w-8" />,
  'Target': <Target className="h-8 w-8" />,
  'Star': <Star className="h-8 w-8" />,
  'Award': <Award className="h-8 w-8" />,
  'Trophy': <Trophy className="h-8 w-8" />,
  'Mic': <Mic className="h-8 w-8" />,
};

const colorMap = [
  'from-purple-500 to-blue-500',
  'from-cyan-500 to-blue-500',
  'from-yellow-500 to-orange-500',
  'from-pink-500 to-red-500',
  'from-green-500 to-emerald-500',
  'from-indigo-500 to-purple-500',
];

const BadgeCard = ({ achievement, index, color }: { achievement: Achievement; index: number; color: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const parsed = parseAchievementDescription(achievement.description);

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

  const icon = iconMap[achievement.icon || 'Award'] || <Award className="h-8 w-8" />;

  return (
    <div
      ref={ref}
      className={`group relative p-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-secondary/50 to-secondary/20 hover:border-purple-500/50 transition-all duration-500 cursor-pointer ${
        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'
      }`}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} p-2.5 text-white group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-foreground">{achievement.title}</h3>
        <p className="text-sm text-muted-foreground">{parsed.cleanDescription}</p>

        {parsed.certificate_image && (
          <img
            src={parsed.certificate_image}
            alt={`${achievement.title} certificate`}
            className="w-full h-32 object-cover rounded-md border border-purple-500/20"
          />
        )}

        {parsed.certificate_url && (
          <a
            href={parsed.certificate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-semibold text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
          >
            View Certificate
          </a>
        )}

        {achievement.date && <p className="text-xs text-gray-400">{achievement.date}</p>}
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-500/50 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300" />
    </div>
  );
};

export default function AchievementBadges() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data, error } = await supabase
          .from('achievements')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;

        if (!data || data.length === 0) {
          const fallback: Achievement[] = achievementsData.map((title, index) => ({
            id: -(index + 1),
            title,
            description: 'Certificate / Milestone',
            date: '',
            icon: 'Award',
            order_index: index,
          }));
          setAchievements(fallback);
        } else {
          setAchievements(data || []);
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
        const fallback: Achievement[] = achievementsData.map((title, index) => ({
          id: -(index + 1),
          title,
          description: 'Certificate / Milestone',
          date: '',
          icon: 'Award',
          order_index: index,
        }));
        setAchievements(fallback);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              My Achievements
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              Milestones and accomplishments throughout my journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <BadgeCard
                key={achievement.id ?? `${achievement.title}-${index}`}
                achievement={achievement}
                index={index}
                color={colorMap[index % colorMap.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
