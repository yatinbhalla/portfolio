export const profile = {
  name: "Yatin Bhalla",
  role: "AI Product Manager",
  location: "Hansi, Haryana, India",
  email: "yatinbhalla42@gmail.com",
  phone: "+919254706685",
  github: "https://github.com/yatinbhalla",
  linkedin: "https://www.linkedin.com/in/yatinbhalla42/",
  x: "https://x.com/yatinbhalla42",
  resumePath: "/Yatin_Bhalla_Resume.pdf",
  tagline:
    "Business operator turned product manager. I grew three family retail & e-commerce businesses ~30% YoY over seven years — and shipped 20+ AI products 0→1 along the way, four of them in daily production use.",
  rotatingTitles: [
    "AI Product Manager",
    "0→1 Builder",
    "Business Operator",
    "Voice-AI Builder",
  ],
};

export const stats = [
  { value: 20, suffix: "+", label: "AI products shipped 0→1" },
  { value: 30, suffix: "%", label: "YoY business growth × 7 years" },
  { value: 4, suffix: "+", label: "Tools in daily production use" },
  { value: 90, suffix: "%+", label: "Across 5 BITSoM × Masai modules" },
];

export const about = {
  heading: "From the shop floor to the product roadmap",
  paragraphs: [
    "For seven years I've run three family businesses — Neha Chappal Store, Krishna Handloom, and Shree Radhe Trading Co. — owning P&L, pricing, inventory, and 20+ supplier relationships end to end. That means I've spent thousands of hours face-to-face with real customers, watching exactly where products, pricing, and processes break.",
    "When generative AI arrived, I did what operators do: I built. Every PM concept I learned — PRDs, JTBD, RAG, evals, prompt engineering — became a real, working tool solving a real problem in my own businesses or for people around me. A GST billing app that cut invoicing from 2 minutes to 20 seconds. A self-healing Meesho automation that cut listing time 90%. A creative pipeline that replaced our photography agency.",
    "Now I'm formalizing that instinct at BITSoM × Masai's PM with Agentic & Generative AI program (90%+ across five consecutive modules) — and looking for an AI PM role where builder's bias, operator's ownership, and genuine customer empathy compound.",
  ],
};

export const mindset = [
  {
    title: "Operator's Ownership",
    icon: "briefcase",
    text: "Seven years of owning P&L teaches you there's no one to escalate to. I treat every product like my own business — margins, adoption, and retention are personal.",
  },
  {
    title: "Builder's Bias",
    icon: "hammer",
    text: "I don't learn concepts, I ship them. Every module of my PM program became a working AI tool — 20+ so far. An idea isn't validated until someone uses it.",
  },
  {
    title: "Empathy from the Shop Floor",
    icon: "users",
    text: "My user research started behind a counter, not in a research repository. Thousands of real customer conversations trained me to hear the problem behind the request.",
  },
  {
    title: "Metrics Over Opinions",
    icon: "chart",
    text: "Billing time −83%. Listing time −90%. 8.5/10 beta satisfaction. <0.5% hallucination rate. If it shipped, it has a number attached — otherwise it's just a story.",
  },
  {
    title: "Ship Fast, Learn Faster",
    icon: "zap",
    text: "LinguAI shipped in under 8 hours. EcomLens in a weekend. Speed isn't recklessness — it's the fastest route to real user feedback and the next iteration.",
  },
];

export type FeaturedProject = {
  name: string;
  headline: string;
  description: string;
  metrics: string[];
  stack: string[];
  repo: string;
  live?: string;
  accent: string;
};

export const featured: FeaturedProject[] = [
  {
    name: "Voice Matters",
    headline: "Vernacular voice-AI welfare assistant",
    description:
      "Hindi-first voice PWA: speak a question, get a spoken government-scheme recommendation. Built from 10 customer interviews across 3 validated personas, designed for low-end Android phones on 2G networks.",
    metrics: ["<0.5% hallucination rate", "10 interviews → 3 personas", "Built for 2G networks"],
    stack: ["Sarvam STT/TTS", "OpenAI Embeddings", "Pinecone RAG", "FastAPI", "PostgreSQL"],
    repo: "https://github.com/yatinbhalla/Voice-Matters",
    live: "https://voice-matters-web.onrender.com",
    accent: "#8b5cf6",
  },
  {
    name: "Meesho-Listing",
    headline: "Self-healing catalog automation",
    description:
      "Turns a single Meesho walk-through into thousands of one-click listings. A self-healing browser copilot that recovers from UI changes on its own — from idea to validated proof-of-concept in weeks.",
    metrics: ["~90% listing time cut", "5 min → 30 s per listing", "Thousands of listings"],
    stack: ["React", "Node.js", "Playwright", "Gemini AI"],
    repo: "https://github.com/yatinbhalla/Meesho-listing",
    accent: "#22d3ee",
  },
  {
    name: "NehaBillingApp",
    headline: "GST-compliant billing, in production",
    description:
      "Built for my own footwear store: auto CGST/SGST, financial-year invoice numbering, customer records, sales reports, and CSV export. Used every single day at the counter.",
    metrics: ["83% billing time cut", "2 min → 20 s per invoice", "In daily production use"],
    stack: ["React", "Tailwind", "localStorage"],
    repo: "https://github.com/yatinbhalla/NehaBillingApp",
    accent: "#34d399",
  },
  {
    name: "PM-Trainer",
    headline: "Daily PM practice platform",
    description:
      "Gemini generates daily product scenarios and evaluates responses like a senior PM. Delivered with Agile/Scrum ceremonies, instrumented for retention, and iterated on real usage data.",
    metrics: ["~8.5/10 beta rating", "<5% hallucinations", "Daily challenge loop"],
    stack: ["Gemini", "React 19", "TypeScript", "Zustand"],
    repo: "https://github.com/yatinbhalla/PM-trainer",
    live: "https://ai.studio/apps/d274e719-0306-47d6-8019-22ca22b871f8?fullscreenApplet=true",
    accent: "#f472b6",
  },
  {
    name: "Neha Chappal Creative Suite",
    headline: "AI pipeline that replaced a photo agency",
    description:
      "Production-grade creative pipeline: Gemini 2.5 Flash analyzes multi-angle product shots and generates five marketplace-ready campaign variants in parallel. Real business, real savings.",
    metrics: ["2 days → 20 min turnaround", "5 variants per product", "Replaced an agency"],
    stack: ["Gemini 2.5 Flash", "React 19", "TypeScript", "Vite"],
    repo: "https://github.com/yatinbhalla/Neha-Chappal-Creative-Suite",
    live: "https://ai.studio/apps/drive/1iHn72r9TKpf17lKYDY0Qef_sLjuuaUEX?fullscreenApplet=true",
    accent: "#fbbf24",
  },
  {
    name: "AI Study Quiz Generator",
    headline: "Quiz engine that forces active recall",
    description:
      "Write your answer first, then see the options — active recall by design. Built for the BITSoM AI PM cohort and adopted well beyond it.",
    metrics: ["100+ quizzes generated", "70 power users", "~8/10 satisfaction"],
    stack: ["Gemini", "Firebase", "React 19", "TypeScript"],
    repo: "https://github.com/yatinbhalla/AI-Study-Quiz-Generator",
    live: "https://ai.studio/apps/38a01b9b-7c69-4750-b094-43905fc86cd6?fullscreenApplet=true",
    accent: "#60a5fa",
  },
];

export const howIThink = [
  {
    step: "01",
    title: "Discover",
    text: "Talk to real users before writing a line of code. Voice Matters started with 10 customer interviews synthesized into 3 validated personas.",
  },
  {
    step: "02",
    title: "Define / User Research",
    text: "PRDs, JTBD, user stories, and acceptance criteria — then ruthless prioritization (MoSCoW, impact vs. effort) so the first build attacks the highest-leverage problem.",
  },
  {
    step: "03",
    title: "AI Workflow Planning",
    text: "Map the AI pipeline before writing code: model choice, RAG vs. agents, prompt design, evals, guardrails, and cost/latency trade-offs. Voice Matters' <0.5% hallucination rate was designed here, not patched later.",
  },
  {
    step: "04",
    title: "Prototype / MVP",
    text: "Vibe-code an MVP in hours or days, not quarters. LinguAI went from idea to live voice tutor in under 8 hours.",
  },
  {
    step: "05",
    title: "Ship",
    text: "Real users, real workflows, real stakes. NehaBillingApp runs the store's counter every day — production is the only honest test environment.",
  },
  {
    step: "06",
    title: "Measure & Iterate",
    text: "Satisfaction scores, hallucination rates, time saved, retention. Every product gets a scoreboard, and the scoreboard decides what ships next.",
  },
];

export const skills = {
  product: [
    "Product Discovery", "JTBD", "User Research", "Prioritization (MoSCoW)",
    "Roadmapping", "PRD Writing", "OKRs", "North Star Metric", "A/B Testing",
    "Sprint Planning", "Stakeholder Management", "Agile / Scrum",
    "User Stories", "Acceptance Criteria", "Wireframing", "User Flows",
  ],
  ai: [
    "LLMs", "RAG", "Prompt Engineering", "AI Evaluation", "Responsible AI",
    "Voice AI / Speech-to-Text", "Agentic Workflows", "Embeddings & Vector Search",
  ],
  tools: [
    "Jira", "Miro", "Figma", "Gemini API", "OpenAI API", "Claude Code",
    "Pinecone", "n8n", "NotebookLM", "React", "TypeScript", "FastAPI",
    "Firebase", "Supabase", "Playwright",
  ],
};

export const education = [
  {
    title: "PM with Agentic & Generative AI",
    org: "BITSoM (BITS School of Management) × Masai",
    period: "2025 – Present",
    detail: "90%+ across Modules 2–6 — while operating three businesses. Every module pressure-tested into shipped AI tools.",
  },
  {
    title: "B.Tech, Computer Science",
    org: "PES University, Bengaluru",
    period: "2015 – 2017",
    detail: "Paused at 1.5 years to take operational ownership of the family retail business — a trade of coursework for a seven-year, real-world P&L education.",
  },
];

export const certifications = [
  {
    title: "PM with Agentic & Generative AI — Modules 2–6",
    org: "BITSoM × Masai",
    note: "90%+ score",
  },
  {
    title: "Generative AI Mastermind",
    org: "Outskill",
    note: "",
  },
  {
    title: "Prompt to Prototype",
    org: "Google for Startups",
    note: "",
  },
];
