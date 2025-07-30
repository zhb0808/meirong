import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cuyxgvivcskduejajkld.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eXhndml2Y3NrZHVlamFqa2xkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NDMwNTksImV4cCI6MjA2OTQxOTA1OX0.cRMJc5Cozdw7WaM-LwNpUa4kti3wm8UDOrx36g-LOT8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库类型定义
export interface User {
  id: string
  name: string
  phone: string
  email?: string
  created_at: string
}

export interface Service {
  id: string
  name: string
  description?: string
  duration: number
  price: number
  is_active: boolean
  created_at: string
}

export interface Appointment {
  id: string
  user_id: string
  service_id: string
  appointment_time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  note?: string
  created_at: string
  user?: User
  service?: Service
} 