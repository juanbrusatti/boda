'use client'

import { getTypographyStyle } from '@/lib/typography-utils'
import { getColorStyle } from '@/lib/color-utils'
import { EditableText } from '@/components/editor/editable-text'
import { useEditContext } from '@/components/editor/edit-context'
import type { EventConfig } from '@/types/event'

interface FooterProps {
  event: EventConfig
}

export function Footer({ event }: FooterProps) {
  const { isEditMode, onEventChange } = useEditContext()
  const footerTypography = event.typography?.footer
  const footerColors = event.colors?.footer?.colors

  const handleBrandChange = (field: 'name' | 'tagline', value: string) => {
    if (onEventChange) {
      onEventChange({
        ...event,
        brand: { ...event.brand, [field]: value }
      })
    }
  }

  return (
    <footer className="py-16 text-center" style={getColorStyle(footerColors)}>
      <div className="mx-auto max-w-3xl px-6">
        <EditableText
          value={event.title}
          onChange={(value) => onEventChange?.({ ...event, title: value })}
          section="footer"
          element="body"
          data={event}
          onDataChange={onEventChange}
          isEditMode={isEditMode}
          className="font-serif text-3xl font-light tracking-tight"
          style={getTypographyStyle(footerTypography?.body)}
        />
        <EditableText
          value={event.dateLabel}
          onChange={(value) => onEventChange?.({ ...event, dateLabel: value })}
          section="footer"
          element="label"
          data={event}
          onDataChange={onEventChange}
          isEditMode={isEditMode}
          className="mt-3 text-xs font-light uppercase tracking-[0.3em] opacity-60"
          style={getTypographyStyle(footerTypography?.label)}
        />

        <span className="mx-auto mt-8 block h-px w-16 bg-current opacity-30" />

        <EditableText
          value={`Hecho con cariño en ${event.brand.name}`}
          onChange={(value) => {
            const name = value.replace('Hecho con cariño en ', '')
            handleBrandChange('name', name)
          }}
          section="footer"
          element="body"
          data={event}
          onDataChange={onEventChange}
          isEditMode={isEditMode}
          className="mt-8 text-sm font-light opacity-80"
          style={getTypographyStyle(footerTypography?.body)}
        />
        <EditableText
          value={event.brand.tagline}
          onChange={(value) => handleBrandChange('tagline', value)}
          section="footer"
          element="body"
          data={event}
          onDataChange={onEventChange}
          isEditMode={isEditMode}
          className="mt-1 text-xs font-light opacity-70"
          style={getTypographyStyle(footerTypography?.body)}
        />

        <EditableText
          value={`© ${new Date().getFullYear()} ${event.brand.name}. Todos los derechos reservados.`}
          onChange={(value) => {
            const match = value.match(/© \d{4} (.+)\. Todos los derechos reservados\./)
            if (match) {
              handleBrandChange('name', match[1])
            }
          }}
          section="footer"
          element="label"
          data={event}
          onDataChange={onEventChange}
          isEditMode={isEditMode}
          className="mt-8 text-[11px] font-light opacity-50"
          style={getTypographyStyle(footerTypography?.label)}
        />
      </div>
    </footer>
  )
}
