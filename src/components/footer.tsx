import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { LeetCodeIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="bg-background border-t animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Piyush Joshi. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-accent">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-accent">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="text-muted-foreground hover:text-accent">
              <LeetCodeIcon className="h-5 w-5" />
            </a>
        </div>
      </div>
    </footer>
  );
}
