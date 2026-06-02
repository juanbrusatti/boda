'use server'

import { createServerSupabaseClient, createServerSupabaseAdminClient } from '@/lib/supabase-server'
import { UserRole } from '@/types/user'

export interface ListClientUsersActionResult {
  success: boolean
  error?: string
  data?: {
    users: Array<{
      id: string
      email: string
      full_name: string
      role: string
      status: string
      tenant_id: string | null
      last_login: string | null
      created_at: string
      tenants: {
        name: string
        slug: string
        is_active: boolean
      } | null
    }>
    total: number
  }
}

export async function listClientUsersAction(): Promise<ListClientUsersActionResult> {
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Debes iniciar sesión como administrador para ver usuarios.',
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
        error: 'No tienes permisos para ver usuarios.',
      }
    }

    // List all client users using admin client
    const { data, error, count } = await adminClient
      .from('users')
      .select('*, tenants(name, slug, is_active)', { count: 'exact' })
      .eq('role', UserRole.CLIENT_USER)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to list client users: ${error.message}`)
    }

    return {
      success: true,
      data: {
        users: data || [],
        total: count || 0,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'No se pudo obtener la lista de usuarios',
    }
  }
}
