import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Project from '@/models/Project'
import { getAuthUser } from '@/lib/auth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser()

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    await connectDB()

    await Project.findByIdAndDelete(params.id)

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser()

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    await connectDB()

    const body = await request.json()

    const project = await Project.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    )

    return NextResponse.json({ project })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}