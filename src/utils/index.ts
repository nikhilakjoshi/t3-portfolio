import clsx, { ClassValue } from "clsx";
import { Rubik } from "@next/font/google";
const font = Rubik({ subsets: ["latin"] });
export const addFont: (arg0: ClassValue[]) => ReturnType<typeof clsx> = (
  twClasses
) => {
  return clsx(font.className, twClasses);
};
