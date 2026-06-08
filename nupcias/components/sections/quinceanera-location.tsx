import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import type { EventConfig } from '@/types/event'

interface QuinceaneraLocationProps {
  event: EventConfig
}

export function QuinceaneraLocation({ event }: QuinceaneraLocationProps) {
  if (event.showLocation === false) {
    return null
  }

  const locationTypography = event.typography?.location
  const query = encodeURIComponent(event.location.mapQuery)
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`

  return (
    <section id="ubicacion" className="bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 py-24 md:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <MapPin className="w-5 h-5 text-pink-500" />
              <span
                className="text-sm font-medium text-purple-600 tracking-wider uppercase"
                style={getTypographyStyle(locationTypography?.label)}
              >
                Ubicación
              </span>
              <MapPin className="w-5 h-5 text-pink-500" />
            </div>
          </div>

          <h2
            className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent mb-4"
            style={getTypographyStyle(locationTypography?.title)}
          >
            {event.location.venue}
          </h2>
          <p
            className="text-lg text-purple-700 font-light mb-12"
            style={getTypographyStyle(locationTypography?.body)}
          >
            {event.location.address}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-pink-100">
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
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Navigation className="w-5 h-5" />
                <span className="font-medium">Cómo llegar</span>
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${query}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200"
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
