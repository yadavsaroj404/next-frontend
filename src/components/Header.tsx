// components/Header.tsx
"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { showGetStartedAs, hideGetStartedAs } from "@/store/layoutSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

interface SubNavLink {
  name: string;
  url: string;
  type?: "EXTERNAL_LINK";
}
interface NavLink {
  name: string;
  subNavLinks: SubNavLink[];
}

const NAV_LINKS: NavLink[] = [
  {
    name: "Psychometric Test",
    subNavLinks: [
      { name: "Career Test", url: "/formdetails" },
      {
        name: "O*NET Framework",
        url: "https://www.onetonline.org/",
        type: "EXTERNAL_LINK",
      },
      {
        name: "Case History",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSepPLhHWgsRlQ7t5vEbijVfy2fuKS6p70AOPL33rzQ2w3oHPw/viewform",
        type: "EXTERNAL_LINK",
      },
      {
        name: "Career AI Assistant",
        url: "/aicounsellor",
      },
    ],
  },
  {
    name: "Students/Parents",
    subNavLinks: [
      { name: "8th Class and Below", url: "/psychometrics" },
      { name: "9th & 10th Class", url: "/psychometrics" },
      { name: "11th & 12th Class", url: "/psychometrics" },
      { name: "UG & PG Students", url: "/psychometrics" },
    ],
  },
  {
    name: "Admissions",
    subNavLinks: [
      { name: "GlobalVidhya", url: "/globalvidhya" },
      { name: "University Connect", url: "" },
      { name: "School Connect", url: "" },
    ],
  },
  {
    name: "Professionals",
    subNavLinks: [
      {
        name: "Freshers & Graduates",
        url: "",
      },
      {
        name: "Working in MSME",
        url: "",
      },
      {
        name: "IT Industry",
        url: "",
      },
      {
        name: "Leadership",
        url: "",
      },
    ],
  },
  {
    name: "Corporates",
    subNavLinks: [
      {
        name: "Employee Engagement",
        url: "",
      },
      {
        name: "Social CSR",
        url: "https://careerskill.org/",
        type: "EXTERNAL_LINK",
      },
    ],
  },
  {
    name: "Counsellors",
    subNavLinks: [
      {
        name: "Search Counsellor",
        url: "/counsellors/search",
      },
      {
        name: "Community",
        url: "https://community.careernaksha.com/",
        type: "EXTERNAL_LINK",
      },
      {
        name: "National Certification Program",
        url: "/career-counsellor-program",
      },
      {
        name: "Freelancing Work opportunity",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdHJE_5O9VBCHwSvmgNcLN0Zy_NJdjzbLlCrby7PtOoejQoPw/viewform",
        type: "EXTERNAL_LINK",
      },
      {
        name: "Retreat",
        url: "/retreat",
      },
    ],
  },
  {
    name: "Blogs",
    subNavLinks: [
      { name: "Articles", url: "/blogs" },
      { name: "Stories", url: "" },
      { name: "Edufair", url: "" },
      { name: "Nirdeshika", url: "" },
    ],
  },
  {
    name: "About Us",
    subNavLinks: [
      { name: "Vision, Mission & History", url: "about-us" },
      { name: "Core Team and Advisory", url: "/team" },
      { name: "Partners", url: "/partners" },
    ],
  },
];

const SOCIAL = ["instagram", "facebook", "youtube", "linkedin"];

export default function Header() {
  const dispatch = useAppDispatch();
  const getStartedAsShown = useAppSelector((s) => s.layout.getStartedAsShown);
  const pathname = usePathname();
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false); // replace with real auth
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setOpenIndex(null);
    dispatch(hideGetStartedAs());
  }, [pathname, dispatch]);

  const toggleIndex = (i: number) => setOpenIndex(openIndex === i ? null : i);
  const handleGetStarted = () => {
    if (loggedIn) {
      /* logout logic here */ setLoggedIn(false);
    } else {
      dispatch(showGetStartedAs());
    }
    setMenuOpen(false);
  };

  const NavMenu = ({ isMobile }: { isMobile: boolean }) => (
    <nav className={`${isMobile ? "" : "flex gap-4"}`}>
      {NAV_LINKS.map((link, i) => (
        <div key={i} className="relative">
          <button
            onClick={() => toggleIndex(i)}
            className={`flex justify-between w-full ${
              isMobile ? "py-2 px-4" : "items-center px-4 py-2 rounded-full"
            } hover:bg-gray-100 transition`}
          >
            <span
              className={isMobile ? "font-semibold" : "font-medium text-[13px]"}
            >
              {link.name}
            </span>
            <span className="ml-2">{openIndex === i ? "−" : "+"}</span>
          </button>
          {openIndex === i && (
            <ul
              className={`absolute bg-white shadow-lg rounded-lg mt-2 ${
                isMobile
                  ? "relative top-0 left-0 w-full p-2"
                  : "top-full left-0 p-2 text-xs space-y-1 z-20"
              }`}
            >
              {link.subNavLinks.map((sub, j) => (
                <li key={j}>
                  <Link
                    href={sub.url}
                    className="block px-3 py-1 hover:text-blueprimary transition"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );

  return (
    <Fragment>
      <header className="w-full bg-white fixed top-0 z-50">
        {/* Desktop */}
        <div className="hidden xl:flex flex-col shadow-lg">
          <div className="flex justify-center">
            <div className="flex justify-between items-center w-full max-w-[1440px] px-12 py-4">
              <Link
                href="/"
                onClick={() => dispatch(hideGetStartedAs())}
                aria-label="Home"
              >
                <Image
                  src="/assets/images/homepage/homeIcon.svg"
                  alt="Home"
                  width={15}
                  height={15}
                  className="hover:shadow-sm transition"
                />
              </Link>

              <NavMenu isMobile={false} />
              <SocialIcons />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex xl:hidden justify-between items-center px-6 py-4">
          <Link href="/">
            <Image
              src="/assets/images/logoh.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          </Link>
          <button onClick={() => setMenuOpen((o) => !o)}>
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-black" />
              <span className="block w-6 h-0.5 bg-black" />
              <span className="block w-6 h-0.5 bg-black" />
            </div>
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {menuOpen && (
          <div className="xl:hidden bg-white shadow-lg mt-0 pt-2 pb-4">
            <CallBubble />
            <NavMenu isMobile />
            <div className="flex justify-center gap-4 mt-4">
              <Link
                href={loggedIn ? "/dashboard" : "/login"}
                className="px-4 py-2 font-semibold"
              >
                {loggedIn ? "Dashboard" : "Login"}
              </Link>
              <button
                onClick={handleGetStarted}
                className="px-4 py-2 font-semibold gradient-button rounded-full"
              >
                {loggedIn ? "Logout" : "Get Started As"}
              </button>
            </div>
          </div>
        )}
      </header>
      <div className="flex mt-20 justify-between items-center w-full max-w-[1440px] px-12 py-3">
        <Link href="/">
          <Image
            src="/assets/images/logoh.svg"
            alt="Logo"
            width={150}
            height={40}
          />
        </Link>
        <div className="flex items-center gap-4">
          <CallBubble />
          <Link
            href={loggedIn ? "/dashboard" : "/login"}
            className="px-6 py-2 border border-blueprimary rounded-full hover:bg-blueprimary hover:text-white transition"
          >
            {loggedIn ? "Dashboard" : "Login"}
          </Link>
          <button
            onClick={handleGetStarted}
            className="px-5 py-2.5 gradient-button rounded-full"
          >
            {getStartedAsShown
              ? "Go Back"
              : loggedIn
              ? "Logout"
              : "Get Started As"}
          </button>
        </div>
      </div>
    </Fragment>
  );
}

// Social icons row
function SocialIcons() {
  return (
    <div className="flex gap-5">
      {SOCIAL.map((s) => (
        <Link
          key={s}
          href={`https://www.${s}.com/careernaksha`}
          target="_blank"
          rel="noopener"
          aria-label={s}
        >
          <Image
            src={`/assets/images/${s}.svg`}
            alt={s}
            width={28}
            height={28}
            className="brightness-0 hover:brightness-100 transition"
          />
        </Link>
      ))}
    </div>
  );
}

// Call bubble component
function CallBubble() {
  return (
    <div className="relative group">
      <div className="w-10 h-10 flex items-center justify-center border border-blueprimary rounded-full transition-all group-hover:w-44 overflow-hidden">
        <Image
          src="/assets/images/callicon.svg"
          alt="Call"
          width={16}
          height={16}
          className="transition-opacity group-hover:opacity-0"
        />
        <a
          href="tel:+918469149288"
          className="absolute left-12 whitespace-nowrap font-semibold opacity-0 group-hover:opacity-100"
        >
          +91 84691-49288
        </a>
      </div>
    </div>
  );
}
