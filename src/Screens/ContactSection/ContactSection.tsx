import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import './ContactSection.css';
import { useLang } from '../../i18n/LangContext';
import { tr } from '../../i18n/translations';

gsap.registerPlugin(ScrollTrigger);

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

const LINKS = [
  { label: 'Email',    value: 'christhmoukietou@gmail.com', href: 'mailto:christhmoukietou@gmail.com', icon: 'far fa-envelope' },
  { label: 'GitHub',   value: 'github.com/mampassi',        href: '#',                                  icon: 'fab fa-github'   },
  { label: 'LinkedIn', value: 'linkedin.com/in/mampassi',   href: '#',                                  icon: 'fab fa-linkedin' },
];

export function ContactSection({ onBack }: { onBack: () => void }) {
  const lang       = useLang();
  const t          = (k: string) => tr(k, lang);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rootRef    = useRef<HTMLDivElement>(null);
  const submitRef  = useRef<HTMLButtonElement>(null);
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [sent, setSent]     = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const [focus, setFocus]   = useState<string | null>(null);

  /* ── Three.js : wave grid + rotating torus ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 200);
    camera.position.set(0, 6, 18);
    camera.lookAt(0, 0, 0);

    /* ── Wave particle grid ── */
    const COLS = 60, ROWS = 40, SPACING = 0.55;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        positions[i * 3]     = (c - COLS / 2) * SPACING;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (r - ROWS / 2) * SPACING;
      }
    }

    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const grid = new THREE.Points(gridGeo, new THREE.PointsMaterial({ color: 0x6666ff, size: 0.06, transparent: true, opacity: 0.55 }));
    scene.add(grid);


    /* ── Sparse stars ── */
    const sPos = new Float32Array(600 * 3);
    for (let i = 0; i < sPos.length; i++) sPos[i] = (Math.random() - 0.5) * 80;
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0xaaaaff, size: 0.03, transparent: true, opacity: 0.25 })));

    /* ── Mouse ── */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / innerWidth  - 0.5) * 2;
      mouse.ty = (e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    let raf: number;
    let t = 0;
    const posAttr = gridGeo.attributes.position as THREE.BufferAttribute;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.012;

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i  = r * COLS + c;
          const x  = posAttr.getX(i);
          const z  = posAttr.getZ(i);
          const dist   = Math.sqrt((x - mouse.x * 8) ** 2 + (z - mouse.y * 5) ** 2);
          const ripple = Math.exp(-dist * 0.18) * Math.sin(dist * 1.4 - t * 3) * 0.7;
          const wave   = Math.sin(x * 0.5 + t) * 0.35 + Math.cos(z * 0.4 + t * 0.8) * 0.28;
          posAttr.setY(i, wave + ripple);
        }
      }
      posAttr.needsUpdate = true;

      camera.position.x += (mouse.x * 1.8 - camera.position.x) * 0.025;
      camera.position.y += (-mouse.y * 1.2 + 6 - camera.position.y) * 0.025;

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', onResize); renderer.dispose(); };
  }, []);

  /* ── GSAP ── */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    ScrollTrigger.defaults({ scroller: root });

    gsap.timeline({ delay: 0.15 })
      .fromTo('.ct-label',    { opacity: 0, y: 18, letterSpacing: '0.4em' }, { opacity: 1, y: 0, letterSpacing: '0.22em', duration: 0.9, ease: 'power3.out' })
      .fromTo('.ct-title-ch', { y: '110%', rotateX: -40 },                   { y: '0%', rotateX: 0, stagger: 0.025, duration: 0.85, ease: 'power4.out' }, '-=0.5')
      .fromTo('.ct-sub',      { opacity: 0, y: 22 },                         { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .fromTo('.ct-scroll-hint', { opacity: 0 },                             { opacity: 1, duration: 0.8 }, '-=0.1');

    gsap.fromTo('.ct-info-link',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-body', start: 'top 78%' } }
    );
    gsap.fromTo('.ct-info-tagline',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-body', start: 'top 80%' } }
    );
    gsap.fromTo('.ct-field',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-form', start: 'top 78%' } }
    );
    gsap.fromTo('.ct-submit',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-form', start: 'top 62%' } }
    );
    gsap.fromTo('.ct-footer-text',
      { opacity: 0 },
      { opacity: 1, duration: 1,
        scrollTrigger: { trigger: '.ct-footer', start: 'top 90%' } }
    );

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  /* ── Magnetic submit button ── */
  useEffect(() => {
    const btn = submitRef.current;
    if (!btn) return;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width  / 2;
      const y = e.clientY - r.top  - r.height / 2;
      gsap.to(btn, { x: x * 0.28, y: y * 0.28, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => { btn.removeEventListener('mousemove', onMove); btn.removeEventListener('mouseleave', onLeave); };
  }, [sent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    gsap.to('.ct-submit', { scale: 0.93, duration: 0.1, yoyo: true, repeat: 1 });

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message, to_email: 'christhmoukietou@gmail.com' },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
    } catch {
      setError('Une erreur est survenue. Réessayez ou contactez-moi directement.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="ct-wrapper">
      <canvas ref={canvasRef} className="ct-canvas" />
      <button className="ct-back" onClick={onBack}>{t('back')}</button>

      <div className="ct-root" ref={rootRef}>

        {/* ── HERO ── */}
        <section className="ct-hero">
          <div className="ct-hero-inner">
            <p className="ct-label">{t('ct_label')}</p>
            <h1 className="ct-title">
              <span className="ct-title-line"><Chars text={t('ct_title1')} cls="ct-title-ch" /></span>
              {t('ct_title2') && (
                <span className="ct-title-line"><Chars text={t('ct_title2')} cls="ct-title-ch ct-blue" /></span>
              )}
            </h1>
            <p className="ct-sub" style={{ whiteSpace: 'pre-line' }}>{t('ct_sub')}</p>
          </div>
          <div className="ct-scroll-hint">
            <span className="ct-scroll-text">{t('scroll')}</span>
            <div className="ct-scroll-bar"><div className="ct-scroll-bar-fill" /></div>
          </div>
        </section>

        {/* ── BODY ── */}
        <section className="ct-body">

          {/* Info */}
          <div className="ct-info">
            <p className="ct-info-tagline" style={{ whiteSpace: 'pre-line' }}>{t('ct_tagline')}</p>
            <div className="ct-info-links">
              {LINKS.map(({ label, value, href, icon }) => (
                <a key={label} href={href} className="ct-info-link">
                  <span className="ct-info-icon"><i className={icon} /></span>
                  <div className="ct-info-text">
                    <span className="ct-info-label">{label}</span>
                    <span className="ct-info-value">{value}</span>
                  </div>
                  <span className="ct-info-arrow">→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="ct-form" onSubmit={handleSubmit}>
            {sent ? (
              <div className="ct-sent">
                <div className="ct-sent-circle">✓</div>
                <h3 className="ct-sent-title">{t('ct_sent_title')}</h3>
                <p className="ct-sent-sub">{t('ct_sent_sub')}</p>
              </div>
            ) : (
              <>
                <div className="ct-field">
                  <input type="text" id="ct-name" className="ct-input" placeholder=" "
                    value={form.name} required
                    onFocus={() => setFocus('name')}
                    onBlur={() => setFocus(null)}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  <label htmlFor="ct-name" className="ct-field-label">{t('ct_name')}</label>
                  <span className={`ct-field-line${focus === 'name' ? ' ct-field-line--active' : ''}`} />
                </div>

                <div className="ct-field">
                  <input type="email" id="ct-email" className="ct-input" placeholder=" "
                    value={form.email} required
                    onFocus={() => setFocus('email')}
                    onBlur={() => setFocus(null)}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  <label htmlFor="ct-email" className="ct-field-label">{t('ct_email')}</label>
                  <span className={`ct-field-line${focus === 'email' ? ' ct-field-line--active' : ''}`} />
                </div>

                <div className="ct-field ct-field--textarea">
                  <textarea id="ct-message" className="ct-input ct-textarea" placeholder=" " rows={5}
                    value={form.message} required
                    onFocus={() => setFocus('message')}
                    onBlur={() => setFocus(null)}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                  <label htmlFor="ct-message" className="ct-field-label">{t('ct_message')}</label>
                  <span className={`ct-field-line${focus === 'message' ? ' ct-field-line--active' : ''}`} />
                  <span className="ct-char-count">{form.message.length} / 500</span>
                </div>

                {error && <p className="ct-error">{t('ct_error')}</p>}

                <button type="submit" className="ct-submit" ref={submitRef} disabled={sending}>
                  <span className="ct-submit-text">{sending ? t('ct_sending') : t('ct_send')}</span>
                  <span className="ct-submit-arrow">{sending ? '...' : '→'}</span>
                </button>
              </>
            )}
          </form>
        </section>

        {/* ── FOOTER ── */}
        <section className="ct-footer">
          <p className="ct-footer-text">{t('ct_footer')}</p>
        </section>

      </div>
    </div>
  );
}
