import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { availableFonts } from '@/lib/fonts'
import type { EventConfig } from '@/types/event'

interface TypographyEditorProps {
  data: EventConfig
  onDataChange: (data: EventConfig) => void
}

export function TypographyEditor({ data, onDataChange }: TypographyEditorProps) {
  const updateTypography = (section: keyof NonNullable<EventConfig['typography']>, element: 'title' | 'subtitle' | 'body' | 'label', field: 'fontFamily' | 'fontWeight' | 'fontStyle', value: string | number) => {
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

  const sections = [
    { key: 'hero' as const, label: 'Hero' },
    { key: 'countdown' as const, label: 'Cuenta regresiva' },
    { key: 'story' as const, label: 'Historia' },
    { key: 'gallery' as const, label: 'Galería' },
    { key: 'location' as const, label: 'Ubicación' },
    { key: 'rsvp' as const, label: 'RSVP' },
    { key: 'footer' as const, label: 'Footer' },
  ]

  const elements = [
    { key: 'title' as const, label: 'Título' },
    { key: 'subtitle' as const, label: 'Subtítulo' },
    { key: 'body' as const, label: 'Texto' },
    { key: 'label' as const, label: 'Etiqueta' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipografías</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map((section) => (
          <div key={section.key} className="space-y-4">
            <h3 className="text-lg font-semibold">{section.label}</h3>
            {elements.map((element) => (
              <div key={element.key} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="space-y-2">
                  <Label>{element.label}</Label>
                  <Select
                    value={data.typography?.[section.key]?.[element.key]?.fontFamily || ''}
                    onValueChange={(value) => updateTypography(section.key, element.key, 'fontFamily', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar fuente" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableFonts.map((font) => (
                        <SelectItem key={font.id} value={font.family}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Peso</Label>
                  <Select
                    value={String(data.typography?.[section.key]?.[element.key]?.fontWeight || 400)}
                    onValueChange={(value) => updateTypography(section.key, element.key, 'fontWeight', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Peso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300">300 (Light)</SelectItem>
                      <SelectItem value="400">400 (Regular)</SelectItem>
                      <SelectItem value="500">500 (Medium)</SelectItem>
                      <SelectItem value="600">600 (SemiBold)</SelectItem>
                      <SelectItem value="700">700 (Bold)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estilo</Label>
                  <Select
                    value={data.typography?.[section.key]?.[element.key]?.fontStyle || 'normal'}
                    onValueChange={(value) => updateTypography(section.key, element.key, 'fontStyle', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Estilo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="italic">Itálica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
