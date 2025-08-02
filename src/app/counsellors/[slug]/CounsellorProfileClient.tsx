"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CounsellorInSearchResults } from "@/interfaces/Counsellor";
import PopupModal from "@/components/Modals/PopUpModal";
import PopupForm from "@/components/Modals/PopUpForm";

interface AlertProps {
  message: string;
  type?: "green" | "red";
}

const Alert: React.FC<AlertProps> = ({ message, type = "green" }) => (
  <div
    className={`fixed bottom-4 right-4 p-4 rounded-lg text-white shadow-lg ${
      type === "green" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    {message}
  </div>
);

interface CounsellorProfileClientProps {
  counsellor: CounsellorInSearchResults;
}

export default function CounsellorProfileClient({
  counsellor,
}: CounsellorProfileClientProps) {
  const [isBookAppointmentModalOpen, setIsBookAppointmentModalOpen] =
    useState(false);
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "green" | "red";
  } | null>(null);
  const router = useRouter();

  const loggedIn = () => {
    // Check for tokens only on the client side
    return (
      typeof window !== "undefined" &&
      (!!localStorage.getItem("token") || !!localStorage.getItem("user_id"))
    );
  };

  const showAlert = (message: string, type: "green" | "red" = "green") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const submitForm = async (data: PopupForm) => {
    if (!data.isFormValid) {
      showAlert("Please fill all the fields properly", "red");
      return;
    }

    setLoading(true);
    // Mock API call for booking appointment
    const backendServer =
      process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";
    try {
      const response = await fetch(`${backendServer}/com/bookappointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          counsellor: counsellor.commonid,
          client: localStorage.getItem("commonid"), // Accessing localStorage on client-side
          selectedDate: data.selectedDate,
          grade: data.grade,
          notes: data.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error booking appointment");
      }

      showAlert("Appointment booked successfully");
      setIsBookAppointmentModalOpen(false);
    } catch (error: any) {
      console.error(error);
      showAlert(error.message || "Error booking appointment", "red");
      setIsBookAppointmentModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const openBookAppointmentModal = () => {
    if (loggedIn()) {
      setIsBookAppointmentModalOpen(true);
    } else {
      setIsLoginRequiredModalOpen(true);
    }
  };

  const handleLoginRequiredModalOk = () => {
    setIsLoginRequiredModalOpen(false);
    router.push(`/login?redirect_url=${window.location.pathname}`);
  };

  return (
    <>
      <button
        onClick={openBookAppointmentModal}
        className="mx-auto w-fit rounded-full flex z-10 mt-4 hover:shadow-md lg:mx-0 py-1 pl-6 pr-2 bg-blue-600 hover:bg-blue-700 text-xs lg:text-md items-center gap-8 cursor-pointer border border-white duration-150"
      >
        <span className="font-bold text-white transition-all">
          Request for Appointment
        </span>
        <Image
          width={28}
          height={28}
          src="/assets/images/psychometrics/arrow2.svg"
          alt="arrow2"
        />
      </button>

      <div className="flex justify-between mt-4">
        <Link href="https://app.careernaksha.com/appointments" target="_blank">
          <span className="text-xs cursor-pointer font-bold text-black underline decoration-black underline-offset-1">
            Go to my appointments
          </span>
        </Link>
        <Link href={`/counsellors/${counsellor.slug}/message`}>
          <span className="text-xs cursor-pointer font-bold text-black underline decoration-black underline-offset-1">
            Leave a Message
          </span>
        </Link>
      </div>

      {isBookAppointmentModalOpen && (
        <PopupForm
          loading={loading}
          onSubmit={submitForm}
          onClose={() => setIsBookAppointmentModalOpen(false)}
        />
      )}

      <PopupModal
        isOpen={isLoginRequiredModalOpen}
        title="Login Required"
        showArrowOnOk={false}
        onOkayClick={handleLoginRequiredModalOk}
        onCancelClick={() => setIsLoginRequiredModalOpen(false)}
      >
        <p className="text-gray-700">Please login to book an appointment.</p>
      </PopupModal>
      {alert && <Alert message={alert.message} type={alert.type} />}
    </>
  );
}
