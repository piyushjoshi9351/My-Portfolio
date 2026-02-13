'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Rahul Singh',
    role: 'Project Manager',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    content: 'Piyush is an exceptional developer who consistently delivers high-quality code. His problem-solving skills and dedication are outstanding.',
    rating: 5,
  },
  {
    name: 'Anjali Verma',
    role: 'Tech Lead',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
    content: 'Working with Piyush has been fantastic. He brings fresh ideas and executes them flawlessly. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Amit Sharma',
    role: 'Founder',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
    content: 'The best developer I have worked with. Piyush has great technical knowledge and excellent communication skills.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoPlay(false);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setAutoPlay(false);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              What People Say
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              Kind words from people I've worked with
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-xl p-8 md:p-12 space-y-6 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-xl text-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-purple-500/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-purple-500/50"
                    />
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Spacer */}
            <div className="h-80 md:h-96" />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prev}
              className="p-2 rounded-lg bg-purple-500/20 text-primary hover:bg-purple-500/40 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index);
                    setAutoPlay(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? 'bg-purple-500 w-8'
                      : 'bg-purple-500/30 hover:bg-purple-500/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-lg bg-purple-500/20 text-primary hover:bg-purple-500/40 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
