import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { availableFonts } from '@/lib/fonts'
import type { EventConfig } from '@/types/event'

interface TypographySelectorProps {
  section: keyof NonNullable<EventConfig['typography']>
  element: 'title' | 'subtitle' | 'body' | 'label'
  data: EventConfig
  onDataChange: (data: EventConfig) => void
}

export function TypographySelector({ section, element, data, onDataChange }: TypographySelectorProps) {
  const updateTypography = (field: 'fontFamily' | 'fontWeight' | 'fontStyle', value: string | number) => {
    const newTypography = {
      ...data.typography,
      [section]: {
        ...(data.typography?.[section] || {}),
        [element]: {
          ...(data.typography?.[section]?.[element] || {}),
          [field]: value,
        },
      },
    }
    onDataChange({ ...data, typography: newTypography })
  }

  const currentConfig = data.typography?.[section]?.[element]

  return (
    <div className="grid grid-cols-3 gap-2 p-3 bg-muted/50 rounded-lg">
      <div className="space-y-1">
        <Label className="text-xs">Fuente</Label>
        <Select
          value={currentConfig?.fontFamily || ''}
          onValueChange={(value) => updateTypography('fontFamily', value)}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Fuente" />
          </SelectTrigger>
          <SelectContent>
            {availableFonts.map((font) => (
              <SelectItem key={font.id} value={font.family} className="text-xs">
                {font.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Peso</Label>
        <Select
          value={String(currentConfig?.fontWeight || 400)}
          onValueChange={(value) => updateTypography('fontWeight', parseInt(value))}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Peso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="300" className="text-xs">300</SelectItem>
            <SelectItem value="400" className="text-xs">400</SelectItem>
            <SelectItem value="500" className="text-xs">500</SelectItem>
            <SelectItem value="600" className="text-xs">600</SelectItem>
            <SelectItem value="700" className="text-xs">700</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Estilo</Label>
        <Select
          value={currentConfig?.fontStyle || 'normal'}
          onValueChange={(value) => updateTypography('fontStyle', value)}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Estilo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal" className="text-xs">Normal</SelectItem>
            <SelectItem value="italic" className="text-xs">Itálica</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
