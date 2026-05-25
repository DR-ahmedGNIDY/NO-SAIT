'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, User, Phone, Briefcase, FileText, DollarSign } from 'lucide-react'

const budgetOptions = [
  'أقل من 3,000 ريال',
  '3,000 - 6,000 ريال',
  '6,000 - 12,000 ريال',
  '12,000 - 25,000 ريال',
  'أكثر من 25,000 ريال',
]

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessType: '',
    description: '',
    budget: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          phone: '',
          businessType: '',
          description: '',
          budget: '',
        })
      }
    } catch (error) {
      console.error('Failed to submit booking')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass-dark rounded-3xl p-12 max-w-md mx-4"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">تم الإرسال بنجاح!</h2>
          <p className="text-white/60 mb-8">
            شكراً لتواصلك معنا. سنقوم بمراجعة طلبك والرد عليك في أقرب وقت ممكن.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-gradient-to-r from-electric-600 to-purple-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            إرسال طلب جديد
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            احجز <span className="text-gradient">موعدك</span>
          </h1>
          <p className="text-white/50 text-lg">
            املأ النموذج التالي وسنقوم بالتواصل معك لبدء مشروعك
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-dark rounded-3xl p-8 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
                <User className="w-4 h-4 text-electric-400" />
                الاسم
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-electric-500 transition-colors"
                placeholder="الاسم الكريم"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
                <Phone className="w-4 h-4 text-electric-400" />
                رقم الهاتف
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-electric-500 transition-colors"
                placeholder="05xxxxxxxx"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
              <Briefcase className="w-4 h-4 text-electric-400" />
              نوع النشاط
            </label>
            <input
              type="text"
              required
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-electric-500 transition-colors"
              placeholder="مثال: متجر إلكتروني، شركة استشارات، مطعم..."
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
              <FileText className="w-4 h-4 text-electric-400" />
              وصف المشروع
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-electric-500 transition-colors resize-none"
              placeholder="صف مشروعك بالتفصيل..."
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
              <DollarSign className="w-4 h-4 text-electric-400" />
              الميزانية التقريبية
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {budgetOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData({ ...formData, budget: option })}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    formData.budget === option
                      ? 'bg-gradient-to-r from-electric-600 to-purple-accent text-white shadow-lg'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-electric-600 to-purple-accent text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-electric-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                إرسال الطلب
              </>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  )
}