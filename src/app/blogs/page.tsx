import React from "react";
import BlogCard from "./Blog"; // Adjust import path if BlogCard is elsewhere
import PaginationControls from "./PaginationControls"; // New client component for pagination
import { Metadata } from "next"; // For SEO metadata

// --- Interfaces ---
// Defines the structure for a blog post, ensuring type safety.
interface Blog {
  id: string;
  title: string;
  url: string; // Slug for the blog post URL
  metadata: string;
  summary: string;
  content: string;
  imageURL: string;
  keywords: string;
  author: string;
  authorInfo: string;
  publishedDate?: string;
}

// --- Props for the Server Component ---
interface BlogsPageProps {
  searchParams: Promise<{
    page?: string;
    per_page?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Our Blog - Latest Articles on Career Guidance & Education",
  description:
    "Explore expert articles, tips, and insights on career counselling, education, and professional development from India’s leading career guidance platform.",
  keywords: [
    "blog",
    "career guidance articles",
    "career counselling blog",
    "education insights",
    "professional development",
    "career tips",
    "India",
  ],
  openGraph: {
    title: "Our Blog - Latest Articles on Career Guidance & Education",
    description:
      "Explore expert articles, tips, and insights on career counselling, education, and professional development from India’s leading career guidance platform.",
    url: "https://www.careernaksha.com/blogs", // Replace with your actual blog URL
    siteName: "CareerNaksha",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Blog - Latest Articles on Career Guidance & Education",
    description:
      "Explore expert articles, tips, and insights on career counselling, education, and professional development from India’s leading career guidance platform.",
  },
};

async function getBlogs(): Promise<Blog[]> {
  const API_URL = "https://dashboard.careernaksha.com/articles?_sort=_id:DESC";
  let blogs: Blog[] = [];

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch blogs: ${response.status} ${response.statusText}`
      );
    }
    blogs = await response.json();
  } catch (e: any) {
    console.error("Error fetching blogs:", e);
    throw new Error("Could not load blog posts. Please try again later.");
  }

  return blogs;
}

export default async function Blogs({ searchParams }: BlogsPageProps) {
  const API_URL = "https://dashboard.careernaksha.com/articles?_sort=_id:DESC";

  let blogs: Blog[] = [];

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch blogs: ${response.status} ${response.statusText}`
      );
    }
    blogs = await response.json();
  } catch (e: any) {
    console.error("Error fetching blogs on server:", e);
    throw new Error("Could not load blog posts. Please try again later.");
  }

  // Extract current page and cards per page from URL search parameters.
  const { page, per_page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const cardsPerPage = parseInt(per_page || "6", 10);

  const totalPages = Math.ceil(blogs.length / cardsPerPage);

  // Calculate paginated blogs for the current page.
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const paginatedBlogs = blogs.slice(start, end);

  // If no blogs are found, display a message.
  if (paginatedBlogs.length === 0) {
    return (
      <section className="flex justify-center items-center h-96 text-gray-600 text-lg">
        <p>No blog posts found.</p>
      </section>
    );
  }

  return (
    <section className="font-sans">
      {/* Blog Cards Display Area */}
      <div className="mt-10 flex flex-wrap gap-4 justify-center items-center py-20">
        {/* Renders a BlogCard for each blog post on the current page */}
        {paginatedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {/* Pagination Controls Section (Client Component) */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        cardsPerPage={cardsPerPage}
        totalBlogsCount={blogs.length}
      />
    </section>
  );
}
