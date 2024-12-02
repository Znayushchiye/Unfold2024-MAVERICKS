import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { DashboardComponent } from './components/Dashboard';

const LandingPageComponent = ({ setIsLoggedIn }) => {
  return (
    <>
      <Navbar isLandingPage={true} setIsLoggedIn={setIsLoggedIn}/>
      <div className='backchodi'></div>

    </>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoggedIn && <DashboardComponent isSignUp={isSignUp}/>}
      {!isLoggedIn && <LandingPageComponent setIsLoggedIn={setIsLoggedIn}/>}
    </div>
  );
}

export default App;