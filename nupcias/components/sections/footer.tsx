import { getTypographyStyle } from '@/lib/typography-utils'
import { getColorStyle } from '@/lib/color-utils'
import type { EventConfig } from '@/types/event'

interface FooterProps {
  event: EventConfig
}

export function Footer({ event }: FooterProps) {
  const footerTypography = event.typography?.footer
  const footerColors = event.colors?.footer?.colors

  return (
    <footer className="py-16 text-center" style={getColorStyle(footerColors)}>
      <div className="mx-auto max-w-3xl px-6">
        <p
          className="font-serif text-3xl font-light tracking-tight"
          style={getTypographyStyle(footerTypography?.body)}
        >
          {event.title}
        </p>
        <p
          className="mt-3 text-xs font-light uppercase tracking-[0.3em] opacity-60"
          style={getTypographyStyle(footerTypography?.label)}
        >
          {event.dateLabel}
        </p>

        <span className="mx-auto mt-8 block h-px w-16 bg-current opacity-30" />

        <p
          className="mt-8 text-sm font-light opacity-80"
          style={getTypographyStyle(footerTypography?.body)}
        >
          Hecho con cariño en{' '}
          <span className="font-serif text-base">{event.brand.name}</span>
        </p>
        <p
          className="mt-1 text-xs font-light opacity-70"
          style={getTypographyStyle(footerTypography?.body)}
        >
          {event.brand.tagline}
        </p>

        <p
          className="mt-8 text-[11px] font-light opacity-50"
          style={getTypographyStyle(footerTypography?.label)}
        >
          © {new Date().getFullYear()} {event.brand.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
