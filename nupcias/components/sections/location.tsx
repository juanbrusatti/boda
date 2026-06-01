import { MapPin, Navigation } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import type { EventConfig } from '@/types/event'

interface LocationProps {
  event: EventConfig
}

export function Location({ event }: LocationProps) {
  const query = encodeURIComponent(event.location.mapQuery)
  // Ready to swap for a Google Maps Embed API key in the future.
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`

  return (
    <section id="ubicacion" className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-light uppercase tracking-[0.4em] text-muted-foreground">
            Cómo llegar
          </p>
          <h2 className="mt-5 text-balance font-serif text-4xl font-light tracking-tight text-foreground md:text-5xl">
            {event.location.venue}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-sm font-light leading-relaxed text-muted-foreground">
            {event.location.address}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 overflow-hidden rounded-md border border-border">
            <div className="relative aspect-[16/10] w-full md:aspect-[21/9]">
              <iframe
                title={`Mapa de ${event.location.venue}`}
                src={embedSrc}
                className="absolute inset-0 h-full w-full grayscale-[0.3]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={250} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-light uppercase tracking-[0.25em] text-primary-foreground transition-all duration-300 hover:tracking-[0.32em]"
          >
            <Navigation className="size-4" strokeWidth={1.5} />
            Cómo llegar
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3.5 text-xs font-light uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            <MapPin className="size-4" strokeWidth={1.5} />
            Ver en el mapa
          </a>
        </Reveal>
      </div>
    </section>
  )
}
