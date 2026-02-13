'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px';
        cursorRef.current.style.top = y + 'px';
      }

      if (blurRef.current) {
        blurRef.current.style.left = x - 100 + 'px';
        blurRef.current.style.top = y - 100 + 'px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Blurred glow */}
      <div
        ref={blurRef}
        className="fixed w-64 h-64 bg-purple-500/30 rounded-full blur-3xl pointer-events-none -z-20 transition-all duration-200"
      />

      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 bg-cyan-400 rounded-full pointer-events-none -z-20 shadow-lg shadow-cyan-400/50 transition-all duration-100"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
