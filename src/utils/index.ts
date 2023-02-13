import clsx, { ClassValue } from "clsx";
export const addFont: (arg0: ClassValue[]) => ReturnType<typeof clsx> = (
  twClasses
) => {
  return clsx(twClasses);
};
