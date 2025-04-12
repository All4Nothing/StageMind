"use client"

import './globals.css'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {

    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
    document.documentElement.style.colorScheme = savedTheme
  }, [])

  return (
    <html lang="en" data-theme={theme} style={{ colorScheme: theme }}>
      <head>
        <link rel="icon" href="/logo.png" />
        <title>My App</title>
      </head>
      <body>{children}</body>
    </html>
  )
}