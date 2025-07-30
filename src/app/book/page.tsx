'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { supabase, Service } from '@/lib/supabase'
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react'

export default function BookPage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceId: '',
    appointmentTime: '',
    note: ''
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 首先创建或查找用户
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('phone', formData.phone)
        .single()

      let userId: string

      if (userError && userError.code === 'PGRST116') {
        // 用户不存在，创建新用户
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            name: formData.name,
            phone: formData.phone,
            email: formData.email || null
          })
          .select('id')
          .single()

        if (createError) throw createError
        userId = newUser.id
      } else if (userError) {
        throw userError
      } else {
        userId = userData.id
      }

      // 创建预约
      const { error: appointmentError } = await supabase
        .from('appointments')
        .insert({
          user_id: userId,
          service_id: formData.serviceId,
          appointment_time: formData.appointmentTime,
          note: formData.note || null
        })

      if (appointmentError) throw appointmentError

      // 预约成功，跳转到成功页面
      router.push('/success')
    } catch (error) {
      console.error('Error creating appointment:', error)
      alert('预约失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">在线预约</h1>
          <p className="text-xl text-gray-600">填写信息，选择服务，轻松预约您的美容服务</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 预约表单 */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">预约信息</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 用户信息 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  个人信息
                </h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    姓名 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="请输入您的姓名"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    手机号 *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="请输入您的手机号"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="请输入您的邮箱（可选）"
                  />
                </div>
              </div>

              {/* 服务选择 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  服务选择
                </h3>
                
                <div>
                  <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-2">
                    选择服务 *
                  </label>
                  <select
                    id="serviceId"
                    name="serviceId"
                    required
                    value={formData.serviceId}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">请选择服务项目</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ¥{service.price} ({service.duration}分钟)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700 mb-2">
                    预约时间 *
                  </label>
                  <input
                    type="datetime-local"
                    id="appointmentTime"
                    name="appointmentTime"
                    required
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    className="input-field"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                <div>
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                    备注
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    className="input-field"
                    rows={3}
                    placeholder="如有特殊需求，请在此说明"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '提交中...' : '确认预约'}
              </button>
            </form>
          </div>

          {/* 服务列表 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">服务项目</h2>
            
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-gray-600 mt-1">{service.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration}分钟
                        </span>
                        <span className="text-primary-600 font-semibold">¥{service.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 预约须知 */}
            <div className="card bg-primary-50 border-primary-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">预约须知</h3>
              <ul className="space-y-2 text-sm text-primary-800">
                <li>• 请提前15分钟到达，以便准备</li>
                <li>• 如需取消预约，请提前2小时联系</li>
                <li>• 请携带有效身份证件</li>
                <li>• 如有过敏史，请提前告知</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 