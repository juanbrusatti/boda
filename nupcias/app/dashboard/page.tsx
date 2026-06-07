'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { templates } from '@/data/templates'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sparkles, Edit, Users, LogOut, ArrowLeft, Eye } from 'lucide-react'
import { Hero } from '@/components/sections/hero'
import { EventInfo } from '@/components/sections/event-info'
import { Countdown } from '@/components/sections/countdown'
import { Story } from '@/components/sections/story'
import { Gallery } from '@/components/sections/gallery'
import { Location } from '@/components/sections/location'
import type { Template } from '@/data/templates'
import type { EventConfig } from '@/types/event'

type DashboardView = 'templates' | 'edit' | 'rsvp'

export default function ClientDashboardPage() {
  const router = useRouter()
  const { user, isLoading, isClientUser, logout, error } = useAuth()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<DashboardView>('templates')
  const [editedData, setEditedData] = useState<any>(null)

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-destructive">Error de autenticación</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/login')} className="w-full">
              Ir a login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading || !user || !isClientUser()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    )
  }

  const handleSelectTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setEditedData({ ...template.data })
      setCurrentView('edit')
    }
  }

  const handleBackToTemplates = () => {
    setCurrentView('templates')
    setSelectedTemplate(null)
    setEditedData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Panel de Cliente</h1>
            <p className="text-muted-foreground mt-1">
              Bienvenido, {user.full_name || user.email}
            </p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </header>

        <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as DashboardView)}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="templates">
              <Sparkles className="mr-2 h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="edit" disabled={!selectedTemplate}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </TabsTrigger>
            <TabsTrigger value="rsvp">
              <Users className="mr-2 h-4 w-4" />
              Invitaciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="mt-6">
            <TemplatesView onSelectTemplate={handleSelectTemplate} />
          </TabsContent>

          <TabsContent value="edit" className="mt-6">
            {selectedTemplate && editedData ? (
              (() => {
                const template = templates.find(t => t.id === selectedTemplate)
                if (!template) {
                  return (
                    <Card>
                      <CardContent className="py-8 text-center text-destructive">
                        Template no encontrado
                      </CardContent>
                    </Card>
                  )
                }
                return (
                  <EditView
                    template={template}
                    data={editedData}
                    onDataChange={setEditedData}
                    onBack={handleBackToTemplates}
                  />
                )
              })() 
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Selecciona un template para comenzar a editarlo
                  </p>
                  <Button onClick={() => setCurrentView('templates')} className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Ver templates
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="rsvp" className="mt-6">
            <RSVPView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function TemplatesView({ onSelectTemplate }: { onSelectTemplate: (id: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Elige tu template</h2>
        <p className="text-muted-foreground">
          Selecciona un diseño para comenzar a personalizar tu invitación
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-all">
            <CardHeader>
              <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    Vista previa
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Vista previa: {template.name}</DialogTitle>
                  </DialogHeader>
                  <TemplatePreview template={template} />
                </DialogContent>
              </Dialog>
              <Button onClick={() => onSelectTemplate(template.id)} className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Usar este template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function EditView({
  template,
  data,
  onDataChange,
  onBack,
}: {
  template: Template
  data: EventConfig
  onDataChange: (data: EventConfig) => void
  onBack: () => void
}) {
  const handleSave = () => {
    console.log('Guardando cambios:', data)
    alert('Cambios guardados (funcionalidad de guardado pendiente)')
  }

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
          <Button onClick={handleSave}>
            Guardar cambios
          </Button>
        </div>
      </div>

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
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Subtítulo</Label>
              <Input
                id="tagline"
                value={data.tagline}
                onChange={(e) => onDataChange({ ...data, tagline: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateLabel">Fecha (texto)</Label>
              <Input
                id="dateLabel"
                value={data.dateLabel}
                onChange={(e) => onDataChange({ ...data, dateLabel: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationLabel">Ubicación</Label>
              <Input
                id="locationLabel"
                value={data.locationLabel}
                onChange={(e) => onDataChange({ ...data, locationLabel: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Descripción</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descripción del evento</Label>
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) => onDataChange({ ...data, description: e.target.value })}
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detalles del evento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.details?.map((detail: any, index: number) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
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
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Configuración RSVP</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rsvpHeading">Título de RSVP</Label>
              <Input
                id="rsvpHeading"
                value={data.rsvp?.heading || ''}
                onChange={(e) => onDataChange({ ...data, rsvp: { ...data.rsvp, heading: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsvpSubheading">Subtítulo de RSVP</Label>
              <Textarea
                id="rsvpSubheading"
                value={data.rsvp?.subheading || ''}
                onChange={(e) => onDataChange({ ...data, rsvp: { ...data.rsvp, subheading: e.target.value } })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsvpButton">Texto del botón</Label>
              <Input
                id="rsvpButton"
                value={data.rsvp?.buttonLabel || ''}
                onChange={(e) => onDataChange({ ...data, rsvp: { ...data.rsvp, buttonLabel: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsvpDeadline">Fecha límite</Label>
              <Input
                id="rsvpDeadline"
                value={data.rsvp?.deadline || ''}
                onChange={(e) => onDataChange({ ...data, rsvp: { ...data.rsvp, deadline: e.target.value } })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RSVPView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Gestión de invitaciones</h2>
        <p className="text-muted-foreground">
          Visualiza y gestiona las respuestas de tus invitados
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Users className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Próximamente</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Esta funcionalidad estará disponible pronto. Podrás ver quién ha aceptado o rechazado tu invitación,
            enviar recordatorios y gestionar la lista de invitados.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function TemplatePreview({ template }: { template: Template }) {
  return (
    <div className="space-y-0">
      <Hero event={template.data} />
      <EventInfo event={template.data} />
      <Countdown event={template.data} />
      <Story event={template.data} />
      <Gallery event={template.data} />
      <Location event={template.data} />
    </div>
  )
}
