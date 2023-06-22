import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AvatarDropdown: React.FC = (props) => {
  const { user, handleSignOut } = useAuth();
  if (!user) return <></>;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <>
      <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{fullName}</div>
          <div className="font-medium truncate">{user.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Profile
            </Link>
          </li>
        </ul>
        <div className="py-1">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-sm flex items-start text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            <p>Sign out</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default AvatarDropdown;
