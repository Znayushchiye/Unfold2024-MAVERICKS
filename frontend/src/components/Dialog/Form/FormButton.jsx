import React from 'react';

export default function FormButton({ children, variant = 'primary', ...props }) {
  const baseStyles = "w-full flex justify-center py-2.5 px-4 border rounded-full shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors";
  
  const variants = {
    primary: "border-transparent text-white bg-black hover:bg-gray-800",
    secondary: "border-black text-black bg-white hover:bg-gray-50"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}