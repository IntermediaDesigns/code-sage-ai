'use client'

import { useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { useQuery, useMutation } from 'convex/react'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import { TrashIcon } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'

export default function DashboardPage () {
  const { isLoaded, userId } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in')
    }
  }, [isLoaded, userId, router])

  const CodeSnippetList = ({ userId }: { userId: string }) => {
    const codeSnippets = useQuery(api.codeSnippets.getCodeSnippets, {
      userId: userId || ''
    })
    const deleteCodeSnippet = useMutation(api.codeSnippets.deleteCodeSnippet)

    const handleDelete = (snippetId: string) => {
      toast(
        t => (
          <div>
            <p>Are you sure you want to delete this code snippet?</p>
            <div className='mt-2'>
              <Button
                size='sm'
                variant='destructive'
                onClick={async () => {
                  toast.dismiss(t.id)
                  try {
                    await deleteCodeSnippet({ id: snippetId })
                    toast.success('Code snippet deleted successfully')
                  } catch (error) {
                    toast.error('Failed to delete code snippet')
                  }
                }}
              >
                Delete
              </Button>
              <Button
                size='sm'
                variant='outline'
                className='ml-2'
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ),
        {
          duration: 5000,
          position: 'top-center'
        }
      )
    }

    if (!codeSnippets) return <div>Loading...</div>

    return (
      <ul className='divide-y divide-gray-200'>
        {codeSnippets.map(snippet => (
          <li key={snippet._id} className='py-4'>
            <div className='flex space-x-3'>
              <div className='flex-1 space-y-1'>
                <h3 className='text-lg font-medium'>{snippet.title}</h3>
                <p className='text-sm text-gray-500'>{snippet.language}</p>
                <pre className='mt-2 text-sm text-gray-700 bg-gray-100 p-2 rounded'>
                  {snippet.content.slice(0, 100)}...
                </pre>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => handleDelete(snippet._id)}
                className='text-red-500 hover:text-red-700'
              >
                <TrashIcon className='h-5 w-5' />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  if (!isLoaded || !userId) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Toaster />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold'>Welcome, {user?.firstName}!</h1>
          <Link href='/submit-code'>
            <Button>Submit New Code</Button>
          </Link>
        </div>
        <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
          <div className='px-4 py-5 sm:px-6'>
            <h2 className='text-lg leading-6 font-medium text-gray-900'>
              Your Code Snippets
            </h2>
          </div>
          <div className='border-t border-gray-200'>
            <CodeSnippetList userId={''} />
          </div>
        </div>
      </div>
    </>
  )
}
