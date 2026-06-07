'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/app/actions/login'

export default function GuestLoginPage() {
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
        setError(result.error || 'Login failed')
        setIsLoading(false)
        return
      }

      // Redirect to guest dashboard
      router.push('/dashboard')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(message)
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #faf8f5 0%, #f5efe6 100%)',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        backgroundColor: '#fffbf7',
        borderRadius: '16px',
        padding: '48px 40px',
        boxShadow: '0 8px 32px rgba(139, 115, 85, 0.08)',
        border: '1px solid rgba(205, 183, 158, 0.3)',
      }}>
        {/* Decorative element */}
        <div style={{
          width: '48px',
          height: '48px',
          margin: '0 auto 28px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #d4a574 0%, #c9a067 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 style={{
          fontSize: '26px',
          fontWeight: '500',
          color: '#5c4a3d',
          textAlign: 'center',
          marginBottom: '8px',
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.5px',
        }}>
          Bienvenido
        </h1>
        
        <p style={{
          fontSize: '14px',
          color: '#8b7355',
          textAlign: 'center',
          marginBottom: '36px',
          lineHeight: '1.6',
        }}>
          Ingresa tus credenciales para acceder a tu invitación
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#6b5a4a',
              fontSize: '13px',
              letterSpacing: '0.3px',
            }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="tu@email.com"
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #d4c4a8',
                borderRadius: '10px',
                fontSize: '15px',
                boxSizing: 'border-box',
                transition: 'all 0.2s',
                backgroundColor: '#faf7f2',
                color: '#5c4a3d',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#c9a067'
                e.target.style.backgroundColor = '#ffffff'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d4c4a8'
                e.target.style.backgroundColor = '#faf7f2'
              }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#6b5a4a',
              fontSize: '13px',
              letterSpacing: '0.3px',
            }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  paddingRight: '50px',
                  border: '1px solid #d4c4a8',
                  borderRadius: '10px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s',
                  backgroundColor: '#faf7f2',
                  color: '#5c4a3d',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#c9a067'
                  e.target.style.backgroundColor = '#ffffff'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d4c4a8'
                  e.target.style.backgroundColor = '#faf7f2'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#a89070',
                  fontSize: '12px',
                  padding: '4px',
                }}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          {error && (
            <div
              style={{
                padding: '12px',
                backgroundColor: '#fef2f2',
                color: '#9b4444',
                borderRadius: '8px',
                border: '1px solid #fcdada',
                fontSize: '13px',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #c9a067 0%, #b8956a 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(201, 160, 103, 0.25)',
              letterSpacing: '0.3px',
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(201, 160, 103, 0.35)'
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 160, 103, 0.25)'
              }
            }}
          >
            {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>

        <p style={{
          marginTop: '28px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#9a8b7a',
          lineHeight: '1.6',
        }}>
          Si tienes problemas para ingresar, contacta al anfitrión del evento
        </p>
      </div>
    </div>
  )
}
