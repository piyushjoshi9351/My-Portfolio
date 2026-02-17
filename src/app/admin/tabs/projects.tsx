`use client`;

import { useState, useEffect } from 'react';
import { supabase, Project } from '@/lib/supabase';
import { projectsData } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    technologies: [],
    github_url: '',
    live_demo_url: '',
    image_url: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        // fallback to static projects
        const mapped: Project[] = projectsData.map((p, idx) => ({
          id: -(idx + 1),
          title: p.title,
          description: p.description,
          technologies: p.techStack || [],
          github_url: p.githubRepoUrl || '',
          live_demo_url: p.liveDemoUrl || '',
          image_url: p.imagePlaceholderId || '',
          order_index: idx,
        }));
        setProjects(mapped);
        return;
      }

      setProjects(data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch projects' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast({ title: 'Error', description: 'Title and description required' });
      return;
    }

    try {
      const tech = formData.technologies?.length
        ? formData.technologies
        : (formData.technologies as unknown as string)?.split(',').map((t) => t.trim()) || [];

      if (editing !== null) {
        if (editing > 0) {
          const { error } = await supabase
            .from('projects')
            .update({
              ...formData,
              technologies: tech,
            })
            .eq('id', editing);

          if (error) throw error;
          toast({ title: 'Success', description: 'Project updated!' });
        } else {
          // static project being saved -> insert into DB
          const { data: all } = await supabase
            .from('projects')
            .select('order_index')
            .order('order_index', { ascending: false })
            .limit(1);

          const highest = all?.[0]?.order_index || 0;
          const { error } = await supabase.from('projects').insert({
            ...formData,
            technologies: tech,
            order_index: highest + 1,
          });

          if (error) throw error;
          toast({ title: 'Success', description: 'Project added to DB!' });
        }
      } else {
        const { error } = await supabase.from('projects').insert({
          ...formData,
          technologies: tech,
          order_index: projects.length,
        });

        if (error) throw error;
        toast({ title: 'Success', description: 'Project added!' });
      }

      setFormData({
        title: '',
        description: '',
        technologies: [],
        github_url: '',
        live_demo_url: '',
        image_url: '',
      });
      setEditing(null);
      fetchProjects();
    } catch (error: any) {
      console.error('Save error:', error);
      const msg = error?.message || error?.toString() || 'Unknown error';
      toast({ title: 'Error', description: msg.substring(0, 80) });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;

    try {
      if (id <= 0) {
        setProjects((p) => p.filter((pr) => pr.id !== id));
        toast({ title: 'Removed', description: 'Static project removed locally' });
        return;
      }

      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Project deleted!' });
      fetchProjects();
    } catch (error: any) {
      console.error('Delete error:', error);
      const msg = error?.message || 'Failed to delete';
      toast({ title: 'Error', description: msg.substring(0, 80) });
    }
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditing(project.id ?? null);
  };

  if (loading) return <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/80">Loading projects...</div>;

  return (
    <div className="space-y-6 p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-2xl shadow-purple-900/20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-white">Manage Projects</h2>
        <span className="text-xs md:text-sm text-cyan-200 bg-cyan-500/10 border border-cyan-400/30 rounded-full px-3 py-1">{projects.length} items</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Project title"
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Project description"
            rows={3}
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Technologies (comma-separated)</label>
          <Input
            value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(t => t.trim()) })}
            placeholder="React, TypeScript, Tailwind"
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">GitHub URL</label>
          <Input
            value={formData.github_url || ''}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            placeholder="https://github.com/..."
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Live Demo URL</label>
          <Input
            value={formData.live_demo_url || ''}
            onChange={(e) => setFormData({ ...formData, live_demo_url: e.target.value })}
            placeholder="https://..."
            className="bg-white/10 border-white/20 text-white focus-visible:ring-cyan-400"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02]"
          >
            {editing ? 'Update Project' : 'Add Project'}
          </Button>
          {editing && (
            <Button
              onClick={() => {
                setEditing(null);
                setFormData({
                  title: '',
                  description: '',
                  technologies: [],
                  github_url: '',
                  live_demo_url: '',
                  image_url: '',
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
        <h3 className="text-lg font-semibold text-white mb-4">Projects List</h3>
        <div className="space-y-2">
          {projects.map((project) => (
            <div key={project.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all">
              <div>
                <h4 className="font-semibold text-white">{project.title}</h4>
                <p className="text-sm text-gray-300">{project.description.substring(0, 50)}...</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(project)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(project.id!)}
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
