import HomeComponent from "@/components/pages/Home";
import {
  heroAnimationIcons,
  ImpactNumbers,
  userCategories,
  whyChooseUsCards,
} from "@/data/utils";
import { BlogCard } from "@/interfaces/Blog";
import { Counsellor } from "@/interfaces/Counsellor";
import { Testimonial } from "@/interfaces/utils";
import { Fragment } from "react";

async function fetchTestimonials(): Promise<Testimonial[]> {
  const url = "https://dashboard.careernaksha.com/testimonials";
  try {
    const response = await fetch(url);
    const data = await response.json();

    const testimonials = data.map((testimonial: any) => ({
      image: testimonial.Image,
      link: testimonial.link || "#",
      altText: testimonial.altText || "Testimonial image",
      ...testimonial,
    }));

    // add dummy rating, ideally this should be fetched from the API
    testimonials.forEach((testimonial: Testimonial) => {
      testimonial.tm_rating = testimonial.tm_rating || 5; // Default to 5 stars if not provided
    });
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

async function fetchCareerGurus(): Promise<any[]> {
  const url = `${process.env.BACKEND_URL}/com/searchCounsellors?&city=vadodara&page=1&perPage=5`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    // add random reviews count and rating
    data.forEach((guru: Counsellor) => {
      guru.reviewsCount = Math.floor((guru.name.length / 3) * 10); // Random reviews count
      guru.rating = 5;
    });
    return data;
  } catch (error) {
    console.error("Error fetching career gurus:", error);
    return [];
  }
}

async function fetchBlogs(): Promise<BlogCard[]> {
  const url =
    "https://dashboard.careernaksha.com/articles?_sort=_id:DESC&_limit=5";
  try {
    const response = await fetch(url);
    const data = await response.json();

    const blogs: BlogCard[] = data.map((blog: any) => {
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

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function Home() {
  const [testimonials, careerGurus, blogs] = await Promise.all([
    fetchTestimonials(),
    fetchCareerGurus(),
    fetchBlogs(),
  ]);

  return (
    <Fragment>
      <HomeComponent
        userCategories={userCategories}
        impactNumbers={ImpactNumbers}
        testimonials={testimonials}
        careerGurus={careerGurus}
        blogs={blogs}
        heroAnimationIcons={heroAnimationIcons}
        whyChooseUsCards={whyChooseUsCards}
      />
    </Fragment>
  );
}
