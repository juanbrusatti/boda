import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LogOut, Globe, Lock, Loader2, Share2 } from 'lucide-react'

interface DashboardHeaderProps {
  userName: string
  userEmail: string
  selectedTemplate: string | null
  tenantSlug: string | null
  isPublished: boolean
  saving: boolean
  onTogglePublish: () => void
  onLogout: () => void
  setSaveError: (error: string | null) => void
}

export function DashboardHeader({
  userName,
  userEmail,
  selectedTemplate,
  tenantSlug,
  isPublished,
  saving,
  onTogglePublish,
  onLogout,
  setSaveError,
}: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel de Cliente</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido, {userName || userEmail}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {selectedTemplate && tenantSlug && (
          <Card className="px-4 py-2">
            <CardContent className="p-0 flex items-center gap-3">
              {isPublished ? (
                <>
                  <Globe className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">Publicado</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onTogglePublish}
                    disabled={saving}
                    className="h-7 px-2"
                  >
                    {saving ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Lock className="h-3 w-3" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      const url = `${window.location.origin}/${tenantSlug}`
                      try {
                        await navigator.clipboard.writeText(url)
                        alert('Enlace copiado al portapapeles')
                      } catch {
                        setSaveError('No se pudo copiar el enlace')
                      }
                    }}
                    className="h-7"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Compartir
                  </Button>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Borrador</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onTogglePublish}
                    disabled={saving}
                    className="h-7 px-2"
                  >
                    {saving ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Globe className="h-3 w-3" />
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}
        <Button variant="outline" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>
    </header>
  )
}
