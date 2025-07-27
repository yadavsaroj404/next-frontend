"use client";

import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PricingModal from "./PricingModal";
import Image from "next/image";
import Link from "next/link";
import CheckBox from "@/components/UI/CheckBox";

type PricingPlan =
  | "Free Psychometric Test"
  | "Paid Psychometric Test"
  | "Paid Psychometric Test w/ Counselling";

interface PricingCard {
  name: string;
  code: PricingPlan;
  price: number;
  services: {
    available: string[];
    unavailable: string[];
  };
}

const PRICING_CARDS: PricingCard[] = [
  {
    name: "BASIC",
    code: "Free Psychometric Test",
    price: 0,
    services: {
      available: ["Basic Psychometric Test"],
      unavailable: [
        "Case History Background",
        "Detailed Report",
        "Counselling Session - 1",
        "Career Queries - 1",
        "Admission End to End",
      ],
    },
  },
  {
    name: "STANDARD",
    code: "Paid Psychometric Test",
    price: 999,
    services: {
      available: ["Premium Psychometric Test"],
      unavailable: [
        "Case History Background",
        "Detailed Report",
        "Counselling Session - 1",
        "Career Queries - 5",
        "Admission End to End",
      ],
    },
  },
  {
    name: "PREMIUM",
    code: "Paid Psychometric Test w/ Counselling",
    price: 9999,
    services: {
      available: [
        "Premium Psychometric Test",
        "Case History Background",
        "Detailed Report",
        "Counselling Session - 1",
        "Career Queries - Unlimited",
        "Admission End to End",
      ],
      unavailable: [],
    },
  },
];

const SAMPLE_REPORTS = [
  {
    label: "9th and 10th Grade",
    file: "/Sample_9_10_Report.pdf",
    downloadName: "Sample 9th and 10th Report – CareerNaksha",
  },
  {
    label: "11th and 12th Grade",
    file: "/Sample_11_12_Report.pdf",
    downloadName: "Sample 11th and 12th Report – CareerNaksha",
  },
  {
    label: "UG/PG",
    file: "/Sample_UG_PG_Report.pdf",
    downloadName: "Sample UG and PG Report – CareerNaksha",
  },
  {
    label: "Working Professionals",
    file: "/Sample_Working_Pro_Report.pdf",
    downloadName: "Sample Working Professional Report – CareerNaksha",
  },
];

export default function FormDetails() {
  const router = useRouter();

  // modal form state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(
    "Free Psychometric Test"
  );

  // -- Handlers --
  const handleAskForHelpFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const name = e.currentTarget.fullName.value;
    const email = e.currentTarget.email.value;
    const phone = e.currentTarget.phone.value;
    const grade = e.currentTarget.grade.value;
    const termAccepted = e.currentTarget.termAccepted.checked;

    const isFormValid =
      termAccepted &&
      name &&
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email) &&
      phone &&
      grade;

    if (!isFormValid) return;

    try {
      // post to your Strapi dashboard
      await axios.post("https://dashboard.careernaksha.com/coupon-forms", {
        Full_Name: name,
        Email: email,
        Mobile: phone,
        Grade: grade,
        Date: new Date().toLocaleDateString(),
      });
      // post to your API
      await axios.post("https://api.careernaksha.com/api/couponform", {
        name,
        email,
        phone,
        grade,
      });
      // setFormSuccess(true);
      // setFormError(false);
    } catch (err) {
      // setFormError(true);
    }
  };

  const openModal = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <Fragment>
      {modalOpen && <PricingModal plan={selectedPlan} onClose={closeModal} />}

      <section className="flex relative w-full overflow-hidden mt-24 justify-center lg:mt-0">
        <div className="flex justify-between gap-y-10 items-center w-full lg:flex-row flex-col lg:px-28 px-6">
          <div className="flex flex-col items-center text-center gap-2 lg:items-start lg:text-left">
            <h1 className="text-smallheading font-bold lg:text-2xl text-xl">
              Psychometric Career Assessment Test
            </h1>
            <p className="lg:text-5xl lg:leading-15 lg:max-w-2xl text-3xl font-extrabold text-blueprimary mt-2">
              Welcome to the World&apos;s Most Accurate Career Test
            </p>
            <h2 className="w-full text-lg mt-6 font-bold">Sample Reports:</h2>
            <div className="w-full flex gap-x-2 lg:gap-x-8 gap-y-2 mt-2 flex-wrap">
              {SAMPLE_REPORTS.map((report, index) => (
                <Link
                  key={index}
                  href={report.file}
                  download={report.downloadName}
                  className="px-4 py-2 rounded-full bg-blueprimary text-white border border-blueprimary hover:bg-white hover:text-blueprimary cursor-pointer transition-all"
                >
                  {report.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <Image
              src="/assets/images/formdetails/hero.png"
              className="max-w-96"
              alt="An illustration depicting various career paths and professional growth, representing the benefits of a psychometric career assessment."
              width={500}
              height={380}
              priority
            />
          </div>
        </div>
      </section>

      <div className="w-screen text-center font-bold text-blueprimary lg:text-[2.5rem] text-2xl px-6 mt-5">
        <h1 className="sr-only">Psychometric Assessment and its Benefits</h1>{" "}
        {/* Visually hidden H1 for SEO, main H1 would be on the page.tsx */}
        <h2 className="lg:text-[2.5rem] text-2xl">
          Psychometric Assessment and its Benefits
        </h2>
      </div>

      {/* About Section */}
      <section
        id="what-is-psychometric-test"
        className="flex relative w-screen overflow-hidden justify-center mt-8 lg:mt-0 lg:text-left text-center"
      >
        <div className="max-w-5xl flex justify-between items-center w-full lg:flex-row flex-col lg:px-12 px-6 gap-16">
          <div className="flex flex-col">
            <h3 className="font-semibold lg:text-2xl text-xl mb-4">
              What is a Psychometric Test?
            </h3>
            <p>
              Psychometric tests objectively measure the personality, skills,
              and talent of a student or graduate. These tests include
              psychological, reasoning, aptitude, ability-based, scenario-based,
              motivation questionnaires, and personality profile questions. They
              are the best way to objectify measures that are often considered
              non-measurable.
            </p>
          </div>
          <div className="w-full">
            <Image
              src="/assets/images/formdetails/about.png"
              alt="Illustration showing a person taking a psychometric test, representing data analysis and career insights."
              width={400}
              height={300}
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits-of-psychometric-test"
        className="flex relative w-screen overflow-hidden mt-8 justify-center lg:mt-0 lg:text-left text-center"
      >
        <div className="max-w-5xl flex justify-between items-center w-full flex-col lg:px-12 px-6 gap-4">
          <h3 className="font-semibold lg:text-2xl text-xl w-full">
            Benefits of Psychometric Test
          </h3>
          <p>
            Psychometric tests provide an objective and efficient way to assess
            individuals&apos; abilities, personality traits, and preferences.
            They offer benefits such as aiding in recruitment decisions,
            predicting future performance, fostering self-awareness,
            facilitating team building, and promoting fairness and diversity.
            Additionally, they contribute to cost and time efficiency in various
            contexts, making them valuable tools for both individuals and
            organizations.
          </p>
        </div>
      </section>

      {/* Benefit Cards Section */}
      <section
        id="key-benefits"
        className="flex relative w-screen overflow-hidden mt-12 justify-center"
      >
        <div className="max-w-5xl flex justify-center items-center w-full flex-wrap lg:px-12 px-6 lg:gap-x-24 lg:gap-y-20 gap-6">
          {/* Card 1 */}
          <div className="flex justify-center items-center gap-3 lg:px-4 px-2 py-5 border border-bgcolors rounded-lg flex-col lg:w-[14rem] w-[8rem] hover:border-blueprimary transition-all hover:shadow-[0_4px_15px_0_rgba(66,129,253,20%)] lg:h-[18rem] h-[15rem] group bg-bgcolors lg:text-base text-[10px]">
            <div className="lg:w-16 w-10">
              <Image
                src="/assets/images/formdetails/card1.png"
                alt="Icon representing career analytics and profiling"
                width={64} // Assuming lg:w-16 means 64px
                height={64} // Assuming w-10 means 40px
              />
            </div>
            <p className="text-center">
              Class and age-specific career profiling to facilitate counseling
              &amp; guidance for right stream and subject selection from 8th
              className onwards.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex justify-center items-center gap-3 lg:px-4 px-2 py-5 border border-bgcolors rounded-lg flex-col lg:w-[14rem] w-[8rem] hover:border-blueprimary transition-all hover:shadow-[0_4px_15px_0_rgba(66,129,253,20%)] lg:h-[18rem] h-[15rem] group bg-bgcolors lg:text-base text-[10px]">
            <div className="lg:w-16 w-10">
              <Image
                src="/assets/images/formdetails/card2.png"
                alt="Icon representing career clarity and unbiased results"
                width={64}
                height={64}
              />
            </div>
            <p className="text-center">
              Resolve career confusion and gain clarity in taking the right
              career decision &amp; next steps with reliable and unbiased
              results having no influence of coaching or tuitions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex justify-center items-center gap-3 lg:px-4 px-2 py-5 border border-bgcolors rounded-lg flex-col lg:w-[14rem] w-[8rem] hover:border-blueprimary transition-all hover:shadow-[0_4px_15px_0_rgba(66,129,253,20%)] lg:h-[18rem] h-[15rem] group bg-bgcolors lg:text-base text-[10px]">
            <div className="lg:w-16 w-10">
              <Image
                src="/assets/images/formdetails/card3.png"
                alt="Icon representing skill improvement for high-paying jobs"
                width={64}
                height={64}
              />
            </div>
            <p className="text-center">
              Improve your skills to be able to crack deserving high-paying jobs
              &amp; competitive exams.
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex justify-center items-center gap-3 lg:px-4 px-2 py-5 border border-bgcolors rounded-lg flex-col lg:w-[14rem] w-[8rem] hover:border-blueprimary transition-all hover:shadow-[0_4px_15px_0_rgba(66,129,253,20%)] lg:h-[18rem] h-[15rem] group bg-bgcolors lg:text-base text-[10px]">
            <div className="lg:w-16 w-10">
              <Image
                src="/assets/images/formdetails/card4.png"
                alt="Icon representing building a strong profile post 12th grade"
                width={64}
                height={64}
              />
            </div>
            <p className="text-center">
              Build a strong profile for studies or jobs after 12th and
              reality-based career selection.
            </p>
          </div>

          {/* Card 5 */}
          <div className="flex justify-center items-center gap-3 lg:px-4 px-2 py-5 border border-bgcolors rounded-lg flex-col lg:w-[14rem] w-[8rem] hover:border-blueprimary transition-all hover:shadow-[0_4px_15px_0_rgba(66,129,253,20%)] lg:h-[18rem] h-[15rem] group bg-bgcolors lg:text-base text-[10px]">
            <div className="lg:w-16 w-10">
              <Image
                src="/assets/images/formdetails/card5.png"
                alt="Icon representing 360-degree student evaluation and personalized advice"
                width={64}
                height={64}
              />
            </div>
            <p className="text-center">
              Understand overall personality &amp; 360 evaluation of a student
              to know their strengths, skills, and talents, upon which career
              counselors can give best advice.
            </p>
          </div>
        </div>
      </section>

      {/* Scientific Research Section */}
      <section
        id="scientific-research"
        className="flex relative w-screen overflow-hidden lg:mt-12 mt-8 justify-center bg-bgcolors"
      >
        <div className="max-w-5xl flex justify-between items-center w-full flex-col lg:px-12 px-6 gap-4 py-10">
          <h3 className="font-semibold lg:text-2xl text-xl w-full text-blueprimary lg:text-left text-center">
            International framework combined with scientific research
          </h3>
          <p className="lg:text-left text-center">
            CareerNaksha&apos;s machine learning-based personality assessment is
            mapped to specific fields &amp; careers based on 5-Dimensions:
            interest, personality/behavior, aptitude, skills/knowledge, &amp;
            work styles. The test is scientific, statistically proven, tested on
            more than 1 million (10 lakh) students, based on the O*NET framework
            (used by the US Department of Labor).
          </p>
        </div>
      </section>

      {/* have a coupon */}
      <div className="flex relative w-screen overflow-hidden justify-center my-20 px-6">
        <div className="max-w-3xl flex justify-between items-center w-full flex-col lg:px-8 px-6 gap-4 py-10 bg-bgcolors rounded-lg border border-blueprimary">
          <div className="w-full text-center text-blueprimary text-2xl font-bold">
            Start Your Assessment Here
          </div>
          <div className="mt-4 text-center">
            You need a coupon to start your psychometric test / aptitude test /
            learning styles assessment(s). If you already have a coupon, enter
            the coupon code below (in CAPITALS) to unlock your assessment.
          </div>
          <div id="tu-widget" className="tu-widget"></div>
        </div>
      </div>

      {/* Pricing Section */}
      <section
        id="pricing-plans"
        className="flex relative w-screen overflow-hidden lg:mt-12 mt-8 justify-center bg-bgcolors"
      >
        <div className="max-w-5xl flex justify-between items-center w-full flex-col lg:px-12 px-6 gap-4 py-10">
          <h2 className="font-bold lg:text-2xl text-xl w-full text-blueprimary text-center">
            Don&apos;t Have a Coupon? Choose a Plan
          </h2>
          <p className="my-2 text-center text-lg">
            No coupon? No problem! Select one of our tailored plans to get
            access to the psychometric test. Whether you&apos;re looking for a
            free option or more comprehensive features, we&apos;ve got you
            covered.
          </p>

          {/* Pricing Cards Container */}
          <div className="flex flex-col my-6 space-y-6 md:space-y-0 md:space-x-6 md:flex-row md:my-0">
            {PRICING_CARDS.map((plan: PricingCard) => (
              <div
                key={plan.name} // Use a stable key for list rendering
                className={`${
                  plan.name === "STANDARD"
                    ? "bg-blueprimary text-white"
                    : "bg-slate-700 text-white"
                } rounded-xl shadow-lg`}
              >
                {/* Upper Container */}
                <div className="p-8 mx-3 mt-3 rounded-t-xl bg-slate-100 text-black">
                  <h3 className="text-center uppercase text-xl font-bold">
                    {plan.name}
                  </h3>
                  <p className="mt-10 font-serif text-5xl text-center">
                    {plan.price === 0 ? "Free" : `${plan.price}`}
                  </p>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => openModal(plan.code)}
                      className={`cursor-pointer inline-block px-10 py-3 my-6 text-center border border-blueprimary rounded-lg duration-200 ${
                        plan.name === "STANDARD"
                          ? "text-white bg-blueprimary hover:bg-blue-800 hover:border-blue-800"
                          : " text-blueprimary bg-white hover:text-white hover:bg-blueprimary"
                      } font-semibold`}
                    >
                      {plan.name === "BASIC" ? "Start Test" : "Purchase"}
                    </button>
                  </div>
                </div>

                {/* Border */}
                <div className="border-t border-slate-700"></div>

                {/* Lower Container */}
                <div className="p-8 mx-3 mb-3 rounded-b-xl bg-slate-100 text-black">
                  <ul className="flex flex-col space-y-2">
                    {plan.services.available.map((item, index) => (
                      <li
                        key={`available-${plan.name}-${index}`}
                        className="flex items-center justify-start"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-green-500 mr-1" // Added green color
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 12l5 5l10 -10" />
                        </svg>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                    {plan.services.unavailable.map((item, index) => (
                      <li
                        key={`unavailable-${plan.name}-${index}`}
                        className="flex items-center justify-start"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-500 mr-1"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="text-sm line-through text-gray-500">
                          {item}
                        </span>{" "}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ask for help */}
      <section
        id="help-choosing-plan-form"
        className="flex relative w-screen overflow-hidden my-20 justify-center px-6"
      >
        <form
          onSubmit={handleAskForHelpFormSubmit}
          className="max-w-3xl flex justify-between items-center w-full flex-col lg:px-8 px-6 gap-4 py-10 bg-bgcolors rounded-lg border border-blueprimary"
        >
          <h2 className="w-full text-center text-blueprimary text-2xl font-bold">
            Need Help Choosing a Plan?
          </h2>
          <p className="my-2 text-center">
            If you&apos;re unsure which plan is right for you or need assistance
            purchasing a coupon, our counselors are here to help. Fill out the
            contact form below, and we&apos;ll reach out to guide you through
            the process.
          </p>

          {/* Full Name */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="fullName" className="text-sm font-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter Your Full Name"
              aria-label="Enter your full name"
              required
              className="rounded-lg outline-none border border-smallheading w-full placeholder:text-smallheading text-sm py-3 px-5"
            />
          </div>

          {/* Email ID */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="text-sm font-semibold">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
              aria-label="Enter your email ID"
              required
              className="rounded-lg outline-none border border-smallheading w-full placeholder:text-smallheading text-sm py-3 px-5"
            />
          </div>

          {/* Mobile/Phone No. */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="phone" className="text-sm font-semibold">
              Mobile/Phone No.
            </label>
            <input
              type="tel" // Use type="tel" for phone numbers (better for mobile keyboards)
              name="phone"
              id="phone" // Unique and descriptive ID
              placeholder="Enter Your Mobile or Phone Number" // More descriptive placeholder
              aria-label="Enter your mobile or phone number" // Added for accessibility
              required
              pattern="[0-9]{10}" // Basic pattern for 10-digit phone numbers in India
              title="Please enter a 10-digit mobile or phone number (e.g., 9876543210)" // User-friendly validation message
              className="rounded-lg outline-none border border-smallheading w-full placeholder:text-smallheading text-sm py-3 px-5"
            />
          </div>

          {/* Grade */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="grade" className="text-sm font-semibold">
              Grade
            </label>
            <select
              name="grade"
              id="grade"
              aria-label="Select your current grade or professional status" // Added for accessibility
              required
              defaultValue=""
              className="rounded-lg outline-none border border-smallheading w-full font-semibold text-sm py-3 px-5 bg-white"
            >
              {/* Added a disabled, selected option as a prompt */}
              <option value="" disabled>
                Select Your Grade/Status
              </option>
              <option value="9th and Below">9th and Below</option>
              <option value="10th">10th</option>
              <option value="11th and 12th">11th and 12th</option>
              <option value="College Student">College Student</option>
              <option value="Graduate/Fresher">Graduate/Fresher</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Career Counsellor">Career Counsellor</option>
            </select>
          </div>

          {/* Terms and Conditions Checkbox */}
          <CheckBox id="termAccepted">
            <span className="flex-1">
              I have read and agreed to{" "}
              <Link
                href="/privacy-policy"
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="font-semibold text-blueprimary hover:underline"
              >
                Privacy policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms-conditions"
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="font-semibold text-blueprimary hover:underline"
              >
                Terms and Conditions
              </Link>
              .
            </span>
          </CheckBox>

          {/* Submit Button */}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              aria-label="Submit your help request"
              className="px-6 py-2.5 font-semibold w-fit rounded-lg border border-blueprimary bg-blueprimary text-white hover:text-blueprimary hover:bg-white transition-all cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
}
