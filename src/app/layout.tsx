import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '美丽预约 - 专业美容服务',
  description: '提供专业的美容、美甲、美发等服务，在线预约，便捷高效',
  keywords: '美容,美甲,美发,预约,护理',
  authors: [{ name: '美丽预约' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {children}
      </body>
    </html>
  )
}
