import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

interface SignupRequest {
  fullName: string
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json()
    const { fullName, email, password } = body

    // Validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const filePath = join(process.cwd(), 'database.json')
    const fileContent = readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    // Check if email already exists
    const existingUser = data.users.find((u: any) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password (simple hash for demo)
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex')

    // Create new user
    const newUser = {
      id: data.users.length + 1,
      fullName,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    }

    // Save user to database
    data.users.push(newUser)
    writeFileSync(filePath, JSON.stringify(data, null, 2))

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(
      {
        success: true,
        user: userWithoutPassword,
        message: 'Account created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
