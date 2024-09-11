import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { RocketIcon, CodeIcon, UsersIcon, BellIcon, LayoutDashboardIcon, TrashIcon, MonitorSmartphone, RefreshCwIcon } from 'lucide-react';
import { AuthAwareButton } from './components/AuthAwareButton'; // Adjust the import path as needed

export default function Home({ title, description, icon }: { title: string, description: string, icon: JSX.Element }) {
  return (
    <div>
      <div className="bg-gradient-to-b from-blue-100 to-purple-100 dark:from-gray-900 dark:to-blue-900 min-h-[90vh]">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-10 pb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
              <span className="block mb-2">Welcome to</span>
              <span className="block text-purple-600 dark:text-blue-400">Code Sage AI</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Elevate your code quality with AI-assisted reviews, bug detection, and improvement suggestions.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <AuthAwareButton />
            </div>
          </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title={<h2 className="text-xl">{`AI-Powered Analysis`}</h2>}
              description="Receive instant, intelligent feedback on your code. Our advanced AI algorithms powered by Google's Gemini AI detect potential bugs, suggest improvements, and ensure best practices are followed."
              icon={<RocketIcon className="w-8 h-8 text-purple-500" />}
            />
            <FeatureCard
              title={<h2 className="text-xl">{`Code Snippet Management`}</h2>}
              description="Effortlessly organize and manage your code snippets. Store, categorize, and access your code pieces with ease, making your development process smoother and more efficient."
              icon={<CodeIcon className="w-8 h-8 text-blue-500" />}
            />
            <FeatureCard
              title={<h2 className="text-xl">{`Real-time Collaboration`}</h2>}
              description="Collaborate seamlessly with your team. Share code snippets, conduct peer reviews, and work together in real-time to enhance code quality and foster knowledge sharing."
              icon={<UsersIcon className="w-8 h-8 text-green-500" />}
            />
            <FeatureCard
              title={<h2 className="text-xl">{`Smart Notifications`}</h2>}
              description="Stay informed with our intelligent notification system. Receive alerts for new snippet submissions, completed AI analyses, and team collaboration requests, ensuring you never miss important updates."
              icon={<BellIcon className="w-8 h-8 text-red-500" />}
            />
            <FeatureCard
              title={<h2 className="text-xl">{`Personalized Dashboard`}</h2>}
              description="Access a tailored dashboard showcasing your submitted snippets, recent activities, and AI insights. Get a quick overview of your coding progress and areas needing attention at a glance."
              icon={<LayoutDashboardIcon className="w-8 h-8 text-indigo-500" />}
            />
            <FeatureCard
              title={<h2 className="text-xl">{`Advanced Code Editor`}</h2>}
              description="Utilize our feature-rich code editor powered by Monaco Editor. Enjoy syntax highlighting, auto-completion, and language-specific features to enhance your coding experience directly within the platform."
              icon={<CodeIcon className="w-8 h-8 text-cyan-500" />}
            />
            <FeatureCard
              title={<h2 className="text-xl">{`Snippet Management`}</h2>}
              description="Maintain full control over your code snippets. Easily submit new pieces, update existing ones, and remove outdated snippets. Our user-friendly interface ensures effortless snippet lifecycle management."
              icon={<TrashIcon className="w-8 h-8 text-orange-500" />}
            />
            <FeatureCard
              title={<h2 className="text-xl">{`Responsive Design`}</h2>}
              description="Access Code Sage AI from any device. Our responsive design ensures a seamless experience whether you're on desktop, tablet, or mobile, allowing you to manage your code on the go."
              icon={<MonitorSmartphone className="w-8 h-8 text-pink-500" />}
            />
            <FeatureCard
              title={<h2 className="text-xl">{`Real-time Updates`}</h2>}
              description="Experience the power of real-time data synchronization. Thanks to Convex's capabilities, your data is always up-to-date across all devices without manual refreshes, ensuring a smooth, real-time coding experience."
              icon={<RefreshCwIcon className="w-8 h-8 text-teal-500" />}
            />
            </div>
        </main>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: JSX.Element }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}