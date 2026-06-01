import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'
import type { EventConfig } from '@/types/event'

interface GalleryProps {
  event: EventConfig
}

// Editorial layout: alternating spans for a premium, magazine-like grid.
const spans = [
  'md:col-span-7 md:row-span-2',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-7',
]

export function Gallery({ event }: GalleryProps) {
  return (
    <section id="galeria" className="bg-secondary py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-light uppercase tracking-[0.4em] text-muted-foreground">
            Momentos
          </p>
          <h2 className="mt-5 text-balance font-serif text-4xl font-light tracking-tight text-foreground md:text-5xl">
            Galería
          </h2>
        </Reveal>

        <div className="mt-16 grid auto-rows-[16rem] grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[15rem]">
          {event.gallery.map((image, i) => (
            <Reveal
              key={image.src}
              delay={i * 80}
              className={cn(
                'group relative overflow-hidden rounded-md',
                spans[i % spans.length],
              )}
            >
              <Image
                src={image.src || '/placeholder.svg'}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
