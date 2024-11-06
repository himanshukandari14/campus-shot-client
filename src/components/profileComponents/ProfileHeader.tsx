import { VerifiedIcon } from 'lucide-react';
import React from 'react';
import verifiedTick from '../../assets/SVG/verifiedTick.svg'


const ProfileHeader = ({ userData, loggedInUserId, urlUserId }) => {
  const username = userData.user.username;
  console.log(username);
  const name = userData.user.name;
  const followers = userData.user.followers;
  const following = userData.user.following;

  return (
    <div className="relative">
      <header
        className="relative min-h-64 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430879.jpg")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black opacity-50"></div> {/* Gradient overlay */}
      </header>

      {/* Profile Picture */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white rounded-full p-2 mb-4 shadow-md">
          <img
            src={userData.user.avatar}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-4 border-white" // Added border to profile picture
          />
        </div>
      </div>

      {/* Profile Information */}
      <div className="flex flex-col items-center justify-center p-4 mt-24 text-center">
        <div className="text-3xl font-bold flex gap-2 justify-start items-center">
          {name}
          {username === 'Tsukuyomi' && (
            <img src={ verifiedTick} height={30} width={30} alt="" />
          
          )}
        </div>
        <h2 className="text-xl font-medium text-gray-700">Mindful. Genius</h2>
        <p className="text-md text-gray-600">Tokyo, Japan</p>
        <div className="flex space-x-4 mt-2">
          <span className="text-gray-900 font-bold">Followers: <span className="text-blue-600">{followers.length}</span></span>
          <span className="text-gray-900 font-bold">Following: <span className="text-blue-600">{following.length}</span></span>
        </div>
        
        {/* Conditional Button Rendering */}
        {loggedInUserId === urlUserId ? (
          <button className="mt-4 px-14 py-2 bg-[#000000] text-white rounded-md shadow-md hover:bg-[#011827] transition duration-300">
            Edit Profile
          </button>
        ) : (
          <button className="mt-4 px-14 py-2 bg-[#000000] text-white rounded-md shadow-md hover:bg-[#011827] transition duration-300">
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
