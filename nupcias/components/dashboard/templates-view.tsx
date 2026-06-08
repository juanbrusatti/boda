import { templates } from '@/data/templates'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sparkles, Eye } from 'lucide-react'
import { TemplatePreview } from './template-preview'

interface TemplatesViewProps {
  onSelectTemplate: (id: string) => void
}

export function TemplatesView({ onSelectTemplate }: TemplatesViewProps) {
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
