import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'deposit' | 'withdrawal' | 'game_win' | 'game_loss'
          amount: number
          status: 'pending' | 'completed' | 'failed'
          description: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: 'deposit' | 'withdrawal' | 'game_win' | 'game_loss'
          amount: number
          status?: 'pending' | 'completed' | 'failed'
          description: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'deposit' | 'withdrawal' | 'game_win' | 'game_loss'
          amount?: number
          status?: 'pending' | 'completed' | 'failed'
          description?: string
          created_at?: string | null
        }
      }
    }
  }
}