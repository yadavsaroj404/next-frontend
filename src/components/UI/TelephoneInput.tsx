// components/TelephoneInput.tsx
"use client";

import dynamic from "next/dynamic";
import React, { FC, useState } from "react";
import "intl-tel-input/styles";

// Dynamically import the React adapter *only* on the client
const IntlTelInput = dynamic(
  async () => {
    const mod = await import("intl-tel-input/reactWithUtils");
    return mod.default;
  },
  { ssr: false }
);

interface TelephoneInputProps {
  onChangeNumber?: (value: string, isValid: boolean) => void;
  value?: string;
}

const TelephoneInput: FC<TelephoneInputProps> = ({ onChangeNumber, value }) => {
  const [number, setNumber] = useState(value || "");
  const [isValid, setIsValid] = useState(false);

  return (
    <div className="relative w-full">
      <IntlTelInput
        initialValue={number}
        onChangeNumber={(num: string) => {
          setNumber(num);
          onChangeNumber?.(num, isValid);
        }}
        onChangeValidity={(valid: boolean) => {
          setIsValid(valid);
          onChangeNumber?.(number, valid);
        }}
        initOptions={{
          initialCountry: "IN",
          separateDialCode: true,
          fixDropdownWidth: true,
          formatAsYouType: true,
        }}
        inputProps={{
          className:
            "w-full py-3 px-3 border-[0.5px] border-smallheading border-opacity-50 rounded-md disabled:text-smallheading h-full focus:outline-none",
          placeholder: "Mobile Number",
          "aria-describedby": "callback-help",
          "aria-label": "Mobile Number",
        }}
      />
    </div>
  );
};

export default TelephoneInput;
