import { Label } from '@/components/ui/label'
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
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-900">Fuente</Label>
        <select
          value={currentConfig?.fontFamily || ''}
          onChange={(e) => updateTypography('fontFamily', e.target.value)}
          className="w-full h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ color: '#111827', backgroundColor: '#ffffff' }}
        >
          <option value="">Seleccionar fuente</option>
          {availableFonts.map((font) => (
            <option key={font.id} value={font.family}>
              {font.name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-900">Peso</Label>
        <select
          value={String(currentConfig?.fontWeight || 400)}
          onChange={(e) => updateTypography('fontWeight', parseInt(e.target.value))}
          className="w-full h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ color: '#111827', backgroundColor: '#ffffff' }}
        >
          <option value="300">300 (Light)</option>
          <option value="400">400 (Normal)</option>
          <option value="500">500 (Medium)</option>
          <option value="600">600 (SemiBold)</option>
          <option value="700">700 (Bold)</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-900">Estilo</Label>
        <select
          value={currentConfig?.fontStyle || 'normal'}
          onChange={(e) => updateTypography('fontStyle', e.target.value)}
          className="w-full h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ color: '#111827', backgroundColor: '#ffffff' }}
        >
          <option value="normal">Normal</option>
          <option value="italic">Itálica</option>
        </select>
      </div>
    </div>
  )
}
