import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Intro.css";
import { useLang } from "../../i18n/LangContext";
import { tr } from "../../i18n/translations";

interface IntroProps { onEnter: () => void }

const WORD    = "MAMPASSI";
const TAGS    = ["React", "TypeScript", "React Native", "Node.js", "Next.js", "Expo"];
const MARQUEE = ["React", "TypeScript", "Next.js", "Node.js", "React Native", "Expo", "GSAP", "Figma", "PostgreSQL", "Tailwind CSS"];
const CHARS   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#!$%&?";

function scramble(el: HTMLSpanElement, final: string, delay: number) {
  let count = 0;
  gsap.delayedCall(delay, () => {
    gsap.set(el, { opacity: 1 });
    const id = setInterval(() => {
      el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
      if (++count >= 8) { clearInterval(id); el.textContent = final; }
    }, 50);
  });
}

export default function Intro({ onEnter }: IntroProps) {
  const lang = useLang();
  const wrapRef    = useRef<HTMLDivElement>(null);
  const dotRef     = useRef<HTMLDivElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const topRef     = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const subLRef    = useRef<HTMLParagraphElement>(null);
  const subRRef    = useRef<HTMLParagraphElement>(null);
  const enterRef   = useRef<HTMLButtonElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tagsRef    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Custom cursor
    const onMove = (e: MouseEvent) => {
      gsap.set(dotRef.current,  { x: e.clientX, y: e.clientY });
      gsap.to(glowRef.current,  { x: e.clientX, y: e.clientY, duration: 1.1, ease: "power3.out" });
    };
    window.addEventListener("mousemove", onMove);

    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    const tags    = tagsRef.current.filter(Boolean)    as HTMLSpanElement[];

    // Initial hidden states
    gsap.set(letters,                              { opacity: 0 });
    gsap.set(topRef.current,                       { autoAlpha: 0, y: -10 });
    gsap.set(lineRef.current,                      { scaleX: 0, transformOrigin: "left center" });
    gsap.set([subLRef.current, subRRef.current],   { y: "110%", autoAlpha: 0 });
    gsap.set(tags,                                 { autoAlpha: 0, y: 16 });
    gsap.set([enterRef.current, marqueeRef.current],{ autoAlpha: 0, y: 10 });

    // Scramble the name
    WORD.split("").forEach((char, i) => {
      if (letters[i]) scramble(letters[i]!, char, 0.3 + i * 0.09);
    });

    // Rest of timeline (starts after name is done settling)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl
      .to(topRef.current,   { autoAlpha: 1, y: 0, duration: 0.5 }, 0.15)
      .to(lineRef.current,  { scaleX: 1, duration: 0.75, ease: "power2.inOut" }, 1.4)
      .to([subLRef.current, subRRef.current],
                            { y: "0%", autoAlpha: 1, duration: 0.55, stagger: 0.1 }, 1.55)
      .to(tags,             { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.065 }, 1.8)
      .to([marqueeRef.current, enterRef.current],
                            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 }, 2.05);

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleEnter = () => {
    gsap.to(wrapRef.current, { autoAlpha: 0, duration: 0.5, ease: "power2.in" });
    setTimeout(onEnter, 500);
  };

  return (
    <div id="intro-wrapper" ref={wrapRef}>
      {/* Custom cursor */}
      <div className="i-cursor-dot"  ref={dotRef}  />
      <div className="i-cursor-glow" ref={glowRef} />

      {/* Decorative geometry */}
      <div className="i-ring i-ring-1" />
      <div className="i-ring i-ring-2" />
      <div className="i-ambient" />

      {/* Top bar */}
      <div className="i-topbar" ref={topRef}>
        <span>Portfolio</span>
        <span className="i-sep">·</span>
        <span>2025</span>
        <div className="i-badge">
          <span className="i-badge-slash">/</span>
          {tr('badge', lang)}
        </div>
      </div>

      {/* Vertical side label */}
      <div className="i-side">{tr('intro_side', lang)}</div>

      {/* Main content */}
      <div className="i-body">
        {/* Big name with scramble */}
        <div className="i-name-clip">
          <h1 className="i-name">
            {WORD.split("").map((l, i) => (
              <span key={i} className="i-letter"
                ref={el => { lettersRef.current[i] = el; }}
              >{l}</span>
            ))}
          </h1>
        </div>

        {/* Extending line */}
        <div className="i-line" ref={lineRef} />

        {/* Subtitle row */}
        <div className="i-sub-row">
          <div className="i-sub-clip">
            <p className="i-sub" ref={subLRef}>{tr('intro_role', lang)}</p>
          </div>
          <div className="i-sub-clip">
            <p className="i-sub i-sub--r" ref={subRRef}>Moukietou Mampassi</p>
          </div>
        </div>

        {/* Tech pills */}
        <div className="i-tags">
          {TAGS.map((t, i) => (
            <span key={t} className="i-tag"
              ref={el => { tagsRef.current[i] = el; }}
            >{t}</span>
          ))}
        </div>
      </div>

      {/* Scrolling marquee */}
      <div className="i-marquee" ref={marqueeRef}>
        <div className="i-marquee__track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="i-marquee__item">
              {item}<span className="i-marquee__dot">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Enter CTA */}
      <button className="i-enter" ref={enterRef} onClick={handleEnter}>
        <span>{tr('intro_enter', lang)}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1.5v11M1.5 7l5.5 5.5L12.5 7"
            stroke="currentColor" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
