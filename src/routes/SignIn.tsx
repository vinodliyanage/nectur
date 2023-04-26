import { useFormik } from "formik";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Error from "../components/Error";
import H2 from "../components/H2";
import Input from "../components/Input";
import Label from "../components/Label";
import Link from "../components/Link";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { validationMessages } from "../data/validationMessages";

const {
  EMAIL_NOT_VALID,
  EMAIL_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_REQUIRED,
} = validationMessages;

const scheme = Yup.object({
  email: Yup.string().email(EMAIL_NOT_VALID).required(EMAIL_REQUIRED),

  password: Yup.string()
    .min(8, PASSWORD_MIN_LENGTH)
    .max(255, PASSWORD_MAX_LENGTH)
    .required(PASSWORD_REQUIRED),
});

const SignIn: React.FC = () => {
  const { handleSignIn } = useAuth();
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    validateOnMount: true,
    validationSchema: scheme,
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    onSubmit: async (values) => {
      const signedIn = await handleSignIn(values);
      if (signedIn) navigate("/comments");
    },
  });

  let isNotValid = useMemo(() => Object.values(errors).length > 0, [errors]);

  return (
    <div className="px-6 py-8 mx-auto">
      <Navbar />
      <div className="bg-light-300 rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4">
          <H2>Sign in to your account</H2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" title="Your email" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                required
              />
              <Error touched={touched.email} message={errors.email} />
            </div>

            <div>
              <Label htmlFor="password" title="Password" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                required
              />
              <Error touched={touched.password} message={errors.password} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox
                    id="remember"
                    name="remember"
                    checked={values.remember}
                    onChange={handleChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-900 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>
              <Link to="/forgotPassword">Forgot password?</Link>
            </div>
            <Button varient="primary" type="submit" disabled={isNotValid}>
              Sign in
            </Button>
            <p className="text-sm font-normal text-gray-900 dark:text-white">
              Don’t have an account yet? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
