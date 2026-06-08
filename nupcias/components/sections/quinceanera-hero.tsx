import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import { getColorStyle } from '@/lib/color-utils'
import type { EventConfig } from '@/types/event'

interface QuinceaneraHeroProps {
  event: EventConfig
}

export function QuinceaneraHero({ event }: QuinceaneraHeroProps) {
  const heroTypography = event.typography?.hero
  const heroColors = event.colors?.hero?.colors

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" style={getColorStyle(heroColors)}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-current/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-current/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-current/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <Reveal>
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <Sparkles className="w-5 h-5" style={{ color: heroColors?.accent || '#ec4899' }} />
              <span
                className="text-sm font-medium tracking-wider uppercase"
                style={getTypographyStyle(heroTypography?.label)}
              >
                Mis 15 Años
              </span>
              <Sparkles className="w-5 h-5" style={{ color: heroColors?.accent || '#ec4899' }} />
            </div>
          </div>

          <h1
            className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight"
            style={{ ...getTypographyStyle(heroTypography?.title), background: heroColors?.accent ? `linear-gradient(to right, ${heroColors.accent}, ${heroColors.accent}99)` : undefined, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {event.title}
          </h1>

          <p
            className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto opacity-80"
            style={getTypographyStyle(heroTypography?.subtitle)}
          >
            {event.tagline}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={getTypographyStyle(heroTypography?.body)}
          >
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
              <span className="font-semibold">{event.dateLabel}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
              <span className="font-semibold">{event.locationLabel}</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-current/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-current/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
