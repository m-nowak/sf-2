import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const separateCamelCase = (str: string) => {
    let newStr = str;
    if (str === "PointingandDrilling") {
        newStr = str.replace(/\bPointingandDrilling\b/g, 'Pointing & Drilling');
    }
    if (str === "DrillPointandBroach") {
        newStr = str.replace(/\bDrillPointandBroach\b/g, 'DrillPoint & Broach');
    }


    return newStr.split(/(?=[A-Z])/).join(' ');
}

export const getDescription = (time: any) => {
  if (time === "365") {
      return "within a year."
  } else {
      return "in the last " + time + " days.";
  }
}