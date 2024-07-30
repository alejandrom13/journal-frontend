import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function simulateKeyPress(key: string) {
  const event = new KeyboardEvent('keydown', {
    key: key,
    keyCode: key === 'Escape' ? 27 : key.charCodeAt(0),
    which: key === 'Escape' ? 27 : key.charCodeAt(0),
    bubbles: true,
    cancelable: true
  });
  document.dispatchEvent(event);
}