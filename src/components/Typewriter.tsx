"use client";

import React, { FC, useState, useEffect } from "react";

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
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // timing constants (ms)
  const TYPING_SPEED = 100;
  const PAUSE_BEFORE_DELETE = 1000;
  const DELETE_SPEED = 30;
  const PAUSE_BEFORE_NEXT = 300;

  useEffect(() => {
    const fullText = sentences[sentenceIndex];
    const charIndex = text.length;

    let timeout: NodeJS.Timeout;
    // Determine the next action & delay
    if (!isDeleting && charIndex < fullText.length) {
      // typing forward
      timeout = setTimeout(() => {
        setText(fullText.slice(0, charIndex + 1));
      }, TYPING_SPEED);
    } else if (!isDeleting && charIndex === fullText.length) {
      // pause at full text, then start deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_BEFORE_DELETE);
    } else if (isDeleting && charIndex > 0) {
      // deleting
      timeout = setTimeout(() => {
        setText(fullText.slice(0, charIndex - 1));
      }, DELETE_SPEED);
    } else {
      // finished deleting, move to next sentence
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setSentenceIndex((idx) => (idx + 1) % sentences.length);
      }, PAUSE_BEFORE_NEXT);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, sentenceIndex, sentences]);

  return (
    <div className={className}>
      <p className="inline-block text-sm lg:text-2xl text-gray-400 font-semibold lg:font-bold overflow-hidden whitespace-nowrap">
        {text}
        <span className="typewriter-cursor">|</span>
      </p>
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
        .typewriter-cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </div>
  );
};

export default Typewriter;
