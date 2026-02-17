import Link from "next/link";
import { Github, Linkedin, Mail, ChevronUp } from "lucide-react";
import { LeetCodeIcon, DiscordIcon } from "@/components/icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-purple-500/20 bg-gradient-to-t from-secondary/30 to-transparent animate-fade-in-up">
      <div className="container">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Piyush Joshi</h3>
              <p className="text-sm text-muted-foreground">
                Building beautiful and functional digital experiences with modern technologies.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Navigation</h4>
              <nav className="space-y-2">
                <Link href="#hero" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
                <Link href="#about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
                <Link href="#projects" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Projects</Link>
                <Link href="#contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              </nav>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Resources</h4>
              <nav className="space-y-2">
                <Link href="https://github.com/piyushjoshi9351" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</Link>
                <Link href="https://www.linkedin.com/in/piyush-joshi-18a152277/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</Link>
                <Link href="https://leetcode.com/u/Piyush_Joshi93/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary transition-colors">LeetCode</Link>
                <Link href="/piyush_joshi_cv.pdf" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Resume</Link>
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Get In Touch</h4>
              <p className="text-sm text-muted-foreground mb-4">Have a project in mind?</p>
              <Link 
                href="#contact" 
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-cyan-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-purple-500/20 my-8" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Piyush Joshi. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/piyushjoshi9351" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub" 
                className="text-muted-foreground transition-colors duration-300 hover:text-purple-400 hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/piyush-joshi-18a152277/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="text-muted-foreground transition-colors duration-300 hover:text-cyan-400 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://leetcode.com/u/Piyush_Joshi93/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LeetCode" 
                className="text-muted-foreground transition-colors duration-300 hover:text-yellow-400 hover:scale-110"
              >
                <LeetCodeIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://discord.com/users/piyushjoshi4918" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Discord" 
                className="text-muted-foreground transition-colors duration-300 hover:text-blue-400 hover:scale-110"
              >
                <DiscordIcon className="h-5 w-5" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-purple-500/20 text-primary hover:bg-purple-500/40 transition-all duration-300 hover:scale-110"
              aria-label="Scroll to top"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
