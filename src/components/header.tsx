"use client";

import Link from "next/link";
import { Github, Linkedin, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LeetCodeIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full animate-fade-in-down border-b border-white/10 bg-background/95 backdrop-blur-sm"
      )}
    >
      <div className="container flex h-16 items-center">
        <Link href="#hero" className="mr-6 flex items-center space-x-2">
          <span className="font-headline text-2xl font-bold text-foreground">
            My Portfolio
          </span>
        </Link>
        <nav className="hidden items-center space-x-8 text-base font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="text-muted-foreground transition-colors hover:text-primary">
              <LeetCodeIcon className="h-5 w-5" />
            </a>
          </Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <span>My Portfolio</span>
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
