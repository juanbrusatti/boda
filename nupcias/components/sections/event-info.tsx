'use client'

import { CalendarDays, Clock, MapPin, Sparkles, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { EditableText } from '@/components/editor/editable-text'
import { useEditContext } from '@/components/editor/edit-context'
import type { EventConfig } from '@/types/event'
import { iconMap } from '@/lib/icons'

interface EventInfoProps {
  event: EventConfig
}

const defaultIcons = [CalendarDays, Clock, MapPin, Sparkles]

export function EventInfo({ event }: EventInfoProps) {
  const { isEditMode, onEventChange } = useEditContext()

  const handleDetailChange = (index: number, field: 'label' | 'value' | 'caption', value: string) => {
    if (onEventChange) {
      const newDetails = [...event.details]
      newDetails[index] = { ...newDetails[index], [field]: value }
      onEventChange({ ...event, details: newDetails })
    }
  }

  return (
    <section id="evento" className="bg-secondary py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-light uppercase tracking-[0.4em] text-muted-foreground">
            Detalles del evento
          </p>
          <h2 className="mt-5 text-balance font-serif text-4xl font-light tracking-tight text-foreground md:text-5xl">
            Todo lo que necesitás saber
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {event.details.map((detail, i) => {
            const Icon = detail.icon && iconMap[detail.icon] ? iconMap[detail.icon] : defaultIcons[i % defaultIcons.length]
            return (
              <Reveal key={detail.label} delay={i * 100}>
                <div className="group flex h-full flex-col items-center rounded-md border border-border bg-card px-6 py-10 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/10">
                  <span className="flex size-14 items-center justify-center rounded-full border border-border text-accent transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <EditableText
                    value={detail.label}
                    onChange={(value) => handleDetailChange(i, 'label', value)}
                    section="details"
                    element="label"
                    data={event}
                    onDataChange={onEventChange}
                    isEditMode={isEditMode}
                    className="mt-6 text-[10px] font-light uppercase tracking-[0.3em] text-muted-foreground"
                  />
                  <EditableText
                    value={detail.value}
                    onChange={(value) => handleDetailChange(i, 'value', value)}
                    section="details"
                    element="title"
                    data={event}
                    onDataChange={onEventChange}
                    isEditMode={isEditMode}
                    className="mt-3 font-serif text-2xl font-light leading-tight text-foreground"
                  />
                  {detail.caption ? (
                    <EditableText
                      value={detail.caption}
                      onChange={(value) => handleDetailChange(i, 'caption', value)}
                      section="details"
                      element="body"
                      data={event}
                      onDataChange={onEventChange}
                      isEditMode={isEditMode}
                      className="mt-2 text-sm font-light text-muted-foreground"
                    />
                  ) : null}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
