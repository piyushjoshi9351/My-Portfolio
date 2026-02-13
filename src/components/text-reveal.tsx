'use client';

import { useEffect, useRef } from 'react';

export default function TextReveal({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.letter');
    
    letters.forEach((letter, index) => {
      letter.animate(
        [
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        {
          duration: 500,
          delay: index * 30,
          fill: 'forwards',
          easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }
      );
    });
  }, [text]);

  return (
    <div ref={containerRef} className="inline">
      {text.split('').map((char, index) => (
        <span key={index} className="letter opacity-0 inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}
