import {
  BarChart3, Bot, BriefcaseBusiness, ClipboardCheck, Database, FileText, Gauge,
  GitBranch, LineChart, Network, SearchCheck, Settings2, Users, Workflow,
} from 'lucide-react';

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Capabilities', href: '#capabilities' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export const recruiterSummary = [
  { label: 'Industrial Engineering', value: 'Process Improvement • Operations • Lean', icon: LineChart },
  { label: 'Automation', value: 'n8n • AI Workflows • Business Automation', icon: Workflow },
  { label: 'Systems', value: 'Supabase • Web Apps • Databases', icon: Database },
  { label: 'Focus', value: 'Operations & Client Workflow Automation', icon: Network },
];

export const whatIDo = [
  {
    title: 'Process Improvement',
    description: 'Analyze how work moves, identify bottlenecks, and redesign processes using Industrial Engineering methods.',
    items: ['Process analysis', 'Process mapping', 'Lean / continuous improvement', 'Root cause analysis', 'Time and motion study', 'Workflow optimization'],
    icon: Settings2,
  },
  {
    title: 'AI & Workflow Automation',
    description: 'Build project-based automations that reduce repetitive handling and connect routine operational work.',
    items: ['n8n', 'AI workflow automation', 'AI agents', 'Google Workspace automation', 'AI-assisted workflows', 'Automated reporting'],
    icon: Bot,
  },
  {
    title: 'Business Systems',
    description: 'Design practical digital systems for structured information, decisions, reporting, and operational visibility.',
    items: ['Supabase', 'Database-backed workflows', 'Business web applications', 'Digital forms', 'Automated proposal systems', 'Operational dashboards'],
    icon: Database,
  },
  {
    title: 'Client Workflow Automation',
    description: 'Create portfolio and project workflows that connect inquiry, onboarding, proposals, follow-up, and tracking.',
    items: ['Lead and inquiry collection', 'Client onboarding', 'Information collection', 'Automated follow-ups', 'Proposal workflows', 'AI-assisted interaction'],
    icon: Users,
  },
];

export const capabilityGroups = [
  { title: 'Process & Operations', items: ['Process Improvement', 'Workflow Analysis', 'Operations Analysis', 'Process Optimization'], icon: Gauge },
  { title: 'Automation', items: ['Workflow Automation', 'Business Automation', 'AI Automation', 'Client Workflow Automation'], icon: GitBranch },
  { title: 'Project & Business', items: ['Project Coordination', 'Feasibility Analysis', 'Technical Documentation', 'Stakeholder Communication'], icon: BriefcaseBusiness },
];

export const industrialEngineeringCapabilities = [
  'Process Improvement', 'Process Analysis', 'Process Mapping', 'Time and Motion Study',
  'Work Measurement', 'Lean Manufacturing', 'Lean Six Sigma', 'Continuous Improvement',
  'Root Cause Analysis', 'Operations Research', 'KPI Monitoring', 'Workload Balancing',
  'Process Optimization', 'Feasibility Studies', 'Operations Analysis', 'Business Process Development',
  'Technical Documentation', 'SOP Development', 'Project Coordination',
  'Quality / Compliance Documentation', 'Data Analysis', 'Stakeholder Communication',
];

export const technologyTools = [
  'n8n', 'Supabase', 'Gemini / Google AI Studio', 'Vercel', 'GitHub',
  'Microsoft Excel', 'Microsoft Office', 'Google Workspace', 'Notion',
];

export const demonstratedIntegrationSkills = [
  'REST-style serverless endpoints', 'Webhooks and trigger-based workflows', 'JSON data handling',
  'Server-side API key handling', 'Data transformation', 'Database operations',
  'Scheduled workflows', 'Validation and error states',
];

export const currentlyExploring = [
  'CRM Automation', 'Advanced API Integration', 'Client Lifecycle Automation',
  'AI Agent Workflows', 'OAuth fundamentals', 'Advanced error handling',
];

export const processImpact = [
  'Reduced manual handoffs', 'Centralized project information', 'Standardized workflow',
  'Reduced repetitive data entry', 'Improved process visibility', 'Streamlined proposal preparation',
];

export const approachSteps = [
  { number: '01', title: 'Understand', description: 'Understand the business or operational process.' },
  { number: '02', title: 'Map', description: 'Map inputs, activities, decisions, bottlenecks, and outputs.' },
  { number: '03', title: 'Improve', description: 'Remove unnecessary steps and redesign the process.' },
  { number: '04', title: 'Design', description: 'Design the improved workflow and information flow.' },
  { number: '05', title: 'Automate', description: 'Use AI, n8n, APIs, and databases where they add value.' },
  { number: '06', title: 'Validate', description: 'Test logic, errors, exceptions, and outputs.' },
  { number: '07', title: 'Document', description: 'Document the workflow, controls, and system.' },
];

export const experience = [
  {
    id: 1, title: 'Industrial Engineer | Project Coordinator – Technical Compliance', company: 'SUWECO Tablas Energy Corp.',
    period: 'Aug 2025 – Present', location: 'Ortigas, Pasig City',
    summary: 'Coordinates technical documentation, compliance, and digital workflow support for solar and diesel power plant projects.',
    highlights: [
      'Coordinated project execution, documentation, and compliance across engineering, finance, and management teams.',
      'Developed an AI-powered solar proposal web application using Google AI Studio, Vercel, and Supabase.',
      'Designed n8n automations for Google Workspace tasks, project tracking, reporting, and routine operations.',
    ],
  },
  {
    id: 2, title: 'Corporate Business Development Intern', company: 'Expressions Stationery Shop Inc.',
    period: 'Feb 2025 – May 2025', location: 'Makati City',
    summary: 'Supported business-development research and Industrial Engineering improvement initiatives.',
    highlights: [
      'Conducted market research and feasibility analysis for business opportunities.',
      'Evaluated system performance and benchmarked internal practices against industry approaches.',
      'Presented structured findings and recommendations to management.',
    ],
  },
  {
    id: 3, title: 'Industrial Engineering Intern | Field Analyst', company: 'ELPS Industries Corporation Inc.',
    period: 'Sep 2024 – May 2025', location: 'Marikina City',
    summary: 'Supported process analysis, KPI monitoring, continuous improvement, and technical documentation.',
    highlights: [
      'Analyzed workflows and identified improvement opportunities using Lean principles.',
      'Tracked operational KPIs and interpreted productivity data.',
      'Documented SOPs, root cause analysis, process maps, and stakeholder recommendations.',
    ],
  },
  {
    id: 4, title: 'Industrial Engineering Intern | Field Analyst', company: 'JCV Enterprises',
    period: 'Mar 2023 – May 2024', location: 'Marikina City',
    summary: 'Performed operational analysis focused on productivity, scheduling, workload, and quality documentation.',
    highlights: [
      'Conducted time and motion studies and analyzed operational data.',
      'Mapped processes, identified bottlenecks, and designed workload-balancing approaches.',
      'Prepared operations-research scheduling recommendations, dashboards, and ISO-aligned documentation.',
    ],
  },
  {
    id: 5, title: 'Industrial Engineering Student Assistant | Work Immersion', company: 'Rex Book Store',
    period: 'Aug 2019 – Sep 2019', location: 'Quezon City',
    summary: 'Supported logistics, inventory movement, shipment checking, and records.',
    highlights: [
      'Coordinated branch book transfers and checked shipment accuracy.',
      'Updated delivery and stock-movement records using Microsoft Excel.',
    ],
  },
];

export const trainings = [
  { id: 1, title: 'Certified AI-Powered Prompting Specialist', provider: 'AIGPE', date: 'March 6, 2026' },
  { id: 2, title: 'Certified Lean Six Sigma Yellow Belt (CLSSYB)', provider: 'MF Treinamentos — CSSC Accredited', date: 'June 30, 2025' },
  { id: 3, title: 'AI Journey with Alibaba Cloud', provider: 'Technological Institute of the Philippines — Quezon City', date: 'April 24, 2025' },
  { id: 4, title: 'Continuous Improvement Fundamentals Certified', provider: 'AskLex PH Academy', date: 'January 8, 2025' },
  { id: 5, title: 'Certified Lean Six Sigma White Belt (CLSSWB)', provider: 'SixSigma PH', date: 'January 11, 2023' },
];

export const selectedAwards = [
  { title: 'PIIE-NSC Feasibility Study Competition — Champion', date: 'May 2024', icon: SearchCheck },
  { title: 'IE Fest — Best Presenter and Feasibility Study Recognitions', date: 'April 2024', icon: ClipboardCheck },
  { title: '5th Asia Pacific IEOM Conference — Third Place', date: 'September 2024', icon: BarChart3 },
  { title: '9th North American IEOM Conference — Participant', date: 'June 2024', icon: Network },
  { title: 'Spotlight Design Project — Best Spotlight Presenter', date: 'May 2025', icon: FileText },
  { title: 'StartUp QC Student Competition — Gold Awardee', date: 'May 2025', icon: BriefcaseBusiness },
  { title: 'Industrial Engineering Research — Best Presenter', date: 'May 2025', icon: ClipboardCheck },
];

export const opportunityGroups = [
  { title: 'Industrial Engineering', items: ['Industrial Engineer', 'Process Improvement', 'Continuous Improvement', 'Operations Analysis'] },
  { title: 'Automation', items: ['AI Automation', 'n8n Automation', 'Workflow Automation', 'Business Automation'] },
  { title: 'Hybrid', items: ['Operations Automation', 'Process Automation', 'AI-enabled Operations', 'Client Workflow Automation', 'Technical Project Coordination'] },
];

export const hireMeFor = [
  'Process & Workflow Analysis', 'n8n / Workflow Automation', 'AI-enabled Business Systems',
  'Client Workflow Automation', 'Operational Reporting Automation', 'Process Documentation',
];

export const contactInfo = {
  email: 'maeannbodiongan.ie@gmail.com', phone: '+63 915 064 3939', location: 'Philippines',
  availability: 'Open to remote opportunities and selected automation projects.',
  cvUrl: 'https://canva.link/90yrx3qw2e660jf',
  socials: {
    github: 'https://github.com/maeannsb6-lgtm',
    linkedin: 'https://www.linkedin.com/in/bsie-maeannbodiongan',
  },
};

export const projectLinks = {
  solarLive: 'https://stec-independent-app.vercel.app',
  solarGithub: 'https://github.com/maeannsb6-lgtm/STEC-NEW',
  portfolioGithub: 'https://github.com/maeannsb6-lgtm/Mae-Ann-s-Web',
};
