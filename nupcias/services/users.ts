/**
 * User management service
 * Handles operations only callable by master admins:
 * - Listing users
 * - Enabling/disabling users
 * - Managing permissions
 * - Audit logging
 */

import { supabase } from '@/lib/supabase'
import { User, UserRole, UserStatus, UserPermission, AuditLog } from '@/types/user'
import { UpdateUserStatusInput, UpdateUserPermissionsInput } from '@/validations/auth'

/**
 * Verify user is a master admin
 */
async function verifyMasterAdmin(adminId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', adminId)
    .single()

  if (error || !data) {
    throw new Error('Admin user not found')
  }

  if (data.role !== UserRole.MASTER_ADMIN) {
    throw new Error('Unauthorized: Only master admins can perform this action')
  }
}

/**
 * List all client users
 * Only master admins can call this
 */
export async function listClientUsers(adminId: string, limit = 50, offset = 0) {
  await verifyMasterAdmin(adminId)

  const { data, error, count } = await supabase
    .from('users')
    .select('*, tenants(name, slug, is_active)', { count: 'exact' })
    .eq('role', UserRole.CLIENT_USER)
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to list client users: ${error.message}`)
  }

  return {
    users: data as unknown as (User & { tenants: { name: string; slug: string; is_active: boolean } })[],
    total: count || 0,
  }
}

/**
 * Get a specific user
 * Only master admins can view other users' details
 */
export async function getUser(adminId: string, userId: string) {
  await verifyMasterAdmin(adminId)

  const { data, error } = await supabase
    .from('users')
    .select('*, tenants(name, slug, is_active)')
    .eq('id', userId)
    .single()

  if (error) {
    throw new Error(`Failed to fetch user: ${error.message}`)
  }

  return data
}

/**
 * Update user status (active, inactive, suspended)
 * Only master admins can do this
 */
export async function updateUserStatus(adminId: string, input: UpdateUserStatusInput) {
  await verifyMasterAdmin(adminId)

  const { error } = await supabase.from('users').update({ status: input.status }).eq('id', input.user_id)

  if (error) {
    throw new Error(`Failed to update user status: ${error.message}`)
  }

  // Log the action
  await logAuditAction(adminId, 'update_user_status', input.user_id, null, {
    new_status: input.status,
  })
}

/**
 * Update user permissions
 * Only master admins can do this
 */
export async function updateUserPermissions(adminId: string, input: UpdateUserPermissionsInput) {
  await verifyMasterAdmin(adminId)

  const user = await supabase.from('users').select('tenant_id').eq('id', input.user_id).single()

  if (!user.data?.tenant_id) {
    throw new Error('User is not a client user')
  }

  const { error } = await supabase
    .from('user_permissions')
    .update({ permissions: input.permissions })
    .eq('user_id', input.user_id)

  if (error) {
    throw new Error(`Failed to update user permissions: ${error.message}`)
  }

  // Log the action
  await logAuditAction(adminId, 'update_user_permissions', input.user_id, user.data.tenant_id, {
    permissions: input.permissions,
  })
}

/**
 * Get user permissions
 */
export async function getUserPermissions(userId: string, tenantId: string) {
  const { data, error } = await supabase
    .from('user_permissions')
    .select('permissions')
    .eq('user_id', userId)
    .eq('tenant_id', tenantId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found, return default permissions
      return []
    }
    throw new Error(`Failed to fetch user permissions: ${error.message}`)
  }

  return data.permissions as UserPermission[]
}

/**
 * Check if user has a specific permission
 */
export async function hasPermission(userId: string, tenantId: string, permission: UserPermission) {
  const permissions = await getUserPermissions(userId, tenantId)
  return permissions.includes(permission)
}

/**
 * Disable user account
 * Sets status to INACTIVE
 */
export async function disableUser(adminId: string, userId: string) {
  await updateUserStatus(adminId, { user_id: userId, status: UserStatus.INACTIVE })
}

/**
 * Enable user account
 * Sets status to ACTIVE
 */
export async function enableUser(adminId: string, userId: string) {
  await updateUserStatus(adminId, { user_id: userId, status: UserStatus.ACTIVE })
}

/**
 * Suspend user account
 * Sets status to SUSPENDED
 */
export async function suspendUser(adminId: string, userId: string) {
  await updateUserStatus(adminId, { user_id: userId, status: UserStatus.SUSPENDED })
}

/**
 * List all master admins
 * Only master admins can view other master admins
 */
export async function listMasterAdmins(adminId: string) {
  await verifyMasterAdmin(adminId)

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', UserRole.MASTER_ADMIN)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to list master admins: ${error.message}`)
  }

  return data as User[]
}

/**
 * Get audit log for a specific user
 */
export async function getUserAuditLog(adminId: string, userId: string) {
  await verifyMasterAdmin(adminId)

  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .or(`target_user_id.eq.${userId},admin_id.eq.${userId}`)
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    throw new Error(`Failed to fetch audit log: ${error.message}`)
  }

  return data as AuditLog[]
}

/**
 * Internal: Log audit action
 */
async function logAuditAction(
  adminId: string,
  action: string,
  targetUserId: string | null,
  targetTenantId: string | null,
  metadata: Record<string, unknown>
) {
  const { error } = await supabase.from('audit_logs').insert({
    admin_id: adminId,
    action,
    target_user_id: targetUserId,
    target_tenant_id: targetTenantId,
    metadata,
  })

  if (error) {
    console.error('Failed to log audit action:', error)
  }
}
