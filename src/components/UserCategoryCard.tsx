"use client";
import { useAppDispatch } from "@/hooks/useRedux";
import { showGetStartedAs } from "@/store/layoutSlice";
import Image from "next/image";
import { Fragment } from "react";

export default function UserCategoryCard({
  image = "/assets/images/homepage/Sec2_1.png",
  title,
  title2,
  text,
}: {
  image?: string;
  title: string;
  title2: string;
  text: string;
}) {
  const dispatch = useAppDispatch();

  const handleShowGetStartedAs = () => {
    dispatch(showGetStartedAs());
  };

  return (
    <Fragment>
      <div className="w-full lg:flex justify-center hidden">
        <div
          className="lg:w-[14rem] lg:h-[24rem] bg-white px-4 py-12 lg:py-16 hover:py-4 group rounded-lg 
                   hover:bg-bgcolors border border-gray-200 shadow-lg transition-all duration-300 flex justify-start flex-col"
        >
          <div className="w-full justify-center flex">
            <Image
              src={image}
              alt={`${title} ${title2}`}
              width={152}
              height={152}
              className="w-[12rem] h-auto transition-all duration-300 group-hover:w-[8rem]"
            />
          </div>
          <div className="w-full justify-center group-hover:mb-4 transition-all duration-300">
            <div className="font-semibold text-center">{title}</div>
            <div className="font-bold text-center">{title2}</div>
          </div>
          <div
            className="h-0 opacity-0 group-hover:block group-hover:opacity-100 text-center 
                     group-hover:h-auto transition-all duration-300 border-t-2 border-blueprimary pt-2 overflow-hidden"
          >
            {text}
            <div className="w-full justify-center flex py-4">
              <button
                onClick={handleShowGetStartedAs}
                className="px-6 py-2.5 font-semibold gradient-button rounded-full shadow-sm w-fit absolute bottom-6"
              >
                Get Started As
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / small screens */}
      <div className="w-full lg:hidden justify-center flex p-2 h-full">
        <div
          className="flex flex-col rounded-md border border-blueprimary p-3 items-center 
                   bg-white w-full h-full shadow-xl"
        >
          <div className="w-full justify-center flex">
            <Image
              src={image}
              alt={`${title} ${title2}`}
              width={96}
              height={96}
              className="w-[6rem] h-[6rem] transition-all duration-300"
            />
          </div>
          <div className="font-semibold text-xs text-center">{title}</div>
          <div className="font-bold text-xs text-center">{title2}</div>
          <div className="h-[1.69px] bg-blueprimary w-full my-2" />
          <div className="text-xs text-center">{text}</div>
          <div className="h-full flex items-end">
            <div className="w-full justify-center flex py-4">
              <button
                // onClick={handleShowGetStartedAs}
                className="px-3 py-1.5 font-semibold gradient-button rounded-full shadow-sm w-fit text-[0.69rem]"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
