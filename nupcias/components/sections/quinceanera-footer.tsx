import { Heart, Sparkles } from 'lucide-react'
import { getTypographyStyle } from '@/lib/typography-utils'
import type { EventConfig } from '@/types/event'

interface QuinceaneraFooterProps {
  event: EventConfig
}

export function QuinceaneraFooter({ event }: QuinceaneraFooterProps) {
  const footerTypography = event.typography?.footer

  return (
    <footer className="bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white py-12">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-pink-300 fill-pink-300/30" />
            <Sparkles className="w-6 h-6 text-pink-300" />
            <Heart className="w-6 h-6 text-pink-300 fill-pink-300/30" />
          </div>
        </div>

        <h3
          className="text-2xl font-serif font-bold mb-2"
          style={getTypographyStyle(footerTypography?.body)}
        >
          {event.brand.name}
        </h3>
        <p
          className="text-pink-200 font-light mb-6"
          style={getTypographyStyle(footerTypography?.body)}
        >
          {event.brand.tagline}
        </p>

        <div className="border-t border-pink-700/50 pt-6">
          <p
            className="text-sm text-pink-300/70"
            style={getTypographyStyle(footerTypography?.label)}
          >
            Hecho con amor para celebrar momentos especiales
          </p>
        </div>
      </div>
    </footer>
  )
}
