import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NavBar from './components/sections/Navbar';
import Scene3D from './components/sections/Scene3d';
import ChatDock from './components/sections/ChatDock';

const App = () => {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "missing-client-id";

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <NavBar />
      <Scene3D />
      <ChatDock />
    </GoogleOAuthProvider>
  );
};

export default App;