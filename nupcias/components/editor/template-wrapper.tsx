'use client'

import { useState, useEffect } from 'react'
import { Hero } from '@/components/sections/hero'
import { EventInfo } from '@/components/sections/event-info'
import { Countdown } from '@/components/sections/countdown'
import { Story } from '@/components/sections/story'
import { Gallery } from '@/components/sections/gallery'
import { Location } from '@/components/sections/location'
import { Footer } from '@/components/sections/footer'
import { Confirmation } from '@/components/sections/confirmation'
import { QuinceaneraHero } from '@/components/sections/quinceanera-hero'
import { QuinceaneraCountdown } from '@/components/sections/quinceanera-countdown'
import { QuinceaneraStory } from '@/components/sections/quinceanera-story'
import { QuinceaneraGallery } from '@/components/sections/quinceanera-gallery'
import { QuinceaneraLocation } from '@/components/sections/quinceanera-location'
import { QuinceaneraConfirmation } from '@/components/sections/quinceanera-confirmation'
import { QuinceaneraFooter } from '@/components/sections/quinceanera-footer'
import { EditMode } from './edit-mode'
import { EditProvider } from './edit-context'
import type { EventConfig } from '@/types/event'

interface TemplateWrapperProps {
  eventConfig: EventConfig
  templateId: string
  isEditMode?: boolean
  onDataChange?: (event: EventConfig) => void
}

export function TemplateWrapper({ eventConfig, templateId, isEditMode = false, onDataChange }: TemplateWrapperProps) {
  const [event, setEvent] = useState<EventConfig>(eventConfig)

  useEffect(() => {
    setEvent(eventConfig)
  }, [eventConfig])

  const handleEventChange = (newEvent: EventConfig) => {
    setEvent(newEvent)
    if (onDataChange) {
      onDataChange(newEvent)
    }
  }

  return (
    <EditProvider isEditMode={isEditMode} event={event} onEventChange={handleEventChange}>
      <EditMode event={event} onEventChange={handleEventChange}>
        {templateId === 'quinceanera-party' ? (
          <div className="min-h-screen bg-background">
            <QuinceaneraHero event={event} />
            <EventInfo event={event} />
            <QuinceaneraCountdown event={event} />
            <QuinceaneraStory event={event} />
            <QuinceaneraGallery event={event} />
            <QuinceaneraLocation event={event} />
            <QuinceaneraConfirmation event={event} />
            <QuinceaneraFooter event={event} />
          </div>
        ) : (
          <div className="min-h-screen bg-background">
            <Hero event={event} />
            <EventInfo event={event} />
            <Countdown event={event} />
            <Story event={event} />
            <Gallery event={event} />
            <Location event={event} />
            <Confirmation event={event} />
            <Footer event={event} />
          </div>
        )}
      </EditMode>
    </EditProvider>
  )
}
