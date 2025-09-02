/**
 * Utility function to combine CSS classes
 * Filters out falsy values and joins with spaces
 */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}