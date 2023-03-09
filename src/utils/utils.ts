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

    if(years > 0) {
      return years + "y";
    } else if(months > 0) {
      return months + "months"
    } else if (weeks > 0) {
      return weeks + "w";
    } else if (days > 0) {
      return days + "d";
    }else if(hours > 0) {
      return hours + "h"
    } else if (minutes > 0) {
      return minutes + "m";
    } else if (seconds > 0) {
      return seconds + "s";
    }
    return "";
}