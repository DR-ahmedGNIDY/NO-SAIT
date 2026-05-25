import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function GET() {
  try {
    await connectDB()

    const existingUser = await User.findOne({
      email: 'admin@nosait.com',
    })

    if (existingUser) {
      return NextResponse.json({
        message: 'Admin already exists',
      })
    }

    const admin = await User.create({
      email: 'admin@nosait.com',
      password: 'Aa201241#',
      name: 'Admin',
      role: 'admin',
    })

    return NextResponse.json({
      success: true,
      admin,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to create admin',
      },
      { status: 500 }
    )
  }
}