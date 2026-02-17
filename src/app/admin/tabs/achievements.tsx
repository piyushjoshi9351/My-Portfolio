'use client';

import { useState, useEffect } from 'react';
import { supabase, Achievement } from '@/lib/supabase';
import { achievementsData } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit2 } from 'lucide-react';

type AchievementForm = Achievement & {
  certificate_url?: string;
  certificate_image?: string;
};

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

function buildAchievementDescription(
  description: string,
  certificate_url?: string,
  certificate_image?: string
) {
  const lines = [description?.trim() || ''];
  if (certificate_url?.trim()) lines.push(`${CERT_URL_TAG} ${certificate_url.trim()}`);
  if (certificate_image?.trim()) lines.push(`${CERT_IMG_TAG} ${certificate_image.trim()}`);
  return lines.filter(Boolean).join('\n');
}

export default function AchievementsTab() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<AchievementForm>({
    title: '',
    description: '',
    date: '',
    icon: 'Award',
    certificate_url: '',
    certificate_image: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        const mapped: Achievement[] = achievementsData.map((t, idx) => ({
          id: -(idx + 1),
          title: t,
          description: '',
          date: '',
          icon: 'Award',
          order_index: idx,
        }));
        setAchievements(mapped);
        return;
      }

      setAchievements(data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch achievements' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title) {
      toast({ title: 'Error', description: 'Title required' });
      return;
    }

    try {
      const payload: Achievement = {
        title: formData.title,
        description: buildAchievementDescription(
          formData.description || '',
          formData.certificate_url,
          formData.certificate_image
        ),
        date: formData.date,
        icon: formData.icon,
      };

      if (editing !== null) {
        if (editing > 0) {
          const { error } = await supabase
            .from('achievements')
            .update(payload)
            .eq('id', editing);

          if (error) throw error;
          toast({ title: 'Success', description: 'Achievement updated!' });
        } else {
          const { data: all } = await supabase
            .from('achievements')
            .select('order_index')
            .order('order_index', { ascending: false })
            .limit(1);

          const highest = all?.[0]?.order_index || 0;
          const { error } = await supabase.from('achievements').insert({
            ...payload,
            order_index: highest + 1,
          });

          if (error) throw error;
          toast({ title: 'Success', description: 'Achievement added to DB!' });
        }
      } else {
        const { error } = await supabase.from('achievements').insert({
          ...payload,
          order_index: achievements.length,
        });

        if (error) throw error;
        toast({ title: 'Success', description: 'Achievement added!' });
      }

      setFormData({
        title: '',
        description: '',
        date: '',
        icon: 'Award',
        certificate_url: '',
        certificate_image: '',
      });
      setEditing(null);
      fetchAchievements();
    } catch (error: any) {
      console.error('Save error:', error);
      const msg = error?.message || error?.toString() || 'Unknown error';
      toast({ title: 'Error', description: msg.substring(0, 80) });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this achievement?')) return;
    try {
      if (id <= 0) {
        setAchievements((a) => a.filter((it) => it.id !== id));
        toast({ title: 'Removed', description: 'Static achievement removed locally' });
        return;
      }

      const { error } = await supabase.from('achievements').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Achievement deleted!' });
      fetchAchievements();
    } catch (error: any) {
      console.error('Delete error:', error);
      const msg = error?.message || 'Failed to delete';
      toast({ title: 'Error', description: msg.substring(0, 80) });
    }
  };

  const handleEdit = (achievement: Achievement) => {
    const parsed = parseAchievementDescription(achievement.description);
    setFormData({
      ...achievement,
      description: parsed.cleanDescription,
      certificate_url: parsed.certificate_url,
      certificate_image: parsed.certificate_image,
    });
    setEditing(achievement.id ?? null);
  };

  if (loading) return <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/80">Loading achievements...</div>;

  return (
    <div className="space-y-6 p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-2xl shadow-purple-900/20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-white">Manage Achievements</h2>
        <span className="text-xs md:text-sm text-cyan-200 bg-cyan-500/10 border border-cyan-400/30 rounded-full px-3 py-1">{achievements.length} items</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Achievement title"
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Achievement description"
            rows={3}
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Certificate Verify URL</label>
          <Input
            value={formData.certificate_url || ''}
            onChange={(e) => setFormData({ ...formData, certificate_url: e.target.value })}
            placeholder="https://..."
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Certificate Image URL</label>
          <Input
            value={formData.certificate_image || ''}
            onChange={(e) => setFormData({ ...formData, certificate_image: e.target.value })}
            placeholder="https://...jpg/png"
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Date</label>
          <Input
            value={formData.date || ''}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder="e.g., Mar 2024"
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Icon</label>
          <Input
            value={formData.icon || 'Award'}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="e.g., Award, Trophy, Star"
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02]"
          >
            {editing !== null ? 'Update Achievement' : 'Add Achievement'}
          </Button>
          {editing !== null && (
            <Button
              onClick={() => {
                setEditing(null);
                setFormData({
                  title: '',
                  description: '',
                  date: '',
                  icon: 'Award',
                  certificate_url: '',
                  certificate_image: '',
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
        <h3 className="text-lg font-semibold text-white mb-4">Achievements List</h3>
        <div className="space-y-2">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all">
              <div>
                <h4 className="font-semibold text-white">{achievement.title}</h4>
                <p className="text-sm text-gray-300">{achievement.date}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(achievement)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(achievement.id!)}
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
