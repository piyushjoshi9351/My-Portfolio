'use client';

import { useEffect, useState } from 'react';
import { Wifi, Cog, RefreshCw, Zap } from 'lucide-react';

export default function Preloader() {
  const [loadingText, setLoadingText] = useState('INITIATING...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const texts = ['LOADING UI...', 'SYSTEMS READY...', 'WELCOME'];
    let i = 0;
    const interval = setInterval(() => {
      if (i < texts.length) {
        setLoadingText(texts[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 900);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 300);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111118] animate-fade-in-up p-4">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary/20">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-6">
            <div className="flex items-center flex-wrap gap-2 text-xs text-muted-foreground font-code">
              <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                SYSTEM READY
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1">
                PORTFOLIO {new Date().getFullYear()}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1">
                UI LOADING
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-white">
              Welcome to
              <br />
              my Portfolio
            </h1>
            <p className="text-muted-foreground">
              Building modern, reliable, and fast digital experiences with a focus on clean UI and solid engineering.
            </p>
          </div>

          <div className="glass-card p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <span className="font-code text-xs text-muted-foreground">CORE UI</span>
                <span className="font-code text-xs text-green-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                    ONLINE
                </span>
            </div>
            <div className="relative flex items-center justify-center h-64 w-64 mx-auto">
              {/* Central Pulse */}
              <div className="absolute inset-12 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
              
              {/* Orbiting Icons */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                  <div className="animate-spin-slow-reverse">
                    <Wifi className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
                  <div className="animate-spin-slow-reverse">
                    <Cog className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                  <div className="animate-spin-slow-reverse">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
                   <div className="animate-spin-slow-reverse">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* Center Text */}
              <div className="relative z-10 text-center">
                 <span className="text-lg font-bold text-white tracking-widest font-code transition-opacity duration-300">
                  {loadingText}
                </span>
              </div>

              {/* Outlines */}
              <div className="absolute inset-8 rounded-full border border-white/5"></div>
              <div className="absolute inset-0 rounded-full border border-white/10"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
