"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    if (headingRef.current) {
      const chars = headingRef.current.querySelectorAll("span");
      tl.fromTo(
        chars,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 1 }
      );
    }

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

  const name = "Piyush Joshi";

  return (
    <section id="hero" className="min-h-[80vh] flex items-center">
      <div className="container text-center">
        <div className="space-y-8">
          <h1
            ref={headingRef}
            className="font-headline text-6xl font-extrabold tracking-tighter text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
          >
            {name.split("").map((char, index) => (
              <span key={index} className="inline-block" style={{ opacity: 0 }}>
                {char === " " ? " " : char}
              </span>
            ))}
          </h1>
          <p
            ref={paragraphRef}
            className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl"
            style={{ opacity: 0 }}
          >
            A creative and driven Full Stack Developer building modern, responsive, and user-friendly web applications.
          </p>
          <div
            ref={buttonRef}
            className="flex justify-center"
            style={{ opacity: 0 }}
          >
            <Button asChild size="lg" className="text-lg font-bold px-10 py-6 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-primary-foreground transition-transform duration-300 hover:scale-105">
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
