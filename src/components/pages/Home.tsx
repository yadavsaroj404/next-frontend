"use client";
import { CounsellorInSearchResults } from "@/interfaces/Counsellor";
import {
  ImpactNumber,
  UserCategory,
  WhyChooseUsCard,
} from "@/interfaces/utils";
import React, { Fragment, useEffect, useState } from "react";
import UserCategoryCard from "../UserCategoryCard";
import ImpactNumberCard from "../ImpactNumberCard";
import Image from "next/image";
import Link from "next/link";
import { showGetStartedAs } from "@/store/layoutSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import RequestCallback from "../RequestCallback";
import FAQs from "../FAQs";
import HeroSection from "../HeroSection";

type Props = {
  userCategories: UserCategory[];
  impactNumbers: ImpactNumber[];
  testimonials: any[];
  careerGurus: CounsellorInSearchResults[];
  blogs: any[];
  whyChooseUsCards: WhyChooseUsCard[];
};
export default function HomeComponent({
  userCategories,
  impactNumbers,
  testimonials,
  careerGurus,
  blogs,
  whyChooseUsCards,
}: Props) {
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  interface Step {
    id: number;
    title: string;
    tagline: string;
    description: string;
    videoSrc: string;
  }

  const STEPS: Step[] = [
    {
      id: 1,
      title: "Know Yourself",
      tagline: "Take Advance Scientific AI Psychometric Test",
      description: `First step in shaping your career is to know about your strengths
      and weaknesses. Our 5‑Dimensional assessment will help you evaluate
      Personality, Interest, Abilities, Skills, Knowledge and Work Style/Context,
      to suggest career options. It is well researched test based on
      O*NET International Career Framework.`,
      videoSrc: "/assets/images/homepage/scrollgif1.webm",
    },
    {
      id: 2,
      title: "Extensive Research",
      tagline: "Get Access to Advance AI Tools for your Career Search",
      description: `Doing research and continuous exploration helps you to evaluate
      in‑depth career content & get insights from +20,000 career options.
      The access is via our free dashboard. We utilize large data sets from
      multiple sources to provide you updated information related to your
      career plans, list of colleges, exams & career paths.`,
      videoSrc: "/assets/images/homepage/scrollgif2.webm",
    },
    {
      id: 3,
      title: "Career Counselling",
      tagline: "Connect with your Personal Counsellor",
      description: `You can hand pick and choose your counsellor for expert guidance
      towards achieving your career goals in your location. CCI certified &
      trained career counsellor will provide you the best personalized
      counselling experience. Connect from the largest community of 4500+
      counsellors across the world.`,
      videoSrc: "/assets/images/homepage/scrollgif3.webm",
    },
    {
      id: 4,
      title: "Admission Counselling",
      tagline: "Choose Top Fit University in India & Abroad",
      description: `One of the most important outcomes for success is choosing the
      right fit university course, upskilling degree either online, offline or
      distance mode. We help you to get admits from the top universities in
      India or Abroad. Get step by step guide from experts in your application
      for more than 1000+ institutions.`,
      videoSrc: "/assets/images/homepage/scrollgif4.webm",
    },
    {
      id: 5,
      title: "Career Profile Boosters",
      tagline: "Pick Right Fit Internships, Projects & Career Activities",
      description: `To build strong career profile now you need to go beyond
      academics and boost your chances of career success. You can choose from
      the best internships, projects and career activities from our dashboard.
      These are some of the curated, customized & recommended options for your
      career goals and needs.`,
      videoSrc: "/assets/images/homepage/scrollgif5.webm",
    },
  ];
  const ASK_ITEMS = [
    "About any career query",
    "About any college options",
    "Counsellor support",
    "About any exam",
    "About any preparation",
    "Counselling techniques",
  ];

  const WHO_ITEMS = [
    "Student",
    "Professional",
    "Teacher",
    "Counsellor",
    "Trainer",
    "Field team",
  ];

  const TYPEWRITER_SENTENCES: string[] = [
    "Scientific & Data Driven Psychometrics",
    "Right Career Fitment",
    "Find Your Passion & Talent",
    "Get Top Admits",
    "Know Your Skill Gap",
  ];

  const handleShowGetStartedClick = () => {
    dispatch(showGetStartedAs());
  };

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Fragment>
      <HeroSection sentences={TYPEWRITER_SENTENCES} />
      {/* first section | user categories */}
      <div className="w-full flex justify-center items-center relative lg:mt-10 top-[-7.5rem] lg:top-0">
        <div className="lg:px-20 px-6 flex flex-col items-center w-full max-w-[1440px]">
          <div className="text-smallheading font-bold lg:text-2xl lg:text-left text-center">
            Empower your career journey | Know your strengths | Achieve your
            goals
          </div>

          <div className="lg:text-4xl text-[22px] bg-clip-text bg-[length:200%_200%] bg-gradientbluelightblue animate-[getStartedAsBtnBg_15s_ease-in-out_infinite] text-transparent font-bold lg:mt-12 mt-6 text-center">
            Loved by an enthusiastic community of over a million students,
            parents, professionals &amp; counsellors
          </div>

          <div className="w-full grid lg:grid-cols-4 lg:grid-rows-1 max-w-5xl grid-rows-2 grid-cols-2 lg:px-0 pt-2">
            {userCategories.map((cat) => (
              <UserCategoryCard
                key={cat._id}
                image={cat.image}
                title={cat.title}
                title2={cat.title2}
                text={cat.text}
              />
            ))}
          </div>
        </div>
      </div>

      {/* second section | impact numbers */}
      <div className="w-full flex justify-center items-center relative lg:mt-[5.5rem] mt-[-4.5rem]">
        <div className="w-full max-w-[1440px] flex flex-col gap-2 items-center lg:px-8 px-7">
          <div className="w-full flex flex-col gap-6 lg:gap-10 items-center">
            <div className="text-smallheading font-bold lg:text-2xl text-center">
              We help you to make informed career decisions via Psychometrics
            </div>
            <div className="lg:text-4xl text-[19px] bg-clip-text bg-[length:200%_200%] bg-gradientbluelightblue animate-[getStartedAsBtnBg_15s_ease-in-out_infinite] text-transparent font-bold text-center">
              Proud to have helped students across India &amp; Abroad
            </div>
          </div>

          <div className="grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-6 gap-2 grid-cols-2 grid-rows-3 grid-flow-col lg:grid-flow-row">
            {impactNumbers.map((num) => (
              <ImpactNumberCard
                key={num._id}
                countNumber={num.countNumber}
                icon={num.icon}
                title={num.title}
                suffix={num.suffix}
                type={num.type === "blue" ? "blue" : "white"}
                _id={num._id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* third section | why choose us */}
      <div className="w-full flex justify-center items-center relative lg:mt-[5.5rem] mt-12">
        <div className="max-w-5xl flex flex-col items-center">
          <div className="lg:text-4xl text-[22px] bg-clip-text bg-[length:200%_200%] bg-gradientbluelightblue animate-[getStartedAsBtnBg_15s_ease-in-out_infinite] text-transparent font-bold text-center px-8">
            Why You Should Choose CareerNaksha?
          </div>

          <div className="grid lg:grid-cols-3 gap-2 sm:grid-cols-2 grid-cols-1 grid-rows-2 lg:px-0 px-4 lg:mt-10 mt-4">
            {whyChooseUsCards.map((card) => (
              <div
                key={card.title}
                className="border border-smallheading rounded-lg lg:px-7 lg:py-10 p-3 text-center flex flex-col gap-2 hover:border-blueprimary hover:shadow-2xl hover:shadow-[#4281FD30] cursor-pointer bg-white hover:scale-[1.01] group transition-all justify-center"
              >
                <div className="w-full lg:text-2xl text-lg font-semibold group-hover:text-blueprimary transition-all">
                  {card.title}
                </div>
                <div className="lg:text-base text-xs">{card.description}</div>
              </div>
            ))}
          </div>

          <div className="md:w-3/5 w-4/5 flex justify-center items-center md:gap-12 rounded-full drop-shadow-lg bg-white md:h-12 h-10 mt-10">
            <Link
              href="https://maps.app.goo.gl/o3usXDLoab3ELegG7"
              target="_blank"
              rel="noopener noreferrer"
              className="scale-[0.8] lg:scale-100"
            >
              <Image
                src="/assets/images/homepage/Section1GR.svg"
                alt="Google Logo"
                title="Google Logo"
                width={150}
                height={50}
                className="h-full hover:cursor-pointer"
              />
            </Link>

            <Link
              href="https://jsdl.in/DT-59UIQEAU6YE"
              target="_blank"
              rel="noopener noreferrer"
              className="scale-75 lg:scale-100"
            >
              <Image
                src="/assets/images/homepage/Section1JDR.svg"
                alt="JD Logo"
                title="JD Logo"
                width={150}
                height={50}
                className="h-full hover:cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* fourth section | scrolling section */}
      <div className="w-full flex justify-center items-center mt-[5.5rem]">
        <div className="w-full xl:px-16 px-8 flex flex-col gap-2 max-w-[1440px] items-center overflow-visible">
          <h2 className="text-smallheading font-bold lg:text-2xl w-full text-center">
            How does CareerNaksha help
          </h2>
          <div className="text-[19px] text-blueprimary font-bold lg:text-3xl text-center">
            Students &amp; Professionals achieve their career dreams
          </div>
          <p className="text-center font-semibold lg:text-2xl text-sm">
            A step‑by‑step approach for your career assessment, exploration,
            selection, planning &amp; execution
          </p>

          <div className="flex flex-col relative w-full items-center lg:gap-8 gap-4">
            {/* Scrolling indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-8 flex justify-center pointer-events-none">
              <Image
                width={32}
                height={32}
                src="/assets/images/homepage/scrollingArrow.svg"
                alt="Scroll indicator"
                className="sticky top-[10%] z-20 lg:w-8 w-6 h-10 ml-1"
              />
              <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 bg-smallheading w-[1px] rounded" />
            </div>

            {STEPS.map((step) => (
              <div
                key={step.id}
                className="flex flex-col max-w-4xl gap-2 mt-12 group cursor-pointer ml-8 lg:ml-0 
                         hover:shadow-lg p-3 rounded-lg transition-all duration-300 hover:scale-[1.001]"
              >
                <h3
                  className="text-smallheading font-bold text-xl lg:text-2xl w-full 
                              group-hover:text-blueprimary transition-all"
                >
                  {step.title}
                </h3>
                <div className="text-2xl">{step.tagline}</div>

                <div
                  className={`flex border border-smallheading rounded-lg p-3 gap-8 ${
                    step.id % 2 === 0
                      ? "lg:flex-row-reverse flex-col-reverse"
                      : "flex-col-reverse lg:flex-row"
                  }`}
                >
                  <div className="flex flex-col justify-center gap-8 lg:max-w-[55%] w-full items-center lg:items-start">
                    <p>{step.description}</p>
                    <button
                      onClick={handleShowGetStartedClick}
                      className="font-semibold px-5 py-2.5 gradient-button rounded-full before:rounded-full w-fit hidden lg:block"
                    >
                      Get Started As
                    </button>
                    <button
                      onClick={handleShowGetStartedClick}
                      className="px-3 py-1.5 font-semibold gradient-button rounded-full shadow-sm w-fit text-[0.69rem] block lg:hidden"
                    >
                      Get Started
                    </button>
                  </div>

                  <div className="h-64 flex-1">
                    <video
                      autoPlay
                      loop
                      playsInline
                      muted
                      className="h-full w-full object-contain"
                      src={step.videoSrc}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* fifth section | Vcoach */}
      <section className="w-full flex flex-col relative overflow-hidden mt-16 justify-center items-center py-12">
        <div className="flex flex-col max-w-7xl z-10 justify-center lg:flex-row mt-8 lg:mt-0 px-6 h-fit">
          {/* Left text/content */}
          <div className="flex lg:gap-6 flex-col text-left lg:w-full lg:min-w-[70%]">
            <h2 className="lg:text-[2.75rem] font-bold text-2xl w-[60%] lg:w-full">
              Hi! I am your personal career advisor
            </h2>
            <h3 className="text-blue-600 lg:text-[2.75rem] text-2xl font-extrabold mt-2 w-[60%] lg:w-full">
              V‑Coach
            </h3>
            <p className="font-bold lg:text-xl text-xs mt-2 w-[60%] lg:w-full">
              (Virtual Career Options Assistance &amp; Counselling Help)
            </p>

            {/* Get Started button */}
            <div className="w-full flex z-10 my-4 lg:my-0">
              <Link
                rel="nofollow"
                href={
                  isLoggedIn
                    ? "/aicounsellor/dash"
                    : "/login?redirect_url=/aicounsellor/dash"
                }
                className="py-1.5 pl-6 pr-2 rounded-full bg-[#204AF5] text-base lg:text-lg flex items-center gap-8 cursor-pointer border border-[#204AF5] hover:bg-white group transition-all"
              >
                <span className="font-bold text-white group-hover:text-[#204AF5] transition-all">
                  Get Started
                </span>
                <Image
                  src="/assets/images/psychometrics/arrow2.svg"
                  alt="arrow2"
                  width={24}
                  height={24}
                />
              </Link>
            </div>

            {/* “You can ask” */}
            <div className="flex flex-col lg:max-w-[80%]">
              <p className="lg:text-xl font-bold lg:text-left text-center mt-4 lg:mt-0">
                You can ask:
              </p>
              <div className="flex justify-center flex-wrap lg:justify-start gap-3 mt-3">
                {ASK_ITEMS.map((item) => (
                  <span
                    key={item}
                    className="bg-white border-black drop-shadow-md text-[#001F57] font-semibold px-4 py-2 rounded-full lg:w-fit w-full text-center"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* “You can be” */}
              <p className="lg:text-xl font-bold lg:text-left text-center mt-4 lg:mt-0">
                You can be:
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-3">
                {WHO_ITEMS.map((who) => (
                  <span
                    key={who}
                    className="bg-white border-black drop-shadow-md text-[#001F57] font-semibold px-4 py-2 rounded-full"
                  >
                    {who}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="flex lg:relative w-full absolute top-[5rem] lg:top-0">
            <div className="lg:w-[130%] w-[40%] absolute top-0 lg:right-[7%] right-[3rem]">
              <Image
                src="/assets/images/careerai/vcoach.svg"
                alt="V-Coach"
                width={800}
                height={600}
                className="max-h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="text-xl z-10 lg:text-3xl font-bold justify-center items-center text-center text-[#204AF5] mt-24 lg:flex hidden">
          Confusion to Clarity | Unknown to Awareness | Influence to Unbiased
          Guidance
        </div>
      </section>

      {/* sixth section | safe hands */}
      <section className="w-full flex justify-center items-center mt-[4.5rem]">
        <div className="w-full max-w-[1440px] flex flex-col items-center px-8 lg:px-14 gap-2 lg:gap-0">
          <h2 className="font-semibold lg:text-4xl w-full text-center text-[22px]">
            You are in{" "}
            <span className="font-bold inline-block">
              Safe Hands{" "}
              <Image
                src="/assets/images/homepage/safestroke.png"
                alt="stroke"
                id="safestroke"
                width={0} // we’ll size via CSS
                height={0}
                className="w-0 relative -top-2 transition-all duration-700 delay-300 lg:h-4 h-2"
              />
            </span>{" "}
            at <span className="font-bold">CareerNaksha</span>
          </h2>

          <p className="w-full text-center font-semibold lg:text-2xl">
            Trusted by millions of parents, students, professionals &amp;
            counsellors
          </p>

          <div className="flex flex-col lg:flex-row max-w-full md:max-w-4xl border border-blueprimary rounded-md bg-white mt-6 lg:mt-12">
            {/* Left column (text + desktop button) */}
            <div className="w-full lg:w-3/5 px-4 lg:px-8 py-5 lg:py-10 flex flex-col justify-center gap-8">
              <div className="text-center lg:text-left">
                At CareerNaksha we obsess with the success of the student or
                professional.
                <p className="mt-3">
                  Therefore we provide unbiased career counselling with 100%
                  money back guarantee policy if we do not meet your
                  expectations. You have the right to cancel and refund.
                  It&apos;s as simple as that.
                </p>
              </div>
              <button
                onClick={handleShowGetStartedClick}
                className="hidden lg:inline-block font-semibold px-5 py-2.5 gradient-button rounded-full before:rounded-full w-fit"
              >
                Get Started As
              </button>
            </div>
            {/* Divider */}
            <div className="bg-blueprimary h-0.5 w-auto mx-6 lg:h-auto lg:w-px lg:my-6 lg:mx-0" />

            {/* Right column (image + mobile button) */}
            <div className="w-full lg:w-2/5 relative p-6 lg:p-12 flex flex-col justify-center items-center">
              <div className="relative">
                <Image
                  width={300}
                  height={300}
                  src="/assets/images/homepage/moneyback.png"
                  alt="money back"
                  title="money back"
                  className="object-contain rounded-md"
                />
              </div>
              <button
                onClick={handleShowGetStartedClick}
                className="mt-4 lg:hidden px-3 py-1.5 font-semibold gradient-button rounded-full shadow-sm text-[0.69rem] w-fit"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* seventh section | testimonials */}
      <h1 className="text-xl font-bold text-center">TODO | Testimonials</h1>

      {/* eighth section | partners */}
      <div className="w-full flex justify-center items-center">
        <div className="w-full xl:px-16 px-8 flex flex-col gap-4 mt-16 max-w-[1440px] items-center overflow-visible">
          {/* Headings */}
          <div className="text-smallheading font-bold lg:text-2xl lg:text-left text-center">
            One of the most talked about career platform in India &amp; World
          </div>
          <div className="lg:text-4xl text-[22px] bg-clip-text bg-[length:200%_200%] bg-gradientbluelightblue animate-[getStartedAsBtnBg_15s_ease-in-out_infinite] text-transparent font-bold text-center lg:mt-6">
            Our partners and media mentions
          </div>

          {/* First Row: Alumni, Recognized, In Media */}
          <div className="flex flex-col w-full mt-2 gap-14">
            <div className="flex justify-between flex-col lg:flex-row gap-8 lg:gap-0 w-full">
              {/* Alumni */}
              <div className="flex flex-col gap-8">
                <div className="w-full text-center font-semibold text-smallheading">
                  Built by Alumni of
                </div>
                <div className="flex gap-6 w-full justify-center flex-wrap">
                  {["iit", "msu", "iim", "nirma"].map((name) => (
                    <img
                      key={name}
                      src={`/assets/images/homepage/${name}.png`}
                      alt={name}
                      title={name}
                      className="lg:h-14 h-10"
                    />
                  ))}
                </div>
              </div>
              {/* Recognized */}
              <div className="flex flex-col gap-8">
                <div className="w-full text-center font-semibold text-smallheading lg:pl-28">
                  Recognized by
                </div>
                <div className="flex gap-6 lg:pl-20 flex-wrap w-full justify-center">
                  {["cci", "msme", "startupindia"].map((name) => (
                    <img
                      key={name}
                      src={`/assets/images/homepage/${name}.png`}
                      alt={name}
                      title={name}
                      className={
                        name === "msme" ? "lg:h-10 h-7" : "lg:h-11 h-8"
                      }
                    />
                  ))}
                </div>
              </div>
              {/* In Media */}
              <div className="flex flex-col gap-8">
                <div className="w-full text-center font-semibold text-smallheading">
                  In Media
                </div>
                <div className="flex gap-6 flex-wrap justify-center">
                  <img
                    src="/assets/images/homepage/yourstory.png"
                    alt="yourstory"
                    title="yourstory"
                    className="lg:h-10 h-8"
                  />
                  <img
                    src="/assets/images/homepage/outlook.png"
                    alt="outlook"
                    title="outlook"
                    className="lg:h-6 h-4 mt-2"
                  />
                  <img
                    src="/assets/images/homepage/businessstd.png"
                    alt="businessstd"
                    title="businessstd"
                    className="lg:h-10 h-7 mt-1"
                  />
                  <img
                    src="/assets/images/homepage/apn.png"
                    alt="apn"
                    title="apn"
                    className="lg:h-9 h-7 mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Second Row: Partner Schools & Universities */}
            <div className="flex justify-center lg:gap-52 gap-8 flex-col lg:flex-row w-full">
              {/* Schools */}
              <div className="flex flex-col gap-4">
                <div className="w-full text-center font-semibold text-smallheading">
                  Partner Schools
                </div>
                <div className="flex gap-3 lg:gap-6 w-full flex-wrap justify-center items-center">
                  {["podar", "nalanda", "cygnus", "kabir"].map((name) => (
                    <img
                      key={name}
                      src={`/assets/images/homepage/${name}.png`}
                      alt={name}
                      title={name}
                      className={
                        name === "kabir"
                          ? "lg:h-20 h-16"
                          : name === "cygnus"
                          ? "lg:h-16 h-14"
                          : name === "nalanda"
                          ? "lg:h-12 h-10"
                          : "lg:h-8 h-7"
                      }
                    />
                  ))}
                </div>
              </div>
              {/* Universities */}
              <div className="flex flex-col gap-8">
                <div className="w-full text-center font-semibold text-smallheading">
                  Partner Universities
                </div>
                <div className="flex lg:gap-6 gap-3 w-full flex-wrap justify-center">
                  {["symbiosys", "amity", "manipal"].map((name) => (
                    <img
                      key={name}
                      src={`/assets/images/homepage/${name}.png`}
                      alt={name}
                      title={name}
                      className="lg:h-12 h-10"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Third Row: NGOs & Institutes */}
            <div className="flex justify-center lg:gap-52 gap-8 flex-col lg:flex-row w-full">
              {/* NGOs */}
              <div className="flex flex-col gap-4">
                <div className="w-full text-center font-semibold text-smallheading">
                  Partner NGOs
                </div>
                <div className="flex lg:gap-6 gap-3 w-full flex-wrap justify-center items-center">
                  {["grvs", "uway", "gsp", "cser"].map((name) => (
                    <img
                      key={name}
                      src={`/assets/images/homepage/${name}.png`}
                      alt={name}
                      title={name}
                      className={
                        name === "cser"
                          ? "lg:h-20 h-12"
                          : name === "gsp"
                          ? "lg:h-16 h-10"
                          : name === "uway"
                          ? "lg:h-12 h-9"
                          : "lg:h-8 h-7"
                      }
                    />
                  ))}
                </div>
              </div>
              {/* Institutes */}
              <div className="flex flex-col gap-8">
                <div className="w-full text-center font-semibold text-smallheading">
                  Partners Institutes
                </div>
                <div className="flex lg:gap-6 gap-3 w-full flex-wrap justify-center">
                  {["arena", "jindal", "careerl", "bhanwar"].map((name) => (
                    <img
                      key={name}
                      src={`/assets/images/homepage/${name}.png`}
                      alt={name}
                      title={name}
                      className="lg:h-12 h-9"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Read More */}
          <div className="w-full flex justify-center">
            <Link href="/about-us">
              <button className="font-semibold px-5 py-2.5 gradient-button rounded-full w-fit hidden lg:block mt-6">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ninth section | our counsellors */}
      <h1 className="text-xl font-bold text-center">TODO | Our Counsellors</h1>

      {/* tenth section | request callback */}
      <div className="w-full flex justify-center items-center my-8">
        <div className="w-full xl:px-16 px-8 flex flex-col gap-4 py-14 max-w-[1440px] items-center overflow-visible">
          <div className="text-xl text-blueprimary font-bold text-center lg:text-left">
            Your first step from Career Confusion to Clarity!
          </div>
          <div className="text-center lg:text-left lg:text-base text-xs">
            Discover your best fit career and take the World's Most Accurate
            Career Test
          </div>
          <RequestCallback />
        </div>
      </div>

      {/* 11th section | blogs section */}
      <h1 className="text-xl font-bold text-center">TODO | Blogs Section</h1>

      {/* 12th section | FAQs */}
      <FAQs />

      <div className="w-full flex justify-center mb-8">
        <div
          className="font-semibold px-5 py-2.5 gradient-button rounded-full before:rounded-full w-fit hidden lg:block"
          onClick={handleShowGetStartedClick}
        >
          Get Started As
        </div>
      </div>
    </Fragment>
  );
}
