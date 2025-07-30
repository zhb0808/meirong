import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircle, Calendar, Clock, ArrowRight } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-success-600" />
          </div>
          
          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            预约成功！
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            您的预约已提交成功，我们会尽快与您确认。
          </p>
          
          {/* Next Steps */}
          <div className="card text-left mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">接下来会发生什么？</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-primary-600">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">确认预约</h3>
                  <p className="text-gray-600 text-sm">我们会在24小时内通过电话或短信确认您的预约</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-primary-600">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">准备服务</h3>
                  <p className="text-gray-600 text-sm">我们会根据您的需求准备相应的服务和产品</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-primary-600">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">享受服务</h3>
                  <p className="text-gray-600 text-sm">按时到达，享受专业的美容服务体验</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="card bg-primary-50 border-primary-200 mb-8">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">联系方式</h3>
            <div className="space-y-2 text-sm text-primary-800">
              <p>📞 客服电话：400-888-8888</p>
              <p>📧 客服邮箱：service@beauty.com</p>
              <p>📍 地址：北京市朝阳区xxx街道</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointments" className="btn-primary">
              查看我的预约
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/" className="btn-secondary">
              返回首页
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 