"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Counsellor } from "@/interfaces/Counsellor";
import StarIcon from "./Icons/Star";
import { FaLocationDot } from "react-icons/fa6";

const LocationIcon: React.FC<{ className?: string }> = ({
  className = "fill-blue-600",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-5 h-5 inline ${className}`}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a8.75 8.75 0 00.215-.104 1.625 1.625 0 00.199-.071 1.452 1.452 0 00.104-.074l.015-.008a8.877 8.877 0 001.76-1.39A6.75 6.75 0 0018 15.75a6.75 6.75 0 00-6.75-6.75H6.75a6.75 6.75 0 00-6.75 6.75c0 2.614 1.16 4.965 3 6.575h-.008zM12 15.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
      clipRule="evenodd"
    />
  </svg>
);

// Generic icon for the service features (chat, clock, book, calendar)
const FeatureIcon: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => (
  <Image
    src={src}
    alt={alt}
    width={20}
    height={20}
    className={`h-5 w-5 stroke-2 inline ${className}`}
    aria-hidden="true" // Decorative icon
  />
);

const ArrowIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <Image
    src="/assets/images/psychometrics/arrow2.svg" // Adjust path if needed
    alt="View profile arrow"
    width={36} // Approx h-9, so 36px
    height={36}
    className={`py-1 h-9 ${className}`}
    aria-hidden="true"
  />
);

// --- CounsellorCard Component ---
export default function CounsellorCard({
  counsellor,
  className = "",
}: {
  counsellor: Counsellor;
  className?: string;
}) {
  const profileLink = `/counsellors/${counsellor.slug}`;

  // Placeholder for social media icons. In a real app, these would be actual SVGs or optimized images.
  const socialIcons = [
    {
      src: "/assets/images/instagram.svg", // Adjust path
      alt: "Instagram",
      href: counsellor.instagramUrl || "https://www.instagram.com/careernaksha",
      itemProp: "sameAs",
    },
    {
      src: "/assets/images/facebook.svg", // Adjust path
      alt: "Facebook",
      href: counsellor.facebookUrl || "https://www.facebook.com/careernaksha",
      itemProp: "sameAs",
    },
    {
      src: "/assets/images/linkedin.svg", // Adjust path
      alt: "LinkedIn",
      href:
        counsellor.linkedinUrl ||
        "https://www.linkedin.com/company/careernaksha",
      itemProp: "sameAs",
    },
  ];

  return (
    <article
      className={`flex flex-col md:flex-row text-center md:text-left rounded-3xl bg-blue-600 w-[90%] max-w-[20rem] md:max-w-max md:w-full mx-auto ${className}`}
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* White section - Counsellor Profile Summary */}
      <div className="flex flex-col items-center md:flex-row relative w-full md:max-w-[30rem] lg:max-w-[45rem] border-2 border-gray-200 hover:border-yellow-500 rounded-3xl bg-white pt-2 px-1 duration-200">
        <div className="mx-5 my-auto flex flex-col items-center justify-center">
          <Link
            href={profileLink}
            aria-label={`View profile of ${counsellor.name}`}
          >
            <Image
              className="h-20 w-20 rounded-full border object-cover"
              src={counsellor.avatar}
              alt={`Profile picture of ${counsellor.name}`}
              width={80} // h-20 w-20 corresponds to 80px
              height={80}
              itemProp="image" // Schema.org property for person's image
            />
          </Link>

          <div
            className="flex mt-4"
            itemProp="aggregateRating" // Schema.org for rating
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <meta
              itemProp="ratingValue"
              content={counsellor.rating.toString()}
            />
            <meta
              itemProp="reviewCount"
              content={counsellor.reviewsCount.toString()}
            />
            <meta itemProp="bestRating" content="5" />
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <StarIcon
                key={starIndex}
                fill={starIndex < counsellor.rating ? "currentColor" : "#aaa"}
              />
            ))}
          </div>
          <div
            className="text-xs font-bold w-28 text-center"
            itemProp="description"
          >
            {counsellor.reviewsCount} Reviews
          </div>
          <Link href={profileLink} className="text-sm" itemProp="url">
            View Profile
          </Link>
        </div>

        <div className="md:w-[30rem] h-fit">
          <div className="flex justify-center md:justify-normal items-center gap-x-2">
            <Link href={profileLink}>
              <h1
                className="text-lg font-bold cursor-pointer text-black mb-0 hover:underline"
                itemProp="name"
              >
                {counsellor.name}
              </h1>
            </Link>
            {/* Social icons */}
            <div className="flex items-center gap-x-2">
              {socialIcons.map((icon, index) => (
                <a
                  key={index}
                  aria-label={icon.alt}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer" // Security best practice for target="_blank"
                  itemProp={icon.itemProp} // Schema.org property for social links
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={20} // h-5 w-5
                    height={20}
                    className="h-5 w-5 brightness-0 hover:brightness-100 transition-all" // Assuming SVGs are black and turn white
                  />
                </a>
              ))}
            </div>
          </div>
          <h2
            className="text-xs font-semibold text-center md:text-left overflow-hidden whitespace-nowrap text-ellipsis"
            itemProp="alumniOf" // Or itemProp="jobTitle" if it's their current role
          >
            {counsellor.degrees.join(" | ")}
          </h2>
          <p
            className="m-0 mr-1  text-sm w-full text-center md:text-left max-h-20 overflow-hidden"
            itemProp="description"
          >
            {counsellor.about}
          </p>
          <h3
            className="my-2 text-sm font-bold text-center md:text-left"
            itemProp="address" // Schema.org for address
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <FaLocationDot className="inline align-middle fill-blueprimary mr-1" />
            <span itemProp="addressLocality" className="align-middle">
              {counsellor.city}
            </span>
          </h3>
          <div>
            {/* Tags - consider using a list for semantic grouping if many */}
            <button className="px-4 py-1 mr-2 my-1 md:my-0 capitalize rounded-full bg-blue-600 text-white font-semibold text-xs border border-blue-600 hover:bg-white hover:text-blue-600 cursor-pointer transition-all">
              students
            </button>
            <button className="px-4 py-1 mr-2 my-1 md:my-0 capitalize rounded-full bg-blue-600 text-white font-semibold text-xs border border-blue-600 hover:bg-white hover:text-blue-600 cursor-pointer transition-all">
              professional
            </button>
            <button className="px-4 py-1 my-1 md:my-0 capitalize rounded-full bg-blue-600 text-white font-semibold text-xs border border-blue-600 hover:bg-white hover:text-blue-600 cursor-pointer transition-all">
              Abroad Studies
            </button>
          </div>
          <div className="text-xs mt-2">
            <span className="block md:inline" itemProp="experienceIn">
              {/* Custom or more specific Schema.org */}
              Experience: {counsellor.experience || 0} years
            </span>
            <span className="hidden md:inline">|</span>
            <span className="block md:inline" itemProp="hasOfferCatalog">
              {" "}
              {/* Can be used for services */}
              Counselling: {counsellor.totalSessions} Sessions
            </span>
          </div>
          <p className="text-xs">
            Available:
            <span
              className="text-blue-600 font-semibold"
              itemProp="availableService"
            >
              7 days a week
            </span>
          </p>
        </div>
      </div>

      {/* Details - blue section */}
      <div
        className="text-white text-xs relative w-full px-8 my-7 flex flex-col gap-y-2
          before:block before:border before:border-blue-600 before:bg-yellow-400 before:rounded-full
          before:absolute before:-top-8 before:left-1/2 before:-translate-x-1/2 before:w-4/5 before:h-3
          md:before:top-5 md:before:left-0 md:before:h-4/5 md:before:w-4"
      >
        <div>
          <FeatureIcon
            src="/assets/images/icons/chat-dots.svg"
            alt="Chat icon"
          />
          <span className="text-white ml-1">
            Two Detailed Counselling Session
          </span>
        </div>
        <div>
          <FeatureIcon src="/assets/images/icons/clock.svg" alt="Clock icon" />
          <span className="text-white ml-1">1 Hour Counselling Sessions</span>
        </div>
        <div>
          <FeatureIcon src="/assets/images/icons/book.svg" alt="Book icon" />
          <span className="text-white ml-1">
            22+ Pages Detailed Career Report
          </span>
        </div>
        <div>
          <FeatureIcon
            src="/assets/images/icons/calendar.svg"
            alt="Calendar icon"
          />
          <span className="text-white ml-1">
            1 year Post Counselling Support
          </span>
        </div>
        <button className="w-fit rounded-full flex z-10 mt-4 outline-offset-0 focus:outline hover:outline hover:outline-white hover:outline-offset-2 duration-100">
          <Link
            href={profileLink}
            className="py-0 pl-6 pr-2 rounded-full bg-white text-xs lg:text-md flex items-center gap-8 cursor-pointer border border-white group transition-all"
            rel="nofollow" // If this link is not meant to pass SEO juice
            aria-label={`View full profile for ${counsellor.name}`}
          >
            <span className="font-bold text-blue-600 transition-all">
              View profile
            </span>
            <ArrowIcon />
          </Link>
        </button>
      </div>
    </article>
  );
}
