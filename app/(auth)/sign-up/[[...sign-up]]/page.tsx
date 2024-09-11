'use client'
import { SignUp } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function SignUpPage () {
  useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <div>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                'bg-purple-600 hover:bg-purple-700 text-sm normal-case transition-colors duration-200',
              card: 'bg-white dark:bg-gray-800 shadow-lg',
              headerTitle: 'text-gray-900 dark:text-white',
              headerSubtitle: 'text-gray-600 dark:text-gray-300',
              socialButtonsBlockButton:
                'border border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-200 transform hover:scale-105',
              socialButtonsBlockButtonText:
                'text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-blue-400 transition-colors duration-200',
              socialButtonsBlockButtonIconContainer:
                'group-hover:scale-110 transition-transform duration-200',
              formFieldLabel: 'text-gray-700 dark:text-gray-300',
              formFieldInput:
                'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 transition-all duration-200',
              footerActionLink:
                'text-purple-600 dark:text-blue-400 hover:text-purple-700 dark:hover:text-blue-500 transition-colors duration-200',
              identityPreviewEditButton:
                'text-purple-600 dark:text-blue-400 hover:text-purple-700 dark:hover:text-blue-500 transition-colors duration-200'
            },
            layout: {}
          }}
        />
      </div>
    </div>
  )
}
