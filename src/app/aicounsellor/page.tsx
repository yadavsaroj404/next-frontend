import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "V-Coach: Your Personal AI Career Advisor | Get Career Guidance Instantly",
  description:
    "Meet V-Coach, your AI-powered virtual career advisor. Get instant answers to career queries, college options, exam preparations, and counseling techniques. Designed for students, professionals, teachers & counselors.",
  keywords: [
    "AI career advisor",
    "online career guidance",
    "virtual career counseling",
    "V-Coach",
    "career chatbot",
    "psychometric test support",
    "college selection AI",
    "exam preparation help",
    "career queries",
    "online counselor",
    "AI for career",
    "career assistance",
    "student career help",
    "professional career guidance",
  ],
  openGraph: {
    title:
      "V-Coach: Your Personal AI Career Advisor | Get Career Guidance Instantly",
    description:
      "V-Coach offers immediate, personalized career advice. Explore college options, exam prep, and professional development with your virtual career assistant.",
    url: "https://www.careernaksha.com/aicounsellor",
    siteName: "CareerNaksha",
    images: [
      {
        url: "https://www.careernaksha.com/images/vcoach-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "V-Coach AI Career Advisor Chatbot",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "V-Coach: Your Personal AI Career Advisor | Get Career Guidance Instantly",
    description:
      "Unlock your career potential with V-Coach, the AI career advisor. Instant answers on college, exams, and career paths. #AICareer #CareerGuidance",
    creator: "@yourtwitterhandle",
    images: ["https://www.careernaksha.com/images/vcoach-social-share.jpg"],
  },
  alternates: {
    canonical: "https://www.careernaksha.com/aicounsellor",
  },
};

export default function AICounsellor() {
  const isLoggedIn = true || localStorage.getItem("user_id");
  const redirectionURL = isLoggedIn
    ? "/aicounsellor/dash"
    : "/login?redirect_url=/aicounsellor/dash";

  return (
    <section id="ai-counsellor-chatbot" className="w-10/12 lg:w-4/5 mx-auto">
      {/* Background Image (optimized with next/image, priority for LCP) */}
      <div className="lg:block w-full absolute -top-10 right-10 justify-center hidden pointer-events-none -z-10">
        <Image
          src="/assets/images/careerai/bg_landingpage.svg"
          alt="Abstract geometric background for AI counsellor section"
          width={1920}
          height={1080}
          priority
          sizes="(max-width: 1024px) 0vw, 100vw"
          aria-hidden="true"
        />
      </div>
      <div className="grid grid-cols-[1fr 1fr] justify-between max-w-7xl items-center flex-row mt-8 lg:mt-0 h-fit">
        {/* Left Content Area */}
        <div className="flex row-start-1 row-end-1 col-span-1 lg:gap-4 flex-col text-left">
          <h1 className="font-bold text-2xl lg:w-full lg:text-5xl">
            Hi! I am your personal career advisor
          </h1>
          <h2 className="text-blue-600 text-2xl font-extrabold lg:w-full">
            V-Coach
          </h2>
          <p className="font-bold lg:text-xl text-xs mt-2 lg:w-full text-gray-700">
            (Virtual Career Options Assistance & Counselling Help)
          </p>
          <div className="w-full flex z-10 my-4 lg:my-0">
            <Link
              href={redirectionURL}
              className="py-1.5 pl-6 pr-2 rounded-full bg-[#204AF5] text-base lg:text-lg flex items-center gap-8 cursor-pointer border border-[#204AF5] hover:bg-white group transition-all"
              prefetch={false} // Prevent prefetching if user isn't logged in (login page)
              aria-label={
                isLoggedIn
                  ? "Go to AI Counsellor Dashboard"
                  : "Log in or sign up to get started with V-Coach"
              }
            >
              <span className="font-bold text-white group-hover:text-[#204AF5] transition-all">
                Get Started
              </span>
              <Image
                src="/assets/images/psychometrics/arrow2.svg"
                alt="Right arrow icon"
                width={24}
                height={24}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Right Image Area (optimized with next/image) */}
        <div className="col-start-2 col-span-1 row-span-1 lg:row-span-3">
          <Image
            src="/assets/images/careerai/vcoach.svg"
            alt="V-Coach AI chatbot avatar, a friendly robot assistant"
            width={500} // Set appropriate width based on your design's largest common display
            height={500} // Set appropriate height
            sizes="(max-width: 768px) 60vw, (max-width: 1024px) 50vw, 400px" // More specific sizes for performance
            className="w-full object-contain" // Use object-contain to ensure image fits without cropping
          />
        </div>
        {/* User can ask section */}
        <div className="mt-4 z-10 row-span-1 col-span-2 lg:col-span-1">
          <p className="lg:text-xl font-bold">You can ask:</p>
          <div className="flex flex-wrap lg:justify-start gap-3 mt-3">
            {[
              "About any career query",
              "About any college options",
              "Counsellor support",
              "About any exam",
              "About any preparation",
              "Counselling techniques",
            ].map((query) => (
              <span
                key={query}
                className="w-full lg:w-auto bg-white border-black drop-shadow-md text-[#001F57] font-semibold px-4 py-2 rounded-full"
              >
                {query}
              </span>
            ))}
          </div>
        </div>

        {/* User can be section */}
        <div className="mt-6 z-10 row-span-1 col-span-2 lg:col-span-1">
          <p className="text-xl font-bold">You can be:</p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-3">
            {[
              "Student",
              "Professional",
              "Teacher",
              "Counsellor",
              "Trainer",
              "Field team",
            ].map((role) => (
              <span
                key={role} // Unique key for list items
                className="bg-white border-black drop-shadow-md text-[#001F57] font-semibold px-4 py-2 rounded-full"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
