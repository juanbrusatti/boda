'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/app/actions/login'

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false) 

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      
      const result = await loginAction(formData)

      if (!result.success) {
        console.error('[LOGIN-FORM] Login failed:', result.error)
        setError(result.error || 'Login failed')
        setIsLoading(false)
        return
      }

      
      // Redirect to dashboard based on role
      if (result.data?.role === 'master_admin') {
        router.push('/admin/dashboard')
      } else if (result.data?.role === 'client_user') {
        router.push('/dashboard')
      } else {
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
      <h1>Inicio de sesión</h1>

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
            Contraseña
          </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ marginLeft: '10px' }}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Ingresa tu contraseña"
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
          {isLoading ? 'Iniciando sesión...' : 'Inicio de sesión'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
       Utilice el email y la contraseña que se generaron para el usuario cliente en el dashboard de administrador para iniciar sesión como cliente.
      </p>
    </div>
  )
}
