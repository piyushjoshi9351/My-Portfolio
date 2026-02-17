`use client`;

import { useState, useEffect } from 'react';
import { supabase, Skill } from '@/lib/supabase';
import { skillsData } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit2 } from 'lucide-react';

export default function SkillsTab() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<Skill>({
    name: '',
    proficiency: 70,
    category: 'Technical',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      // If DB is empty, fallback to static resume skills
      if (!data || data.length === 0) {
        const flat: Skill[] = [];
        let idx = 1;
        skillsData.forEach((group) => {
          group.skills.forEach((s) => {
            flat.push({
              id: -idx, // temporary negative id for static items
              name: s.name,
              proficiency: s.level,
              category: group.category,
              order_index: idx - 1,
            });
            idx++;
          });
        });
        setSkills(flat);
        return;
      }

      setSkills(data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch skills' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name) {
      toast({ title: 'Error', description: 'Skill name required' });
      return;
    }

    try {
      const skillData = {
        name: formData.name.trim(),
        proficiency: parseInt(String(formData.proficiency)) || 70,
        category: (formData.category || 'Technical').trim(),
      };

      if (editing !== null) {
        // editing a DB item
        if (editing > 0) {
          const { error } = await supabase
            .from('skills')
            .update(skillData)
            .eq('id', editing);

          if (error) throw error;
          toast({ title: 'Success', description: 'Skill updated!' });
        } else {
          // editing a static resume item -> insert into DB
          const { data: allSkills } = await supabase
            .from('skills')
            .select('order_index')
            .order('order_index', { ascending: false })
            .limit(1);

          const highestIndex = allSkills?.[0]?.order_index || 0;

          const { error } = await supabase.from('skills').insert({
            ...skillData,
            order_index: highestIndex + 1,
          });

          if (error) throw error;
          toast({ title: 'Success', description: 'Skill added to DB!' });
        }
      } else {
        const { data: allSkills } = await supabase
          .from('skills')
          .select('order_index')
          .order('order_index', { ascending: false })
          .limit(1);

        const highestIndex = allSkills?.[0]?.order_index || 0;

        const { error } = await supabase.from('skills').insert({
          ...skillData,
          order_index: highestIndex + 1,
        });

        if (error) throw error;
        toast({ title: 'Success', description: 'Skill added!' });
      }

      setFormData({ name: '', proficiency: 70, category: 'Technical' });
      setEditing(null);
      fetchSkills();
    } catch (error: any) {
      console.error('Save error:', error);
      const errorMessage = error?.message || error?.toString() || 'Unknown error';
      toast({ title: 'Error', description: errorMessage.substring(0, 80) });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this skill?')) return;

    try {
      if (id <= 0) {
        // static item - just remove from local state
        setSkills((s) => s.filter((sk) => sk.id !== id));
        toast({ title: 'Removed', description: 'Static skill removed locally' });
        return;
      }

      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Skill deleted!' });
      fetchSkills();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete skill' });
    }
  };

  const handleEdit = (skill: Skill) => {
    setFormData(skill);
    setEditing(skill.id ?? null);
  };

  if (loading) return <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/80">Loading skills...</div>;

  return (
    <div className="space-y-6 p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-2xl shadow-purple-900/20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-white">Manage Skills</h2>
        <span className="text-xs md:text-sm text-cyan-200 bg-cyan-500/10 border border-cyan-400/30 rounded-full px-3 py-1">{skills.length} items</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Skill Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., React, Python"
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Proficiency (1-100)</label>
          <Input
            type="number"
            min="1"
            max="100"
            value={formData.proficiency || 70}
            onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) || 70 })}
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Category</label>
          <Input
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g., Technical, Soft Skills"
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02]"
          >
            {editing ? 'Update Skill' : 'Add Skill'}
          </Button>
          {editing && (
            <Button
              onClick={() => {
                setEditing(null);
                setFormData({ name: '', proficiency: 70, category: 'Technical' });
              }}
              variant="outline"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="border-t border-white/15 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Skills List</h3>
        <div className="space-y-2">
          {skills.map((skill) => (
            <div key={skill.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all">
              <div>
                <h4 className="font-semibold text-white">{skill.name}</h4>
                <p className="text-sm text-gray-300">{skill.category} - {skill.proficiency}%</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(skill)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(skill.id!)}
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
