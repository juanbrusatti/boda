import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import type { EventConfig } from '@/types/event'

interface StoryProps {
  event: EventConfig
}

export function Story({ event }: StoryProps) {
  return (
    <section id="historia" className="bg-background py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
        <Reveal className="order-2 md:order-1">
          <p className="text-xs font-light uppercase tracking-[0.4em] text-muted-foreground">
            {event.storyHeading}
          </p>
          <h2 className="mt-5 text-balance font-serif text-4xl font-light leading-tight tracking-tight text-foreground md:text-5xl">
            Dos caminos que se vuelven uno
          </h2>

          <div className="mt-8 flex flex-col gap-6">
            {event.story.map((paragraph, i) => (
              <p
                key={i}
                className="text-pretty text-base font-light leading-relaxed text-muted-foreground md:text-lg"
              >
                {paragraph.text}
              </p>
            ))}
          </div>

          <span className="mt-10 block h-px w-20 bg-accent" />
        </Reveal>

        <Reveal delay={150} className="order-1 md:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            <Image
              src={event.storyImage || '/placeholder.svg'}
              alt="Los novios caminando juntos al atardecer"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
