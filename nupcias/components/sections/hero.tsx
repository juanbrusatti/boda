import Image from 'next/image'
import { getTypographyStyle } from '@/lib/typography-utils'
import type { EventConfig } from '@/types/event'

interface HeroProps {
  event: EventConfig
}

export function Hero({ event }: HeroProps) {
  const heroTypography = event.typography?.hero

  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src={event.coverImage || '/placeholder.svg'}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Elegant darkening overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center text-background">
        <p
          className="animate-[fade-up_1s_ease-out_forwards] text-xs font-light uppercase tracking-[0.45em] text-background/85"
          style={getTypographyStyle(heroTypography?.subtitle)}
        >
          {event.tagline}
        </p>

        <h1
          className="mt-6 text-balance font-serif text-6xl font-light leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[8.5rem]"
          style={getTypographyStyle(heroTypography?.title)}
        >
          {event.title}
        </h1>

        <div className="mt-8 flex flex-col items-center gap-4">
          <span className="h-px w-16 bg-background/50" />
          <p
            className="text-sm font-light uppercase tracking-[0.3em] text-background/90"
            style={getTypographyStyle(heroTypography?.body)}
          >
            {event.dateLabel}
          </p>
          <p
            className="text-xs font-light tracking-[0.2em] text-background/70"
            style={getTypographyStyle(heroTypography?.body)}
          >
            {event.locationLabel}
          </p>
        </div>

        <a
          href="#rsvp"
          className="mt-12 rounded-full bg-background px-9 py-4 text-xs font-light uppercase tracking-[0.25em] text-foreground transition-all duration-300 hover:bg-background/90 hover:tracking-[0.32em]"
        >
          Confirmar asistencia
        </a>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-background/70">
        <span className="text-[10px] font-light uppercase tracking-[0.3em]">Descubrí más</span>
        <span className="h-10 w-px animate-pulse bg-background/50" />
      </div>
    </section>
  )
}
