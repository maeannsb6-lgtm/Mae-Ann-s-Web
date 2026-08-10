import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Building2, CalendarDays } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const publications = [
  {
    title: 'A Goal Programming Model for Optimizing Production Quotas, Productivity and Profit in Girl’s Hat Manufacturing Firm',
    url: 'https://index.ieomsociety.org/index.cfm/item/54870',
    description:
      'Applied goal programming and MATLAB-based quantitative optimization to examine production quotas, processing hours, operational goals, and profitability in hat manufacturing.',
    skills: ['Goal Programming', 'Operations Research', 'MATLAB', 'Production Optimization', 'Productivity', 'Manufacturing'],
    conference: '5th Asia Pacific Conference on Industrial Engineering and Operations Management',
    location: 'Tokyo, Japan',
    date: 'September 10–12, 2024',
  },
  {
    title: 'Enhancing Efficiency and Productivity of Shoe Manufacturing: Utilizing Queuing Theory to Reduce Upper Making Section Delays',
    url: 'https://index.ieomsociety.org/index.cfm/item/54869',
    description:
      'Applied queuing theory and MATLAB simulation to analyze upper-making delays, processing flow, waiting time, and opportunities to improve shoe-manufacturing productivity and efficiency.',
    skills: ['Queuing Theory', 'Operations Research', 'Process Analysis', 'Productivity', 'Manufacturing Efficiency', 'MATLAB'],
    conference: '5th Asia Pacific Conference on Industrial Engineering and Operations Management',
    location: 'Tokyo, Japan',
    date: 'September 10–12, 2024',
  },
  {
    title: 'Goal Programming Problem: Improving Production Systems and Maximizing Efficiency in a Shoe Manufacturing Company',
    url: 'https://index.ieomsociety.org/index.cfm/item/54871',
    description:
      'Used goal programming and MATLAB simulation to examine production constraints, workflow, machinery, materials, and opportunities for improving shoe-manufacturing operations.',
    skills: ['Goal Programming', 'Operations Research', 'MATLAB', 'Workflow Optimization', 'Production Systems', 'Process Improvement'],
    conference: '5th Asia Pacific Conference on Industrial Engineering and Operations Management',
    location: 'Tokyo, Japan',
    date: 'September 10–12, 2024',
  },
  {
    title: 'Strategic Cost Management and Process Improvement in Hat Manufacturing Industry using Pro Model Simulation: A VA/VE Analysis Approach',
    url: 'https://index.ieomsociety.org/index.cfm/item/54572',
    description:
      'Combined ProModel simulation with Value Analysis / Value Engineering to examine manufacturing cost, productivity, layout, manpower, delays, and process-improvement opportunities.',
    skills: ['ProModel', 'Simulation', 'VA/VE', 'Cost Management', 'Process Improvement', 'Manufacturing Optimization'],
    conference: '9th North American Conference on Industrial Engineering and Operations Management',
    location: 'Washington D.C., United States',
    date: 'June 4–6, 2024',
  },
] as const;

const capabilities = [
  'Operations Research',
  'Process Optimization',
  'Data Analysis',
  'Manufacturing Systems',
  'Goal Programming',
  'Queuing Theory',
  'MATLAB',
  'Simulation',
  'ProModel',
  'VA/VE',
  'Cost Analysis',
  'Productivity Improvement',
];

export function ResearchPublications() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="research" className="py-24 bg-brand-bg-primary relative overflow-hidden">
      <div className="absolute -top-32 right-0 w-80 h-80 bg-brand-pink-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-brand-pink-dark/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="ACADEMIC & ANALYTICAL WORK"
          title="Research & Publications"
          description="Published research applying industrial engineering, operations research, optimization, simulation, and process-improvement methods to manufacturing challenges."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {publications.map((publication, index) => (
            <motion.article
              key={publication.url}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : index * 0.06 }}
              whileHover={shouldReduceMotion ? undefined : { y: -6 }}
              className="group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-brand-card to-[#0c0c12] p-5 sm:p-6 lg:p-7 shadow-[0_16px_50px_rgba(0,0,0,0.22)] transition-[border-color,box-shadow] duration-300 hover:border-brand-pink-primary/35 hover:shadow-[0_22px_60px_rgba(236,72,153,0.09)] focus-within:border-brand-pink-primary/40"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-pink-primary/45 to-transparent opacity-70" />

              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full border border-brand-pink-primary/20 bg-brand-pink-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-pink-bright">
                  Published Research
                </span>
                <span className="text-xs font-medium text-brand-text-muted">Author / Co-Author</span>
              </div>

              <h3 className="text-xl sm:text-[1.35rem] font-bold leading-snug text-white transition-colors duration-300 group-hover:text-brand-pink-soft">
                {publication.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-brand-text-muted">
                {publication.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2" aria-label="Research methods and capabilities">
                {publication.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-white/[0.07] bg-white/[0.035] px-2.5 py-1 text-[11px] font-medium text-brand-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-2.5 border-t border-white/[0.06] pt-5 text-xs text-brand-text-muted">
                <div className="flex items-start gap-2.5">
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink-primary" aria-hidden="true" />
                  <span>
                    <strong className="font-medium text-brand-text-secondary">IEOM Society International</strong>
                    <span className="block mt-0.5">{publication.conference} · {publication.location}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CalendarDays className="h-4 w-4 shrink-0 text-brand-pink-primary" aria-hidden="true" />
                  <span>{publication.date}</span>
                </div>
              </div>

              <div className="mt-6 pt-1">
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View publication: ${publication.title}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-brand-pink-primary/30 bg-brand-pink-primary/10 px-4 py-2.5 text-sm font-semibold text-brand-pink-soft outline-none transition-all duration-300 hover:border-brand-pink-primary hover:bg-brand-pink-primary hover:text-white focus-visible:ring-2 focus-visible:ring-brand-pink-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-primary"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  View Publication
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4 }}
          className="mt-10 rounded-2xl border border-white/[0.07] bg-brand-bg-secondary/70 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <p className="text-sm font-semibold text-white">Analytical Capabilities</p>
              <p className="mt-1.5 text-sm leading-6 text-brand-text-muted">
                Research-backed problem solving applied to real manufacturing and operational challenges.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:max-w-3xl lg:justify-end">
              {capabilities.map((capability) => (
                <span
                  key={capability}
                  className="rounded-full border border-white/[0.07] bg-brand-card px-3 py-1.5 text-xs font-medium text-brand-text-secondary"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
