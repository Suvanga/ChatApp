import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react'; // Missing import added
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage'; // Missing import added
import { useAuthStore } from './store/useAuthStore'; // Missing import added
import {Loader} from 'lucide-react'; // Missing import added

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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
};

export { App };