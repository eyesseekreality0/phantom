import { createClient } from '@supabase/supabase-js'

const env = import.meta.env as Record<string, string | undefined>

const netlifyEnvGet = (key: string) => {
  const netlifyEnv = (globalThis as { Netlify?: { env?: Record<string, string> | { get?: (name: string) => string | undefined } } })
    .Netlify?.env

  if (!netlifyEnv) return undefined

  if (typeof (netlifyEnv as { get?: (name: string) => string | undefined }).get === 'function') {
    return (netlifyEnv as { get: (name: string) => string | undefined }).get(key)
  }

  return (netlifyEnv as Record<string, string | undefined>)[key]
}

const normalizeEnvValue = (value: string | undefined) => {
  if (!value) return undefined

  const trimmed = value.trim()
  if (!trimmed || trimmed.toLowerCase() === 'undefined' || trimmed.toLowerCase() === 'null') {
    return undefined
  }

  return trimmed
}

const getEnvVar = (...keys: string[]) => {
  for (const key of keys) {
    const fromImportMeta = normalizeEnvValue(env[key])
    if (fromImportMeta) return fromImportMeta

    const fromProcess = normalizeEnvValue((globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.[key])
    if (fromProcess) return fromProcess

    const fromNetlifyEnv = normalizeEnvValue(netlifyEnvGet(key))
    if (fromNetlifyEnv) return fromNetlifyEnv

    const fromGlobal = normalizeEnvValue((globalThis as Record<string, string | undefined>)[key])
    if (fromGlobal) return fromGlobal
  }

  return undefined
}

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'SUPABASE_URL')
// Prefer the anonymous key for browser usage; fall back to the provided
// service role key when no anon key is available so deployments with only
// VITE_SUPABASE_SERVICE_ROLE_KEY defined still boot. Note that bundling a
// service role key in the client is not recommended.
const supabaseAnonKey = getEnvVar(
  'VITE_SUPABASE_ANON_KEY',
  'SUPABASE_ANON_KEY',
  'VITE_SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
)

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
export const supabaseConfigErrorMessage = supabaseConfigured
  ? ''
  : 'Supabase is not configured. Set VITE_SUPABASE_URL and either VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_SERVICE_ROLE_KEY in your environment to enable authentication and profile features.'

export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          username: string
          display_name: string | null
          profile_picture: string | null
          balance: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          username: string
          display_name?: string | null
          profile_picture?: string | null
          balance?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          username?: string
          display_name?: string | null
          profile_picture?: string | null
          balance?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      user_game_accounts: {
        Row: {
          id: string
          user_id: string
          game_name: string
          game_username: string
          game_password: string
          game_balance: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          game_name: string
          game_username: string
          game_password: string
          game_balance?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          game_name?: string
          game_username?: string
          game_password?: string
          game_balance?: number
          created_at?: string | null
          updated_at?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'deposit' | 'withdrawal' | 'transfer_to_game' | 'transfer_from_game'
          amount: number
          status: 'pending' | 'completed' | 'failed'
          payment_method: string | null
          game_name: string | null
          description: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: 'deposit' | 'withdrawal' | 'transfer_to_game' | 'transfer_from_game'
          amount: number
          status?: 'pending' | 'completed' | 'failed'
          payment_method?: string | null
          game_name?: string | null
          description: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'deposit' | 'withdrawal' | 'transfer_to_game' | 'transfer_from_game'
          amount?: number
          status?: 'pending' | 'completed' | 'failed'
          payment_method?: string | null
          game_name?: string | null
          description?: string
          created_at?: string | null
        }
      }
    }
  }
}