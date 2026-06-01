/**
 * useAuth hook
 * Provides authentication state and methods
 * Use this in components to access current user and auth functions
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { Session } from '@supabase/supabase-js'
import { User, UserRole, UserPermission } from '@/types/user'
import { supabase } from '@/lib/supabase'
import { getUserProfile, updateLastLogin, logoutUser } from '@/services/auth'
import { getUserPermissions, hasPermission as checkPermission } from '@/services/users'

interface UseAuthState {
  session: Session | null
  user: User | null
  isLoading: boolean
  error: string | null
}

interface UseAuthReturn extends UseAuthState {
  logout: () => Promise<void>
  permissions: UserPermission[]
  isMasterAdmin: () => boolean
  isClientUser: () => boolean
  hasPermission: (permission: UserPermission) => Promise<boolean>
}

export function useAuth(): UseAuthReturn {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [permissions, setPermissions] = useState<UserPermission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state
  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      try {
        setIsLoading(true)
        console.log('[useAuth] Initializing auth...')

        // Get current session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        console.log('[useAuth] Session retrieved:', session?.user?.email)

        if (isMounted) {
          setSession(session)
        }

        if (session?.user?.id) {
          console.log('[useAuth] Getting user profile for ID:', session.user.id)
          // Get user profile
          const userProfile = await getUserProfile(session.user.id)

          console.log('[useAuth] User profile retrieved:', userProfile)

          if (isMounted) {
            setUser(userProfile)

            // Get user permissions if client user
            if (userProfile?.role === UserRole.CLIENT_USER && userProfile?.tenant_id) {
              console.log('[useAuth] Getting permissions for client user')
              const userPerms = await getUserPermissions(session.user.id, userProfile.tenant_id)
              setPermissions(userPerms)
            }

            // Update last login
            console.log('[useAuth] Updating last login')
            await updateLastLogin(session.user.id)
          }
        } else {
          console.log('[useAuth] No session found')
        }

        console.log('[useAuth] Auth initialization complete')
      } catch (err) {
        console.error('[useAuth] Error during initialization:', err)
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Auth initialization failed')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    initializeAuth()

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (isMounted) {
        setSession(session)

        if (session?.user?.id) {
          try {
            const userProfile = await getUserProfile(session.user.id)
            setUser(userProfile)

            if (userProfile?.role === UserRole.CLIENT_USER && userProfile?.tenant_id) {
              const userPerms = await getUserPermissions(session.user.id, userProfile.tenant_id)
              setPermissions(userPerms)
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch user profile')
          }
        } else {
          setUser(null)
          setPermissions([])
        }
      }
    })

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutUser()
      setSession(null)
      setUser(null)
      setPermissions([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed')
    }
  }, [])

  const isMasterAdmin = useCallback(() => {
    return user?.role === UserRole.MASTER_ADMIN
  }, [user?.role])

  const isClientUser = useCallback(() => {
    return user?.role === UserRole.CLIENT_USER
  }, [user?.role])

  const hasPermission = useCallback(
    async (permission: UserPermission) => {
      if (!user?.id || !user?.tenant_id) {
        return false
      }
      return checkPermission(user.id, user.tenant_id, permission)
    },
    [user?.id, user?.tenant_id]
  )

  return {
    session,
    user,
    isLoading,
    error,
    logout,
    permissions,
    isMasterAdmin,
    isClientUser,
    hasPermission,
  }
}
