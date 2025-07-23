"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ProfileTailor } from './profile-enhancer';
import { Button } from './ui/button';

const navLinks = [
  { href: '/', label: 'Anasayfa' },
  { href: '/about', label: 'Hakkımda' },
  { href: '/experience', label: 'Deneyim' },
  { href: '/skills', label: 'Yetenekler' },
  { href: '/projects', label: 'Projeler' },
  { href: '/contact', label: 'İletişim' },
];

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-xl font-bold text-primary">
              <span className="mr-2 rounded-lg bg-primary p-2 text-primary-foreground">SE</span>
              SemihErgili
            </Link>
          </div>
          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-gray-700 transition hover:text-primary",
                  pathname === link.href && "text-primary font-semibold"
                )}>
                {link.label}
              </Link>
            ))}
            <ProfileTailor>
              <Button size="sm" variant="outline">
                <Sparkles className="mr-2 h-4 w-4" />
                AI ile Özelleştir
              </Button>
            </ProfileTailor>
          </nav>
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} bg-white py-2 px-4 shadow-lg md:hidden`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={cn(
                "block py-2 text-gray-700 transition hover:text-primary",
                pathname === link.href && "text-primary font-semibold"
              )}>
            {link.label}
          </Link>
        ))}
        <div className="mt-2">
            <ProfileTailor>
              <Button size="sm" variant="outline" className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                AI ile Özelleştir
              </Button>
            </ProfileTailor>
        </div>
      </div>
    </header>
  );
}
