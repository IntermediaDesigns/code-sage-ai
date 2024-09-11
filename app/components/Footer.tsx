const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-4 bottom-0 fixed w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center'>
          <div>
            <p>&copy; 2024 Code Sage AI. All rights reserved.</p>
          </div>
          <div>
            <a href='#' className='text-gray-300 hover:text-white mx-2'>
              Terms
            </a>
            <a href='#' className='text-gray-300 hover:text-white mx-2'>
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
