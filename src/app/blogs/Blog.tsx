"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { FaFacebook } from "react-icons/fa6";

// Defines the properties expected for a blog post.
interface Blog {
  id: string;
  title: string;
  url: string; // The unique part of the URL for this blog post (e.g., 'my-awesome-blog-post')
  metadata: string;
  summary: string;
  content: string;
  imageURL: string;
  keywords: string;
  author: string;
  authorInfo: string;
  publishedDate?: string; // Optional: Date the blog was published (e.g., 'YYYY-MM-DD')
}

// Helper Function: Truncate Summary
// Shortens the blog summary to a maximum length and adds '...' if truncated.
const getShortSummary = (summary: string): string => {
  const maxLength = 280;
  if (summary.length <= maxLength) {
    return summary;
  }
  return summary.slice(0, maxLength) + "...";
};

export default function BlogCard({ blog }: { blog: Blog }) {
  const shareOnFacebook = (e: React.MouseEvent): void => {
    e.preventDefault();
    const blogAbsoluteUrl = `https://www.careernaksha.com/blogs/${blog.url}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      blogAbsoluteUrl
    )}`;

    // Open a new pop-up window for Facebook sharing.
    window.open(facebookShareUrl, "facebook-popup", "height=350,width=600");
  };

  // Construct the absolute URL for the blog post.
  const blogAbsoluteUrl = `https://www.careernaksha.com/blogs/${blog.url}`;

  return (
    <article className="h-[32rem] p-4 flex flex-col bg-white shadow-lg rounded-xl border border-gray-200 max-w-[30rem] w-full group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
      <div className="w-full h-[16rem] overflow-hidden flex justify-center items-center flex-shrink-0 rounded-lg shadow-sm mb-3">
        <Image
          src={blog.imageURL}
          alt={`Featured image for blog post: ${blog.title}`} // Descriptive alt text for accessibility and SEO.
          width={400} // Explicit width to prevent layout shifts.
          height={200} // Explicit height to prevent layout shifts.
          className="h-full w-full object-cover"
          priority={false} // Set to true only for images above the fold (visible on initial load).
        />
      </div>

      {/* Blog Title and Author Section */}
      <header className="mt-3 mb-2 flex-shrink-0">
        <h3 className="font-bold text-xl leading-tight text-gray-900 mb-1">
          {blog.title}
        </h3>
        {/* Author information and optional published date. */}
        <p className="text-sm text-gray-600">
          By <span className="font-semibold text-blue-700">{blog.author}</span>
          {blog.publishedDate && (
            <time
              dateTime={blog.publishedDate}
              className="ml-2 text-xs text-gray-500"
            >
              ({new Date(blog.publishedDate).toLocaleDateString()})
            </time>
          )}
        </p>
      </header>

      {/* Blog Summary */}
      <p className="text-base text-gray-700 mt-2 flex-grow overflow-hidden line-clamp-4">
        {getShortSummary(blog.summary)}
      </p>

      {/* Action Buttons (Read & Share) */}
      <footer className="mt-auto pt-4 flex items-center justify-between px-0 pb-0">
        {/* Link component for client-side navigation to the full blog post. */}
        <Link href={`/blogs/${blog.url}`} passHref>
          <button
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 cursor-pointer"
            aria-label={`Read more about ${blog.title}`} // Accessible label for screen readers.
          >
            Read More
            <svg
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </Link>

        {/* Social Share Buttons */}
        <div className="flex gap-2">
          {/* WhatsApp Share Link */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              blog.title + " - " + blogAbsoluteUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer" // Security best practice for target="_blank" links.
            className="p-2 rounded-full text-green-500 hover:bg-green-100 transition-colors duration-200"
            aria-label={`Share "${blog.title}" on WhatsApp`}
            title="Share on WhatsApp"
          >
            <TbBrandWhatsappFilled size={24} />
          </a>
          {/* Facebook Share Button */}
          <button
            onClick={shareOnFacebook}
            className="p-2 rounded-full text-blue-700 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
            aria-label={`Share "${blog.title}" on Facebook`}
            title="Share on Facebook"
          >
            <FaFacebook size={24} />
          </button>
        </div>
      </footer>
    </article>
  );
}
