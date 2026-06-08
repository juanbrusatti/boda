'use client'

import { useState } from 'react'
import { Heart, Sparkles, Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import { getColorStyle } from '@/lib/color-utils'
import type { EventConfig } from '@/types/event'

interface QuinceaneraConfirmationProps {
  event: EventConfig
}

export function QuinceaneraConfirmation({ event }: QuinceaneraConfirmationProps) {
  const [confirmed, setConfirmed] = useState(false)
  const rsvpTypography = event.typography?.rsvp
  const rsvpColors = event.colors?.rsvp?.colors

  if (event.showRSVP === false) {
    return null
  }

  return (
    <section id="rsvp" className="py-28 md:py-40" style={getColorStyle(rsvpColors)}>
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full">
              <Heart className="w-6 h-6 fill-white/30" />
              <Sparkles className="w-6 h-6" />
              <Heart className="w-6 h-6 fill-white/30" />
            </div>
          </div>

          <h2
            className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight"
            style={getTypographyStyle(rsvpTypography?.title)}
          >
            {event.rsvp.heading}
          </h2>

          <p
            className="text-lg font-light mb-10 max-w-md mx-auto leading-relaxed opacity-90"
            style={getTypographyStyle(rsvpTypography?.body)}
          >
            {event.rsvp.subheading}
          </p>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setConfirmed(true)}
              aria-live="polite"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 disabled:opacity-90 disabled:hover:scale-100"
              style={{ backgroundColor: rsvpColors?.background || '#ffffff', color: rsvpColors?.text || '#000000' }}
              disabled={confirmed}
            >
              {confirmed ? (
                <>
                  <Check className="w-5 h-5" style={{ color: rsvpColors?.accent || '#ec4899' }} />
                  <span className="font-serif text-lg">¡Gracias por confirmar!</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5" style={{ color: rsvpColors?.accent || '#ec4899' }} />
                  <span className="font-serif text-lg">{event.rsvp.buttonLabel}</span>
                  <Heart className="w-5 h-5" style={{ color: rsvpColors?.accent || '#ec4899' }} />
                </>
              )}
            </button>
          </div>

          <p
            className="mt-10 text-sm font-light tracking-wider uppercase opacity-70"
            style={getTypographyStyle(rsvpTypography?.label)}
          >
            {event.rsvp.deadline}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
