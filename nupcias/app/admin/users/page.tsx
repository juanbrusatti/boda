'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { createClientUserAction } from '@/app/actions/create-client-user'
import { listClientUsersAction } from '@/app/actions/list-client-users'
import { updateClientUserAction } from '@/app/actions/update-client-user'
import { deleteClientUserAction } from '@/app/actions/delete-client-user'
import { UserStatus, UserPermission } from '@/types/user'

interface ClientUser {
  id: string
  email: string
  full_name: string
  role: string
  status: string
  tenant_id: string | null
  last_login: string | null
  created_at: string
  tenants: {
    name: string
    slug: string
    is_active: boolean
  } | null
}

export default function AdminUsersPage() {
  const router = useRouter()
  const { user, isLoading, isMasterAdmin, logout, error } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [clientUsers, setClientUsers] = useState<ClientUser[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [editingUser, setEditingUser] = useState<ClientUser | null>(null)
  const [isDeletingUser, setIsDeletingUser] = useState<ClientUser | null>(null)
  const [editFormError, setEditFormError] = useState<string | null>(null)
  const [editSuccessMessage, setEditSuccessMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false);

const togglePassword = () => {
  setShowPassword(!showPassword);
};


  useEffect(() => {
    if (!isLoading && (!user || !isMasterAdmin())) {
      router.push('/login')
    }
  }, [isLoading, user, isMasterAdmin, router])

  useEffect(() => {
    if (user && isMasterAdmin()) {
      loadUsers()
    }
  }, [user, isMasterAdmin])

  async function loadUsers() {
    setIsLoadingUsers(true)
    try {
      const result = await listClientUsersAction()
      if (result.success && result.data) {
        setClientUsers(result.data.users)
      }
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setIsLoadingUsers(false)
    }
  }

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
      loadUsers()
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Error desconocido')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setEditFormError(null)
    setEditSuccessMessage(null)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await updateClientUserAction(formData)

      if (!result.success) {
        setEditFormError(result.error || 'No se pudo actualizar el usuario')
        return
      }

      setEditSuccessMessage('Usuario actualizado exitosamente')
      loadUsers()
      setTimeout(() => {
        setEditingUser(null)
        setEditSuccessMessage(null)
      }, 2000)
    } catch (error) {
      setEditFormError(error instanceof Error ? error.message : 'Error desconocido')
    }
  }

  async function handleDeleteUser(userId: string) {
    const formData = new FormData()
    formData.append('userId', userId)
    
    const result = await deleteClientUserAction(formData)
    
    if (result.success) {
      setSuccessMessage('Usuario eliminado exitosamente')
      loadUsers()
      setIsDeletingUser(null)
    } else {
      setFormError(result.error || 'No se pudo eliminar el usuario')
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Administrar usuarios</h1>
          <p>Crear, editar y eliminar usuarios cliente.</p>
        </div>
        <button onClick={logout} style={logoutButtonStyle}>
          Cerrar sesión
        </button>
      </div>

      {formError && <div style={{ ...errorBoxStyle, marginBottom: '20px' }}>❌ {formError}</div>}
      {successMessage && <div style={{ ...successBoxStyle, marginBottom: '20px' }}>✅ {successMessage}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Create User Form */}
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ marginBottom: '16px' }}>Crear nuevo usuario</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label htmlFor="email" style={labelStyle}>Email</label>
              <input id="email" name="email" type="email" placeholder="cliente@example.com" required disabled={isSubmitting} style={inputStyle} />
            </div>

            <div>
              <label htmlFor="password" style={labelStyle}>Contraseña</label>
                  <input 
                      id="password" 
                      name="password" 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Ingresa una contraseña segura" 
                      required 
                      disabled={isSubmitting} 
                      style={{ ...inputStyle, paddingRight: '40px', width: '100%' }} 
                    />
                    
                    <button
                      type="button"
                      onClick={togglePassword}
                      disabled={isSubmitting}
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'} 
                    </button>         
     </div>

            <button type="submit" disabled={isSubmitting} style={submitButtonStyle}>
              {isSubmitting ? 'Creando usuario...' : 'Crear usuario cliente'}
            </button>
          </form>
        </div>

        {/* Users List */}
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ marginBottom: '16px' }}>Usuarios cliente ({clientUsers.length})</h2>
          {isLoadingUsers ? (
            <p>Cargando usuarios...</p>
          ) : clientUsers.length === 0 ? (
            <p style={{ color: '#64748b' }}>No hay usuarios cliente creados aún.</p>
          ) : (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {clientUsers.map((clientUser) => (
                <div
                  key={clientUser.id}
                  style={{
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontWeight: '600', marginBottom: '4px' }}>{clientUser.full_name || 'Sin nombre'}</p>
                      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>{clientUser.email}</p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          backgroundColor: clientUser.status === 'active' ? '#dcfce7' : clientUser.status === 'inactive' ? '#fee2e2' : '#fef3c7',
                          color: clientUser.status === 'active' ? '#166534' : clientUser.status === 'inactive' ? '#991b1b' : '#92400e',
                        }}>
                          {clientUser.status}
                        </span>
                        {clientUser.tenants && (
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            backgroundColor: '#dbeafe',
                            color: '#1e40af',
                          }}>
                            {clientUser.tenants.slug}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setEditingUser(clientUser)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setIsDeletingUser(clientUser)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setEditingUser(null)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '12px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '16px' }}>Editar usuario</h2>
            <form onSubmit={handleEditSubmit} style={{ display: 'grid', gap: '16px' }}>
              <input type="hidden" name="userId" value={editingUser.id} />
              
              <div>
                <label htmlFor="edit_full_name" style={labelStyle}>Nombre completo</label>
                <input
                  id="edit_full_name"
                  name="full_name"
                  type="text"
                  defaultValue={editingUser.full_name}
                  style={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="edit_status" style={labelStyle}>Estado</label>
                <select
                  id="edit_status"
                  name="status"
                  defaultValue={editingUser.status}
                  style={inputStyle}
                >
                  <option value={UserStatus.ACTIVE}>Activo</option>
                  <option value={UserStatus.INACTIVE}>Inactivo</option>
                  <option value={UserStatus.SUSPENDED}>Suspendido</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Permisos</label>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {Object.values(UserPermission).map((permission) => (
                    <label key={permission} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        name="permissions"
                        value={permission}
                        defaultChecked={true}
                        style={{ width: '16px', height: '16px' }}
                      />
                      <span style={{ fontSize: '14px' }}>{permission}</span>
                    </label>
                  ))}
                </div>
              </div>

              {editFormError && <div style={errorBoxStyle}>❌ {editFormError}</div>}
              {editSuccessMessage && <div style={successBoxStyle}>✅ {editSuccessMessage}</div>}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#64748b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeletingUser && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setIsDeletingUser(null)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '12px',
              maxWidth: '400px',
              width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '16px', color: '#dc2626' }}>¿Eliminar usuario?</h2>
            <p style={{ marginBottom: '8px' }}>
              Estás a punto de eliminar al usuario:
            </p>
            <p style={{ fontWeight: '600', marginBottom: '16px' }}>
              {isDeletingUser.full_name || 'Sin nombre'} ({isDeletingUser.email})
            </p>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
              Esta acción no se puede deshacer. El usuario y todos sus datos serán eliminados permanentemente.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsDeletingUser(null)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#64748b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteUser(isDeletingUser.id)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
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
