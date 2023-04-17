import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <>
      <input
        {...props}
        className="block w-full p-2.5 outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-400"
      />
    </>
  );
};

export default Input;
