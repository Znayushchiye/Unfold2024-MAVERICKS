import React from 'react';
import DialogLayout from './Dialog/DailogLayout';
import FormInput from './Dialog/Form/FormInput';

export default function SignInDialog({ isOpen, setUserData, userData, setIsSignInOpen, setSignInClick }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    setSignInClick(true);
  };

  return (
    <DialogLayout
      isOpen={isOpen}
      onClose={() => setIsSignInOpen(false)}
      title="Sign in to your Account"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormInput
          label="Email address"
          id="email"
          placeholder="Email address"
          setUserData={setUserData}
          userData={userData}
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          setUserData={setUserData}
          userData={userData}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-black focus:ring-gray-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
              Remember me for 30 Days
            </label>
          </div>
          <button type="button" className="text-sm font-medium text-black hover:text-gray-700" onClick={() => {}}>
            Forgot Password
          </button>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
        >
          Sign In
        </button>

        <div className="text-center text-sm">
          <span className="text-gray-600">{"Don't have an account?"} </span>
          <button 
            type="button" 
            className="font-medium text-black hover:text-gray-700"
            onClick={() => setIsSignInOpen(false)}
          >
            Login
          </button>
        </div>
      </form>
    </DialogLayout>
  );
}