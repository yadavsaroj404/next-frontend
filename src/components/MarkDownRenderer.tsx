"use client";

import React from "react";
import { toHTML } from "@/utils/markdown";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Renders markdown content as HTML.
 * Uses `toHTML` to parse and sanitize input.
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
}) => {
  const html = React.useMemo(() => toHTML(content), [content]);
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default MarkdownRenderer;
