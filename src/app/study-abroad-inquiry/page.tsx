"use client";

import React, { useState, JSX, FC } from "react";
import Link from "next/link";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { PiCheckCircleBold } from "react-icons/pi";
import TelephoneInput from "@/components/UI/TelephoneInput";

// --- Type Definitions ---
// Interface for a single country object
interface Country {
  name: string;
  img: string;
}

// Interface for the complete form data
interface FormData {
  country: string;
  intake: string;
  degree: string;
  education: string;
  percentage: string;
  degYear: string;
  passport: string;
  ielts: string;
  uniAdmit: string;
  help: string;
  city: string;
}

// Interface for the reusable OptionButton component props
interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

// --- Centralized Data ---
const COUNTRIES: Country[] = [
  { name: "Canada", img: "/assets/images/globalvidhya/cca.png" },
  { name: "Germany", img: "/assets/images/globalvidhya/cgr.png" },
  {
    name: "Australia",
    img: "/assets/images/globalvidhya/caus.png",
  },
  { name: "USA", img: "/assets/images/globalvidhya/cusa.png" },
  { name: "France", img: "/assets/images/globalvidhya/cfr.png" },
  { name: "UK", img: "/assets/images/globalvidhya/cuk.png" },
];

const INTAKES: string[] = ["Jan 2025", "May 2025", "Sept 2025"];

const DEGREES: string[] = [
  "PG Diploma",
  "Masters",
  "Bachelors",
  "MBA",
  "PhD",
  "Not Decided",
];

const EDUCATION_LEVELS: string[] = [
  "10th Standard",
  "12th Standard",
  "Bachelors Degree",
  "Masters Degree",
  "MBBS/MD",
];

const PASSPORT_STATUS: string[] = ["Yes", "Applied", "No"];

const HELP_OPTIONS: string[] = [
  "I want Admission Help",
  "I want University Shortlist",
  "I want PR/Job only",
  "I want Visa Assistance",
  "I want to check Admit Eligibility",
  "I want IELTS Preparation",
];

// Reusable Button component to reduce JSX clutter and improve readability
const OptionButton: FC<OptionButtonProps> = ({
  label,
  isSelected,
  onClick,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`${className} w-10/12 block my-2 mx-auto text-center py-3 border rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
      isSelected
        ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold shadow-md"
        : "border-gray-300 text-gray-700 bg-white hover:border-blue-500 hover:bg-gray-50"
    }
    `}
  >
    <span className="align-middle mr-2">{label}</span>
    {isSelected && (
      <PiCheckCircleBold size={20} className="inline align-middle" />
    )}
  </button>
);

// Main form component
export default function StudyAbroadInquiry() {
  // Use a single state object for all form data
  const [formData, setFormData] = useState<FormData>({
    country: "",
    intake: "",
    degree: "",
    education: "",
    percentage: "",
    degYear: "",
    passport: "",
    ielts: "Not Decided",
    uniAdmit: "",
    help: "",
    city: "",
  });

  // this telNum cannot be part of formData because it is causing race condition (infinite console logs)
  // I don't know the reason, but it is not working when part of formData
  // so I am keeping it separate
  const [telNum, setTelNum] = useState<string>("");
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // General handler for all button clicks that update a form field
  const handleButtonClick = (field: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneNumberChange = (number: string, isValid: boolean) => {
    setTelNum(number);
  };

  const goBack = () => {
    setCurrentSection((prevSection) => Math.max(0, prevSection - 1));
  };

  const continueStep = () => {
    // Basic validation based on the current step
    switch (currentSection) {
      case 0:
        if (formData.country) setCurrentSection(1);
        break;
      case 1:
        if (formData.intake && formData.degree) setCurrentSection(2);
        break;
      case 2:
        if (
          formData.education &&
          formData.percentage &&
          formData.degYear &&
          formData.passport
        ) {
          setCurrentSection(3);
        }
        break;
      case 3:
        if (
          formData.ielts &&
          formData.uniAdmit &&
          formData.help &&
          formData.city
        ) {
          setCurrentSection(4);
        }
        break;
      case 4:
        if (telNum) {
          submitForm();
        }
        break;
      default:
        break;
    }
  };

  const submitForm = () => {
    setIsSubmitted(true);
    setCurrentSection(5);
  };

  // Utility to determine if the next button should be enabled
  const isContinueEnabled = (): boolean => {
    switch (currentSection) {
      case 0:
        return !!formData.country;
      case 1:
        return !!formData.intake && !!formData.degree;
      case 2:
        return (
          !!formData.education &&
          !!formData.percentage &&
          !!formData.degYear &&
          !!formData.passport
        );
      case 3:
        return (
          !!formData.ielts &&
          !!formData.uniAdmit &&
          !!formData.help &&
          !!formData.city
        );
      case 4:
        return !!telNum;
      default:
        return false;
    }
  };

  const ContinueButton = () => (
    <button
      onClick={continueStep}
      disabled={!isContinueEnabled()}
      className={`block px-8 py-3 mx-auto my-5 rounded-lg font-semibold transition-all duration-300 ease-in-out cursor-pointer 
                  ${
                    isContinueEnabled()
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
    >
      Continue
    </button>
  );

  const renderSection = (): JSX.Element | null => {
    switch (currentSection) {
      case 0:
        return (
          <>
            <div className="text-3xl text-blue-500 w-full text-center font-bold">
              We would love to know more about you to chart your study abroad
              path
            </div>
            <div className="text-2xl text-gray-700 w-full text-center font-bold mt-8">
              Choose your dream country
            </div>
            <div className="max-w-3xl mx-auto flex gap-8 flex-wrap justify-center items-center mt-8">
              {COUNTRIES.map((country: Country) => (
                <button
                  key={country.name}
                  onClick={() => handleButtonClick("country", country.name)}
                  className={`
                    rounded-lg cursor-pointer w-full lg:max-w-[13rem] max-w-[6rem] flex flex-col items-center gap-2 border p-2 transition-all duration-300 ease-in-out
                    ${
                      formData.country === country.name
                        ? "bg-blue-50 border-blue-500 shadow-md scale-105"
                        : "bg-white border-gray-200 hover:bg-gray-100"
                    }
                  `}
                >
                  {/* The original image assets were missing, so I've used placeholders. */}
                  <img
                    src={country.img}
                    alt={country.name}
                    className="w-full h-auto rounded"
                  />
                  <span
                    className={`font-semibold py-2 lg:text-base text-xs text-center ${
                      formData.country === country.name
                        ? "text-blue-700"
                        : "text-gray-800"
                    }`}
                  >
                    {country.name}
                  </span>
                </button>
              ))}
            </div>
            <ContinueButton />
          </>
        );
      case 1:
        return (
          <>
            <div className="text-2xl text-gray-700 text-center font-bold mt-8">
              What's your preferred intake?
            </div>
            {INTAKES.map((intake: string) => (
              <OptionButton
                key={intake}
                label={intake}
                isSelected={formData.intake === intake}
                onClick={() => handleButtonClick("intake", intake)}
              />
            ))}
            <div className="text-2xl text-gray-700 text-center font-bold mt-8">
              What do you wish to pursue?
            </div>
            {DEGREES.map((degree: string) => (
              <OptionButton
                key={degree}
                label={degree}
                isSelected={formData.degree === degree}
                onClick={() => handleButtonClick("degree", degree)}
              />
            ))}

            <ContinueButton />
          </>
        );
      case 2:
        return (
          <>
            <div className="text-2xl text-gray-700 text-center font-bold mt-8">
              What's your highest level of education?
            </div>
            {EDUCATION_LEVELS.map((education: string) => (
              <OptionButton
                key={education}
                label={education}
                isSelected={formData.education === education}
                onClick={() => handleButtonClick("education", education)}
              />
            ))}
            <div className="text-2xl text-gray-700 w-full text-center font-bold mt-8">
              Expected or Gained Percentage Grades
            </div>
            <div className="text-center space-x-5">
              <input
                onChange={handleInputChange}
                value={formData.percentage}
                type="text"
                name="percentage"
                placeholder="Percentage"
                id="percentage"
                className="max-w-md w-5/12 mt-8 border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                onChange={handleInputChange}
                value={formData.degYear}
                type="text"
                name="degYear"
                id="degYear"
                placeholder="Year of Graduation"
                className="max-w-md w-5/12 mt-4 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="text-2xl text-gray-700 w-full text-center font-bold mt-8">
              Do you have a valid Passport?
            </div>
            {PASSPORT_STATUS.map((status: string) => (
              <OptionButton
                key={status}
                label={status}
                isSelected={formData.passport === status}
                onClick={() => handleButtonClick("passport", status)}
              />
            ))}

            <ContinueButton />
          </>
        );
      case 3:
        return (
          <>
            <div className="text-center space-x-5">
              <h1 className="text-2xl text-gray-700 inline-block font-bold mt-8">
                IELTS/TOEFL/PTE/Duolingo status
              </h1>
              <select
                onChange={(e) => handleButtonClick("ielts", e.target.value)}
                value={formData.ielts}
                name="ielts"
                id="ielts-status"
                className="inline-block mt-8 border border-gray-300 rounded-lg px-4 py-2 bg-white"
              >
                <option value="Not Decided">Not Decided</option>
                <option value="Already Gave the Exam">
                  Already Gave the Exam
                </option>
                <option value="Booked the Exam">Booked the Exam</option>
                <option value="Planning to give the Exam">
                  Planning to give the Exam
                </option>
              </select>
            </div>
            <div className="text-2xl text-gray-700 w-full text-center font-bold mt-8">
              Do you already have a university admit?
            </div>
            <OptionButton
              label="Yes"
              isSelected={formData.uniAdmit === "Yes"}
              onClick={() => handleButtonClick("uniAdmit", "Yes")}
            />
            <OptionButton
              label="No"
              isSelected={formData.uniAdmit === "No"}
              onClick={() => handleButtonClick("uniAdmit", "No")}
            />
            <div className="text-2xl text-gray-700 w-full text-center font-bold mt-8">
              What are you looking for?
            </div>
            {HELP_OPTIONS.map((help: string) => (
              <OptionButton
                key={help}
                label={help}
                isSelected={formData.help === help}
                onClick={() => handleButtonClick("help", help)}
              />
            ))}
            <div className="text-2xl text-gray-700 w-full text-center font-bold mt-8">
              What is your current city?
            </div>
            <input
              onChange={handleInputChange}
              value={formData.city}
              type="text"
              name="city"
              id="city"
              placeholder="Eg. Vadodara"
              className="max-w-md w-full block mx-auto mt-8 border border-gray-300 rounded-lg px-4 py-2"
            />
            <ContinueButton />
          </>
        );
      case 4:
        return (
          <>
            <div className="text-2xl text-gray-700 w-full text-center font-bold mt-8">
              Your Mobile Number
            </div>
            {/* Simple phone number input for demonstration */}
            <TelephoneInput
              value={telNum}
              onChangeNumber={handlePhoneNumberChange}
              className="flex justify-center my-5"
            />
            <ContinueButton />
          </>
        );
      case 5:
        return (
          <>
            <div className="w-full flex justify-center flex-col items-center">
              <div className="text-3xl text-blue-500 w-full text-center font-bold max-w-2xl">
                Thank You!
              </div>
              <div className="text-2xl text-gray-700 w-full text-center font-bold mt-8">
                We'll Get back to you shortly!
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-8 flex justify-center items-center py-20 bg-gray-50 min-h-screen">
      <div className="max-w-[1440px] w-full flex flex-col justify-center items-center">
        {currentSection > 0 && !isSubmitted && (
          <button
            onClick={goBack}
            className="text-center cursor-pointer self-start text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300 mb-8"
          >
            <IoArrowBackCircleOutline className="inline" />
            <span className="align-middle ml-1">Back</span>
          </button>
        )}
        {isSubmitted && (
          <Link
            href="/globalvidhya"
            className="flex items-center self-start text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300 mb-8"
          >
            <IoArrowBackCircleOutline className="inline" />
            <span className="align-middle ml-1">Back to Home</span>
          </Link>
        )}
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-5xl">
          {/* <RenderSection /> */}
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
