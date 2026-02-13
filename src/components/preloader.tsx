'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loadingText, setLoadingText] = useState('SYSTEM READY');

  useEffect(() => {
    const texts = ['PORTFOLIO 2024', 'UI LOADING', 'WELCOME'];
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111118] animate-fade-in-up">
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground font-code">
              <span>• SYSTEM READY</span>
              <span>PORTFOLIO {new Date().getFullYear()}</span>
              <span className="animate-pulse">UI LOADING</span>
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
          <div className="relative h-64 w-64 mx-auto md:mx-0 md:ml-auto">
            <div className="absolute inset-0 border-2 border-primary/10 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-6 border-t-2 border-primary/50 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-12 border-2 border-primary/20 rounded-full animate-spin-slow-reverse"></div>
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-lg font-bold text-white tracking-widest font-code transition-opacity duration-300">
                  {loadingText}
                </span>
                <span className="absolute top-8 right-8 text-xs font-code text-green-400">
                  ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
