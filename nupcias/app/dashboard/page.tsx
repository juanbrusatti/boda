'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function ClientDashboardPage() {
  const router = useRouter()
  const { user, isLoading, isClientUser, logout, error } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || !isClientUser())) {
      router.push('/login')
    }
  }, [isLoading, user, isClientUser, router])

  if (error) {
    return (
      <div style={{ maxWidth: '700px', margin: '50px auto', padding: '20px' }}>
        <h2>❌ Error de autenticación</h2>
        <p>{error}</p>
        <button onClick={() => router.push('/login')} style={buttonStyle}>
          Ir a login
        </button>
      </div>
    )
  }

  if (isLoading || !user) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Panel de Cliente</h1>
          <p>Bienvenido, {user.full_name || user.email}. Esta es la vista de usuario cliente.</p>
        </div>
        <button onClick={logout} style={buttonStyle}>
          Cerrar sesión
        </button>
      </div>

      <div style={{ padding: '20px', borderRadius: '14px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}>
        <h2>Acceso cliente</h2>
        <p>
          Este usuario puede iniciar sesión con el email y la contraseña que se generaron en el dashboard de administrador.
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Rol:</strong> {user.role}
        </p>
      </div>
    </div>
  )
}

const buttonStyle = {
  padding: '10px 18px',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
}
