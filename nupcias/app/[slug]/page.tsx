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

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PublicInvitationPage({ params }: PageProps) {
  const { slug } = await params

  const result = await getPublicEventConfigAction({ tenantSlug: slug })

  if (!result.success || !result.data) {
    notFound()
  }

  const eventConfig = result.data.config

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
