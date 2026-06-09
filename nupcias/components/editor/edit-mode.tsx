'use client'

import { useState } from 'react'
import { Edit2, Eye, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { EventConfig } from '@/types/event'

interface EditModeProps {
  event: EventConfig
  onEventChange: (event: EventConfig) => void
  children: React.ReactNode
}

export function EditMode({ event, onEventChange, children }: EditModeProps) {
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <div className="relative">
      {/* Toggle de modo edición */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {isEditMode ? (
          <>
            <Button
              onClick={() => setIsEditMode(false)}
              variant="outline"
              size="sm"
              className="bg-white shadow-lg"
            >
              <Eye className="w-4 h-4 mr-2" />
              Vista previa
            </Button>
            <Button
              onClick={() => {
                // Aquí podrías agregar lógica para guardar
                console.log('Guardando cambios:', event)
              }}
              size="sm"
              className="bg-blue-600 text-white shadow-lg hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setIsEditMode(true)}
            variant="outline"
            size="sm"
            className="bg-white shadow-lg"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Editar
          </Button>
        )}
      </div>

      {/* Indicador de modo edición */}
      {isEditMode && (
        <div className="fixed top-4 left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
          Modo edición activo - Haz doble click en cualquier texto para editarlo
        </div>
      )}

      {/* Renderizar children con contexto de edición */}
      <div data-edit-mode={isEditMode}>
        {children}
      </div>
    </div>
  )
}
