'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ProjectsTab from './tabs/projects';
import SkillsTab from './tabs/skills';
import ExperienceTab from './tabs/experience';
import AchievementsTab from './tabs/achievements';
import AboutTab from './tabs/about';
import CursorGlow from '@/components/cursor-glow';
import FloatingParticles from '@/components/floating-particles';
import AdminAssistant from '@/components/admin-assistant';
import { LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast({ title: 'Logged out', description: 'See you later!' });
    router.push('/admin/login');
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <FloatingParticles />
      <CursorGlow />
      <div className="container py-8 md:py-10">
        <div className="mb-8 rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-purple-900/20">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-100 border border-cyan-400/30">
              AI Admin Console
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent">
              Portfolio Command Center
            </h1>
            <p className="text-white/70 text-sm">Animated dashboard with voice-enabled robot assistant.</p>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white border border-rose-300/20 shadow-lg shadow-rose-900/30 transition-all hover:scale-[1.02]"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          </div>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-white/[0.04] border border-white/15 rounded-2xl p-2 backdrop-blur-xl">
            <TabsTrigger value="projects" className="rounded-xl py-2.5 text-white/80 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-900/40 transition-all">Projects</TabsTrigger>
            <TabsTrigger value="skills" className="rounded-xl py-2.5 text-white/80 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-900/40 transition-all">Skills</TabsTrigger>
            <TabsTrigger value="experience" className="rounded-xl py-2.5 text-white/80 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-900/40 transition-all">Experience</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-xl py-2.5 text-white/80 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-900/40 transition-all">Achievements</TabsTrigger>
            <TabsTrigger value="about" className="rounded-xl py-2.5 text-white/80 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-900/40 transition-all">About</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <ProjectsTab />
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <SkillsTab />
          </TabsContent>

          <TabsContent value="experience" className="mt-6">
            <ExperienceTab />
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <AchievementsTab />
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <AboutTab />
          </TabsContent>
        </Tabs>
      </div>
      <AdminAssistant />
    </div>
  );
}
