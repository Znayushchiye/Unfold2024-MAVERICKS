import React from 'react';
// import { X } from 'lucide-react';

export default function DialogLayout({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>

        {children}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          {/* <X className="h-6 w-6" /> */}
        </button>
      </div>
    </div>
  );
}