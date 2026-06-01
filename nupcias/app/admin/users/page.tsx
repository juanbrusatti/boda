'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { createClientUserAction } from '@/app/actions/create-client-user'

export default function AdminUsersPage() {
  const router = useRouter()
  const { user, isLoading, isMasterAdmin, logout, error } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && (!user || !isMasterAdmin())) {
      router.push('/login')
    }
  }, [isLoading, user, isMasterAdmin, router])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    setSuccessMessage(null)
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await createClientUserAction(formData)

      if (!result.success) {
        setFormError(result.error || 'No se pudo crear el usuario')
        return
      }

      setSuccessMessage(
        `Usuario creado: ${result.data?.email}. El cliente podrá iniciar sesión con esta contraseña en /login.`
      )
      event.currentTarget.reset()
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Error desconocido')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error) {
    return (
      <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
        <h2>❌ Error de autenticación</h2>
        <p>{error}</p>
        <button onClick={() => router.push('/login')} style={logoutButtonStyle}>
          Ir a login
        </button>
      </div>
    )
  }

  if (isLoading || !user) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Administrar usuarios</h1>
          <p>Crear usuarios cliente con email y contraseña para que luego puedan ingresar a la vista de cliente.</p>
        </div>
        <button onClick={logout} style={logoutButtonStyle}>
          Cerrar sesión
        </button>
      </div>

      <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '12px' }}>
        <h2 style={{ marginBottom: '10px' }}>Credenciales de creación</h2>
        <p>Solo necesitas email y contraseña. El sistema generará un tenant automático para este usuario cliente.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
        <div>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input id="email" name="email" type="email" placeholder="cliente@example.com" required disabled={isSubmitting} style={inputStyle} />
        </div>

        <div>
          <label htmlFor="password" style={labelStyle}>Contraseña</label>
          <input id="password" name="password" type="password" placeholder="Ingresa una contraseña segura" required disabled={isSubmitting} style={inputStyle} />
        </div>

        {formError && <div style={errorBoxStyle}>❌ {formError}</div>}
        {successMessage && <div style={successBoxStyle}>✅ {successMessage}</div>}

        <button type="submit" disabled={isSubmitting} style={submitButtonStyle}>
          {isSubmitting ? 'Creando usuario...' : 'Crear usuario cliente'}
        </button>
      </form>

      <div style={{ marginTop: '28px', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h2>¿Qué hace esto?</h2>
        <p>Se crea un usuario cliente en Supabase Auth y un perfil en la tabla <code>users</code>. El cliente podrá iniciar sesión en <strong>/login</strong> con las mismas credenciales.</p>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: '600',
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  fontSize: '16px',
  outline: 'none',
}

const submitButtonStyle = {
  width: 'fit-content',
  padding: '12px 24px',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
}

const logoutButtonStyle = {
  padding: '10px 18px',
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
}

const errorBoxStyle = {
  padding: '14px',
  backgroundColor: '#fff1f2',
  color: '#b91c1c',
  borderRadius: '10px',
}

const successBoxStyle = {
  padding: '14px',
  backgroundColor: '#ecfdf5',
  color: '#166534',
  borderRadius: '10px',
}
