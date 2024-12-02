import React from 'react';

export default function FormInput({ label, id, type = 'text', placeholder, userData, setUserData }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
        placeholder={placeholder}
        onChange={(e) => setUserData(
          {
            ...userData,
            [id]: e.target.value
          }
        )}
      />
    </div>
  );
}