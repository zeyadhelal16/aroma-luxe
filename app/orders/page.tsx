'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Order {
  id: number
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  createdAt: string
  status: string
}

interface User {
  id: number
  fullName: string
  email: string
}

export default function OrdersPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const theme = localStorage.getItem('theme') === 'dark'
    setIsDark(theme)

    if (!storedUser) {
      router.push('/login')
      return
    }

    const userData = JSON.parse(storedUser)
    setUser(userData)
    fetchOrders(userData.id)
  }, [router])

  const fetchOrders = async (userId: number) => {
    try {
      const response = await fetch(`/api/user/profile?userId=${userId}`)
      const userData = await response.json()
      if (response.ok && userData.orders) {
        setOrders(userData.orders)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Your Orders</h1>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Welcome, {user.fullName}
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
            >
              ← Back to Shop
            </Link>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className={`text-center py-12 rounded-lg ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <p className={`text-lg mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              You haven't placed any orders yet.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`rounded-lg overflow-hidden ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } shadow-lg`}
              >
                {/* Order Header */}
                <div className={`px-6 py-4 border-b ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-1">
                        Order ID: #{order.id}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'completed' ? '✓ Completed' : 'Pending'}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className={`px-6 py-4 border-b ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h3 className="font-semibold mb-4">Items:</h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-amber-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            ${item.price} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className={`px-6 py-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className={`flex justify-between font-bold text-lg pt-2 border-t ${
                      isDark ? 'border-gray-700' : 'border-gray-300'
                    }`}>
                      <span>Total:</span>
                      <span className="text-amber-600">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
