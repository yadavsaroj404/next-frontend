import React, { FC, ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

// Define the props interface for the component
interface PopupModalProps {
  isOpen: boolean;
  title: string;
  okText?: string;
  cancelText?: string;
  onOkayClick: () => void;
  onCancelClick: () => void;
  children: ReactNode;
  showArrowOnOk?: boolean;
}

const PopupModal: FC<PopupModalProps> = ({
  isOpen,
  title,
  okText = "Ok",
  cancelText = "Cancel",
  onOkayClick,
  onCancelClick,
  children,
  showArrowOnOk = true,
}) => {
  // Return null if the modal is not open
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed sm:inset-5 md:inset-0 z-[100] flex items-center justify-center font-inter">
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onCancelClick}></div>

      {/* Modal content container */}
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        {/* Modal header with title and close button */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onCancelClick}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        {/* Modal body with dynamic content and action buttons */}
        <div className="space-y-4">
          {children} {/* Renders the content passed into the component */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancelClick}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onOkayClick}
              type="button"
              className="flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
            >
              {okText}
              {showArrowOnOk && (
                <MdKeyboardArrowRight className="h-4 w-4 ml-2 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
