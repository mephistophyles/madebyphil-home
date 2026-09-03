import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a "YYYY-MM-DD" frontmatter date string for display.
 * `new Date("YYYY-MM-DD")` parses as UTC midnight, so formatting it in a
 * timezone behind UTC shows the previous day. Parsing the parts directly
 * and constructing a local Date avoids that off-by-one.
 */
export function formatFrontmatterDate(
  dateStr: string,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
) {
  const [year, month, day] = dateStr.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-US", options)
}
