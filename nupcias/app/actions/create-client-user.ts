'use server'

import { ZodError } from 'zod'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { signupClientUserSimple } from '@/services/auth'
import { createClientUserSimpleSchema } from '@/validations/auth'

export interface CreateClientUserActionResult {
  success: boolean
  error?: string
  data?: {
    email: string
    tenantSlug: string
  }
}

export async function createClientUserAction(formData: FormData): Promise<CreateClientUserActionResult> {
  try {
    const email = (formData.get('email') as string) ?? ''
    const password = (formData.get('password') as string) ?? ''

    const validated = createClientUserSimpleSchema.parse({ email, password })

    const supabase = await createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user?.id) {
      throw new Error('Debes iniciar sesión como administrador para crear usuarios.')
    }

    const result = await signupClientUserSimple(validated, session.user.id)

    return {
      success: true,
      data: {
        email: result.user.email || validated.email,
        tenantSlug: result.tenant?.slug || '',
      },
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || 'Datos inválidos',
      }
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'No se pudo crear el usuario',
    }
  }
}
