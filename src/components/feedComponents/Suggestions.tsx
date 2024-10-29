import React from 'react';

const Suggestions = () => {
  const suggestions = [
    {
      id: 1,
      name: 'Nick Shelburne',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Brittni Lando',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Ivan Shevchenko',
      avatar: '/api/placeholder/40/40'
    },
    
  ];

  return (
    <div className="w-[300px] max-w-xs bg-red-200 p-4">
      <h2 className="text-base font-bold text-black mb-4">
        Suggestions
      </h2>

      <div className="space-y-3">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-900">
                {user.name}
              </span>
            </div>
            <button className="text-xs font-semibold text-white bg-black hover:bg-gray-800 px-4 py-1.5 rounded-full transition-colors">
              Follow
            </button>
          </div>
        ))}
      </div>

      <button className="text-sm text-gray-500 hover:text-gray-700 mt-4 w-full text-start">
        See all
      </button>
    </div>
  );
};

export default Suggestions;