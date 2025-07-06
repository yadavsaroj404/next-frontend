"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface ImpactNumberCardProps {
  countNumber: number;
  _id: number | string;
  title: string;
  icon: string;
  suffix?: string;
  type: "blue" | "white";
}

export default function ImpactNumberCard({
  countNumber,
  _id,
  title,
  icon,
  suffix = "",
  type,
}: ImpactNumberCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(0);
  const isBlue = type === "blue";

  // 1️⃣ Set up IntersectionObserver to flip `inView` once the icon container is 100% visible
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // 2️⃣ When inView becomes true, start a count‑up animation
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2500; // ms
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayNumber(Math.floor(progress * countNumber));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayNumber(countNumber); // ensure exact final value
      }
    };

    requestAnimationFrame(step);
  }, [inView, countNumber]);

  return (
    <div
      className={`rounded-2xl ${
        isBlue
          ? "bg-blueprimary text-white"
          : "bg-white text-blueprimary border border-blueprimary"
      } flex flex-col items-center justify-center max-w-[18rem] h-full p-4 lg:gap-6 gap-1.5`}
    >
      {/* Icon with manual scale animation tied to inView */}
      <div
        ref={ref}
        className={`transform transition-transform duration-[2000ms] ease-[cubic-bezier(0.7,-0.4,0.4,1.4)] ${
          inView ? "scale-150" : "lg:scale-100 scale-75"
        }`}
      >
        <img src={icon} width={23} height={23} alt={title} title={title} />
      </div>

      {/* Manual count‑up display */}
      <div className="flex gap-2 lg:text-4xl text-xl font-bold">
        <span className={isBlue ? "text-white" : "text-blueprimary"}>
          {displayNumber}
        </span>
        {suffix && (
          <span className={isBlue ? "text-white" : "text-blueprimary"}>
            {suffix}
          </span>
        )}
      </div>

      {/* Title */}
      <div
        className={`font-semibold lg:text-2xl text-xs text-center ${
          isBlue ? "text-white" : "text-blueprimary"
        }`}
      >
        {title}
      </div>
    </div>
  );
}
