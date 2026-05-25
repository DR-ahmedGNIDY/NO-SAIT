import Link from 'next/link'
import { Zap, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-500 to-purple-accent flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                NOS<span className="text-electric-400">AIT</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              نصمم تجارب رقمية استثنائية تجمع بين الجمال والأداء. مشروعك يستحق الأفضل.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              {['الرئيسية', 'الخدمات', 'أعمالنا', 'الأسعار', 'تواصل معنا'].map((item) => (
                <li key={item}>
                  <Link href="/" className="text-white/50 hover:text-electric-400 transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">خدماتنا</h3>
            <ul className="space-y-3">
              {['تصميم المواقع', 'تطوير الويب', 'التجارة الإلكترونية', 'تحسين الأداء', 'SEO'].map((item) => (
                <li key={item}>
                  <span className="text-white/50 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Mail className="w-4 h-4 text-electric-400" />
                info@nosait.com
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Phone className="w-4 h-4 text-electric-400" />
                +966 50 000 0000
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-electric-400" />
                الرياض، المملكة العربية السعودية
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © 2024 NOSAIT. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6">
            <Link href="/admin/login" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              لوحة التحكم
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}