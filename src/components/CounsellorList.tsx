import { CounsellorInSearchResults } from "@/interfaces/Counsellor";
import CounsellorCard from "./CounsellorCard";

export default function CounsellorList({
  counsellors,
  className = "",
}: {
  counsellors: CounsellorInSearchResults[];
  className?: string;
}) {
  return (
    <div
      className={`flex flex-row md:flex-col gap-y-8 lg:gap-y-10 gap-x-1 flex-wrap ${className}`}
    >
      {counsellors.map((counsellor, index) => (
        <CounsellorCard key={index} counsellor={counsellor} />
      ))}
    </div>
  );
}
