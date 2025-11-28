import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
export const supabaseConfigErrorMessage =
  'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment to enable authentication and profile features.'

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