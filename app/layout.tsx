import { Inter } from 'next/font/google'
import Providers from './providers'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Code Sage AI',
  description:
    'Code Sage AI is a web application that provides developers with AI-powered code reviews and a platform for managing and sharing code snippets.',
  type: 'website',
  website: 'https://code-sage-ai.vercel.app/',
  siteName: 'Code Sage AI',
  image: '/CodeSage.png'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{metadata.title}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content={metadata.description} />
        <meta property='og:type' content={metadata.type} />
        <meta property='og:site_name' content={metadata.siteName} />
        <meta property='og:image' content={metadata.image} />
        <meta property='og:description' content={metadata.description} />
        <meta property='og:title' content={metadata.title} />
        <meta property='og:url' content={metadata.website} />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Navbar />
            <main>
              {children}
              <Analytics />
            </main>
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
