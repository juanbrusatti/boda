'use client'

import { Sparkles, Clock, Calendar, MapPin } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useCountdown } from '@/lib/use-countdown'
import { getTypographyStyle } from '@/lib/typography-utils'
import { getColorStyle } from '@/lib/color-utils'
import { EditableText } from '@/components/editor/editable-text'
import { useEditContext } from '@/components/editor/edit-context'
import type { EventConfig } from '@/types/event'

interface QuinceaneraCountdownProps {
  event: EventConfig
}

export function QuinceaneraCountdown({ event }: QuinceaneraCountdownProps) {
  const { isEditMode, onEventChange } = useEditContext()
  const timeLeft = useCountdown(event.dateISO)
  const countdownTypography = event.typography?.countdown
  const countdownColors = event.colors?.countdown?.colors

  const handleTextChange = (field: keyof EventConfig, value: string) => {
    if (onEventChange) {
      onEventChange({ ...event, [field]: value })
    }
  }

  if (event.showCountdown === false) {
    return null
  }

  const units = [
    { label: 'Días', value: timeLeft?.days },
    { label: 'Horas', value: timeLeft?.hours },
    { label: 'Minutos', value: timeLeft?.minutes },
    { label: 'Segundos', value: timeLeft?.seconds },
  ]

  return (
    <section className="py-24 md:py-36" style={getColorStyle(countdownColors)}>
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <Clock className="w-5 h-5" style={{ color: countdownColors?.accent || '#ec4899' }} />
              <EditableText
                value="Cuenta regresiva"
                onChange={() => {}}
                section="countdown"
                element="label"
                data={event}
                onDataChange={onEventChange}
                isEditMode={isEditMode}
                className="text-sm font-medium tracking-wider uppercase"
                style={getTypographyStyle(countdownTypography?.label)}
              />
              <Sparkles className="w-5 h-5" style={{ color: countdownColors?.accent || '#ec4899' }} />
            </div>
          </div>

          <EditableText
            value={event.countdownTitle}
            onChange={(value) => handleTextChange('countdownTitle', value)}
            section="countdown"
            element="title"
            data={event}
            onDataChange={onEventChange}
            isEditMode={isEditMode}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
            style={{ ...getTypographyStyle(countdownTypography?.title), background: countdownColors?.accent ? `linear-gradient(to right, ${countdownColors.accent}, ${countdownColors.accent}99)` : undefined, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          />
          <EditableText
            value={timeLeft?.isPast ? '¡Hoy es el gran día!' : event.countdownSubtitle}
            onChange={(value) => handleTextChange('countdownSubtitle', value)}
            section="countdown"
            element="subtitle"
            data={event}
            onDataChange={onEventChange}
            isEditMode={isEditMode}
            className="text-lg font-light mb-12 opacity-80"
            style={getTypographyStyle(countdownTypography?.body)}
          />
        </Reveal>

        <Reveal delay={200} className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-current/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {units.map((unit, index) => (
              <div key={unit.label} className="text-center">
                <div className="bg-gradient-to-br text-white rounded-2xl p-6 mb-3 shadow-lg" style={{ background: countdownColors?.accent ? `linear-gradient(to bottom right, ${countdownColors.accent}, ${countdownColors.accent}99)` : undefined }}>
                  <span
                    className="text-4xl md:text-5xl font-serif font-bold block"
                    style={getTypographyStyle(countdownTypography?.body)}
                  >
                    {unit.value === undefined ? '··' : String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <span
                  className="text-sm font-medium uppercase tracking-wider opacity-70"
                  style={getTypographyStyle(countdownTypography?.label)}
                >
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-current/20">
            <div
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
              style={getTypographyStyle(countdownTypography?.body)}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" style={{ color: countdownColors?.accent || '#ec4899' }} />
                <EditableText
                  value={event.dateLabel}
                  onChange={(value) => handleTextChange('dateLabel', value)}
                  section="countdown"
                  element="body"
                  data={event}
                  onDataChange={onEventChange}
                  isEditMode={isEditMode}
                  className="font-semibold"
                  style={getTypographyStyle(countdownTypography?.body)}
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" style={{ color: countdownColors?.accent || '#ec4899' }} />
                <EditableText
                  value={event.locationLabel}
                  onChange={(value) => handleTextChange('locationLabel', value)}
                  section="countdown"
                  element="body"
                  data={event}
                  onDataChange={onEventChange}
                  isEditMode={isEditMode}
                  className="font-semibold"
                  style={getTypographyStyle(countdownTypography?.body)}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
