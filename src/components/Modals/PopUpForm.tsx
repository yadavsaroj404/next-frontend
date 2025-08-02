import React, { FC, useState, FormEvent } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

// Define the interface for the data submitted by the form.
interface PopupForm {
  isFormValid: boolean;
  selectedDate: string;
  grade: string;
  message: string;
}

// Define the props interface for the component.
interface PopupFormProps {
  loading: boolean;
  onSubmit: (data: PopupForm) => void;
  onClose: () => void;
}

const availableGrades = [
  "8th or below",
  "9th or 10th",
  "11th or 12th",
  "UG/PG",
  "Working Professional",
  "Counsellor",
];

const PopupForm: FC<PopupFormProps> = ({ loading, onSubmit, onClose }) => {
  // State for the form data
  const [formData, setFormData] = useState({
    message: "",
    selectedDate: "",
  });
  // State for the selected grade from the buttons
  const [selectedGrade, setSelectedGrade] = useState(availableGrades[0]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Check if the form is valid for submission
  const isFormValid = formData.message.length >= 10 && !!formData.selectedDate;

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({
        isFormValid: true,
        message: formData.message,
        grade: selectedGrade,
        selectedDate: formData.selectedDate,
      });
      // Optionally reset form after submission if needed
      // setFormData({ message: '', selectedDate: '' });
      // setSelectedGrade(availableGrades[0]);
    }
  };

  // Handle close action, also resets the form
  const handleClose = () => {
    setFormData({ message: "", selectedDate: "" });
    setSelectedGrade(availableGrades[0]);
    onClose();
  };

  return (
    <div className="fixed sm:inset-5 md:inset-0 z-[100] flex items-center justify-center font-inter">
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={handleClose}></div>

      {/* Modal content container */}
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        {/* Modal header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Appointment Details
          </h3>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        {/* The form itself */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              Your definition
            </label>
            {/* Render grade selection buttons */}
            <div className="flex flex-wrap gap-2 mt-1">
              {availableGrades.map((grade) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => setSelectedGrade(grade)}
                  className={`
                    inline-block p-2 px-3 rounded font-medium cursor-pointer border-purple-800 border text-purple-800
                    ${
                      grade === selectedGrade
                        ? "bg-purple-400/40"
                        : "bg-transparent"
                    }
                  `}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          <div>
            {/* Conditional error message for the message field */}
            {formData.message.length > 0 && formData.message.length < 10 && (
              <p className="text-red-500 text-sm mb-1">
                Message must be 10 characters long
              </p>
            )}
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 capitalize"
            >
              Reason for appointment
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-400 resize-none overflow-hidden"
              placeholder="Type your message here..."
              rows={3} // Set a minimum number of rows
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="selectedDate"
              className="block text-sm font-medium text-gray-700"
            >
              Select Date
            </label>
            <input
              type="date"
              id="selectedDate"
              name="selectedDate"
              value={formData.selectedDate}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleClose}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`
                flex gap-x-2 items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium text-white rounded-md transition-all
                ${
                  isFormValid && !loading
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }
              `}
            >
              Book appointment
              {loading ? (
                <FaSpinner className="animate-spin h-4 w-4 ml-2" />
              ) : (
                <MdKeyboardArrowRight className="h-4 w-4 ml-2 text-white" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
