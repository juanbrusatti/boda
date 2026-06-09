import { Label } from '@/components/ui/label'
import type { EventConfig } from '@/types/event'

interface ColorSelectorProps {
  section: keyof NonNullable<EventConfig['colors']>
  data: EventConfig
  onDataChange: (data: EventConfig) => void
}

export function ColorSelector({ section, data, onDataChange }: ColorSelectorProps) {
  const updateColor = (field: 'background' | 'text' | 'accent', value: string) => {
    const newColors = {
      ...data.colors,
      [section]: {
        ...(data.colors?.[section] || {}),
        colors: {
          ...(data.colors?.[section]?.colors || {}),
          [field]: value,
        },
      },
    }
    onDataChange({ ...data, colors: newColors })
  }

  const currentColors = data.colors?.[section]?.colors

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-900">Fondo</Label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={currentColors?.background || '#ffffff'}
            onChange={(e) => updateColor('background', e.target.value)}
            className="w-12 h-10 rounded cursor-pointer border border-gray-300"
            style={{ backgroundColor: '#ffffff' }}
          />
          <input
            type="text"
            value={currentColors?.background || '#ffffff'}
            onChange={(e) => updateColor('background', e.target.value)}
            className="flex-1 h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ color: '#111827', backgroundColor: '#ffffff' }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-900">Texto</Label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={currentColors?.text || '#000000'}
            onChange={(e) => updateColor('text', e.target.value)}
            className="w-12 h-10 rounded cursor-pointer border border-gray-300"
            style={{ backgroundColor: '#ffffff' }}
          />
          <input
            type="text"
            value={currentColors?.text || '#000000'}
            onChange={(e) => updateColor('text', e.target.value)}
            className="flex-1 h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ color: '#111827', backgroundColor: '#ffffff' }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-900">Acento</Label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={currentColors?.accent || '#000000'}
            onChange={(e) => updateColor('accent', e.target.value)}
            className="w-12 h-10 rounded cursor-pointer border border-gray-300"
            style={{ backgroundColor: '#ffffff' }}
          />
          <input
            type="text"
            value={currentColors?.accent || '#000000'}
            onChange={(e) => updateColor('accent', e.target.value)}
            className="flex-1 h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ color: '#111827', backgroundColor: '#ffffff' }}
          />
        </div>
      </div>
    </div>
  )
}
