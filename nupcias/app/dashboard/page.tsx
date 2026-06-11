'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useDashboard, type DashboardView } from '@/hooks/useDashboard'
import { templates } from '@/data/templates'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkles, Edit, Users, ArrowLeft, Loader2, Eye, Edit2 } from 'lucide-react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { TemplatesView } from '@/components/dashboard/templates-view'
import { EditView } from '@/components/dashboard/edit-view'
import { RSVPView } from '@/components/dashboard/rsvp-view'
import { TemplateWrapper } from '@/components/editor/template-wrapper'
import type { Template } from '@/data/templates'

export default function ClientDashboardPage() {
  const router = useRouter()
  const { user, isLoading, isClientUser, logout, error } = useAuth()
  const dashboard = useDashboard()
  const [isVisualEditMode, setIsVisualEditMode] = useState(true)

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="max-w-md w-full">
          <CardContent className="py-8 text-center text-destructive">
            {error}
          </CardContent>
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

  if (dashboard.loadingConfig) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const handleSelectTemplate = async (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (!template) return
    await dashboard.handleSelectTemplate(templateId, template.data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DashboardHeader
          userName={user.full_name || ''}
          userEmail={user.email || ''}
          selectedTemplate={dashboard.selectedTemplate}
          tenantSlug={dashboard.tenantSlug}
          isPublished={dashboard.isPublished}
          saving={dashboard.saving}
          onTogglePublish={dashboard.handleTogglePublish}
          onLogout={logout}
          setSaveError={dashboard.setSaveError}
        />

        <Tabs value={dashboard.currentView} onValueChange={(v) => dashboard.setCurrentView(v as DashboardView)}>
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="templates">
              <Sparkles className="mr-2 h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="visual-edit" disabled={!dashboard.selectedTemplate}>
              <Eye className="mr-2 h-4 w-4" />
              Editor Visual
            </TabsTrigger>
            <TabsTrigger value="edit" disabled={!dashboard.selectedTemplate}>
              <Edit className="mr-2 h-4 w-4" />
              Editor Avanzado
            </TabsTrigger>
            <TabsTrigger value="rsvp">
              <Users className="mr-2 h-4 w-4" />
              Invitaciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="mt-6">
            <TemplatesView onSelectTemplate={handleSelectTemplate} />
          </TabsContent>

          <TabsContent value="visual-edit" className="mt-6">
            {dashboard.selectedTemplate && dashboard.editedData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Editor Visual</h2>
                    <p className="text-muted-foreground">Edita directamente en el template con doble click</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => dashboard.setCurrentView('templates')}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Volver
                    </Button>
                    <Button onClick={dashboard.handleSaveChanges} disabled={dashboard.saving}>
                      {dashboard.saving ? (
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

                {dashboard.saveError && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
                    {dashboard.saveError}
                  </div>
                )}

                <div className="border rounded-lg overflow-hidden">
                  <TemplateWrapper 
                    eventConfig={dashboard.editedData} 
                    templateId={dashboard.selectedTemplate} 
                    isEditMode={isVisualEditMode}
                    onDataChange={dashboard.setEditedData}
                  />
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Selecciona un template para comenzar a editarlo
                  </p>
                  <Button onClick={() => dashboard.setCurrentView('templates')} className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Ver templates
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="edit" className="mt-6">
            {dashboard.selectedTemplate && dashboard.editedData ? (
              (() => {
                const template = templates.find(t => t.id === dashboard.selectedTemplate)
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
                    data={dashboard.editedData}
                    onDataChange={dashboard.setEditedData}
                    onBack={dashboard.handleBackToTemplates}
                    onSave={dashboard.handleSaveChanges}
                    saving={dashboard.saving}
                    saveError={dashboard.saveError}
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
                  <Button onClick={() => dashboard.setCurrentView('templates')} className="mt-4">
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
