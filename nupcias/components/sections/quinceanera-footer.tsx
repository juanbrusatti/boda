import { Heart, Sparkles } from 'lucide-react'
import { getTypographyStyle } from '@/lib/typography-utils'
import { getColorStyle } from '@/lib/color-utils'
import type { EventConfig } from '@/types/event'

interface QuinceaneraFooterProps {
  event: EventConfig
}

export function QuinceaneraFooter({ event }: QuinceaneraFooterProps) {
  const footerTypography = event.typography?.footer
  const footerColors = event.colors?.footer?.colors

  return (
    <footer className="py-12" style={getColorStyle(footerColors)}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 fill-current/30" />
            <Sparkles className="w-6 h-6" />
            <Heart className="w-6 h-6 fill-current/30" />
          </div>
        </div>

        <h3
          className="text-2xl font-serif font-bold mb-2"
          style={getTypographyStyle(footerTypography?.body)}
        >
          {event.brand.name}
        </h3>
        <p
          className="font-light mb-6 opacity-80"
          style={getTypographyStyle(footerTypography?.body)}
        >
          {event.brand.tagline}
        </p>

        <div className="border-t border-current/30 pt-6">
          <p
            className="text-sm opacity-70"
            style={getTypographyStyle(footerTypography?.label)}
          >
            Hecho con amor para celebrar momentos especiales
          </p>
        </div>
      </div>
    </footer>
  )
}
