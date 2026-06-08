import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import { getColorStyle } from '@/lib/color-utils'
import type { EventConfig } from '@/types/event'

interface QuinceaneraLocationProps {
  event: EventConfig
}

export function QuinceaneraLocation({ event }: QuinceaneraLocationProps) {
  if (event.showLocation === false) {
    return null
  }

  const locationTypography = event.typography?.location
  const locationColors = event.colors?.location?.colors
  const query = encodeURIComponent(event.location.mapQuery)
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`

  return (
    <section id="ubicacion" className="py-24 md:py-36" style={getColorStyle(locationColors)}>
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <MapPin className="w-5 h-5" style={{ color: locationColors?.accent || '#ec4899' }} />
              <span
                className="text-sm font-medium tracking-wider uppercase"
                style={getTypographyStyle(locationTypography?.label)}
              >
                Ubicación
              </span>
              <MapPin className="w-5 h-5" style={{ color: locationColors?.accent || '#ec4899' }} />
            </div>
          </div>

          <h2
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
            style={{ ...getTypographyStyle(locationTypography?.title), background: locationColors?.accent ? `linear-gradient(to right, ${locationColors.accent}, ${locationColors.accent}99)` : undefined, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {event.location.venue}
          </h2>
          <p
            className="text-lg font-light mb-12 opacity-80"
            style={getTypographyStyle(locationTypography?.body)}
          >
            {event.location.address}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-current/20">
            <div className="relative aspect-video">
              <iframe
                title={`Mapa de ${event.location.venue}`}
                src={embedSrc}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="p-6 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ background: locationColors?.accent ? `linear-gradient(to right, ${locationColors.accent}, ${locationColors.accent}99)` : undefined }}
              >
                <Navigation className="w-5 h-5" />
                <span className="font-medium">Cómo llegar</span>
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${query}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-current/30"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="font-medium">Ver en Google Maps</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
