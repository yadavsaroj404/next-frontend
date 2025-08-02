"use server";

import Blog, { BlogCard } from "@/interfaces/Blog";

export async function fetchBlogs(): Promise<Blog[]> {
  const url =
    "https://dashboard.careernaksha.com/articles?_sort=_id:DESC&_limit=5";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function fetchBlogCards(): Promise<BlogCard[]> {
  try {
    const blogs = await fetchBlogs();

    const blogCards: BlogCard[] = blogs.map((blog: Blog) => {
      const formattedBlog: BlogCard = {
        _id: blog._id,
        imgUrl: blog.imageURL,
        author: blog.author,
        date: new Date(blog.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        title: blog.title,
        blogUrl: blog.url,
        summary: blog.summary,
      };
      return formattedBlog;
    });

    return blogCards;
  } catch (error) {
    return [];
  }
}
