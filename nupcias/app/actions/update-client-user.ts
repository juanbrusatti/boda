'use server'

import { createServerSupabaseClient, createServerSupabaseAdminClient } from '@/lib/supabase-server'
import { UserRole, UserStatus, UserPermission } from '@/types/user'

export interface UpdateClientUserActionResult {
  success: boolean
  error?: string
  data?: {
    message: string
  }
}

export async function updateClientUserAction(formData: FormData): Promise<UpdateClientUserActionResult> {
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Debes iniciar sesión como administrador para actualizar usuarios.',
      }
    }

    const userId = formData.get('userId') as string
    const status = formData.get('status') as UserStatus
    const full_name = formData.get('full_name') as string
    const permissionsValues = formData.getAll('permissions') as string[]
    const permissionsStr = permissionsValues.length > 0 ? JSON.stringify(permissionsValues) : ''

    if (!userId) {
      return {
        success: false,
        error: 'ID de usuario es requerido',
      }
    }

    // Use admin client to bypass RLS
    const adminClient = createServerSupabaseAdminClient()

    // Verify user is master admin
    const { data: adminUser, error: adminError } = await adminClient
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (adminError || !adminUser || adminUser.role !== UserRole.MASTER_ADMIN) {
      return {
        success: false,
        error: 'No tienes permisos para actualizar usuarios.',
      }
    }

    // Update status if provided
    if (status) {
      const { error } = await adminClient
        .from('users')
        .update({ status })
        .eq('id', userId)

      if (error) {
        return {
          success: false,
          error: `Error al actualizar estado: ${error.message}`,
        }
      }
    }

    // Update full_name if provided
    if (full_name) {
      const { error } = await adminClient
        .from('users')
        .update({ full_name })
        .eq('id', userId)

      if (error) {
        return {
          success: false,
          error: `Error al actualizar nombre: ${error.message}`,
        }
      }
    }

    // Update permissions if provided
    if (permissionsStr) {
      const permissions = JSON.parse(permissionsStr) as UserPermission[]
      
      // Get user's tenant_id
      const { data: userData } = await adminClient
        .from('users')
        .select('tenant_id')
        .eq('id', userId)
        .single()

      if (!userData?.tenant_id) {
        return {
          success: false,
          error: 'El usuario no tiene un tenant asociado',
        }
      }

      const { error } = await adminClient
        .from('user_permissions')
        .update({ permissions })
        .eq('user_id', userId)
        .eq('tenant_id', userData.tenant_id)

      if (error) {
        return {
          success: false,
          error: `Error al actualizar permisos: ${error.message}`,
        }
      }
    }

    return {
      success: true,
      data: {
        message: 'Usuario actualizado exitosamente',
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'No se pudo actualizar el usuario',
    }
  }
}
