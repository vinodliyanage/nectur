import React from "react";

const Checkbox: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <>
      <input
        {...props}
        type="checkbox"
        className="w-4 h-4 border rounded outline-none accent-primary-500 border-gray-300 focus:ring-2 focus:ring-primary-300 dark:border-gray-600 dark:focus:ring-primary-600"
      />
    </>
  );
};

export default Checkbox;
