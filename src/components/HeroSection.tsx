"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import RequestCallback from "./RequestCallback";
import React from "react";
import Typewriter from "./Typewriter";

interface HeroSectionProps {
  sentences: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ sentences }) => {
  const router = useRouter();

  const goToUrl = (url: string) => {
    router.push(url);
  };

  return (
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
          <div
            onClick={() => goToUrl("/aicounsellor")}
            className="flex flex-col items-center gap-8 scale-[0.70] lg:scale-100 relative lg:top-0 lg:hidden -top-[6rem] cursor-pointer"
          >
            <div className="lg:w-[25rem] lg:h-[25rem] w-[20rem] h-[20rem] relative flex justify-center items-center mt-[2.5rem] scale-[0.85]">
              <div className="absolute w-full h-full">
                <Image
                  src="/assets/images/homepage/heroanimation/circle.svg"
                  alt="Circle"
                  className="w-full h-full"
                  fill
                />
              </div>
              <div
                id="heroIconsParentMobile"
                className="absolute w-full h-full transition-all duration-[1s]"
              >
                {/* Map your seven icons */}
                {[
                  { src: "student", pos: ["calc(100%-2.5rem)", "50%"] },
                  { src: "college", pos: ["78%", "11%"] },
                  { src: "counsellor", pos: ["35%", "1%"] },
                  { src: "pro", pos: ["2%", "28%"] },
                  { src: "school", pos: ["5%", "71%"] },
                  { src: "uni", pos: ["38%", "99%"] },
                  { src: "institute", pos: ["82%", "86%"] },
                ].map((icon, i) => (
                  <span
                    key={i}
                    className="absolute h-24 aspect-square bg-white rounded-3xl transition-all duration-[1s]"
                    style={{
                      top: `calc(${icon.pos[0]} - 2.5rem)`,
                      left: `calc(${icon.pos[1]} - 2.5rem)`,
                    }}
                  >
                    <Image
                      src={`/assets/images/homepage/heroanimation/${icon.src}.svg`}
                      alt={icon.src}
                      title={icon.src}
                      width={96}
                      height={96}
                      className="relative top-1 left-[0.5rem]"
                    />
                  </span>
                ))}
              </div>

              {/* Rotating texts */}
              <div className="w-full h-full absolute overflow-hidden">
                {[
                  { text1: "Career AI", text2: "Find suitable options" },
                  { text1: "Counselling AI", text2: "Get 1 to 1 sessions" },
                  { text1: "Counsellor AI", text2: "Choose the best experts" },
                  { text1: "College AI", text2: "Shortlist your choices" },
                  { text1: "Course AI", text2: "Best fit skilling options" },
                  { text1: "CSR AI", text2: "Social impact at scale" },
                  { text1: "Coaching AI", text2: "Mentorship for all" },
                ].map((block, j) => (
                  <div
                    key={j}
                    className={`absolute top-[41%] transition-all duration-1000 rotatingTextsM ${
                      j === 0
                        ? "opacity-100 left-[29%]"
                        : j === 1
                        ? "opacity-0 translate-x-[10%] left-[26.75%]"
                        : "opacity-0 left-[25%]"
                    }`}
                  >
                    <div className="font-bold text-2xl text-center">
                      {block.text1}
                    </div>
                    <div className="mt-0.5 text-center">{block.text2}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile typewriter */}
            <div className="text-smallheading font-bold text-center h-12 lg:hidden -top-[8rem] relative text-[0.7rem]">
              <Typewriter sentences={sentences} />
            </div>
          </div>

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
        <div
          onClick={() => goToUrl("/aicounsellor")}
          className="hidden lg:flex flex-col items-center gap-8 scale-[0.70] lg:scale-100 relative -top-[2rem] pt-8 cursor-pointer"
        >
          <div className="lg:w-[25rem] lg:h-[25rem] w-[20rem] h-[20rem] relative flex justify-center items-center mt-[2.5rem] scale-[0.85]">
            <div className="absolute w-full h-full">
              <Image
                src="/assets/images/homepage/heroanimation/circle.svg"
                alt="Circle"
                fill
              />
            </div>
            <div
              id="heroIconsParent"
              className="absolute w-full h-full transition-all duration-[1s]"
            >
              {[
                { src: "student", pos: ["calc(100%-2.5rem)", "50%"] },
                { src: "college", pos: ["78%", "11%"] },
                { src: "counsellor", pos: ["35%", "1%"] },
                { src: "pro", pos: ["2%", "28%"] },
                { src: "school", pos: ["5%", "71%"] },
                { src: "uni", pos: ["38%", "99%"] },
                { src: "institute", pos: ["82%", "86%"] },
              ].map((icon, i) => (
                <span
                  key={i}
                  className="absolute h-24 aspect-square bg-white rounded-3xl transition-all duration-[1s]"
                  style={{
                    top: `calc(${icon.pos[0]} - 2.5rem)`,
                    left: `calc(${icon.pos[1]} - 2.5rem)`,
                  }}
                >
                  <Image
                    src={`/assets/images/homepage/heroanimation/${icon.src}.svg`}
                    alt={icon.src}
                    width={96}
                    height={96}
                    className="relative top-1 left-[0.5rem]"
                  />
                </span>
              ))}
            </div>

            <div className="w-full h-full absolute overflow-hidden">
              {[
                { text1: "Career AI", text2: "Find suitable options" },
                { text1: "Counselling AI", text2: "Get 1 to 1 sessions" },
                { text1: "Counsellor AI", text2: "Choose the best experts" },
                { text1: "College AI", text2: "Shortlist your choices" },
                { text1: "Course AI", text2: "Best fit skilling options" },
                { text1: "CSR AI", text2: "Social impact at scale" },
                { text1: "Coaching AI", text2: "Mentorship for all" },
              ].map((block, j) => (
                <div
                  key={j}
                  className={`absolute top-[41%] transition-all duration-1000 rotatingTexts ${
                    j === 0
                      ? "opacity-100 left-[32%]"
                      : j === 1
                      ? "opacity-0 translate-x-[10%] left-[30%]"
                      : "opacity-0 left-[29%]"
                  }`}
                >
                  <div className="font-bold text-2xl text-center">
                    {block.text1}
                  </div>
                  <div className="mt-0.5 text-center">{block.text2}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom rotating labels */}
          <div className="w-full flex justify-center relative scale-[1.2] lg:scale-100">
            {[
              "School Student",
              "UG/PG Student",
              "Professional",
              "Counsellor",
              "School",
              "University",
              "Corporate",
            ].map((label, idx) => (
              <div
                key={idx}
                className={`px-5 py-3 bg-bgcolors rounded-lg w-fit font-semibold absolute rotatingTexts2 ${
                  idx === 0 && "z-10"
                } ${idx === 6 && "z-1"}`}
              >
                <span
                  className={`transition-all duration-300 ${
                    idx !== 0 ? "opacity-0" : ""
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
