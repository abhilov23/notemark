/* eslint-disable prettier/prettier */

import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export const cn = (...args: ClassValue[]): string => {
    return twMerge(clsx(...args));
}