/**
 * Supabase client utilities
 * Centralizes all Supabase interactions
 */

import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

/**
 * Browser client for client-side operations
 * Only available in 'use client' components
 */
export const supabase = (() => {
  // Only create in browser environment
  if (typeof window !== 'undefined') {
    return createBrowserClient(supabaseUrl, supabaseAnonKey)
  }
  // Return a stub for server-side rendering
  return null as any
})()

/**
 * Get the current authenticated user session
 */
export async function getCurrentSession() {
  if (!supabase) return null
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
  const session = await getCurrentSession()
  if (!session) return null

  return session.user
}

