import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Seeding is disabled in production' },
      { status: 403 }
    );
  }

  try {
    // Clear existing data
    await supabase.from('projects').delete().neq('id', 0);
    await supabase.from('skills').delete().neq('id', 0);
    await supabase.from('experience').delete().neq('id', 0);
    await supabase.from('achievements').delete().neq('id', 0);
    await supabase.from('about_section').delete().neq('id', 0);

    // Add About Section
    const aboutSection = {
      title: 'About Me',
      description: "I'm Piyush Joshi, an aspiring AI/ML Engineer currently pursuing B.Tech (Information Technology) at G.L. Bajaj Institute of Technology and Management (CGPA: 8.8). I build AI-powered web platforms, accessibility-focused real-time applications, and immersive 3D experiences. I enjoy solving real-world problems by combining ML models with scalable web technologies. I aim to contribute to impactful AI-driven products, deepen my expertise in machine learning and deployments, and work on end-to-end systems that deliver real value to users.",
    };
    await supabase.from('about_section').insert(aboutSection);

    // Add Projects (FROM RESUME)
    const projects = [
      {
        title: 'Tourist Companion Website',
        description: 'A responsive tourism web application for exploring destinations, booking hotels and activities, with maps, weather updates, and user reviews.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        github_url: 'https://github.com/piyushjoshi9351/TAOURIST-AND-TRAVEL-WEBSITE',
        live_demo_url: '#',
        order_index: 0,
      },
      {
        title: 'Real-Time Sign Language Video Calling Platform',
        description: 'Accessibility-focused real-time video calling with WebRTC, FastAPI signaling, and AI-powered speech-to-text and sign recognition features.',
        technologies: ['React', 'WebRTC', 'FastAPI', 'WebSockets', 'AI/ML'],
        github_url: '#',
        live_demo_url: '#',
        order_index: 1,
      },
      {
        title: 'Monastery360',
        description: 'An interactive platform showcasing Sikkim\'s monasteries using 360° virtual tours, interactive maps, and immersive user experiences.',
        technologies: ['React.js', 'Tailwind CSS', 'Pannellum.js', 'Node.js', 'MongoDB'],
        github_url: 'https://github.com/piyushjoshi9351/sikkim-final-rebuild',
        live_demo_url: '#',
        order_index: 2,
      },
      {
        title: 'SmartDoc AI',
        description: 'An AI-powered document analysis platform that summarizes documents, enables conversational QA over documents, compares documents, and generates mind maps.',
        technologies: ['TypeScript', 'Docker', 'Nix', 'AI/ML'],
        github_url: 'https://github.com/piyushjoshi9351/studio',
        live_demo_url: '#',
        order_index: 3,
      },
      {
        title: 'Immersive 3D Developer Portfolio',
        description: 'A 3D portfolio built with Next.js, Three.js and GSAP showcasing projects with smooth animations and Firebase integration.',
        technologies: ['Next.js', 'Three.js', 'GSAP', 'Firebase'],
        github_url: 'https://github.com/piyushjoshi9351/My-Portfolio',
        live_demo_url: '#',
        order_index: 4,
      },
    ];

    for (const project of projects) {
      await supabase.from('projects').insert(project);
    }

    // Add Skills (FROM RESUME)
    const skills = [
      // Programming Languages
      { name: 'Python', proficiency: 90, category: 'Programming Languages', order_index: 0 },
      { name: 'Java', proficiency: 85, category: 'Programming Languages', order_index: 1 },
      { name: 'JavaScript', proficiency: 85, category: 'Programming Languages', order_index: 2 },
      { name: 'SQL', proficiency: 80, category: 'Programming Languages', order_index: 3 },
      { name: 'C', proficiency: 70, category: 'Programming Languages', order_index: 4 },
      { name: 'HTML', proficiency: 85, category: 'Programming Languages', order_index: 5 },
      
      // Libraries & Frameworks
      { name: 'Pandas', proficiency: 85, category: 'Libraries & Frameworks', order_index: 6 },
      { name: 'NumPy', proficiency: 85, category: 'Libraries & Frameworks', order_index: 7 },
      { name: 'Scikit-Learn', proficiency: 80, category: 'Libraries & Frameworks', order_index: 8 },
      { name: 'Matplotlib', proficiency: 75, category: 'Libraries & Frameworks', order_index: 9 },
      { name: 'React', proficiency: 80, category: 'Libraries & Frameworks', order_index: 10 },
      
      // Tools & Platforms
      { name: 'VS Code', proficiency: 95, category: 'Tools & Platforms', order_index: 11 },
      { name: 'Git', proficiency: 90, category: 'Tools & Platforms', order_index: 12 },
      { name: 'Jupyter Notebook', proficiency: 90, category: 'Tools & Platforms', order_index: 13 },
      { name: 'Google Colab', proficiency: 85, category: 'Tools & Platforms', order_index: 14 },
      { name: 'IntelliJ IDEA', proficiency: 80, category: 'Tools & Platforms', order_index: 15 },
      
      // Databases
      { name: 'MySQL', proficiency: 80, category: 'Databases', order_index: 16 },
      { name: 'MongoDB', proficiency: 70, category: 'Databases', order_index: 17 },
    ];

    for (const skill of skills) {
      await supabase.from('skills').insert(skill);
    }

    // Add Experience (FROM RESUME - EDUCATION)
    const experience = [
      {
        company: 'G.L. Bajaj Institute of Technology and Management',
        position: 'Bachelors of Technology, Information Technology',
        duration: 'Aug 2023 - Present',
        description: 'CGPA: 8.8',
        skills_used: ['Python', 'Java', 'Data Structures', 'AI/ML'],
        order_index: 0,
      },
      {
        company: 'Swami Vivekanand Govt Model School',
        position: 'PCM Intermediate',
        duration: '2020 - 2022',
        description: 'Percentage: 88.5%',
        skills_used: ['Physics', 'Chemistry', 'Mathematics'],
        order_index: 1,
      },
      {
        company: 'St. Andrews Convent School',
        position: 'High School',
        duration: '2018 - 2020',
        description: 'Percentage: 87.5%',
        skills_used: ['Science', 'Mathematics'],
        order_index: 2,
      },
    ];

    for (const exp of experience) {
      await supabase.from('experience').insert(exp);
    }

    // Add Achievements (FROM RESUME)
    const achievements = [
      {
        title: 'Artificial Intelligence Beginners Guide',
        description: 'Simplilearn - Introduction to AI fundamentals and machine learning concepts',
        date: '2024',
        icon: 'Award',
        order_index: 0,
      },
      {
        title: 'AI Essentials: Introduction to AI',
        description: 'Udemy - Comprehensive course on AI and its applications',
        date: '2024',
        icon: 'Award',
        order_index: 1,
      },
      {
        title: 'What Is Generative AI',
        description: 'LinkedIn Learning - Understanding generative AI models and use cases',
        date: '2024',
        icon: 'Award',
        order_index: 2,
      },
      {
        title: 'DSA With Java',
        description: 'Apna College - Data Structures and Algorithms mastery',
        date: '2024',
        icon: 'Code',
        order_index: 3,
      },
      {
        title: 'Introduction to Deep Learning',
        description: 'Infosys Springboard - Neural networks and deep learning fundamentals',
        date: '2024',
        icon: 'Award',
        order_index: 4,
      },
      {
        title: 'Python Essentials',
        description: 'Cisco Networking Academy - Python programming certification',
        date: '2024',
        icon: 'Award',
        order_index: 5,
      },
      {
        title: 'Excalibur of Techspardha NIT Kurukshetra',
        description: 'Participated in national-level hackathon at NIT Kurukshetra',
        date: '2023',
        icon: 'Trophy',
        order_index: 6,
      },
      {
        title: '20+ Microsoft Azure AI Fundamentals Badges',
        description: 'Earned multiple badges demonstrating Azure AI expertise',
        date: '2023-2024',
        icon: 'Award',
        order_index: 7,
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
