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

const tabs = [
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

    const url = editingProject
      ? `/api/projects/${editingProject._id}`
      : '/api/projects'

    const method = editingProject ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...projectForm,
          technologies: projectForm.technologies
            .split(',')
            .map((t) => t.trim()),
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
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) fetchData()
    } catch (error) {
      console.error('Failed to delete project')
    }
  }

  const handleUpdateBookingStatus = async (
    id: string,
    status: string
  ) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
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

  const chartData =
    stats?.bookingsByMonth.map((item) => ({
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
    <div className="min-h-screen bg-navy-950 text-white">

      <header className="sticky top-0 z-30 bg-navy-950/90 backdrop-blur-xl border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            لوحة التحكم
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            خروج
          </button>
        </div>
      </header>

      <div className="sticky top-[73px] z-20 bg-navy-950/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all whitespace-nowrap ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-electric-600 to-purple-accent text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <main className="p-4 md:p-6">

        {activeTab === 'overview' && (
          <div className="space-y-6">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: 'إجمالي المشاريع',
                  value: stats?.totalProjects || 0,
                  icon: Briefcase,
                  color: 'from-electric-500 to-blue-600',
                },
                {
                  label: 'إجمالي الطلبات',
                  value: stats?.totalBookings || 0,
                  icon: CalendarDays,
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  label: 'طلبات معلقة',
                  value: stats?.pendingBookings || 0,
                  icon: Clock,
                  color: 'from-yellow-500 to-orange-500',
                },
                {
                  label: 'طلبات مكتملة',
                  value: stats?.completedBookings || 0,
                  icon: CheckCircle,
                  color: 'from-green-500 to-emerald-600',
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-dark rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>

                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>

                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>

                  <div className="text-white/50 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        )}

      </main>
    </div>
  )
}