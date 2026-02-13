import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { LeetCodeIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 animate-fade-in-up">
      <div className="container flex flex-col items-center justify-between gap-6 py-8 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Piyush Joshi. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-primary">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-primary">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="text-muted-foreground transition-colors hover:text-primary">
              <LeetCodeIcon className="h-6 w-6" />
            </a>
        </div>
      </div>
    </footer>
  );
}
