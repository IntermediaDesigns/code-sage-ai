'use client';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { useUser } from "@clerk/nextjs";

export function AuthAwareButton() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  if (isSignedIn) {
    return (
      <Button asChild size="lg">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    );
  }

  return (
    <Button asChild size="lg">
      <Link href="/sign-up">Get Started</Link>
    </Button>
  );
}