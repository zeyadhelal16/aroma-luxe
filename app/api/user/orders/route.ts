import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CreateOrderRequest {
  userId: number
  items: OrderItem[]
  total: number
  subtotal: number
  shipping: number
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json()
    const { userId, items, total, subtotal, shipping } = body

    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'User ID and items are required' },
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

    // Create order
    const newOrder = {
      id: user.orders?.length ? user.orders.length + 1 : 1,
      items,
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
      status: 'completed',
    }

    // Add order to user
    if (!user.orders) {
      user.orders = []
    }
    user.orders.push(newOrder)

    // Clear cart
    user.cart = []

    // Save to database
    writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json(
      {
        success: true,
        message: 'Order created successfully',
        order: newOrder,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
