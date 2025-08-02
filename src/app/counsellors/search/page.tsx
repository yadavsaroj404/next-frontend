"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaSearch } from "react-icons/fa"; // Updated to use react-icons
import CounsellorList from "@/components/CounsellorList";
import { CounsellorInSearchResults } from "@/interfaces/Counsellor";
import Spinner from "@/components/loader/Spinner";

// --- Constants ---
const FILTERS: Array<{ title: string; options: string[] }> = [
  {
    title: "I am a ...",
    options: ["student", "working professional", "counsellor", "institute"],
  },
  {
    title: "Day available",
    options: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
];

export default function CounsellorSearch() {
  const [indexOfExpandedDropdown, setIndexOfExpandedDropdown] =
    useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [counsellorResults, setCounsellorResults] = useState<
    CounsellorInSearchResults[]
  >([]);

  // State for search form inputs, initialized from URL search params
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchData, setSearchData] = useState({
    name: searchParams.get("name") || "",
    location: searchParams.get("location") || "",
  });

  const [selectedFilters, setSelectedFilters] = useState<
    Array<{ title: string; value: string }>
  >([
    { title: "I am a ...", value: "" },
    { title: "Day available", value: "" },
  ]);

  const fetchCounsellors = async (name: string, location: string) => {
    if (!name && !location) {
      setCounsellorResults([]);
      return;
    }
    setLoading(true);
    try {
      // Replaced Angular HttpClient with a Promise-based fetch call
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.example.com"
        }/com/searchCounsellors?name=${name}&city=${location}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch counsellors");
      }
      const data: CounsellorInSearchResults[] = await response.json();

      // Calculate availability based on dayAvailability
      const processedData = data.map((counsellor) => ({
        ...counsellor,
        rating: counsellor.rating || 5,
        reviewsCount:
          counsellor.reviewsCount ||
          Math.floor((counsellor.name.length / 3) * 10),
        availability: counsellor.dayAvailability.filter((day) => day.available)
          .length,
      }));

      setCounsellorResults(processedData);
    } catch (error) {
      console.error("There was an error!", error);
      setCounsellorResults([]);
    } finally {
      setLoading(false);
    }
  };

  // --- useEffect Hook (replaces ngOnInit) ---
  useEffect(() => {
    const name = searchParams.get("name") || "";
    const location = searchParams.get("location") || "";
    setSearchData({ name, location });
    fetchCounsellors(name, location);
  }, [searchParams]);

  const toggleDropdown = (index: number) => {
    setIndexOfExpandedDropdown(indexOfExpandedDropdown === index ? -1 : index);
  };

  const closeDropdown = () => {
    setIndexOfExpandedDropdown(-1);
  };

  const selectOption = (filterIndex: number, value: string) => {
    const newSelectedFilters = [...selectedFilters];
    newSelectedFilters[filterIndex].value = value;
    setSelectedFilters(newSelectedFilters);
    closeDropdown();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchData.name) {
      queryParams.set("name", searchData.name);
    }
    if (searchData.location) {
      queryParams.set("location", searchData.location);
    }
    router.push(`/counsellors/search?${queryParams.toString()}`);
  };

  return (
    <section className="my-20 w-full font-inter" onClick={closeDropdown}>
      {/* top section */}
      <div className="my-10 max-w-7xl mx-auto">
        <div className="relative w-full">
          <form
            onSubmit={handleSearch}
            className="flex mx-auto gap-2 p-2 bg-[#204AF5] lg:rounded-full rounded-[2rem] z-20 lg:mt-8 mt-14 lg:flex-row flex-col w-full lg:w-fit items-center relative"
          >
            <input
              type="text"
              onChange={(e) =>
                setSearchData({ ...searchData, name: e.target.value })
              }
              value={searchData.name}
              name="name"
              placeholder="Search for Counsellors"
              className="bg-[#102FB1] w-full rounded-full p-4 text-white placeholder:text-gray-200 outline-none placeholder:text-center text-center lg:text-left lg:placeholder:text-left"
            />
            <input
              type="text"
              name="location"
              value={searchData.location}
              onChange={(e) =>
                setSearchData({ ...searchData, location: e.target.value })
              }
              placeholder="Location"
              className="bg-[#102FB1] w-full rounded-full p-4 text-white placeholder:text-gray-200 outline-none placeholder:text-center text-center lg:text-left lg:placeholder:text-left"
            />
            {FILTERS.map((filter, i) => (
              <div key={i} className="relative w-full lg:w-auto">
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the parent's onClick from closing the dropdown
                    toggleDropdown(i);
                  }}
                  className="bg-[#102FB1] w-full lg:w-[15rem] rounded-full p-4 cursor-pointer flex justify-between items-center"
                >
                  <span className="text-center w-full lg:text-left text-white">
                    {selectedFilters[i].value || filter.title}
                  </span>
                  <FaChevronDown
                    className={`w-4 h-4 text-white transition-transform duration-200 ${
                      indexOfExpandedDropdown === i ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {indexOfExpandedDropdown === i && (
                  <div className="flex flex-col overflow-hidden absolute bg-[#102FB1] lg:left-[0.35rem] rounded-xl top-[4rem] lg:min-w-[15rem] w-full z-10 shadow-xl">
                    <div className="text-sm font-semibold cursor-default text-white w-full px-4 py-3 border-b border-[#576AB9]">
                      {filter.title}
                    </div>
                    {filter.options.map((option) => (
                      <div
                        key={option}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectOption(i, option);
                        }}
                        className="text-sm cursor-pointer text-white w-full px-4 py-2 border-b capitalize border-[#576AB9] hover:bg-teal-500 transition-colors"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="bg-white text-[#204AF5] rounded-full cursor-pointer p-4 w-fit font-semibold hover:bg-blue-100 hover:text-blue-600 transition-all flex items-center gap-2"
            >
              <FaSearch className="h-5 w-5" />
              Search
            </button>
          </form>
        </div>
        {(searchData.name || searchData.location) && (
          <h1 className="text-lg text-center m-0 mt-5 font-bold">
            {counsellorResults.length} counsellors found for
            <span className="text-[#204AF5]"> your query</span>
          </h1>
        )}
      </div>

      {loading ? (
        <Spinner />
      ) : counsellorResults.length > 0 ? (
        <CounsellorList counsellors={counsellorResults} />
      ) : (
        <div className="w-full flex justify-center items-center flex-col mt-10 select-none text-center">
          <Image
            src="/assets/images/formdetails/about.png"
            alt="Search Counsellors"
            width={400}
            height={300}
          />
          <h1 className="text-2xl m-0 mt-5 font-bold">
            Search Counsellors
            <span className="text-[#204AF5]"> that suits you</span>
          </h1>
        </div>
      )}
    </section>
  );
}
