import { Fragment } from "react";
import { fetchBlogCards } from "@/helpers/blog";
import { Testimonial } from "@/interfaces/utils";
import HomeComponent from "@/components/pages/Home";
import { Counsellor } from "@/interfaces/Counsellor";
import {
  heroAnimationIcons,
  ImpactNumbers,
  userCategories,
  whyChooseUsCards,
} from "@/data/utils";
import { homepageFAQs } from "@/data/faq";

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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/com/searchCounsellors?&city=vadodara&page=1&perPage=5`;
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

export default async function Home() {
  const [testimonials, careerGurus, blogs] = await Promise.all([
    fetchTestimonials(),
    fetchCareerGurus(),
    fetchBlogCards(),
  ]);

  return (
    <Fragment>
      <HomeComponent
        userCategories={userCategories}
        impactNumbers={ImpactNumbers}
        testimonials={testimonials}
        careerGurus={careerGurus}
        blogs={blogs}
        FAQs={homepageFAQs}
        heroAnimationIcons={heroAnimationIcons}
        whyChooseUsCards={whyChooseUsCards}
      />
    </Fragment>
  );
}
