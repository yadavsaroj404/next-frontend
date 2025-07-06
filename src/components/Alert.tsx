"use client";

import { useState } from "react";
import Image from "next/image";

interface AlertProps {
  title?: string;
  message?: string;
  type?: string;
  show?: boolean;
  onClose?: () => void;
  disableClose?: boolean;
  children?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  title = "Title",
  message = "",
  type,
  show = true,
  onClose = () => {},
  disableClose = false,
  children,
}) => {
  const [visible, setVisible] = useState(show);

  const handleClose = () => {
    if (disableClose) return;
    setVisible(false);
    onClose();
  };

  if (!visible) return null;

  // Determine icon based on type
  const iconSrc =
    type === "error"
      ? "/assets/images/icons/error.svg"
      : "/assets/images/icons/info.svg"; // adjust for other types as needed

  return (
    <div className="tw-flex tw-items-center tw-gap-3 tw-fixed tw-mt-10 tw-w-3/4 md:tw-w-96 tw-bg-red-100 tw-border-t-4 tw-border-red-400 tw-p-2 tw-px-4 tw-rounded-md tw-shadow-md tw-left-1/2 -tw-translate-x-1/2 tw-z-50">
      <div>
        <Image src={iconSrc} alt={type || "alert"} width={24} height={24} />
      </div>
      <div className="tw-w-10/12">
        <div className="tw-text-red-800 tw-font-semibold">{title}</div>
        <div className="tw-text-red-700">{message ? message : children}</div>
      </div>
      {!disableClose && (
        <div
          className="tw-absolute tw-grid tw-place-content-center tw-right-3 tw-cursor-pointer tw-w-8 tw-h-8 tw-rounded-full hover:tw-bg-red-200 tw-transition tw-duration-300 tw-ease-in-out tw-select-none"
          onClick={handleClose}
        >
          <Image
            src="/assets/images/icons/cross.svg"
            alt="Close"
            width={16}
            height={16}
          />
        </div>
      )}
    </div>
  );
};

export default Alert;
