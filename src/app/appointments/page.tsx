'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { supabase, Appointment } from '@/lib/supabase'
import { Search, Phone, Calendar, Clock, User, MessageSquare } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default function AppointmentsPage() {
  const [phone, setPhone] = useState('')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          user:users(name, phone),
          service:services(name, price, duration)
        `)
        .eq('user.phone', phone)
        .order('appointment_time', { ascending: false })

      if (error) throw error
      setAppointments(data || [])
      setSearched(true)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      alert('查询失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待确认'
      case 'confirmed': return '已确认'
      case 'cancelled': return '已取消'
      case 'completed': return '已完成'
      default: return status
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending': return 'status-pending'
      case 'confirmed': return 'status-confirmed'
      case 'cancelled': return 'status-cancelled'
      case 'completed': return 'status-completed'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">查询预约</h1>
          <p className="text-xl text-gray-600">输入您的手机号，查看预约记录</p>
        </div>

        {/* Search Form */}
        <div className="card max-w-md mx-auto mb-12">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                手机号
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field pl-10"
                  placeholder="请输入您的手机号"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '查询中...' : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  查询预约
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              预约记录
            </h2>
            
            {appointments.length === 0 ? (
              <div className="card text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无预约记录</h3>
                <p className="text-gray-600">该手机号下暂无预约记录，请确认手机号是否正确</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="card">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {appointment.service?.name}
                          </h3>
                          <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>{appointment.user?.name}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>{appointment.user?.phone}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {format(new Date(appointment.appointment_time), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>¥{appointment.service?.price} ({appointment.service?.duration}分钟)</span>
                          </div>
                        </div>
                        
                        {appointment.note && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{appointment.note}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
} 