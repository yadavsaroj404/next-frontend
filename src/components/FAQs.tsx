import { defaultFAQ } from "@/data/faq";
import { FAQ } from "@/interfaces/faqs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function FAQs({ faqs = defaultFAQ }: { faqs?: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // keep refs to answer containers for height animation
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  // toggle open/close
  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  // after openIndex changes, adjust heights
  useEffect(() => {
    faqs.forEach((_, idx) => {
      const el = contentRefs.current[idx];
      if (!el) return;
      if (openIndex === idx) {
        const fullH = el.scrollHeight;
        el.style.maxHeight = fullH + "px";
      } else {
        el.style.maxHeight = "0px";
      }
    });
  }, [openIndex, faqs]);

  return (
    <section className="w-full flex justify-center items-center my-8">
      <div className="w-full xl:px-16 px-8 flex flex-col gap-4 mt-20 max-w-[1440px] items-center">
        <div className="text-smallheading font-bold lg:text-lg text-center text-sm">
          What is CareerNaksha, Career Counselling, Psychometric Assessment,
          Career Guidance, How are our Counsellors better? You may ask?
        </div>
        <h4 className="lg:text-4xl text-[22px] bg-clip-text bg-gradientbluelightblue animate-[getStartedAsBtnBg_15s_ease-in-out_infinite] text-transparent font-bold text-center lg:mt-6 mt-4">
          FAQs - General questions and queries answered for you
        </h4>

        <div className="flex w-full mt-8 flex-col lg:flex-row gap-8 items-start">
          {/* Left image */}
          <div className="lg:w-1/2 w-full flex justify-center">
            <Image
              src="/assets/images/homepage/faq.svg"
              width={400}
              height={400}
              alt="FAQ!"
              className="object-contain"
            />
          </div>

          {/* FAQ list */}
          <div className="lg:w-1/2 w-full flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-md overflow-hidden">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex justify-between items-center px-4 py-3 bg-bgcolors"
                  aria-expanded={openIndex === idx}
                >
                  <span className="text-lg lg:text-xl font-semibold text-left">
                    {faq.question}
                  </span>
                  <span className="text-2xl">
                    {openIndex === idx ? "−" : "+"}
                  </span>
                </button>
                <div
                  ref={(el) => {
                    // callback ref must return void
                    contentRefs.current[idx] = el;
                  }}
                  className="transition-[max-height] duration-300 ease-in-out overflow-hidden px-4 bg-bgcolors"
                  style={{ maxHeight: 0 }}
                >
                  <p className="py-3 text-base text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
