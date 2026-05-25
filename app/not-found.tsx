import Link from 'next/link'
import { ArrowLeft, AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-electric-500/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-12 h-12 text-electric-400" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-white/50 text-lg mb-8">الصفحة التي تبحث عنها غير موجودة</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-electric-600 to-purple-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  )
}