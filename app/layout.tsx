import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aroma Luxe - Premium Perfumes',
  description: 'Discover luxury perfumes crafted with the finest ingredients. Night mode and Arabic/English support.',
  generator: 'v0.app',
  keywords: 'perfumes, luxury, fragrance, aroma, night mode, bilingual',
}

export const viewport: Viewport = {
  themeColor: '#d97706',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}
