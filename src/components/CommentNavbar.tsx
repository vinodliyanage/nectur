import React, { useState } from "react";
import User from "../types/User";
import Avatar from "./Avatar";
import AvatarDropdown from "./AvatarDropdown";
import IconButton from "./IconButton";
import BellIcon from "./icons/BellIcon";
import logo from "/logo.png";

interface CommentNavbarProps {
  user: Pick<User, "username" | "firstName" | "lastName" | "photo">;
}

const CommentNavbar: React.FC<CommentNavbarProps> = (props) => {
  const [dropdownShow, setDropdownShow] = useState(false);
  const { username, firstName, lastName, photo } = props.user;

  const userInitials = firstName[0] + lastName[0];

  const handleAvatorClick = () => setDropdownShow((prev) => !prev);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <img className="w-6 h-6" src={chrome.runtime.getURL(logo)} alt="" />
          <h1 className="font-medium text-xl dark:text-white">Comments</h1>
        </div>

        <div className="relative flex flex-row items-center gap-4">

          <IconButton>
            <BellIcon />
          </IconButton>

          <div className="flex items-center gap-2">
            <p className="font-medium text-sm dark:text-white capitalize">{username}</p>
            <button onClick={handleAvatorClick}>
              <Avatar size="sm" initials={userInitials} image={photo} />
            </button>
          </div>

          {dropdownShow && (
            <div className="absolute top-12 right-0 z-50">
              <AvatarDropdown />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CommentNavbar;
