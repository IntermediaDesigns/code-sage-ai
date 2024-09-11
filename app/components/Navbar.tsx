import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import Notifications from './Notifications';

const Navbar = () => {
  const { userId } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              Code Sage AI
            </Link>
          </div>
          <div className="flex items-center">
            <SignedOut>
              <Link href="/sign-in" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Sign in
              </Link>
              <Link href="/sign-up" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Sign up
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
              {userId && <Notifications userId={userId} />}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;