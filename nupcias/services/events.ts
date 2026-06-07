/**
 * Event configuration service
 * Handles operations for client users to manage their event configurations
 */

'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { EventConfig, EventConfigDB } from '@/types/event'

/**
 * Create or update event configuration for a client user
 * Ensures only one active configuration per tenant
 */
export async function saveEventConfig(
  userId: string,
  tenantId: string,
  templateId: string,
  config: EventConfig
): Promise<EventConfigDB> {
  const supabase = await createServerSupabaseClient()

  // Check if user already has an event configuration
  const { data: existingConfig, error: fetchError } = await supabase
    .from('event_configs')
    .select('*')
    .eq('user_id', userId)
    .eq('tenant_id', tenantId)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    // PGRST116 means not found, which is expected for new configs
    throw new Error(`Failed to check existing config: ${fetchError.message}`)
  }

  if (existingConfig) {
    // Update existing configuration
    const { data, error } = await supabase
      .from('event_configs')
      .update({
        template_id: templateId,
        config,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existingConfig.id)
      .select(`
        *,
        tenants!inner(slug)
      `)
      .single()

    if (error) {
      throw new Error(`Failed to update event config: ${error.message}`)
    }

    return data as EventConfigDB
  }

  // Create new configuration
  const { data, error } = await supabase
    .from('event_configs')
    .insert({
      tenant_id: tenantId,
      user_id: userId,
      template_id: templateId,
      config,
      is_published: false,
    })
    .select(`
      *,
      tenants!inner(slug)
    `)
    .single()

  if (error) {
    throw new Error(`Failed to create event config: ${error.message}`)
  }

  return data as EventConfigDB
}

/**
 * Get event configuration for a client user
 */
export async function getEventConfig(
  userId: string,
  tenantId: string
): Promise<EventConfigDB | null> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('event_configs')
    .select(`
      *,
      tenants!inner(slug)
    `)
    .eq('user_id', userId)
    .eq('tenant_id', tenantId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null
    }
    throw new Error(`Failed to fetch event config: ${error.message}`)
  }

  return data as EventConfigDB
}

/**
 * Check if user has an active event configuration
 */
export async function hasEventConfig(
  userId: string,
  tenantId: string
): Promise<boolean> {
  const config = await getEventConfig(userId, tenantId)
  return config !== null
}

/**
 * Delete event configuration for a client user
 * Use with caution - this removes all customizations
 */
export async function deleteEventConfig(
  userId: string,
  tenantId: string
): Promise<void> {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase
    .from('event_configs')
    .delete()
    .eq('user_id', userId)
    .eq('tenant_id', tenantId)

  if (error) {
    throw new Error(`Failed to delete event config: ${error.message}`)
  }
}

/**
 * Publish/unpublish event configuration
 */
export async function setEventPublished(
  userId: string,
  tenantId: string,
  isPublished: boolean
): Promise<void> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('event_configs')
    .update({ is_published: isPublished, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('tenant_id', tenantId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update publish status: ${error.message}`)
  }

  if (!data) {
    throw new Error('No event configuration found for user/tenant')
  }
}

/**
 * Get published event configuration by tenant slug (public access)
 * This is used for the public invitation page
 * Note: The database should have a unique constraint on (tenant_id, user_id) to enforce at most one config per tenant
 */
export async function getPublicEventConfig(tenantSlug: string): Promise<EventConfigDB | null> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('event_configs')
    .select(`
      *,
      tenants!inner(slug, is_active)
    `)
    .eq('tenants.slug', tenantSlug)
    .eq('tenants.is_active', true)
    .eq('is_published', true)
    .limit(2)

  if (error) {
    throw new Error(`Failed to fetch public event config: ${error.message}`)
  }

  if (!data || data.length === 0) {
    return null
  }

  if (data.length > 1) {
    throw new Error('Multiple event configurations found for tenant - this violates the unique constraint')
  }

  return data[0] as EventConfigDB
}
