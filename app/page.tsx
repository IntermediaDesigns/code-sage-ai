import Link from 'next/link'

export default function Home () {
  return (
    <div className='bg-white'>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center py-20'>
          <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
            <span className='block'>Welcome to Code Sage AI</span>
            <span className='block text-indigo-600'>
              AI-Powered Code Reviews
            </span>
          </h1>
          <p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
            Elevate your code quality with AI-assisted reviews, bug detection,
            and improvement suggestions.
          </p>
          <div className='mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8'>
            <div className='rounded-md shadow'>
              <Link
                href='/sign-up'
                className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'
              >
                Get started
              </Link>
            </div>
            <div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3'>
              <Link
                href='/sign-in'
                className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10'
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
