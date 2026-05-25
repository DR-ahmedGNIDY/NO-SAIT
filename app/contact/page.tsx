'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'البريد الإلكتروني',
      value: 'info@nosait.com',
      href: 'mailto:info@nosait.com',
    },
    {
      icon: Phone,
      label: 'رقم الهاتف',
      value: '+966 50 000 0000',
      href: 'tel:+966500000000',
    },
    {
      icon: MapPin,
      label: 'العنوان',
      value: 'الرياض، المملكة العربية السعودية',
      href: '#',
    },
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            تواصل <span className="text-gradient">معنا</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            نحن هنا لمساعدتك. تواصل معنا اليوم ودعنا نناقش مشروعك
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-dark rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">معلومات التواصل</h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-500/20 to-purple-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-electric-400" />
                    </div>
                    <div>
                      <p className="text-white/50 text-sm">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-dark rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">ساعات العمل</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">الأحد - الخميس</span>
                  <span className="text-white">9:00 ص - 6:00 م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">الجمعة</span>
                  <span className="text-white">مغلق</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">السبت</span>
                  <span className="text-white">10:00 ص - 4:00 م</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass-dark rounded-3xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">أرسل رسالتك</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 text-sm mb-2">الاسم</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-electric-500 transition-colors"
                    placeholder="اسمك الكريم"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-electric-500 transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">الموضوع</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-electric-500 transition-colors"
                  placeholder="موضوع الرسالة"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">الرسالة</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-electric-500 transition-colors resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-electric-600 to-purple-accent text-white hover:shadow-lg hover:shadow-electric-500/25'
                }`}
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    تم الإرسال بنجاح
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    إرسال الرسالة
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}