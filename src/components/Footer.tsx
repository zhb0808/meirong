import Link from 'next/link'
import { Sparkles, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">美丽预约</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              专业的美容服务预约平台，为您提供便捷、高效的美容体验。
              我们致力于让每一位顾客都能享受到最优质的服务。
            </p>
            <div className="flex space-x-4">
              <Link href="/services" className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
                服务项目
              </Link>
              <Link href="/about" className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
                关于我们
              </Link>
              <Link href="/contact" className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
                联系我们
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">联系方式</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-600" />
                <span className="text-gray-600">400-888-8888</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-600" />
                <span className="text-gray-600">service@beauty.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-600" />
                <span className="text-gray-600">北京市朝阳区xxx街道</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">快速链接</h3>
            <div className="space-y-2">
              <Link href="/book" className="block text-gray-600 hover:text-primary-600 transition-colors duration-200">
                在线预约
              </Link>
              <Link href="/appointments" className="block text-gray-600 hover:text-primary-600 transition-colors duration-200">
                我的预约
              </Link>
              <Link href="/admin" className="block text-gray-600 hover:text-primary-600 transition-colors duration-200">
                管理后台
              </Link>
              <Link href="/help" className="block text-gray-600 hover:text-primary-600 transition-colors duration-200">
                帮助中心
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 美丽预约. 保留所有权利.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                隐私政策
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                服务条款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 