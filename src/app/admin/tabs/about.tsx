'use client';

import { useEffect, useState } from 'react';
import { supabase, AboutSection } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { aboutData } from '@/lib/portfolio-data';

export default function AboutTab() {
  const [about, setAbout] = useState<AboutSection>({ title: 'About', description: '' });
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const { data, error } = await supabase.from('about_section').select('*').limit(1).single();
      if (error) {
        // fallback to static
        setAbout({ title: 'About', description: aboutData.bio });
      } else {
        setAbout({ title: data.title || 'About', description: data.description || '' });
        setEditingId(data.id || null);
      }
    } catch (err) {
      setAbout({ title: 'About', description: aboutData.bio });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId && editingId > 0) {
        const { error } = await supabase.from('about_section').update(about).eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Success', description: 'About updated' });
      } else {
        const { error } = await supabase.from('about_section').insert(about);
        if (error) throw error;
        toast({ title: 'Success', description: 'About created' });
      }
      fetchAbout();
    } catch (err: any) {
      const msg = err?.message || 'Failed to save';
      toast({ title: 'Error', description: msg });
    }
  };

  if (loading) return <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/80">Loading about...</div>;

  return (
    <div className="space-y-6 p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-2xl shadow-purple-900/20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-white">Manage About Section</h2>
        <span className="text-xs md:text-sm text-cyan-200 bg-cyan-500/10 border border-cyan-400/30 rounded-full px-3 py-1">Profile Content</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">Title</label>
        <Input value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400" />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">Description</label>
        <textarea value={about.description} onChange={(e) => setAbout({ ...about, description: e.target.value })} rows={8} className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
      </div>

      <div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02]">Save About</Button>
      </div>
    </div>
  );
}
