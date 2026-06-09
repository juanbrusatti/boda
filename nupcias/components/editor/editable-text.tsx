'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Type, Palette, Move } from 'lucide-react'
import { TypographySelector } from '@/components/dashboard/editors/typography-selector'
import { ColorSelector } from '@/components/dashboard/editors/color-selector'
import type { EventConfig } from '@/types/event'

interface EditableTextProps {
  value: string
  onChange: (value: string) => void
  section?: keyof NonNullable<EventConfig['colors']>
  data?: EventConfig
  onDataChange?: (data: EventConfig) => void
  className?: string
  children?: React.ReactNode
  element?: 'title' | 'subtitle' | 'body' | 'label'
  isEditMode?: boolean
  style?: React.CSSProperties
}

export function EditableText({ 
  value, 
  onChange, 
  section, 
  data, 
  onDataChange, 
  className,
  children,
  element,
  isEditMode = false,
  style
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [activeTab, setActiveTab] = useState<'text' | 'typography' | 'color'>('text')
  const contentRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contentRef.current && !contentRef.current.contains(event.target as Node) &&
          panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsEditing(false)
        setShowPanel(false)
      }
    }

    if (isEditing || showPanel) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing, showPanel])

  const handleDoubleClick = () => {
    if (!isEditMode) return
    setIsEditing(true)
    setShowPanel(true)
  }

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.textContent || ''
    onChange(newText)
  }

  if (!isEditMode) {
    return <div className={className} style={style}>{children || value}</div>
  }

  return (
    <div ref={contentRef} className="relative group">
      <div
        contentEditable={isEditing}
        onDoubleClick={handleDoubleClick}
        onInput={handleContentChange}
        suppressContentEditableWarning
        className={className}
        style={{
          outline: isEditing ? '2px solid #3b82f6' : 'none',
          borderRadius: isEditing ? '4px' : '0',
          padding: isEditing ? '2px 4px' : '0',
          cursor: isEditMode ? 'pointer' : 'default',
          ...style,
        }}
        title="Doble click para editar"
      >
        {children || value}
      </div>

      {showPanel && (
        <div 
          ref={panelRef}
          className="absolute z-[9999] bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-96 top-full left-0 mt-2"
          style={{ backgroundColor: 'white' }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-900">Editar elemento</span>
            <button
              onClick={() => {
                setIsEditing(false)
                setShowPanel(false)
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t ${
                activeTab === 'text' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Type className="w-4 h-4" />
              Texto
            </button>
            <button
              onClick={() => setActiveTab('typography')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t ${
                activeTab === 'typography' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Move className="w-4 h-4" />
              Tipografía
            </button>
            <button
              onClick={() => setActiveTab('color')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t ${
                activeTab === 'color' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Palette className="w-4 h-4" />
              Color
            </button>
          </div>

          {/* Tab content */}
          {activeTab === 'text' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500">Edita el texto haciendo doble click en el elemento</p>
            </div>
          )}

          {activeTab === 'typography' && element && data && onDataChange && section && (
            <div className="space-y-4">
              <TypographySelector
                section={section}
                element={element}
                data={data}
                onDataChange={onDataChange}
              />
            </div>
          )}

          {activeTab === 'color' && data && onDataChange && section && (
            <div className="space-y-4">
              <ColorSelector
                section={section}
                data={data}
                onDataChange={onDataChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
