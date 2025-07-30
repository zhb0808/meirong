'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { supabase, Service } from '@/lib/supabase'
import { Clock, Star, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

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
    } finally {
      setLoading(false)
    }
  }

  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes('面部')) return '🌸'
    if (serviceName.includes('美甲')) return '💅'
    if (serviceName.includes('美发')) return '💇‍♀️'
    if (serviceName.includes('身体')) return '💆‍♀️'
    if (serviceName.includes('脱毛')) return '✨'
    return '💫'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">服务项目</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">专业的美容服务，让您焕发光彩，展现最美的自己</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">加载中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service) => (
              <div key={service.id} className="group">
                <div className="card h-full flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  {/* Service Icon */}
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-4xl">{getServiceIcon(service.name)}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                  
                  {/* Service Details */}
                  <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        服务时长
                      </span>
                      <span className="font-semibold text-gray-900">{service.duration}分钟</span>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-2">¥{service.price}</div>
                      <div className="text-sm text-gray-500">起</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-success-500 mr-2 flex-shrink-0" />
                        <span>专业美容师</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-success-500 mr-2 flex-shrink-0" />
                        <span>品质保证</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-success-500 mr-2 flex-shrink-0" />
                        <span>安全可靠</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Booking Button */}
                  <div className="mt-8">
                    <Link 
                      href={`/book?service=${service.id}`}
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group-hover:shadow-2xl"
                      style={{minHeight: 0, height: '48px', fontSize: '1.1rem', letterSpacing: '0.02em'}}
                    >
                      <span className="inline-block">立即预约</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Service Features */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">为什么选择我们</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">专业团队，优质服务，让您的美容体验更加完美</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">专业团队</h3>
              <p className="text-gray-600 leading-relaxed">
                拥有多年经验的专业美容师，持证上岗，技术精湛，为您提供最优质的服务体验
              </p>
            </div>
            
            <div className="card text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-success-500 to-success-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">优质产品</h3>
              <p className="text-gray-600 leading-relaxed">
                使用国际知名品牌产品，安全可靠，效果显著，让您的美丽更加持久
              </p>
            </div>
            
            <div className="card text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-warning-500 to-warning-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">便捷预约</h3>
              <p className="text-gray-600 leading-relaxed">
                24小时在线预约，灵活安排时间，服务更贴心，让您的美容计划更加轻松
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="card bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white p-12 shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">开始您的美容之旅</h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              立即预约，享受专业的美容服务体验，让美丽从今天开始
            </p>
            <Link 
              href="/book" 
              className="bg-white text-primary-600 hover:bg-gray-50 font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center text-lg"
            >
              立即预约
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 