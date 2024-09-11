'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import CodeEditor from '../components/CodeEditor';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '@clerk/nextjs';

export default function SubmitCodePage() {
  const router = useRouter();
  const { userId } = useAuth();
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const createCodeSnippet = useMutation(api.codeSnippets.createCodeSnippet);
  const addNotification = useMutation(api.notifications.addNotification);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      // First, analyze the code
      const response = await fetch('/api/analyze-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze code');
      }

      const data = await response.json();
      setAnalysis(data.analysis);

      // Then, save the code snippet
      const snippetId = await createCodeSnippet({
        userId: userId!,
        title,
        language,
        content: code,
      });

      // Create a notification
      await addNotification({
        userId: userId!,
        content: `Your code snippet "${title}" has been submitted for review.`,
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting code:', error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Submit Code for Review</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your code snippet"
          required
        />
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="csharp">C#</SelectItem>
          </SelectContent>
        </Select>
        <CodeEditor
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
        />
        <Button type="submit" disabled={isAnalyzing}>
          {isAnalyzing ? 'Analyzing...' : 'Submit for Review'}
        </Button>
      </form>
      {analysis && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">AI Analysis</h2>
          <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">{analysis}</pre>
        </div>
      )}
    </div>
  );
}