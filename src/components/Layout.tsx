// src/components/Layout.jsx
//@ts-nocheck
import React from 'react';
import Sidebar from '@/components/feedComponents/Sidebar';
import Suggestions from '@/components/feedComponents/Suggestions';
import { TopNav } from './feedComponents/TopNav';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Top Navigation for Small Devices */}
      <div className="sticky top-0 z-30 lg:hidden">
        <TopNav />
      </div>

      {/* Sidebar on Larger Screens */}
      <div className="hidden lg:block lg:fixed lg:left-0 lg:w-[20rem] h-screen">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-full">
        <div className="w-full px-4 lg:px-0 mx-auto lg:ml-[calc(20rem+8%)] lg:mr-[calc(20rem+2%)]">
          {children}
        </div>

        {/* Suggestions on Larger Screens */}
        <div className="hidden lg:block lg:fixed lg:right-0 lg:top-0 h-screen w-[20rem] bg-red-500 p-4">
          <div className="h-full">
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
