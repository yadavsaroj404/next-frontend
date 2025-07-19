"use client";

import { useState } from "react";
import TelephoneInput from "./UI/TelephoneInput";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RequestCallback() {
  // state for phone & validity
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);

  const requestCallback = async () => {
    if (!isValid || phone.length < 10) return;

    try {
      const res = await fetch(`${backendServer}/other/requestCallback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phone }),
      });

      // reset input on submit
      setPhone("");
      setIsValid(false);

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
      // telRef.current?.reset();
      setPhone("");
      setIsValid(false);
      // setAlert({ message: "Network error. Please try again.", type: "error" });
    }

    // auto-clear alert
    // setTimeout(() => setAlert(null), 5000);
  };

  return (
    <div className="flex justify-center gap-4 flex-col lg:flex-row">
      <div className="relative items-center flex">
        <TelephoneInput
          value={phone}
          onChangeNumber={(value, valid) => {
            setPhone(value);
            setIsValid(valid);
          }}
        />
      </div>

      <button 
        onClick={requestCallback}
        disabled={!isValid}
        className="py-3 px-4 gradient-button rounded-lg before:rounded-lg font-semibold text-center lg:text-left"
      >
        Talk to an Expert
      </button>
    </div>
  );
}
