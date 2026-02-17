import { createClient } from '@supabase/supabase-js';
import { Project, Skill, Experience, Achievement, AboutSection } from './supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}

export async function getAboutSection(): Promise<AboutSection | null> {
  try {
    const { data, error } = await supabase
      .from('about_section')
      .select('*')
      .limit(1)
      .single();

    if (error) throw error;
    return data || null;
  } catch (error) {
    console.error('Error fetching about section:', error);
    return null;
  }
}
