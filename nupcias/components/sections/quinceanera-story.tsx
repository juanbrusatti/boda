import Image from 'next/image'
import { Heart, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import { getColorStyle } from '@/lib/color-utils'
import type { EventConfig } from '@/types/event'

interface QuinceaneraStoryProps {
  event: EventConfig
}

export function QuinceaneraStory({ event }: QuinceaneraStoryProps) {
  if (event.showStory === false) {
    return null
  }

  const storyTypography = event.typography?.story
  const storyColors = event.colors?.story?.colors

  return (
    <section id="historia" className="py-24 md:py-36" style={getColorStyle(storyColors)}>
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6" style={{ color: storyColors?.accent || '#ec4899' }} />
              <Sparkles className="w-6 h-6" style={{ color: storyColors?.accent || '#ec4899' }} />
              <Heart className="w-6 h-6" style={{ color: storyColors?.accent || '#ec4899' }} />
            </div>
          </div>

          <p
            className="text-xs font-light uppercase tracking-[0.4em] mb-4 opacity-70"
            style={getTypographyStyle(storyTypography?.label)}
          >
            Mi historia
          </p>
          <h2
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
            style={{ ...getTypographyStyle(storyTypography?.title), background: storyColors?.accent ? `linear-gradient(to right, ${storyColors.accent}, ${storyColors.accent}99)` : undefined, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {event.storyTitle}
          </h2>
          <p
            className="text-lg font-light mb-12 opacity-80"
            style={getTypographyStyle(storyTypography?.subtitle)}
          >
            {event.storySubtitle}
          </p>
        </Reveal>

        {event.storyImages && event.storyImages.length > 0 && (
          <Reveal delay={200} className="mb-12">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={event.storyImages[0] || '/placeholder.svg'}
                alt="Foto de la quinceañera"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-current/30 to-transparent" />
            </div>
          </Reveal>
        )}

        <div className="space-y-8">
          {event.story.map((paragraph, index) => (
            <Reveal key={index} delay={300 + index * 100}>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-current/20">
                <p
                  className="text-lg leading-relaxed font-light"
                  style={getTypographyStyle(storyTypography?.body)}
                >
                  {paragraph.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={600} className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full shadow-lg" style={{ background: storyColors?.accent ? `linear-gradient(to right, ${storyColors.accent}, ${storyColors.accent}99)` : undefined }}>
            <Heart className="w-5 h-5 fill-white" />
            <span
              className="font-serif text-lg"
              style={getTypographyStyle(storyTypography?.title)}
            >
              15 años de amor y alegría
            </span>
            <Heart className="w-5 h-5 fill-white" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
