'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isLoading, isMasterAdmin, logout, error } = useAuth()

  useEffect(() => {
    console.log('[DASHBOARD] State changed:', { isLoading, user, error })
    
    // Redirect if not master admin
    if (!isLoading && (!user || !isMasterAdmin())) {
      console.log('[DASHBOARD] Not authorized, redirecting to login')
      router.push('/login')
    }
  }, [user, isLoading, isMasterAdmin, router, error])

  if (error) {
    return (
      <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
        <div
          style={{
            padding: '20px',
            backgroundColor: '#fee',
            color: '#c33',
            borderRadius: '4px',
            border: '1px solid #fcc',
          }}
        >
          <h2>❌ Auth Error</h2>
          <p>{error}</p>
          <button
            onClick={() => router.push('/login')}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Go back to login
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading auth...</p>
      </div>
    )
  }

  if (!user || !isMasterAdmin()) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Unauthorized. Redirecting...</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Master Admin Dashboard</h1>
        <button
          onClick={logout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h2>Bienvenido, {user.full_name}!</h2>
        <p>Email: {user.email}</p>
        <p>Role: Master Admin</p>
        <p>Ultimo ingreso: {user.last_login ? new Date(user.last_login).toLocaleString() : 'First login'}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <Card
          title="Administrar usuarios"
          description="Crear, editar, y eliminar usuarios"
          icon="👥"
          href="/admin/users"
        />
        <Card
          title="Ver Registros de Auditoría"
          description="Rastrear todas las acciones del administrador y clientes"
          icon="📋"
          href="/admin/audit-logs"
        />
        <Card
          title="Administrar Locales"
          description="Ver y gestionar organizaciones clientes"
          icon="🏢"
          href="/admin/tenants"
        />
        <Card
          title="Configuración del sistema"
          description="Configuraciones globales y ajustes de la plataforma"
          icon="⚙️"
          href="/admin/settings"
        />
      </div>

      <div
        style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#e7f3ff',
          border: '1px solid #b3d9ff',
          borderRadius: '4px',
        }}
      >
        <h3>📝 Próximos Pasos</h3>
        <ul>
          <li>Crear tu primer usuario cliente</li>
          <li>Configurar permisos para el cliente</li>
          <li>Monitorear la actividad del usuario en los registros de auditoría</li>
        </ul>
      </div>
    </div>
  )
}

function Card({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: string
  href: string
}) {
  return (
    <a
      href={href}
      style={{
        display: 'block',
        padding: '20px',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
      <h3 style={{ margin: '10px 0' }}>{title}</h3>
      <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>{description}</p>
    </a>
  )
}
