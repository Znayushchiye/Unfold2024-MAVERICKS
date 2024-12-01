import React, { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {isLoggedIn && <DashboardComponent />}
      {!isLoggedIn && (
        <LandingPageComponent setIsLoggedIn={setIsLoggedIn}/>
        // <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        //   {/* Main content goes here */}
        // </main>
      )}
    </div>
  );
}

export default App;