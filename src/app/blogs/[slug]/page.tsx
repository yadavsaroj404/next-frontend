import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface Blog {
  id: string;
  title: string;
  url: string;
  metadata?: string; // Corrected typo from matadata
  summary: string;
  content: string;
  imageURL: string;
  keywords: string;
  author: string;
  authorInfo: string;
}

// This function centralizes the data fetching logic.
// It will be called by both generateMetadata and the main Page component.
async function getBlogData(slug: string): Promise<Blog | undefined> {
  const res = await fetch(
    `https://dashboard.careernaksha.com/articles/?url=${slug}`
  );

  if (!res.ok) {
    // If the response is not ok, a 404 error is likely.
    return undefined;
  }
  const data = await res.json();
  // The API returns an array, so we take the first element.
  return data[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogData(slug);

  if (!blog) {
    return {};
  }

  // Handle the 'noindex' logic for a specific slug.
  const robots =
    slug === "career-counselling-in-vadodara"
      ? "noindex, nofollow"
      : "index, follow";

  // The returned object defines the meta tags for the page.
  return {
    title: blog.title,
    description: blog.summary,
    keywords: blog.keywords,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      images: [
        {
          url: blog.imageURL,
          alt: blog.title,
        },
      ],
    },
    authors: [{ name: blog.author }],
    robots: robots,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogData(slug);

  if (!blog) {
    // If the blog post is not found, we render Next.js's 404 page.
    // This is more efficient and semantically correct than handling it manually.
    notFound();
  }

  return (
    <main className="min-h-screen py-20 flex justify-center items-center px-6 bg-white text-gray-800">
      <article className="max-w-7xl flex flex-col w-full">
        {/* Semantic heading for the blog post title */}
        <h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4 text-center"
          aria-label={`Blog post titled ${blog.title}`}
        >
          {blog.title}
        </h1>

        {/* Author information with proper semantics */}
        <p className="text-sm font-semibold text-gray-600 text-center mb-8">
          by{" "}
          <span className="capitalize" aria-label={`Author: ${blog.author}`}>
            {blog.author}
          </span>
          ,{" "}
          {/* Using dangerouslySetInnerHTML as authorInfo might contain raw HTML */}
          <span
            dangerouslySetInnerHTML={{ __html: blog.authorInfo }}
            aria-label="Author additional information"
          />
        </p>

        {/* Image container for the blog post hero image */}
        <div
          id="image-container"
          className="h-[400px] sm:h-[600px] mb-8 relative"
          //   className="relative w-auto h-[400px] sm:h-[600px] mb-8 overflow-hidden rounded-xl shadow-lg"
        >
          <Image
            src={blog.imageURL}
            alt={blog.title}
            fill
            priority
            className="rounded-xl object-contain"
            aria-label={`Image for blog post: ${blog.title}`}
          />
        </div>

        {/* Container for the main blog content */}
        <section
          className="max-w-full md:max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-6"
          aria-label="Blog post content"
        >
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </section>
      </article>
    </main>
  );
}
