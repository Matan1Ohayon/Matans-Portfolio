const experienceData = [
  {
    id: 0,
    role: "Founding Software Engineer",
    company: "Parry.io",
    location: "Tel Aviv, Israel",
    period: "NOV 2025 - Present",
    type: "Full-time",
    description:
      "Building an AI-powered procurement platform from the ground up. Own full product architecture and technical decisions, participating in design partner meetings to translate business requirements into scalable technical solutions. The platform is already in production, serving real users.",
    highlights: [
      "Built complete production MVP: FastAPI backend with multi-tenant architecture, Next.js frontend, LLM analysis pipeline (Claude/OpenAI), PostgreSQL storage, and Neo4j GraphRAG for intelligent contract search",
      "Own full product architecture and participate in design partner meetings, translating business requirements into scalable technical solutions",
      "Architected real-time negotiation assistant: WebSocket server connecting Chrome extension to backend via Deepgram transcription, delivering live AI advice during vendor calls",
      "Developed streaming chat interface with conversation persistence and Gmail OAuth integration for automated contract scanning and email replies",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Neo4j",
      "Claude API",
      "OpenAI",
      "LangChain",
      "WebSocket",
      "Docker",
      "GCP",
    ],
  },
  {
    id: 1,
    role: "Algorithmic Research Assistant",
    company: "Ben-Gurion University",
    location: "Beer Sheva, Israel",
    period: "SEP 2025 - MAR 2026",
    type: "Part-time",
    description:
      "Validating a location-allocation algorithm for emergency centres through complex simulations and edge case analysis. Refining system logic through output analysis and authoring technical documentation for operational use.",
    highlights: [
      "Validating location-allocation algorithms through complex simulations",
      "Analyzing edge cases and system behavior under various scenarios",
      "Authoring technical documentation for operational deployment",
      "Collaborating with faculty on computational optimization challenges",
    ],
    technologies: ["Python", "Algorithms", "Data Structures", "Optimization", "Research"],
  },
];

export default experienceData;