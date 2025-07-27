import { IoMdCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface CheckBoxProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any; // For additional props like onChange, checked, etc.
}
export default function CheckBox({
  id,
  className,
  children,
  ...rest
}: CheckBoxProps) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-x-1 cursor-pointer select-none self-start ${
        className || ""
      }`}
    >
      <input {...rest} type="checkbox" id={id} className="peer sr-only" />
      <MdOutlineCheckBoxOutlineBlank
        fill="#4281fd"
        size={22}
        className="peer-checked:hidden inline-block "
      />
      <IoMdCheckbox
        fill="#4281fd"
        size={22}
        className="hidden peer-checked:inline-block"
      />
      {/* Label Text */}
      <span className="text-base text-gray-800">{children}</span>{" "}
    </label>
  );
}
