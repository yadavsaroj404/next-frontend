"use client";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface ResponsiveConfig {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

// Define the props interface for the Carousel component
interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
  cardsToShow?: number;
  responsive?: ResponsiveConfig;
  loop?: boolean;
  gap?: number;
  showControlsOnHover?: boolean;
  pauseOnHover?: boolean;
}

// Helper function to determine the number of cards to show based on window width
const getCardsToShowForWidth = (
  width: number,
  defaultCards: number,
  responsiveConfig?: ResponsiveConfig
): number => {
  let cards = defaultCards;

  if (responsiveConfig) {
    if (responsiveConfig.xl !== undefined && width >= 1280) {
      cards = responsiveConfig.xl;
    } else if (responsiveConfig.lg !== undefined && width >= 1024) {
      cards = responsiveConfig.lg;
    } else if (responsiveConfig.md !== undefined && width >= 768) {
      cards = responsiveConfig.md;
    } else if (responsiveConfig.sm !== undefined && width >= 640) {
      cards = responsiveConfig.sm;
    }
  }
  return cards;
};

// Carousel component with configurable props
export default function Carousel({
  children,
  className = "",
  autoplay = false,
  autoplayInterval = 3000,
  showNavigation = true,
  showIndicators = true,
  cardsToShow = 1,
  responsive,
  loop = false,
  gap = 0,
  showControlsOnHover = false,
  pauseOnHover = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const [currentCardsToShow, setCurrentCardsToShow] =
    useState<number>(cardsToShow);

  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;

  // Effect to set the correct `currentCardsToShow` after the component mounts on the client.
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentCardsToShow(
        getCardsToShowForWidth(window.innerWidth, cardsToShow, responsive)
      );

      const handleResize = () => {
        setCurrentCardsToShow(
          getCardsToShowForWidth(window.innerWidth, cardsToShow, responsive)
        );
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [cardsToShow, responsive]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (totalSlides === 0) return 0;

      const maxStartIndex = totalSlides - currentCardsToShow;

      if (maxStartIndex <= 0) {
        return loop ? 0 : prevIndex;
      }

      let nextIndexCandidate = prevIndex + currentCardsToShow;

      if (nextIndexCandidate >= totalSlides) {
        if (loop) {
          return 0;
        } else {
          return maxStartIndex;
        }
      } else if (nextIndexCandidate > maxStartIndex) {
        return maxStartIndex;
      }

      return nextIndexCandidate;
    });
  }, [totalSlides, currentCardsToShow, loop]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (totalSlides === 0) return 0;

      const maxStartIndex = Math.max(0, totalSlides - currentCardsToShow);

      if (prevIndex === 0) {
        return loop ? maxStartIndex : 0;
      }

      const idealPrevIndex =
        Math.floor((prevIndex - 1) / currentCardsToShow) * currentCardsToShow;

      return Math.max(0, idealPrevIndex);
    });
  }, [totalSlides, currentCardsToShow, loop]);

  const goToSlide = useCallback(
    (viewIndex: number) => {
      const maxStartIndex = Math.max(0, totalSlides - currentCardsToShow);
      let targetIndex;

      if (viewIndex === Math.floor((totalSlides - 1) / currentCardsToShow)) {
        targetIndex = maxStartIndex;
      } else {
        targetIndex = viewIndex * currentCardsToShow;
      }

      if (!loop) {
        targetIndex = Math.min(targetIndex, maxStartIndex);
      }

      setCurrentIndex(targetIndex);
    },
    [totalSlides, currentCardsToShow, loop]
  );

  // Start of Gap Implementation Changes ---
  useEffect(() => {
    if (carouselRef.current) {
      // Calculate the total width of the slides + gaps for the current view
      // We need to move by `currentCardsToShow` slide widths PLUS `currentCardsToShow` gaps
      // (or `currentCardsToShow - 1` gaps if we think of gaps *between* slides)
      // It's simpler to calculate the percentage per item including its "share" of the gap.

      // Percentage width for each slide, accounting for gaps
      // 100% total width - (total gaps) / number of cards
      const slideWidthPercentage = `calc((100% - ${
        (currentCardsToShow - 1) * gap
      }px) / ${currentCardsToShow})`;

      // Set CSS custom properties for the slide width and gap
      // This allows Tailwind JIT or custom CSS to pick up these values
      carouselRef.current.style.setProperty(
        "--carousel-slide-width",
        slideWidthPercentage
      );
      carouselRef.current.style.setProperty("--carousel-gap", `${gap}px`);

      // The translateX calculation needs to consider both the slide width and the gap for each step.
      // Each "step" is effectively 100% of the view (currentCardsToShow slides + their internal gaps).
      // So, we move by `currentIndex` number of such "steps".
      // The percentage calculation below moves by the exact width of one group of slides and their internal gaps.
      // A more robust way: calculate total displacement based on item width + gap
      const itemAndGapWidth = `calc(var(--carousel-slide-width) + var(--carousel-gap))`;
      carouselRef.current.style.transform = `translateX(calc(-${currentIndex} * ${itemAndGapWidth}))`;

      // Special handling for the last partial view's transform
      // If we are at the maxStartIndex and it's a partial view
      const maxStartIndex = Math.max(0, totalSlides - currentCardsToShow);
      if (
        currentIndex === maxStartIndex &&
        maxStartIndex % currentCardsToShow !== 0
      ) {
        // Calculate the exact offset for the last partial view
        const slideElementWidth =
          carouselRef.current.children[0]?.clientWidth || 0;

        // The translateX should move by the width of (currentIndex) items PLUS (currentIndex) gaps.
        // Since `currentIndex` represents the *starting index* of the view,
        // we're moving by the width of `currentIndex` individual items plus the gaps accumulated before them.
        carouselRef.current.style.transform = `translateX(-${
          currentIndex * (slideElementWidth + gap)
        }px)`;
      } else {
        // For full steps, use the simple percentage/gap based calculation
        // The issue with the above is that it's percentage of parent + static px.
        // A direct pixel calculation is often more reliable when mixing percent and pixel gaps.

        // Calculate total displacement directly in pixels
        // Assuming all slides have the same width after flex distribution
        const slideWidthPx =
          carouselRef.current.children[0]?.getBoundingClientRect().width || 0;
        carouselRef.current.style.transform = `translateX(-${
          currentIndex * (slideWidthPx + gap)
        }px)`;
      }
    }
  }, [currentIndex, currentCardsToShow, gap, totalSlides]);

  // AutoPlay logic (moved outside of the gap implementation section)
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayTimeoutRef.current !== undefined) {
        clearTimeout(autoplayTimeoutRef.current);
      }

      const canAutoplay =
        autoplay && (totalSlides > currentCardsToShow || loop);

      if (canAutoplay) {
        autoplayTimeoutRef.current = setTimeout(() => {
          setCurrentIndex((prevIndex) => {
            const maxStartIndex = totalSlides - currentCardsToShow;
            const nextIndex = prevIndex + currentCardsToShow;

            if (nextIndex > maxStartIndex) {
              return loop ? 0 : prevIndex;
            }
            return nextIndex;
          });
          startAutoplay();
        }, autoplayInterval);
      }
    };

    if (typeof window !== "undefined") {
      startAutoplay();
    }

    return () => {
      if (autoplayTimeoutRef.current !== undefined) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [autoplay, autoplayInterval, totalSlides, currentCardsToShow, loop]);
  // --- End of AutoPlay logic ---

  if (totalSlides === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-200 rounded-md text-gray-600">
        No slides to display.
      </div>
    );
  }

  const showNavButtons =
    showNavigation && (totalSlides > currentCardsToShow || loop);

  const Controls = () => {
    return (
      <Fragment>
        <button
          onClick={goToPrevious}
          className={`absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 cursor-pointer
              ${
                !loop && currentIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            `}
          aria-label="Previous slide"
          disabled={!loop && currentIndex === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className={`absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 cursor-pointer
              ${
                !loop && currentIndex >= totalSlides - currentCardsToShow
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            `}
          aria-label="Next slide"
          disabled={!loop && currentIndex >= totalSlides - currentCardsToShow}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </Fragment>
    );
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => {
        if (pauseOnHover && autoplayTimeoutRef.current) {
          clearTimeout(autoplayTimeoutRef.current);
        }
      }}
      onMouseLeave={() => {
        if (autoplay) {
          autoplayTimeoutRef.current = setTimeout(() => {
            goToNext();
          }, autoplayInterval);
        }
      }}
    >
      <div
        ref={carouselRef}
        className={`flex transition-transform duration-500 ease-in-out items-center`}
        // Apply the gap directly to the flex container
        style={{ gap: `${gap}px` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`flex-shrink-0`}
            style={{
              // Use calc() to subtract the proportion of gap from 100% per currentCardsToShow
              width: `calc((100% - ${
                (currentCardsToShow - 1) * gap
              }px) / ${currentCardsToShow})`,
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {showNavButtons && <Controls />}
      {!showNavButtons && showControlsOnHover && (
        <div
          className="absolute inset-0 flex items-center justify-between opacity-0 hover:opacity-100 transition-opacity duration-300"
          onMouseEnter={() => {
            if (autoplayTimeoutRef.current) {
              clearTimeout(autoplayTimeoutRef.current);
            }
          }}
          onMouseLeave={() => {
            if (autoplay) {
              autoplayTimeoutRef.current = setTimeout(() => {
                goToNext();
              }, autoplayInterval);
            }
          }}
        >
          <Controls />
        </div>
      )}

      {/* Indicators */}

      {showIndicators && totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {Array.from({
            length: Math.ceil(totalSlides / currentCardsToShow),
          }).map((_, viewIndex) => {
            const dotViewStartIndex =
              viewIndex === Math.floor((totalSlides - 1) / currentCardsToShow)
                ? Math.max(0, totalSlides - currentCardsToShow)
                : viewIndex * currentCardsToShow;

            let trueIsActive = false;
            const isThisTheLastDot =
              viewIndex === Math.floor((totalSlides - 1) / currentCardsToShow);
            const maxStartIndex = Math.max(0, totalSlides - currentCardsToShow);

            if (isThisTheLastDot) {
              trueIsActive = currentIndex >= maxStartIndex;
            } else {
              trueIsActive = currentIndex === dotViewStartIndex;
            }

            return (
              <button
                key={viewIndex}
                onClick={() => goToSlide(viewIndex)}
                className={`w-3 h-3 border rounded-full transition-all duration-300 cursor-pointer ${
                  trueIsActive
                    ? "bg-gray-400 scale-125 border-gray-400"
                    : " bg-white bg-opacity-70 border-gray-500"
                } focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75`}
                aria-label={`Go to view ${viewIndex + 1}`}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
}
