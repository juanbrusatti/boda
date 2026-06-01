/**
 * Authentication and User Management Constants
 * Centralized constants used throughout the auth system
 */

import { UserRole, UserPermission, UserStatus } from '@/types/user'

/**
 * User roles with descriptions
 */
export const USER_ROLES = {
  [UserRole.MASTER_ADMIN]: {
    label: 'Master Admin',
    description: 'Administrator with full system access',
    canManageUsers: true,
    canManageTenants: true,
    canViewAuditLogs: true,
  },
  [UserRole.CLIENT_USER]: {
    label: 'Client User',
    description: 'Tenant user with limited permissions',
    canManageUsers: false,
    canManageTenants: false,
    canViewAuditLogs: false,
  },
} as const

/**
 * User statuses with descriptions
 */
export const USER_STATUSES = {
  [UserStatus.ACTIVE]: {
    label: 'Active',
    description: 'User can access the system',
    color: 'green',
  },
  [UserStatus.INACTIVE]: {
    label: 'Inactive',
    description: 'User has been disabled',
    color: 'gray',
  },
  [UserStatus.SUSPENDED]: {
    label: 'Suspended',
    description: 'User has been suspended and cannot access the system',
    color: 'red',
  },
} as const

/**
 * User permissions with descriptions
 */
export const USER_PERMISSIONS = {
  [UserPermission.CREATE_EVENT]: {
    label: 'Create Event',
    description: 'Can create new events/invitations',
    category: 'Events',
  },
  [UserPermission.EDIT_EVENT]: {
    label: 'Edit Event',
    description: 'Can modify existing events',
    category: 'Events',
  },
  [UserPermission.DELETE_EVENT]: {
    label: 'Delete Event',
    description: 'Can delete events',
    category: 'Events',
  },
  [UserPermission.MANAGE_GUESTS]: {
    label: 'Manage Guests',
    description: 'Can manage guest list and RSVPs',
    category: 'Guests',
  },
  [UserPermission.CUSTOMIZE_DESIGN]: {
    label: 'Customize Design',
    description: 'Can customize digital card design, typography, and images',
    category: 'Design',
  },
  [UserPermission.VIEW_ANALYTICS]: {
    label: 'View Analytics',
    description: 'Can view event analytics and statistics',
    category: 'Analytics',
  },
  [UserPermission.EXPORT_DATA]: {
    label: 'Export Data',
    description: 'Can export event data and guest lists',
    category: 'Data',
  },
} as const

/**
 * Default permissions for new client users
 */
export const DEFAULT_CLIENT_PERMISSIONS: UserPermission[] = [
  UserPermission.CREATE_EVENT,
  UserPermission.EDIT_EVENT,
  UserPermission.MANAGE_GUESTS,
  UserPermission.CUSTOMIZE_DESIGN,
]

/**
 * Audit action types
 */
export const AUDIT_ACTIONS = {
  USER_CREATED: 'user_created',
  USER_DELETED: 'user_deleted',
  USER_STATUS_CHANGED: 'user_status_changed',
  USER_PERMISSIONS_UPDATED: 'user_permissions_updated',
  TENANT_CREATED: 'tenant_created',
  TENANT_DELETED: 'tenant_deleted',
  TENANT_DISABLED: 'tenant_disabled',
  LOGIN: 'login',
  LOGOUT: 'logout',
} as const

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized: You do not have permission to perform this action',
  INVALID_ROLE: 'Invalid user role',
  INVALID_STATUS: 'Invalid user status',
  INVALID_PERMISSION: 'Invalid permission',
  USER_NOT_FOUND: 'User not found',
  TENANT_NOT_FOUND: 'Tenant not found',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  INVALID_EMAIL: 'Invalid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  INVALID_SLUG: 'Slug must contain only lowercase letters, numbers, and hyphens',
  PERMISSION_DENIED: 'Permission denied',
  MUST_BE_MASTER_ADMIN: 'Only master admins can perform this action',
} as const

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  USER_CREATED: 'User created successfully',
  USER_DELETED: 'User deleted successfully',
  USER_UPDATED: 'User updated successfully',
  STATUS_CHANGED: 'User status changed successfully',
  PERMISSIONS_UPDATED: 'User permissions updated successfully',
  TENANT_CREATED: 'Tenant created successfully',
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
} as const

/**
 * Validation rules
 */
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MIN_NAME_LENGTH: 2,
  MIN_SLUG_LENGTH: 3,
  MIN_TENANT_NAME_LENGTH: 2,
  MAX_EMAIL_LENGTH: 255,
  SLUG_PATTERN: /^[a-z0-9-]+$/,
} as const

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  DEFAULT_OFFSET: 0,
} as const

/**
 * Feature flags for permissions
 */
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: true,
  ENABLE_EXPORT: false, // Disable until implemented
  ENABLE_CUSTOM_DOMAIN: false, // Future feature
  ENABLE_TEAM_COLLABORATION: false, // Future feature
} as const
