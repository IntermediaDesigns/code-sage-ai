// app/snippet/[id]/page.tsx
'use client'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'
import CodeEditor from '../../components/CodeEditor'
import { Id } from '@/convex/_generated/dataModel'

export default function SnippetDetailPage () {
  const params = useParams()
  const id = params.id as string

  const snippet = useQuery(api.codeSnippets.getCodeSnippet, {
    id: id as Id<'codeSnippets'>
  })

  if (snippet === undefined) {
    return <div>Loading...</div>
  }

  if (snippet === null) {
    return <div>Snippet not found</div>
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>{snippet.title}</h1>
      <div className='mb-4'>
        <strong>Language:</strong> {snippet.language}
      </div>
      <div className='mb-8'>
        <CodeEditor
          language={snippet.language}
          value={snippet.content}
          onChange={() => {}}
          readOnly
        />
      </div>
      {snippet.analysis && (
        <div className='mt-8'>
          <h2 className='text-2xl font-bold mb-4'>AI Analysis</h2>
          <pre className='bg-gray-100 p-4 rounded-md whitespace-pre-wrap'>
            {snippet.analysis}
          </pre>
        </div>
      )}
    </div>
  )
}
