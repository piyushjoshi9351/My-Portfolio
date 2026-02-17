'use client';

import { useState, useEffect } from 'react';
import { supabase, Experience } from '@/lib/supabase';
import { experienceData } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit2 } from 'lucide-react';

export default function ExperienceTab() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<Experience>({
    company: '',
    position: '',
    duration: '',
    description: '',
    skills_used: [],
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        const mapped: Experience[] = experienceData.map((e, idx) => ({
          id: -(idx + 1),
          company: e.company || '',
          position: e.role || '',
          duration: e.period || '',
          description: e.description || '',
          skills_used: [],
          order_index: idx,
        }));
        setExperiences(mapped);
        return;
      }

      setExperiences(data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch experiences' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.company || !formData.position) {
      toast({ title: 'Error', description: 'Company and position required' });
      return;
    }

    try {
      const skills = formData.skills_used?.length 
        ? formData.skills_used 
        : (formData.skills_used as unknown as string)?.split(',').map(s => s.trim()) || [];


      if (editing !== null) {
        if (editing > 0) {
          const { error } = await supabase
            .from('experience')
            .update({
              ...formData,
              skills_used: skills,
            })
            .eq('id', editing);

          if (error) throw error;
          toast({ title: 'Success', description: 'Experience updated!' });
        } else {
          const { data: all } = await supabase
            .from('experience')
            .select('order_index')
            .order('order_index', { ascending: false })
            .limit(1);

          const highest = all?.[0]?.order_index || 0;
          const { error } = await supabase.from('experience').insert({
            ...formData,
            skills_used: skills,
            order_index: highest + 1,
          });

          if (error) throw error;
          toast({ title: 'Success', description: 'Experience added to DB!' });
        }
      } else {
        const { error } = await supabase.from('experience').insert({
          ...formData,
          skills_used: skills,
          order_index: experiences.length,
        });

        if (error) throw error;
        toast({ title: 'Success', description: 'Experience added!' });
      }

      setFormData({
        company: '',
        position: '',
        duration: '',
        description: '',
        skills_used: [],
      });
      setEditing(null);
      fetchExperiences();
    } catch (error: any) {
      console.error('Save error:', error);
      const msg = error?.message || error?.toString() || 'Unknown error';
      toast({ title: 'Error', description: msg.substring(0, 80) });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this experience?')) return;
    try {
      if (id <= 0) {
        setExperiences((e) => e.filter((ex) => ex.id !== id));
        toast({ title: 'Removed', description: 'Static experience removed locally' });
        return;
      }

      const { error } = await supabase.from('experience').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Experience deleted!' });
      fetchExperiences();
    } catch (error: any) {
      console.error('Delete error:', error);
      const msg = error?.message || 'Failed to delete';
      toast({ title: 'Error', description: msg.substring(0, 80) });
    }
  };

  const handleEdit = (experience: Experience) => {
    setFormData(experience);
    setEditing(experience.id ?? null);
  };

  if (loading) return <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/80">Loading experiences...</div>;

  return (
    <div className="space-y-6 p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-2xl shadow-purple-900/20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-white">Manage Experience</h2>
        <span className="text-xs md:text-sm text-cyan-200 bg-cyan-500/10 border border-cyan-400/30 rounded-full px-3 py-1">{experiences.length} items</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Company</label>
          <Input
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Company name"
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Position</label>
          <Input
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            placeholder="Job title"
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Duration</label>
          <Input
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g., Jan 2022 - Dec 2023"
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Job description"
            rows={3}
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Skills (comma-separated)</label>
          <Input
            value={Array.isArray(formData.skills_used) ? formData.skills_used.join(', ') : formData.skills_used}
            onChange={(e) => setFormData({ ...formData, skills_used: e.target.value.split(',').map(s => s.trim()) })}
            placeholder="React, TypeScript, SQL"
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02]"
          >
            {editing !== null ? 'Update Experience' : 'Add Experience'}
          </Button>
          {editing !== null && (
            <Button
              onClick={() => {
                setEditing(null);
                setFormData({
                  company: '',
                  position: '',
                  duration: '',
                  description: '',
                  skills_used: [],
                });
              }}
              variant="outline"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="border-t border-white/15 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Experience List</h3>
        <div className="space-y-2">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all">
              <div>
                <h4 className="font-semibold text-white">{exp.position} at {exp.company}</h4>
                <p className="text-sm text-gray-300">{exp.duration}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(exp)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(exp.id!)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
