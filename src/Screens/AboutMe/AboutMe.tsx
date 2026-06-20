import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutMe.css';
import { useLang } from '../../i18n/LangContext';
import { tr } from '../../i18n/translations';
import type { Lang } from '../../i18n/translations';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────
const STACK_TECHS = [
  ['React', 'TypeScript', 'Three.js', 'GSAP', 'Next.js', 'JavaScript', 'Tailwind CSS', 'HTML/CSS', 'Vite'],
  ['Node.js', 'PHP', 'Symfony', 'GraphQL', 'REST API', 'Python', 'Express.js', 'Nginx'],
  ['SQL', 'PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'Prisma', 'SQLite'],
  ['Git', 'Docker', 'Grafana', 'Figma', 'CI/CD', 'Kubernetes', 'Jest', 'Linux'],
  ['MVC', 'SOLID', 'Clean Architecture', 'Microservices', 'DDD', 'REST', 'Design Patterns'],
];

const STACK_KEYS = ['ab_cat1','ab_cat2','ab_cat3','ab_cat6','ab_cat4'] as const;

const TL_YEARS   = ['2021','2022','2023','2024'] as const;
const TL_KEYS    = ['ab_tl1','ab_tl2','ab_tl3','ab_tl4'] as const;
const TAG_KEYS   = ['ab_tag1','ab_tag2','ab_tag3','ab_tag4','ab_tag5'] as const;

const STATS_KEYS = [
  { valKey: 'ab_stat1_val', lblKey: 'ab_stat1_lbl', end: 4,   suffix: ''  },
  { valKey: 'ab_stat2_val', lblKey: 'ab_stat2_lbl', end: 20,  suffix: '+' },
  { valKey: 'ab_stat3_val', lblKey: 'ab_stat3_lbl', end: 100, suffix: '%' },
] as const;

// ─── Char-split helper ─────────────────────────────────────────────────────────
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

// ─── Component ─────────────────────────────────────────────────────────────────
export function AboutMe({ onBack }: { onBack: () => void }) {
  const lang      = useLang();
  const t         = (k: string) => tr(k, lang as Lang);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef   = useRef<HTMLDivElement>(null);

  /* ── Three.js ─────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 12;

    // ── Star field
    const starCount = 1800;
    const starPos   = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 80;
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x6666ff, size: 0.045, transparent: true, opacity: 0.45 })));


    // ── Node network
    const N     = 90;
    const DMAX  = 4.2;
    const nPos  = new Float32Array(N * 3);
    const nVel  = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      nPos[i * 3]     = (Math.random() - 0.5) * 24;
      nPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      nPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      nVel[i * 3]     = (Math.random() - 0.5) * 0.004;
      nVel[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      nVel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nPos, 3));
    scene.add(new THREE.Points(nodeGeo, new THREE.PointsMaterial({ color: 0x6666ff, size: 0.11, transparent: true, opacity: 0.9 })));

    // ── Lines
    const maxPairs = N * (N - 1) / 2;
    const lPos     = new Float32Array(maxPairs * 2 * 3);
    const lineGeo  = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
    const lineSegs = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x6666ff, transparent: true, opacity: 0.1 }));
    scene.add(lineSegs);

    // ── Mouse parallax
    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    // ── Animate
    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);

const np = nodeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < N; i++) {
        np[i * 3]     += nVel[i * 3];
        np[i * 3 + 1] += nVel[i * 3 + 1];
        np[i * 3 + 2] += nVel[i * 3 + 2];
        if (Math.abs(np[i * 3])     > 12) nVel[i * 3]     *= -1;
        if (Math.abs(np[i * 3 + 1]) > 7)  nVel[i * 3 + 1] *= -1;
        if (Math.abs(np[i * 3 + 2]) > 4)  nVel[i * 3 + 2] *= -1;
      }
      nodeGeo.attributes.position.needsUpdate = true;

      const lp = lineGeo.attributes.position.array as Float32Array;
      let li = 0;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = np[i*3]-np[j*3], dy = np[i*3+1]-np[j*3+1], dz = np[i*3+2]-np[j*3+2];
          if (dx*dx + dy*dy + dz*dz < DMAX*DMAX) {
            lp[li++]=np[i*3]; lp[li++]=np[i*3+1]; lp[li++]=np[i*3+2];
            lp[li++]=np[j*3]; lp[li++]=np[j*3+1]; lp[li++]=np[j*3+2];
          }
        }
      }
      lineGeo.setDrawRange(0, li / 3);
      lineGeo.attributes.position.needsUpdate = true;

      camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 0.8 - camera.position.y) * 0.03;

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const w = innerWidth, h = innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  /* ── GSAP ─────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    ScrollTrigger.defaults({ scroller: root });

    // Hero entrance
    gsap.timeline({ delay: 0.15 })
      .fromTo('.ab-label',
        { opacity: 0, y: 20, letterSpacing: '0.4em' },
        { opacity: 1, y: 0,  letterSpacing: '0.22em', duration: 1, ease: 'power3.out' }
      )
      .fromTo('.ab-title-ch',
        { y: '115%', rotateX: -40 },
        { y: '0%',   rotateX: 0, stagger: 0.022, duration: 0.85, ease: 'power4.out' },
        '-=0.5'
      )
      .fromTo('.ab-hero-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0,  duration: 0.9, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo('.ab-scroll-hint',
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        '-=0.2'
      );

    // Stats counter
    ScrollTrigger.create({
      trigger: '.ab-stats',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo('.ab-stat',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }
        );
        document.querySelectorAll<HTMLElement>('.ab-stat-num').forEach(el => {
          const end = parseInt(el.dataset.end ?? '0');
          const obj = { v: 0 };
          gsap.to(obj, {
            v: end, duration: 2.5, ease: 'power2.out',
            onUpdate() { el.innerText = Math.round(obj.v).toLocaleString(); }
          });
        });
      },
    });

    // Bio
    gsap.fromTo('.ab-bio-photo',
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-bio', start: 'top 75%' } }
    );
    gsap.fromTo('.ab-bio-text',
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-bio', start: 'top 75%' } }
    );

    // Stack cards
    gsap.fromTo('.ab-stack-card',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-stack', start: 'top 80%' } }
    );

    // Timeline items
    gsap.fromTo('.ab-tl-item',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-timeline', start: 'top 72%' } }
    );

    // Quote
    gsap.fromTo('.ab-quote-inner',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-quote', start: 'top 70%' } }
    );

    // Contact
    gsap.fromTo('.ab-contact-link',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-contact', start: 'top 80%' } }
    );

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  /* ── Render ───────────────────────────────────────────────────────────────── */
  return (
    <div className="ab-wrapper">
      <canvas ref={canvasRef} className="ab-canvas" />
      <button className="ab-back" onClick={onBack}>{t('back')}</button>

      <div className="ab-root" ref={rootRef}>

        {/* ── HERO ── */}
        <section className="ab-hero">
          <div className="ab-hero-inner">
            <p className="ab-label">{t('ab_sub')}</p>
            <h1 className="ab-title" aria-label={t('ab_hero_aria')}>
              <span className="ab-title-line">
                <Chars text={t('ab_hero_line1')} cls="ab-title-ch" />
              </span>
              <span className="ab-title-line">
                <Chars text={t('ab_hero_line2')} cls="ab-title-ch ab-blue" />
              </span>
            </h1>
            <p className="ab-hero-sub">{t('ab_sub')}</p>
          </div>
          <div className="ab-scroll-hint">
            <span className="ab-scroll-text">{t('scroll')}</span>
            <div className="ab-scroll-bar"><div className="ab-scroll-bar-fill" /></div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="ab-stats">
          {STATS_KEYS.map(({ lblKey, end, suffix }) => (
            <div key={lblKey} className="ab-stat">
              <div className="ab-stat-top">
                <span className="ab-stat-num" data-end={end}>0</span>
                <span className="ab-stat-suffix">{suffix}</span>
              </div>
              <p className="ab-stat-label">{t(lblKey)}</p>
            </div>
          ))}
        </section>

        {/* ── BIO ── */}
        <section className="ab-bio">
          <div className="ab-bio-photo">
            <div className="ab-bio-ring" />
            <img
              src="https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1"
              alt="Mampassi"
              className="ab-bio-img"
            />
          </div>
          <div className="ab-bio-text">
            <h2 className="ab-section-title">{t('ab_who_title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('ab_bio1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('ab_bio2') }} />
            <div className="ab-tags">
              {TAG_KEYS.map(k => (
                <span key={k} className="ab-tag">{t(k)}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── STACK ── */}
        <section className="ab-stack">
          <h2 className="ab-section-title ab-centered">{t('ab_stack_title')}</h2>
          <div className="ab-stack-grid">
            {STACK_KEYS.map((catKey, i) => (
              <div key={catKey} className="ab-stack-card" data-num={String(i + 1).padStart(2, '0')}>
                <h3 className="ab-stack-cat">
                  <span className="ab-stack-idx">0{i + 1}</span>
                  {t(catKey)}
                </h3>
                <div className="ab-stack-techs">
                  {STACK_TECHS[i].map(tech => <span key={tech} className="ab-tech">{tech}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="ab-timeline">
          <h2 className="ab-section-title ab-centered">{t('ab_journey_title')}</h2>
          <div className="ab-tl-list">
            {TL_KEYS.map((key, i) => (
              <div key={key} className="ab-tl-item" data-year={TL_YEARS[i]}>
                <div className="ab-tl-header">
                  <span className="ab-tl-year">{TL_YEARS[i]}</span>
                  <span className="ab-tl-idx">— 0{i + 1}</span>
                </div>
                <h4 className="ab-tl-title">{t(`${key}_title`)}</h4>
                <p className="ab-tl-desc">{t(`${key}_desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── QUOTE ── */}
        <section className="ab-quote">
          <div className="ab-quote-inner ab-quote-text">
            <div className="ab-quote-rule"><span className="ab-quote-diamond">◆</span></div>
            <blockquote className="ab-quote-body">
              <span className="ab-quote-mark">"</span>
              <p>{t('ab_quote1')}</p>
              <p><span className="ab-blue">{t('ab_quote2')}</span></p>
            </blockquote>
            <p className="ab-quote-attr">{t('ab_quote_attr')}</p>
            <div className="ab-quote-rule"><span className="ab-quote-diamond">◆</span></div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="ab-contact">
          <h2 className="ab-section-title ab-centered">{t('ab_together')}</h2>
          <p className="ab-contact-sub">{t('ab_avail')}</p>
          <div className="ab-contact-grid">
            <a href="mailto:christhmoukietou@gmail.com" className="ab-contact-card ab-contact-card--main ab-contact-link">
              <div className="ab-contact-card-left">
                <i className="far fa-envelope ab-contact-icon" />
                <div>
                  <span className="ab-contact-label">{t('ab_send_email')}</span>
                  <span className="ab-contact-value">christhmoukietou@gmail.com</span>
                </div>
              </div>
              <span className="ab-contact-arrow">→</span>
            </a>
            <div className="ab-contact-row">
              <a href="#" className="ab-contact-card ab-contact-link">
                <div className="ab-contact-card-left">
                  <i className="fab fa-github ab-contact-icon" />
                  <div>
                    <span className="ab-contact-label">GitHub</span>
                    <span className="ab-contact-value">github.com/mampassi</span>
                  </div>
                </div>
                <span className="ab-contact-arrow">→</span>
              </a>
              <a href="#" className="ab-contact-card ab-contact-link">
                <div className="ab-contact-card-left">
                  <i className="fab fa-linkedin ab-contact-icon" />
                  <div>
                    <span className="ab-contact-label">LinkedIn</span>
                    <span className="ab-contact-value">linkedin.com/in/mampassi</span>
                  </div>
                </div>
                <span className="ab-contact-arrow">→</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
