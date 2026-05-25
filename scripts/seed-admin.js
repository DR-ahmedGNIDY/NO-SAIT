const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nosait'

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    const UserSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, default: 'Admin' },
      role: { type: String, default: 'admin' },
      createdAt: { type: Date, default: Date.now },
    })

    const User = mongoose.models.User || mongoose.model('User', UserSchema)

    const existingAdmin = await User.findOne({ email: 'admin@nosait.com' })
    if (existingAdmin) {
      console.log('Admin user already exists')
      process.exit(0)
    }

    const hashedPassword = await bcrypt.hash('admin123', 12)
    const admin = new User({
      email: 'admin@nosait.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    })

    await admin.save()
    console.log('Admin user created successfully')
    console.log('Email: admin@nosait.com')
    console.log('Password: admin123')
    console.log('IMPORTANT: Change the default password after first login!')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding admin:', error)
    process.exit(1)
  }
}

seedAdmin()