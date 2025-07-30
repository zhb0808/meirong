'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { supabase, Appointment } from '@/lib/supabase'
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Filter
} from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          user:users(name, phone, email),
          service:services(name, price, duration)
        `)
        .order('appointment_time', { ascending: false })

      if (error) throw error
      setAppointments(data || [])
    } catch (error) {
      console.error('Error fetching appointments:', error)
      alert('获取预约数据失败')
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId)

      if (error) throw error
      
      // 更新本地状态
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: newStatus as any }
            : apt
        )
      )
    } catch (error) {
      console.error('Error updating appointment status:', error)
      alert('更新状态失败')
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

  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter
    const matchesSearch = searchTerm === '' || 
      appointment.user?.name?.includes(searchTerm) ||
      appointment.user?.phone?.includes(searchTerm) ||
      appointment.service?.name?.includes(searchTerm)
    
    return matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">管理后台</h1>
          <p className="text-xl text-gray-600">查看和管理所有预约记录</p>
        </div>

        {/* Filters and Search */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                搜索
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                  placeholder="搜索姓名、手机号或服务"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                状态筛选
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">全部状态</option>
                <option value="pending">待确认</option>
                <option value="confirmed">已确认</option>
                <option value="cancelled">已取消</option>
                <option value="completed">已完成</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={fetchAppointments}
                disabled={loading}
                className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
                刷新数据
              </button>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="card text-center py-12">
              <RefreshCw className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">加载中...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="card text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无预约记录</h3>
              <p className="text-gray-600">没有找到匹配的预约记录</p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {appointment.service?.name}
                      </h3>
                      <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
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
                          {format(new Date(appointment.appointment_time), 'MM/dd HH:mm', { locale: zhCN })}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>¥{appointment.service?.price}</span>
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
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 lg:flex-col">
                    {appointment.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                          className="btn-success text-sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          确认
                        </button>
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                          className="btn-error text-sm"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          取消
                        </button>
                      </>
                    )}
                    
                    {appointment.status === 'confirmed' && (
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                        className="btn-success text-sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        标记完成
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: '总预约数', value: appointments.length, color: 'bg-primary-100 text-primary-700' },
            { label: '待确认', value: appointments.filter(a => a.status === 'pending').length, color: 'bg-warning-100 text-warning-700' },
            { label: '已确认', value: appointments.filter(a => a.status === 'confirmed').length, color: 'bg-success-100 text-success-700' },
            { label: '已完成', value: appointments.filter(a => a.status === 'completed').length, color: 'bg-gray-100 text-gray-700' }
          ].map((stat, index) => (
            <div key={index} className="card text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color} mb-3`}>
                <span className="text-xl font-bold">{stat.value}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
} 