import { notFound } from 'next/navigation'
import { getPublicEventConfigAction } from '@/app/actions/event-config'
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

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PublicInvitationPage({ params }: PageProps) {
  const { slug } = await params

  const result = await getPublicEventConfigAction({ tenantSlug: slug })

  if (!result.success) {
    throw new Error(result.error || 'Failed to load public invitation')
  }
  if (!result.data) {
    notFound()
  }

  const eventConfig = result.data.config
  const templateId = result.data.template_id

  // Render different components based on template
  if (templateId === 'quinceanera-party') {
    return (
      <div className="min-h-screen bg-background">
        <QuinceaneraHero event={eventConfig} />
        <EventInfo event={eventConfig} />
        <QuinceaneraCountdown event={eventConfig} />
        <QuinceaneraStory event={eventConfig} />
        <QuinceaneraGallery event={eventConfig} />
        <QuinceaneraLocation event={eventConfig} />
        <QuinceaneraConfirmation event={eventConfig} />
        <QuinceaneraFooter event={eventConfig} />
      </div>
    )
  }

  // Default template (classic wedding, birthday, etc.)
  return (
    <div className="min-h-screen bg-background">
      <Hero event={eventConfig} />
      <EventInfo event={eventConfig} />
      <Countdown event={eventConfig} />
      <Story event={eventConfig} />
      <Gallery event={eventConfig} />
      <Location event={eventConfig} />
      <Confirmation event={eventConfig} />
      <Footer event={eventConfig} />
    </div>
  )
}
