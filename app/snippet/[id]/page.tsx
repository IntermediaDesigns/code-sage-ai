'use client';

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import CodeEditor from "../../components/CodeEditor";
import { Button } from "../../components/ui/button";
import { useState } from "react";

export default function SnippetDetailPage() {
  const { id } = useParams();
  const [userReview, setUserReview] = useState("");

  const snippet = useQuery(api.codeSnippets.getCodeSnippet, { id: id as string });
  const aiAnalysis = useQuery(api.reviews.getAIReview, { snippetId: id as string });
  const userReviews = useQuery(api.reviews.getUserReviews, { snippetId: id as string });

  const addUserReview = useMutation(api.reviews.addUserReview);

  if (!snippet) return <div>Loading...</div>;

  const handleSubmitReview = async () => {
    await addUserReview({
      snippetId: id as string,
      content: userReview,
      userId: "user_id", // Replace with actual user ID from Clerk
    });
    setUserReview("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{snippet.title}</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Code:</h2>
        <CodeEditor
          language={snippet.language}
          initialValue={snippet.content}
          onChange={() => {}}
        />
      </div>
      {aiAnalysis && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">AI Analysis:</h2>
          <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">{aiAnalysis.content}</pre>
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">User Reviews:</h2>
        {userReviews && userReviews.map((review) => (
          <div key={review._id} className="bg-gray-100 p-4 rounded-md mb-4">
            <p>{review.content}</p>
            <p className="text-sm text-gray-500 mt-2">By: {review.userId}</p>
          </div>
        ))}
        <textarea
          className="w-full p-2 border rounded-md"
          rows={4}
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
          placeholder="Write your review here..."
        />
        <Button onClick={handleSubmitReview} className="mt-2">Submit Review</Button>
      </div>
    </div>
  );
}