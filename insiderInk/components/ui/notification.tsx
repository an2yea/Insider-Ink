// components/ui/notification.tsx
import { useEffect } from 'react';
import { X } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export function Notification({ message, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto-close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 bg-red-500 text-white shadow-lg rounded-lg p-4 flex items-center space-x-2">
      <span className="font-bold">{message}</span>
      <button onClick={onClose}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}