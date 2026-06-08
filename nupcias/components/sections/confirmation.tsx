'use client'

import { useState } from 'react'
import { Check, Heart } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import type { EventConfig } from '@/types/event'

interface ConfirmationProps {
  event: EventConfig
}

export function Confirmation({ event }: ConfirmationProps) {
  // Visual-only acknowledgement. No data is persisted yet — this section is
  // intentionally prepared for a future RSVP form backed by Supabase.
  const [confirmed, setConfirmed] = useState(false)
  const rsvpTypography = event.typography?.rsvp

  if (event.showRSVP === false) {
    return null
  }

  return (
    <section id="rsvp" className="relative overflow-hidden bg-primary py-28 text-primary-foreground md:py-40">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-primary-foreground/20 text-accent">
            <Heart className="size-5" strokeWidth={1.5} />
          </span>

          <h2
            className="mt-8 text-balance font-serif text-4xl font-light leading-tight tracking-tight md:text-5xl"
            style={getTypographyStyle(rsvpTypography?.title)}
          >
            {event.rsvp.heading}
          </h2>

          <p
            className="mx-auto mt-6 max-w-md text-pretty text-base font-light leading-relaxed text-primary-foreground/75"
            style={getTypographyStyle(rsvpTypography?.body)}
          >
            {event.rsvp.subheading}
          </p>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setConfirmed(true)}
              aria-live="polite"
              className="group inline-flex items-center gap-3 rounded-full bg-background px-9 py-4 text-xs font-light uppercase tracking-[0.25em] text-foreground transition-all duration-300 hover:tracking-[0.32em] disabled:opacity-90"
              disabled={confirmed}
            >
              {confirmed ? (
                <>
                  <Check className="size-4 text-accent" strokeWidth={2} />
                  ¡Gracias por confirmar!
                </>
              ) : (
                event.rsvp.buttonLabel
              )}
            </button>
          </div>

          <p
            className="mt-8 text-[11px] font-light uppercase tracking-[0.25em] text-primary-foreground/55"
            style={getTypographyStyle(rsvpTypography?.label)}
          >
            {event.rsvp.deadline}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
