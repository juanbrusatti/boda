'use client'

import { Heart, Sparkles } from 'lucide-react'
import { getTypographyStyle } from '@/lib/typography-utils'
import { getColorStyle } from '@/lib/color-utils'
import { EditableText } from '@/components/editor/editable-text'
import { useEditContext } from '@/components/editor/edit-context'
import type { EventConfig } from '@/types/event'

interface QuinceaneraFooterProps {
  event: EventConfig
}

export function QuinceaneraFooter({ event }: QuinceaneraFooterProps) {
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
    <footer className="py-12" style={getColorStyle(footerColors)}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 fill-current/30" />
            <Sparkles className="w-6 h-6" />
            <Heart className="w-6 h-6 fill-current/30" />
          </div>
        </div>

        <EditableText
          value={event.brand.name}
          onChange={(value) => handleBrandChange('name', value)}
          section="footer"
          element="body"
          data={event}
          onDataChange={onEventChange}
          isEditMode={isEditMode}
          className="text-2xl font-serif font-bold mb-2"
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
          className="font-light mb-6 opacity-80"
          style={getTypographyStyle(footerTypography?.body)}
        />

        <div className="border-t border-current/30 pt-6">
          <EditableText
            value="Hecho con amor para celebrar momentos especiales"
            onChange={() => {}}
            section="footer"
            element="label"
            data={event}
            onDataChange={onEventChange}
            isEditMode={isEditMode}
            className="text-sm opacity-70"
            style={getTypographyStyle(footerTypography?.label)}
          />
        </div>
      </div>
    </footer>
  )
}
