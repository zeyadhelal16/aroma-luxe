'use client'

import { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  language: 'en' | 'ar'
  isDark: boolean
  onProductSelect: (product: Product) => void
}

const translations = {
  en: {
    featuredCollection: 'Featured Collection',
  },
  ar: {
    featuredCollection: 'المجموعة المميزة',
  },
}

export default function ProductGrid({
  products,
  language,
  isDark,
  onProductSelect,
}: ProductGridProps) {
  const t = translations[language]
  const productName = language === 'en' ? 'name' : 'arName'
  const productDesc = language === 'en' ? 'description' : 'arDescription'

  return (
    <section
      id="shop"
      className={`py-20 px-4 transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {t.featuredCollection}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductSelect(product)}
              className={`cursor-pointer rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl ${
                isDark
                  ? 'bg-gray-800 hover:bg-gray-750'
                  : 'bg-gray-50 hover:bg-white'
              } group`}
            >
              <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product[productName as keyof Product] as string}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {product[productName as keyof Product] as string}
                </h3>
                <p className={`text-sm mb-4 line-clamp-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {product[productDesc as keyof Product] as string}
                </p>

                {/* Stock Status */}
                <p className={`text-xs font-semibold mb-3 ${
                  product.stock > 0
                    ? isDark ? 'text-green-400' : 'text-green-600'
                    : isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  {product.stock > 0 ? `✓ Stock: ${product.stock}` : '✕ Out of Stock'}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-600">
                    ${product.price}
                  </span>
                  <button
                    disabled={product.stock === 0}
                    className={`px-4 py-2 rounded-lg transition ${
                      product.stock === 0
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                  >
                    ➜
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
