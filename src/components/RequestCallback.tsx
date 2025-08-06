"use client";

import TelephoneInputWithButton from "./TelephoneInputWithButton";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_URL;

interface RequestCallbackProps {
  className?: string;
  buttonText?: string;
  onRequest?: (phone: string) => void;
}
export default function RequestCallback({
  className,
  buttonText = "Talk to an Expert",
  onRequest,
}: RequestCallbackProps) {
  const requestCallback = async (phone: string, isValid: boolean) => {
    if (!isValid || phone.length < 10) return;

    try {
      const res = await fetch(`${backendServer}/other/requestCallback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phone }),
      });

      // if (res.status === 200) {
      //   setAlert({
      //     message: "Your Expert Counsellor will be in touch soon",
      //     type: "success",
      //   });
      // } else if (res.status === 201) {
      //   setAlert({
      //     message: "Your request is already received - please login!",
      //     type: "error",
      //   });
      // } else {
      //   setAlert({
      //     message: "Unexpected response. Please try again.",
      //     type: "error",
      //   });
      // }
    } catch (err) {
      console.error(err);
      // setAlert({ message: "Network error. Please try again.", type: "error" });
    }

    // auto-clear alert
    // setTimeout(() => setAlert(null), 5000);
  };

  return (
    <TelephoneInputWithButton
      onRequest={requestCallback}
      buttonText="Talk to an Expert"
    />
  );
}
