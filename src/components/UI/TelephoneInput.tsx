"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import "intl-tel-input/styles";

// Dynamically import the React adapter *only* on the client
const IntlTelInput = dynamic(
  async () => {
    const mod = await import("intl-tel-input/reactWithUtils");
    return mod.default;
  },
  { ssr: false, loading: () => <div>Loading...</div> }
);

interface TelephoneInputProps {
  onChangeNumber?: (value: string, isValid: boolean) => void;
  className?: string;
  value?: string;
  placeholder?: string;
}

export default function TelephoneInput({
  onChangeNumber,
  className = "",
  value = "",
  placeholder = "Mobile Number",
}: TelephoneInputProps) {
  const [valid, setValid] = useState(false);
  const [number, setNumber] = useState(value);

  return (
    <div className={`relative w-full ${className}`}>
      <IntlTelInput
        initialValue={value}
        usePreciseValidation
        onChangeNumber={(num: string) => {
          setNumber(num);
          onChangeNumber?.(num, valid);
        }}
        onChangeValidity={(v: boolean) => {
          setValid(v);
          console.log("Validity changed:", v);
          onChangeNumber?.(number, v);
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
          placeholder: placeholder,
          "aria-describedby": "callback-help",
          "aria-label": "Mobile Number",
        }}
      />
    </div>
  );
}
