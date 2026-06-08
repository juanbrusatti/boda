import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import { getColorStyle } from '@/lib/color-utils'
import type { EventConfig } from '@/types/event'

interface QuinceaneraGalleryProps {
  event: EventConfig
}

export function QuinceaneraGallery({ event }: QuinceaneraGalleryProps) {
  if (event.showGallery === false) {
    return null
  }

  const galleryTypography = event.typography?.gallery
  const galleryColors = event.colors?.gallery?.colors

  return (
    <section id="galeria" className="py-24 md:py-36" style={getColorStyle(galleryColors)}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <Sparkles className="w-5 h-5" style={{ color: galleryColors?.accent || '#ec4899' }} />
              <span
                className="text-sm font-medium tracking-wider uppercase"
                style={getTypographyStyle(galleryTypography?.label)}
              >
                Momentos especiales
              </span>
              <Sparkles className="w-5 h-5" style={{ color: galleryColors?.accent || '#ec4899' }} />
            </div>
          </div>

          <h2
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
            style={{ ...getTypographyStyle(galleryTypography?.title), background: galleryColors?.accent ? `linear-gradient(to right, ${galleryColors.accent}, ${galleryColors.accent}99)` : undefined, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Galería
          </h2>
        </Reveal>

        <div className="mt-16 grid auto-rows-[16rem] grid-cols-1 gap-6 md:grid-cols-3 md:auto-rows-[15rem]">
          {event.gallery.map((image, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              className="group relative overflow-hidden rounded-3xl shadow-2xl"
            >
              <Image
                src={image.src || '/placeholder.svg'}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-current/50 via-current/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4">
                <p
                  className="text-white font-light text-sm bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full"
                  style={getTypographyStyle(galleryTypography?.label)}
                >
                  {image.alt}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
