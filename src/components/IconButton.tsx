import React from "react";
import { Link } from "react-router-dom";

interface IconButtonProps {
  children: React.ReactNode;
  to?: string;
  component?: "button" | "routerlink" | "a";
  onClick?: () => void;
}

const className =
  "inline-block text-gray-900 dark:text-white hover:bg-light-600 dark:hover:bg-gray-600 rounded-full p-2";

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { children, to = "", component = "button", onClick = () => {} } = props;

  return (
    <div className={className}>
      {component === "button" ? (
        <button className="block" onClick={onClick}>
          {children}
        </button>
      ) : component === "routerlink" ? (
        <Link to={to} onClick={onClick}>
          {children}
        </Link>
      ) : component === "a" ? (
        <a href={to} onClick={onClick}>
          {children}
        </a>
      ) : (
        <></>
      )}
    </div>
  );
};

export default IconButton;
