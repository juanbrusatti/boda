import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getEventConfigAction, saveEventConfigAction, setEventPublishedAction } from '@/app/actions/event-config'
import type { EventConfig } from '@/types/event'

export type DashboardView = 'templates' | 'edit' | 'visual-edit' | 'rsvp'

export function useDashboard() {
  const { user } = useAuth()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<DashboardView>('templates')
  const [editedData, setEditedData] = useState<EventConfig | null>(null)
  const [loadingConfig, setLoadingConfig] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isPublished, setIsPublished] = useState(false)
  const [tenantSlug, setTenantSlug] = useState<string | null>(null)

  // Load existing event configuration on mount
  useEffect(() => {
    async function loadConfig() {
      if (!user || !user.tenant_id) return

      try {
        const result = await getEventConfigAction({
          userId: user.id,
          tenantId: user.tenant_id,
        })

        if (result.success && result.data) {
          setSelectedTemplate(result.data.template_id)
          setEditedData(result.data.config)
          setIsPublished(result.data.is_published)
          setTenantSlug(result.data.tenants?.slug || null)
          setCurrentView('edit')
        }
      } catch (err) {
        console.error('Failed to load event config:', err)
        setLoadError('No se pudo cargar la configuración')
      } finally {
        setLoadingConfig(false)
      }
    }

    if (user && user.tenant_id) {
      loadConfig()
    } else {
      setLoadingConfig(false)
    }
  }, [user])

  const handleSelectTemplate = async (templateId: string, templateData: EventConfig) => {
    if (!user || !user.tenant_id) return

    setSaving(true)
    setSaveError(null)

    try {
      const result = await saveEventConfigAction({
        userId: user.id,
        tenantId: user.tenant_id,
        templateId,
        config: templateData,
      })

      if (result.success) {
        setSelectedTemplate(templateId)
        setEditedData({ ...templateData })
        setIsPublished(result.data?.is_published || false)
        setTenantSlug(result.data?.tenants?.slug || null)
        setCurrentView('edit')
      } else {
        setSaveError(result.error || 'Error al guardar el template')
      }
    } catch (err) {
      setSaveError('Error al guardar el template')
      console.error('Failed to save template:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleBackToTemplates = () => {
    setCurrentView('templates')
    setSelectedTemplate(null)
    setEditedData(null)
  }

  const handleSaveChanges = async () => {
    if (!selectedTemplate || !editedData || !user || !user.tenant_id) return

    setSaving(true)
    setSaveError(null)

    try {
      const result = await saveEventConfigAction({
        userId: user.id,
        tenantId: user.tenant_id,
        templateId: selectedTemplate,
        config: editedData,
      })

      if (result.success) {
        alert('Cambios guardados exitosamente')
      } else {
        setSaveError(result.error || 'Error al guardar los cambios')
      }
    } catch (err) {
      setSaveError('Error al guardar los cambios')
      console.error('Failed to save changes:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleTogglePublish = async () => {
    if (!user || !user.tenant_id) return

    setSaving(true)
    setSaveError(null)

    try {
      const result = await setEventPublishedAction({
        userId: user.id,
        tenantId: user.tenant_id,
        isPublished: !isPublished,
      })

      if (result.success) {
        setIsPublished(!isPublished)
        alert(isPublished ? 'Invitación despublicada' : 'Invitación publicada exitosamente')
      } else {
        setSaveError(result.error || 'Error al cambiar el estado de publicación')
      }
    } catch (err) {
      setSaveError('Error al cambiar el estado de publicación')
      console.error('Failed to toggle publish:', err)
    } finally {
      setSaving(false)
    }
  }

  return {
    selectedTemplate,
    currentView,
    editedData,
    loadingConfig,
    saving,
    saveError,
    isPublished,
    tenantSlug,
    setCurrentView,
    setEditedData,
    setSaveError,
    handleSelectTemplate,
    handleBackToTemplates,
    handleSaveChanges,
    handleTogglePublish,
  }
}
