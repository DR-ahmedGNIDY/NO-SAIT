import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    await connectDB()
    const bookings = await Booking.find().sort({ createdAt: -1 })
    return NextResponse.json({ bookings })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()

    const booking = await Booking.create(body)
    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}