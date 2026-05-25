'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Globe, Palette, Code, Rocket, ChevronLeft } from 'lucide-react'

const features = [
  {
    icon: Globe,
    title: 'تصميم احترافي',
    description: 'تصاميم عصرية وجذابة تلفت انتباه زوارك وتعكس هوية علامتك التجارية',
  },
  {
    icon: Code,
    title: 'تطوير متقدم',
    description: 'كود نظيف ومحسن لأداء فائق السرعة وتجربة مستخدم سلسة',
  },
  {
    icon: Palette,
    title: 'واجهة تفاعلية',
    description: 'تصاميم تفاعلية مع رسوم متحركة سلسة وتأثيرات بصرية مذهلة',
  },
  {
    icon: Rocket,
    title: 'تحسين الأداء',
    description: 'مواقع سريعة التحميل محسنة لمحركات البحث لتحقيق أفضل النتائج',
  },
]

const stats = [
  { value: '150+', label: 'مشروع منجز' },
  { value: '98%', label: 'رضا العملاء' },
  { value: '5+', label: 'سنوات خبرة' },
  { value: '24/7', label: 'دعم فني' },
]

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-600/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-accent/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjZlZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-right"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-500/10 border border-electric-500/20 text-electric-400 text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                نحن نصنع المستقبل الرقمي
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                <span className="text-white">مشروعك يستاهل</span>
                <br />
                <span className="text-gradient">ويب سايت يخليه يكبر</span>
              </h1>

              <p className="text-xl text-white/60 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                نصمم ونطور مواقع إلكترونية احترافية تجمع بين التصميم العصري والأداء الفائق. 
                دعنا نحول رؤيتك إلى واقع رقمي مذهل.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/booking"
                  className="group px-8 py-4 bg-gradient-to-r from-electric-600 to-purple-accent text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-electric-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  ابدأ مشروعك الآن
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/portfolio"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  شاهد أعمالنا
                  <ChevronLeft className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10"
                >
                  <div className="relative bg-navy-900 rounded-t-2xl p-3 border border-white/10 shadow-2xl">
                    <div className="bg-navy-800 rounded-lg overflow-hidden aspect-video relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-electric-600/20 to-purple-accent/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-electric-500 to-purple-accent flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-white font-bold text-lg">NOSAIT</p>
                          <p className="text-white/50 text-sm">موقعك الاحترافي</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-4 bg-navy-800 rounded-b-lg border-x border-b border-white/10" />
                  <div className="h-2 bg-navy-700 mx-auto w-1/3 rounded-b-lg" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-12 -left-8 w-32 z-20"
                >
                  <div className="bg-navy-900 rounded-3xl p-2 border border-white/10 shadow-2xl">
                    <div className="bg-navy-800 rounded-2xl overflow-hidden aspect-[9/19] relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-electric-600/30 to-purple-accent/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-electric-500 to-purple-accent flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-950/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              لماذا تختار <span className="text-gradient">NOSAIT</span>؟
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              نقدم حلولاً متكاملة لتصميم وتطوير المواقع بأحدث التقنيات
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-3xl glass-dark hover-lift"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-500/20 to-purple-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-electric-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-600/20 to-purple-accent/20" />
        <div className="absolute inset-0 backdrop-blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              جاهز لتطوير <span className="text-gradient">موقعك</span>؟
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              دعنا نناقش مشروعك ونحول أفكارك إلى واقع رقمي مذهل. تواصل معنا اليوم.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-electric-600 to-purple-accent text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-electric-500/25 transition-all duration-300 hover:scale-105"
            >
              احجز استشارة مجانية
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}