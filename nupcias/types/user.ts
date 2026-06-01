/**
 * User roles for the multi-tenant SaaS platform
 *
 * MASTER_ADMIN: Developer/admin that can manage all users and features
 * CLIENT_USER: Client tenant that can manage their own event and customize their digital card
 */
export enum UserRole {
  MASTER_ADMIN = 'master_admin',
  CLIENT_USER = 'client_user',
}

/**
 * User permissions that can be enabled/disabled per client user
 */
export enum UserPermission {
  CREATE_EVENT = 'create_event',
  EDIT_EVENT = 'edit_event',
  DELETE_EVENT = 'delete_event',
  MANAGE_GUESTS = 'manage_guests',
  CUSTOMIZE_DESIGN = 'customize_design',
  VIEW_ANALYTICS = 'view_analytics',
  EXPORT_DATA = 'export_data',
}

/**
 * User status in the system
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

/**
 * Tenant in multi-tenant architecture
 * Represents a client organization/user
 */
export interface Tenant {
  id: string
  name: string
  slug: string
  email: string
  /** Master admin who created this tenant */
  created_by: string
  created_at: string
  updated_at: string
  is_active: boolean
}

/**
 * User in the system
 * Can be either a master admin or a client user
 */
export interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  status: UserStatus
  /** If CLIENT_USER, this is the tenant they belong to */
  tenant_id: string | null
  /** Last login timestamp */
  last_login: string | null
  created_at: string
  updated_at: string
}

/**
 * User permissions mapping
 * Tracks which permissions are enabled for a client user
 */
export interface UserPermissions {
  id: string
  user_id: string
  tenant_id: string
  permissions: UserPermission[]
  updated_at: string
}

/**
 * Audit log for user actions
 * Tracks important operations by master admins
 */
export interface AuditLog {
  id: string
  admin_id: string
  action: string
  target_user_id: string | null
  target_tenant_id: string | null
  metadata: Record<string, unknown>
  created_at: string
}
