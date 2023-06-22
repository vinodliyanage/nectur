import { createResizedImage } from "./imageResizer";

export function createHash(str: string) {
  if (typeof str !== "string") throw new Error("not a valid string!");

  let hash = 0;
  let i, chr;

  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

export function findTimeCategory(timestamp: number) {
  const timePeriod = Date.now() - timestamp;

  let seconds = Math.floor(timePeriod / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let weeks = Math.floor(days / 7);
  let months = Math.floor(weeks / 4);
  let years = Math.floor(months / 12);

  if (years > 0) {
    return years + " years ago";
  } else if (months > 0) {
    return months + " months ago";
  } else if (weeks > 0) {
    return weeks + " weeks ago";
  } else if (days > 0) {
    return days + " days ago";
  } else if (hours > 0) {
    return hours + " hours ago";
  } else if (minutes > 0) {
    return minutes + " minutes ago";
  } else if (seconds > 0) {
    return seconds + " seconds ago";
  }
  return "0 seconds ago";
}

export function imageUploader(): Promise<string | File | Blob | ProgressEvent<FileReader>> {
  const handler = document.createElement("input");
  handler.setAttribute("type", "file");
  handler.setAttribute("accept", ".png, .jpg, .jpeg");
  handler.click();

  return new Promise((resolve) => {
    const handleFileChange = () => {
      const file = handler.files?.[0];
      if (!file) return resolve("");

      createResizedImage(file, 300, 300, "JPEG", 80, 0, (value) => resolve(value), "base64");
    };
    handler.addEventListener("change", handleFileChange);
  });
}

export function classNames(classConfig: { [key: string]: string }, arr: string[]) {
  let classes = "";
  arr.forEach((item) => (classes += classConfig[item] + " "));
  return classes;
}
