'use client'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { Menu, Moon, Sun } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useEffect, useState } from 'react'
import Notifications from './Notifications'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'

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
          className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium'
        >
          Sign in
        </Link>
        <Link
          href='/sign-up'
          className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium'
        >
          Sign up
        </Link>
      </SignedOut>
      <SignedIn>
        <Link
          href='/dashboard'
          className='text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:border border-solid hover:border-slate-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium'
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
            <Link href='/' className='flex-shrink-0 flex items-center hover:transform hover:scale-110'>
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
                  className='border-none shadow-none'
                >
                  <Menu
                    className={`h-[1.2rem] w-[1.2rem] ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent className='w-[300px] sm:w-[400px] bg-white dark:bg-gray-800'>
                <div className='flex flex-col space-y-4 mt-4'>
                  <NavItems />
                  {user && <Notifications userId={user.id} />}
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
                    className='border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200'
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