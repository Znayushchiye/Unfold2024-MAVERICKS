import React, { useState } from 'react';
import DialogLayout from './Dialog/DailogLayout';
import FormInput from './Dialog/Form/FormInput';

export default function SignUpDialog({ isOpen, userData, setUserData, setIsSignUpOpen, setIsSignInOpen, setLoginClick }) {
  const [confirmPassword, setConfirmPassword] = useState({
    confirmPassword: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setLoginClick(true);
  };

  return (
    <DialogLayout
      isOpen={isOpen}
      onClose={() => setIsSignUpOpen(false)}
      title="Create your Account"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          id="username"
          placeholder="Enter your username"
          setUserData={setUserData}
          userData={userData}
        />
        <FormInput
          label="Email Id"
          id="email"
          type="email"
          placeholder="Enter your email"
          setUserData={setUserData}
          userData={userData}
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Create password"
          setUserData={setUserData}
          userData={userData}
        />
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          setUserData={setConfirmPassword}
          confirmPassword={confirmPassword}
        />

        <button
          type="submit"
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
        >
          Create
        </button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <button 
            type="button" 
            className="font-medium text-blue-600 hover:text-blue-500"
            onClick={() => {
              setIsSignUpOpen(false);
              setIsSignInOpen(true);
            }}
          >
            Login In
          </button>
        </div>
      </form>
    </DialogLayout>
  );
}