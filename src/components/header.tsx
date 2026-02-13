'use client';

import Link from 'next/link';
import { Home, User, FolderKanban, Mail, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#hero', label: 'Home', icon: <Home className="h-4 w-4" /> },
  { href: '#about', label: 'About', icon: <User className="h-4 w-4" /> },
  { href: '#projects', label: 'Projects', icon: <FolderKanban className="h-4 w-4" /> },
  { href: '#contact', label: 'Contact', icon: <Mail className="h-4 w-4" /> },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        if (section && section instanceof HTMLElement) {
          if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
            if (activeLink !== `#${section.id}`) {
              setActiveLink(`#${section.id}`);
            }
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeLink]);

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setActiveLink(link.href)}
          data-active={activeLink === link.href}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 text-muted-foreground transition-all duration-300 hover:text-foreground",
            "data-[active=true]:bg-primary/90 data-[active=true]:text-primary-foreground data-[active=true]:shadow-lg data-[active=true]:shadow-primary/50"
          )}
        >
          {link.icon}
          <span className="text-sm font-medium">{link.label}</span>
        </Link>
      ))}
    </>
  );

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-4 left-0 right-0 z-50 hidden animate-fade-in-down justify-center md:flex">
        <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-card/60 p-2 backdrop-blur-xl">
          <NavItems />
        </nav>
      </header>

      {/* Mobile Header */}
      <div className="fixed top-4 right-4 z-50 md:hidden animate-fade-in-down">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="glass-card h-12 w-12 rounded-full">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="glass-card mx-auto mt-4 w-[90vw] rounded-2xl border-none">
            <nav className="mt-8 flex flex-col items-center gap-4">
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
