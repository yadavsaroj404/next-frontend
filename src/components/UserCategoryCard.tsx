"use client";

import { useAppDispatch } from "@/hooks/useRedux";
import { UserCategory } from "@/interfaces/utils";
import { showGetStartedAs } from "@/store/layoutSlice";
import Image from "next/image";

export default function UserCategoryCard({
  card,
  className,
}: {
  card: UserCategory;
  className?: string;
}) {
  const dispatch = useAppDispatch();
  const { image, title, title2, text } = card;

  const handleShowGetStartedAs = () => {
    dispatch(showGetStartedAs());
  };

  return (
    <article
      className={`relative w-full h-full bg-white px-4 py-6 sm:py-8 lg:py-16 rounded-lg border border-gray-200 shadow-lg flex flex-col items-center text-center group overflow-hidden transition-all duration-300 hover:bg-bgcolors hover:shadow-xl lg:hover:py-4 ${className}`}
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Image Section */}
      <div className="w-full flex justify-center mb-4 lg:mb-0">
        <Image
          src={image}
          alt={`Illustration for ${title} ${title2} category`} // More descriptive alt text
          width={152}
          height={152}
          className="w-24 h-auto lg:w-48 transition-all duration-300 group-hover:lg:w-32" // Responsive image size
          itemProp="image"
        />
      </div>

      {/* Titles Section */}
      <div className="mb-4 lg:mb-0 transition-all duration-300 group-hover:lg:mb-4">
        <h2 className="font-semibold text-base lg:text-lg" itemProp="name">
          {title}
        </h2>
        <h3 className="font-bold text-sm lg:text-base">{title2}</h3>
      </div>

      {/* Text Description and Button (Expands on Hover for Large Screens) */}
      <div
        className="text-xs sm:text-sm text-center border-t-2 border-blueprimary pt-2 mt-2 overflow-hidden transition-all duration-300 max-h-full opacity-100 lg:max-h-0 lg:opacity-0 group-hover:lg:max-h-96 group-hover:lg:opacity-100"
        itemProp="description"
      >
        {text}

        {/* Button - repositioned for clarity and responsiveness */}
        <div className="w-full flex justify-center py-4 lg:py-0 lg:absolute lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2">
          <button
            onClick={handleShowGetStartedAs}
            className="px-4 py-2 text-sm font-semibold gradient-button rounded-full shadow-sm w-fit" // Simplified button classes
            aria-label={`Get Started as ${title} ${title2}`} // More specific accessibility label
          >
            Get Started As
          </button>
        </div>
      </div>
    </article>
  );
}
