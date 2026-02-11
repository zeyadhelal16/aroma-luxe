'use client'

import { useState } from 'react'
import { Product } from '@/types'

interface ProductModalProps {
  product: Product
  language: 'en' | 'ar'
  isDark: boolean
  onClose: () => void
  onAddToCart: (product: Product, quantity: number) => void
}

const translations = {
  en: {
    price: 'Price:',
    quantity: 'Quantity:',
    addToCart: 'Add to Cart',
    close: 'Close',
    outOfStock: 'Out of Stock',
  },
  ar: {
    price: 'السعر:',
    quantity: 'الكمية:',
    addToCart: 'أضف إلى السلة',
    close: 'إغلاق',
    outOfStock: 'نفد المخزون',
  },
}

export default function ProductModal({
  product,
  language,
  isDark,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const t = translations[language]
  const productName = language === 'en' ? 'name' : 'arName'
  const productDesc = language === 'en' ? 'description' : 'arDescription'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className={`w-full max-w-2xl rounded-lg overflow-hidden ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } animate-in fade-in zoom-in-95 duration-300`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:text-amber-600 transition z-10 hover:scale-110"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Image */}
          <div className="flex items-center justify-center">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product[productName as keyof Product] as string}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h2 className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {product[productName as keyof Product]}
            </h2>

            <p className={`text-lg mb-6 leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {product[productDesc as keyof Product]}
            </p>

            <div className="mb-6">
              <p className={`text-sm font-semibold mb-2 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {t.price}
              </p>
              <p className="text-4xl font-bold text-amber-600">
                ${product.price}
              </p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <p className={`text-sm font-semibold ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`}>
                  ✓ In Stock ({product.stock} available)
                </p>
              ) : (
                <p className={`text-sm font-semibold ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  ✕ {t.outOfStock}
                </p>
              )}
            </div>

            <div className="mb-6">
              <p className={`text-sm font-semibold mb-3 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {t.quantity}
              </p>
              <div className={`flex items-center border rounded-lg w-fit ${
                isDark
                  ? 'border-gray-700 bg-gray-700'
                  : 'border-gray-300 bg-gray-50'
              }`}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={product.stock === 0}
                  className="px-4 py-2 hover:bg-opacity-75 disabled:opacity-50"
                >
                  −
                </button>
                <span className={`px-6 py-2 font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {quantity}
                </span>
                <button
                  onClick={() => {
                    if (quantity < product.stock) {
                      setQuantity(quantity + 1)
                    }
                  }}
                  disabled={product.stock === 0 || quantity >= product.stock}
                  className="px-4 py-2 hover:bg-opacity-75 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(product, quantity)
              }}
              disabled={product.stock === 0}
              className={`w-full py-3 font-bold rounded-lg transition transform ${
                product.stock === 0
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:shadow-lg hover:from-amber-700 hover:to-amber-600 hover:scale-105'
              }`}
            >
              {product.stock === 0 ? t.outOfStock : t.addToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
