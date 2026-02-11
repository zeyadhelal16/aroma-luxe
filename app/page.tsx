'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import ProductGrid from '@/components/product-grid'
import ProductModal from '@/components/product-modal'
import CartSidebar from '@/components/cart-sidebar'
import About from '@/components/about'
import Footer from '@/components/footer'
import { Product, CartItem } from '@/types'

interface User {
  id: number
  fullName: string
  email: string
  cart?: CartItem[]
}

export default function Page() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const [isDark, setIsDark] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // Load initial settings and products
  useEffect(() => {
    setIsClient(true)
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar' || 'en'
    const savedTheme = localStorage.getItem('theme') === 'dark'
    setLanguage(savedLanguage)
    setIsDark(savedTheme)
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr'

    // Get user from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      // Load user's cart from API
      loadUserCart(userData.id)
    }

    // Fetch products from database
    fetchProducts()
  }, [])

  const loadUserCart = async (userId: number) => {
    try {
      const response = await fetch(`/api/user/profile?userId=${userId}`)
      const userData = await response.json()
      if (response.ok && userData.cart) {
        setCart(userData.cart || [])
      }
    } catch (error) {
      console.error('Error loading user cart:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveUserCart = async (updatedCart: CartItem[]) => {
    if (!user) return

    try {
      await fetch('/api/user/save-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          cart: updatedCart.map(item => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      })
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  }

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const handleAddToCart = (product: Product, quantity: number) => {
    // Check stock before adding
    if (product.stock < quantity) {
      alert(`Sorry! Only ${product.stock} items available in stock.`)
      return
    }

    const existingItem = cart.find(item => item.id === product.id)
    let updatedCart: CartItem[]
    
    if (existingItem) {
      if (product.stock < existingItem.quantity + quantity) {
        alert(`Sorry! Only ${product.stock} items available in stock.`)
        return
      }
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    } else {
      updatedCart = [...cart, { ...product, quantity }]
    }
    
    setCart(updatedCart)
    if (user) {
      saveUserCart(updatedCart)
    }
    setSelectedProduct(null)
  }

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter(item => item.id !== productId)
    setCart(updatedCart)
    if (user) {
      saveUserCart(updatedCart)
    }
  }

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
      return
    }

    // Check stock before updating
    const product = products.find(p => p.id === productId)
    if (product && product.stock < quantity) {
      alert(`Sorry! Only ${product.stock} items available in stock.`)
      return
    }

    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
    setCart(updatedCart)
    if (user) {
      saveUserCart(updatedCart)
    }
  }

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    setCheckoutLoading(true)
    try {
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const shipping = subtotal > 100 ? 0 : 10
      const total = subtotal + shipping

      // First, deduct from stock
      const checkoutResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      })

      const checkoutData = await checkoutResponse.json()

      if (!checkoutResponse.ok) {
        alert(`Checkout failed: ${checkoutData.error}`)
        return
      }

      // If user is logged in, save order to user's account
      if (user) {
        const orderResponse = await fetch('/api/user/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            items: cart.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
            subtotal,
            shipping,
            total,
          }),
        })

        if (!orderResponse.ok) {
          console.error('Failed to save order to user account')
        }
      }

      // Success! Clear cart and refresh products
      alert('✅ Checkout successful! Thank you for your purchase!')
      setCart([])
      setIsCartOpen(false)
      await fetchProducts()
    } catch (error) {
      console.error('Checkout error:', error)
      alert('An error occurred during checkout. Please try again.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  if (!isClient || loading) return null

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      <Navbar
        language={language}
        isDark={isDark}
        onLanguageToggle={toggleLanguage}
        onThemeToggle={toggleTheme}
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
      />
      <Hero language={language} />
      <ProductGrid
        products={products}
        language={language}
        isDark={isDark}
        onProductSelect={setSelectedProduct}
      />
      <About language={language} />
      <Footer language={language} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          language={language}
          isDark={isDark}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        language={language}
        isDark={isDark}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        checkoutLoading={checkoutLoading}
      />
    </div>
  )
}
