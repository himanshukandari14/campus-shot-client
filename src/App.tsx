import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Feed from './views/Feed';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import Profile from './views/Profile';
import SavedPosts from './views/SavedPosts';
import Notification from './views/Notification';
import VerifyRegistration from './views/VerifyRegistration';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Search from './views/Search';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/accounts/emailsignup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyRegistration />} />
        <Route path="/my/saved-Posts" element={<SavedPosts />} />
       
         <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
        
        {/* Protected Route for Feed */}
        <Route path="/feed" element={<ProtectedRoute element={<Feed />} />} />
         <Route path="/search" element={<ProtectedRoute element={<Search />} />} />
        {/* <Route path="/profile/:userId" element={<ProtectedRoute element={<Profile />} />} /> */}
        
        {/* Redirect to login by default */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
