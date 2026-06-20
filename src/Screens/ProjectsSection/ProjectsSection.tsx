import { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import "./ProjectsSection.css";
import { useLang } from "../../i18n/LangContext";
import { tr } from "../../i18n/translations";
import nnovateq01 from "../../assets/nnovateq/01.png";
import nno1 from "../../assets/nnovateq/nno-1.png";
import nno2 from "../../assets/nnovateq/nno-2.png";
import nno3 from "../../assets/nnovateq/nno-3.png";
import nno4 from "../../assets/nnovateq/nno-4.png";
import acs01 from "../../assets/acs-conciergerie/01.png";
import acs1 from "../../assets/acs-conciergerie/acs-1.png";
import acs2 from "../../assets/acs-conciergerie/acs-2.png";
import acs3 from "../../assets/acs-conciergerie/acs-3.png";
import acs4 from "../../assets/acs-conciergerie/acs-4.png";
import acs5 from "../../assets/acs-conciergerie/acs-5.png";
import acs6 from "../../assets/acs-conciergerie/acs-6.png";
import acs7 from "../../assets/acs-conciergerie/acs-7.png";
import acs8 from "../../assets/acs-conciergerie/acs-8.png";
import acs9 from "../../assets/acs-conciergerie/acs-9.png";

function ModalTitle({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((c, i) => (
        <span key={i} className="cyl-modal__title-ch" style={{ display: 'inline-block' }}>
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </>
  );
}

// ─── Images ───────────────────────────────────────────────────────────────────
const IMAGES = [
  "https://assets.codepen.io/215059/photo-1594149221886-eb520f85ad25.jpg",
  "https://assets.codepen.io/215059/photo-1589156191108-c762ff4b96ab.jpg",
  "https://assets.codepen.io/215059/photo-1488197047962-b48492212cda.jpg",
  "https://assets.codepen.io/215059/photo-1469565686301-a0cf06bacf92.jpg",
  "https://assets.codepen.io/215059/photo-1559827291-72ee739d0d9a.jpg",
  "https://assets.codepen.io/215059/photo-1459213599465-03ab6a4d5931.jpg",
  "https://assets.codepen.io/215059/photo-1679540375857-dd5a85bfd3d6.jpg",
  "https://assets.codepen.io/215059/photo-1444044205806-38f3ed106c10.jpg",
  "https://assets.codepen.io/215059/photo-1580996554587-5d5cfc78b004.jpg",
  "https://assets.codepen.io/215059/photo-1488161628813-04466f872be2.jpg",
  "https://assets.codepen.io/215059/photo-1548783307-f63adc3f200b.jpg",
  "https://assets.codepen.io/215059/photo-1587653263995-422546a7a569.jpg",
  "https://assets.codepen.io/215059/photo-1447871622716-5dc761437456.jpg",
  "https://assets.codepen.io/215059/photo-1693043906043-fc76548579af.jpg",
  "https://assets.codepen.io/215059/photo-1559827260-dc66d52bef19.jpg",
  "https://assets.codepen.io/215059/photo-1539125530496-3ca408f9c2d9.jpg",
  "https://assets.codepen.io/215059/photo-1600679620924-47bf7fcbd629.jpg",
  "https://assets.codepen.io/215059/photo-1640008404828-3d3cc5a11fd4.jpg",
  "https://assets.codepen.io/215059/photo-1608965112849-6eb5e5d106b0.jpg",
  "https://assets.codepen.io/215059/photo-1751460374271-377219ff8336.jpg",
  "https://assets.codepen.io/215059/photo-1749460396807-b065b6694f02.jpg",
  "https://assets.codepen.io/215059/photo-1750008172607-d6408ebfc9b5.jpg",
  "https://assets.codepen.io/215059/photo-1663747638247-f2317493492c.jpg",
  "https://assets.codepen.io/215059/photo-1523547743064-d0936dbb6ed3.jpg",
  "https://assets.codepen.io/215059/photo-1660749120048-589827cd6181.jpg",
  "https://assets.codepen.io/215059/photo-1707161692345-8e4684a77d8c.jpg",
  "https://assets.codepen.io/215059/photo-1752481444912-6a4c322de10b.jpg",
];

// ─── Projects ─────────────────────────────────────────────────────────────────
type ProjectMeta = {
  title: string; year: string; category: string;
  tech: string[]; desc: string;
  link: string; github: string;
  duration: string; role: string;
  mockup: string;
  screenshots: string[];
  highlights: string[];
};

const PROJECTS: ProjectMeta[] = [
  {
    title: "NNOVATEQ",
    year: "2025", category: "Full-Stack",
    duration: "2 mois", role: "Développeur Web",
    tech: ["React", "Docker", "Nginx", "JWT", "Tailwind CSS", "Prisma", "Express"],
    github: "#", link: "https://nnovateq.com/",
    mockup: nnovateq01,
    screenshots: [nno1, nno2, nno3, nno4],
    highlights: [
      "Site vitrine complet pour une entreprise de solutions tech",
      "6 services : Wifi-Zones, Dev Web, Apps Mobile, Consulting IT, Formations",
      "Section formations certifiantes (CCNA, Linux RHCSA, Security+, VMware)",
      "Système de devis gratuit en ligne et interface responsive",
    ],
    desc: "Site web professionnel pour NNOVATEQ, entreprise de solutions technologiques innovantes. Présentation des services (Wifi-Zones, Développement Web, Apps Mobile, Consulting IT, Formations), boutique en ligne, système de devis gratuit et section formations certifiantes avec programmes CCNA, Linux RHCSA, Security+ et VMware.",
  },
  {
    title: "ACS Conciergerie",
    year: "2026", category: "Full-Stack",
    duration: "6 semaines", role: "Développeur Web",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Resend"],
    github: "#", link: "#",
    mockup: acs01,
    screenshots: [acs1, acs2, acs3, acs4, acs5, acs6, acs7, acs8, acs9],
    highlights: [
      "Site vitrine haut de gamme pour une conciergerie Airbnb en Essonne",
      "8 services détaillés : accueil voyageurs, ménage, linge, Airbnb SEO…",
      "Galerie immersive full-screen avec curseur personnalisé",
      "Formulaire de contact intégré et modèle de commission 20% TTC",
    ],
    desc: "Site web premium pour ACS Conciergerie, spécialiste de la gestion locative courte durée en Essonne (91). Design luxe noir & or, galerie d'intérieurs immersive, présentation des 8 services de gestion complète (accueil voyageurs, réservations, ménage, linge, optimisation Airbnb, décoration) et formulaire de contact avec envoi d'email.",
  },
];

// ─── Cylindre 3D infini ───────────────────────────────────────────────────────
const COL_COUNT   = 36;
const RADIUS      = 525;
const ROW_H       = 111;
const ROW_OFFSETS = [-222, -111, 0, 111, 222];

type Item = { src: string; lon: number; rowOffset: number; project: ProjectMeta };

const ITEMS: Item[] = (() => {
  const arr: Item[] = [];
  // Offset each row by 1 so adjacent rows alternate projects (checkerboard)
  ROW_OFFSETS.forEach((rowOffset, rowIdx) => {
    for (let c = 0; c < COL_COUNT; c++) {
      const project = PROJECTS[(c + rowIdx) % PROJECTS.length];
      arr.push({
        src:     project.mockup,
        lon:     c * (360 / COL_COUNT),
        rowOffset,
        project,
      });
    }
  });
  return arr;
})();

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProjectsSection({ onBack }: { onBack: () => void }) {
  const lang           = useLang();
  const t              = (k: string) => tr(k, lang);
  const cylRef         = useRef<HTMLDivElement>(null);
  const rotY           = useRef(0);
  const velY           = useRef(0);
  const drag           = useRef({ active: false, x0: 0, moved: false });
  const rafRef         = useRef<number>();
  const clickTargetRef = useRef<Item | null>(null);
  const clickedRect    = useRef<DOMRect | null>(null);
  const modalRef       = useRef<HTMLDivElement>(null);
  const cardRef        = useRef<HTMLDivElement>(null);
  const modalCanvasRef = useRef<HTMLCanvasElement>(null);
  const scanRef        = useRef<HTMLDivElement>(null);
  const openTlRef      = useRef<gsap.core.Timeline | null>(null);
  const lbTurbRef      = useRef<SVGFETurbulenceElement | null>(null);
  const lbDispRef      = useRef<SVGFEDisplacementMapElement | null>(null);
  const lbWaveImgRef   = useRef<HTMLImageElement | null>(null);
  const lbPrevMouse    = useRef({ x: 0, y: 0 });
  const lbDecayRef     = useRef<gsap.core.Tween | null>(null);
  const [selected, setSelected]     = useState<Item | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Slides = screenshots only (mockup is only used for the carousel tile)
  const slides = useMemo(
    () => selected ? selected.project.screenshots : [],
    [selected]
  );

  // Reset slide index when project changes
  useEffect(() => { setActiveSlide(0); setLightboxOpen(false); }, [selected]);

  // Auto-scroll thumbs strip to keep active thumb visible
  useEffect(() => {
    const strip = thumbsRef.current;
    if (!strip) return;
    const activeEl = strip.children[activeSlide] as HTMLElement | undefined;
    if (!activeEl) return;
    const stripRect = strip.getBoundingClientRect();
    const thumbRect = activeEl.getBoundingClientRect();
    const offset = thumbRect.left - stripRect.left - (stripRect.width / 2) + (thumbRect.width / 2);
    strip.scrollBy({ left: offset, behavior: "smooth" });
  }, [activeSlide]);

  // Escape ferme le lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Three.js réseau de noeuds dans le fond du modal
  useEffect(() => {
    if (!selected || !modalCanvasRef.current) return;
    const canvas = modalCanvasRef.current;
    const card   = canvas.parentElement!;
    const W = card.offsetWidth  || 900;
    const H = card.offsetHeight || 700;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-W/2, W/2, H/2, -H/2, 0.1, 100);
    camera.position.z = 10;

    const N = 45;
    const nodes = Array.from({ length: N }, () => ({
      x: (Math.random() - 0.5) * W,
      y: (Math.random() - 0.5) * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    const pPos = new Float32Array(N * 3);
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pts = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x6666ff, size: 2.2, transparent: true, opacity: 0.35, sizeAttenuation: false }));
    scene.add(pts);

    const MAX_SEG = N * N;
    const lPos = new Float32Array(MAX_SEG * 6);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
    const lMesh = new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({ color: 0x6666ff, transparent: true, opacity: 0.09 }));
    scene.add(lMesh);

    const THRESH = Math.min(W, H) * 0.22;
    const mouse  = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      mouse.x =  (e.clientX - r.left - W / 2);
      mouse.y = -(e.clientY - r.top  - H / 2);
    };
    card.addEventListener('mousemove', onMove);

    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      nodes.forEach((n, i) => {
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 130) { n.vx += dx/d*0.012; n.vy += dy/d*0.012; }
        n.vx *= 0.985; n.vy *= 0.985;
        n.x  += n.vx;  n.y  += n.vy;
        if (n.x < -W/2) n.x = W/2;  if (n.x > W/2) n.x = -W/2;
        if (n.y < -H/2) n.y = H/2;  if (n.y > H/2) n.y = -H/2;
        pPos[i*3]=n.x; pPos[i*3+1]=n.y; pPos[i*3+2]=0;
      });
      pGeo.attributes.position.needsUpdate = true;

      let li = 0;
      for (let a = 0; a < N; a++) for (let b = a+1; b < N; b++) {
        const dx = nodes[a].x-nodes[b].x, dy = nodes[a].y-nodes[b].y;
        if (Math.sqrt(dx*dx+dy*dy) < THRESH) {
          lPos[li++]=nodes[a].x; lPos[li++]=nodes[a].y; lPos[li++]=0;
          lPos[li++]=nodes[b].x; lPos[li++]=nodes[b].y; lPos[li++]=0;
        }
      }
      lGeo.setDrawRange(0, li/3);
      lGeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener('mousemove', onMove);
      renderer.dispose(); pGeo.dispose(); lGeo.dispose();
    };
  }, [selected]);

  // ── Entrance animation sur .cyl-inner
  useEffect(() => {
    gsap.fromTo(".cyl-inner",
      { opacity: 0, scale: 0.75 },
      {
        opacity: 1, scale: 1,
        duration: 0.75, ease: "back.out(1.5)",
        stagger: { amount: 1.2, from: "center", grid: [ROW_OFFSETS.length, COL_COUNT] },
        delay: 0.05,
      }
    );
  }, []);

  // ── RAF rotation + décélération
  useEffect(() => {
    const tick = () => {
      if (!drag.current.active) {
        velY.current *= 0.93;
        rotY.current += velY.current;
      }
      if (cylRef.current)
        cylRef.current.style.transform = `rotateY(${rotY.current}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // ── Drag
  const onPointerDown = (e: React.PointerEvent) => {
    if (selected) return;
    drag.current = { active: true, x0: e.clientX, moved: false };
    velY.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x0;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    rotY.current   += dx * 0.28;
    velY.current    = dx * 0.28;
    drag.current.x0 = e.clientX;
  };
  const onPointerUp = () => {
    if (!drag.current.moved && clickTargetRef.current) openModal(clickTargetRef.current);
    drag.current.active  = false;
    clickTargetRef.current = null;
  };

  const openModal = useCallback((item: Item) => { setSelected(item); }, []);

  // ── Animation d'ouverture plein écran
  useLayoutEffect(() => {
    if (!selected || !modalRef.current || !cardRef.current) return;

    const modal = modalRef.current;
    const card  = cardRef.current;
    const scan  = scanRef.current;
    const q     = gsap.utils.selector(card);

    if (openTlRef.current) openTlRef.current.kill();

    gsap.set(modal, { visibility: "visible", opacity: 0 });
    gsap.set(card,  { visibility: "visible", y: 40, opacity: 0 });
    if (scan) gsap.set(scan, { yPercent: -110, opacity: 1 });
    gsap.set(q(".cyl-modal__corner"), { scale: 0, opacity: 0 });
    gsap.set(q(".cyl-modal__browser-screen"), { clipPath: "inset(0 100% 0 0)" });
    gsap.set(q(".cyl-modal__panel-left"),  { x: -50, opacity: 0 });
    gsap.set(q(".cyl-modal__panel-right"), { x:  50, opacity: 0 });
    gsap.set([
      q(".cyl-modal__meta > *"),
      q(".cyl-modal__thumb"),
      q(".cyl-modal__section-title"),
      q(".cyl-modal__desc"),
      q(".cyl-modal__highlight"),
      q(".cyl-modal__tags > span"),
      q(".cyl-modal__stats-card"),
      q(".cyl-modal__cta"),
      q(".cyl-modal__bg-canvas"),
    ], { opacity: 0 });
    gsap.set(q(".cyl-modal__title-ch"), { y: "110%", rotateX: -40, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    openTlRef.current = tl;

    tl.to(modal, { opacity: 1, duration: 0.35 }, 0);
    tl.to(card,  { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" }, 0);
    tl.to(q(".cyl-modal__bg-canvas"), { opacity: 1, duration: 1.4 }, 0.15);

    tl.to(q(".cyl-modal__panel-left"),  { x: 0, opacity: 1, duration: 0.55, ease: "expo.out" }, 0.1);
    tl.to(q(".cyl-modal__panel-right"), { x: 0, opacity: 1, duration: 0.55, ease: "expo.out" }, 0.18);

    if (scan) {
      tl.to(scan, { yPercent: 110, duration: 0.5, ease: "none" }, 0.3);
      tl.to(scan, { opacity: 0, duration: 0.1 }, 0.72);
    }

    tl.fromTo(q(".cyl-modal__corner"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.24, stagger: 0.05, ease: "back.out(2)" }, 0.42);

    tl.fromTo(q(".cyl-modal__meta > *"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.28, stagger: 0.08, ease: "back.out(2.2)" }, 0.38);

    tl.to(q(".cyl-modal__browser-screen"),
      { clipPath: "inset(0 0% 0 0)", duration: 0.52, ease: "expo.out" }, 0.4);

    tl.to(q(".cyl-modal__title-ch"),
      { y: "0%", rotateX: 0, opacity: 1, stagger: 0.028, duration: 0.65, ease: "power4.out" }, 0.48);

    tl.fromTo(q(".cyl-modal__thumb"),
      { scale: 0.82, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.28, stagger: 0.07, ease: "back.out(1.5)" }, 0.7);

    tl.fromTo(q(".cyl-modal__stats-card"),
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 }, 0.62);

    tl.fromTo(q(".cyl-modal__cta"),
      { y: 10, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.32, stagger: 0.1, ease: "back.out(1.9)" }, 0.74);

    tl.fromTo(q(".cyl-modal__section-title"),
      { x: -14, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, stagger: 0.1 }, 0.78);

    tl.fromTo(q(".cyl-modal__desc"),
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.32 }, 0.86);

    tl.fromTo(q(".cyl-modal__highlight"),
      { x: 14, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.26, stagger: 0.07 }, 0.92);

    tl.fromTo(q(".cyl-modal__tags > span"),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.24, stagger: 0.06, ease: "back.out(1.6)" }, 1.06);


  }, [selected]);

  // ── Fermeture plein écran
  const closeModal = useCallback(() => {
    if (!modalRef.current || !cardRef.current) { setSelected(null); return; }
    if (openTlRef.current) openTlRef.current.kill();

    const modal = modalRef.current;
    const card  = cardRef.current;
    const q     = gsap.utils.selector(card);

    const tl = gsap.timeline({ onComplete: () => setSelected(null) });

    tl.to(q(".cyl-modal__corner"),
      { scale: 0, opacity: 0, duration: 0.14, stagger: 0.03, ease: "power2.in" }, 0);

    tl.to([
      q(".cyl-modal__cta"), q(".cyl-modal__tags > span"),
      q(".cyl-modal__highlight"), q(".cyl-modal__desc"), q(".cyl-modal__section-title"),
      q(".cyl-modal__title-ch"), q(".cyl-modal__meta > *"), q(".cyl-modal__bg-canvas"),
    ], { opacity: 0, duration: 0.14 }, 0);

    tl.to(q(".cyl-modal__panel-left"),  { x: -40, opacity: 0, duration: 0.32, ease: "power2.in" }, 0.05);
    tl.to(q(".cyl-modal__panel-right"), { x:  40, opacity: 0, duration: 0.32, ease: "power2.in" }, 0.05);
    tl.to(card,  { y: 30, opacity: 0, duration: 0.3, ease: "power2.in" }, 0.1);
    tl.to(modal, { opacity: 0, duration: 0.25 }, 0.18);
  }, []);

  // ── Wave localisé : masque radial centré sur le curseur
  const onLbImgEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    lbPrevMouse.current = { x: e.clientX, y: e.clientY };
    if (lbDispRef.current) lbDispRef.current.setAttribute("scale", "20");
  }, []);

  const onLbImgMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const disp = lbDispRef.current;
    const turb = lbTurbRef.current;
    const wave = lbWaveImgRef.current;
    if (!disp || !turb || !wave) return;

    // Position relative au conteneur pour le masque CSS
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Vitesse → rayon du cercle + intensité
    const dx = e.clientX - lbPrevMouse.current.x;
    const dy = e.clientY - lbPrevMouse.current.y;
    lbPrevMouse.current = { x: e.clientX, y: e.clientY };
    const speed = Math.sqrt(dx * dx + dy * dy);
    const radius = Math.round(100 + Math.min(speed * 2.5, 80));
    const scale  = Math.round(20 + Math.min(speed * 2.2, 45));

    // Mettre à jour le masque radial — temps réel, sans GSAP
    wave.style.setProperty("--lbmx", `${mx}px`);
    wave.style.setProperty("--lbmy", `${my}px`);
    wave.style.setProperty("--lbr",  `${radius}px`);

    disp.setAttribute("scale", String(scale));

    // Fréquence vague selon position horizontale
    const nx = mx / rect.width;
    turb.setAttribute("baseFrequency", String(0.007 + nx * 0.018));

    // Décroissance douce quand la souris s'arrête
    if (lbDecayRef.current) lbDecayRef.current.kill();
    lbDecayRef.current = gsap.to(disp, {
      attr: { scale: 20 },
      duration: 0.6,
      ease: "power3.out",
      delay: 0.05,
    });
  }, []);

  const onLbImgLeave = useCallback(() => {
    const disp = lbDispRef.current;
    const wave = lbWaveImgRef.current;
    if (lbDecayRef.current) lbDecayRef.current.kill();
    if (disp) gsap.to(disp, { attr: { scale: 0 }, duration: 0.35, ease: "power2.in" });
    // Déplacer le masque hors champ
    if (wave) {
      wave.style.setProperty("--lbmx", "-999px");
      wave.style.setProperty("--lbmy", "-999px");
    }
    lbTurbRef.current?.setAttribute("baseFrequency", "0.008");
  }, []);

  // ── Hover GSAP
  const onEnter = (e: React.MouseEvent<HTMLDivElement>) =>
    gsap.to(e.currentTarget.querySelector(".cyl-inner"), { scale: 1.1, duration: 0.28, ease: "power2.out" });
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) =>
    gsap.to(e.currentTarget.querySelector(".cyl-inner"), { scale: 1, duration: 0.28, ease: "power2.out" });

  return (
    <main
      className="cyl-main"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <button className="cyl-back" onClick={onBack} onPointerDown={e => e.stopPropagation()}>← Back</button>
      <p className="cyl-hint">← Glisser · Cliquer pour voir le projet →</p>

      {/* Scène 3D */}
      <div className="cyl-stage">
        <div className="cyl-cylinder" ref={cylRef}>
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="cyl-item"
              style={{
                transform: `rotateY(${item.lon}deg) translateZ(${RADIUS}px) translateY(${item.rowOffset}px)`,
                height: `${ROW_H}px`,
              }}
              onPointerDown={(e) => {
                clickTargetRef.current = item;
                clickedRect.current = (e.currentTarget as HTMLElement).getBoundingClientRect();
              }}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <div className="cyl-inner">
                <img src={item.src} draggable={false} alt={item.project.title} />
                <div className="cyl-label">{item.project.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal plein écran */}
      {selected && (
        <div
          ref={modalRef}
          className="cyl-modal"
          onPointerDown={e => e.stopPropagation()}
        >
          <div ref={cardRef} className="cyl-modal__card" onClick={e => e.stopPropagation()}>

            <canvas ref={modalCanvasRef} className="cyl-modal__bg-canvas" />
            <div ref={scanRef} className="cyl-modal__scan" />
            <div className="cyl-modal__corner cyl-modal__corner--tl" />
            <div className="cyl-modal__corner cyl-modal__corner--tr" />
            <div className="cyl-modal__corner cyl-modal__corner--bl" />
            <div className="cyl-modal__corner cyl-modal__corner--br" />

            {/* ── PANNEAU GAUCHE : visuels ── */}
            <div className="cyl-modal__panel-left">

              <div className="cyl-modal__meta">
                <span className="cyl-modal__category">{selected.project.category}</span>
                <span className="cyl-modal__year">{selected.project.year}</span>
              </div>

              <div
                className="cyl-modal__browser-screen"
                onClick={() => setLightboxOpen(true)}
                onPointerDown={e => e.stopPropagation()}
                title="Cliquer pour agrandir"
              >
                <img key={activeSlide} src={slides[activeSlide]} alt={`${selected.project.title} slide ${activeSlide + 1}`} />
                <div className="cyl-modal__browser-glare" />
                <div className="cyl-modal__browser-zoom-hint">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                  </svg>
                </div>
              </div>

              <div className="cyl-modal__thumbs-wrapper" onPointerDown={e => e.stopPropagation()}>
                <button
                  className="cyl-modal__thumbs-nav cyl-modal__thumbs-nav--prev"
                  onClick={() => setActiveSlide(i => Math.max(0, i - 1))}
                  disabled={activeSlide === 0}
                >‹</button>
                <div className="cyl-modal__thumbs" ref={thumbsRef}>
                  {slides.map((s, i) => (
                    <div
                      key={i}
                      className={`cyl-modal__thumb${activeSlide === i ? " cyl-modal__thumb--active" : ""}`}
                      onClick={() => setActiveSlide(i)}
                    >
                      <img src={s} alt={`Slide ${i + 1}`} />
                    </div>
                  ))}
                </div>
                <button
                  className="cyl-modal__thumbs-nav cyl-modal__thumbs-nav--next"
                  onClick={() => setActiveSlide(i => Math.min(slides.length - 1, i + 1))}
                  disabled={activeSlide === slides.length - 1}
                >›</button>
              </div>

            </div>

            {/* ── PANNEAU DROIT : contenu ── */}
            <div className="cyl-modal__panel-right">
              <button className="cyl-modal__close" onClick={closeModal} onPointerDown={e => e.stopPropagation()}>✕</button>

              <div className="cyl-modal__content-scroll">

                <h2 className="cyl-modal__title">
                  <ModalTitle text={selected.project.title} />
                </h2>

                <div className="cyl-modal__section">
                  <h3 className="cyl-modal__section-title">{t('proj_about')}</h3>
                  <p className="cyl-modal__desc">{selected.project.desc}</p>
                </div>

                <div className="cyl-modal__section">
                  <h3 className="cyl-modal__section-title">{t('proj_what')}</h3>
                  <ul className="cyl-modal__highlights">
                    {selected.project.highlights.map((h, i) => (
                      <li key={i} className="cyl-modal__highlight">{h}</li>
                    ))}
                  </ul>
                </div>

                <div className="cyl-modal__section">
                  <h3 className="cyl-modal__section-title">{t('proj_stack')}</h3>
                  <div className="cyl-modal__tags">
                    {selected.project.tech.map(tech => <span key={tech}>{tech}</span>)}
                  </div>
                </div>

                <div className="cyl-modal__stats-card">
                  <div className="cyl-modal__stat">
                    <span className="cyl-modal__stat-label">{t('proj_duration')}</span>
                    <span className="cyl-modal__stat-value">{selected.project.duration}</span>
                  </div>
                  <div className="cyl-modal__stat">
                    <span className="cyl-modal__stat-label">{t('proj_role')}</span>
                    <span className="cyl-modal__stat-value">{selected.project.role}</span>
                  </div>
                  <div className="cyl-modal__stat">
                    <span className="cyl-modal__stat-label">{t('proj_status')}</span>
                    <span className="cyl-modal__stat-value cyl-modal__stat-value--done">{t('proj_done')}</span>
                  </div>
                </div>

<div className="cyl-modal__actions">
                  <a
                    href={selected.project.link}
                    className="cyl-modal__cta"
                    target="_blank" rel="noopener noreferrer"
                    onPointerDown={e => e.stopPropagation()}
                  >
                    <span className="cyl-modal__cta-shine" />
                    <span className="cyl-modal__cta-label">
                      {t('proj_see')}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </a>
                  <a
                    href={selected.project.github}
                    className="cyl-modal__cta cyl-modal__cta--ghost"
                    target="_blank" rel="noopener noreferrer"
                    onPointerDown={e => e.stopPropagation()}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    {t('proj_github')}
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
      {/* Lightbox plein écran */}
      {lightboxOpen && selected && (
        <div
          className="cyl-lightbox"
          onClick={() => setLightboxOpen(false)}
          onPointerDown={e => e.stopPropagation()}
        >
          {/* Filtre SVG vague — caché, mais référençable par CSS */}
          <svg style={{ display: "none" }}>
            <defs>
              <filter id="lb-wave" x="-8%" y="-8%" width="116%" height="116%">
                <feTurbulence
                  ref={lbTurbRef}
                  type="turbulence"
                  baseFrequency="0.006"
                  numOctaves={4}
                  seed={3}
                  result="noise"
                />
                <feDisplacementMap
                  ref={lbDispRef}
                  in="SourceGraphic"
                  in2="noise"
                  scale={0}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          <button
            className="cyl-lightbox__close"
            onClick={() => setLightboxOpen(false)}
          >✕</button>

          {/* Flèches navigation */}
          {slides.length > 1 && (
            <>
              <button
                className="cyl-lightbox__nav cyl-lightbox__nav--prev"
                onClick={e => { e.stopPropagation(); setActiveSlide(i => (i - 1 + slides.length) % slides.length); }}
              >‹</button>
              <button
                className="cyl-lightbox__nav cyl-lightbox__nav--next"
                onClick={e => { e.stopPropagation(); setActiveSlide(i => (i + 1) % slides.length); }}
              >›</button>
            </>
          )}

          {/* Conteneur image + couche vague localisée */}
          <div
            className="cyl-lightbox__img-container"
            onClick={e => e.stopPropagation()}
            onMouseEnter={onLbImgEnter}
            onMouseMove={onLbImgMove}
            onMouseLeave={onLbImgLeave}
          >
            {/* Couche de base — sans effet */}
            <img
              key={activeSlide}
              src={slides[activeSlide]}
              alt={`${selected.project.title} — vue ${activeSlide + 1} / ${slides.length}`}
              className="cyl-lightbox__img"
            />
            {/* Couche distordue — masquée par cercle radial centré sur le curseur */}
            <img
              key={`w-${activeSlide}`}
              ref={lbWaveImgRef}
              src={slides[activeSlide]}
              alt=""
              aria-hidden
              className="cyl-lightbox__img-wave"
            />
          </div>

          {/* Indicateur de slide */}
          <div className="cyl-lightbox__dots">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`cyl-lightbox__dot${i === activeSlide ? " cyl-lightbox__dot--active" : ""}`}
                onClick={e => { e.stopPropagation(); setActiveSlide(i); }}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
