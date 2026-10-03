export const aboutStory = {
  statements: [
    'I understand processes as an Industrial Engineer, identify inefficiencies, redesign workflows, and use AI, automation, databases, and digital systems where appropriate.',
    'My experience spans energy project coordination, technical compliance, process analysis, feasibility studies, operations research, SOP development, n8n automation, Google Workspace workflows, and database-backed web applications.',
    'I’m particularly interested in designing automated client journeys—from inquiry and onboarding to proposal generation, follow-up, and operational tracking.',
  ],
  collaboration: [
    'Asynchronous communication',
    'Clear technical documentation',
    'GitHub collaboration',
    'Cross-functional coordination',
  ],
};

export const serviceEvidence = [
  {
    title: 'Process Improvement',
    act: 'Understand',
    evidence: 'Applied through time-and-motion studies, process mapping, Lean analysis, KPI review, and root-cause work at JCV Enterprises and ELPS Industries.',
  },
  {
    title: 'AI & Workflow Automation',
    act: 'Automate',
    evidence: 'Demonstrated with n8n, Google Workspace workflows, automated reporting, and AI-assisted operations support in project work at SUWECO.',
  },
  {
    title: 'Business Systems',
    act: 'Connect',
    evidence: 'Demonstrated through the AI-enabled solar proposal application using Supabase, Vercel, structured engineering logic, and centralized project data.',
  },
  {
    title: 'Client Workflow Automation',
    act: 'Deliver',
    evidence: 'Presented as a transparent portfolio and project workflow: lead capture, onboarding, proposal preparation, communication, and operational tracking.',
  },
] as const;

export const solarCaseStudy = {
  title: 'AI-Enabled Solar Proposal & Client Workflow System',
  subtitle: 'Industrial Engineering × AI Automation × Client Workflow Design',
  problem: [
    'Manual and repeated client information gathering',
    'Separate engineering calculation and recommendation steps',
    'Time-consuming proposal preparation',
    'Fragmented project and client information',
  ],
  role: [
    'Industrial Engineering',
    'Process design',
    'Project coordination',
    'Automation and AI integration',
    'System development',
  ],
  solution: [
    'Structured client intake',
    'Validated engineering workflow',
    'AI-assisted guidance',
    'Automated proposal process',
    'Centralized project data',
  ],
  flow: ['Client Intake', 'Data Validation', 'Engineering Analysis', 'System Configuration', 'AI-Assisted Recommendation', 'Proposal Generation', 'Database Storage', 'Client Communication'],
  architecture: ['Web App', 'Business Logic / Automation', 'Gemini', 'Supabase', 'Email / Workspace'],
  architectureNote: 'The public project demonstrates a React web application, engineering and pricing logic, AI assistance through Gemini, Supabase-backed data workflows, and proposal/email support.',
  before: {
    observations: ['Repetitive manual entry', 'Fragmented records', 'Manual calculation workflow', 'Repeated communication', 'Separate systems', 'Difficult tracking'],
    flow: ['Client Inquiry', 'Manual Information Collection', 'Excel', 'Manual Engineering Check', 'Manual Recommendation', 'Manual Proposal', 'Manual Email'],
  },
  after: {
    observations: ['Structured client intake', 'Centralized data', 'Standardized calculations', 'Automated workflow', 'AI assistance', 'Easier project tracking'],
    flow: ['Client Inquiry', 'Structured Intake', 'Validation', 'Central Database', 'Engineering Logic', 'AI Assistance', 'Proposal Generation', 'Client Workflow'],
  },
  sop: [
    ['Purpose', 'Standardize how website inquiries are captured, acknowledged, routed, and tracked.'],
    ['Scope & trigger', 'Starts when a visitor submits a validated portfolio inquiry form.'],
    ['Process & outputs', 'Validate, store, notify, acknowledge, schedule follow-up, and maintain status.'],
    ['Exceptions & escalation', 'Reject spam or invalid data; log backend failures and provide a direct-email fallback.'],
  ],
};

export const secondaryProjects = [
  {
    number: '02',
    title: 'Google Workspace Operations Automation',
    label: 'Professional / project experience',
    description: 'n8n and Google Workspace workflows designed to support project tracking, routine reporting, information processing, and notifications.',
    role: 'Workflow Mapping • n8n • Google Workspace • Operational Reporting',
    flow: ['Trigger', 'n8n', 'Data Processing', 'Google Workspace', 'Reporting', 'Notification'],
  },
  {
    number: '03',
    title: 'Client Relations Automation System',
    label: 'Portfolio demo',
    description: 'A transparent demo architecture for lead capture, inquiry classification, acknowledgement, follow-up, status tracking, and team visibility.',
    role: 'Portfolio concept • Local rule-based demo • No commercial-client claim',
    flow: ['Inquiry', 'Lead Capture', 'Classification', 'Response', 'Follow-up', 'Status'],
  },
] as const;

export const labArchitecture = ['Website Inquiry', 'Supabase', 'n8n', 'Acknowledgement Email', 'Owner Notification', 'Follow-up Workflow'];
