import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { signToken, setAuthCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { email, password } = await request.json()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await user.comparePassword(password)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = signToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    })

    await setAuthCookie(token)

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}