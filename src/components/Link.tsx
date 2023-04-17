import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface LinkProps {
  to: string;
  children?: React.ReactNode;
  component?: "routerlink" | "a";
}

const className = "text-sm font-medium text-primary-500 hover:underline dark:text-primary-300";

const Link: React.FC<LinkProps> = (props) => {
  const { component = "routerlink", to, children = <></> } = props;

  return component === "routerlink" ? (
    <RouterLink to={to} className={className}>
      {children}
    </RouterLink>
  ) : component === "a" ? (
    <a href={to} className={className}>
      {children}
    </a>
  ) : (
    <></>
  );
};

export default Link;
