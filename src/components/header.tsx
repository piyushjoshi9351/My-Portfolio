'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience'},
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState('#hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      // Logic for active link
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 100; // Adjusted offset

      for (const section of sections) {
        if (section && section instanceof HTMLElement) {
          if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
            if (activeLink !== `#${section.id}`) {
              setActiveLink(`#${section.id}`);
            }
            break; // Found the active link, no need to continue
          }
        }
      }
      
      // Logic for scrolled state
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeLink]);


  const NavItems = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => {
            setActiveLink(link.href);
            if (isMobile) setIsMenuOpen(false);
          }}
          data-active={activeLink === link.href}
          className={cn(
            "relative text-lg font-medium text-muted-foreground transition-colors duration-300 hover:text-primary",
            "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:content-['']",
            "data-[active=true]:text-primary data-[active=true]:after:scale-x-100",
             isMobile ? "py-2" : ""
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in-down',
        isScrolled ? 'h-20 bg-card/60 backdrop-blur-xl shadow-lg border-b border-white/10' : 'h-24 bg-transparent'
      )}
    >
      <div className="container flex h-full items-center justify-between">
        <Link href="#hero" onClick={() => setActiveLink('#hero')} className="text-2xl font-bold font-headline transition-colors hover:text-primary">
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <NavItems />
        </nav>
        
        <Button asChild className="hidden md:flex bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50">
            <Link href="#contact">Hire Me</Link>
        </Button>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-card w-[80vw] border-l-0">
              <nav className="mt-16 flex flex-col items-center gap-8">
                <NavItems isMobile={true} />
                 <Button asChild className="mt-4">
                    <Link href="#contact" onClick={() => setIsMenuOpen(false)}>Hire Me</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
