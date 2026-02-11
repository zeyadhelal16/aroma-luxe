'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  language: 'en' | 'ar'
  isDark: boolean
  onLanguageToggle: () => void
  onThemeToggle: () => void
  cartCount: number
  onCartClick: () => void
}

interface User {
  id: number
  fullName: string
  email: string
}

const translations = {
  en: {
    shop: 'Shop',
    about: 'About',
    contact: 'Contact',
    logout: 'Logout',
    login: 'Login',
  },
  ar: {
    shop: 'تسوق',
    about: 'حول',
    contact: 'اتصل',
    logout: 'تسجيل خروج',
    login: 'دخول',
  },
}

export default function Navbar({
  language,
  isDark,
  onLanguageToggle,
  onThemeToggle,
  cartCount,
  onCartClick,
}: NavbarProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const t = translations[language]

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setDropdownOpen(false)
    router.push('/')
  }

  return (
    <nav className={`sticky top-0 z-40 transition-colors duration-300 ${
      isDark
        ? 'bg-gray-900 border-gray-800 text-white'
        : 'bg-white border-gray-200 text-gray-900'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
              Aroma Luxe
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#shop" className="hover:text-amber-600 transition">
              {t.shop}
            </a>
            <a href="#about" className="hover:text-amber-600 transition">
              {t.about}
            </a>
            <a href="#contact" className="hover:text-amber-600 transition">
              {t.contact}
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-lg transition ${
                isDark
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              title="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button
              onClick={onLanguageToggle}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                isDark
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {language === 'en' ? 'AR' : 'EN'}
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 hover:text-amber-600 transition"
            >
              <span className="text-2xl">🛍️</span>
              {cartCount > 0 && (
                <span className={`absolute top-0 right-0 ${
                  isDark ? 'bg-amber-500' : 'bg-amber-600'
                } text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center`}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`px-3 py-2 rounded-lg font-semibold transition flex items-center space-x-2 ${
                      isDark
                        ? 'bg-gray-800 hover:bg-gray-700'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <span>👤</span>
                    <span className="hidden sm:inline text-sm">{user.fullName.split(' ')[0]}</span>
                  </button>

                  {dropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                        isDark ? 'bg-gray-800' : 'bg-white'
                      }`}
                    >
                      <div className={`px-4 py-3 border-b ${
                        isDark ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <p className="font-semibold">{user.fullName}</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/orders"
                        className={`block px-4 py-2 transition ${
                          isDark
                            ? 'hover:bg-gray-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        📦 My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-2 transition ${
                          isDark
                            ? 'hover:bg-gray-700 text-red-400'
                            : 'hover:bg-gray-100 text-red-600'
                        }`}
                      >
                        {t.logout}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    isDark
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  {t.login}
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden pb-4 ${
            isDark ? 'border-t border-gray-800' : 'border-t border-gray-200'
          }`}>
            <a href="#shop" className="block py-2 hover:text-amber-600">
              {t.shop}
            </a>
            <a href="#about" className="block py-2 hover:text-amber-600">
              {t.about}
            </a>
            <a href="#contact" className="block py-2 hover:text-amber-600">
              {t.contact}
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
