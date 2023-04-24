import React, { useEffect, useState } from "react";
import email from "../assets/images/email.png";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

const EmailConfirmation: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const { user } = useAuth();

  const userEmail = user?.email || "";

  useEffect(() => {
    if (!isDisabled) return;

    if (countdown <= 0) return setIsDisabled(false);

    const timer = setInterval(() => setCountdown(countdown - 1), 1000);
    return () => clearInterval(timer);
  }, [isDisabled, countdown]);

  const handleResend = () => {
    setIsDisabled(true);
    setCountdown(30);
  };

  return (
    <>
      <div className="w-11/12 flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <Navbar backTo="/Signin" />

        <div className="w-full p-6 flex flex-col gap-5 bg-light-300 rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <img className="w-24 h-24 m-auto" src={chrome.runtime.getURL(email)} alt="" />
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="text-2xl font-bold mb-2 leading-tight tracking-tight text-gray-900 dark:text-white">
              Confirm your email address
            </h1>
            <h2 className="text-base font-light leading-tight tracking-tight text-gray-900 dark:text-white">
              We sent a verification email to:
            </h2>
            <h2 className="text-base font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              {userEmail}
            </h2>
            <h2 className=" text-base font-light leading-tight tracking-tight text-gray-900 dark:text-white">
              Check your email and click on the confirmation link to continue.
            </h2>
          </div>

          <Button varient="primary" onClick={handleResend} disabled={isDisabled}>
            {isDisabled ? `Resend in ${countdown} seconds` : "Resend"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmailConfirmation;
