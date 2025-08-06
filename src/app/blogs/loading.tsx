"use client";
export default function Loading() {
  return (
    <section
      className="flex justify-center items-center h-96"
      aria-live="polite"
    >
      <p className="text-xl text-blue-600">Loading blog posts...</p>
    </section>
  );
}
