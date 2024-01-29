import Header from '@/components/landing-page/header'

/* eslint-disable no-undef */
export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}
