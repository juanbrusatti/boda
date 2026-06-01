import type { EventConfig } from '@/types/event'

interface FooterProps {
  event: EventConfig
}

export function Footer({ event }: FooterProps) {
  return (
    <footer className="bg-background py-16 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <p className="font-serif text-3xl font-light tracking-tight text-foreground">
          {event.title}
        </p>
        <p className="mt-3 text-xs font-light uppercase tracking-[0.3em] text-muted-foreground">
          {event.dateLabel}
        </p>

        <span className="mx-auto mt-8 block h-px w-16 bg-border" />

        <p className="mt-8 text-sm font-light text-muted-foreground">
          Hecho con cariño en{' '}
          <span className="font-serif text-base text-foreground">{event.brand.name}</span>
        </p>
        <p className="mt-1 text-xs font-light text-muted-foreground/80">{event.brand.tagline}</p>

        <p className="mt-8 text-[11px] font-light text-muted-foreground/60">
          © {new Date().getFullYear()} {event.brand.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
