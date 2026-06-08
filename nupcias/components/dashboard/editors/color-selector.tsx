import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
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
    <div className="grid grid-cols-3 gap-2 p-3 bg-muted/50 rounded-lg">
      <div className="space-y-1">
        <Label className="text-xs">Fondo</Label>
        <Input
          type="color"
          value={currentColors?.background || '#ffffff'}
          onChange={(e) => updateColor('background', e.target.value)}
          className="h-8 w-full cursor-pointer"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Texto</Label>
        <Input
          type="color"
          value={currentColors?.text || '#000000'}
          onChange={(e) => updateColor('text', e.target.value)}
          className="h-8 w-full cursor-pointer"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Acento</Label>
        <Input
          type="color"
          value={currentColors?.accent || '#000000'}
          onChange={(e) => updateColor('accent', e.target.value)}
          className="h-8 w-full cursor-pointer"
        />
      </div>
    </div>
  )
}
