'use client'

import { createContext, useContext } from 'react'
import type { EventConfig } from '@/types/event'

interface EditContextType {
  isEditMode: boolean
  event: EventConfig
  onEventChange: (event: EventConfig) => void
}

const EditContext = createContext<EditContextType | undefined>(undefined)

export function EditProvider({ children, isEditMode, event, onEventChange }: EditContextType & { children: React.ReactNode }) {
  return (
    <EditContext.Provider value={{ isEditMode, event, onEventChange }}>
      {children}
    </EditContext.Provider>
  )
}

export function useEditContext() {
  const context = useContext(EditContext)
  if (!context) {
    // Return default values when not within EditProvider (e.g., public view)
    return {
      isEditMode: false,
      event: {} as EventConfig,
      onEventChange: () => {}
    }
  }
  return context
}
