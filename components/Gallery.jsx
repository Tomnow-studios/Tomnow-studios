"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const BASE_PATH = "/Tomnow-studios";

const STILLS = [
  { label: "Catering Setup", src: `${BASE_PATH}/reel/catering-setup.jpg` },
  { label: "Event Portrait", src: `${BASE_PATH}/reel/event-portrait.jpg` },
  { label: "Floral Chandelier", src: `${BASE_PATH}/reel/floral-chandelier.jpg` },
  { label: "Welcome Board", src: `${BASE_PATH}/reel/welcome-board.jpg` },
];

export default function Gallery() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollable = rect.height - viewportH;
      const progress = Math.min(
        1,
        Math.max(0, (viewportH - rect.top) / (scrollable + viewportH))
      );
      const maxShift = track.scrollWidth - section.clientWidth;
      track.style.transform = `translate3d(${-progress * maxShift}px, 0, 0)`;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-ink py-24 md:py-32"
      style={{ minHeight: "180vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <p className="px-6 pb-8 font-body text-sm text-paper/60 md:px-12">
          the reel
        </p>
        <div ref={trackRef} className="flex gap-6 px-6 will-change-transform md:gap-8 md:px-12">
          {STILLS.map((still) => (
            <div
              key={still.label}
              className="relative flex h-[52vh] w-[78vw] flex-none flex-col justify-end overflow-hidden rounded-lg md:h-[60vh] md:w-[38vw]"
            >
              <img
                src={still.src}
                alt={still.label}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <p className="relative z-10 p-6 font-display text-xl italic text-paper md:text-2xl">
                {still.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 px-6 md:px-12 flex justify-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 px-10 py-4 border-2 border-paper/30 rounded-full font-body text-sm font-semibold uppercase tracking-[0.2em] text-paper hover:bg-paper hover:text-ink transition-all duration-400 hover:scale-105 hover:shadow-lg hover:shadow-paper/10"
          >
            View Gallery
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
