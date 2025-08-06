"use client";

import React, { ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

// --- Props for PaginationControls Component ---
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  cardsPerPage: number;
  totalBlogsCount: number;
}

// --- PaginationControls Component (Client Component) ---
// Handles the interactive pagination UI and updates URL search parameters.
const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  cardsPerPage,
  totalBlogsCount,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper to create new URLSearchParams with updated values
  const createQueryString = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([name, value]) => {
      params.set(name, value);
    });
    return params.toString();
  };

  // Handles changing the current page by updating the URL.
  const handlePageChange = (newPage: number) => {
    // Ensure newPage is at least 1 and not more than totalPages
    const validatedPage = Math.max(1, Math.min(totalPages, newPage));
    // Use the new helper to set a single parameter
    router.push(`?${createQueryString({ page: validatedPage.toString() })}`);
  };

  // Handles input change for the current page number.
  const handlePageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      return; // Do nothing if input is not a number
    }
    handlePageChange(value);
  };

  // Handles input change for the number of cards to display per page.
  const handleCardsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const newPerPage = isNaN(value) || value < 1 ? "1" : value.toString();

    router.push(`?${createQueryString({ per_page: newPerPage, page: "1" })}`);
  };

  return (
    <nav
      aria-label="Blog post pagination"
      className="flex justify-between px-8 mb-5 flex-col items-center md:flex-row md:items-center"
    >
      {/* Items per page control (visible on medium screens and up) */}
      <div className="hidden md:flex items-center text-gray-700">
        Show
        <input
          type="number"
          value={cardsPerPage}
          onChange={handleCardsPerPageChange}
          className="w-10 h-10 mx-2 border border-gray-400 focus:outline outline-2 outline-blue-600 focus:outline-offset-2 text-gray-600 text-center rounded-md transition-all ease-in duration-75 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          min="1"
          aria-label="Number of articles per page"
        />
        per page
      </div>

      {/* Pagination Navigation Buttons */}
      <div className="flex items-center mt-4 md:mt-0">
        <button
          onClick={() => handlePageChange(1)} // Go to first page
          disabled={currentPage === 1}
          className="mx-0.5 p-2 text-center border border-gray-300 rounded-md overflow-hidden text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-400 transition-colors cursor-pointer"
          aria-label="Go to first page"
        >
          <Image
            src="/assets/images/icons/double-left-arrow.svg"
            alt="First page icon"
            width={24}
            height={24}
          />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)} // Go to previous page
          disabled={currentPage === 1}
          className="mx-0.5 p-3 text-center border border-gray-300 rounded-md overflow-hidden text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-400 transition-colors cursor-pointer"
          aria-label="Go to previous page"
        >
          <Image
            src="/assets/images/icons/left-arrow.svg"
            alt="Previous page icon"
            width={16}
            height={16}
          />
        </button>
        <input
          type="number" // Use type="number" for better input experience
          value={currentPage}
          onChange={handlePageInputChange}
          className="w-12 h-10 mx-1 border border-gray-400 focus:outline outline-2 outline-blue-400 focus:outline-offset-2 text-gray-600 text-center rounded-md transition-all ease-in duration-75 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          min="1"
          max={totalPages}
          aria-label={`Current page, out of ${totalPages}`}
        />
        <button
          onClick={() => handlePageChange(currentPage + 1)} // Go to next page
          disabled={currentPage === totalPages}
          className="mx-0.5 p-3 text-center border border-gray-300 rounded-md overflow-hidden text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-400 transition-colors cursor-pointer"
          aria-label="Go to next page"
        >
          <Image
            src="/assets/images/icons/right-arrow.svg"
            alt="Next page icon"
            width={16}
            height={16}
          />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)} // Go to last page
          disabled={currentPage === totalPages}
          className="mx-0.5 p-2 text-center border border-gray-300 rounded-md overflow-hidden text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-400 transition-colors cursor-pointer"
          aria-label="Go to last page"
        >
          <Image
            src="/assets/images/icons/double-right-arrow.svg"
            alt="Last page icon"
            width={24}
            height={24}
          />
        </button>
        <span className="ml-4 text-gray-700">
          Page {currentPage} of {totalPages} ({totalBlogsCount} articles total)
        </span>
      </div>
    </nav>
  );
};

export default PaginationControls;
