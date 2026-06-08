import { Hero } from '@/components/sections/hero'
import { EventInfo } from '@/components/sections/event-info'
import { Countdown } from '@/components/sections/countdown'
import { Story } from '@/components/sections/story'
import { Gallery } from '@/components/sections/gallery'
import { Location } from '@/components/sections/location'
import type { Template } from '@/data/templates'

interface TemplatePreviewProps {
  template: Template
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  return (
    <div className="space-y-0">
      <Hero event={template.data} />
      <EventInfo event={template.data} />
      <Countdown event={template.data} />
      <Story event={template.data} />
      <Gallery event={template.data} />
      <Location event={template.data} />
    </div>
  )
}
