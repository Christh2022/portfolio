import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Lang } from '../../i18n/translations';
import './LangSelect.css';

interface Props {
  onSelect: (lang: Lang) => void;
}

const NAME_CHARS = 'AMPASSI MOUKIETOU'.split('');

export function LangSelect({ onSelect }: Props) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const initialRef = useRef<HTMLSpanElement>(null);
  const charsRef   = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef    = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const frRef      = useRef<HTMLButtonElement>(null);
  const enRef      = useRef<HTMLButtonElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const cursorRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // ── Cursor + ambient glow follow mouse ──
    const onMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        left: e.clientX, top: e.clientY,
        duration: 0.06, ease: 'none',
      });
      gsap.to(ambientRef.current, {
        left: e.clientX, top: e.clientY,
        duration: 1.1, ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', onMove);

    // ── 3D card tilt + inner glow tracking ──
    const setupCard = (card: HTMLButtonElement | null) => {
      if (!card) return () => {};
      const glow = card.querySelector<HTMLElement>('.ls-card-iglow');

      const onCardMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        gsap.to(card, {
          rotateY: x * 22, rotateX: -y * 22,
          duration: 0.25, ease: 'power2.out',
          transformPerspective: 700,
        });
        if (glow) {
          gsap.to(glow, {
            left: `${(x + 0.5) * 100}%`,
            top:  `${(y + 0.5) * 100}%`,
            duration: 0.3,
          });
        }
      };

      const onEnter = () => {
        if (glow) gsap.to(glow, { opacity: 1, duration: 0.3 });
        gsap.to(card.querySelector('.ls-card-topline'), { opacity: 1, duration: 0.3 });
      };

      const onLeave = () => {
        gsap.to(card, {
          rotateY: 0, rotateX: 0,
          duration: 0.7, ease: 'elastic.out(1, 0.45)',
        });
        if (glow) gsap.to(glow, { opacity: 0, duration: 0.4 });
        gsap.to(card.querySelector('.ls-card-topline'), { opacity: 0, duration: 0.3 });
      };

      card.addEventListener('mousemove', onCardMove);
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      return () => {
        card.removeEventListener('mousemove', onCardMove);
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeave);
      };
    };

    const cleanFr = setupCard(frRef.current);
    const cleanEn = setupCard(enRef.current);

    // ── Entrance timeline ──
    const ctx = gsap.context(() => {
      const chars = charsRef.current.filter(Boolean);
      gsap.set(chars, { y: 28, opacity: 0 });
      gsap.set([frRef.current, enRef.current], { transformPerspective: 700 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl
        .fromTo(wrap, { opacity: 0 }, { opacity: 1, duration: 0.45 })
        .fromTo(
          initialRef.current,
          { scale: 0.55, opacity: 0, filter: 'blur(28px)' },
          { scale: 1,    opacity: 1, filter: 'blur(0px)',  duration: 1.1, ease: 'expo.out' },
          0.15,
        )
        .to(chars, { y: 0, opacity: 1, duration: 0.55, stagger: 0.038 }, 0.5)
        .fromTo(lineRef.current,    { scaleX: 0 }, { scaleX: 1, duration: 0.75, ease: 'power2.inOut' }, 1.0)
        .fromTo(subtextRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, 1.3)
        .fromTo(frRef.current, { y: 65, opacity: 0, scale: 0.88 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, 1.42)
        .fromTo(enRef.current, { y: 65, opacity: 0, scale: 0.88 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, 1.57);
    }, wrap);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', onMove);
      cleanFr();
      cleanEn();
    };
  }, []);

  const pick = (lang: Lang) => {
    const other  = lang === 'fr' ? enRef.current : frRef.current;
    const chosen = lang === 'fr' ? frRef.current : enRef.current;
    const chars  = charsRef.current.filter(Boolean);

    const tl = gsap.timeline({ onComplete: () => onSelect(lang) });
    tl
      .to(other,  { x: lang === 'fr' ? 80 : -80, opacity: 0, scale: 0.75, duration: 0.42, ease: 'power3.in' }, 0)
      .to([subtextRef.current, lineRef.current], { opacity: 0, y: -8, duration: 0.28 }, 0)
      .to(chars,  { y: -18, opacity: 0, stagger: { each: 0.025, from: 'end' }, duration: 0.32 }, 0.04)
      .to(initialRef.current, { scale: 1.25, opacity: 0, filter: 'blur(24px)', duration: 0.5, ease: 'power2.in' }, 0.08)
      .to(chosen, { scale: 1.1, y: -8,  duration: 0.22, ease: 'power2.out' }, 0.08)
      .to(chosen, { opacity: 0, y: -40, duration: 0.4,  ease: 'power3.in' }, 0.28)
      .to(wrapRef.current, { opacity: 0, duration: 0.38 }, 0.42);
  };

  return (
    <div ref={wrapRef} className="ls-wrap">
      {/* Custom cursor */}
      <div ref={cursorRef} className="ls-cursor" aria-hidden="true" />

      {/* Mouse-tracking ambient glow */}
      <div ref={ambientRef} className="ls-ambient" aria-hidden="true" />

      {/* Film grain */}
      <div className="ls-noise" aria-hidden="true" />

      {/* Scanlines */}
      <div className="ls-scanlines" aria-hidden="true" />

      {/* Background orbs */}
      <div className="ls-orb ls-orb--1" aria-hidden="true" />
      <div className="ls-orb ls-orb--2" aria-hidden="true" />

      {/* Rising particles */}
      <div className="ls-particles" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="ls-particle" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      {/* Corner brackets */}
      <div className="ls-corner ls-corner--tl" aria-hidden="true" />
      <div className="ls-corner ls-corner--tr" aria-hidden="true" />
      <div className="ls-corner ls-corner--bl" aria-hidden="true" />
      <div className="ls-corner ls-corner--br" aria-hidden="true" />

      <div className="ls-center">
        {/* Logo */}
        <div className="ls-logo">
          <span ref={initialRef} className="ls-logo-initial">M</span>
          <div className="ls-logo-name-wrap">
            {NAME_CHARS.map((ch, i) => (
              <span
                key={i}
                ref={el => { charsRef.current[i] = el; }}
                className={ch === ' ' ? 'ls-name-space' : 'ls-name-char'}
              >
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div ref={lineRef} className="ls-divider">
          <span className="ls-divider-gem" aria-hidden="true">◆</span>
        </div>

        {/* Subtext */}
        <div ref={subtextRef} className="ls-subtext">
          <span>Choisissez votre langue</span>
          <span className="ls-subtext-sep" aria-hidden="true">✦</span>
          <span>Choose your language</span>
        </div>

        {/* Language cards */}
        <div className="ls-cards">
          <button ref={frRef} className="ls-card" onClick={() => pick('fr')}>
            <span className="ls-card-iglow"   aria-hidden="true" />
            <span className="ls-card-topline" aria-hidden="true" />
            <span className="ls-card-num">01</span>
            <span className="ls-card-flag">🇫🇷</span>
            <span className="ls-card-code">FR</span>
            <span className="ls-card-label">Français</span>
          </button>

          <button ref={enRef} className="ls-card" onClick={() => pick('en')}>
            <span className="ls-card-iglow"   aria-hidden="true" />
            <span className="ls-card-topline" aria-hidden="true" />
            <span className="ls-card-num">02</span>
            <span className="ls-card-flag">🇬🇧</span>
            <span className="ls-card-code">EN</span>
            <span className="ls-card-label">English</span>
          </button>
        </div>
      </div>
    </div>
  );
}
