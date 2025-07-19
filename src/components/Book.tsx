"use client";

import { useState, useEffect, useCallback } from "react";
import { getDecodedAccessToken } from "@/shared/util";

interface BookAppointmentProps {
  onClose: () => void;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState("");
  const [counsellorName, setCounsellorName] = useState("");

  // Initialize from localStorage on client only
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token") || "";
    const decoded = getDecodedAccessToken(token as string);
    setUserId(decoded?._id || "");
    setCounsellorName(localStorage.getItem("c_name") || "");
  }, []);

  const sendData = useCallback(async () => {
    const appoData = { name, date, time, Counsellor_Name: counsellorName, id: userId };
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appoData),
      });
      // Optionally handle response
      console.log(await res.json());
    } catch (err) {
      console.error(err);
    }
    onClose();
  }, [name, date, time, counsellorName, userId, onClose]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-md w-full">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">Book an Appointment</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendData();
        }}
        className="flex flex-col gap-4"
      >
        <label className="flex flex-col text-white font-bold text-lg">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-white bg-[#009da7] text-white p-2 h-10 rounded"
            required
          />
        </label>

        <label className="flex flex-col text-white font-bold text-lg">
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-white bg-[#009da7] text-white p-2 h-10 rounded"
            required
          />
        </label>

        <label className="flex flex-col text-white font-bold text-lg">
          Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-white bg-[#009da7] text-white p-2 h-10 rounded"
            required
          />
        </label>

        <button 
          type="submit"
          className="h-9 font-medium border border-white bg-[#00a79d] text-white rounded focus:outline-none hover:scale-105 transition-all"
        >
          Book
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
