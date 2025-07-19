"use client";
import { HeroAnimationIcon } from "@/interfaces/utils";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const STEP = 0.09;
const PAUSE = 2000;
const REWIND_DURATION = 500;

export default function HeroRing({
  heroAnimationIcons,
}: {
  heroAnimationIcons: HeroAnimationIcon[];
}) {
  // an array of refs for each dot element
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [items, setItems] = useState<HeroAnimationIcon[]>([]);

  useEffect(() => {
    const newItems = [...heroAnimationIcons];
    newItems.push(newItems.shift()!);
    newItems.reverse();
    setItems(newItems);
  }, [heroAnimationIcons]);

  useEffect(() => {
    const N = heroAnimationIcons.length;
    const Rpct = 50,
      Cpct = 50;
    // animation state
    let rotation = 0;
    let target = 1;
    let lastTime = 0;
    let pausedAt = 0;
    let rewindStart = 0;
    let phase = "pause" as "pause" | "move" | "waitRewind" | "rewind";
    let rafId = 0;

    function update() {
      const startAngle = Math.PI / 2 + ((2 * Math.PI) / N) * rotation;
      const SLOT_ANGLE = (2 * Math.PI) / N;

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;

        // 1) position
        const angle = startAngle + SLOT_ANGLE * i;
        dot.style.left = `${Cpct + Rpct * Math.cos(angle)}%`;
        dot.style.top = `${Cpct + Rpct * Math.sin(angle)}%`;
      });
    }

    function animate(ts: number) {
      if (!lastTime) {
        lastTime = ts;
        pausedAt = ts;
      }

      switch (phase) {
        case "pause":
          if (ts - pausedAt >= PAUSE) {
            phase = "move";
          }
          break;

        case "move":
          rotation += STEP;
          if (rotation >= target) {
            rotation = target;
            if (target === N - 1) {
              phase = "waitRewind";
              pausedAt = ts;
            } else {
              target = (target + 1) % N;
              phase = "pause";
              pausedAt = ts;
            }
          }
          break;

        case "waitRewind":
          if (ts - pausedAt >= PAUSE) {
            phase = "rewind";
            rewindStart = ts;
          }
          break;

        case "rewind":
          {
            const t = ts - rewindStart;
            if (t < REWIND_DURATION) {
              rotation = (N - 1) * (1 - t / REWIND_DURATION);
            } else {
              rotation = 0;
              target = 1;
              phase = "pause";
              pausedAt = ts;
            }
            setBottomIndex(0);
          }
          break;
      }

      update();

      const slot = Math.round(rotation) % N;
      // the dot at bottom satisfies (rotation + i) % N === 0
      const newBottom = (N - slot) % N;
      if (newBottom !== bottomIndex) {
        setBottomIndex(newBottom);
      }

      lastTime = ts;
      rafId = requestAnimationFrame(animate);
    }

    // kick off
    update();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      // clear inline styles so dots can be garbage-collected
      dotsRef.current.forEach((dot) => {
        if (dot) dot.removeAttribute("style");
      });
    };
  }, []);

  return (
    <div className="w-96">
      <div className="relative w-96 h-96 border-3 border-dashed rounded-full border-blue-600">
        <div
          key={bottomIndex}
          className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fade-slide"
        >
          <h3 className="font-bold text-2xl text-center">
            {items[bottomIndex]?.title}
          </h3>
          <p className="mt-2 text-base text-center">
            {items[bottomIndex]?.description}
          </p>
        </div>
        {items.map((dot, i) => (
          <div
            key={i}
            ref={(el) => {
              el && (dotsRef.current[i] = el);
            }}
            className={`absolute w-20 h-20 bg-white flex items-center justify-center -translate-x-1/2 -translate-y-1/2 font-bold`}
          >
            <Image
              src={`/assets/images/homepage/heroanimation/${dot.name}.svg`}
              alt={`${dot.alt} for career counseling`}
              priority
              width={96}
              height={96}
              className={`w-full h-full transition-transform duration-300 ease-out ${
                bottomIndex === i ? "scale-150" : "scale-90"
              }`}
            />
          </div>
        ))}
      </div>

      <button
        key={bottomIndex}
        className="mt-16 block mx-auto px-5 py-3 bg-gray-100 rounded-lg font-semibold text-base"
      >
        <span className="animate-blur-fade">{items[bottomIndex]?.role}</span>
      </button>
    </div>
  );
}
