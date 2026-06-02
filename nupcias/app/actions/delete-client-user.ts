'use server'

import { createServerSupabaseClient, createServerSupabaseAdminClient } from '@/lib/supabase-server'
import { UserRole } from '@/types/user'

export interface DeleteClientUserActionResult {
  success: boolean
  error?: string
  data?: {
    message: string
  }
}

export async function deleteClientUserAction(formData: FormData): Promise<DeleteClientUserActionResult> {
  try {
    const supabaseServer = await createServerSupabaseClient()
    const {
      data: { session },
    } = await supabaseServer.auth.getSession()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Debes iniciar sesión como administrador para eliminar usuarios.',
      }
    }

    const userId = formData.get('userId') as string

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
        error: 'No tienes permisos para eliminar usuarios.',
      }
    }

    // Get user info before deletion for audit log
    const { data: userData } = await adminClient
      .from('users')
      .select('tenant_id')
      .eq('id', userId)
      .single()

    // Delete user permissions
    if (userData?.tenant_id) {
      await adminClient
        .from('user_permissions')
        .delete()
        .eq('user_id', userId)
        .eq('tenant_id', userData.tenant_id)
    }

    // Delete tenant if exists
    if (userData?.tenant_id) {
      const { error: tenantError } = await adminClient
        .from('tenants')
        .delete()
        .eq('id', userData.tenant_id)

      if (tenantError) {
        return {
          success: false,
          error: `Error al eliminar tenant: ${tenantError.message}`,
        }
      }
    }

    // Delete user profile
    const { error: profileError } = await adminClient
      .from('users')
      .delete()
      .eq('id', userId)

    if (profileError) {
      return {
        success: false,
        error: `Error al eliminar perfil de usuario: ${profileError.message}`,
      }
    }

    // Delete user from Supabase Auth using admin client
    const { error: authError } = await adminClient.auth.admin.deleteUser(userId)

    if (authError) {
      return {
        success: false,
        error: `Error al eliminar usuario de autenticación: ${authError.message}`,
      }
    }

    // Log audit action
    await adminClient.from('audit_logs').insert({
      admin_id: session.user.id,
      action: 'delete_user',
      target_user_id: userId,
      target_tenant_id: userData?.tenant_id || null,
      metadata: { deleted_at: new Date().toISOString() },
    })

    return {
      success: true,
      data: {
        message: 'Usuario eliminado exitosamente',
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'No se pudo eliminar el usuario',
    }
  }
}
