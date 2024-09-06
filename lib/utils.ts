import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = [
  "#DC2626",
  "#EF4444",
  "#F87171",
  "#FBBF24",
  "#FCD34D",
  "#FDE68A",
  "#A3E635",
  "#6EE7B7",
  "#34D399",
  "#10B981",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#F43F5E",
  "#F87171",
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(id: number) {
  return COLORS[id % COLORS.length];
}
