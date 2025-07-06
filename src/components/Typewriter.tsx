"use client";

import React, { FC, useState, useEffect, useRef } from "react";

interface TypewriterProps {
  sentences?: string[];
  className?: string;
}

const DEFAULT_SENTENCES = [
  "This is a typewriter effect",
  "Provide your own sentences here",
  "And watch them being typed out",
];

const Typewriter: FC<TypewriterProps> = ({
  sentences = DEFAULT_SENTENCES,
  className = "",
}) => {
  const [text, setText] = useState("");
  const sentenceIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const timeoutRef = useRef<number>(0);

  // Speed settings
  const typingSpeed = 100;
  const pauseBeforeDeleting = 1000;
  const backSpaceSpeed = 25;
  const delayBeforeNext = 300;

  useEffect(() => {
    function tick() {
      const current = sentences[sentenceIndex.current];
      if (!isDeleting.current) {
        // typing
        if (charIndex.current < current.length) {
          setText((t) => t + current.charAt(charIndex.current));
          charIndex.current += 1;
          timeoutRef.current = window.setTimeout(tick, typingSpeed);
        } else {
          // pause then delete
          isDeleting.current = true;
          timeoutRef.current = window.setTimeout(tick, pauseBeforeDeleting);
        }
      } else {
        // deleting
        if (charIndex.current > 0) {
          setText((t) => t.slice(0, -1));
          charIndex.current -= 1;
          timeoutRef.current = window.setTimeout(tick, backSpaceSpeed);
        } else {
          // move to next sentence
          isDeleting.current = false;
          sentenceIndex.current =
            (sentenceIndex.current + 1) % sentences.length;
          timeoutRef.current = window.setTimeout(tick, delayBeforeNext);
        }
      }
    }

    // start
    timeoutRef.current = window.setTimeout(tick, typingSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [sentences]);

  return (
    <div className={className}>
      <p className="inline-block text-sm lg:text-2xl text-gray-400 font-semibold lg:font-bold overflow-hidden whitespace-nowrap">
        {text}
        <span className="cursor text-3xl">|</span>
      </p>

      {/* styled-jsx for blinking cursor */}
      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        .cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </div>
  );
};

export default Typewriter;
