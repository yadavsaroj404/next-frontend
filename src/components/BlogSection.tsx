import { BlogCard as Blog } from "@/interfaces/Blog";
import BlogCard from "./BlogCard";
import Carousel from "./Crousel";

export default async function BlogSection({ blogs }: { blogs: Blog[] }) {
  return (
    <Carousel
      cardsToShow={1}
      responsive={{ sm: 1, md: 2, lg: 3, xl: 3 }}
      gap={24}
      autoplayInterval={2000}
      loop
      autoplay
      showNavigation={false}
      showControlsOnHover
      className="w-9/12 mx-auto my-8"
    >
      {blogs.map((blog) => (
        <BlogCard key={blog.date} blog={blog} />
      ))}
    </Carousel>
  );
}
