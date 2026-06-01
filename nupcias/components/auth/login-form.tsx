'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/app/actions/login'

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      console.log('[LOGIN-FORM] Form submitted')
      const formData = new FormData(e.currentTarget)
      console.log('[LOGIN-FORM] Calling loginAction...')
      
      const result = await loginAction(formData)
      console.log('[LOGIN-FORM] loginAction response:', result)

      if (!result.success) {
        console.error('[LOGIN-FORM] Login failed:', result.error)
        setError(result.error || 'Login failed')
        setIsLoading(false)
        return
      }

      // ✅ Login successful
      console.log('[LOGIN-FORM] Login successful, user data:', result.data)
      
      // Redirect to dashboard based on role
      if (result.data?.role === 'master_admin') {
        console.log('[LOGIN-FORM] Redirecting to /admin/dashboard')
        router.push('/admin/dashboard')
      } else if (result.data?.role === 'client_user') {
        console.log('[LOGIN-FORM] Redirecting to /dashboard')
        router.push('/dashboard')
      } else {
        console.warn('[LOGIN-FORM] Unknown role:', result.data?.role)
        router.push('/')
      }
    } catch (err) {
      console.error('[LOGIN-FORM] Caught error:', err)
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(message)
      setIsLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="admin@example.com"
            required
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {error && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#fee',
              color: '#c33',
              borderRadius: '4px',
              border: '1px solid #fcc',
              fontSize: '14px',
            }}
          >
            ❌ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '10px',
            backgroundColor: isLoading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
        Master Admin? Use your email and password to access the admin dashboard.
      </p>
    </div>
  )
}
