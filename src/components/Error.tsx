import React from "react";

interface ErrorProps {
  touched: boolean | undefined;
  message: string | undefined;
}

const Error: React.FC<ErrorProps> = (props) => {
  const { touched, message } = props;

  return Boolean(touched && message?.length) ? (
    <span className="text-red-500 block p-1">{message}</span>
  ) : (
    <></>
  );
};

export default Error;
