import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NOSAIT | تصميم وتطوير المواقع الاحترافية',
  description: 'NOSAIT - شركة تصميم وتطوير مواقع احترافية. نصمم تجارب رقمية استثنائية تجمع بين الجمال والأداء.',
  keywords: 'تصميم مواقع, تطوير ويب, شركة تصميم, موقع إلكتروني, واجهة المستخدم, تجربة المستخدم',
  openGraph: {
    title: 'NOSAIT | تصميم وتطوير المواقع الاحترافية',
    description: 'نصمم تجارب رقمية استثنائية تجمع بين الجمال والأداء',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={`${inter.className} bg-navy-950 text-white antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}