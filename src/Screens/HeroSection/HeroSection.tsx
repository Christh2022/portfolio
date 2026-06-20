import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./HeroSection.css";
import ThreeBackground from "../../UI/ThreeBackground";
import { useLang } from "../../i18n/LangContext";
import { tr } from "../../i18n/translations";

function Chars({ text, cls }: { text: string; cls: string }) {
  return (
    <>
      {text.split('').map((c, i) => (
        <span key={i} className={cls} style={{ display: 'inline-block' }}>
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </>
  );
}

export default function HeroSection({ onProjects, onAbout, onContact }: { onProjects: () => void; onAbout: () => void; onContact: () => void }) {
  const lang = useLang();
  const isFR = lang === 'fr';

  const headerRef   = useRef<HTMLElement>(null);
  const iRef        = useRef<HTMLSpanElement>(null);
  const craftRef    = useRef<HTMLSpanElement>(null);
  const diRef       = useRef<HTMLSpanElement>(null);
  const gitalRef    = useRef<HTMLSpanElement>(null);
  const exRef       = useRef<HTMLSpanElement>(null);
  const peRef       = useRef<HTMLSpanElement>(null);
  const riRef       = useRef<HTMLSpanElement>(null);
  const encesRef    = useRef<HTMLSpanElement>(null);
  const bookRef     = useRef<HTMLSpanElement>(null);
  const openRef     = useRef<HTMLSpanElement>(null);
  const copyRef     = useRef<HTMLSpanElement>(null);
  const scrollRows  = useRef<NodeListOf<Element> | null>(null);
  const btnCircle   = useRef<HTMLDivElement>(null);
  const btnText     = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Enter') onProjects(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onProjects]);

  useEffect(() => {
    const section = document.getElementById("hero-section");
    if (!section) return;

    scrollRows.current = section.querySelectorAll(".scroll-to .scroll-to__row span");

    const dur40  = 1.3333;
    const dur50  = 1.6666;
    const delay1 = 0.0666;
    const delay2 = 0.1333;
    const delay3 = 0.2;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const tl = gsap.timeline();

        if (isFR) {
          /* ── Animation FR : caractères qui montent ligne par ligne ── */
          const row1 = section.querySelectorAll('.hs-fr-row--1 .hs-fr-ch');
          const row2 = section.querySelectorAll('.hs-fr-row--2 .hs-fr-ch');
          tl
            .fromTo(btnCircle.current, { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: dur40 }, 0)
            .fromTo(headerRef.current, { y: "-2rem" },                { y: "0rem",   duration: dur40 },            0)
            .fromTo(row1, { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, stagger: 0.028, duration: 0.7, ease: 'power4.out' }, 0.05)
            .fromTo(row2, { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, stagger: 0.022, duration: 0.7, ease: 'power4.out' }, 0.32)
            .fromTo(bookRef.current,   { y: "3.47vw" }, { y: "0", duration: dur40 }, delay1)
            .fromTo(openRef.current,   { y: "2.08vw" }, { y: "0", duration: dur40 }, delay2)
            .fromTo(btnText.current,   { y: "2.78vw" }, { y: "0", duration: dur40 }, delay2)
            .fromTo(copyRef.current,   { y: "2.78vw" }, { y: "0", duration: dur40 }, delay3)
            .fromTo(scrollRows.current,{ y: "3.47vw" }, { y: "0", duration: dur40 }, delay3);
        } else {
          /* ── Animation EN : mots qui glissent (existant) ── */
          tl
            .fromTo(btnCircle.current,   { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: dur40 }, 0)
            .fromTo(headerRef.current,   { y: "-2rem" },                { y: "0rem",   duration: dur40 },            0)
            .fromTo(iRef.current,        { x: "18.75vw" },              { x: "0",      duration: dur50 },            0)
            .fromTo(bookRef.current,     { y: "3.47vw" },               { y: "0",      duration: dur40 },            delay1)
            .fromTo(diRef.current,       { x: "14.58vw" },              { x: "0",      duration: dur50 },            delay1)
            .fromTo(peRef.current,       { x: "-8.33vw" },              { x: "0",      duration: dur50 },            delay1)
            .fromTo(encesRef.current,    { x: "-22.22vw" },             { x: "0",      duration: dur50 },            delay1)
            .fromTo(openRef.current,     { y: "2.08vw" },               { y: "0",      duration: dur40 },            delay2)
            .fromTo(btnText.current,     { y: "2.78vw" },               { y: "0",      duration: dur40 },            delay2)
            .fromTo(craftRef.current,    { x: "-13.89vw" },             { x: "0",      duration: dur50 },            delay2)
            .fromTo(gitalRef.current,    { x: "-21.53vw" },             { x: "0",      duration: dur50 },            delay2)
            .fromTo(exRef.current,       { x: "29.86vw" },              { x: "0",      duration: dur50 },            delay2)
            .fromTo(riRef.current,       { x: "13.19vw" },              { x: "0",      duration: dur50 },            delay2)
            .fromTo(copyRef.current,     { y: "2.78vw" },               { y: "0",      duration: dur40 },            delay3)
            .fromTo(scrollRows.current,  { y: "3.47vw" },               { y: "0",      duration: dur40 },            delay3);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isFR]);

  return (
    <section id="hero-section">
      <ThreeBackground />
      <header className="hs-header" ref={headerRef}>
        <div className="hs-flex-wrapper">
          <div className="hs-logo-wrap">
            <span className="hs-btn-2">MAMPASSI</span>
            <span className="hs-btn-2">MOUKIETOU</span>
          </div>
          <ul className="hs-header-menu">
            <li className="hs-header-menu__item hs-header-text" onClick={onProjects}>{tr('nav_projects', lang)}</li>
            <li className="hs-header-menu__item hs-header-text" onClick={onAbout}>{tr('nav_about', lang)}</li>
            <li className="hs-header-menu__item hs-header-text" onClick={onContact}>{tr('nav_contact', lang)}</li>
          </ul>
        </div>
      </header>

      <div className="hs-container">
        <div className="hs-title-block">

          {isFR ? (
            /* ── Titre FR ── */
            <div className="hs-title-h1" style={{ perspective: '600px' }}>
              <div className="hs-fr-row hs-fr-row--1">
                <Chars text="JE TRANSFORME" cls="hs-fr-ch" />
              </div>
              <div className="hs-fr-row hs-fr-row--2">
                <Chars text="TOUTES VOS IDÉES" cls="hs-fr-ch hs-fr-ch--blue" />
              </div>
            </div>
          ) : (
            /* ── Titre EN (inchangé) ── */
            <div className="hs-title-h1">
              <div className="hs-title-row hs-title-row-1">
                <div className="hs-charts-cont" id="hc-i">
                  <span ref={iRef}>I</span>
                </div>
                <div className="hs-charts-cont" id="hc-craft">
                  <span ref={craftRef}>TURN</span>
                </div>
                <div className="hs-charts-cont" id="hc-di">
                  <span ref={diRef}>I</span>
                </div>
                <div className="hs-charts-cont" id="hc-gital">
                  <span ref={gitalRef}>DEAS</span>
                </div>
              </div>
              <div className="hs-title-row hs-title-row-2">
                <div className="hs-charts-cont" id="hc-ex">
                  <span ref={exRef}>IN</span>
                </div>
                <div className="hs-charts-cont" id="hc-pe">
                  <span ref={peRef}>TO</span>
                </div>
                <div className="hs-charts-cont" id="hc-ri">
                  <span ref={riRef}>RE</span>
                </div>
                <div className="hs-charts-cont" id="hc-ences">
                  <span ref={encesRef}>ALITY</span>
                </div>
              </div>
            </div>
          )}

          <div className="hs-first-desc">
            <span className="hs-desc" ref={bookRef}>{tr('hero_desc1', lang)}</span>
          </div>
          <div className="hs-second-desc">
            <span className="hs-desc" ref={openRef}>{tr('hero_desc2', lang)}</span>
          </div>
        </div>

        <div className="hs-copyright">
          <span className="hs-desc" ref={copyRef}>{tr('hero_copy', lang)}</span>
        </div>

        <div className="hs-scroll-to">
          <div className="hs-scroll-to__row"><span className="hs-desc">{tr('hero_enter1', lang)}</span></div>
          <div className="hs-scroll-to__row"><span className="hs-desc">{tr('hero_enter2', lang)}</span></div>
        </div>

        <div className="hs-book-btn" onClick={onContact} style={{ cursor: 'pointer' }}>
          <div className="hs-book-btn__circle" ref={btnCircle} />
          <div className="hs-btn-text">
            <span className="hs-btn" ref={btnText}>{tr('hero_cta', lang)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
