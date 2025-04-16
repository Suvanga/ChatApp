import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react'; // Missing import added
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage'; // Missing import added
import { useAuthStore } from './store/useAuthStore'; // Missing import added
import {Loader} from 'lucide-react'; //This is used for loading animation shortcut 
// with lucide react 

const App = () => {

  const { authUser, checkAuth, isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
if(isCheckingAuth && !authUser)
{
  return (
    <div className = "flex justify-center items-center h-screen">
    <Loader className = "size-19 animate-spin" />
    </div>
  )
}

return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage />: <Navigate to = "/login"/>} />
        <Route path="/login" element={!authUser? <LoginPage />: <Navigate to = "/"/>} />
        <Route path="/signup" element={!authUser? <SignUpPage />: <Navigate to ="/"/>} />
        <Route path="/profile" element={authUser? <ProfilePage />: <Navigate to ="/login"/>} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
};

export { App };


//Continue from 1:50:15 from the video

