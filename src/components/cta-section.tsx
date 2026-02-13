'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="relative rounded-lg overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-purple-600/20 blur-xl" />
          
          {/* Content */}
          <div className="relative z-10 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-lg p-8 md:p-16 text-center space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30">
                  <Zap className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-200">Ready to Collaborate?</span>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Let's Build Something
                <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Amazing Together
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hello, feel free to get in touch!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg font-bold px-8 py-6 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300">
                <Link href="#contact">
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-lg font-bold px-8 py-6 border-2 border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
              >
                <a href="mailto:your-email@example.com">
                  Email Me
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
