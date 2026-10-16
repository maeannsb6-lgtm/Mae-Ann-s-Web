import { projectLinks } from './content';

export type Shot = { src: string; alt: string; label: string };

export type WebsiteProject = {
  id: string;
  name: string;
  category: string;
  status: string;
  /** Verified live HTTPS deployment; entries without one are not rendered. */
  url: string | null;
  github?: string;
  /** Whether the site allows being framed (checked: no X-Frame-Options / frame-ancestors). */
  embeddable: boolean;
  summary: string;
  features: string[];
  tech: string[];
  desktop: Shot[];
  mobile?: Shot;
};

/**
 * Real websites Mae Ann has built. Screenshots were captured from each live site;
 * nothing here is mocked. Add a project by giving it a verified `url` and real captures.
 */
export const websites: WebsiteProject[] = [
  {
    id: 'solar-solutions',
    name: 'Solar Solutions PH',
    category: 'Website + web application',
    status: 'Live',
    url: projectLinks.solarLive,
    embeddable: true,
    summary:
      'The public home of the AI-enabled solar proposal system: a scroll-driven 3D walkthrough of how a solar energy system works, leading into a guided solar assessment and proposal application.',
    features: [
      '15-chapter 3D energy walkthrough, from “Before sunrise” to the complete energy system, with 360° view controls',
      'Seven-step Solar Assessment & Proposal app: Client Information, Energy Profile, Technical Site Inspection, System Configuration, Financial Analysis, System Recommendation, Generate Proposal',
      '“Sol”, an AI solar assistant that guides visitors through systems, equipment and proposals',
    ],
    tech: ['React', 'Gemini / Google AI Studio', 'Supabase', 'Vercel'],
    desktop: [
      { src: '/projects/solar-solutions-home.jpg', alt: 'Solar Solutions PH homepage: “Your day begins before the sun does.” over a 3D house at night', label: 'Homepage · 3D walkthrough' },
      { src: '/projects/solar-solutions-inverter.jpg', alt: 'Solar Solutions PH walkthrough chapter 08, energy conversion at the inverter', label: 'Chapter 08 · Energy conversion' },
      { src: '/projects/solar-solutions-assessment.jpg', alt: 'Solar Solutions PH assessment app, step 01 of 07: client information form', label: 'Assessment & proposal app' },
    ],
    mobile: { src: '/projects/solar-solutions-mobile.jpg', alt: 'Solar Solutions PH homepage on a phone', label: 'Mobile' },
  },
  {
    id: 'stec-portal',
    name: 'STEC Portal — SUWECO Tablas Energy',
    category: 'Company website + project portal',
    status: 'Live',
    url: projectLinks.stecPortalLive,
    github: projectLinks.stecPortalGithub,
    embeddable: true,
    summary:
      'Website and project-monitoring portal for SUWECO Tablas Energy Corporation, the hybrid solar-diesel power provider of Tablas Island.',
    features: [
      'Public pages for the company story, services, projects and updates',
      'Interactive Tablas Island project map with operational, active and ongoing sites',
      'STEC Portal for project monitoring, with weekly and site-photo reports',
    ],
    tech: ['Web application', 'Leaflet maps', 'Vercel'],
    desktop: [
      { src: '/projects/stec-portal-home.jpg', alt: 'STEC Portal homepage: “Energizing Communities. Building Futures.” with capacity figures', label: 'Homepage' },
      { src: '/projects/stec-portal-projects.jpg', alt: 'STEC Portal projects section with a map of project sites across Tablas Island', label: 'Projects map' },
    ],
    mobile: { src: '/projects/stec-portal-mobile.jpg', alt: 'STEC Portal homepage on a phone', label: 'Mobile' },
  },
  {
    id: 'portfolio',
    name: 'This portfolio',
    category: 'Personal website',
    status: 'Live',
    url: 'https://mae-ann-s-web.vercel.app',
    github: projectLinks.portfolioGithub,
    embeddable: false,
    summary:
      'The site you are on: React, Vite, TypeScript, Tailwind and three.js, with a serverless contact workflow on Vercel and Mae, a Gemini-powered assistant.',
    features: ['Isometric three.js workflow scene', 'Serverless contact backend (Supabase / Google Apps Script, optional n8n)', 'Mae, an AI assistant grounded in a knowledge graph'],
    tech: ['React 19', 'TypeScript', 'Tailwind 4', 'three.js', 'Vercel'],
    desktop: [{ src: '/projects/portfolio-home.jpg', alt: 'Portfolio homepage with Mae Ann’s portrait and black navigation bar', label: 'Homepage' }],
  },
  {
    id: 'wedding',
    name: 'Sam & Charis Wedding Website',
    category: 'Event website + RSVP automation',
    status: 'Used at the wedding',
    url: 'https://sam-and-charis-wedding-web-app.vercel.app',
    embeddable: true,
    summary:
      'A wedding website for Ate Cha and Sam, with the full event guide and an RSVP flow connected to automation. It was used for their wedding on September 25, 2026 and handled guest responses successfully.',
    features: [
      'Guests find their invitation by name, email or invite code, then RSVP',
      'RSVP responses are sent by webhook to Google Sheets, where the couple sees who has accepted',
      'Supabase-backed data and an automatic confirmation email after each RSVP',
      'Event guide: details, our story, gallery, attire guide, entourage, venue, gift guide and FAQs',
    ],
    tech: ['Supabase', 'Google Sheets webhook', 'Automated email', 'Vercel'],
    desktop: [
      { src: '/projects/wedding-home.jpg', alt: 'Sam & Charis wedding website homepage with the date, couple names and RSVP button', label: 'Homepage' },
      { src: '/projects/wedding-rsvp.jpg', alt: 'Wedding website RSVP screen: find your invitation by name, email or code', label: 'RSVP lookup' },
      { src: '/projects/wedding-attire.jpg', alt: 'Wedding website attire guide with illustrated outfits in sage green and butter yellow', label: 'Attire guide' },
    ],
    mobile: { src: '/projects/wedding-mobile.jpg', alt: 'Sam & Charis wedding website on a phone', label: 'Mobile' },
  },
];
