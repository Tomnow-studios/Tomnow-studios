const STATS = [
  { value: "100+", label: "events covered" },
  { value: "5", label: "years behind the lens" },
  { value: "1", label: "country, every county" },
];

export default function About() {
  return (
    <section id="about" className="bg-paper px-6 py-24 md:px-12 md:py-32">
      <div className="grid gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <h2 className="mb-6 font-display text-3xl font-medium leading-snug text-charcoal md:text-4xl">
            We started TomNow because most event footage gets watched once
            and forgotten.
          </h2>
          <p className="max-w-md font-body text-base leading-relaxed text-charcoal/70">
            In coordination with Blakpanza Photography, we built a crew that
            treats a launch, a wedding or a council session with the same
            attention a documentary gets — proper lenses, a second angle for
            the room, and an edit that actually gets finished on time.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 self-start border-t border-charcoal/15 pt-8 md:gap-10">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl font-medium text-signal md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 font-body text-sm text-charcoal/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
