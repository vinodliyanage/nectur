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
  FIRST_NAME_REQUIRED,
  FIRST_NAME_MIN_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_REQUIRED,
  LAST_NAME_MAX_LENGTH,
  LAST_NAME_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_REQUIRED,
  EMAIL_NOT_VALID,
  EMAIL_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_NOT_MATCH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_REQUIRED,
  CONFIRM_PASSWORD_REQUIRED,
  AGREE_TERMS,
  AGREE_TERMS_REQUIRED,
} = validationMessages;

const scheme = Yup.object({
  firstName: Yup.string()
    .min(2, FIRST_NAME_MIN_LENGTH)
    .max(255, FIRST_NAME_MAX_LENGTH)
    .required(FIRST_NAME_REQUIRED),

  lastName: Yup.string()
    .min(2, LAST_NAME_MIN_LENGTH)
    .max(255, LAST_NAME_MAX_LENGTH)
    .required(LAST_NAME_REQUIRED),

  username: Yup.string()
    .min(2, USERNAME_MIN_LENGTH)
    .max(255, USERNAME_MAX_LENGTH)
    .required(USERNAME_REQUIRED),

  email: Yup.string().email(EMAIL_NOT_VALID).required(EMAIL_REQUIRED),

  password: Yup.string()
    .min(8, PASSWORD_MIN_LENGTH)
    .max(255, PASSWORD_MAX_LENGTH)
    .required(PASSWORD_REQUIRED),

  confirmPassword: Yup.string()
    .test("passwords-match", PASSWORD_NOT_MATCH, function (value) {
      return this.parent.password === value;
    })
    .required(CONFIRM_PASSWORD_REQUIRED),

  agreeTerms: Yup.boolean().oneOf([true], AGREE_TERMS).required(AGREE_TERMS_REQUIRED),
});

const SignUp: React.FC = () => {
  const { handleSignUp } = useAuth();
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    validateOnMount: true,
    validationSchema: scheme,
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    onSubmit: (values) => {
      const signedUp = handleSignUp(values);
      if (signedUp) navigate("/emailConfirmation");
    },
  });

  let isNotValid = useMemo(() => Object.values(errors).length > 0, [errors]);

  return (
    <div className="px-6 py-8 mx-auto">
      <Navbar />

      <div className="bg-light-300 rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4">
          <H2>Create and account</H2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-row space-x-2">
              <div className="w-full">
                <Label htmlFor="firstName" title="First name" required />
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  placeholder="Vinod"
                  required
                />
                <Error touched={touched.firstName} message={errors.firstName} />
              </div>
              <div className="w-full">
                <Label htmlFor="lastName" title="Last name" required />
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  placeholder="Liyanage"
                  required
                />
                <Error touched={touched.lastName} message={errors.lastName} />
              </div>
            </div>

            <div>
              <Label htmlFor="username" title="Your Username" required />
              <Input
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                placeholder="vinodliyanage"
                required
              />
              <Error touched={touched.username} message={errors.username} />
            </div>

            <div>
              <Label htmlFor="email" title="Your email" required />
              <Input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="name@company.com"
                required
              />
              <Error touched={touched.email} message={errors.email} />
            </div>

            <div>
              <Label htmlFor="password" title="Password" required />
              <Input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="••••••••"
                required
              />
              <Error touched={touched.password} message={errors.password} />
            </div>

            <div>
              <Label htmlFor="confirmPassword" title="Confirm password" required />
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                required
              />
              <Error touched={touched.confirmPassword} message={errors.confirmPassword} />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="agreeTerms"
                  aria-describedby="agreeTerms"
                  type="checkbox"
                  checked={values.agreeTerms}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeTerms" className="font-light text-gray-500 dark:text-gray-300">
                  I accept the{" "}
                  <Link to="#" component="a">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>

            <Button type="submit" disabled={isNotValid}>
              Create an account
            </Button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <Link to="/Signin">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
