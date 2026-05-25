'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="text-center glass-dark rounded-3xl p-12 max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">حدث خطأ ما</h2>
        <p className="text-white/50 mb-8">
          نعتذر عن الإزعاج. يرجى المحاولة مرة أخرى.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-electric-600 to-purple-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          إعادة المحاولة
        </button>
      </div>
    </div>
  )
}