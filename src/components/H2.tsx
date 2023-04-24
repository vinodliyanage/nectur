import React from "react";

interface H2Props {
    children: React.ReactNode;
}

const H2: React.FC<H2Props> = (props) => {
  return (
    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
      {props.children}
    </h2>
  );
};

export default H2;
