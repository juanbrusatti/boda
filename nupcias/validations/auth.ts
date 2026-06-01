import { z } from 'zod'
import { UserRole, UserPermission, UserStatus } from '@/types/user'

/**
 * Schema for creating a master admin user
 * Only accessible to existing master admins
 */
export const createMasterAdminSchema = z.object({
  email: z.string().email('Email inválido'),
  full_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

export type CreateMasterAdminInput = z.infer<typeof createMasterAdminSchema>

/**
 * Schema for creating a client user/tenant
 * Master admin provides initial tenant info
 */
export const createClientUserSchema = z.object({
  email: z.string().email('Email inválido'),
  full_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  tenant_name: z.string().min(2, 'El nombre de la organización debe tener al menos 2 caracteres'),
  tenant_slug: z
    .string()
    .min(3, 'El slug debe tener al menos 3 caracteres')
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

export type CreateClientUserInput = z.infer<typeof createClientUserSchema>

export const createClientUserSimpleSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

export type CreateClientUserSimpleInput = z.infer<typeof createClientUserSimpleSchema>

/**
 * Schema for updating user status
 */
export const updateUserStatusSchema = z.object({
  user_id: z.string().uuid('ID de usuario inválido'),
  status: z.nativeEnum(UserStatus),
})

export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>

/**
 * Schema for updating user permissions
 */
export const updateUserPermissionsSchema = z.object({
  user_id: z.string().uuid('ID de usuario inválido'),
  permissions: z.array(z.nativeEnum(UserPermission)),
})

export type UpdateUserPermissionsInput = z.infer<typeof updateUserPermissionsSchema>

/**
 * Schema for user login
 */
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export type LoginInput = z.infer<typeof loginSchema>

/**
 * Schema for updating user profile
 */
export const updateUserProfileSchema = z.object({
  full_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
})

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>
