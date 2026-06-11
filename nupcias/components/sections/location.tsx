'use client'

import { MapPin, Navigation } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import { getColorStyle } from '@/lib/color-utils'
import { EditableText } from '@/components/editor/editable-text'
import { useEditContext } from '@/components/editor/edit-context'
import type { EventConfig } from '@/types/event'

interface LocationProps {
  event: EventConfig
}

export function Location({ event }: LocationProps) {
  const { isEditMode, onEventChange } = useEditContext()
  
  if (event.showLocation === false) {
    return null
  }

  const locationTypography = event.typography?.location
  const locationColors = event.colors?.location?.colors
  const query = encodeURIComponent(event.location.mapQuery)
  // Ready to swap for a Google Maps Embed API key in the future.
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`

  const handleLocationChange = (field: 'venue' | 'address', value: string) => {
    if (onEventChange) {
      onEventChange({
        ...event,
        location: { ...event.location, [field]: value }
      })
    }
  }

  return (
    <section id="ubicacion" className="py-24 md:py-36" style={getColorStyle(locationColors)}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <EditableText
            value="Cómo llegar"
            onChange={() => {}}
            section="location"
            element="label"
            data={event}
            onDataChange={onEventChange}
            isEditMode={isEditMode}
            className="text-xs font-light uppercase tracking-[0.4em] opacity-60"
            style={getTypographyStyle(locationTypography?.label)}
          />
          <EditableText
            value={event.location.venue}
            onChange={(value) => handleLocationChange('venue', value)}
            section="location"
            element="title"
            data={event}
            onDataChange={onEventChange}
            isEditMode={isEditMode}
            className="mt-5 text-balance font-serif text-4xl font-light tracking-tight md:text-5xl"
            style={getTypographyStyle(locationTypography?.title)}
          />
          <EditableText
            value={event.location.address}
            onChange={(value) => handleLocationChange('address', value)}
            section="location"
            element="body"
            data={event}
            onDataChange={onEventChange}
            isEditMode={isEditMode}
            className="mx-auto mt-4 max-w-md text-pretty text-sm font-light leading-relaxed opacity-80"
            style={getTypographyStyle(locationTypography?.body)}
          />
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 overflow-hidden rounded-xl border border-current/20 shadow-lg shadow-black/5">
            <div className="relative aspect-[16/10] w-full md:aspect-[21/9] bg-current/10">
              <iframe
                title={`Mapa de ${event.location.venue}`}
                src={embedSrc}
                className="absolute inset-0 h-full w-full"
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
            className="inline-flex items-center gap-2 rounded-full bg-current px-7 py-3.5 text-xs font-light uppercase tracking-[0.25em] transition-all duration-300 hover:tracking-[0.32em]"
            style={{ backgroundColor: locationColors?.accent, color: '`#ffffff`' }}
          >
            <Navigation className="size-4" strokeWidth={1.5} />
            Cómo llegar
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-current/30 px-7 py-3.5 text-xs font-light uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-current hover:text-background"
          >
            <MapPin className="size-4" strokeWidth={1.5} />
            Ver en el mapa
          </a>
        </Reveal>
      </div>
    </section>
  )
}
