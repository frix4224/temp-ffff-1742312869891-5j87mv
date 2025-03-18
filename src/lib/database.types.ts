export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          address: string | null
          city: string | null
          postal_code: string | null
          preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      roles: {
        Row: {
          id: string
          role_name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          role_name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role_name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_types: {
        Row: {
          id: string
          name: string
          status: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          status?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          status?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          user_identifier: number
          name: string | null
          email: string
          mobile: string | null
          email_verified_at: string | null
          is_mobile_verified: boolean
          password: string
          role_id: string | null
          device_id: string | null
          device_os: string | null
          type: number
          user_type_id: string | null
          provider_name: string | null
          provider_id: string | null
          remember_token: string | null
          status: boolean
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_identifier: number
          name?: string | null
          email: string
          mobile?: string | null
          email_verified_at?: string | null
          is_mobile_verified?: boolean
          password: string
          role_id?: string | null
          device_id?: string | null
          device_os?: string | null
          type?: number
          user_type_id?: string | null
          provider_name?: string | null
          provider_id?: string | null
          remember_token?: string | null
          status?: boolean
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_identifier?: number
          name?: string | null
          email?: string
          mobile?: string | null
          email_verified_at?: string | null
          is_mobile_verified?: boolean
          password?: string
          role_id?: string | null
          device_id?: string | null
          device_os?: string | null
          type?: number
          user_type_id?: string | null
          provider_name?: string | null
          provider_id?: string | null
          remember_token?: string | null
          status?: boolean
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_addresses: {
        Row: {
          id: string
          user_id: string | null
          address: string
          lat: number
          long: number
          type: string
          specifications: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          address: string
          lat: number
          long: number
          type: string
          specifications?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          address?: string
          lat?: number
          long?: number
          type?: string
          specifications?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_devices: {
        Row: {
          id: string
          user_id: string | null
          device_id: string | null
          device_os: string | null
          fcm_token: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          device_id?: string | null
          device_os?: string | null
          fcm_token?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          device_id?: string | null
          device_os?: string | null
          fcm_token?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}