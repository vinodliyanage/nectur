import React from "react";
import logo from "/logo.png";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <img className="w-6 h-6" src={chrome.runtime.getURL(logo)} alt="" />
          <h1 className="font-medium text-xl dark:text-white">Comments</h1>
        </div>

        <div className="flex flex-row items-center gap-2">
          <p className="font-medium text-sm dark:text-white">Admin</p>
          <button>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                AD
              </span>
            </div>
            {/* <img
              className="w-10 h-10 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
              alt=""
            /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
