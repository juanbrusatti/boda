'use client'

import { useState } from 'react'
import { TemplateWrapper } from '@/components/editor/template-wrapper'
import { event } from '@/data/event'
import type { EventConfig } from '@/types/event'

export default function TestEditorPage() {
  const [eventConfig, setEventConfig] = useState<EventConfig>(event)
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-lg font-semibold">Editor Visual - Prueba</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isEditMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isEditMode ? 'Modo Edición: ON' : 'Modo Edición: OFF'}
          </button>
          <button
            onClick={() => console.log('Guardando:', eventConfig)}
            className="px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Guardar (Console)
          </button>
        </div>
      </div>

      <TemplateWrapper 
        eventConfig={eventConfig} 
        templateId="wedding" 
        isEditMode={isEditMode}
      />
    </div>
  )
}
