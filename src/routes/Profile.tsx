import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Error from "../components/Error";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import Label from "../components/Label";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon";
import EditIcon from "../components/icons/EditIcon";
import { useAuth } from "../contexts/AuthContext";
import { validationMessages } from "../data/validationMessages";
import { imageUploader } from "../utils/utils";

const {
  FIRST_NAME_REQUIRED,
  FIRST_NAME_MIN_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_REQUIRED,
  LAST_NAME_MIN_LENGTH,
  LAST_NAME_MAX_LENGTH,
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
});

const Profile: React.FC = () => {
  const { user, handleUserUpdate } = useAuth();

  if (!user) return <></>;

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    validateOnMount: true,
    validationSchema: scheme,
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    onSubmit: () => {},
  });

  const fullName = `${values.firstName} ${values.lastName}`;

  const handlePhotoEdit = async () => {
    const photo = await imageUploader();
    if (typeof photo === "string") handleUserUpdate({ photo });
  };

  return (
      <div className="px-6 py-8 mx-auto space-y-3">
        
        <IconButton component="routerlink" to="/comments">
          <ArrowLeftIcon />
        </IconButton>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Avatar size="lg" initials="vl" image={user.photo} />
        
            <div className="px-2 py-1 absolute -bottom-1 -right-2 z-50 border rounded-lg border-gray-600 bg-light-300 dark:bg-black">
              <button className="flex flex-row text-sm dark:text-white" onClick={handlePhotoEdit}>
                <EditIcon />
                <p>edit</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl capitalize dark:text-white">{fullName}</h1>
            <p className="font-normal text-base dark:text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full p-6 bg-light-300 rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row space-x-2">
              <div className="w-full">
                <Label htmlFor="firstName" title="First name" required />
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
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
                  id="lastName"
                  name="lastName"
                  type="text"
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
              <Label htmlFor="email" title="Your email" required />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={user.email}
                required
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button varient="primary">Update</Button>

            <Button varient="outline" component="link" to="/resetPassword">
              Reset Password
            </Button>

            <Button varient="danger">Delete my Account</Button>
          </div>
        </div>
      </div>
  );
};

export default Profile;
