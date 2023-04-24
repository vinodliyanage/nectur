import React from "react";
import Button from "../components/Button";
import ArrowRightIcon from "../components/icons/ArrowRightIcon";

const Welcome: React.FC = () => {
  return (
    <div className="py-16 px-4 text-center">
      <h1 className="mb-4 text-5xl font-bold tracking-tight leading-none text-gray-600 dark:text-white">
        Hello there!
      </h1>
      <p className="mb-8 text-lg font-normal text-gray-600 dark:text-white">
        Experience the future of commenting with our extension today!
      </p>
      <div className="flex flex-row justify-center space-x-4">
        <Button size="lg" varient="primary" component="link" to="/signup">
          <p>Get started</p>
          <div className="ml-2 -mr-1">
            <ArrowRightIcon />
          </div>
        </Button>

        <Button size="lg" varient="secondary" component="link" to="/signin">
          <p>Sign in</p>
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
