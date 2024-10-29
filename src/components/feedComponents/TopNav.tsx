// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { sidebarOptions } from "../../../constants/sidebarOptions";
import { Link, useLocation } from "react-router-dom";

export const TopNav = () => {
  const location = useLocation();
  
  return (
    <div className="w-full bg-white border-b border-gray-100 py-3 px-6 overflow-x-auto">
      <div className="flex space-x-6 items-center justify-center min-w-max">
        {sidebarOptions.map((option) => {
          const isActive = location.pathname === option.path;
          return (
            <Link
              key={option.path}
              to={option.path}
              className={`flex items-center space-x-2 ${
                isActive ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'
              }`}
            >
              <span className="text-xl">{option.icon}</span>
              {option.name === 'Messages' && (
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  6
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
