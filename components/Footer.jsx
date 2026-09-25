export default function Footer() {
  return (
    <footer className="flex flex-col items-start justify-between gap-2 bg-ink px-6 pb-8 text-paper/40 md:flex-row md:items-center md:px-12">
      <p className="font-body text-xs">
        © {new Date().getFullYear()} TomNow Studios, in coordination with
        Blakpanza Photography.
      </p>
      <p className="font-display text-xs italic">the future is now</p>
    </footer>
  );
}
