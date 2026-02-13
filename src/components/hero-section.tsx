"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { LeetCodeIcon, DiscordIcon } from "@/components/icons";

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const roles = useMemo(() => ["Aspiring AI/ML Engineer", "Full Stack Developer"], []);
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const delay = 2000;

    const handleTyping = () => {
      const currentRole = roles[roleIndex];
      const updatedText = isDeleting
        ? currentRole.substring(0, text.length - 1)
        : currentRole.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentRole) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex, roles]);


  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
      roleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    )
    .fromTo(
      paragraphRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.6"
    )
    .fromTo(
      buttonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.7"
    )
    .fromTo(
      socialsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.7"
    );
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container text-center">
        <div className="space-y-12">
          <div className="space-y-8">
            <h1
              ref={headingRef}
              className="font-headline text-5xl font-extrabold tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ opacity: 0 }}
            >
              Hi, I'm Piyush Joshi
            </h1>
            <p 
              ref={roleRef}
              className="text-2xl font-bold text-muted-foreground md:text-3xl lg:text-4xl mt-4 min-h-[40px] md:min-h-[50px]"
              style={{ opacity: 0 }}
            >
              I'm an <span className="text-primary">{text}</span><span className="animate-pulse">|</span>
            </p>
            <p
              ref={paragraphRef}
              className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl"
              style={{ opacity: 0 }}
            >
               I'm a passionate developer with a strong interest in Artificial Intelligence and Machine Learning, currently pursuing my B.Tech in Information Technology.
            </p>
            <div
              ref={buttonRef}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{ opacity: 0 }}
            >
              <Button asChild size="lg" className="text-lg font-bold px-8 py-6 bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50">
                <Link href="#contact">Get In Touch</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg font-bold px-8 py-6 border-2 border-primary text-primary transition-all duration-300 hover:scale-105 hover:bg-primary/10">
                <a href="/piyush_joshi_cv.pdf" download>
                  Download CV <ArrowDown className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          
          <div
            ref={socialsRef}
            className="flex items-center justify-center gap-4"
            style={{ opacity: 0 }}
          >
            <span className="text-lg text-muted-foreground">Follow me:</span>
            <div className="flex items-center gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-primary">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-primary">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="text-muted-foreground transition-colors hover:text-primary">
                <LeetCodeIcon className="h-6 w-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="text-muted-foreground transition-colors hover:text-primary">
                <DiscordIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
