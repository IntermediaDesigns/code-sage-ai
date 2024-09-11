'use client'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useEffect, useState } from 'react'
import Notifications from './Notifications'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../components/ui/sheet'

const Navbar = () => {
  const { user } = useUser()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const NavItems = () => (
    <>
      <SignedOut>
        <Link
          href='/sign-in'
          className='text-white dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-purple-600 hover:bg-purple-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 hover:scale-105'
        >
          Sign in
        </Link>
        <Link
          href='/sign-up'
          className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium border border-purple-600 dark:border-blue-600 hover:bg-purple-100 dark:hover:bg-blue-900 transition-colors duration-200 hover:scale-105'
        >
          Sign up
        </Link>
      </SignedOut>
      <SignedIn>
        <Link
          href='/dashboard'
          className='text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:border border-solid hover:border-slate-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:scale-105'
        >
          Dashboard
        </Link>
        {user && <Notifications userId={user.id} />}
      </SignedIn>
    </>
  )

  return (
    <nav className='bg-white dark:bg-gray-800 shadow-lg w-full'>
      <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-24 items-center'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex-shrink-0 flex items-center hover:transform hover:scale-110'
            >
              <Image
                src='/CODE-SAGE-AI.png'
                alt='Code Sage AI Logo'
                width={70}
                height={70}
                className='mr-2'
              />
            </Link>
          </div>
          <div className='hidden md:flex items-center space-x-4 flex-grow justify-center'>
            <NavItems />
          </div>
          <div className='hidden md:flex items-center space-x-8'>
            <SignedIn>
              <UserButton afterSignOutUrl='/' />
            </SignedIn>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label='Toggle theme'
              className='border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200'
            >
              {theme === 'dark' ? (
                <Sun className='h-[1.2rem] w-[1.2rem] text-white' />
              ) : (
                <Moon className='h-[1.2rem] w-[1.2rem] text-black' />
              )}
            </Button>
          </div>
          <div className='md:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='border-none shadow-none hover:scale-105'
                >
                  <Menu
                    className={`h-[2rem] w-[2rem] ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent className='w-[300px] sm:w-[400px] bg-white dark:bg-gray-800'>
                <div className='flex justify-end'>
                  <SheetClose asChild>
                    <Button
                      variant='ghost'
                      className='h-8 w-8 p-0 hover:bg-transparent'
                    >
                      <X className={`h-8 w-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                    </Button>
                  </SheetClose>
                </div>
                <div className='flex flex-col items-center space-y-4 mt-8 gap-12'>
                  <NavItems />
                  <SignedIn>
                    <UserButton afterSignOutUrl='/' />
                  </SignedIn>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() =>
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                    aria-label='Toggle theme'
                    className='border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200 hover:scale-105'
                  >
                    {theme === 'dark' ? (
                      <Sun className='h-[1.2rem] w-[1.2rem] text-white' />
                    ) : (
                      <Moon className='h-[1.2rem] w-[1.2rem] text-black' />
                    )}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar