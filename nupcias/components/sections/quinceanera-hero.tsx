import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import type { EventConfig } from '@/types/event'

interface QuinceaneraHeroProps {
  event: EventConfig
}

export function QuinceaneraHero({ event }: QuinceaneraHeroProps) {
  const heroTypography = event.typography?.hero

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <Reveal>
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span
                className="text-sm font-medium text-pink-600 tracking-wider uppercase"
                style={getTypographyStyle(heroTypography?.label)}
              >
                Mis 15 Años
              </span>
              <Sparkles className="w-5 h-5 text-pink-500" />
            </div>
          </div>

          <h1
            className="text-6xl md:text-8xl font-serif font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent mb-6 leading-tight"
            style={getTypographyStyle(heroTypography?.title)}
          >
            {event.title}
          </h1>

          <p
            className="text-xl md:text-2xl text-purple-800 font-light mb-8 max-w-2xl mx-auto"
            style={getTypographyStyle(heroTypography?.subtitle)}
          >
            {event.tagline}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center text-purple-700"
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
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-purple-400 rounded-full" />
        </div>
      </div>
    </section>
  )
}
