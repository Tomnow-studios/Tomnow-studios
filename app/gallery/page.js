"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const GALLERY_IMAGES = [
  { src: "/gallery/welcome-board.jpg", alt: "Welcome Board — Debra & Hosea Koito", aspect: "landscape" },
  { src: "/gallery/speaker-presentation.jpg", alt: "Speaker at Création Africa", aspect: "portrait" },
  { src: "/gallery/bride-celebration.jpg", alt: "Bride Celebration", aspect: "landscape" },
  { src: "/gallery/catering-setup.jpg", alt: "Gold Catering Setup", aspect: "landscape" },
  { src: "/gallery/event-portrait.jpg", alt: "Event Portrait", aspect: "portrait" },
  { src: "/gallery/bridal-party.jpg", alt: "Bridal Party", aspect: "portrait" },
  { src: "/gallery/floral-chandelier.jpg", alt: "Floral & Wicker Chandelier", aspect: "landscape" },
  { src: "/gallery/ceremony-guests.jpg", alt: "Ceremony Guests", aspect: "landscape" },
  { src: "/gallery/guest-portrait.jpg", alt: "Guest Portrait", aspect: "landscape" },
  { src: "/gallery/guests-dinner.jpg", alt: "Guests at Dinner", aspect: "landscape" },
  { src: "/gallery/event-portrait-2.jpg", alt: "Event Portrait", aspect: "portrait" },
  { src: "/gallery/catering-setup-2.jpg", alt: "Catering Display", aspect: "landscape" },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    function handleKey(e) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % GALLERY_IMAGES.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  return (
    <>
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 bg-ink/80 backdrop-blur-md border-b border-paper/10">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-paper"
        >
          TomNow Studios
        </Link>
        <div className="flex items-center gap-6">
          <h1 className="hidden md:block font-body text-sm text-paper/60 uppercase tracking-widest">
            Gallery
          </h1>
          <Link
            href="/#work"
            className="font-body text-sm font-medium text-paper underline decoration-signal decoration-2 underline-offset-4 hover:text-signal transition-colors"
          >
            ← Back to Work
          </Link>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-inkdeep/50 to-ink" />
        <div className="relative z-10 px-6 md:px-12 max-w-6xl mx-auto">
          <p
            className="font-body text-sm text-mist uppercase tracking-[0.3em] mb-4 transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
            }}
          >
            Our Work
          </p>
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-paper italic leading-[0.9] transition-all duration-700 delay-100"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
            }}
          >
            The Gallery
          </h1>
          <p
            className="font-body text-base md:text-lg text-paper/50 mt-6 max-w-xl transition-all duration-700 delay-200"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
            }}
          >
            A curated collection of moments we&apos;ve captured — from elegant weddings
            to vibrant corporate events across Kenya.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-signal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-flare/5 rounded-full blur-3xl" />
      </section>

      {/* Masonry Gallery Grid */}
      <section className="bg-ink px-4 md:px-8 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((img, index) => (
            <div
              key={img.src}
              className="mb-4 md:mb-6 break-inside-avoid group cursor-pointer"
              onClick={() => setLightbox(index)}
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${150 + index * 80}ms`,
              }}
            >
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={img.aspect === "portrait" ? 1100 : 550}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="font-body text-sm text-paper/90 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.alt}
                  </p>
                </div>
                {/* Corner accent */}
                <div className="absolute top-3 right-3 w-8 h-8 border border-paper/0 group-hover:border-paper/40 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100">
                  <svg className="w-4 h-4 text-paper/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-16 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "1.2s",
          }}
        >
          <p className="font-body text-paper/40 text-sm mb-6">
            Interested in working with us?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-signal text-paper font-body text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-signal/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-signal/25"
          >
            Book a Shoot
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full border border-paper/20 text-paper/70 hover:text-paper hover:border-paper/50 transition-all duration-300 hover:rotate-90"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
            }}
            className="absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center rounded-full border border-paper/20 text-paper/70 hover:text-paper hover:border-paper/50 transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i + 1) % GALLERY_IMAGES.length);
            }}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full border border-paper/20 text-paper/70 hover:text-paper hover:border-paper/50 transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] animate-lightbox-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[lightbox].src}
              alt={GALLERY_IMAGES[lightbox].alt}
              width={1200}
              height={GALLERY_IMAGES[lightbox].aspect === "portrait" ? 1600 : 800}
              sizes="90vw"
              className="max-h-[85vh] w-auto h-auto object-contain rounded-lg"
              priority
            />
            <p className="absolute bottom-0 left-0 right-0 text-center py-4 font-body text-sm text-paper/60 bg-gradient-to-t from-ink/50 to-transparent rounded-b-lg">
              {GALLERY_IMAGES[lightbox].alt}
            </p>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-xs text-paper/40 tracking-widest">
            {lightbox + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}
    </>
  );
}
