'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
  const [panelPosition, setPanelPosition] = useState({ top: 0, left: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const initialValueRef = useRef(value)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contentRef.current && !contentRef.current.contains(event.target as Node) &&
          panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsEditing(false)
        setShowPanel(false)
        // Save changes when closing
        const newText = contentRef.current?.textContent || ''
        if (newText !== value) {
          onChange(newText)
        }
      }
    }

    if (isEditing || showPanel) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing, showPanel, value, onChange])

  useEffect(() => {
    if (showPanel && contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect()
      const scrollY = window.scrollY || window.pageYOffset
      const scrollX = window.scrollX || window.pageXOffset
      setPanelPosition({
        top: rect.bottom + scrollY + 8,
        left: rect.left + scrollX
      })
    }
  }, [showPanel])

  const handleDoubleClick = () => {
    if (!isEditMode) return
    setIsEditing(true)
    setShowPanel(true)
    initialValueRef.current = value
  }

  const handleBlur = () => {
    const newText = contentRef.current?.textContent || ''
    if (newText !== value) {
      onChange(newText)
    }
  }

  if (!isEditMode) {
    return <div className={className} style={style}>{children || value}</div>
  }

  return (
    <div ref={contentRef} className="relative group">
      <div
        contentEditable={isEditing}
        onDoubleClick={handleDoubleClick}
        onBlur={handleBlur}
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
        dangerouslySetInnerHTML={{ __html: isEditing ? initialValueRef.current : (children || value) }}
      />

      {isMounted && showPanel && createPortal(
        <div 
          ref={panelRef}
          className="absolute z-[99999] bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-96"
          style={{ 
            backgroundColor: 'white',
            top: panelPosition.top,
            left: panelPosition.left
          }}
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
                element={element}
                data={data}
                onDataChange={onDataChange}
              />
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}
