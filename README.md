# Code Sage AI: AI-Assisted Code Review Platform

Code Sage AI is a web application that provides developers with AI-powered code reviews and a platform for managing and sharing code snippets. The application is built using Next.js, Convex for backend functionality, and Clerk for authentication.

## Key Features

1. **User Authentication**
   - Secure sign-up and sign-in functionality powered by Clerk
   - Protected routes ensuring only authenticated users can access certain features

2. **Code Snippet Management**
   - Users can submit new code snippets for review
   - Each snippet includes a title, programming language, and the code itself
   - Snippets are stored securely in the Convex database

3. **AI-Powered Code Analysis**
   - Submitted code snippets are analyzed by an AI (powered by Google's Gemini AI)
   - The AI provides suggestions for improvement, potential bug detection, and best practices

4. **Dashboard**
   - Users have a personalized dashboard displaying their submitted code snippets
   - The dashboard provides an overview of each snippet, including title, language, and a preview of the code

5. **Detailed Snippet View**
   - Each snippet has a dedicated page showing its full details
   - Users can view the complete code and the AI's analysis

6. **Code Editor Integration**
   - The application includes a feature-rich code editor (powered by Monaco Editor)
   - Syntax highlighting and language-specific features are available based on the selected programming language

7. **Snippet Deletion**
   - Users can delete their submitted code snippets from the dashboard
   - A confirmation toast ensures users don't accidentally delete snippets

8. **Notification System**
   - Users receive notifications for important events (e.g., when a new snippet is submitted)
   - Notifications are displayed in the user interface and can be marked as read

9. **Responsive Design**
   - The application is designed to work well on both desktop and mobile devices
   - UI components from shadcn/ui ensure a consistent and modern look

10. **Real-time Updates**
    - Convex's real-time capabilities ensure that data is always up-to-date without requiring manual refreshes

## Technical Stack

- **Frontend**: Next.js with TypeScript
- **Backend**: Convex (for database and server-side logic)
- **Authentication**: Clerk
- **AI Integration**: Google's Gemini AI
- **UI Components**: shadcn/ui and Tailwind CSS
- **Code Editor**: Monaco Editor
- **State Management**: React hooks and Convex's built-in state management
- **Notifications**: react-hot-toast for user-friendly toast notifications
