import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

interface CartItem {
  id: number
  quantity: number
}

interface SaveCartRequest {
  userId: number
  cart: CartItem[]
}

export async function POST(request: NextRequest) {
  try {
    const body: SaveCartRequest = await request.json()
    const { userId, cart } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const filePath = join(process.cwd(), 'database.json')
    const fileContent = readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    // Find user
    const user = data.users.find((u: any) => u.id === userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Save cart
    user.cart = cart

    // Save to database
    writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json(
      {
        success: true,
        message: 'Cart saved successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Save cart error:', error)
    return NextResponse.json(
      { error: 'Failed to save cart' },
      { status: 500 }
    )
  }
}
