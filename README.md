# TomNow Studios

A Next.js (App Router) site for TomNow Studios, built on the TomNow Media /
Blakpanza Photography flyer: deep teal + crimson palette, Fraunces for
display type, Inter for body text.

## Stack

- **Next.js 14** — App Router, no extra state library needed
- **Tailwind CSS** — theme tokens in `tailwind.config.mjs` (`ink`, `signal`,
  `paper`, `charcoal`, `mist`, `flare`)
- **three.js** — the hero's rotating camera-aperture scene (`components/Hero.jsx`)
- **anime.js** — the hero's load-in sequence (iris opening, headline reveal)
  and the service rows' on-scroll reveal
- **Lenis** — global smooth scrolling (`components/SmoothScroll.jsx`)

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

```
app/
  layout.js       fonts + global smooth-scroll wrapper
  page.js         assembles the sections
  globals.css     Tailwind + Lenis + reduced-motion overrides
components/
  Navbar.jsx
  Hero.jsx        three.js aperture + anime.js intro timeline
  Services.jsx    filmstrip-style service list
  Gallery.jsx     scroll-linked horizontal reel
  About.jsx
  Contact.jsx     call-sheet style contact block
  Footer.jsx
```

## Where to put real content

- Swap the `STILLS` gradients in `components/Gallery.jsx` for real photos
  (drop images in `public/` and use `next/image`).
- Update the phone/email/socials in `components/Contact.jsx`.
- The stats in `components/About.jsx` are placeholders — replace with real
  numbers.

## Notes

- The hero scene checks `prefers-reduced-motion` and skips the animated
  open/dolly-in, jumping straight to the settled state.
- Lenis writes the current scroll progress to a `--scroll-progress` CSS
  variable on `<html>`, which the three.js scene reads for a subtle
  scroll-linked tilt — no extra scroll listener needed there.
