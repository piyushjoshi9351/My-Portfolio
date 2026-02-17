import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    // Clear existing data
    await supabase.from('projects').delete().neq('id', 0);
    await supabase.from('skills').delete().neq('id', 0);
    await supabase.from('experience').delete().neq('id', 0);
    await supabase.from('achievements').delete().neq('id', 0);

    // Add Projects
    const projects = [
      {
        title: 'Tourist Companion Website',
        description: 'A comprehensive travel planning platform that helps users discover destinations, book accommodations, and plan itineraries.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        github_url: 'https://github.com/piyushjoshi9351/TAOURIST-AND-TRAVEL-WEBSITE',
        live_demo_url: '#',
        order_index: 0,
      },
      {
        title: 'Real-time Sign Language Platform',
        description: 'An AI-powered platform for real-time sign language recognition and translation using computer vision.',
        technologies: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
        github_url: '#',
        live_demo_url: '#',
        order_index: 1,
      },
      {
        title: 'Monastery360',
        description: 'Virtual tour application for exploring monasteries with 360-degree immersive experience.',
        technologies: ['React', 'Three.js', 'WebGL', 'Node.js'],
        github_url: 'https://github.com/piyushjoshi9351/sikkim-final-rebuild',
        live_demo_url: '#',
        order_index: 2,
      },
      {
        title: 'SmartDoc AI',
        description: 'AI-powered document processing and analysis system for automating document workflows.',
        technologies: ['React', 'TypeScript', 'Node.js', 'OpenAI API'],
        github_url: 'https://github.com/piyushjoshi9351/studio',
        live_demo_url: '#',
        order_index: 3,
      },
      {
        title: 'Portfolio Website',
        description: 'Personal portfolio showcasing AI/ML projects with dynamic content management and admin panel.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
        github_url: 'https://github.com/piyushjoshi9351/My-Portfolio',
        live_demo_url: '#',
        order_index: 4,
      },
      {
        title: 'Myportfolio admin panel',
        description: 'Project description',
        technologies: ['React', 'TypeScript', 'Tailwind'],
        github_url: 'https://github.com/...',
        live_demo_url: '#',
        order_index: 5,
      },
    ];

    for (const project of projects) {
      await supabase.from('projects').insert(project);
    }

    // Add Skills
    const skills = [
      { name: 'Python', proficiency: 90, category: 'Technical', order_index: 0 },
      { name: 'Java', proficiency: 85, category: 'Technical', order_index: 1 },
      { name: 'JavaScript', proficiency: 85, category: 'Technical', order_index: 2 },
      { name: 'React', proficiency: 80, category: 'Technical', order_index: 3 },
      { name: 'TypeScript', proficiency: 85, category: 'Technical', order_index: 4 },
      { name: 'Node.js', proficiency: 80, category: 'Technical', order_index: 5 },
      { name: 'MongoDB', proficiency: 75, category: 'Technical', order_index: 6 },
      { name: 'SQL', proficiency: 80, category: 'Technical', order_index: 7 },
      { name: 'Machine Learning', proficiency: 75, category: 'AI/ML', order_index: 8 },
      { name: 'TensorFlow', proficiency: 70, category: 'AI/ML', order_index: 9 },
    ];

    for (const skill of skills) {
      await supabase.from('skills').insert(skill);
    }

    // Add Experience
    const experience = [
      {
        company: 'Tech Innovation Labs',
        position: 'Full Stack Developer',
        duration: 'Jan 2023 - Present',
        description: 'Developing scalable web applications and implementing AI/ML solutions.',
        skills_used: ['React', 'Node.js', 'Python', 'MongoDB'],
        order_index: 0,
      },
      {
        company: 'StartUp XYZ',
        position: 'Junior Developer',
        duration: 'Jun 2022 - Dec 2022',
        description: 'Built frontend components and contributed to backend APIs.',
        skills_used: ['React', 'JavaScript', 'REST APIs'],
        order_index: 1,
      },
    ];

    for (const exp of experience) {
      await supabase.from('experience').insert(exp);
    }

    // Add Achievements
    const achievements = [
      {
        title: 'AI/ML Certification',
        description: 'Completed advanced machine learning course from leading institution.',
        date: 'Mar 2024',
        icon: 'Award',
        order_index: 0,
      },
      {
        title: 'Open Source Contributor',
        description: 'Contributed to multiple open-source projects with 50+ merged PRs.',
        date: 'Jan 2024',
        icon: 'Code',
        order_index: 1,
      },
      {
        title: 'Hackathon Winner',
        description: 'Won first prize in national-level hackathon for AI application.',
        date: 'Dec 2023',
        icon: 'Trophy',
        order_index: 2,
      },
      {
        title: 'Tech Speaker',
        description: 'Delivered talks on AI/ML at 5+ tech conferences.',
        date: 'Throughout 2023',
        icon: 'Mic',
        order_index: 3,
      },
    ];

    for (const achievement of achievements) {
      await supabase.from('achievements').insert(achievement);
    }

    return NextResponse.json({
      success: true,
      message: 'Database populated successfully!',
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
