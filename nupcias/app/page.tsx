import { event } from '@/data/event'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/sections/hero'
import { Countdown } from '@/components/sections/countdown'
import { Story } from '@/components/sections/story'
import { EventInfo } from '@/components/sections/event-info'
import { Location } from '@/components/sections/location'
import { Gallery } from '@/components/sections/gallery'
import { Confirmation } from '@/components/sections/confirmation'
import { Footer } from '@/components/sections/footer'

// Build a short monogram from the title (e.g. "María & Juan" -> "M&J").
function getMonogram(title: string): string {
  const parts = title.split('&').map((p) => p.trim())
  if (parts.length === 2) {
    return `${parts[0].charAt(0)}&${parts[1].charAt(0)}`.toUpperCase()
  }
  return title.charAt(0).toUpperCase()
}

export default function Page() {
  return (
    <>
      <SiteNav monogram={getMonogram(event.title)} />
      <main>
        <Hero event={event} />
        <Countdown event={event} />
        <Story event={event} />
        <EventInfo event={event} />
        <Location event={event} />
        <Gallery event={event} />
        <Confirmation event={event} />
      </main>
      <Footer event={event} />
    </>
  )
}
