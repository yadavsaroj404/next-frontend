"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import { NEXT_PUBLIC_HOSTURL } from "@/lib/config"; // define this in your env
import TelephoneInput from "./UI/TelephoneInput";

const NEXT_PUBLIC_HOSTURL =
  process.env.NEXT_PUBLIC_HOSTURL || "https://careernaksha.com";

const SOCIAL = [
  { name: "instagram", href: "https://www.instagram.com/careernaksha" },
  { name: "facebook", href: "https://www.facebook.com/careernaksha" },
  { name: "youtube", href: "https://www.youtube.com/careernaksha" },
  { name: "linkedin", href: "https://www.linkedin.com/company/careernaksha" },
];

const INTEREST_OPTIONS = [
  "Career Counselling",
  "Career Planning",
  "Psychometrics Testing",
  "Studyabroad Program",
  "Profile Building",
  "College and University",
  "Join Community",
  "Coupon Code for Career Analytics Report",
  "Certification & Training",
];

const GUJARAT_CITIES = [
  "Ahmedabad",
  "Vadodara",
  "Anand",
  "Bhavnagar",
  "Gandhinagar",
  "Rajkot",
  "Surat",
  "Bharuch",
  "Ankleshwar",
  "Nadiad",
  "Navsari",
  "Valsad",
  "Vapi",
  "Jamnagar",
  "Junagadh",
  "Porbandar",
  "Gandhidham",
  "Godhra",
  "Dahod",
  "Palanpur",
  "Patan",
  "Mehsana",
  "Morbi",
  "Veraval",
  "Botad",
  "Jetpur",
  "Kalol",
  "Halol",
  "Dabhoi",
  "Dwarka",
  "Mundra",
  "Amreli",
  "Gondal",
  "Sanand",
  "Dholka",
  "Siddhpur",
  "Bardoli",
  "Palitana",
  "Deesa",
  "Bhuj",
  "Modasa",
  "Wankaner",
  "Himmatnagar",
  "Vadnagar",
  "Vasad",
  "Khambhat",
  "Kheda",
  "Visnagar",
  "Vansda",
  "Vallabhvidyanagar",
  "Chandkheda",
];

const INDIA_CITIES = [
  "Gurgaon",
  "Noida",
  "Jaipur",
  "Hyderabad",
  "Faridabad",
  "Delhi",
  "Chandigarh",
  "Bangalore",
  "Lucknow",
  "Kerala",
  "Durg",
  "Rohini",
  "Rajasthan",
  "Pune",
  "Mumbai",
  "Indore",
  "Bhopal",
  "Panchkula",
  "Aurangabad",
  "Latur",
  "Wardha",
  "Meerut",
  "Mysore",
  "Rewa",
];

const ABROAD_CITIES = [
  "Canada",
  "Perth",
  "United Kingdom",
  "Dubai",
  "Abu Dhabi",
  "Qatar",
  "Riyadh",
  "Jeddah",
  "Dammam",
  "Oman",
  "Sydney",
  "Melbourne",
  "Toronto",
  "Europe",
  "Calgary",
  "Singapore",
  "Muscat",
  "Bahrain",
  "Kuwait",
  "Uganda",
];

const PAYMENT_METHODS = [
  "paytm",
  "visa",
  "gpay",
  "razorpay",
  "mc",
  "neft",
  "imps",
];

export default function Footer() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [interestedIn, setInterestedIn] = useState("");
  const [showInterestDropdown, setShowInterestDropdown] = useState(false);

  const currentYear = new Date().getFullYear();

  const clearForm = () => {
    setPhone("");
    setEmail("");
    setMessage("");
    setInterestedIn("");
  };

  const isSendDisabled = !phone || !email || !interestedIn;

  const handleSubmit = async () => {
    if (isSendDisabled) {
      alert("Please Enter Details");
      return;
    }
    const contact_data = {
      Email: email,
      Phone: phone,
      InterestField: interestedIn,
      Message: message,
      Date: new Date().toLocaleDateString(),
    };

    try {
      // send to dashboard
      await fetch("https://dashboard.careernaksha.com/contact-forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact_data),
      });
      // send to your API
      await fetch(`${NEXT_PUBLIC_HOSTURL}/api/sendContact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact_data),
      });
      clearForm();
      alert("Thank you! We'll be in touch.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <footer
      id="mainfooter"
      className="w-screen flex justify-center bg-bgcolors px-12 xl:px-16"
    >
      <div className="w-full max-w-[1440px] flex flex-col gap-8 items-center pt-10 lg:pt-14 pb-6">
        {/* top section */}
        <div className="flex flex-wrap justify-center gap-7 w-full">
          {/* logo */}
          <div className="w-full xl:w-auto">
            <Image
              src="/assets/images/footerlogo.svg"
              alt="Footer logo"
              width={104}
              height={104}
              className="min-w-[6.5rem]"
            />
          </div>

          {/* about us */}
          <div className="flex flex-col gap-4 min-w-[14rem] xl:max-w-[17rem]">
            <span className="font-semibold">About us</span>
            <p className="text-sm">
              CareerNaksha is the most trusted online-offline platform for
              career psychometric assessment… professionals achieve their career
              dreams.
            </p>
          </div>

          {/* social */}
          <div className="flex flex-col gap-4  xl:max-w-[16rem] w-full">
            <span className="font-semibold w-full">
              Social | Partners |{" "}
              <Link
                href="https://careernaksha.notion.site/CareerNaksha-Job-Board-140f4751d2668038848ac4b83f09b700"
                target="_blank"
              >
                <span className="text-black">Career</span>
              </Link>
            </span>
            <div className="flex gap-5">
              {SOCIAL.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  aria-label={s.name}
                >
                  <Image
                    src={`/assets/images/${s.name}.svg`}
                    alt={s.name}
                    width={28}
                    height={28}
                    className="brightness-0 hover:brightness-100 transition"
                  />
                </Link>
              ))}
            </div>
            <Link href="tel:+918469149288" className="flex gap-2 items-center">
              <Image
                src="/assets/images/footer/call.svg"
                alt="call"
                width={20}
                height={20}
              />
              <span className="text-sm">+91-8469149288</span>
            </Link>
            <Link
              href="mailto:support@careernaksha.com"
              className="flex gap-2 items-center"
            >
              <Image
                src="/assets/images/footer/mail.svg"
                alt="mail"
                width={20}
                height={20}
              />
              <span className="text-sm">support@careernaksha.com</span>
            </Link>
            <div className="flex gap-2 items-center">
              <Image
                src="/assets/images/footer/loc.svg"
                alt="loc"
                width={20}
                height={20}
              />
              <span className="text-sm">
                302, Saffron Complex, Fatehgunj, Vadodara, Gujarat 390008
              </span>
            </div>
          </div>

          {/* O*NET */}
          <div className="flex flex-col gap-4 xl:max-w-[19rem]">
            <span className="font-semibold w-full">O*Net Framework</span>
            <Image
              src="/assets/images/footer/ostar.png"
              alt="ostar"
              width={128}
              height={64}
              className="w-32"
            />
            <p className="text-sm">
              This site incorporates information from O*NET Web Services by the
              U.S. Department of Labor, Employment and Training Administration
              (USDOL/ETA).
              <br />
              <strong>O*NET® is a trademark of USDOL/ETA.</strong>
            </p>
          </div>

          {/* contact form */}
          <div className="flex flex-col gap-2 min-w-[15rem] xl:w-auto w-full">
            <TelephoneInput
              onChangeNumber={(num) => setPhone(num)}
              value={phone}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-smallheading px-3 py-2.5 text-sm font-semibold"
            />
            <input
              type="text"
              placeholder="Your Query"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-md border border-smallheading px-3 py-2.5 text-sm font-semibold"
            />

            {/* interested dropdown */}
            <div className="relative">
              <button type="button"
                onClick={() => setShowInterestDropdown((o) => !o)}
                className="w-full text-left rounded-md border border-smallheading px-3 py-2.5 bg-white font-semibold text-smallheading"
              >
                {interestedIn || "Are you interested in"}
              </button>
              {showInterestDropdown && (
                <ul className="absolute z-10 w-full bg-white border border-smallheading mt-1 rounded-md text-xs max-h-44 overflow-auto">
                  {INTEREST_OPTIONS.map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setInterestedIn(opt);
                        setShowInterestDropdown(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-end">
              <button type="button"
                onClick={handleSubmit}
                disabled={isSendDisabled}
                className="px-3 py-1.5 rounded-md font-bold text-white bg-blueprimary disabled:bg-[#9F9F9F] disabled:text-opacity-20 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* cities section */}
        <div className="w-full flex flex-col gap-6 lg:px-[11rem] px-4 mt-4">
          <h3 className="font-semibold text-center lg:text-left">
            Available Offline & Online in English | Hindi | Gujarati
          </h3>

          {/* Desktop grid */}
          <div className="hidden lg:flex gap-16 w-full">
            {["In Gujarat", "In India", "Outside India"].map((title, idx) => {
              const arr =
                idx === 0
                  ? GUJARAT_CITIES
                  : idx === 1
                  ? INDIA_CITIES
                  : ABROAD_CITIES;
              return (
                <div key={title} className="flex flex-col gap-4">
                  <span className="font-bold text-base">{title}</span>
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    {arr.map((city) => (
                      <Link
                        key={city}
                        href={`/career-counselling/${encodeURIComponent(
                          city.toLowerCase()
                        )}`}
                        className="text-black mr-4"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile lists */}
          <div className="flex flex-col gap-8 w-full lg:hidden">
            <CityList title="In Gujarat" cities={GUJARAT_CITIES} />
            <CityList title="In India" cities={INDIA_CITIES} />
            <CityList title="Outside India" cities={ABROAD_CITIES} />
          </div>
        </div>

        {/* services lists */}
        <ServiceSection />

        {/* payment logos */}
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl mt-4">
          {PAYMENT_METHODS.map((m) => (
            <Link key={m} href="/payments" className="flex justify-center">
              <Image
                src={`/assets/images/footer/payment/${m}.png`}
                alt={m}
                width={60}
                height={30}
                className="h-10 w-auto"
              />
            </Link>
          ))}
        </div>

        {/* bottom text */}
        <div className="text-center text-sm lg:text-base mt-4">
          Built with ❤️ in India | CareerNaksha © Realtime Data Analysis Pvt.
          Ltd. {currentYear}
          <div className="mt-2 space-x-2">
            <Link href="/privacy-policy" rel="nofollow">
              Privacy Policy
            </Link>
            |
            <Link href="/data-privacy-policy" rel="nofollow">
              Data Privacy Policy
            </Link>
            |
            <Link href="/terms-conditions" rel="nofollow">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CityList({ title, cities }: { title: string; cities: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-xl text-center">{title}</span>
      <div className="flex flex-wrap justify-between">
        {cities.map((city) => (
          <Link
            key={city}
            href={`/career-counselling/${encodeURIComponent(
              city.toLowerCase()
            )}`}
            className="w-1/2 text-black mb-2"
          >
            {city}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ServiceSection() {
  const sections = [
    {
      title: "Career Counselling & Guidance Solutions",
      items: [
        ["Students", "Graduates"],
        ["Freshers", "Professionals"],
        ["Schools", "Psychologists"],
        ["Counsellors", "Coaches"],
        ["Colleges", "Universities"],
        ["Corporates", "Industries"],
        ["Companies", "NGOs"],
      ] as [string, string][],
    },
    {
      title: "Schools",
      items: [
        ["Career Test", "Assessments"],
        ["Psychometrics", "Grade 5th to 8th"],
        ["Grade 9th & 10th", "Grade 11th & 12th"],
        ["Aptitude Test", ""],
      ],
    },
    {
      title: "Services & Products",
      items: [
        ["Career Test", "Psychometrics"],
        ["Counselling", "Mentorship"],
        ["Profile Building", "College or University Admissions"],
        ["Stream Selection", "Career Confusion or Clarity"],
        ["Write Article on Career", ""],
      ],
    },
    {
      title: "Colleges",
      items: [
        ["Career Test for Engineering Students", "Management Students"],
        ["Science Students", "Medical Health Students"],
        ["Post Graduates", "UG or PG Students"],
        ["Job Placement Assistance", ""],
      ],
    },
    {
      title: "Other Assessments",
      items: [
        ["MBTI Personality Test", "DISC Personality Test"],
        ["Learning Style Assessment", "DMIT Assessment"],
        ["Maladjustment Assessment", ""],
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4 lg:px-[10.5rem] lg:mt-8 mt-4">
      {sections.map((sec) => (
        <div key={sec.title} className="py-2 font-semibold">
          <h4 className="text-base">{sec.title} :</h4>
          <div className="flex flex-wrap gap-x-10 mt-4">
            {sec.items.map(([a, b], i) => (
              <div key={i} className="w-28">
                <div>{a}</div>
                {b && <div>{b}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
