'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FolderOpen,
  CalendarDays,
  BarChart3,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  Menu,
  Image as ImageIcon,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

interface Project {
  _id: string
  title: string
  description: string
  category: string
  image: string
  technologies: string[]
  link: string
  featured: boolean
}

interface Booking {
  _id: string
  name: string
  phone: string
  businessType: string
  description: string
  budget: string
  status: string
  createdAt: string
}

interface Stats {
  totalProjects: number
  totalBookings: number
  pendingBookings: number
  completedBookings: number
  bookingsByMonth: Array<{ _id: { year: number; month: number }; count: number }>
}

const sidebarItems = [
  { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
  { id: 'projects', label: 'المشاريع', icon: FolderOpen },
  { id: 'bookings', label: 'الطلبات', icon: CalendarDays },
  { id: 'analytics', label: 'التحليلات', icon: BarChart3 },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  contacted: 'bg-blue-500/20 text-blue-400',
  'in-progress': 'bg-purple-500/20 text-purple-400',
  completed: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
}

const statusLabels: Record<string, string> = {
  pending: 'معلق',
  contacted: 'تم التواصل',
  'in-progress': 'قيد التنفيذ',
  completed: 'مكتمل',
  cancelled: 'ملغي',
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    technologies: '',
    link: '',
    featured: false,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [statsRes, projectsRes, bookingsRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/projects'),
        fetch('/api/bookings'),
      ])

      const statsData = await statsRes.json()
      const projectsData = await projectsRes.json()
      const bookingsData = await bookingsRes.json()

      setStats(statsData)
      setProjects(projectsData.projects || [])
      setBookings(bookingsData.bookings || [])
    } catch (error) {
      console.error('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setProjectForm({ ...projectForm, image: data.url })
      }
    } catch (error) {
      console.error('Upload failed')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editingProject ? `/api/projects/${editingProject._id}` : '/api/projects'
    const method = editingProject ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...projectForm,
          technologies: projectForm.technologies.split(',').map((t) => t.trim()),
        }),
      })

      if (res.ok) {
        setShowProjectModal(false)
        setEditingProject(null)
        setProjectForm({
          title: '',
          description: '',
          category: '',
          image: '',
          technologies: '',
          link: '',
          featured: false,
        })
        fetchData()
      }
    } catch (error) {
      console.error('Failed to save project')
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if (res.ok) fetchData()
    } catch (error) {
      console.error('Failed to delete project')
    }
  }

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) fetchData()
    } catch (error) {
      console.error('Failed to update booking')
    }
  }

  const openEditModal = (project: Project) => {
    setEditingProject(project)
    setProjectForm({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image,
      technologies: project.technologies.join(', '),
      link: project.link,
      featured: project.featured,
    })
    setShowProjectModal(true)
  }

  const openAddModal = () => {
    setEditingProject(null)
    setProjectForm({
      title: '',
      description: '',
      category: '',
      image: '',
      technologies: '',
      link: '',
      featured: false,
    })
    setShowProjectModal(true)
  }

  const chartData = stats?.bookingsByMonth.map((item) => ({
    name: `${item._id.month}/${item._id.year}`,
    bookings: item.count,
  })) || []

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-electric-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-950 flex">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`fixed lg:sticky top-0 right-0 h-screen w-72 bg-navy-900/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-500 to-purple-accent flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold">NOSAIT</h2>
              <p className="text-white/50 text-xs">لوحة التحكم</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-electric-600/20 to-purple-accent/20 text-electric-400 border border-electric-500/20'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </motion.aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-navy-950/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-white/60 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-white">
              {sidebarItems.find((i) => i.id === activeTab)?.label}
            </h1>
            <div className="w-10" />
          </div>
        </header>

        <main className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'إجمالي المشاريع', value: stats?.totalProjects || 0, icon: Briefcase, color: 'from-electric-500 to-blue-600' },
                  { label: 'إجمالي الطلبات', value: stats?.totalBookings || 0, icon: CalendarDays, color: 'from-purple-500 to-pink-500' },
                  { label: 'طلبات معلقة', value: stats?.pendingBookings || 0, icon: Clock, color: 'from-yellow-500 to-orange-500' },
                  { label: 'طلبات مكتملة', value: stats?.completedBookings || 0, icon: CheckCircle, color: 'from-green-500 to-emerald-600' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-dark rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/50 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="glass-dark rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">أحدث الطلبات</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-right text-white/50 text-sm py-3 px-4">الاسم</th>
                        <th className="text-right text-white/50 text-sm py-3 px-4">نوع النشاط</th>
                        <th className="text-right text-white/50 text-sm py-3 px-4">الميزانية</th>
                        <th className="text-right text-white/50 text-sm py-3 px-4">الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map((booking) => (
                        <tr key={booking._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-white text-sm">{booking.name}</td>
                          <td className="py-3 px-4 text-white/70 text-sm">{booking.businessType}</td>
                          <td className="py-3 px-4 text-white/70 text-sm">{booking.budget}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                              {statusLabels[booking.status]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">المشاريع</h2>
                <button
                  onClick={openAddModal}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-electric-600 to-purple-accent text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  إضافة مشروع
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-dark rounded-2xl overflow-hidden group"
                  >
                    <div className="aspect-video bg-navy-800 relative overflow-hidden">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20">
                          <ImageIcon className="w-12 h-12" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-semibold">{project.title}</h3>
                        <div className="flex gap-1">
                          <button
                            onClick={() => openEditModal(project)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-electric-500/20 text-white/60 hover:text-electric-400 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project._id)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-white/50 text-sm line-clamp-2 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded-md bg-white/5 text-white/40 text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">طلبات العملاء</h2>

              <div className="glass-dark rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="text-right text-white/70 text-sm py-4 px-4">الاسم</th>
                        <th className="text-right text-white/70 text-sm py-4 px-4">الهاتف</th>
                        <th className="text-right text-white/70 text-sm py-4 px-4">النشاط</th>
                        <th className="text-right text-white/70 text-sm py-4 px-4">الميزانية</th>
                        <th className="text-right text-white/70 text-sm py-4 px-4">الحالة</th>
                        <th className="text-right text-white/70 text-sm py-4 px-4">الإجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4 text-white text-sm">{booking.name}</td>
                          <td className="py-4 px-4 text-white/70 text-sm">{booking.phone}</td>
                          <td className="py-4 px-4 text-white/70 text-sm">{booking.businessType}</td>
                          <td className="py-4 px-4 text-white/70 text-sm">{booking.budget}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                              {statusLabels[booking.status]}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={booking.status}
                              onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
                              className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-electric-500"
                            >
                              <option value="pending">معلق</option>
                              <option value="contacted">تم التواصل</option>
                              <option value="in-progress">قيد التنفيذ</option>
                              <option value="completed">مكتمل</option>
                              <option value="cancelled">ملغي</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">التحليلات</h2>

              <div className="glass-dark rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">الطلبات الشهرية</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b6eff" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b6eff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="bookings"
                        stroke="#3b6eff"
                        fillOpacity={1}
                        fill="url(#colorBookings)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-dark rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-6">توزيع الحالات</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'معلق', value: stats?.pendingBookings || 0 },
                          { name: 'مكتمل', value: stats?.completedBookings || 0 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                          }}
                        />
                        <Bar dataKey="value" fill="#3b6eff" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass-dark rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-6">ملخص الأداء</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-electric-400" />
                        <span className="text-white/70">إجمالي العملاء</span>
                      </div>
                      <span className="text-white font-bold">{stats?.totalBookings || 0}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-purple-accent" />
                        <span className="text-white/70">إجمالي المشاريع</span>
                      </div>
                      <span className="text-white font-bold">{stats?.totalProjects || 0}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <span className="text-white/70">معدل الإنجاز</span>
                      </div>
                      <span className="text-white font-bold">
                        {stats?.totalBookings
                          ? Math.round(((stats?.completedBookings || 0) / stats.totalBookings) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {showProjectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-dark rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
                </h3>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">العنوان</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-electric-500"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">الوصف</label>
                  <textarea
                    required
                    rows={3}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-electric-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">الفئة</label>
                  <input
                    type="text"
                    required
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-electric-500"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">الصورة</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-electric-500"
                      placeholder="رابط الصورة"
                    />
                    <label className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors flex items-center gap-2 text-white/70">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      {uploadingImage ? '...' : 'رفع'}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">التقنيات (مفصولة بفاصلة)</label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-electric-500"
                    placeholder="React, Next.js, Tailwind"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">الرابط</label>
                  <input
                    type="url"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-electric-500"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-electric-500 focus:ring-electric-500"
                  />
                  <label htmlFor="featured" className="text-white/70 text-sm">مشروع مميز</label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-electric-600 to-purple-accent text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
                >
                  {editingProject ? 'حفظ التغييرات' : 'إضافة المشروع'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}