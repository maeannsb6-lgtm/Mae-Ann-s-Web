import {
  Code2,
  Cpu,
  Database,
  Globe,
  Layout,
  Server,
  Settings,
  Smartphone,
  Terminal,
  Wrench,
  Bot,
  FileSpreadsheet,
  Workflow,
  ClipboardList,
  CheckCircle,
  TrendingUp,
  Users,
  Briefcase
} from 'lucide-react';

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Skills', href: '#skills' },
  { name: 'Services', href: '#services' },
  { name: 'Works', href: '#works' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const skills = [
  {
    category: 'Web Development',
    items: [
      { name: 'HTML', percentage: 95, icon: Globe },
      { name: 'CSS', percentage: 90, icon: Layout },
      { name: 'JavaScript', percentage: 88, icon: Code2 },
      { name: 'TypeScript', percentage: 85, icon: Terminal },
      { name: 'React', percentage: 88, icon: Code2 },
      { name: 'Tailwind CSS', percentage: 90, icon: Layout },
    ],
  },
  {
    category: 'Platform and Backend',
    items: [
      { name: 'Supabase', percentage: 82, icon: Database },
      { name: 'Vercel', percentage: 90, icon: Server },
      { name: 'GitHub', percentage: 85, icon: Code2 },
      { name: 'Google Apps Script', percentage: 83, icon: Terminal },
      { name: 'Google AI Studio', percentage: 90, icon: Cpu },
      { name: 'Google Antigravity', percentage: 85, icon: Cpu },
    ],
  },
  {
    category: 'Automation and Workspace',
    items: [
      { name: 'n8n', percentage: 88, icon: Workflow },
      { name: 'Notion', percentage: 92, icon: ClipboardList },
      { name: 'Google Workspace', percentage: 90, icon: FileSpreadsheet },
      { name: 'AI Agents', percentage: 82, icon: Bot },
      { name: 'Workflow Automation', percentage: 90, icon: Settings },
      { name: 'Process Optimization', percentage: 88, icon: TrendingUp },
    ],
  },
];

export const achievementsStats = [
  { value: '4+', label: 'Years of Experience', description: 'Professional experience supporting digital operations, project execution, documentation, and technology-based workflows.', icon: Briefcase },
  { value: '20+', label: 'Digital Workflows', description: 'Created and improved workflows using n8n, Notion, Google Workspace, and AI-powered tools.', icon: Workflow },
  { value: '10+', label: 'Web Applications', description: 'Developed responsive web applications, dashboards, landing pages, and business tools.', icon: Globe },
  { value: '15+', label: 'Platforms Used', description: 'Worked with modern development, automation, database, deployment, and workspace platforms.', icon: Server },
  { value: '25+', label: 'Processes Improved', description: 'Business processes improved through intelligent automation and workspace redesign.', icon: TrendingUp },
  { value: '12+', label: 'Projects Supported', description: 'Assisted in technical, operational, and compliance-related projects.', icon: CheckCircle },
  { value: '50+', label: 'Automated Tasks', description: 'Repetitive manual tasks successfully automated to save time and reduce errors.', icon: Settings },
  { value: '100%', label: 'Client Satisfaction', description: 'Consistent delivery of high-quality solutions that meet or exceed expectations.', icon: Users },
];

export const detailedAchievements = [
  {
    id: 1,
    title: 'Developed AI-Powered Web Applications',
    description: 'Designed and developed web applications using Google AI Studio, Google Antigravity, React, Supabase, and Vercel to support business processes and improve user experience.',
    icon: Code2,
    year: '2024-2026',
    badges: ['React', 'Google AI', 'Supabase']
  },
  {
    id: 2,
    title: 'Built Automated Google Workspace Systems',
    description: 'Created n8n-powered automations that connected Gmail, Google Sheets, Google Drive, and other workspace tools to streamline tracking, reporting, and repetitive tasks.',
    icon: Workflow,
    year: '2023-2025',
    badges: ['n8n', 'Google Workspace', 'Automation']
  },
  {
    id: 3,
    title: 'Designed Organized Notion Workspaces',
    description: 'Built project management and documentation systems in Notion to improve task tracking, collaboration, reporting, and information organization.',
    icon: ClipboardList,
    year: '2022-2026',
    badges: ['Notion', 'Systems Design']
  },
  {
    id: 4,
    title: 'Supported Energy Project Operations',
    description: 'Coordinated project documentation, compliance requirements, tracking, and cross-department collaboration for solar and diesel power plant projects.',
    icon: Settings,
    year: '2021-2024',
    badges: ['Project Coordination', 'Operations']
  },
  {
    id: 5,
    title: 'Improved Workflow Efficiency',
    description: 'Reduced manual work by introducing automated processes, reusable templates, dashboards, and structured digital workspaces.',
    icon: TrendingUp,
    year: '2022-2026',
    badges: ['Efficiency', 'Process Optimization']
  },
  {
    id: 6,
    title: 'Developed AI Agents and Smart Workflows',
    description: 'Designed AI-assisted workflows and digital agents that supported project operations, documentation, communication, and information management.',
    icon: Bot,
    year: '2025-2026',
    badges: ['AI Agents', 'Automation']
  }
];

export const services = [
  {
    id: 1,
    title: 'Web Application Development',
    description: 'Modern, responsive, and user-friendly web applications designed to support business operations and improve customer experience.',
    features: ['Landing pages', 'Business dashboards', 'Portfolio websites', 'RSVP systems', 'Internal tools', 'Responsive web applications'],
    icon: Globe
  },
  {
    id: 2,
    title: 'AI-Powered Automation',
    description: 'Smart automations that reduce repetitive tasks, connect applications, and improve daily workflows.',
    features: ['AI agents', 'Automated reporting', 'Email automation', 'Data processing', 'Workflow integration', 'Google Workspace automation'],
    icon: Bot
  },
  {
    id: 3,
    title: 'Notion Workspace Development',
    description: 'Organized Notion systems for project management, task tracking, documentation, reporting, and collaboration.',
    features: ['Project dashboards', 'Task databases', 'Budget trackers', 'Documentation hubs', 'Team workspaces', 'Workflow templates'],
    icon: ClipboardList
  },
  {
    id: 4,
    title: 'Google Workspace Automation',
    description: 'Custom systems using Gmail, Google Sheets, Google Drive, Google Docs, and Google Apps Script.',
    features: ['Automated emails', 'Google Sheet databases', 'Document generation', 'File organization', 'Form submission workflows', 'Tracking systems'],
    icon: FileSpreadsheet
  },
  {
    id: 5,
    title: 'Database and Backend Setup',
    description: 'Structured database solutions and backend integrations for modern web applications.',
    features: ['Supabase setup', 'Database tables', 'User authentication', 'Data storage', 'API integration', 'Form submission systems'],
    icon: Database
  },
  {
    id: 6,
    title: 'Project Workflow Optimization',
    description: 'Digital solutions that improve project coordination, documentation, reporting, and process visibility.',
    features: ['Project trackers', 'Compliance tracking', 'Progress dashboards', 'Documentation systems', 'Department workflows', 'Reporting automation'],
    icon: Workflow
  }
];

export const projects = [
  {
    id: 1,
    title: "Wedding RSVP Web Application",
    category: "Web Application",
    description: "A responsive wedding RSVP website with guest confirmation, email notifications, event details, countdown timer, and an elegant mobile-friendly design.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Google Apps Script", "Google Sheets", "Vercel", "Cloudinary"],
    achievement: "Created a complete RSVP experience that automated guest registration and confirmation emails.",
    year: "2026",
    status: "Completed",
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "AI-Powered Project Management Portal",
    category: "AI Automation",
    description: "A centralized platform for managing project tasks, documentation, tracking, and automated workflows.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    technologies: ["Google AI Studio", "Google Antigravity", "React", "Supabase", "n8n", "Vercel"],
    achievement: "Improved project visibility and reduced repetitive administrative work.",
    year: "2025",
    status: "Completed",
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "Notion Project Operations Workspace",
    category: "Notion",
    description: "A structured Notion workspace for task tracking, project phases, procurement, budget monitoring, documentation, and reporting.",
    image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&q=80&w=800",
    technologies: ["Notion", "Google Sheets", "n8n", "Google Workspace"],
    achievement: "Centralized project information and improved team organization.",
    year: "2024",
    status: "Completed",
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 4,
    title: "Procurement Tracking Dashboard",
    category: "Web Application",
    description: "An internal dashboard to track procurement requests, approvals, and delivery statuses in real-time.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    technologies: ["React", "Tailwind", "Supabase"],
    achievement: "Reduced procurement delay by providing real-time visibility.",
    year: "2025",
    status: "Client Project",
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 5,
    title: "Automated Email Confirmation System",
    category: "Google Workspace",
    description: "A system built with Google Apps Script to parse incoming form data and dispatch branded confirmation emails automatically.",
    image: "https://images.unsplash.com/photo-1596526131083-e8c638c9c6c7?auto=format&fit=crop&q=80&w=800",
    technologies: ["Google Apps Script", "Gmail API", "HTML/CSS"],
    achievement: "Processed over 1,000 requests with zero manual intervention.",
    year: "2024",
    status: "Completed",
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 6,
    title: "AI Document Assistant",
    category: "AI Automation",
    description: "An AI-powered tool that summarizes project documents, extracts key requirements, and generates compliance checklists.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    technologies: ["Google AI Studio", "React", "Node.js"],
    achievement: "Cut down document review time by 60%.",
    year: "2026",
    status: "In Development",
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 7,
    title: "Professional Portfolio Website",
    category: "Web Application",
    description: "A modern, responsive portfolio website showcasing projects, skills, and professional experience.",
    image: "https://images.unsplash.com/photo-1507238692062-710e906385d0?auto=format&fit=crop&q=80&w=800",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    achievement: "Designed and developed a personal brand presence.",
    year: "2026",
    status: "Completed",
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  }
];

export const experience = [
  {
    id: 1,
    title: "Project Coordinator and Digital Solutions Developer",
    company: "Energy Projects Inc.",
    period: "2023 - Present",
    location: "Philippines",
    description: "Coordinated project execution, documentation, compliance, and digital workflow improvements for solar and diesel power plant projects.",
    responsibilities: [
      "Coordinated documentation and project requirements",
      "Supported project tracking and reporting",
      "Collaborated with engineering, finance, management, and operations teams",
      "Built web applications and internal tools",
      "Developed automated workflows",
      "Organized digital records and project workspaces"
    ],
    achievements: [
      "Improved operational efficiency using automation",
      "Developed reusable project tracking systems",
      "Created AI-powered tools",
      "Built organized Notion workspaces",
      "Streamlined Google Workspace processes"
    ],
    tools: ["Notion", "n8n", "Google Workspace", "React", "Supabase", "Vercel", "Google AI Studio"]
  },
  {
    id: 2,
    title: "Technical Operations Specialist",
    company: "Tech Solutions Group",
    period: "2021 - 2023",
    location: "Philippines",
    description: "Managed internal systems, streamlined operations, and provided technical support for ongoing business projects.",
    responsibilities: [
      "Maintained internal databases and records",
      "Optimized daily operational workflows",
      "Assisted in technical troubleshooting and system updates",
      "Drafted technical documentation and SOPs"
    ],
    achievements: [
      "Reduced administrative bottlenecks by 30%",
      "Implemented a centralized documentation hub",
      "Automated standard reporting procedures"
    ],
    tools: ["Google Workspace", "Trello", "Zapier", "HTML/CSS"]
  }
];

export const journey = [
  {
    id: 1,
    period: "2021 - 2022",
    title: "Project Coordination and Documentation",
    description: "Started career focusing on coordinating operations and managing complex documentation for technical projects.",
    learned: "Project management, compliance tracking, stakeholder communication.",
    achievement: "Successfully supported the deployment of 3 major energy infrastructure projects.",
    icon: Briefcase
  },
  {
    id: 2,
    period: "2022 - 2023",
    title: "Digital Workspace Organization",
    description: "Recognized the need for better systems and began designing centralized workspaces to organize information and tasks.",
    learned: "Notion architecture, database design, information architecture.",
    achievement: "Migrated fragmented department data into a unified Notion workspace.",
    icon: ClipboardList
  },
  {
    id: 3,
    period: "2023 - 2024",
    title: "Workflow Automation",
    description: "Transitioned to automating repetitive tasks to improve team efficiency and reduce manual errors.",
    learned: "n8n, Zapier, Google Apps Script, API integrations.",
    achievement: "Automated over 50 recurring business processes, saving hundreds of hours.",
    icon: Workflow
  },
  {
    id: 4,
    period: "2024 - 2025",
    title: "Web Application Development",
    description: "Expanded skills to build custom web applications and interfaces for specialized business needs.",
    learned: "React, TypeScript, Tailwind CSS, Supabase, Vercel.",
    achievement: "Developed and deployed multiple full-stack internal tools and client portals.",
    icon: Globe
  },
  {
    id: 5,
    period: "2025 - Present",
    title: "AI-Powered Systems and AI Agents",
    description: "Integrating modern AI capabilities into workflows and applications to create intelligent, self-sustaining systems.",
    learned: "Google AI Studio, Google Antigravity, LLM prompting, AI agents.",
    achievement: "Built AI assistants that actively summarize documents and assist in project operations.",
    icon: Bot
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Operations Manager",
    company: "Energy Projects Inc.",
    text: "Mae is highly organized, dependable, and creative. Her ability to combine project coordination with modern digital tools helped improve our workflow and made information easier to manage.",
    rating: 5,
    projectType: "Notion Workspace & Automation",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Technical Lead",
    company: "Tech Solutions Group",
    text: "Working with Mae was fantastic. She quickly understood our technical bottlenecks and built a custom React dashboard that completely changed how we track our procurement data.",
    rating: 5,
    projectType: "Web Application",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Project Director",
    company: "Global Initiatives",
    text: "Mae's AI-powered automations saved my team countless hours. She is a forward-thinking developer who not only writes great code but understands real business problems.",
    rating: 5,
    projectType: "AI Automation",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
  }
];

export const contactInfo = {
  email: "maeannbodiongan.ie@gmail.com",
  phone: "+63 9150643939",
  location: "Philippines",
  availability: "Open to Opportunities",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com"
  }
};
