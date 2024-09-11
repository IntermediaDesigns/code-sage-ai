'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Bell } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import { Id } from '@/convex/_generated/dataModel';
import { useTheme } from 'next-themes';

export default function Notifications({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = useQuery(api.notifications.getUnreadNotifications, { userId });
  const markAsRead = useMutation(api.notifications.markNotificationAsRead);
  const { theme } = useTheme();

  const handleMarkAsRead = async (id: Id<"notifications">) => {
    await markAsRead({ id });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Bell className={`h-5 w-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
          {notifications && notifications.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {notifications.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto mr-4 mt-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-bold text-xl leading-none">Notifications</h4>
            {notifications && notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification._id} className="flex items-center justify-between">
                  <p className='mr-2'>{notification.content}</p>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => handleMarkAsRead(notification._id)}
                    className='mb-2 mt-2 bg-purple-600 hover:bg-purple-700 dark:bg-blue-600 dark:hover:bg-blue-700'
                  >
                    Mark as read
                  </Button>
                </div>
              ))
            ) : (
              <p>No new notifications</p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}