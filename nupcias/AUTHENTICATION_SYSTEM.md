# Multi-Tenant Authentication System Documentation

## Overview

Sistema de autenticación y autorización multi-tenant para un SaaS de invitaciones digitales. Soporta dos tipos de usuarios:

1. **Master Admin**: Programadores que pueden crear usuarios clientes, administrar usuarios, habilitar/deshabilitar funciones
2. **Client User**: Usuarios clientes (tenants) que pueden diseñar sus propias tarjetas digitales

## Architecture

### Data Model

```
┌─────────────────────────────────────────────┐
│             Users                           │
├─────────────────────────────────────────────┤
│ id (UUID)                                   │
│ email                                       │
│ full_name                                   │
│ role (master_admin | client_user)           │
│ status (active | inactive | suspended)      │
│ tenant_id (NULL for master, UUID for clients)
│ last_login                                  │
│ created_at, updated_at                      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│            Tenants                          │
├─────────────────────────────────────────────┤
│ id (UUID)                                   │
│ name                                        │
│ slug (unique)                               │
│ email                                       │
│ created_by (admin_id)                       │
│ is_active                                   │
│ created_at, updated_at                      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│        User Permissions                     │
├─────────────────────────────────────────────┤
│ id (UUID)                                   │
│ user_id (FK → users)                        │
│ tenant_id (FK → tenants)                    │
│ permissions (TEXT[] array)                  │
│ updated_at                                  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│          Audit Logs                         │
├─────────────────────────────────────────────┤
│ id (UUID)                                   │
│ admin_id (FK → users)                       │
│ action (string)                             │
│ target_user_id (FK → users)                 │
│ target_tenant_id (FK → tenants)             │
│ metadata (JSONB)                            │
│ created_at                                  │
└─────────────────────────────────────────────┘
```

### Row-Level Security (RLS)

La seguridad multi-tenant es garantizada por RLS policies en Postgres:

- **Master Admins**: Acceso completo a todas las tablas
- **Client Users**: Solo pueden ver datos de su tenant
- **Policies**: Automáticamente filtran queries por tenant_id

## Setup Instructions

### 1. Execute SQL Migrations

1. Ir a Supabase Dashboard → Project → SQL Editor
2. Crear nueva query
3. Copiar todo el contenido de `/lib/database-schema.sql`
4. Ejecutar

### 2. Environment Variables

Verificar que estas variables estén en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

`SUPABASE_SERVICE_ROLE_KEY` se usa para operaciones de administración que necesitan pasar las políticas RLS, como crear perfiles de usuario en la tabla `users`.

IMPORTANTE: Nunca use `NEXT_PUBLIC_` para la clave de servicio. Variables con el prefijo `NEXT_PUBLIC_` se exponen al código del cliente y podrían filtrar la clave administrativa al navegador. Asegúrate de definir solo `SUPABASE_SERVICE_ROLE_KEY` en el servidor y no incluirla en bundles públicos.

### 3. (Optional) Create Initial Master Admin

Pasos para crear el primer master admin:

**Step 1:** Ir a Supabase Dashboard → Authentication → Users

**Step 2:** Click "Add user" → Crear usuario con:
- Email: `admin@example.com` (o el que prefieras)
- Password: Tu contraseña segura
- Click "Create user"

**Step 3:** Copiar el UUID del usuario creado (aparece en la lista de usuarios)

**Step 4:** Ir a SQL Editor y ejecutar:

```sql
-- ⚠️ REEMPLAZA 'PASTE_UUID_HERE' con el UUID real del usuario
INSERT INTO users (id, email, full_name, role, status, tenant_id)
VALUES (
  'PASTE_UUID_HERE',  -- Ejemplo: '550e8400-e29b-41d4-a716-446655440000'
  'admin@example.com',
  'Admin Name',
  'master_admin',
  'active',
  NULL
);
```

**Para encontrar el UUID:**
1. Supabase Dashboard → Authentication → Users
2. Buscar el usuario que creaste
3. Copiar el UUID (columna "ID")
4. Pegarlo en la query SQL arriba (reemplazar `PASTE_UUID_HERE`)

## Usage Examples

### Master Admin: Create Client User

```typescript
import { signupClientUser } from '@/services/auth'
import { createClientUserSchema } from '@/validations/auth'

// En un Server Action o API route
export async function createNewClient(adminId: string, formData: FormData) {
  const input = {
    email: formData.get('email') as string,
    full_name: formData.get('full_name') as string,
    tenant_name: formData.get('tenant_name') as string,
    tenant_slug: formData.get('tenant_slug') as string,
    password: formData.get('password') as string,
  }

  // Validar
  const validated = createClientUserSchema.parse(input)

  // Crear cliente
  const result = await signupClientUser(validated, adminId)

  return result
}
```

### Master Admin: List All Clients

```typescript
import { listClientUsers } from '@/services/users'

export async function getAllClients(adminId: string) {
  const { users, total } = await listClientUsers(adminId, 50, 0)
  return users
}
```

### Master Admin: Update User Permissions

```typescript
import { updateUserPermissions } from '@/services/users'
import { UserPermission } from '@/types/user'

export async function customizeClientPermissions(adminId: string, clientId: string) {
  await updateUserPermissions(adminId, {
    user_id: clientId,
    permissions: [
      UserPermission.CREATE_EVENT,
      UserPermission.EDIT_EVENT,
      UserPermission.CUSTOMIZE_DESIGN,
      // Sin VIEW_ANALYTICS - deshabilitado
    ],
  })
}
```

### Master Admin: Enable/Disable User

```typescript
import { enableUser, disableUser, suspendUser } from '@/services/users'

// Desactivar usuario
await disableUser(adminId, clientId)

// Reactivar
await enableUser(adminId, clientId)

// Suspender
await suspendUser(adminId, clientId)
```

### Client User: Login and Use App

```typescript
import { loginUser } from '@/services/auth'

const result = await loginUser({
  email: 'client@example.com',
  password: 'password123',
})

// result.userProfile contiene:
// - id
// - role: 'client_user'
// - tenant_id: 'uuid-del-tenant'
// - permissions: [...array de permisos]
```

### In Components: Use useAuth Hook

```typescript
'use client'

import { useAuth } from '@/hooks/useAuth'
import { UserPermission } from '@/types/user'

export function MyComponent() {
  const { user, isMasterAdmin, isClientUser, hasPermission, logout } = useAuth()

  if (!user) return <div>Loading...</div>

  // Mostrar diferente UI según rol
  if (isMasterAdmin()) {
    return <AdminDashboard />
  }

  if (isClientUser()) {
    // Verificar permisos
    const canCustomize = await hasPermission(UserPermission.CUSTOMIZE_DESIGN)

    return <ClientDashboard canCustomize={canCustomize} />
  }
}
```

### Check User Permissions

```typescript
import { hasPermission, getUserPermissions } from '@/services/users'

// Verificar un permiso específico
const canCreate = await hasPermission(userId, tenantId, 'create_event')

if (canCreate) {
  // Mostrar botón crear evento
}

// Obtener todos los permisos del usuario
const allPermissions = await getUserPermissions(userId, tenantId)
```

## File Structure

```
src/
├── app/
├── components/
├── features/
├── hooks/
│   └── useAuth.ts          ← Hook de autenticación
├── lib/
│   ├── supabase.ts         ← Cliente Supabase centralizado
│   └── database-schema.sql ← Migraciones SQL
├── services/
│   ├── auth.ts             ← Autenticación (login, signup)
│   └── users.ts            ← Gestión de usuarios (admin)
├── types/
│   └── user.ts             ← Tipos de usuario, roles, permisos
├── validations/
│   └── auth.ts             ← Esquemas Zod para validación
```

## Security Considerations

### ✅ What's Secure

- **RLS Policies**: Postgres asegura que clientes no accedan datos de otros
- **Type Safety**: TypeScript previene errores de tipos
- **Validation**: Zod valida todos los inputs
- **Audit Logging**: Todas las acciones de admin son registradas
- **Supabase Auth**: Passwords hasheadas con bcrypt

### ⚠️ Important Notes

1. **Nunca confiar en datos del cliente**: Siempre validar server-side
2. **RLS es mandatorio**: Siempre está activo en producción
3. **Master Admin es poderoso**: Verificar que solo devs tengan acceso
4. **API Keys públicas**: Son públicas por diseño, pero limitadas por RLS
5. **Server Actions**: Preferir para operaciones sensitivas

## Available Permissions

```typescript
enum UserPermission {
  CREATE_EVENT = 'create_event',           // Crear nuevo evento
  EDIT_EVENT = 'edit_event',               // Editar evento existente
  DELETE_EVENT = 'delete_event',           // Eliminar evento
  MANAGE_GUESTS = 'manage_guests',         // Gestionar lista de invitados
  CUSTOMIZE_DESIGN = 'customize_design',   // Personalizar tarjeta digital
  VIEW_ANALYTICS = 'view_analytics',       // Ver estadísticas
  EXPORT_DATA = 'export_data',             // Exportar datos
}
```

## User Statuses

```typescript
enum UserStatus {
  ACTIVE = 'active',           // Usuario activo
  INACTIVE = 'inactive',       // Usuario desactivado (puede reactivarse)
  SUSPENDED = 'suspended',     // Usuario suspendido (requiere admin)
}
```

## Next Steps

1. ✅ Ejecutar migraciones SQL
2. ✅ Crear primer master admin
3. ✅ Crear componentes de login
4. ✅ Crear panel de admin para gestión de usuarios
5. ✅ Crear dashboard para client users
6. Integrar con eventos/tarjetas digitales
7. Implementar UI de personalización de diseño

## Common Patterns

### Protected Server Action (Master Admin Only)

```typescript
'use server'

import { getCurrentUser } from '@/lib/supabase'
import { UserRole } from '@/types/user'

export async function onlyForMasterAdmin(data: any) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const profile = await getUserProfile(user.id)

  if (profile?.role !== UserRole.MASTER_ADMIN) {
    throw new Error('Only master admins can do this')
  }

  // Implementar lógica
}
```

### Protected Server Action (Client User With Permission)

```typescript
'use server'

import { getCurrentUser } from '@/lib/supabase'
import { UserPermission } from '@/types/user'
import { hasPermission } from '@/services/users'

export async function createEventAction(data: any) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const profile = await getUserProfile(user.id)

  if (!profile?.tenant_id) {
    throw new Error('Not a client user')
  }

  const canCreate = await hasPermission(
    user.id,
    profile.tenant_id,
    UserPermission.CREATE_EVENT
  )

  if (!canCreate) {
    throw new Error('Permission denied: create_event')
  }

  // Crear evento
}
```

## Troubleshooting

### ERROR: invalid input syntax for type uuid

**Síntoma:** 
```
ERROR:  22P02: invalid input syntax for type uuid: "user-uuid-here"
```

**Causa:** Estás usando la cadena literal `'user-uuid-here'` en lugar del UUID real

**Solución:**
1. Supabase Dashboard → Authentication → Users
2. Encontrar el usuario creado
3. Copiar el UUID (ejemplo: `550e8400-e29b-41d4-a716-446655440000`)
4. Reemplazar en la query SQL:
```sql
-- ❌ INCORRECTO
INSERT INTO users (id, email, full_name, role, status, tenant_id)
VALUES ('user-uuid-here', ...);

-- ✅ CORRECTO
INSERT INTO users (id, email, full_name, role, status, tenant_id)
VALUES ('550e8400-e29b-41d4-a716-446655440000', ...);
```

### "Unauthorized" error en RLS

- Verificar que el usuario tiene un tenant_id válido (para client users)
- Verificar que la RLS policy existe
- Verificar que auth.uid() coincide con el usuario en sesión

### Master admin no puede ver datos

- Verificar que `role = 'master_admin'` en tabla users
- Verificar que `tenant_id = NULL` para master admin

### Client user no puede ver su tenant

- Verificar que `role = 'client_user'`
- Verificar que `tenant_id` es el UUID correcto del tenant
- Verificar que existe registro en user_permissions

## Support & Monitoring

Usa la tabla `audit_logs` para:
- Monitorear acciones de master admins
- Debuggear problemas de permisos
- Mantener historial de cambios

```typescript
const logs = await getUserAuditLog(adminId, userId)
logs.forEach(log => console.log(log))
```
