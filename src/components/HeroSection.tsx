"use client";
import Image from "next/image";
import RequestCallback from "./RequestCallback";
import React from "react";
import Typewriter from "./Typewriter";
import HeroRing from "./HeroRing";
import { HeroAnimationIcon } from "@/interfaces/utils";

interface HeroSectionProps {
  sentences: string[];
  heroAnimationIcons: HeroAnimationIcon[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  sentences,
  heroAnimationIcons,
}) => {
  return (
    <>
      <div className="w-full bg-no-repeat bg-[length:100vw_30rem] flex justify-center items-center lg:pt-0 pt-6 relative">
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

        <div className="flex lg:justify-between lg:px-12 flex-col lg:flex-row bg-center max-w-[1440px] w-full relative">
          {/* Text & Mobile Animation */}
          <div className="lg:py-20 pt-10 mt-10 lg:mt-1 xl:mt-0 px-6 lg:px-0 flex flex-col gap-6 w-full lg:w-1/2">
            {/* Headings */}
            <div className="flex flex-col gap-2">
              <div className="text-smallheading font-bold lg:text-2xl lg:text-left text-center">
                Bharat&apos;s Trusted & Affordable
              </div>
              <div className="text-2xl xl:text-5xl text-blueprimary font-bold leading-[2.5rem] xl:leading-[4rem] text-center lg:text-left">
                Online – Offline Career Counselling & Guidance Platform
              </div>
              <div className="font-bold lg:text-2xl text-center lg:text-left">
                Your Personal Career Counsellor
              </div>
            </div>

            {/* Mobile-only animated icons/text */}

            {/* Request callback + offer text */}
            <div className="relative -top-[10.35rem] lg:top-0 flex flex-col gap-4">
              <div className="w-full lg:w-[24rem] xl:w-[28rem] flex flex-col gap-4 px-4 lg:px-0 items-center">
                <RequestCallback />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <div className="text-[0.7rem] font-semibold pt-2 lg:pt-0 text-center lg:text-left">
                  Get a FREE test worth ₹3,499 &amp; find your dream career
                  INSTANTLY
                </div>
                <div className="hidden lg:block">
                  <Typewriter sentences={sentences} />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Animation */}
        </div>
        <HeroRing heroAnimationIcons={heroAnimationIcons} />
      </div>
    </>
  );
};

export default HeroSection;
