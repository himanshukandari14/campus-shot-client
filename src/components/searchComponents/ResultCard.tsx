import React from 'react';

const ResultCard = ({ username, fullName, profileImage }) => {
  return (
    <div className="bg-white w-[80%] sm:w-[70%] lg:w-[80%] p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-4">
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
        <img
          src={profileImage || "/api/placeholder/48/48"} // Placeholder if profileImage is not available
          alt={username}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{fullName}</h3>
        <p className="text-sm text-gray-600">@{username}</p>
        <p className="text-xs text-gray-500 mt-1">{followerCount} followers</p>
      </div>
    </div>
  );
};

export default ResultCard;
