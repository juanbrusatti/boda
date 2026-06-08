import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Loader2, Plus, Trash } from 'lucide-react'
import { availableIcons } from '@/lib/icons'
import { StoryEditor } from './editors/story-editor'
import { LocationEditor } from './editors/location-editor'
import { TypographySelector } from './editors/typography-selector'
import type { Template } from '@/data/templates'
import type { EventConfig } from '@/types/event'

interface EditViewProps {
  template: Template
  data: EventConfig
  onDataChange: (data: EventConfig) => void
  onBack: () => void
  onSave: () => void
  saving: boolean
  saveError: string | null
}

export function EditView({
  template,
  data,
  onDataChange,
  onBack,
  onSave,
  saving,
  saveError,
}: EditViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Editando: {template.name}</h2>
          <p className="text-muted-foreground">Personaliza todos los detalles de tu invitación</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <Button onClick={onSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar cambios'
            )}
          </Button>
        </div>
      </div>

      {saveError && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
          {saveError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información principal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => onDataChange({ ...data, title: e.target.value })}
              />
              <TypographySelector section="hero" element="title" data={data} onDataChange={onDataChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Subtítulo</Label>
              <Input
                id="tagline"
                value={data.tagline}
                onChange={(e) => onDataChange({ ...data, tagline: e.target.value })}
              />
              <TypographySelector section="hero" element="subtitle" data={data} onDataChange={onDataChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateLabel">Fecha (texto)</Label>
              <Input
                id="dateLabel"
                value={data.dateLabel}
                onChange={(e) => onDataChange({ ...data, dateLabel: e.target.value })}
              />
              <TypographySelector section="hero" element="body" data={data} onDataChange={onDataChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationLabel">Ubicación</Label>
              <Input
                id="locationLabel"
                value={data.locationLabel}
                onChange={(e) => onDataChange({ ...data, locationLabel: e.target.value })}
              />
              <TypographySelector section="hero" element="label" data={data} onDataChange={onDataChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cuenta regresiva</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showCountdown">Mostrar cuenta regresiva</Label>
              <input
                type="checkbox"
                id="showCountdown"
                checked={data.showCountdown !== false}
                onChange={(e) => onDataChange({ ...data, showCountdown: e.target.checked })}
                className="h-4 w-4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="countdownTitle">Título</Label>
              <Input
                id="countdownTitle"
                value={data.countdownTitle || ''}
                onChange={(e) => onDataChange({ ...data, countdownTitle: e.target.value })}
                placeholder="Cuenta regresiva"
              />
              <TypographySelector section="countdown" element="title" data={data} onDataChange={onDataChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="countdownSubtitle">Subtítulo</Label>
              <Input
                id="countdownSubtitle"
                value={data.countdownSubtitle || ''}
                onChange={(e) => onDataChange({ ...data, countdownSubtitle: e.target.value })}
                placeholder="Falta cada vez menos"
              />
              <TypographySelector section="countdown" element="subtitle" data={data} onDataChange={onDataChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateISO">Fecha y hora (ISO)</Label>
              <Input
                id="dateISO"
                type="datetime-local"
                value={data.dateISO ? data.dateISO.slice(0, 16) : ''}
                onChange={(e) => {
                  const value = e.target.value
                  onDataChange({ ...data, dateISO: value ? `${value}:00` : '' })
                }}
              />
            </div>
          </CardContent>
        </Card>

        <StoryEditor data={data} onDataChange={onDataChange} />

        <LocationEditor data={data} onDataChange={onDataChange} />

        <Card>
          <CardHeader>
            <CardTitle>Galería</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showGallery">Mostrar sección</Label>
              <input
                type="checkbox"
                id="showGallery"
                checked={data.showGallery !== false}
                onChange={(e) => onDataChange({ ...data, showGallery: e.target.checked })}
                className="h-4 w-4"
              />
            </div>
            <div className="space-y-2">
              <Label>Tipografía del título</Label>
              <TypographySelector section="gallery" element="title" data={data} onDataChange={onDataChange} />
            </div>
            <div className="space-y-2">
              <Label>Tipografía de las etiquetas</Label>
              <TypographySelector section="gallery" element="label" data={data} onDataChange={onDataChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>RSVP</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showRSVP">Mostrar sección</Label>
              <input
                type="checkbox"
                id="showRSVP"
                checked={data.showRSVP !== false}
                onChange={(e) => onDataChange({ ...data, showRSVP: e.target.checked })}
                className="h-4 w-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rsvpHeading">Título</Label>
              <Input
                id="rsvpHeading"
                value={data.rsvp.heading || ''}
                onChange={(e) => onDataChange({
                  ...data,
                  rsvp: { ...data.rsvp, heading: e.target.value }
                })}
                placeholder="Confirmá tu asistencia"
              />
              <TypographySelector section="rsvp" element="title" data={data} onDataChange={onDataChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rsvpSubheading">Subtítulo</Label>
              <Textarea
                id="rsvpSubheading"
                value={data.rsvp.subheading || ''}
                onChange={(e) => onDataChange({
                  ...data,
                  rsvp: { ...data.rsvp, subheading: e.target.value }
                })}
                placeholder="Tu presencia es el mejor regalo..."
                rows={3}
              />
              <TypographySelector section="rsvp" element="body" data={data} onDataChange={onDataChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rsvpButtonLabel">Texto del botón</Label>
              <Input
                id="rsvpButtonLabel"
                value={data.rsvp.buttonLabel || ''}
                onChange={(e) => onDataChange({
                  ...data,
                  rsvp: { ...data.rsvp, buttonLabel: e.target.value }
                })}
                placeholder="Confirmar asistencia"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rsvpDeadline">Fecha límite</Label>
              <Input
                id="rsvpDeadline"
                value={data.rsvp.deadline || ''}
                onChange={(e) => onDataChange({
                  ...data,
                  rsvp: { ...data.rsvp, deadline: e.target.value }
                })}
                placeholder="Te pedimos confirmar antes del..."
              />
              <TypographySelector section="rsvp" element="label" data={data} onDataChange={onDataChange} />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detalles del evento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.details?.map((detail: any, index: number) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-muted rounded-lg">
                <div className="space-y-2">
                  <Label>Etiqueta</Label>
                  <Input
                    value={detail.label}
                    onChange={(e) => {
                      const newDetails = [...data.details]
                      newDetails[index] = { ...newDetails[index], label: e.target.value }
                      onDataChange({ ...data, details: newDetails })
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Valor</Label>
                  <Input
                    value={detail.value}
                    onChange={(e) => {
                      const newDetails = [...data.details]
                      newDetails[index] = { ...newDetails[index], value: e.target.value }
                      onDataChange({ ...data, details: newDetails })
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo</Label>
                  <Input
                    value={detail.caption}
                    onChange={(e) => {
                      const newDetails = [...data.details]
                      newDetails[index] = { ...newDetails[index], caption: e.target.value }
                      onDataChange({ ...data, details: newDetails })
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icono</Label>
                  <select
                    value={detail.icon || ''}
                    onChange={(e) => {
                      const newDetails = [...data.details]
                      newDetails[index] = { ...newDetails[index], icon: e.target.value }
                      onDataChange({ ...data, details: newDetails })
                    }}
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Sin icono</option>
                    {availableIcons.map((icon) => (
                      <option key={icon.name} value={icon.name}>
                        {icon.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Acciones</Label>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newDetails = data.details.filter((_: any, i: number) => i !== index)
                      onDataChange({ ...data, details: newDetails })
                    }}
                    className="w-full hover:bg-destructive/60"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                const newDetails = [...(data.details || []), { label: '', value: '', caption: '', icon: '' }]
                onDataChange({ ...data, details: newDetails })
              }}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar detalle
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
