import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuth() {
  const token = sessionStorage.getItem('token');

  return {
    isLoggedIn: !!token,
  };
}
