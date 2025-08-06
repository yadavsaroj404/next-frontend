"use client";

import { useState } from "react";
import TelephoneInput from "./UI/TelephoneInput";

interface TelephoneInputWithButtonProps {
  className?: string;
  buttonText: string;
  placeholder?: string;
  onRequest: (phone: string, isValid: boolean) => void;
}
export default function TelephoneInputWithButton({
  className,
  buttonText,
  placeholder,
  onRequest,
}: TelephoneInputWithButtonProps) {
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);

  return (
    <div
      className={`flex justify-center lg:justify-start gap-4 flex-col lg:flex-row ${className}`}
    >
      <div className="relative items-center flex">
        <TelephoneInput
          value={phone}
          placeholder={placeholder}
          onChangeNumber={(value, valid) => {
            setPhone(value);
            setIsValid(valid);
          }}
        />
      </div>

      <button
        onClick={() => onRequest(phone, isValid)}
        // disabled={!isValid}
        className="py-3 px-4 gradient-button rounded-lg before:rounded-lg font-semibold text-center lg:text-left"
      >
        {buttonText}
      </button>
    </div>
  );
}
