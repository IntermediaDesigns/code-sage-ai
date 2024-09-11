// app/submit-code/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import CodeEditor from '../components/CodeEditor'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../components/ui/select'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'react-hot-toast'

export default function SubmitCodePage () {
  const router = useRouter()
  const { userId } = useAuth()
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedSnippetId, setSubmittedSnippetId] = useState<string | null>(
    null
  )

  const createCodeSnippet = useMutation(api.codeSnippets.createCodeSnippet)
  const addNotification = useMutation(api.notifications.addNotification)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    setIsSubmitting(true)
    setError('')

    try {
      // First, analyze the code
      const response = await fetch('/api/analyze-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze code')
      }

      const data = await response.json()
      setAnalysis(data.analysis)

      // Then, save the code snippet
      const snippetId = await createCodeSnippet({
        userId: userId!,
        title,
        language,
        content: code,
        analysis: data.analysis
      })
      console.log('Snippet created with ID:', snippetId);
      setSubmittedSnippetId(snippetId)

      // Create a notification with a link to the snippet
      await addNotification({
        userId: userId!,
        content: `Your code snippet "${title}" has been submitted for review.`,
        snippetId: snippetId
      })

      toast.success('Code snippet submitted successfully')
    } catch (error) {
      console.error('Error submitting code:', error)
      toast.error('Failed to submit code snippet')
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    } finally {
      setIsAnalyzing(false)
      setIsSubmitting(false)
    }
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Submit Code for Review</h1>
      {error && (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'
          role='alert'
        >
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className='space-y-6'>
        <Input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Enter a title for your code snippet'
          required
        />
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue placeholder='Select a language' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='javascript'>JavaScript</SelectItem>
            <SelectItem value='python'>Python</SelectItem>
            <SelectItem value='java'>Java</SelectItem>
            <SelectItem value='csharp'>C#</SelectItem>
          </SelectContent>
        </Select>
        <CodeEditor
          language={language}
          value={code}
          onChange={value => setCode(value || '')}
        />
        <Button type='submit' disabled={isAnalyzing || isSubmitting}>
          {isAnalyzing
            ? 'Analyzing...'
            : isSubmitting
            ? 'Submitting...'
            : 'Submit for Review'}
        </Button>
      </form>
      {analysis && (
        <div className='mt-8 mb-24'>
          <h2 className='text-2xl font-bold mb-4'>AI Analysis</h2>
          <pre className='bg-gray-100 p-4 rounded-md whitespace-pre-wrap text-black'>
            {analysis}
          </pre>
          {submittedSnippetId && (
            <Button
              onClick={() => router.push(`/snippet/${submittedSnippetId}`)}
              className='mt-4'
            >
              View Submitted Snippet
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
