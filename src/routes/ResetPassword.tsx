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

const {
  EMAIL_NOT_VALID,
  EMAIL_REQUIRED,
  CURRENT_PASSWORD_MIN_LENGTH,
  CURRENT_PASSWORD_MAX_LENGTH,
  CURRENT_PASSWORD_REQUIRED,
  NEW_PASSWORD_MIN_LENGTH,
  NEW_PASSWORD_MAX_LENGTH,
  NEW_PASSWORD_REQUIRED,
  CONFIRM_PASSWORD_REQUIRED,
  PASSWORD_SAME_AS_OLD,
  PASSWORD_NOT_MATCH,
  AGREE_TERMS,
  AGREE_TERMS_REQUIRED,
} = validationMessages;

const scheme = Yup.object({
  email: Yup.string().email(EMAIL_NOT_VALID).required(EMAIL_REQUIRED),

  currentPassword: Yup.string()
    .min(8, CURRENT_PASSWORD_MIN_LENGTH)
    .max(255, CURRENT_PASSWORD_MAX_LENGTH)
    .required(CURRENT_PASSWORD_REQUIRED),

  newPassword: Yup.string()
    .min(8, NEW_PASSWORD_MIN_LENGTH)
    .max(255, NEW_PASSWORD_MAX_LENGTH)
    .test("passwords-same", PASSWORD_SAME_AS_OLD, function (value) {
      return this.parent.currentPassword !== value;
    })
    .required(NEW_PASSWORD_REQUIRED),

  confirmPassword: Yup.string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .test("passwords-match", PASSWORD_NOT_MATCH, function (value) {
      return this.parent.newPassword === value;
    }),

  agreeTerms: Yup.boolean().oneOf([true], AGREE_TERMS).required(AGREE_TERMS_REQUIRED),
});

const ResetPassword: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    validateOnMount: true,
    validationSchema: scheme,
    initialValues: {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    onSubmit: () => {},
  });

  let isNotValid = useMemo(() => Object.values(errors).length > 0, [errors]);

  return (
    <>
      <div className="px-6 py-8 mx-auto">
        <Navbar backTo="/profile" />

        <div className="p-6 bg-light-300 rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <H2>Change Password</H2>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" title="Your email" />
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <Error touched={touched.email} message={errors.email} />
            </div>
            <div>
              <Label htmlFor="currentPassword" title="Current Password" />
              <Input
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="••••••••"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <Error touched={touched.currentPassword} message={errors.currentPassword} />
            </div>
            <div>
              <Label htmlFor="newPassword" title="New Password" />
              <Input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="••••••••"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <Error touched={touched.newPassword} message={errors.newPassword} />
            </div>
            <div>
              <Label htmlFor="confirmPassword" title="Confirm password" />
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <Error touched={touched.confirmPassword} message={errors.confirmPassword} />
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

            <Button type="submit" varient="primary" disabled={isNotValid}>
              Reset passwod
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
