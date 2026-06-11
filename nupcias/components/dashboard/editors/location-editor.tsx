import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { TypographySelector } from './typography-selector'
import { ColorSelector } from './color-selector'
import type { EventConfig } from '@/types/event'

interface LocationEditorProps {
  data: EventConfig
  onDataChange: (data: EventConfig) => void
}

export function LocationEditor({ data, onDataChange }: LocationEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cómo llegar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="showLocation">Mostrar sección</Label>
          <input
            type="checkbox"
            id="showLocation"
            checked={data.showLocation !== false}
            onChange={(e) => onDataChange({ ...data, showLocation: e.target.checked })}
            className="h-4 w-4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="venue">Nombre del lugar</Label>
          <Input
            id="venue"
            value={data.location.venue || ''}
            onChange={(e) => onDataChange({
              ...data,
              location: { ...data.location, venue: e.target.value }
            })}
            placeholder="Salón Los Robles"
          />
          <TypographySelector section="location" element="title" data={data} onDataChange={onDataChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Dirección completa</Label>
          <Textarea
            id="address"
            value={data.location.address || ''}
            onChange={(e) => onDataChange({
              ...data,
              location: { ...data.location, address: e.target.value }
            })}
            placeholder="Camino de los Robles 1450, Buenos Aires, Argentina"
            rows={3}
          />
          <TypographySelector section="location" element="body" data={data} onDataChange={onDataChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mapQuery">Consulta para el mapa</Label>
          <Input
            id="mapQuery"
            value={data.location.mapQuery || ''}
            onChange={(e) => onDataChange({
              ...data,
              location: { ...data.location, mapQuery: e.target.value }
            })}
            placeholder="Salón Los Robles, Buenos Aires, Argentina"
          />
          <p className="text-xs text-muted-foreground">
            Esta consulta se usa para generar el mapa y las direcciones en Google Maps
          </p>
        </div>

        <div className="space-y-2">
          <Label>Colores de la sección</Label>
          <ColorSelector section="location" element="title" data={data} onDataChange={onDataChange} />
        </div>
      </CardContent>
    </Card>
  )
}
