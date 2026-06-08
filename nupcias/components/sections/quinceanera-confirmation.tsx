'use client'

import { useState } from 'react'
import { Heart, Sparkles, Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import type { EventConfig } from '@/types/event'

interface QuinceaneraConfirmationProps {
  event: EventConfig
}

export function QuinceaneraConfirmation({ event }: QuinceaneraConfirmationProps) {
  const [confirmed, setConfirmed] = useState(false)
  const rsvpTypography = event.typography?.rsvp

  if (event.showRSVP === false) {
    return null
  }

  return (
    <section id="rsvp" className="bg-gradient-to-br from-pink-500 via-purple-500 to-rose-500 py-28 md:py-40">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full">
              <Heart className="w-6 h-6 text-white fill-white/30" />
              <Sparkles className="w-6 h-6 text-white" />
              <Heart className="w-6 h-6 text-white fill-white/30" />
            </div>
          </div>

          <h2
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight"
            style={getTypographyStyle(rsvpTypography?.title)}
          >
            {event.rsvp.heading}
          </h2>

          <p
            className="text-lg text-white/90 font-light mb-10 max-w-md mx-auto leading-relaxed"
            style={getTypographyStyle(rsvpTypography?.body)}
          >
            {event.rsvp.subheading}
          </p>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setConfirmed(true)}
              aria-live="polite"
              className="group inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 disabled:opacity-90 disabled:hover:scale-100"
              disabled={confirmed}
            >
              {confirmed ? (
                <>
                  <Check className="w-5 h-5 text-pink-500" />
                  <span className="font-serif text-lg">¡Gracias por confirmar!</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-200" />
                  <span className="font-serif text-lg">{event.rsvp.buttonLabel}</span>
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-200" />
                </>
              )}
            </button>
          </div>

          <p
            className="mt-10 text-sm font-light text-white/70 tracking-wider uppercase"
            style={getTypographyStyle(rsvpTypography?.label)}
          >
            {event.rsvp.deadline}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
