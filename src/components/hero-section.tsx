"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center">
      <div className="container text-center">
        <div className="space-y-8">
          <h1
            ref={headingRef}
            className="font-headline text-5xl font-extrabold tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ opacity: 0 }}
          >
            Hi, I'm Piyush Joshi —
            <br />
            <span className="text-primary">Full Stack Developer & AI/ML Engineer</span>
          </h1>
          <p
            ref={paragraphRef}
            className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl"
            style={{ opacity: 0 }}
          >
             I craft modern, responsive web apps with clean UI and robust backend architecture.
          </p>
          <div
            ref={buttonRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ opacity: 0 }}
          >
            <Button asChild size="lg" className="text-lg font-bold px-8 py-6 bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50">
              <Link href="#contact">Hire Me</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg font-bold px-8 py-6 border-2 border-primary text-primary transition-all duration-300 hover:scale-105 hover:bg-primary/10">
              <a href="/piyush_joshi_cv.pdf" download>
                Download CV <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
