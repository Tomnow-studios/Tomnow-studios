const CALL_SHEET = [
  { label: "Call / WhatsApp", value: "0768 512 657 · 0747 512 656" },
  { label: "Email", value: "mediatomnow@gmail.com" },
  { label: "Instagram", value: "@tomnowmedia254" },
  { label: "TikTok / Facebook", value: "TomNow Media" },
  { label: "Based in", value: "Kenya" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-ink px-6 py-24 text-paper md:px-12 md:py-32"
    >
      <h2 className="max-w-xl font-display text-4xl font-medium leading-tight md:text-6xl">
        Let&rsquo;s make your next event look like this.
      </h2>

      <a
        href="mailto:mediatomnow@gmail.com"
        className="mt-8 inline-block border border-paper/40 px-7 py-3 font-body text-sm text-paper transition-colors hover:border-signal hover:text-signal"
      >
        Book a shoot
      </a>

      <dl className="frame-rule-dark mt-16 grid gap-6 pt-8 md:grid-cols-5 md:gap-4">
        {CALL_SHEET.map((row) => (
          <div key={row.label}>
            <dt className="font-body text-xs text-paper/50">{row.label}</dt>
            <dd className="mt-1 font-body text-sm text-paper/90">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
