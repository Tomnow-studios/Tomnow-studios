"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

const SERVICES = [
  {
    frame: "01",
    title: "Photography",
    copy: "Portraits, product shots and full event coverage, edited to hold up in print as well as on a feed.",
  },
  {
    frame: "02",
    title: "Live streaming",
    copy: "Multi-camera streams for conferences, weddings and concerts, so the room isn't the only place the moment happens.",
  },
  {
    frame: "03",
    title: "Videography",
    copy: "Highlight reels, documentaries and drone footage that carry a story past the length of a single photo.",
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const rows = sectionRef.current.querySelectorAll(".service-row");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateX: [-24, 0],
              duration: 700,
              easing: "easeOutQuad",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-paper px-6 py-24 md:px-12 md:py-32">
      <h2 className="mb-14 max-w-lg font-display text-4xl font-medium leading-tight text-charcoal md:text-5xl">
        Three ways we cover a day, so you don&rsquo;t have to.
      </h2>

      <div className="frame-rule">
        {SERVICES.map((service) => (
          <div
            key={service.frame}
            className="service-row grid grid-cols-[3rem,1fr] gap-6 border-b border-charcoal/15 py-8 opacity-0 md:grid-cols-[4rem,1fr,1fr] md:gap-10"
          >
            <span className="font-body text-sm text-mist">
              frame {service.frame}
            </span>
            <h3 className="font-display text-2xl font-medium text-charcoal md:text-3xl">
              {service.title}
            </h3>
            <p className="font-body text-base leading-relaxed text-charcoal/70 md:max-w-sm">
              {service.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
