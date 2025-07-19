"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

interface Blog {
  url: string;
  title: string;
  author: string;
  summary: string;
  imageURL: string;
}

interface BlogPageCardProps {
  blog: Blog;
}

const BlogPageCard: React.FC<BlogPageCardProps> = ({ blog }) => {
  const router = useRouter();

  // Generate a summary capped at 280 chars
  const summary =
    blog.summary.length < 280
      ? blog.summary
      : blog.summary.slice(0, 280) + "...";

  // Navigate to blog page
  const readBlog = useCallback(() => {
    router.push(`/blogs/${blog.url}`);
  }, [router, blog.url]);

  // WhatsApp share URL
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=https://www.careernaksha.com/blogs/${blog.url}`;

  // Facebook share popup
  const facebookShare = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (typeof window === "undefined") return;
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://www.careernaksha.com/blogs/${blog.url}`;
      const popup = window.open(
        shareUrl,
        "facebook-popup",
        "height=350,width=600"
      );
      popup?.focus();
    },
    [blog.url]
  );

  return (
    <article className="tw-h-[36rem] tw-p-4 tw-flex tw-flex-col tw-shadow-lg tw-rounded-lg tw-border tw-border-SmallHeading tw-max-w-[30rem] tw-w-full tw-relative">
      <header>
        <h4 className="tw-font-semibold tw-text-lg">{blog.title}</h4>
        <h6 className="tw-text-sm tw-mt-1 tw-text-gray-600">{blog.author}</h6>
      </header>

      <div className="tw-w-full tw-h-[20rem] tw-overflow-hidden tw-flex tw-justify-center tw-items-center tw-py-2">
        <Image
          src={blog.imageURL}
          alt={blog.title}
          width={600}
          height={320}
          className="tw-object-cover tw-w-full tw-h-full"
        />
      </div>

      <p className="tw-description tw-text-sm tw-h-[10rem] tw-overflow-hidden tw-whitespace-normal tw-text-ellipsis">
        {summary}
      </p>

      <div className="tw-absolute tw-bottom-4 tw-flex tw-items-center tw-w-full tw-justify-between">
        <button 
          onClick={readBlog}
          className="tw-font-semibold tw-text-BluePrimary hover:tw-scale-105 tw-transition-all"
        >
          READ
        </button>

        <div className="tw-flex tw-items-center tw-gap-4">
          <Link
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tw-text-green-500 hover:tw-scale-105 tw-transition-all"
          >
            SHARE
          </Link>

          <a
            href="#"
            onClick={facebookShare}
            className="tw-text-blue-600 hover:tw-scale-105 tw-transition-all"
          >
            SHARE ON FB
          </a>
        </div>
      </div>

      {/* Structured Data for Article */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: blog.title,
          image: blog.imageURL,
          author: {
            "@type": "Person",
            name: blog.author,
          },
          datePublished: new Date().toISOString(),
          url: `https://www.careernaksha.com/blogs/${blog.url}`,
          description: summary,
        })}
      </script>
    </article>
  );
};

export default BlogPageCard;