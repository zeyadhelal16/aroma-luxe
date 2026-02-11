'use client'

import { CartItem } from '@/types'

interface CartSidebarProps {
  isOpen: boolean
  cart: CartItem[]
  language: 'en' | 'ar'
  isDark: boolean
  onClose: () => void
  onRemoveItem: (productId: number) => void
  onUpdateQuantity: (productId: number, quantity: number) => void
  onCheckout?: () => Promise<void> | void
  checkoutLoading?: boolean
}

const translations = {
  en: {
    cart: 'Shopping Cart',
    empty: 'Your cart is empty',
    subtotal: 'Subtotal:',
    shipping: 'Shipping:',
    total: 'Total:',
    checkout: 'Checkout',
    remove: 'Remove',
    outOfStock: 'Out of Stock',
  },
  ar: {
    cart: 'سلة التسوق',
    empty: 'سلتك فارغة',
    subtotal: 'المجموع الفرعي:',
    shipping: 'الشحن:',
    total: 'الإجمالي:',
    checkout: 'الدفع',
    remove: 'إزالة',
    outOfStock: 'نفد المخزون',
  },
}

export default function CartSidebar({
  isOpen,
  cart,
  language,
  isDark,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  checkoutLoading = false,
}: CartSidebarProps) {
  const t = translations[language]
  const productName = language === 'en' ? 'name' : 'arName'

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
        />
      )}

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-screen w-full sm:w-96 transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } overflow-y-auto`}>
        <div className={`p-6 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.cart}
            </h2>
            <button
              onClick={onClose}
              className="text-2xl hover:text-amber-600 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-6">
          {cart.length === 0 ? (
            <p className={`text-center py-12 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.empty}
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-lg p-4 ${
                    isDark ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item[productName as keyof CartItem] as string}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className={`font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item[productName as keyof CartItem]}
                      </h3>
                      <p className="text-amber-600 font-semibold mb-3">
                        ${item.price}
                      </p>
                      <div className={`flex items-center gap-2 border rounded w-fit ${
                        isDark
                          ? 'border-gray-600 bg-gray-600'
                          : 'border-gray-300 bg-gray-200'
                      }`}>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 hover:bg-opacity-75"
                        >
                          −
                        </button>
                        <span className={`px-3 font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 hover:bg-opacity-75"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className={`w-full mt-3 py-2 rounded text-sm font-semibold ${
                      isDark
                        ? 'bg-red-900 hover:bg-red-800 text-red-200'
                        : 'bg-red-100 hover:bg-red-200 text-red-700'
                    } transition`}
                  >
                    {t.remove}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className={`border-t p-6 space-y-3 ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className={`flex justify-between text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <span>{t.subtotal}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={`flex justify-between text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <span>{t.shipping}</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className={`flex justify-between text-lg font-bold pt-3 border-t ${
              isDark
                ? 'border-gray-700 text-white'
                : 'border-gray-200 text-gray-900'
            }`}>
              <span>{t.total}</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className={`w-full py-3 font-bold rounded-lg transition transform ${
              checkoutLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:shadow-lg hover:from-amber-700 hover:to-amber-600 hover:scale-105'
            }`}
            onClick={onCheckout}
            disabled={checkoutLoading}
            >
              {checkoutLoading ? '⏳ Processing...' : t.checkout}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
