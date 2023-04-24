import { useFormik } from "formik";
import React, { useMemo } from "react";
import * as Yup from "yup";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Error from "../components/Error";
import H2 from "../components/H2";
import Input from "../components/Input";
import Label from "../components/Label";
import Link from "../components/Link";
import Navbar from "../components/Navbar";
import { validationMessages } from "../data/validationMessages";

const { EMAIL_NOT_VALID, EMAIL_REQUIRED, AGREE_TERMS } = validationMessages;

const scheme = Yup.object({
  email: Yup.string().email(EMAIL_NOT_VALID).required(EMAIL_REQUIRED),
  agreeTerms: Yup.boolean().oneOf([true], AGREE_TERMS),
});

const ForgotPassword: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    validateOnMount: true,
    validationSchema: scheme,
    initialValues: {
      email: "",
      agreeTerms: false,
    },
    onSubmit: () => {},
  });

  let isNotValid = useMemo(() => Object.values(errors).length > 0, [errors]);

  return (
    <div className="px-6 py-8 mx-auto">
      <Navbar backTo="/Signin" />

      <div className="p-6 bg-light-300 rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <H2>Forgot your password?</H2>
        <p className="font-light text-gray-500 dark:text-gray-400">
          Don't fret! Just type in your email and we will send you a code to reset your password!
        </p>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" title=" Your email" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <Error touched={touched.email} message={errors.email} />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <Checkbox
                id="agreeTerms"
                aria-describedby="agreeTerms"
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
          <Button varient="primary" type="submit" disabled={isNotValid}>
            Reset password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
