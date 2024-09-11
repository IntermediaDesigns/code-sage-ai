'use client';

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from 'next/link';
import { Button } from '../components/ui/button';

export default function DashboardPage() {
  const { userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  if (!userId || !user) {
    router.push('/sign-in');
    return null;
  }

  const CodeSnippetList = () => {
    const codeSnippets = useQuery(api.codeSnippets.getCodeSnippets, { userId });

    if (!codeSnippets) return <div>Loading...</div>;

    return (
      <ul className="divide-y divide-gray-200">
        {codeSnippets.map((snippet) => (
          <li key={snippet._id} className="py-4">
            <div className="flex space-x-3">
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-medium">{snippet.title}</h3>
                <p className="text-sm text-gray-500">{snippet.language}</p>
                <pre className="mt-2 text-sm text-gray-700 bg-gray-100 p-2 rounded">
                  {snippet.content.slice(0, 100)}...
                </pre>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user.firstName}!</h1>
        <Link href="/submit-code">
          <Button>Submit New Code</Button>
        </Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Your Code Snippets</h2>
        </div>
        <div className="border-t border-gray-200">
          <CodeSnippetList />
        </div>
      </div>
    </div>
  );
}