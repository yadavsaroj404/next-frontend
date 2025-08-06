import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

interface RetreatSession {
  icon?: string;
  title: string;
  time?: string;
}
interface RetreatDay {
  dayTitle: string;
  theme: string;
  sessions: RetreatSession[];
}

// Static data
const organizers = "CareerNaksha";
const cities = ["Mumbai", "Bangalore"] as const;
type City = (typeof cities)[number];

const overview = [
  "Recharge, Re-Learn & Re-Connect",
  "A 2-Day Retreat for Education & Counselling Leaders",
  "Empowering the Future of Guidance & Learning",
];

const locationData = {
  Mumbai: {
    city: "Mumbai",
    dates: "July 26th – 27th, 2025",
    venue:
      "Universal AI University, Gaurkamat, Vadap, Kushivili, PO, Karjat, Maharashtra 410201",
    mapUrl: "https://g.co/kgs/uWHrxkU",
    heroImage: "/assets/images/retreat/ai-university.jpg",
  },
};

const participants = [
  "Certified & Aspiring counsellors from across India",
  "School/college counsellors",
  "Teachers & principals",
  "Education consultants",
  "University faculty",
  "Interested participants in the education/counselling sector",
];

const whyAttend = {
  schools: [
    "Get actionable insights on NEP2020, modern career pathways, and experiential learning.",
    "Upskill with the latest in technology, AI, and life skills education.",
    "Build connections with top counsellors and universities.",
  ],
  counsellors: [
    "Learn cutting-edge tools, strategies, and personal branding techniques.",
    "Discover new-age careers and tech integration in counselling.",
    "Share and learn from real success stories.",
    "Access to PAN India Opportunities and Entrepreneurship.",
  ],
};

const mission =
  "Mission of empowering students and educators through collaboration and innovation.";

const days: RetreatDay[] = [
  {
    dayTitle: "Day 1 (July 26th)",
    theme: "Recharge & Relearn",
    sessions: [
      { icon: "users", title: "Registration & Networking", time: "09:00 AM" },
      { icon: "users", title: "Meet & Greet" },
      {
        icon: "sparkles",
        title: "Welcome & Icebreaker",
        time: "Keynote: NEP2020 – What’s Next for Schools & Colleges & Educators?",
      },
      {
        icon: "light-bulb",
        title: "Expert Panel Discussion",
        time: "Trends in Career Opportunities & Education Courses",
      },
      { icon: "coffee", title: "Tea Break & Networking" },
      { title: "Workshop", time: "Integrating Technology & AI in Counselling" },
      {
        icon: "discussion",
        title: "Experiential Learning & Life Skills Education",
      },
      { icon: "discussion", title: "Break for Lunch" },
      {
        icon: "discussion",
        title:
          "Success Stories & Best Practices Implemented in the field of Education",
      },
      { icon: "none", title: "Campus Tour & Faculty Talk Show" },
      { icon: "none", title: "Day 1 Sign Off", time: "05:00 PM" },
    ],
  },
  {
    dayTitle: "Day 2 (July 27th)",
    theme: "Reconnect & Grow",
    sessions: [
      { icon: "sun", title: "Welcome Note & Energizer", time: "09:00 AM" },
      {
        icon: "users",
        title: "Expert Panel Discussions",
        time: "Bridging Futures: Uniting Leaders for Impact",
      },
      {
        icon: "handshake",
        title: "Round 1 of Discussion",
        time: "Govt. School Principals (Innovating for Inclusion) and Private School Principals (Future-Ready Schools)",
      },
      {
        icon: "handshake",
        title: "Round 2 of Discussion",
        time: "Corporate CSR Professionals: Building Sustainable Partnerships for Lasting Impact",
      },
      { icon: "user-circle", title: "Tea Break & Networking" },
      {
        icon: "user-circle",
        title: "Workshop",
        time: "Personal Branding & Marketing Strategy for Counsellors",
      },
      { icon: "heart", title: "Mental Health & Wellness for Educators" },
      { icon: "heart", title: "Break for Lunch" },
      {
        icon: "puzzle",
        title: "Group Activity",
        time: "Designing Future-Ready Schools & Counselling Practices",
      },
      {
        icon: "heart",
        title: "Group Discussion",
        time: "From Re-Learn to Action",
      },
      { icon: "heart", title: "Rewards & Recognition Ceremony" },
      { icon: "heart", title: "Closing & Feedback" },
      {
        icon: "trophy",
        title: "Distribution of participation certificates",
        time: "05:00 PM",
      },
    ],
  },
];

const videos = [
  {
    title:
      "Doordarshan Gujarati - DD News Gujarat Coverage - Career Counselling - Karkirdi Margdarshan Retreat",
    embedUrl: "https://www.youtube.com/embed/UmeushuwJfY",
  },
  {
    title:
      "Career Counsellor - National Career Counselling Certification Program - Retreat 2024",
    embedUrl: "https://www.youtube.com/embed/75ti-WzDdQE",
  },
];

// Dynamic metadata based on city query
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}): Promise<Metadata> {
  const { city } = await searchParams;
  const cityParam = String(city ?? "").trim();
  const selectedCity: City = cities.includes(cityParam as City)
    ? (cityParam as City)
    : "Mumbai";

  const title = `${selectedCity} Retreat 2025 | ${organizers}`;
  const description =
    selectedCity === "Mumbai"
      ? "Join us in Mumbai for a 2-Day retreat empowering education & counselling leaders."
      : "The Bangalore Retreat is coming soon! Stay tuned for updates.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images:
        selectedCity === "Mumbai"
          ? [
              {
                url: locationData.Mumbai.heroImage,
                width: 1200,
                height: 630,
                alt: "Retreat Venue",
              },
            ]
          : [],
    },
  };
}

// Server Component
export default async function RetreatPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const { city } = await searchParams;
  const cityParam = String(city ?? "").trim();
  const selectedCity: City = cities.includes(cityParam as City)
    ? (cityParam as City)
    : "Mumbai";

  return (
    <div className="min-h-screen px-4 sm:px-6 sm:mt-14 md:mt-0">
      {/* Header */}
      <header className="max-w-4xl mx-auto py-6 md:py-8 text-center">
        <p className="text-sm md:text-base uppercase tracking-wider">
          Organised by
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold">{organizers}</h1>
        <div className="mt-2 text-sm sm:text-base">
          In association with
          <div className="flex w-2/3 gap-x-8 mx-auto justify-center items-center">
            <Image
              width={200}
              height={100}
              alt="Universal AI University"
              className="w-3/6 object-contain"
              src="/assets/images/retreat/universal-ai-university-mumbai.webp"
            />
            <Image
              width={100}
              height={100}
              alt="CCI Logo"
              className="w-1/6 object-contain"
              src="/assets/images/retreat/cci_logo.png"
            />
            <Image
              width={100}
              height={100}
              alt="iChars Logo"
              className="w-2/5 object-contain"
              src="/assets/images/retreat/ichars.svg"
            />
          </div>
        </div>
      </header>

      {/* Overview */}
      <section className="max-w-3xl mx-auto pb-6 md:pb-8 space-y-2 text-center">
        {overview.map((line, i) => (
          <p key={i} className="text-base sm:text-lg">
            {line}
          </p>
        ))}
      </section>

      {/* City Links */}
      <nav className="max-w-4xl mx-auto flex justify-center gap-4 mb-8">
        {cities.map((city) => (
          <Link
            key={city}
            href={`/retreat?city=${city}`}
            className={`px-4 py-2 rounded-full font-medium transition duration-200 ${
              selectedCity === city
                ? "bg-primary text-white"
                : "bg-white text-primary-dark border border-primary"
            }`}
          >
            {city}
          </Link>
        ))}
      </nav>

      {/* City-specific Content */}
      {selectedCity === "Mumbai" ? (
        <>
          {/* Hero / Location */}
          <section className="relative bg-white shadow-md max-w-4xl mx-auto rounded-xl overflow-hidden mb-8 md:mb-12">
            <div className="bg-primary h-16 sm:h-20" />
            <article className="relative bg-white p-4 sm:p-6 text-center -mt-12 sm:-mt-16 rounded-xl shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark">
                Mumbai Retreat 2025
              </h2>
              <p className="mt-2 text-sm sm:text-base">
                {locationData.Mumbai.city} • {locationData.Mumbai.dates}
              </p>
              <address className="not-italic text-xs sm:text-sm opacity-80">
                {locationData.Mumbai.venue}
              </address>
              <Image
                src={locationData.Mumbai.heroImage}
                alt="Retreat Venue"
                width={600}
                height={300}
                className="mt-4 mx-auto object-contain rounded-lg"
              />
              <Link
                href={locationData.Mumbai.mapUrl}
                className="inline-block mt-4 text-primary border border-primary px-4 sm:px-5 py-2 rounded-full hover:bg-primary hover:text-white transition text-sm sm:text-base"
                target="_blank"
              >
                View on Map
              </Link>
            </article>
          </section>

          {/* Who Can Participate */}
          <section className="max-w-4xl mx-auto mb-8 md:mb-12 bg-white/20 backdrop-blur-xs rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-blueprimary">
              Who Can Participate?
            </h3>
            <ul className="list-disc list-inside space-y-1 mt-3 text-sm sm:text-base">
              {participants.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </section>

          {/* Why Attend */}
          <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-6 sm:gap-8 mb-8 md:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-blueprimary text-center col-span-2">
              Why Should You Attend?
            </h3>
            {(["schools", "counsellors"] as const).map((key) => (
              <div
                key={key}
                className="bg-white/20 backdrop-blur-xs rounded-2xl shadow-lg p-4 sm:p-6"
              >
                <h4 className="text-lg sm:text-xl font-semibold text-blueprimary">
                  {key === "schools"
                    ? "For Schools & Educators"
                    : "For Counsellors"}
                </h4>
                <ul className="list-disc list-inside space-y-1 mt-3 text-sm sm:text-base">
                  {whyAttend[key].map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Mission & CTA */}
          <section className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <div className="space-y-2 mb-4">
              <p className="text-lg">
                <span className="font-semibold">Registration Fee:</span>
                <span className="text-green-600 ml-2">₹1,500 </span>
                <span className="text-base font-normal">/counselor</span>
                <span className="block text-sm font-normal text-GraySecondary">
                  (non‑refundable / non‑transferable)
                </span>
              </p>
              <p className="text-lg">
                <span className="inline-block bg-green-100 px-2 py-1 rounded mx-2">
                  Last 20 seats available!
                </span>
                <span className="text-green-600">
                  Book your seat now to secure your spot.
                </span>
              </p>
            </div>
            <p className="italic text-base sm:text-lg text-blueprimary/90 mb-6">
              {mission}
            </p>
            <Link
              href="https://forms.gle/uZCK2LMUSzA3Z5Ae9"
              target="_blank"
              //   className="px-6 py-3 bg-primary text-white rounded-full font-semibold call-to-action"
              className="pulseCTA"
            >
              Register Now
            </Link>
          </section>

          {/* Agenda */}
          <main className="max-w-6xl mx-auto py-8 sm:py-12 grid md:grid-cols-2 gap-6 sm:gap-8">
            {days.map((day, idx) => (
              <section
                key={idx}
                className="relative bg-white/10 bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-xs rounded-2xl shadow-lg overflow-hidden hover:bg-white/20 hover:shadow-2xl transition duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white/30 to-blue-100" />
                <header className="relative p-4 sm:p-6 border-b border-white/30">
                  <h4 className="text-xl sm:text-2xl font-bold">
                    {day.dayTitle}
                  </h4>
                  <p className="text-primary-light mt-1 font-semibold text-sm sm:text-base">
                    <span className="text-black">Theme:</span> {day.theme}
                  </p>
                </header>
                <ul className="relative space-y-4 p-4">
                  {day.sessions.map((s, j) => (
                    <li key={j} className="flex items-center gap-3 sm:gap-4">
                      <div className="flex-none bg-white/20 p-1.5 sm:p-2 rounded-full">
                        <span className="sr-only">{s.icon}</span>
                        <svg
                          className="w-5 sm:w-6 h-5 sm:h-6 text-blueprimary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm sm:text-base">
                          {s.title}
                        </p>
                        {s.time && (
                          <time className="text-xs sm:text-sm opacity-80">
                            {s.time}
                          </time>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </main>

          {/* Videos */}
          <section className="max-w-6xl mx-auto mb-8 md:mb-12 space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-blueprimary text-center">
              Featured Coverage
            </h3>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="col-span-2">
                <Image
                  src="/assets/images/retreat/group-photo.jpeg"
                  alt="Group Photo"
                  width={1000}
                  height={600}
                  className="object-cover rounded-2xl shadow-lg w-full"
                />
              </div>
              {videos.map((v, i) => (
                <article
                  key={i}
                  className="bg-white/20 backdrop-blur-xs rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="relative w-full h-0 pb-[56.25%]">
                    <iframe
                      src={v.embedUrl}
                      title={v.title}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
                    />
                  </div>
                  <p className="p-3 sm:p-4 font-medium text-sm sm:text-base">
                    {v.title}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Guidelines */}
          <section className="max-w-4xl mx-auto py-8 px-4 md:px-0">
            <h3 className="text-2xl font-bold text-blueprimary mb-4">
              Important Points &amp; Guidelines
            </h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-800">
              <li>
                Participants must reach the venue on time and complete
                registration before the event starts.
              </li>
              <li>
                Inviting 50 National Counsellors from the North, West, and East
                to an exclusive event.
              </li>
              <li>
                Registration fee of <strong>₹1,500</strong> is non-refundable &
                non-transferable.
              </li>
              <li>
                No pick-up or drop-off provided. Arrange your own
                transportation.
              </li>
              <li>
                Lodging (one night), meals, and snacks are covered by the event
                planner.
              </li>
              <li>
                Guests (spouse/children) must arrange their own lodging and
                meals; no entry to event hall.
              </li>
              <li>
                For queries, contact:
                <ul className="list-disc list-inside pl-4 mt-1">
                  <li>
                    Lohith:{" "}
                    <a
                      href="tel:+918495857245"
                      className="text-blue-600 hover:underline"
                    >
                      8495857245
                    </a>
                  </li>
                  <li>
                    Preeti Shah:{" "}
                    <a
                      href="tel:+919820519788"
                      className="text-blue-600 hover:underline"
                    >
                      9820519788
                    </a>
                  </li>
                  <li>
                    Email:{" "}
                    <a
                      href="mailto:lgucareernaksha@gmail.com"
                      className="text-blue-600 hover:underline"
                    >
                      lgucareernaksha@gmail.com
                    </a>
                  </li>
                </ul>
              </li>
              <li>To receive group discounts, reach out to the event SPOC.</li>
            </ol>
          </section>

          {/* Footer */}
          <footer className="relative pt-0 pb-12 sm:pb-16 bg-white text-center z-10">
            <p className="text-primary-dark/80 mb-3 sm:mb-4 text-base sm:text-lg">
              Limited seats—book yours now!
            </p>
            <Link
              href="https://forms.gle/uZCK2LMUSzA3Z5Ae9"
              target="_blank"
              className="pulseCTA"
            >
              Register Now
            </Link>
          </footer>
        </>
      ) : (
        <section className="text-center py-16">
          <Image
            src="/assets/images/retreat/coming-soon.png"
            alt="Bangalore Retreat Coming Soon"
            width={600}
            height={400}
            className="mx-auto"
          />
          <p className="mt-6 text-lg text-gray-600">
            The Bangalore Retreat is coming soon! Stay tuned for updates.
          </p>
        </section>
      )}
    </div>
  );
}
