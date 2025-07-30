'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">美丽预约</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">
              首页
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">
              服务项目
            </Link>
            <Link href="/appointments" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">
              我的预约
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">
              管理后台
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/book" className="btn-primary">
              立即预约
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-xl mt-4 shadow-lg border border-gray-100">
              <Link
                href="/"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                服务项目
              </Link>
              <Link
                href="/appointments"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                我的预约
              </Link>
              <Link
                href="/admin"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                管理后台
              </Link>
              <div className="pt-2">
                <Link
                  href="/book"
                  className="btn-primary w-full text-center block"
                  onClick={() => setMenuOpen(false)}
                >
                  立即预约
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 