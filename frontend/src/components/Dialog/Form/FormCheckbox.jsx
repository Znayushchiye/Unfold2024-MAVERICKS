import React from 'react';

export default function FormCheckbox({ label, id, ...props }) {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 text-black focus:ring-gray-500 border-gray-300 rounded"
        {...props}
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
}