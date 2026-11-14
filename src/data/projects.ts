export type ProjectStatus = "Public application" | "Open-source engineering project" | "Private engineering project";

export type ProjectLink = { label: string; href: string; external?: boolean };

export type Project = {
  slug: string;
  index: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  status: ProjectStatus;
  role?: string;
  tags: string[];
  capabilities: string[];
  technologies: string[];
  context: string;
  solution: string;
  architecture: string[];
  considerations: string[];
  evidence: string;
  accent: string;
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: "orion-ai",
    index: "01",
    title: "ORION AI",
    eyebrow: "Autonomous research & web RAG",
    summary: "A deployed research application connecting web retrieval, multi-agent orchestration and cited outputs.",
    description: "ORION AI combines a multi-agent research workflow with web information retrieval, evidence-aware responses, source citations, conversational research and PDF report export.",
    status: "Public application",
    tags: ["Research agents", "Web RAG", "Citations"],
    capabilities: ["Multi-agent research workflow", "Web information retrieval", "Evidence-based responses", "Source citations", "Conversational research", "PDF report export"],
    technologies: ["Python", "FastAPI", "Streamlit", "OpenAI API", "FAISS", "Tavily"],
    context: "Research work becomes difficult to trust when retrieval, synthesis and writing lose their connection. ORION AI explores a workflow where research stages are explicit and source context stays visible.",
    solution: "The application coordinates planning, research and writing around retrieved evidence. It is publicly accessible as a deployed Streamlit application; this portfolio does not claim independent evaluation results or commercial usage.",
    architecture: ["FastAPI provides the orchestration boundary.", "Agent roles separate planning, research and writing responsibilities.", "Tavily supplies web search while FAISS supports vector retrieval.", "Streamlit provides the conversational inspection surface and report export."],
    considerations: ["Retrieval quality before generation polish", "Source traceability and citation placement", "Handling thin or conflicting evidence", "Scope, latency and token-use control"],
    evidence: "Public application URL supplied for review. No customer adoption, commercial usage or independently verified performance result is claimed.",
    accent: "from-[#7895a8]/25 via-[#7895a8]/5 to-transparent",
    links: [{ label: "Launch Live Demo", href: "https://orion-ai-research.streamlit.app/", external: true }],
  },
  {
    slug: "nexus",
    index: "02",
    title: "NEXUS",
    eyebrow: "Decision intelligence laboratory",
    summary: "A framework-independent mathematical engine for modeling decisions, uncertainty and trade-offs.",
    description: "NEXUS brings deterministic weighted scoring, uncertainty distributions, Monte Carlo simulation, risk analytics, sensitivity analysis, scenario analysis, optimization and explainability into one inspectable workflow.",
    status: "Open-source engineering project",
    tags: ["Decision support", "Simulation", "Explainability"],
    capabilities: ["Deterministic weighted scoring", "Uncertainty distributions", "Monte Carlo simulation", "Risk analytics", "Sensitivity and scenario analysis", "Optimization and explainability"],
    technologies: ["Python", "NumPy", "Mathematical modeling", "Automated testing"],
    context: "Many operational decisions look simple until assumptions, ranges and trade-offs are made explicit. NEXUS focuses on making those assumptions inspectable rather than hiding them behind a single score.",
    solution: "The engine separates input definition, scoring, simulation and explanation so a decision can be tested, revisited and communicated without requiring a deployed SaaS dashboard.",
    architecture: ["Scenario inputs are modeled as explicit mathematical data.", "Weighted scoring and simulation remain reproducible at the calculation boundary.", "Sensitivity analysis exposes which assumptions move an outcome most.", "Explainability keeps the path from inputs to output legible."],
    considerations: ["Reproducibility over opaque randomness", "Clear boundaries between model logic and presentation", "Incomplete or unstable inputs", "Auditability of assumptions and outputs"],
    evidence: "Technical claims are presented as a framework-independent engineering project and should be read alongside the supplied repository documentation.",
    accent: "from-[#c6a66b]/25 via-[#c6a66b]/5 to-transparent",
    links: [{ label: "View Source Code", href: "https://github.com/AniruddhaCSE27/nexus-decision-intelligence", external: true }],
  },
  {
    slug: "leadforge-ai",
    index: "03",
    title: "LEADFORGE AI",
    eyebrow: "Intelligent sales operations platform",
    summary: "A production-style full-stack project connecting lead context, scoring, follow-up workflows and AI assistance.",
    description: "LeadForge AI explores a connected sales operations system with lead management, lead scoring, customer memory, AI-assisted follow-ups, a RAG knowledge base, Manager Copilot, analytics dashboards and consent-gated calling integrations.",
    status: "Open-source engineering project",
    tags: ["Workflow software", "Full-stack", "Operations"],
    capabilities: ["Lead management and scoring", "Customer memory", "AI-assisted follow-ups", "RAG knowledge base", "Manager Copilot", "Analytics dashboards", "Voice-agent simulation", "Consent-gated calling integrations", "Observability"],
    technologies: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Celery", "Docker", "JWT", "RBAC"],
    context: "Sales operations become expensive when useful signals, conversations and follow-ups live in separate places. LeadForge AI models a shared operational surface for teams that need context at the moment of action.",
    solution: "The project connects structured lead data with background work, retrieval-backed context, role-based access and management views. It is presented as a production-style engineering project, not as a commercially deployed product.",
    architecture: ["Next.js provides the product surface and workflow views.", "FastAPI exposes service boundaries for orchestration and integrations.", "PostgreSQL and pgvector store structured state and retrieval context.", "Redis and Celery support background work, while Docker keeps environments reproducible.", "JWT authentication, role-based access control and observability support operational boundaries."],
    considerations: ["Permission boundaries around customer and lead data", "Idempotent background work", "Human review for consequential actions", "Integration failure handling and observability"],
    evidence: "Supplied source repository and project description. Customer adoption, commercial validation, public deployment and demo credentials are not claimed.",
    accent: "from-[#a88b7c]/25 via-[#a88b7c]/5 to-transparent",
    links: [{ label: "View Source Code", href: "https://github.com/AniruddhaCSE27/AI_Sales_Acquisition_System", external: true }],
  },
  {
    slug: "llm-code-review-assistant",
    index: "04",
    title: "LLM CODE REVIEW ASSISTANT",
    eyebrow: "AI-powered developer productivity tool",
    summary: "A diff-aware review assistant combining deterministic validation, AST analysis and LLM reasoning.",
    description: "The LLM Code Review Assistant analyzes GitHub pull requests with diff-aware validation, Python AST analysis, rule-based checks, LLM-assisted reasoning and structured Markdown or JSON reporting.",
    status: "Open-source engineering project",
    tags: ["Developer tooling", "Static analysis", "LLM"],
    capabilities: ["GitHub pull request analysis", "Diff-aware changed-line validation", "Python AST analysis", "Deterministic rule checking", "LLM-assisted reasoning", "Structured findings", "Markdown and JSON reports", "CLI and Streamlit interfaces"],
    technologies: ["Python", "GitHub API", "AST analysis", "Rule-based validation", "OpenAI API", "Streamlit"],
    context: "Useful code review should stay specific to the change under discussion. A reviewer that sees only a file or a generic prompt can miss the relationship between a diff, its surrounding code and the risk introduced.",
    solution: "The assistant combines predictable analysis with a focused reasoning pass, then validates findings against changed files and exact changed lines. The CLI and Streamlit interfaces share the same reviewer path.",
    architecture: ["GitHub pull request input is normalized into diff-aware review context.", "AST analysis and deterministic rules provide structured signals.", "LLM reasoning adds context where judgment and explanation are useful.", "Final validation filters findings that do not map to changed lines.", "Terminal, Markdown, JSON and Streamlit outputs share the same findings model."],
    considerations: ["Avoiding speculative comments", "Respecting repository boundaries and secrets", "Making findings reproducible where possible", "Keeping human review in the loop"],
    evidence: "The supplied public repository documents the diff-aware, AST/rule-based, CLI and Streamlit workflow. No fabricated deployment URL or usage result is included.",
    accent: "from-[#87927f]/25 via-[#87927f]/5 to-transparent",
    links: [{ label: "View Source Code", href: "https://github.com/AniruddhaCSE27/llm-code-review-assistant", external: true }],
  },
  {
    slug: "optinex",
    index: "05",
    title: "OPTINEX",
    eyebrow: "AI-assisted diabetic retinopathy screening",
    summary: "A private computer-vision engineering project focused on classification, explainability and release validation.",
    description: "OPTINEX is a private engineering project using MATLAB, ResNet18, computer vision, Grad-CAM and image classification for five-class diabetic retinopathy screening research.",
    status: "Private engineering project",
    role: "Technical Lead",
    tags: ["Computer vision", "Explainability", "Private project"],
    capabilities: ["Five-class classification", "Model evaluation", "Grad-CAM explainability", "Release validation"],
    technologies: ["MATLAB", "ResNet18", "Computer vision", "Grad-CAM", "Image classification"],
    context: "The project explored how a computer-vision model could be evaluated and inspected through visual explanations while keeping release checks explicit.",
    solution: "The engineering work combined ResNet18-based classification, evaluation workflows, Grad-CAM visual explanations and release validation. The architecture and data remain private; the diagram on this page is conceptual.",
    architecture: ["Image inputs flow through a five-class classification model.", "Evaluation is separated from visual explanation generation.", "Grad-CAM highlights regions that influenced a model output.", "Release validation checks are tracked independently from clinical interpretation."],
    considerations: ["Private implementation and dataset boundaries", "Interpretability without clinical overclaiming", "Held-out evaluation discipline", "Release checks before handoff"],
    evidence: "Project-reported evaluation: 92.19% sensitivity on a held-out evaluation set of 103 samples and 37 passing release tests. These are not independent clinical validation results and do not imply regulatory approval, certification or diagnostic reliability.",
    accent: "from-[#8b7d9b]/25 via-[#8b7d9b]/5 to-transparent",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
