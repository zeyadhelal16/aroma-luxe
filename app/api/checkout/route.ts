import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

interface CheckoutItem {
  id: number
  quantity: number
}

interface CheckoutRequest {
  items: CheckoutItem[]
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json()
    const { items } = body

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items format' },
        { status: 400 }
      )
    }

    const filePath = join(process.cwd(), 'database.json')
    const fileContent = readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    // تحقق من توفر المخزون
    for (const item of items) {
      const product = data.products.find((p: any) => p.id === item.id)
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.id} not found` },
          { status: 404 }
        )
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            error: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
          },
          { status: 400 }
        )
      }
    }

    // خصم الكمية من المخزون
    for (const item of items) {
      const product = data.products.find((p: any) => p.id === item.id)
      if (product) {
        product.stock -= item.quantity
      }
    }

    // حفظ البيانات
    writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json(
      {
        success: true,
        message: 'Checkout completed successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    )
  }
}
