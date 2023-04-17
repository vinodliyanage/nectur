import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

interface NavbarProps {
  backTo?: string;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <>
      <div className="mb-6 text-gray-900 dark:text-white">
        <div className="grid grid-cols-3">
          <div className="flex justify-start col-span-1">
            {props.backTo?.length && (
              <Link
                to={props.backTo}
                className="rounded-full p-1 hover:bg-light-600 hover:dark:bg-gray-600"
              >
                <ArrowLeftIcon />
              </Link>
            )}
          </div>
          <div className="flex justify-center items-center col-span-1">
            <Link to="/" className="flex items-center text-2xl font-semibold space-x-1">
              <img className="w-8 h-8" src={chrome.runtime.getURL(logo)} alt="logo" />
              <p>Nectur</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
