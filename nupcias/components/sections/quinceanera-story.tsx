import Image from 'next/image'
import { Heart, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getTypographyStyle } from '@/lib/typography-utils'
import { getColorStyle } from '@/lib/color-utils'
import { EditableText } from '@/components/editor/editable-text'
import { useEditContext } from '@/components/editor/edit-context'
import type { EventConfig } from '@/types/event'

interface QuinceaneraStoryProps {
  event: EventConfig
}

export function QuinceaneraStory({ event }: QuinceaneraStoryProps) {
  const { isEditMode, onEventChange } = useEditContext()
  
  if (event.showStory === false) {
    return null
  }

  const storyTypography = event.typography?.story
  const storyColors = event.colors?.story?.colors

  const handleTextChange = (field: keyof EventConfig, value: string) => {
    if (onEventChange) {
      onEventChange({ ...event, [field]: value })
    }
  }

  const handleStoryChange = (index: number, newText: string) => {
    if (onEventChange) {
      const newStory = [...event.story]
      newStory[index] = { ...newStory[index], text: newText }
      onEventChange({ ...event, story: newStory })
    }
  }

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

          <EditableText
            value="Mi historia"
            onChange={() => {}}
            section="story"
            element="label"
            data={event}
            onDataChange={onEventChange}
            isEditMode={isEditMode}
            className="text-xs font-light uppercase tracking-[0.4em] mb-4 opacity-70"
            style={getTypographyStyle(storyTypography?.label)}
          />
          <EditableText
            value={event.storyTitle}
            onChange={(value) => handleTextChange('storyTitle', value)}
            section="story"
            element="title"
            data={event}
            onDataChange={onEventChange}
            isEditMode={isEditMode}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
            style={{ ...getTypographyStyle(storyTypography?.title), background: storyColors?.accent ? `linear-gradient(to right, ${storyColors.accent}, ${storyColors.accent}99)` : undefined, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          />
          <EditableText
            value={event.storySubtitle}
            onChange={(value) => handleTextChange('storySubtitle', value)}
            section="story"
            element="subtitle"
            data={event}
            onDataChange={onEventChange}
            isEditMode={isEditMode}
            className="text-lg font-light mb-12 opacity-80"
            style={getTypographyStyle(storyTypography?.subtitle)}
          />
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
                <EditableText
                  value={paragraph.text}
                  onChange={(value) => handleStoryChange(index, value)}
                  section="story"
                  element="body"
                  data={event}
                  onDataChange={onEventChange}
                  isEditMode={isEditMode}
                  className="text-lg leading-relaxed font-light"
                  style={getTypographyStyle(storyTypography?.body)}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={600} className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full shadow-lg" style={{ background: storyColors?.accent ? `linear-gradient(to right, ${storyColors.accent}, ${storyColors.accent}99)` : undefined }}>
            <Heart className="w-5 h-5 fill-white" />
            <EditableText
              value="15 años de amor y alegría"
              onChange={() => {}}
              section="story"
              element="title"
              data={event}
              onDataChange={onEventChange}
              isEditMode={isEditMode}
              className="font-serif text-lg"
              style={getTypographyStyle(storyTypography?.title)}
            />
            <Heart className="w-5 h-5 fill-white" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
