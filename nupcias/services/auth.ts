/**
 * Authentication service
 * Handles user login, signup, and session management
 */

'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { User, UserRole, UserStatus } from '@/types/user'
import { CreateMasterAdminInput, CreateClientUserInput, LoginInput } from '@/validations/auth'

/**
 * Login user with email and password
 */
export async function loginUser(input: LoginInput) {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  })

  if (error) {
    throw new Error(`Login failed: ${error.message}`)
  }

  if (!data.session?.user?.id) {
    throw new Error('No session returned after login')
  }

  // Get user role and tenant info
  const userProfile = await getUserProfile(data.session.user.id)

  return {
    session: data.session,
    user: data.session.user,
    userProfile,
  }
}

/**
 * Sign up a new master admin user
 * Should only be callable by existing master admins or initial setup
 */
export async function signupMasterAdmin(input: CreateMasterAdminInput) {  const supabase = await createServerSupabaseClient()
    // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
  })

  if (authError) {
    throw new Error(`Signup failed: ${authError.message}`)
  }

  if (!authData.user?.id) {
    throw new Error('No user created after signup')
  }

  // Create user profile in database
  const { error: profileError } = await supabase.from('users').insert({
    id: authData.user.id,
    email: input.email,
    full_name: input.full_name,
    role: UserRole.MASTER_ADMIN,
    status: UserStatus.ACTIVE,
    tenant_id: null,
  })

  if (profileError) {
    throw new Error(`Failed to create user profile: ${profileError.message}`)
  }

  return {
    user: authData.user,
    session: authData.session,
  }
}

/**
 * Sign up a new client user and create their tenant
 * Should only be callable by master admins
 */
export async function signupClientUser(input: CreateClientUserInput, adminId: string) {
  const supabase = await createServerSupabaseClient()
  
  // Verify admin is master admin
  const admin = await getUserProfile(adminId)
  if (!admin || admin.role !== UserRole.MASTER_ADMIN) {
    throw new Error('Only master admins can create client users')
  }

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
  })

  if (authError) {
    throw new Error(`Signup failed: ${authError.message}`)
  }

  if (!authData.user?.id) {
    throw new Error('No user created after signup')
  }

  try {
    // Create tenant
    const { data: tenantData, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        name: input.tenant_name,
        slug: input.tenant_slug,
        email: input.email,
        created_by: adminId,
        is_active: true,
      })
      .select('id')
      .single()

    if (tenantError) {
      throw new Error(`Failed to create tenant: ${tenantError.message}`)
    }

    if (!tenantData?.id) {
      throw new Error('No tenant ID returned')
    }

    // Create user profile with tenant_id
    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      email: input.email,
      full_name: input.full_name,
      role: UserRole.CLIENT_USER,
      status: UserStatus.ACTIVE,
      tenant_id: tenantData.id,
    })

    if (profileError) {
      throw new Error(`Failed to create user profile: ${profileError.message}`)
    }

    // Create default permissions for client user
    const { error: permError } = await supabase.from('user_permissions').insert({
      user_id: authData.user.id,
      tenant_id: tenantData.id,
      permissions: ['create_event', 'edit_event', 'manage_guests', 'customize_design'],
    })

    if (permError) {
      throw new Error(`Failed to create user permissions: ${permError.message}`)
    }

    return {
      user: authData.user,
      tenant: tenantData,
    }
  } catch (error) {
    // Cleanup: delete auth user if something went wrong
    await supabase.auth.admin.deleteUser(authData.user.id)
    throw error
  }
}

/**
 * Get user profile from database
 */
export async function getUserProfile(userId: string): Promise<User | null> {
  const supabase = await createServerSupabaseClient()

  console.log('[getUserProfile] Fetching profile for user:', userId)

  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      console.log('[getUserProfile] User not found')
      return null
    }
    console.error('[getUserProfile] Error:', error)
    throw new Error(`Failed to fetch user profile: ${error.message}`)
  }

  console.log('[getUserProfile] Profile retrieved:', data)
  return data as User
}

/**
 * Logout user
 */
export async function logoutUser() {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(`Logout failed: ${error.message}`)
  }
}

/**
 * Update last login timestamp
 */
export async function updateLastLogin(userId: string) {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', userId)

  if (error) {
    console.error('Failed to update last login:', error)
  }
}
