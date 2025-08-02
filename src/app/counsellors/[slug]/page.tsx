import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaStar, FaStarHalfAlt, FaMapMarkerAlt } from "react-icons/fa";
import CounsellorProfileClient from "./CounsellorProfileClient";
import { CounsellorInSearchResults } from "@/interfaces/Counsellor";

// --- Type Definitions ---
interface DayAvailability {
  available: boolean;
  day: string;
  fullDay: boolean;
  timeSlots: {
    from: number;
    to: number;
  };
}

interface PageProps {
  params: { slug: string };
}

// --- Utility Functions ---
const getTimingsString = (day: DayAvailability): string => {
  if (day.fullDay) return "Full Day";
  if (!day.available) return "Not Available";

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60) % 12 || 12;
    const mins = minutes % 60;
    const meridiem = minutes < 720 ? "AM" : "PM";
    return `${hours}:${mins < 10 ? "0" : ""}${mins} ${meridiem}`;
  };

  return `${formatTime(day.timeSlots.from)} - ${formatTime(day.timeSlots.to)}`;
};

// --- API Call function for both Metadata and Page component ---
const getCounsellorDetails = async (
  slug: string
): Promise<CounsellorInSearchResults | null> => {
  // Mock backend server URL - replace with your actual URL
  const backendServer = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const response = await fetch(`${backendServer}/com/counsellor/${slug}`, {
      cache: "no-store", // Disable caching for dynamic data
    });
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Not found
      }
      throw new Error(
        `Failed to fetch counsellor details: ${response.statusText}`
      );
    }
    const data: CounsellorInSearchResults = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching counsellor details:", error);
    return null;
  }
};

// --- SEO Metadata Generation (Runs on the Server) ---
export async function generateMetadata({ params }: PageProps) {
  const counsellor = await getCounsellorDetails(params.slug);

  if (!counsellor) {
    return {
      title: "Counsellor Not Found",
      description: "The counsellor you are looking for does not exist.",
    };
  }

  return {
    title: `${counsellor.name} - ${counsellor.city} | Expert Counselling Services`,
    description: counsellor.about.substring(0, 150) + "...",
    openGraph: {
      title: `${counsellor.name} - ${counsellor.city} | Expert Counselling Services`,
      description: counsellor.about.substring(0, 150) + "...",
      images: [
        {
          url: counsellor.avatar,
          alt: `Profile picture of counsellor ${counsellor.name}`,
        },
      ],
    },
  };
}

// --- Main Server Component (Initial Render) ---
export default async function ({ params }: PageProps) {
  params = await params;
  const counsellor = await getCounsellorDetails(params.slug);

  if (!counsellor) {
    notFound();
  }

  // Days array for mapping
  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const timingString: string[] = counsellor.dayAvailability.map((day) =>
    getTimingsString(day)
  );

  return (
    <div className="w-full flex flex-col gap-x-10 gap-y-5 justify-center content-center my-16 mt-20 px-2 lg:flex-row lg:px-24 lg:items-start lg:gap-x-10">
      <div>
        <div className="flex flex-col max-w-[20rem] mx-auto md:flex-row md:max-w-max md:items-center md:gap-x-10 lg:mx-0">
          <div className="h-24 mx-auto aspect-square border border-gray-300 rounded-full overflow-hidden md:h-40">
            <Image
              src={counsellor.avatar}
              alt={`Counsellor ${counsellor.name}`}
              width={160}
              height={160}
              className="w-full h-full rounded-full mx-auto mb-4 object-cover"
            />
          </div>

          <div className="text-center md:text-left lg:w-[20rem]">
            <h1 className="text-lg font-bold cursor-pointer text-black mb-0 hover:underline">
              {counsellor.name}
            </h1>
            <div className="flex flex-col justify-center items-center md:flex-row md:justify-start md:gap-x-2">
              <div className="flex justify-center text-yellow-400">
                {/* Mock star rating with react-icons */}
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <div className="text-xs font-bold text-gray-600">
                1600 Reviews
              </div>
            </div>

            <h3 className="my-2 text-sm font-bold md:text-left text-gray-600 flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="w-4 h-4 mr-2 fill-blue-600 inline" />
              {counsellor.city}
            </h3>
            <div>
              {/* Hardcoded tags from the original component */}
              {["students", "professional", "Abroad Studies"].map((tag) => (
                <button
                  key={tag}
                  className="px-2 py-1 mr-2 my-1 md:my-0 capitalize rounded-full bg-blue-600 text-white font-semibold text-xs border border-blue-600 hover:bg-blue-800 cursor-pointer duration-150"
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="text-xs mt-2 text-gray-600">
              <span className="block sm:inline">
                Experience: {counsellor.experience || 0} years
              </span>
              <span className="hidden sm:inline">|</span>
              <span className="block sm:inline">
                Counselling: {counsellor.totalSessions} Sessions
              </span>
            </div>
            {/* Client-side component for modals and interactive elements */}
            <CounsellorProfileClient counsellor={counsellor} />
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-600 mt-10">
            Available Days
          </h2>
          <ul className="pl-4 list-disc list-inside">
            {counsellor.dayAvailability.map((day, index) => (
              <li key={index} className="text-xs text-gray-600 mb-1">
                <span className="text-black font-semibold mx-2">
                  {days[index]}:
                </span>
                <span className="text-blue-600 font-semibold">
                  {timingString[index]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full lg:max-w-[30rem]">
        <h2 className="text-lg font-bold text-black mb-0">
          About the counsellor
        </h2>
        <p className="text-sm text-gray-600 mb-0 text-balance">
          {counsellor.about}
        </p>
        {counsellor.degrees && counsellor.degrees.length > 0 && (
          <>
            <h2 className="text-lg font-bold text-black my-5 mb-0">
              Degree and Certifications
            </h2>
            <h2 className="text-sm text-gray-600 md:text-left">
              {counsellor.degrees.join(" | ")}
            </h2>
          </>
        )}
      </div>
    </div>
  );
}
