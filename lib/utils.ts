import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dataURLtoBuffer = (dataUrl: string) => {
  const data = String(dataUrl).split(',')[1]
  return Buffer.from(data, 'base64')
}
