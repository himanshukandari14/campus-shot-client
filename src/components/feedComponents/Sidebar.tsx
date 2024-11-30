// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useState } from 'react';
import { sidebarOptions } from '../../../constants/sidebarOptions';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';
import { logout } from '@/redux/slices/authSlice';
import { IoLogOut } from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation();
  const dispatch =useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  // console.log(user, 'sidebar');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const handleLogout = ()=>{
    dispatch(logout());
  }
  return (
    <>
      {/* Mobile Toggle Button - Always visible on small screens */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-black text-white md:hidden"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile - only visible when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100
        w-72 p-6 z-40 transition-all duration-300 transform
        md:translate-x-0 md:w-64 lg:w-72 xl:w-80
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isSidebarOpen ? 'shadow-lg' : ''}`}
      >
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-8 mt-8 md:mt-0">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src="/api/placeholder/48/48"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {user ? user.name : 'Loading...'}
            </h2>
            <p className="text-sm text-gray-500">
              @{user ? user.username : 'Loading...'}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-2">
            {sidebarOptions.map((option) => {
              const isActive = location.pathname === option.path;
              return (
                <li key={option.path}>
                  <Link
                    to={
                      option.name === 'Profile' && user
                        ? `/profile?userId=${user._id}`
                        : option.path
                    }
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setIsSidebarOpen(false);
                      }
                    }}
                    className={`flex items-center px-4 py-3 rounded-xl w-full transition-all duration-200 ${
                      isActive
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`mr-3 text-lg ${
                        isActive ? 'text-white' : 'text-gray-500'
                      }`}
                    >
                      {option.icon}
                    </span>
                    <span className="font-medium text-sm">{option.name}</span>
                    {/* Badge for Messages or other counts */}
                    {option.name === 'Messages' && (
                      <span className="ml-auto bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        6
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

         {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 rounded-xl w-full transition-all duration-200 text-gray-700 hover:bg-gray-50"
          >
            <span className="mr-3 text-lg text-gray-500"><IoLogOut /></span> {/* You can replace this with an appropriate icon */}
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>

        {/* Download App Button */}
        <div className="mt-auto pt-8">
          <button className="w-full bg-black text-white rounded-xl py-3 px-4 font-medium text-sm hover:bg-gray-900 transition-colors">
            Download App
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
