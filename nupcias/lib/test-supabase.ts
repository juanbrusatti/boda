/**
 * Test script to verify Supabase connection
 * Run: npx tsx lib/test-supabase.ts
 */

import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function testConnection() {
  console.log('Testing Supabase connection...')
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

  try {
    // Test 1: Check Auth
    const {
      data: { session },
    } = await supabase.auth.getSession()
    console.log('✓ Auth session check:', session ? 'Has session' : 'No session')

    // Test 2: Check if we can query users
    const { data, error } = await supabase.from('users').select('id, email, role').limit(1)

    if (error) {
      console.error('✗ Error querying users:', error)
    } else {
      console.log('✓ Successfully queried users table')
      console.log('  Sample data:', data)
    }
  } catch (err) {
    console.error('✗ Error:', err)
  }
}

testConnection()
