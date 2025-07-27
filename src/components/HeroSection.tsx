"use client";
import Image from "next/image";
import RequestCallback from "./RequestCallback";
import React from "react";
import Typewriter from "./Typewriter";
import { HeroAnimationIcon } from "@/interfaces/utils";
import HeroRing from "./HeroRing";

interface HeroSectionProps {
  sentences: string[];
  heroAnimationIcons: HeroAnimationIcon[];
  className?: string;
}

export default function HeroSection({
  sentences,
  heroAnimationIcons,
  className,
}: HeroSectionProps) {
  return (
    <div
      className={`w-full max-w-7xl mx-auto place-items-center lg:place-items-start relative grid grid-rows-[min-content_min-content_min-content_min-content_1fr] lg:grid-cols-[40rem_min-content] justify-center lg:justify-between ${className}`}
    >
      {/* Background SVG */}
      <div className="w-full h-full absolute top-0 left-0">
        <Image
          src="/assets/images/homepage/heroSectionBg.svg"
          alt="Careernaksha Hero section"
          className="w-auto h-full"
          fill
          priority
        />
      </div>

      <div className="row-start-1 row-end-1">
        <div className="text-smallheading font-bold lg:text-2xl lg:text-left text-center">
          Bharat&apos;s Trusted & Affordable
        </div>
        <div className="text-2xl xl:text-5xl text-blueprimary opacity-90 font-bold leading-[2.5rem] xl:leading-[4rem] text-center lg:text-left">
          Online – Offline Career Counselling & Guidance Platform
        </div>
        <div className="font-bold lg:text-2xl text-center lg:text-left">
          Your Personal Career Counsellor
        </div>
      </div>

      <HeroRing
        className="mt-15 lg:mt-0 row-start-2 row-end-2 lg:row-start-1 lg:row-end-5"
        heroAnimationIcons={heroAnimationIcons}
      />
      <RequestCallback className="mt-5 row-start-4 row-end-4 lg:row-start-2 lg:row-end-3" />

      <div className="row-start-5 row-end-5 lg:row-start-3 lg:row-end-3 mt-2 mb-3 lg:mt-0 lg:mb-0 text-xs font-bold">
        Get a FREE test worth ₹3,499 & find your dream career INSTANTLY
      </div>

      <Typewriter
        className="row-start-3 row-end-3 lg:row-start-4 lg:row-end-5"
        sentences={sentences}
      />
    </div>
  );
}
