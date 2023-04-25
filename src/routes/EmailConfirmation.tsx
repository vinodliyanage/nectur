import React, { useEffect, useState } from "react";
import email from "../assets/images/email.png";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { classNames } from "../utils/utils";

const initialStyles = {
  h1: "text-2xl mb-2",
  h2: "text-base",
  fontLight: "font-light",
  fontBold: "font-bold",
  base: "leading-tight tracking-tight text-gray-900 dark:text-white",
};

const h1Styles = classNames(initialStyles, ["h1", "font-bold", "base"]);
const h2LightStyles = classNames(initialStyles, ["h2", "fontLight", "base"]);
const h2BoldStyles = classNames(initialStyles, ["h2", "fontBold", "base"]);

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
    // TODO: send email verification
  };

  return (
    <>
      <div className="px-6 py-8 mx-auto">
        <Navbar backTo="/Signin" />

        <div className="w-full p-6 flex flex-col gap-5 rounded-lg shadow bg-light-300 dark:border dark:bg-gray-800 dark:border-gray-700">
          <img className="w-24 h-24 m-auto" src={chrome.runtime.getURL(email)} alt="" />
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className={h1Styles}>Confirm your email address</h1>
            <h2 className={h2LightStyles}>We sent a verification email to:</h2>
            <h2 className={h2BoldStyles}>{userEmail}</h2>
            <h2 className={h2LightStyles}>
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
