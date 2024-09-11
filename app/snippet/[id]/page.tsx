'use client'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'
import CodeEditor from '../../components/CodeEditor'
import { Id } from '@/convex/_generated/dataModel'
import { useTheme } from 'next-themes'

export default function SnippetDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { theme } = useTheme()

  const snippet = useQuery(api.codeSnippets.getCodeSnippet, {
    id: id as Id<'codeSnippets'>
  })

  if (snippet === undefined) {
    return <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">Loading...</div>
  }

  if (snippet === null) {
    return <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">Snippet not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{snippet.title}</h1>
        <div className="mb-4">
          <strong>Language:</strong> {snippet.language}
        </div>
        <div className="mb-8">
          <CodeEditor
            language={snippet.language}
            value={snippet.content}
            onChange={() => {}}
            readOnly
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
          />
        </div>
        {snippet.analysis ? (
          <div className="mt-8 mb-20">
            <h2 className="text-2xl font-bold mb-4">AI Analysis</h2>
            <pre className="bg-white dark:bg-gray-800 p-4 rounded-md whitespace-pre-wrap text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
              {snippet.analysis}
            </pre>
          </div>
        ) : (
          <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <p>No AI analysis available for this snippet.</p>
          </div>
        )}
      </div>
    </div>
  )
}