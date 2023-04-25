import React from "react";
import { classNames } from "../utils/utils";

interface AvatarProps {
  initials: string;
  size?: "xs" | "sm" | "md" | "lg";
  image?: string;
}

const _imageSizes = {
  xs: "w-8 h-8",
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-28 h-28",
}

const _initialSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
  base: "text-gray-600 uppercase dark:text-gray-300"
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { size="md", image = "", initials } = props;
  
  const imageSizes = classNames(_imageSizes, [size])
  const initialClasses = classNames(_initialSizes, [size, "base"])

  return (
      <div
        className={
          imageSizes +
          "relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
        }
      >
        {image.length ? (
          <img className={imageSizes + "object-cover rounded-full"} src={image} alt="Rounded avatar"></img>
        ) : (
          <span className={initialClasses}>{initials}</span>
        )}
      </div>
  );
};

export default Avatar;
