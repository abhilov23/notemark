/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const dateFormatter = new Intl.DateTimeFormat((window as any).context.locale, { 
  dateStyle :'short',
  timeStyle: 'short',
  timeZone: 'UTC'
 });

 export const formatDateFromMs = (ms: number) => dateFormatter.format(ms);

export const cn = (...args: ClassValue[]): string => {
    return twMerge(clsx(...args));
}