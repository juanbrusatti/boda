'use server'

import { loginUser } from '@/services/auth'
import { loginSchema, type LoginInput } from '@/validations/auth'
import { ZodError } from 'zod'

export interface LoginActionResult {
  success: boolean
  error?: string
  data?: {
    userId: string
    email: string
    role: string
    tenantId: string | null
  }
}

/**
 * Server Action for user login
 * Validates credentials and returns user info
 */
export async function loginAction(formData: FormData): Promise<LoginActionResult> {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    console.log('[LOGIN] Starting login for email:', email)

    // Validate input
    const validated: LoginInput = loginSchema.parse({ email, password })
    console.log('[LOGIN] Input validated successfully')

    // Perform login
    const result = await loginUser(validated)
    console.log('[LOGIN] Login successful, user ID:', result.user.id)
    console.log('[LOGIN] User profile:', result.userProfile)

    if (!result.userProfile) {
      console.error('[LOGIN] ERROR: User profile is null')
      return {
        success: false,
        error: 'User profile not found after login. Make sure the user exists in the users table.',
      }
    }

    console.log('[LOGIN] Returning success response')
    return {
      success: true,
      data: {
        userId: result.user.id,
        email: result.user.email || '',
        role: result.userProfile.role,
        tenantId: result.userProfile.tenant_id,
      },
    }
  } catch (error) {
    console.error('[LOGIN] ERROR caught:', error)

    if (error instanceof ZodError) {
      const firstError = error.errors[0]
      console.error('[LOGIN] Validation error:', firstError.message)
      return {
        success: false,
        error: firstError.message,
      }
    }

    if (error instanceof Error) {
      console.error('[LOGIN] Generic error:', error.message)
      return {
        success: false,
        error: error.message,
      }
    }

    console.error('[LOGIN] Unknown error type')
    return {
      success: false,
      error: 'Login failed. Please try again.',
    }
  }
}

