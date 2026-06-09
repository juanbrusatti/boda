import { Label } from '@/components/ui/label'
import type { EventConfig } from '@/types/event'

interface ColorSelectorProps {
  section: keyof NonNullable<EventConfig['colors']>
  element?: 'title' | 'subtitle' | 'body' | 'label'
  data: EventConfig
  onDataChange: (data: EventConfig) => void
}

export function ColorSelector({ section, element, data, onDataChange }: ColorSelectorProps) {
  const updateColor = (value: string) => {
    if (!element) return
    
    const newTypography = {
      ...data.typography,
      [section]: {
        ...(data.typography?.[section] || {}),
        [element]: {
          ...(data.typography?.[section]?.[element] || {}),
          color: value,
        },
      },
    }
    onDataChange({ ...data, typography: newTypography })
  }

  const currentColor = element ? data.typography?.[section]?.[element]?.color : undefined

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-900">Color del texto</Label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={currentColor || '#000000'}
            onChange={(e) => updateColor(e.target.value)}
            className="w-12 h-10 rounded cursor-pointer border border-gray-300"
            style={{ backgroundColor: '#ffffff' }}
          />
          <input
            type="text"
            value={currentColor || '#000000'}
            onChange={(e) => updateColor(e.target.value)}
            className="flex-1 h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ color: '#111827', backgroundColor: '#ffffff' }}
          />
        </div>
      </div>
    </div>
  )
}
