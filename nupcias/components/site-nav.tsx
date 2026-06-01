'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { href: '#historia', label: 'Historia' },
  { href: '#evento', label: 'Evento' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#galeria', label: 'Galería' },
]

interface SiteNavProps {
  monogram: string
}

export function SiteNav({ monogram }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:py-5">
        <a
          href="#top"
          className={cn(
            'font-serif text-xl tracking-wide transition-colors',
            scrolled ? 'text-foreground' : 'text-background',
          )}
        >
          {monogram}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'text-xs font-light uppercase tracking-[0.2em] transition-colors',
                  scrolled
                    ? 'text-muted-foreground hover:text-foreground'
                    : 'text-background/80 hover:text-background',
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#rsvp"
          className={cn(
            'rounded-full border px-5 py-2 text-xs font-light uppercase tracking-[0.2em] transition-all',
            scrolled
              ? 'border-foreground/20 text-foreground hover:bg-foreground hover:text-background'
              : 'border-background/40 text-background hover:bg-background hover:text-foreground',
          )}
        >
          Confirmar
        </a>
      </nav>
    </header>
  )
}
