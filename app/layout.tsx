import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'shadcn-practice',
    template: `%s | shadcn-practice`,
  },
  description: '',
  openGraph: {
    title: {
      default: 'shadcn-practice',
      template: `%s | shadcn-practice`,
    },
    description: '',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider signInUrl="/" signUpUrl="/onboarding">
      <html lang="en">
        <body className={inter.className}>
          <main>
            <Header />
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
