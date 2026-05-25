import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Project from '@/models/Project'
import Booking from '@/models/Booking'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = getAuthUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    await connectDB()

    const totalProjects = await Project.countDocuments()
    const totalBookings = await Booking.countDocuments()
    const pendingBookings = await Booking.countDocuments({ status: 'pending' })
    const completedBookings = await Booking.countDocuments({ status: 'completed' })

    const bookingsByMonth = await Booking.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ])

    return NextResponse.json({
      totalProjects,
      totalBookings,
      pendingBookings,
      completedBookings,
      bookingsByMonth,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}