"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AVAILABLE_GRADES = [
  "8th or below",
  "9th or 10th",
  "11th or 12th",
  "UG/PG",
  "Working Professional",
];
type PricingPlan =
  | "Free Psychometric Test"
  | "Paid Psychometric Test"
  | "Paid Psychometric Test w/ Counselling";

interface Props {
  plan: string;
  onClose: () => void;
}
export default function PricingModal({ plan, onClose }: Props) {
  // main form state
  const router = useRouter();

  // modal form state
  const [modalEmail, setModalEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [modalPhone, setModalPhone] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(AVAILABLE_GRADES[0]);

  const handleModalClose = () => {
    onClose();
  };

  const handleModalSubmit = async () => {
    // simple email/mobile validation
    if (!modalEmail.includes("@") || modalPhone.length !== 10) return;

    // TODO: replace it with cookies for SSR compatibility
    // localStorage.setItem("psychoMobile", modalPhone);
    // localStorage.setItem("psychoEmail", modalEmail);
    // localStorage.setItem("psychoLooking", selectedPlan);
    // localStorage.setItem("psychoCurrent", selectedGrade);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/psychometrics/createPsychometricsUser`,
        {
          mobile: modalPhone,
          email: modalEmail,
          currentlyIn: selectedGrade,
          lookingFor: plan,
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      // route to appropriate next page
      if (plan === "Free Psychometric Test") {
        router.push("/psychometrics/test");
      } else {
        router.push("/psychometrics/payment");
      }
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = event.target.value;
    setModalEmail(email);

    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
      email
    );
    if (!isEmailValid) {
      setEmailError("Invalid Email");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleModalClose}
      ></div>

      {/* modal */}
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Personal Details
          </h3>
          <button
            onClick={handleModalClose}
            className="text-gray-500 cursor-pointer hover:text-gray-700"
          >
            <svg
              className="h-4 w-4 inline-block ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleModalSubmit();
          }}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="modal-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            {emailError && (
              <p className="text-red-500 text-sm mt-1">Invalid Email</p>
            )}
            <input
              id="modal-email"
              type="email"
              value={modalEmail}
              onChange={handleEmailChange}
              onBlur={handleEmailChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="modal-phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            {mobileError && (
              <p className="text-red-500 text-sm mt-1">Invalid mobile number</p>
            )}
            <input
              id="modal-phone"
              type="tel"
              value={modalPhone}
              onChange={(e) => setModalPhone(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Mobile Number"
              required
            />
          </div>

          {/* Grade selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grade
            </label>
            <input type="hidden" name="grade" value={selectedGrade} />
            <div className="mt-2 flex flex-wrap gap-2">
              {AVAILABLE_GRADES.map((grade) => {
                const active = grade === selectedGrade;
                return (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setSelectedGrade(grade)}
                    className={`inline-block px-3 py-2 rounded cursor-pointer border font-medium ${
                      active
                        ? "bg-purple-400/40 border-purple-800 text-purple-800"
                        : "bg-transparent border-purple-800 text-purple-800"
                    }`}
                  >
                    {grade}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
            >
              {plan === "Free Psychometric Test" ? "Start Test" : "Purchase"}
              <svg
                className="h-4 w-4 inline-block ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
