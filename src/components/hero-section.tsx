import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section id="hero" className="bg-card">
      <div className="container grid grid-cols-1 items-center gap-8 text-center md:grid-cols-2 md:text-left">
        <div className="space-y-6">
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Piyush Joshi
          </h1>
          <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
            A creative and driven Full Stack Developer building modern, responsive, and user-friendly web applications.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center md:justify-start">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
            {/* You can add an image or an animation here */}
            <div className="w-72 h-72 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                <div className="w-60 h-60 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-primary/30"></div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
