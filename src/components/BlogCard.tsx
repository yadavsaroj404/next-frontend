import React from "react";
import Image from "next/image"; // For optimized images
import Link from "next/link"; // For client-side navigation
import { BlogCard as Blog } from "@/interfaces/Blog";

export default function BlogCard({ blog }: { blog: Blog }) {
  const { blogUrl, title, imgUrl, author, date, summary } = blog;
  const fullBlogLink = `/blogs/${blogUrl}`;

  return (
    <Link
      href={fullBlogLink}
      className="block group overflow-hidden hover:border cursor-pointer bg-white rounded-2xl hover:scale-[1.01] hover:shadow-xl transition-all"
      itemProp="url"
    >
      <article
        className="w-full"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {/* Image Container */}
        <div className="w-full h-52 relative overflow-hidden">
          <Image
            src={imgUrl}
            alt={title} // Alt text should describe the image, often can be the title
            // fill
            width={600}
            height={200}
            // sizes="(max-width: 768px) 18rem, (max-width: 1024px) 22rem, 22rem"
            itemProp="image"
          />
        </div>

        {/* Content Area */}
        <div className="p-4 flex flex-col gap-4 w-full items-center">
          <div className="w-full h-[1px] bg-smallheading rounded-full"></div>

          <div className="flex justify-between w-full items-center">
            {/* Author Info */}
            <div
              className="text-blueprimary font-semibold transition-all line-clamp-1 text-ellipsis text-sm px-3 py-1 bg-bgcolors rounded-full"
              itemProp="author" // Schema.org property for the author
              itemScope
              itemType="https://schema.org/Person" // Author is a Person
            >
              <span itemProp="name">{author}</span> {/* Author's name */}
            </div>
            {/* {publishedDate && (
                <meta itemProp="datePublished" content={publishedDate} />
              )} */}
          </div>
          <h2
            className="w-full line-clamp-2 text-ellipsis font-bold h-12"
            itemProp="headline"
          >
            {title}
          </h2>

          {/* Optional Description (useful for Schema.org) */}
          {summary && (
            <p className="w-full text-sm line-clamp-3" itemProp="description">
              {summary}
            </p>
          )}

          {/* Read More Link (visually part of the card, but the whole card is clickable) */}
          <div className="text-smallheading font-semibold w-full group-hover:text-black hover:!text-blueprimary transition-all">
            Read more...
          </div>
        </div>
      </article>
    </Link>
  );
}
