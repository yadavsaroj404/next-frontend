import Image from "next/image";
import StarIcon from "./Icons/Star";
import DoubleQuotesIcon from "./Icons/DoubleQuotes";
import Carousel from "./Crousel";
import { Testimonial } from "@/interfaces/utils";

interface ResponsiveConfig {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}
interface CarouselConfig {
  className?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
  cardsToShow?: number;
  responsive?: ResponsiveConfig;
  loop?: boolean;
  gap?: number;
  showControlsOnHover?: boolean;
  pauseOnHover?: boolean;
}
export default function Testimonials({
  testimonials,
  ...carouselConfig
}: {
  testimonials: Testimonial[];
} & CarouselConfig) {
  return (
    <Carousel {...carouselConfig}>
      {testimonials.map((testimonial) => (
        // Directly render the testimonial card, removed the wrapper div
        // The Carousel component's slide item handles its own sizing and flex-shrink
        <article
          key={testimonial._id}
          className="border border-smallheading rounded-2xl px-6 py-8 gap-2 flex flex-col h-full mb-10"
          itemScope
          itemType="https://schema.org/Review"
        >
          {/* Double Quotes Icon - ensure it's purely decorative for screen readers */}
          <DoubleQuotesIcon />

          {/* Testimonial detail - use itemProp="reviewBody" */}
          <div className="w-full text-sm line-clamp-4" itemProp="reviewBody">
            {testimonial.tm_detail}
          </div>

          <div className="flex w-full justify-between mt-2 h-max items-end flex-grow">
            <div
              className="flex gap-3 items-center"
              itemScope
              itemType="https://schema.org/Author" // Author of the review
            >
              <div className="avatar">
                <div className="w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.Image}
                    alt={`Profile picture of ${testimonial.tm_name}`} // More descriptive alt
                    width={48}
                    height={48}
                    itemProp="image"
                  />
                </div>
              </div>

              <div className="h-full flex flex-col justify-center">
                <span className="font-semibold text-sm" itemProp="name">
                  {testimonial.tm_name}
                </span>
                <span className="text-sm" itemProp="jobTitle">
                  {testimonial.tm_expertise}
                </span>
              </div>
            </div>
            <div
              className="flex gap-1 h-10 items-center"
              itemProp="reviewRating" // Rating of the review
              itemScope
              itemType="https://schema.org/Rating"
            >
              <meta
                itemProp="ratingValue"
                content={testimonial.tm_rating.toString()}
              />
              <meta itemProp="bestRating" content="5" />
              {Array.from({ length: 5 }).map((_, starIndex) =>
                // Only render the number of stars based on tm_rating
                starIndex < testimonial.tm_rating ? (
                  <StarIcon key={starIndex} />
                ) : (
                  <StarIcon key={starIndex} fill="#aaa" />
                )
              )}
            </div>
          </div>
          <meta itemProp="itemReviewed" content="CareerNaksha" />
        </article>
      ))}
    </Carousel>
  );
}
