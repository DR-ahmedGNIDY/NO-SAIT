'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'الباقة الأساسية',
    price: '2,999',
    period: 'ريال',
    description: 'مثالية للمواقع الشخصية والمدونات',
    features: [
      'تصميم صفحة واحدة',
      'تصميم متجاوب',
      'نموذج تواصل',
      'تحسين SEO أساسي',
      'دعم فني لمدة شهر',
      'تسليم خلال 5 أيام',
    ],
    popular: false,
  },
  {
    name: 'الباقة الاحترافية',
    price: '5,999',
    period: 'ريال',
    description: 'مثالية للشركات الناشئة والأعمال الصغيرة',
    features: [
      'تصميم حتى 5 صفحات',
      'تصميم UI/UX مخصص',
      'لوحة تحكم سهلة',
      'تحسين SEO متقدم',
      'ربط وسائل التواصل',
      'دعم فني لمدة 3 أشهر',
      'تسليم خلال 10 أيام',
      'تقرير أداء شهري',
    ],
    popular: true,
  },
  {
    name: 'الباقة المتقدمة',
    price: '12,999',
    period: 'ريال',
    description: 'مثالية للشركات المتوسطة والمتاجر',
    features: [
      'تصميم غير محدود الصفحات',
      'تصميم UI/UX احترافي',
      'نظام إدارة محتوى متكامل',
      'تجارة إلكترونية',
      'بوابات دفع متعددة',
      'تحسين SEO شامل',
      'دعم فني لمدة 6 أشهر',
      'تسليم خلال 20 يوم',
      'تدريب على الإدارة',
    ],
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            باقات <span className="text-gradient">الأسعار</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            اختر الباقة المناسبة لاحتياجاتك وابدأ رحلتك الرقمية اليوم
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-b from-electric-600/20 to-purple-accent/20 border-2 border-electric-500/50'
                  : 'glass-dark border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 bg-gradient-to-r from-electric-500 to-purple-accent rounded-full text-white text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    الأكثر طلباً
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/50 text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                  <span className="text-white/50 text-lg">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-white/70">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.popular ? 'bg-electric-500/20' : 'bg-white/5'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-electric-400' : 'text-white/50'}`} />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className={`block w-full text-center py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-electric-600 to-purple-accent text-white hover:shadow-lg hover:shadow-electric-500/25'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                اختر الباقة
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 mb-4">تحتاج باقة مخصصة؟</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-electric-400 hover:text-electric-300 font-medium transition-colors"
          >
            تواصل معنا للحصول على عرض مخصص
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}