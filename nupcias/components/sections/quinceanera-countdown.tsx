'use client'

import { Sparkles, Clock, Calendar, MapPin } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useCountdown } from '@/lib/use-countdown'
import { getTypographyStyle } from '@/lib/typography-utils'
import type { EventConfig } from '@/types/event'

interface QuinceaneraCountdownProps {
  event: EventConfig
}

export function QuinceaneraCountdown({ event }: QuinceaneraCountdownProps) {
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
    <section className="bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 py-24 md:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <Clock className="w-5 h-5 text-purple-500" />
              <span
                className="text-sm font-medium text-purple-600 tracking-wider uppercase"
                style={getTypographyStyle(countdownTypography?.label)}
              >
                Cuenta regresiva
              </span>
              <Sparkles className="w-5 h-5 text-pink-500" />
            </div>
          </div>

          <h2
            className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent mb-4"
            style={getTypographyStyle(countdownTypography?.title)}
          >
            {event.countdownTitle}
          </h2>
          <p
            className="text-lg text-purple-700 font-light mb-12"
            style={getTypographyStyle(countdownTypography?.body)}
          >
            {timeLeft?.isPast ? '¡Hoy es el gran día!' : event.countdownSubtitle}
          </p>
        </Reveal>

        <Reveal delay={200} className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {units.map((unit, index) => (
              <div key={unit.label} className="text-center">
                <div className={`bg-gradient-to-br text-white rounded-2xl p-6 mb-3 shadow-lg ${
                  index === 0 ? 'from-pink-500 to-purple-500' :
                  index === 1 ? 'from-purple-500 to-rose-500' :
                  index === 2 ? 'from-rose-500 to-pink-500' :
                  'from-pink-500 to-purple-500'
                }`}>
                  <span
                    className="text-4xl md:text-5xl font-serif font-bold block"
                    style={getTypographyStyle(countdownTypography?.body)}
                  >
                    {unit.value === undefined ? '··' : String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <span
                  className="text-sm font-medium text-purple-600 uppercase tracking-wider"
                  style={getTypographyStyle(countdownTypography?.label)}
                >
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-pink-200">
            <div
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
              style={getTypographyStyle(countdownTypography?.body)}
            >
              <div className="flex items-center gap-2 text-purple-700">
                <Calendar className="w-5 h-5 text-pink-500" />
                <span className="font-semibold">{event.dateLabel}</span>
              </div>
              <div className="flex items-center gap-2 text-purple-700">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span className="font-semibold">{event.locationLabel}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
