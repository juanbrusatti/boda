/**
 * Server actions for event configuration
 * These actions are called from the client dashboard to save/load event configurations
 */

'use server'

import { saveEventConfig, getEventConfig, hasEventConfig } from '@/services/events'
import { EventConfig } from '@/types/event'

export interface SaveEventConfigInput {
  userId: string
  tenantId: string
  templateId: string
  config: EventConfig
}

export interface GetEventConfigInput {
  userId: string
  tenantId: string
}

/**
 * Save event configuration when a client selects or edits a template
 */
export async function saveEventConfigAction(input: SaveEventConfigInput) {
  try {
    const result = await saveEventConfig(
      input.userId,
      input.tenantId,
      input.templateId,
      input.config
    )
    
    return {
      success: true,
      data: result,
    }
  } catch (error) {
    console.error('[saveEventConfigAction] Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save event configuration',
    }
  }
}

/**
 * Get event configuration for a client user
 */
export async function getEventConfigAction(input: GetEventConfigInput) {
  try {
    const config = await getEventConfig(input.userId, input.tenantId)
    
    return {
      success: true,
      data: config,
    }
  } catch (error) {
    console.error('[getEventConfigAction] Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get event configuration',
    }
  }
}

/**
 * Check if user has an event configuration
 */
export async function hasEventConfigAction(input: GetEventConfigInput) {
  try {
    const hasConfig = await hasEventConfig(input.userId, input.tenantId)
    
    return {
      success: true,
      hasConfig,
    }
  } catch (error) {
    console.error('[hasEventConfigAction] Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to check event configuration',
      hasConfig: false,
    }
  }
}
