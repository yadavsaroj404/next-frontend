export default function StarIcon({
  className = "",
  fill = "#FFC700",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} h-5 w-5 text-yellow-500`} // Example styling for a filled star
    >
      <path
        fillRule="evenodd"
        d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
