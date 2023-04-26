import React from "react";
import { Link } from "react-router-dom";
import { classNames } from "../utils/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  varient?: "primary" | "secondary" | "outline" | "danger";
  component?: "button" | "link";
  to?: string;
  children?: React.ReactNode;
}

const _buttonClasses = {
  sm: "py-2 px-4 text-xs",
  md: "py-3 px-5 text-sm",
  lg: "py-4 px-6 text-base",
  primary:
    "text-white bg-primary-500 hover:bg-primary-600 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-600",
  secondary:
    "border text-gray-600 border-gray-900 dark:text-white dark:border-white hover:bg-gray-100 hover:text-gray-600 focus:ring-white",
  outline:
    "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
  danger:
    "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",

  disabled: "opacity-50 pointer-events-none",
  base: "inline-flex justify-center items-center font-medium rounded-lg text-center focus:ring-4 focus:outline-none",
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    size = "md",
    varient = "primary",
    disabled = false,
    component = "button",
    to = "",
    children = <></>,
  } = props;

  const buttonClasses = classNames(_buttonClasses, [
    size,
    varient,
    disabled ? "disabled" : "",
    "base",
  ]);

  return component === "button" ? (
    <button {...props} className={buttonClasses}>
      {children}
    </button>
  ) : component === "link" ? (
    <Link to={to} className={buttonClasses}>
      {children}
    </Link>
  ) : (
    <></>
  );
};

export default Button;
