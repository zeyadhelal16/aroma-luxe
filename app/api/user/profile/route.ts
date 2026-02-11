import { readFileSync } from 'fs'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

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
    const user = data.users.find((u: any) => u.id === parseInt(userId))
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get all products for cart items
    const cartWithProducts = user.cart.map((item: any) => {
      const product = data.products.find((p: any) => p.id === item.id)
      return {
        ...product,
        quantity: item.quantity,
      }
    })

    // Return user data
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(
      {
        ...userWithoutPassword,
        cart: cartWithProducts,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Failed to get user data' },
      { status: 500 }
    )
  }
}
