import React from 'react';
import SignInDialog from './SignInDialog';
import SignUpDialog from './SignUpDialog';
import { Menu } from 'lucide-react';
import { Home } from 'lucide-react';
import { Info } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { UserPlus } from 'lucide-react';


export default function Navbar() {
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <Menu className="h-6 w-6 text-gray-600 sm:hidden" />
              
              <div className="hidden sm:flex sm:space-x-8">
                <a href="/" className="flex items-center text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                  <Home className="h-5 w-5 mr-1" />
                  Home
                </a>
                <a href="/about" className="flex items-center text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                  <Info className="h-5 w-5 mr-1" />
                  About Us
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSignInOpen(true)}
                className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </button>
              <button 
                onClick={() => setIsSignUpOpen(true)}
                className="inline-flex items-center px-6 py-2.5 border border-black text-sm font-medium rounded-full text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SignInDialog isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      <SignUpDialog isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </>
  );
}