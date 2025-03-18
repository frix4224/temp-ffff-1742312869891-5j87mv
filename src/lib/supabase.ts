import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Enable session persistence
    autoRefreshToken: true, // Enable automatic token refresh
    storageKey: 'eazyy.auth.token', // Custom storage key
    storage: localStorage // Use localStorage for persistence
  }
});

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type User = Database['public']['Tables']['users']['Row'];
export type UserAddress = Database['public']['Tables']['user_addresses']['Row'];
export type UserDevice = Database['public']['Tables']['user_devices']['Row'];