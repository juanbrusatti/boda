import { Card, CardContent } from '@/components/ui/card'
import { Users } from 'lucide-react'

export function RSVPView() {
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
