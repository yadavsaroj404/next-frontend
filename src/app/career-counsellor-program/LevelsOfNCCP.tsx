"use client";

import Image from "next/image";
import { useState } from "react";

const levelData = [
  {
    title: "Level 1: Join Our Community",
    subtitle: "NATIONAL CAREER COUNSELLING OUTREACH PROGRAM",
    price: "₹10,000",
    details: [
      "Access to the national community of counsellors",
      "Life-time Membership FREE",
      "Access to the Counsellor Council of India (CCI) programs",
      "Free two days workshop - live online with introduction to career counselling",
      "Learn how to build a career in career counselling and vocational guidance with NEP 2020",
      "Get priority access to online platform for ready-to-use psychometrics, career analytics, certifications, training and other hands-on activities/programs like marketing, center development, enablement sessions etc.",
    ],
  },
  {
    title: "Level 2: Get Verified or Certified",
    subtitle: "CAREER COUNSELLING CERTIFICATION AND TRAINING PROGRAM",
    price: "₹20,000",
    details: [
      "All benefits of level 1 program plus below details",
      "Two-week live sessions - 8+ modules for comprehensive live online instructor led training",
      "Theoretical plus practical knowledge with real-world insights into career counselling",
      "Counsellors Council of India membership, certification, training with Govt. affiliation to make your resume strong through a certification from Govt. National Career Guidance institutes",
      "Get help in self-practice and growing your leadership skills that will enable to adapt and thrive in today's increasingly complex, rapidly changing new age careers - yearly support access via community",
      "National & International support for career counselling",
      "Access to your own dashboard with world-class psychometrics & technology",
    ],
  },
  {
    title: "Level 3: Become Champion",
    subtitle:
      "COUNSELLORS ENTREPRENEURSHIP ENABLEMENT AND CENTRE SET UP PROGRAM",
    price: "₹1,00,000",
    details: [
      "All benefits of level 1 and 2 plus below details",
      "Sales and marketing training for expanding the individual practice at scale",
      "Lead generation at the local level for both offline-online career counselling mode",
      "360 degree branding and career counselling center setup at your location/city",
      "Case studies and individual hand holding on case by case basis with live sessions",
      "Extended training & support to also include admissions India or Abroad, courses, certifications etc.",
      "Dedicated CareerNaksha center for business expansion Nationally or Internationally",
      "Access to national & international projects as well for business growth",
    ],
  },
  {
    title: "Free Workshop",
    subtitle:
      "2 hours workshops on Professional Development and Lifelong Learning",
    price: "Free",
    details: [],
  },
];

export default function LevelsOfNCCP() {
  const [certLevel, setCertLevel] = useState(0);

  const currentLevel = levelData[certLevel] || levelData[0];
  return (
    <section className="w-full" aria-labelledby="levels-heading">
      <h2
        id="levels-heading"
        className="w-screen text-center font-bold text-base lg:text-2xl mt-20"
      >
        Levels of NCCP
      </h2>
      <h2 className="w-screen text-center font-bold text-blue-600 lg:text-[2.5rem] text-xl px-6 mt-5">
        Choose A Level that's Best For You
      </h2>
      <p className="w-screen text-center px-6 lg:text-base text-sm font-semibold mt-5">
        Instant Activation and Upgrade Anytime
      </p>

      {/* Level Tabs */}
      <div className="w-screen flex justify-center px-6 mt-12">
        <div className="max-w-5xl rounded-full flex border border-blue-600 p-2 lg:gap-20 select-none text-xs lg:text-base text-center">
          <button
            onClick={setCertLevel.bind(null, 0)}
            className={`lg:px-6 px-3 py-2 font-bold rounded-full cursor-pointer transition-all duration-300
                ${
                  certLevel === 0
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-black"
                }`}
          >
            Level 1
          </button>
          <button
            onClick={setCertLevel.bind(null, 1)}
            className={`lg:px-6 px-3 py-2 font-bold rounded-full cursor-pointer transition-all duration-300
                ${
                  certLevel === 1
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-black"
                }`}
          >
            Level 2
          </button>
          <button
            onClick={setCertLevel.bind(null, 2)}
            className={`lg:px-6 px-3 py-2 font-bold rounded-full cursor-pointer transition-all duration-300
                ${
                  certLevel === 2
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-black"
                }`}
          >
            Level 3
          </button>
          <button
            onClick={setCertLevel.bind(null, 3)}
            className={`lg:px-6 px-3 py-2 font-bold rounded-full cursor-pointer transition-all duration-300
                ${
                  certLevel === 3
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-black"
                }`}
          >
            Free Workshop
          </button>
        </div>
      </div>

      {/* Level Content */}
      <div className="w-screen flex justify-center mt-12 px-6">
        <div className="max-w-6xl w-full rounded-lg border border-blue-600">
          <div className="w-full text-center lg:text-2xl text-lg font-bold py-4 bg-blue-600 text-white">
            {currentLevel.title}
          </div>
          <div className="w-full text-center text-blue-600 font-semibold mt-4 text-xs lg:text-base">
            {currentLevel.subtitle}
            {certLevel !== 4 && (
              <span className="text-black"> (Workshops & Membership)</span>
            )}
          </div>
          {certLevel !== 4 && (
            <div className="w-full text-center font-bold lg:text-3xl text-xl mt-2">
              {currentLevel.price}
              <span className="font-normal lg:text-base text-sm">+GST</span>
            </div>
          )}

          <div className="w-full lg:px-20 px-8 flex gap-1 flex-col mt-4">
            {certLevel === 3 ? (
              <>
                <div className="font-bold ml-4">Who Can Join?</div>
                <ul className="flex flex-col gap-1">
                  {[
                    "Free for all",
                    "Teachers",
                    "Educators",
                    "Counsellors",
                    "Psychologists",
                    "Career Coaches",
                    "Trainers new to career counselling",
                  ].map((item, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <span className="min-w-[1rem] w-[1rem] relative top-1">
                        <Image
                          src="/assets/images/nccp/bluecheck.png"
                          alt="A checkmark icon"
                          width={16}
                          height={16}
                        />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="flex gap-2 items-start ml-8">
                    Or those who have already been certified and need upgrading
                    on career counselling trends and scope.
                  </li>
                </ul>
                <div className="font-bold ml-4 text-green-600 mt-8">
                  Benefits
                </div>
                <ul className="flex flex-col gap-1">
                  {[
                    "Online careerNaksha psychometrics",
                    "Counselling skills",
                    "Mental health and wellbeing",
                    "Understanding child psychology",
                  ].map((item, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <span className="min-w-[1rem] w-[1rem] relative top-1">
                        <Image
                          src="/assets/images/nccp/bluecheck.png"
                          alt="A checkmark icon"
                          width={16}
                          height={16}
                        />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <div className="font-bold ml-4">Details</div>
                <ul className="flex flex-col gap-1">
                  {currentLevel.details.map((detail, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <span className="min-w-[1rem] w-[1rem] relative top-1">
                        <Image
                          src="/assets/images/nccp/bluecheck.png"
                          alt="A checkmark icon"
                          width={16}
                          height={16}
                        />
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="w-full px-12 flex lg:justify-end justify-center">
            <a
              href="/register?m=counsellor"
              className="px-16 py-2.5 bg-blue-600 hover:scale-[1.03] rounded-lg text-white text-sm font-bold my-6 transition-all"
            >
              Continue
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
