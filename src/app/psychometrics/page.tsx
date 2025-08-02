"use client"; // This component requires client-side interactivity

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // For navigation in Next.js

// --- Constants (Moved from Angular component) ---
const BACKEND_SERVER_URL =
  process.env.NEXT_PUBLIC_BACKEND_SERVER_URL || "http://localhost:3000"; // Use environment variable

const CURRENTLY_IN_OPTIONS = [
  "Grade 8th or below",
  "Grade 9th or 10th",
  "Grade 11th or 12th",
  "UG/PG",
  "Working Professional",
];

const LOOKING_FOR_OPTIONS = [
  "Free Psychometric Test",
  "Paid Psychometric Test",
  "Paid Psychometric Test with Counselling",
];

// --- Psychometrics Component ---
export default function PsychometricsComponent() {
  const router = useRouter(); // Initialize Next.js router

  const [isCurrentlyInDropdownOpen, setIsCurrentlyInDropdownOpen] =
    useState(false);
  const [isLookingForDropdownOpen, setIsLookingForDropdownOpen] =
    useState(false);

  const [selectedCurrently, setSelectedCurrently] = useState("");
  const [selectedLooking, setSelectedLooking] = useState("");

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const currentlyDropdownRef = useRef<HTMLDivElement>(null);
  const lookingDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currentlyDropdownRef.current &&
        !currentlyDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCurrentlyInDropdownOpen(false);
      }
      if (
        lookingDropdownRef.current &&
        !lookingDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLookingForDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCurrentlyDropdown = () => {
    setIsCurrentlyInDropdownOpen((prev) => !prev);
    setIsLookingForDropdownOpen(false); // Close other dropdown
  };

  const toggleLookingDropdown = () => {
    setIsLookingForDropdownOpen((prev) => !prev);
    setIsCurrentlyInDropdownOpen(false); // Close other dropdown
  };

  const selectCurrently = (value: string) => {
    setSelectedCurrently(value);
    setIsCurrentlyInDropdownOpen(false);
  };

  const selectLooking = (value: string) => {
    setSelectedLooking(value);
    setIsLookingForDropdownOpen(false);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only digits and limit to 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobile(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (!selectedLooking || !selectedCurrently || !mobile || !email) {
      // You might want to show a user-friendly error message here
      console.error("Please fill all fields.");
      return;
    }

    // Save to localStorage
    localStorage.setItem("psychoMobile", mobile);
    localStorage.setItem("psychoEmail", email);
    localStorage.setItem("psychoLooking", selectedLooking);
    localStorage.setItem("psychoCurrent", selectedCurrently);

    try {
      const response = await fetch(
        `${BACKEND_SERVER_URL}/psychometrics/createPsychometricsUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile,
            email,
            currentlyIn: selectedCurrently,
            lookingFor: selectedLooking,
          }),
        }
      );

      if (response.ok) {
        console.log("Psycho User Saved");
        // Handle successful response (e.g., show success message)
      } else {
        console.error("Failed to save psycho user:", response.statusText);
        // Handle API error
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle network or other errors
    }

    // Navigate based on selection
    if (selectedLooking === "Free Psychometric Test") {
      router.push("/psychometrics/test");
    } else {
      router.push("/psychometrics/payment");
    }
  };

  return (
    // Main section for the page content
    <section
      className="w-full flex flex-col items-center py-8 px-4 lg:py-10 lg:px-8 relative overflow-hidden"
      itemScope
      itemType="https://schema.org/Service" // Or https://schema.org/WebPage
    >
      {/* Background Image (Responsive) */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <Image
          src="/assets/images/psychometrics/background.svg"
          alt="Abstract blue background pattern"
          fill
          sizes="100vw" // Image fills the viewport width
          className="object-cover"
          priority // Prioritize loading for LCP if it's a main visual
        />
      </div>

      {/* Main Content Wrapper (to constrain width) */}
      <div className="w-full max-w-6xl flex flex-col items-center lg:items-start z-10">
        {/* Main Heading */}
        <h1
          className="text-blueprimary font-extrabold text-3xl lg:text-5xl text-center lg:text-left mt-8 lg:mt-24 px-4 lg:px-0"
          itemProp="name" // Schema.org property for the service name
        >
          Discover Your Dream Career Today
        </h1>

        {/* Mobile Sub-heading */}
        <p
          className="lg:hidden text-center mt-1 text-sm px-8"
          itemProp="description"
        >
          Take our AI based Revolutionary World Class Psychometrics
        </p>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col lg:flex-row gap-2 p-2 bg-[#204AF5] rounded-[2rem] lg:rounded-full z-20 mt-8 lg:mt-14 w-full lg:w-fit items-center"
          itemScope
          itemType="https://schema.org/ContactPoint" // Or https://schema.org/Service
        >
          {/* Hero Images (Absolute positioning, responsive) */}
          {/* Left Hero Image Group */}
          <div className="absolute -top-16 -left-4 lg:-top-24 lg:-left-16 z-0">
            <Image
              src="/assets/images/psychometrics/heroleft.svg"
              alt="Stylized figure pointing left"
              width={200} // Base width
              height={200} // Base height
              className="w-40 h-auto lg:w-64 scale-75 lg:scale-95"
            />
            <Image
              src="/assets/images/psychometrics/heroleft_arm.svg"
              alt="Stylized figure's arm"
              width={100}
              height={100}
              className="absolute top-[7.15rem] left-[0.9rem] lg:top-[8rem] lg:left-[0.7rem] w-20 h-auto lg:w-28 scale-75 lg:scale-95 z-30"
            />
            <Image
              src="/assets/images/psychometrics/heroleft_hand.svg"
              alt="Stylized figure's hand"
              width={50}
              height={50}
              className="absolute top-[6.6rem] left-[6.88rem] lg:top-[7.4rem] lg:left-[7.3rem] w-10 h-auto lg:w-16 scale-75 lg:scale-95 z-30"
            />
          </div>
          {/* Right Hero Image Group (Hidden on mobile) */}
          <div className="absolute -top-24 -right-12 hidden lg:block z-0">
            <Image
              src="/assets/images/psychometrics/heroright.svg"
              alt="Stylized figure pointing right"
              width={200}
              height={200}
              className="w-48 h-auto lg:w-64 scale-90 lg:scale-95"
            />
            <Image
              src="/assets/images/psychometrics/heroright_arms.svg"
              alt="Stylized figure's arms"
              width={100}
              height={100}
              className="absolute top-[7.8rem] right-0 w-24 h-auto lg:w-32 scale-90 lg:scale-95 z-30"
            />
            <Image
              src="/assets/images/psychometrics/heroright_hands.svg"
              alt="Stylized figure's hands"
              width={50}
              height={50}
              className="absolute top-[7.3rem] right-[6.88rem] lg:top-[9.5rem] lg:right-[4.9rem] w-10 h-auto lg:w-16 scale-90 lg:scale-95 z-30"
            />
          </div>

          {/* Form Inputs */}
          <input
            type="email" // Use type="email" for better validation
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#102FB1] w-full lg:w-[20rem] rounded-full p-4 text-white placeholder:text-gray-200 outline-none placeholder:text-center text-center lg:text-left lg:placeholder:text-left"
            required // HTML5 validation
            aria-label="Email address"
            itemProp="email" // Schema.org property
          />
          <input
            type="tel" // Use type="tel" for mobile numbers
            placeholder="Mobile"
            value={mobile}
            onChange={handleMobileChange}
            className="bg-[#102FB1] w-full lg:w-[20rem] rounded-full p-4 text-white placeholder:text-gray-200 outline-none placeholder:text-center text-center lg:text-left lg:placeholder:text-left"
            maxLength={10} // Enforce max length
            pattern="[0-9]{10}" // Enforce 10 digits
            required
            aria-label="Mobile number"
            itemProp="telephone" // Schema.org property
          />

          {/* "I am currently in" Dropdown */}
          <div
            className="relative w-full lg:w-auto z-20"
            ref={currentlyDropdownRef}
          >
            <button
              type="button" // Important for buttons inside forms
              onClick={toggleCurrentlyDropdown}
              className="bg-[#102FB1] w-full lg:w-[15rem] rounded-full p-4 cursor-pointer flex justify-between items-center text-white"
              aria-haspopup="listbox"
              aria-expanded={isCurrentlyInDropdownOpen}
              aria-labelledby="currently-label"
            >
              <span
                id="currently-label"
                className="text-center w-full lg:text-left truncate"
              >
                {selectedCurrently || "I am currently in"}
              </span>
              <Image
                src="/assets/images/psychometrics/triangle.svg"
                alt="Dropdown arrow"
                width={12}
                height={12}
                className={`w-3 h-3 transition-transform ${
                  isCurrentlyInDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isCurrentlyInDropdownOpen && (
              <ul
                role="listbox"
                aria-labelledby="currently-label"
                className="flex flex-col absolute bg-[#102FB1] lg:left-[0.35rem] rounded-xl top-[4rem] lg:min-w-[15rem] w-full shadow-lg"
              >
                {CURRENTLY_IN_OPTIONS.map((option) => (
                  <li
                    key={option}
                    role="option"
                    aria-selected={selectedCurrently === option}
                    onClick={() => selectCurrently(option)}
                    className="text-xs cursor-pointer text-white w-full px-4 py-2 border-b border-[#576AB9] last:border-b-0 hover:bg-[#576AB9] transition-colors"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* "I am looking for" Dropdown */}
          <div
            className="relative w-full lg:w-auto z-20"
            ref={lookingDropdownRef}
          >
            <button
              type="button"
              onClick={toggleLookingDropdown}
              className="bg-[#102FB1] w-full lg:w-[15rem] rounded-full p-4 text-white cursor-pointer flex justify-between items-center truncate"
              aria-haspopup="listbox"
              aria-expanded={isLookingForDropdownOpen}
              aria-labelledby="looking-label"
            >
              <span
                id="looking-label"
                className="text-center w-full lg:text-left truncate"
              >
                {selectedLooking || "I am looking for"}
              </span>
              <Image
                src="/assets/images/psychometrics/triangle.svg"
                alt="Dropdown arrow"
                width={12}
                height={12}
                className={`w-3 h-3 transition-transform ${
                  isLookingForDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isLookingForDropdownOpen && (
              <ul
                role="listbox"
                aria-labelledby="looking-label"
                className="flex flex-col absolute bg-[#102FB1] lg:left-[0.35rem] rounded-xl top-[4rem] lg:min-w-max w-full shadow-lg"
              >
                {LOOKING_FOR_OPTIONS.map((option) => (
                  <li
                    key={option}
                    role="option"
                    aria-selected={selectedLooking === option}
                    onClick={() => selectLooking(option)}
                    className="text-xs cursor-pointer text-white w-full px-4 py-2 border-b border-[#576AB9] last:border-b-0 hover:bg-[#576AB9] transition-colors"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-bgcolors rounded-full cursor-pointer p-4 w-min font-semibold text-black hover:bg-opacity-90 transition-colors"
            aria-label="Submit form to discover career"
          >
            Submit
          </button>
        </form>
        {/* Form End */}

        {/* Tagline Section */}
        <p className="font-semibold text-center mt-6 text-sm lg:text-base px-4 lg:px-0">
          A Full Stack Career Platform for Everyone! | Make Smart Career
          Decisions | Take our AI based Revolutionary World Class Psychometrics
        </p>

        {/* Three Steps Section */}
        <div className="flex gap-4 z-10 lg:mt-14 mt-6 items-center w-full max-w-7xl flex-wrap justify-center lg:justify-between">
          <div className="max-w-[30rem] lg:text-2xl text-base text-center lg:text-left">
            <b>CareerNaksha</b> helps you discover your perfect career through
            its
            <b> 5-dimensional career assessment</b>, and{" "}
            <b>unbiased approach</b> to career counselling and career guidance.
          </div>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[15.5rem] flex justify-center"
            >
              <Image
                src={`/assets/images/psychometrics/step${step}.svg`} // Assuming a single image per step that scales
                alt={`Step ${step} in career assessment process`}
                width={250} // Base width for image
                height={200} // Base height for image
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 15.5rem"
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>

        {/* Expert Guidance Section */}
        <h2 className="text-blueprimary font-bold text-2xl lg:text-4xl z-10 mt-8 text-center">
          Expert Career Guidance for Lifetime!
        </h2>
        <p className="font-semibold text-center mt-2 text-base lg:text-xl px-4 lg:px-0">
          A <b>Career Counselling Platform</b> to help you navigate your career
          path with the help of our expert counsellors!
        </p>

        {/* Chat With An Expert Button */}
        <div className="w-full flex justify-center z-10 mt-8">
          <Link
            href="/aicounsellor"
            className="p-2 rounded-full bg-[#204AF5] text-base lg:text-lg flex items-center gap-4 cursor-pointer hover:bg-blue-700 transition-colors"
            aria-label="Chat with an expert AI counsellor"
          >
            <span className="font-bold text-white pl-2">
              Chat With An Expert
            </span>
            <Image
              src="/assets/images/psychometrics/arrow2.svg"
              alt="Arrow icon"
              width={24}
              height={24}
              className="h-auto w-auto"
            />
          </Link>
        </div>

        {/* Guide Images Section */}
        <div className="w-full max-w-[1440px] flex justify-center lg:gap-6 gap-3 z-10 mt-10 flex-wrap">
          {[1, 2, 3, 4, 5].map((guideNum) => (
            <Image
              key={guideNum}
              src={`/assets/images/psychometrics/guide${guideNum}.png`} // Assuming a single image per guide that scales
              alt={`Career guide illustration ${guideNum}`}
              width={250} // Base width
              height={200} // Base height
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" // Example sizes
              className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.5rem)] lg:w-auto h-auto"
            />
          ))}
        </div>

        {/* Statistics Section (90%, 60%, 40%) */}
        <h2 className="w-full text-blueprimary font-bold text-2xl lg:text-4xl z-10 mt-14 text-center">
          Turn Your Passion Into A Successful Career
        </h2>
        <div className="w-full max-w-[1440px] flex justify-center lg:gap-10 gap-4 z-10 mt-10 flex-wrap">
          <div className="flex gap-4 items-center w-full sm:w-[calc(50%-0.5rem)] lg:w-auto flex-col sm:flex-row text-center sm:text-left">
            <Image
              src="/assets/images/psychometrics/90per.svg"
              alt="90 percent"
              width={160}
              height={160}
              className="lg:w-[12rem] w-[10rem] h-auto"
            />
            <p className="lg:text-lg text-base lg:max-w-[10rem] w-full">
              Students <b>follow trend</b> or go into <b>rat race</b>
            </p>
          </div>
          <div className="flex gap-4 items-center w-full sm:w-[calc(50%-0.5rem)] lg:w-auto flex-col sm:flex-row-reverse text-center sm:text-right">
            <Image
              src="/assets/images/psychometrics/60per.svg"
              alt="60 percent"
              width={160}
              height={160}
              className="lg:w-[12rem] w-[10rem] h-auto"
            />
            <p className="lg:text-lg text-base lg:max-w-[10rem] w-full">
              Students are <b>confused</b>
            </p>
          </div>
          <div className="flex gap-4 items-center w-full sm:w-[calc(50%-0.5rem)] lg:w-auto flex-col sm:flex-row text-center sm:text-left">
            <Image
              src="/assets/images/psychometrics/40per.svg"
              alt="40 percent"
              width={160}
              height={160}
              className="lg:w-[12rem] w-[10rem] h-auto"
            />
            <p className="lg:text-lg text-base lg:max-w-[10rem] w-full">
              Students are <b>not aware</b> of new age <b>career options</b>
            </p>
          </div>
        </div>

        {/* Key Metrics Section */}
        <h2 className="w-full text-blueprimary font-bold text-2xl lg:text-4xl z-10 mt-14 text-center">
          Key Metrics
        </h2>
        <div className="w-full max-w-[1440px] flex justify-center lg:gap-6 gap-3 z-10 mt-10 flex-wrap">
          <div className="rounded-xl flex lg:py-8 py-4 lg:px-4 gap-2 flex-col justify-center items-center border border-[#BCBCBC] w-[12rem] sm:w-[calc(50%-0.5rem)] lg:w-[15rem] relative">
            <div className="rounded-full h-6 w-6 bg-[#FFD600] absolute top-4 left-4"></div>
            <div className="lg:text-3xl text-xl font-extrabold">2,165k+</div>
            <p className="text-center lg:text-lg">
              students received counselling in India
            </p>
          </div>

          <div className="rounded-xl flex lg:py-8 py-4 lg:px-4 gap-2 flex-col justify-center items-center border border-[#BCBCBC] w-[12rem] sm:w-[calc(50%-0.5rem)] lg:w-[15rem] relative">
            <div className="rounded-full h-6 w-6 bg-[#FF8145] absolute top-4 left-4"></div>
            <div className="lg:text-3xl text-xl font-extrabold">125k+</div>
            <p className="text-center lg:text-lg">
              psychometric tests completed
            </p>
          </div>

          <div className="rounded-xl flex lg:py-8 py-4 lg:px-4 gap-2 flex-col justify-center items-center border border-[#BCBCBC] w-[12rem] sm:w-[calc(50%-0.5rem)] lg:w-[15rem] relative">
            <div className="rounded-full h-6 w-6 bg-[#204AF5] absolute top-4 left-4"></div>
            <div className="lg:text-3xl text-xl font-extrabold">4300+</div>
            <p className="text-center lg:text-lg">
              career counsellors & experts
            </p>
          </div>

          <div className="rounded-xl flex lg:py-8 py-4 lg:px-4 gap-2 flex-col justify-center items-center border border-[#BCBCBC] w-[12rem] sm:w-[calc(50%-0.5rem)] lg:w-[15rem] relative">
            <div className="rounded-full h-6 w-6 bg-[#4BAA43] absolute top-4 left-4"></div>
            <div className="lg:text-3xl text-xl font-extrabold">55+</div>
            <p className="text-center lg:text-lg h-12">centres across India</p>
          </div>
        </div>

        {/* Products & Services Section */}
        <h2 className="w-full text-blueprimary font-bold text-2xl lg:text-4xl z-10 mt-14 text-center">
          Career Counselling Products & Services
        </h2>

        {/* Products Image */}
        <div className="w-full pl-0 lg:pl-20 mt-8">
          {" "}
          {/* Removed relative -top-8 px-4 from mobile */}
          <Image
            src="/assets/images/psychometrics/products.svg" // Assuming this image works for both desktop and mobile
            alt="Overview of career counselling products and services"
            width={1000} // Set a reasonable base width
            height={500} // Set a reasonable base height
            sizes="(max-width: 1024px) 100vw, 80vw" // Responsive sizes
            className="w-full h-auto"
          />
        </div>

        {/* GIF Sections */}
        <div className="flex w-full gap-8 lg:gap-16 flex-wrap items-start justify-center px-4 sm:px-8 mt-10">
          {/* Test Report GIF */}
          <div className="flex flex-col items-center max-w-sm justify-center text-center lg:text-left">
            <div className="w-full">
              <Image
                src="/assets/images/psychometrics/testgif.gif"
                alt="Animated GIF showing a test report"
                width={400} // Base width
                height={300} // Base height
                unoptimized
                className="w-full h-auto"
              />
            </div>
            <h3 className="text-blueprimary font-bold text-lg w-full lg:pl-16 mt-4">
              Test Report
            </h3>
            <p className="lg:pl-16 mt-1 w-full text-sm">
              At Careernaksha, we offer free psychometric tests designed to
              assess your strengths, interests, and personality. Our detailed
              reports provide personalized career guidance, helping you make
              informed decisions for your future. Get started today and unlock
              your potential!
            </p>
          </div>

          {/* Profile GIF */}
          <div className="flex flex-col items-center max-w-sm justify-center text-center lg:text-left">
            <div className="w-full">
              <Image
                src="/assets/images/psychometrics/progif.gif"
                alt="Animated GIF showing a user profile"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <h3 className="text-blueprimary font-bold text-lg w-full lg:pl-16 mt-4">
              Profile
            </h3>
            <p className="lg:pl-16 mt-1 w-full text-sm">
              At Careernaksha, we create a detailed profile based on your
              psychometric test results, offering insights into your strengths,
              interests, and personality. This profile helps counselors provide
              personalized career guidance tailored to your unique potential.
            </p>
          </div>
        </div>

        <div className="flex w-full gap-8 lg:gap-16 flex-wrap items-start justify-center px-4 sm:px-8 mt-10">
          {/* Career Library GIF */}
          <div className="flex flex-col items-center max-w-sm justify-center text-center lg:text-left">
            <div className="w-full">
              <Image
                src="/assets/images/psychometrics/cargif.gif"
                alt="Animated GIF showing a career library"
                width={400}
                height={300}
                unoptimized
                className="w-full h-auto"
              />
            </div>
            <h3 className="text-blueprimary font-bold text-lg w-full lg:pl-16 mt-4">
              Career Library
            </h3>
            <p className="lg:pl-16 mt-1 w-full text-sm">
              At Careernaksha, we offer a comprehensive career library filled
              with information on various career paths, along with details on
              relevant exams and courses. This resource helps you explore
              opportunities and plan your journey toward the right career.
            </p>
          </div>

          {/* University Admission GIF */}
          <div className="flex flex-col items-center max-w-sm justify-center text-center lg:text-left">
            <div className="w-full">
              <Image
                src="/assets/images/psychometrics/unigif.gif"
                alt="Animated GIF showing university admission process"
                width={400}
                unoptimized
                height={300}
                className="w-full h-auto"
              />
            </div>
            <h3 className="text-blueprimary font-bold text-lg w-full lg:pl-16 mt-4">
              University Admission
            </h3>
            <p className="lg:pl-16 mt-1 w-full text-sm">
              Careernaksha provides university admission assistance, both in
              India and globally. We guide you through the entire process,
              helping you choose the right program and university to align with
              your career goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
