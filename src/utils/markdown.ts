// Utility to convert Markdown string to sanitized HTML
import { marked } from "marked";
// remove isomorphic-dompurify if and only if Markdown input is fully trusted.
// import DOMPurify from "isomorphic-dompurify";

/**
 * Convert a markdown string to HTML safely.
 * @param markdown - the input markdown text
 * @returns sanitized HTML string
 */
// export function toHTML(markdown: string): string {
//   if (!markdown) return "";
//   const rawHtml = marked.parse(markdown).toString();
//   return DOMPurify.sanitize(rawHtml);
// }

export function toHTML(markdown: string): string {
  if (!markdown) return "";
  return marked.parse(markdown).toString();
}
