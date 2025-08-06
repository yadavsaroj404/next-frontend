"use client";

import TelephoneInputWithButton from "@/components/TelephoneInputWithButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function KnowMore() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onRequest = async (number: string, isValid: boolean) => {
    if (loading) return;
    if (!isValid) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/other/downloadBrochure`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: number,
            email,
            brochure: "NCCP Brochure",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to download brochure");
      }
      router.push("/NCCP Brochure.pdf");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setEmail(""); // Clear the email input after request
    }
  };

  return (
    <section className="w-full" aria-labelledby="brochure-heading">
      <h2
        id="brochure-heading"
        className="w-screen text-center px-6 font-semibold mt-20"
      >
        Know More details about this program. Click on button to download our
        detailed brochure
      </h2>
      <div className="w-screen flex flex-col items-center mt-6 px-6">
        <div className="max-w-md w-full rounded-lg border border-blue-600">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            id="email-input"
            className="outline-none w-full px-4 py-2 rounded-lg placeholder:font-semibold font-semibold"
          />
        </div>
        <TelephoneInputWithButton
          buttonText="Download Brochure"
          onRequest={onRequest}
          className="mt-4"
        />
      </div>
    </section>
  );
}
