'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'أحمد محمد',
    role: 'مدير شركة التقنية',
    content: 'تعاملت مع NOSAIT لتصميم موقع شركتنا وكانت النتيجة مذهلة. التصميم عصري والأداء سريع جداً. فريق محترف ومتعاون.',
    rating: 5,
    avatar: 'أم',
  },
  {
    name: 'سارة العلي',
    role: 'صاحبة متجر إلكتروني',
    content: 'المتجر الإلكتروني الذي صمموه لي زاد مبيعاتي بنسبة 200%. التصميم جذاب وسهل الاستخدام والدعم الفني ممتاز.',
    rating: 5,
    avatar: 'سع',
  },
  {
    name: 'خالد الراشد',
    role: 'مؤسس شركة ناشئة',
    content: 'خدمة احترافية من البداية للنهاية. فهموا رؤيتي تماماً وحولوها إلى موقع يفوق توقعاتي. أنصح بالتعامل معهم بشدة.',
    rating: 5,
    avatar: 'خر',
  },
  {
    name: 'فاطمة الزهراء',
    role: 'مديرة التسويق',
    content: 'أفضل شركة تصميم مواقع تعاملت معها. الاهتمام بالتفاصيل والجودة العالية في العمل يميزهم عن غيرهم.',
    rating: 5,
    avatar: 'فز',
  },
  {
    name: 'عبدالله السالم',
    role: 'صاحب مطعم',
    content: 'موقع المطعم أصبح وجهتنا الرئيسية للحجوزات. التصميم أنيق والنظام سهل الاستخدام. شكراً لفريق NOSAIT.',
    rating: 5,
    avatar: 'عس',
  },
  {
    name: 'نورة الفهد',
    role: 'مديرة مكتب استشارات',
    content: 'الموقع الجديد عكس احترافية مكتبنا بشكل مثالي. العملاء يشكرون سهولة التصفح والمعلومات الواضحة.',
    rating: 5,
    avatar: 'نف',
  },
]

export default function TestimonialsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            آراء <span className="text-gradient">عملائنا</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            نفخر بثقة عملائنا ونسعى دائماً لتقديم الأفضل
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-3xl glass-dark hover-lift"
            >
              <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-electric-500/10 flex items-center justify-center">
                <Quote className="w-5 h-5 text-electric-400" />
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-white/70 leading-relaxed mb-6 text-sm">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-500 to-purple-accent flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-white/50 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}