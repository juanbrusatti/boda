import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import type { EventConfig } from '@/types/event'

interface StoryProps {
  event: EventConfig
}

export function Story({ event }: StoryProps) {
  if (event.showStory === false) {
    return null
  }

  const storyTypography = event.typography?.story
  const storyTitle = event.storyTitle || 'Dos caminos que se vuelven uno'
  const storySubtitle = event.storySubtitle || 'Nuestra historia'
  const storyImages = event.storyImages || []

  return (
    <section id="historia" className="bg-background py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
        <Reveal className="order-2 md:order-1">
          <p
            className="text-xs font-light uppercase tracking-[0.4em] text-muted-foreground"
            style={getTypographyStyle(storyTypography?.label)}
          >
            {storyTitle}
          </p>
          <h2
            className="mt-5 text-balance font-serif text-4xl font-light leading-tight tracking-tight text-foreground md:text-5xl"
            style={getTypographyStyle(storyTypography?.title)}
          >
            {storySubtitle}
          </h2>

          <div className="mt-8 flex flex-col gap-6">
            {event.story.map((paragraph, i) => (
              <p
                key={i}
                className="text-pretty text-base font-light leading-relaxed text-muted-foreground md:text-lg"
                style={getTypographyStyle(storyTypography?.body)}
              >
                {paragraph.text}
              </p>
            ))}
          </div>

          <span className="mt-10 block h-px w-20 bg-accent" />
        </Reveal>

        <Reveal delay={150} className="order-1 md:order-2">
          {storyImages.length > 0 ? (
            <div className="grid gap-4">
              {storyImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-md ${
                    storyImages.length === 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={image || '/placeholder.svg'}
                    alt={`Imagen ${index + 1} de la historia`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Sin imágenes
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
