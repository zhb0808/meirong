import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, Sparkles, Clock, Star, Users, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              专业美容服务
              <span className="text-gradient block">在线预约平台</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              享受专业的美容、美甲、美发服务，在线预约，便捷高效。
              让美丽触手可及，让服务更加贴心。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="btn-primary text-lg px-8 py-4">
                立即预约
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/services" className="btn-secondary text-lg px-8 py-4">
                查看服务
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary-300 rounded-full opacity-20"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              为什么选择我们
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              我们致力于为您提供最优质的美容服务体验
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">专业服务</h3>
              <p className="text-gray-600">
                拥有多年经验的专业美容师，为您提供最优质的服务体验
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-success-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">便捷预约</h3>
              <p className="text-gray-600">
                24小时在线预约，随时随地，轻松安排您的美容时间
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-warning-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">品质保证</h3>
              <p className="text-gray-600">
                使用优质产品，严格消毒流程，确保您的健康与美丽
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              热门服务
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              精选优质服务项目，满足您的各种美容需求
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: '面部护理',
                description: '深层清洁、补水保湿、美白嫩肤',
                duration: '60分钟',
                price: '¥128',
                color: 'from-pink-500 to-rose-500'
              },
              {
                name: '美甲服务',
                description: '指甲护理、美甲设计、手部护理',
                duration: '45分钟',
                price: '¥88',
                color: 'from-purple-500 to-indigo-500'
              },
              {
                name: '美发造型',
                description: '洗发、剪发、造型设计',
                duration: '90分钟',
                price: '¥158',
                color: 'from-blue-500 to-cyan-500'
              }
            ].map((service, index) => (
              <div key={index} className="card group hover:shadow-xl transition-all duration-300">
                <div className={`w-full h-32 bg-gradient-to-r ${service.color} rounded-xl mb-6 flex items-center justify-center`}>
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">时长: {service.duration}</span>
                  <span className="text-2xl font-bold text-primary-600">{service.price}</span>
                </div>
                <Link href="/book" className="btn-primary w-full text-center">
                  立即预约
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary text-lg px-8 py-4">
              查看所有服务
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            开始您的美容之旅
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            立即预约，享受专业的美容服务，让美丽从今天开始
          </p>
          <Link href="/book" className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 inline-flex items-center">
            立即预约
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
