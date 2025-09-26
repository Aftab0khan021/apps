import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export function formatDate(date: string | Date, format: 'short' | 'long' | 'year' = 'short') {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'year':
      return dateObj.getFullYear().toString();
    case 'long':
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'short':
    default:
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      });
  }
}

// Duration calculator for experience/education
export function calculateDuration(startDate: string, endDate?: string, current?: boolean) {
  const start = new Date(startDate);
  const end = current || !endDate ? new Date() : new Date(endDate);
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  
  if (years === 0) {
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  }
  
  if (months === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }
  
  return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${months === 1 ? 'month' : 'months'}`;
}

// Text truncation
export function truncateText(text: string, maxLength: number = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Skill level to color mapping
export function getSkillLevelColor(level: number) {
  if (level >= 90) return 'bg-green-500';
  if (level >= 75) return 'bg-blue-500';
  if (level >= 50) return 'bg-yellow-500';
  if (level >= 25) return 'bg-orange-500';
  return 'bg-red-500';
}

// Generate slug from string
export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}