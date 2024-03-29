/* eslint-disable no-undef */
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ]
})

export const metadata: Metadata = {
  title: 'Notion-Clone',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={satoshi.className}>{children}</body>
    </html>
  )
}
