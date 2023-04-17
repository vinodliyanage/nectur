import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  title: string;
  required?: boolean;
}

const Label: React.FC<LabelProps> = (props) => {
  return (
    <label 
    {...props} 
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {props.title}{props.required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
