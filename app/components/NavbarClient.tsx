'use client';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Notifications from './Notifications';

const NavbarClient = () => {
  const { user } = useUser();

  return (
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
        {user && <Notifications userId={user.id} />}
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
};

export default NavbarClient;