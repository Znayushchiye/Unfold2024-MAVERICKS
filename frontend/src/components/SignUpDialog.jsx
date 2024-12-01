import React from 'react';
import DialogLayout from './Dialog/DailogLayout';
import FormInput from './Dialog/Form/FormInput';

export default function SignUpDialog({ isOpen, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <DialogLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Create your Account"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          id="name"
          placeholder="Enter your name"
        />
        <FormInput
          label="Email Id"
          id="email"
          type="email"
          placeholder="Enter your email"
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Create password"
        />
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
        />

        <button
          type="submit"
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
        >
          Create ( ! )
        </button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <button 
            type="button" 
            className="font-medium text-blue-600 hover:text-blue-500"
            onClick={onClose}
          >
            Login In
          </button>
        </div>
      </form>
    </DialogLayout>
  );
}