'use client'

import { useCountdown } from '@/lib/use-countdown'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import type { EventConfig } from '@/types/event'

interface CountdownProps {
  event: EventConfig
}

export function Countdown({ event }: CountdownProps) {
  const timeLeft = useCountdown(event.dateISO)
  const countdownTypography = event.typography?.countdown

  if (event.showCountdown === false) {
    return null
  }

  const units = [
    { label: 'Días', value: timeLeft?.days },
    { label: 'Horas', value: timeLeft?.hours },
    { label: 'Minutos', value: timeLeft?.minutes },
    { label: 'Segundos', value: timeLeft?.seconds },
  ]

  return (
    <section className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <p
            className="text-xs font-light uppercase tracking-[0.4em] text-primary-foreground/70"
            style={getTypographyStyle(countdownTypography?.label)}
          >
            {event.countdownTitle || 'Cuenta regresiva'}
          </p>
          <h2
            className="mt-4 font-serif text-3xl font-light tracking-tight md:text-4xl"
            style={getTypographyStyle(countdownTypography?.title)}
          >
            {timeLeft?.isPast ? '¡Hoy es el gran día!' : (event.countdownSubtitle || 'Falta cada vez menos')}
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center rounded-md border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-8 backdrop-blur-sm"
              >
                <span
                  className="font-serif text-5xl font-light tabular-nums tracking-tight md:text-6xl"
                  style={getTypographyStyle(countdownTypography?.body)}
                >
                  {unit.value === undefined ? '··' : String(unit.value).padStart(2, '0')}
                </span>
                <span
                  className="mt-3 text-[10px] font-light uppercase tracking-[0.3em] text-primary-foreground/70"
                  style={getTypographyStyle(countdownTypography?.label)}
                >
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
