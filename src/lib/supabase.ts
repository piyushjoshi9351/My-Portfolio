import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Project {
  id?: number;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string;
  live_demo_url?: string;
  image_url?: string;
  imagePlaceholderId?: string;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id?: number;
  name: string;
  proficiency: number;
  category: string;
  order_index?: number;
  created_at?: string;
}

export interface Experience {
  id?: number;
  company: string;
  position: string;
  duration: string;
  description?: string;
  skills_used?: string[];
  order_index?: number;
  created_at?: string;
}

export interface Achievement {
  id?: number;
  title: string;
  description?: string;
  date?: string;
  icon?: string;
  order_index?: number;
  created_at?: string;
}

export interface AboutSection {
  id?: number;
  title: string;
  description: string;
  image_url?: string;
  updated_at?: string;
}
