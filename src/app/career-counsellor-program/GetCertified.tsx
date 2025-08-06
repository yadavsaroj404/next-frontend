"use client";
import TelephoneInputWithButton from "@/components/TelephoneInputWithButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GetCertified() {
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
    }
  };
  return (
    <TelephoneInputWithButton
      buttonText="Get Certified"
      onRequest={onRequest}
      className="my-4"
    />
  );
}
