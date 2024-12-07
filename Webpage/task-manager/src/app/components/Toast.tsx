'use client';
import { useEffect } from 'react';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

export default function Toast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [onClose]);

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 p-4 text-white rounded shadow-lg ${getBgColor()}`}
    >
      {message}
    </div>
  );
}
