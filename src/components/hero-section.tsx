"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";

const roles = ["Full Stack Developer", "Creative Web Developer", "UI/UX Enthusiast"];

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    tl.fromTo(
      paragraphRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    );

    tl.fromTo(
      buttonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.7"
    );
  }, []);

  useEffect(() => {
    const fullText = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
        }, 100);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    } else {
      if (text.length < fullText.length) {
        timeout = setTimeout(() => {
          setText((prev) => fullText.slice(0, prev.length + 1));
        }, 150);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);


  return (
    <section id="hero" className="min-h-[80vh] flex items-center">
      <div className="container text-center">
        <div className="space-y-8">
          <h1
            ref={headingRef}
            className="font-headline text-6xl font-extrabold tracking-tighter text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ opacity: 0 }}
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl text-primary mb-4">My Portfolio</span>
            Piyush Joshi
          </h1>
          <p
            ref={paragraphRef}
            className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl font-code h-8"
            style={{ opacity: 0 }}
          >
             I am a <span className="text-white font-semibold border-r-2 border-primary animate-pulse">{text}</span>
          </p>
          <div
            ref={buttonRef}
            className="flex justify-center"
            style={{ opacity: 0 }}
          >
            <Button asChild size="lg" className="text-lg font-bold px-10 py-6 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-primary-foreground transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50">
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
