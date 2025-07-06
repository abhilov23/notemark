/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { clsx } from 'clsx';

export function cn(...inputs: any[]) {
  return clsx(...inputs);
}
