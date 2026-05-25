'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Globe, ShoppingCart, Smartphone, Paintbrush, Search, Shield } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Globe,
    title: 'تصميم المواقع',
    description: 'تصاميم عصرية وجذابة تعكس هوية علامتك التجارية وتلفت انتباه زوارك من اللحظة الأولى.',
    features: ['تصميم UI/UX احترافي', 'تصميم متجاوب', 'تصميم فريد ومخصص'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: ShoppingCart,
    title: 'التجارة الإلكترونية',
    description: 'متاجر إلكترونية متكاملة مع أنظمة دفع آمنة وإدارة مخزون ذكية لتنمية أعمالك.',
    features: ['ربط بوابات الدفع', 'إدارة المنتجات', 'تتبع الطلبات'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Smartphone,
    title: 'تطبيقات الويب',
    description: 'تطبيقات ويب تفاعلية وسريعة تعمل على جميع الأجهزة مع تجربة مستخدم سلسة.',
    features: ['PWA تطبيقات', 'واجهة تفاعلية', 'أداء فائق'],
    color: 'from-electric-500 to-blue-600',
  },
  {
    icon: Paintbrush,
    title: 'هوية بصرية',
    description: 'تصميم شعارات وهوية بصرية متكاملة تبني حضوراً قوياً لعلامتك التجارية.',
    features: ['تصميم الشعارات', 'دليل الهوية', 'مواد تسويقية'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Search,
    title: 'تحسين محركات البحث',
    description: 'استراتيجيات SEO متقدمة لتحسين ظهور موقعك في نتائج البحث وجذب المزيد من الزوار.',
    features: ['تحليل الكلمات المفتاحية', 'تحسين المحتوى', 'بناء الروابط'],
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Shield,
    title: 'أمان وحماية',
    description: 'حماية شاملة لموقعك مع شهادات SSL وفحوصات أمان دورية وحماية من الهجمات.',
    features: ['شهادة SSL', 'نسخ احتياطي يومي', 'حماية DDoS'],
    color: 'from-red-500 to-rose-600',
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            خدماتنا <span className="text-gradient">المتكاملة</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات الرقمية لتطوير حضورك على الإنترنت
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 rounded-3xl glass-dark hover-lift overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-white/50 mb-6 leading-relaxed">{service.description}</p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-white/70 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className="inline-flex items-center gap-2 text-electric-400 hover:text-electric-300 font-medium text-sm transition-colors"
              >
                اطلب الخدمة
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}