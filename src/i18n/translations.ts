export type Lang = 'fr' | 'en';

export const TR: Record<string, { fr: string; en: string }> = {
  // ── Global
  back: { fr: '← Retour', en: '← Back' },
  scroll: { fr: 'Défiler', en: 'Scroll' },

  // ── Intro
  badge:       { fr: 'Disponible',          en: 'Open to work' },
  intro_role:  { fr: 'Développeur Freelance', en: 'Freelance Developer' },
  intro_enter: { fr: 'Entrer',              en: 'Enter' },
  intro_side:  { fr: 'Freelance · Développeur · Moukietou ·', en: 'Freelance · Developer · Moukietou ·' },

  // ── Hero
  nav_projects: { fr: 'Projets', en: 'Projects' },
  nav_about:    { fr: 'À propos', en: 'About' },
  nav_contact:  { fr: 'Contact', en: 'Contact' },
  hero_desc1:   { fr: 'Disponible en freelance', en: 'Available for freelance work' },
  hero_desc2:   { fr: 'Construisons !', en: "Let's build!" },
  hero_cta:     { fr: 'Recrutez-moi', en: 'Hire me' },
  hero_enter1:  { fr: 'Appuyez sur entrée', en: 'Press enter' },
  hero_enter2:  { fr: 'pour explorer', en: 'to explore' },
  hero_copy:    { fr: '2024 MAMPASSI DEV ©', en: '2024 MAMPASSI DEV ©' },

  // ── About — hero
  ab_sub:        { fr: 'DÉVELOPPEUR FULL-STACK · 4 ANS D\'EXP.', en: 'FULL-STACK DEVELOPER · 4 YRS EXP.' },
  ab_hero_line1: { fr: 'JE CONSTRUIS',  en: 'I BUILD'   },
  ab_hero_line2: { fr: 'LE WEB.',       en: 'THE WEB.'  },
  ab_hero_aria:  { fr: 'Je Construis Le Web', en: 'I Build The Web' },
  ab_stat1_val: { fr: '4', en: '4' },
  ab_stat1_lbl: { fr: 'Années d\'exp.', en: 'Years of exp.' },
  ab_stat2_val: { fr: '20+', en: '20+' },
  ab_stat2_lbl: { fr: 'Projets livrés', en: 'Projects delivered' },
  ab_stat3_val: { fr: '100%', en: '100%' },
  ab_stat3_lbl: { fr: 'Satisfaction', en: 'Satisfaction' },

  // About — bio
  ab_bio1: {
    fr: "Je suis <strong>Mampassi</strong>, développeur fullstack avec 4 ans d'expérience dans la création de logiciels qui font la différence. J'ai traversé chaque évolution majeure du web et me suis adapté, guidé et innové à travers toutes.",
    en: "I'm <strong>Mampassi</strong>, a fullstack developer with 4 years of experience building software that matters. I've witnessed every major paradigm shift — from punchcards to AI — and I've adapted, led, and innovated through all of them.",
  },
  ab_bio2: {
    fr: "Mon approche est simple : <span class=\"ab-bio-highlight\">écrire du code qui dure</span>. Que ce soit un frontend pixel-perfect, une API résiliente, ou un système distribué — je livre avec précision et savoir-faire.",
    en: "My approach is simple: <span class=\"ab-bio-highlight\">write code that lasts</span>. Whether it's a pixel-perfect frontend, a resilient API, or a distributed system handling millions of requests — I deliver with precision and craft.",
  },

  // About — bio tags
  ab_tag1: { fr: 'Résolveur de problèmes', en: 'Problem Solver' },
  ab_tag2: { fr: 'Développeur Full Stack',  en: 'Full Stack Dev' },
  ab_tag3: { fr: 'Code propre',             en: 'Clean Coder' },
  ab_tag4: { fr: 'Apprentissage rapide',    en: 'Fast Learner' },
  ab_tag5: { fr: 'Esprit d\'équipe',        en: 'Team Player' },

  // About — stack
  ab_stack_title: { fr: 'STACK TECHNIQUE', en: 'TECH STACK' },
  ab_cat1: { fr: 'Frontend',        en: 'Frontend' },
  ab_cat2: { fr: 'Backend',         en: 'Backend' },
  ab_cat3: { fr: 'Base de données', en: 'Database' },
  ab_cat4: { fr: 'DevOps',          en: 'DevOps' },
  ab_cat5: { fr: 'Mobile',          en: 'Mobile' },
  ab_cat6: { fr: 'Outils',          en: 'Tools' },

  // About — timeline
  ab_journey_title: { fr: 'LE PARCOURS', en: 'THE JOURNEY' },
  ab_tl1_title: { fr: 'Les premiers pas',   en: 'The first steps' },
  ab_tl1_desc:  { fr: "Découverte du HTML/CSS — fascination immédiate. Premières pages statiques, apprentissage des fondamentaux qui tiennent encore aujourd'hui.", en: "Discovered HTML/CSS — immediate fascination. Built first static pages, learned fundamentals that still hold today." },
  ab_tl2_title: { fr: 'Premier emploi',     en: 'First job' },
  ab_tl2_desc:  { fr: "Développeur junior dans une startup. Plongé dans React, Node.js et le travail en équipe. Première mise en production — un moment marquant.", en: "Junior developer at a startup. Deep dive into React, Node.js and teamwork. First production deployment — a landmark moment." },
  ab_tl3_title: { fr: 'Maturité technique', en: 'Technical maturity' },
  ab_tl3_desc:  { fr: "Architectures distribuées, pipelines CI/CD, optimisation des performances. Passage du rôle de contributeur à celui de référent technique.", en: "Distributed architectures, CI/CD pipelines, performance tuning. Shifted from contributor to technical lead." },
  ab_tl4_title: { fr: 'Maintenant',         en: 'Now' },
  ab_tl4_desc:  { fr: "Construction de produits de bout en bout avec soin. Ouvert aux bons défis qui méritent la meilleure ingénierie.", en: "Building end-to-end products with care. Open to the right challenges that deserve the best engineering." },

  // About — quote
  ab_quote1:    { fr: 'La complexité est facile.',  en: 'Complexity is easy.' },
  ab_quote2:    { fr: 'La clarté est le métier.',   en: 'Clarity is the craft.' },
  ab_quote_attr:{ fr: '— Mampassi, développeur full-stack', en: '— Mampassi, full-stack developer' },

  // About — sections
  ab_who_title:     { fr: 'Qui suis-je', en: 'Who I Am' },
  ab_together:      { fr: 'Construisons ensemble', en: "Let's Build Together" },
  ab_avail:         { fr: 'Disponible pour projets freelance & collaborations', en: 'Available for freelance projects & collaborations' },
  ab_send_email:    { fr: 'Envoyer un email', en: 'Send an email' },

  // About — contact section
  ab_contact_title: { fr: 'RESTONS EN CONTACT', en: 'GET IN TOUCH' },

  // ── Projects
  proj_hint:     { fr: '← Glisser · Cliquer pour voir le projet →', en: '← Drag · Click to view project →' },
  proj_about:    { fr: 'À propos du projet', en: 'About the project' },
  proj_what:     { fr: 'Ce que vous obtenez', en: 'What you get' },
  proj_stack:    { fr: 'Stack technique',    en: 'Tech stack' },
  proj_duration: { fr: 'Durée',  en: 'Duration' },
  proj_role:     { fr: 'Rôle',   en: 'Role' },
  proj_status:   { fr: 'Statut', en: 'Status' },
  proj_done:     { fr: '✓ Livré',   en: '✓ Delivered' },
  proj_see:      { fr: 'Voir le projet', en: 'View project' },
  proj_github:   { fr: 'GitHub', en: 'GitHub' },
  proj_author_role:  { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
  proj_author_count: { fr: '(12 projets)', en: '(12 projects)' },

  // ── Contact
  ct_label:    { fr: 'Prenons contact · Collaborons', en: "Get in touch · Let's collaborate" },
  ct_title1:   { fr: 'PARLONS.', en: "LET'S" },
  ct_title2:   { fr: '',         en: 'TALK.' },
  ct_sub:      { fr: "Vous avez un projet ? Une question ?\nJ'adorerais vous entendre.", en: "Have a project in mind? A question?\nI'd love to hear from you." },
  ct_tagline:  { fr: "Disponible pour des projets freelance,\ncollaborations & emplois à temps plein.", en: "Available for freelance projects,\ncollaborations & full-time opportunities." },
  ct_name:     { fr: 'Votre nom',     en: 'Your name' },
  ct_email:    { fr: 'Votre email',   en: 'Your email' },
  ct_message:  { fr: 'Votre message', en: 'Your message' },
  ct_send:     { fr: 'Envoyer',   en: 'Send Message' },
  ct_sending:  { fr: 'Envoi...',   en: 'Sending...' },
  ct_sent_title: { fr: 'Message envoyé !', en: 'Message sent!' },
  ct_sent_sub:   { fr: "Je reviendrai vers vous dès que possible.", en: "I'll get back to you as soon as possible." },
  ct_footer:   { fr: '© 2025 Mampassi Moukietou — Conçu avec passion & précision.', en: '© 2025 Mampassi Moukietou — Built with passion & precision.' },
  ct_error:    { fr: 'Une erreur est survenue. Réessayez ou contactez-moi directement.', en: 'An error occurred. Please try again or contact me directly.' },
};

export function tr(key: string, lang: Lang): string {
  return TR[key]?.[lang] ?? key;
}
