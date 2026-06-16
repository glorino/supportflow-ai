export type Locale = "en" | "fr";

export const translations = {
  nav: {
    features: { en: "Features", fr: "Fonctionnalités" },
    channels: { en: "Channels", fr: "Canaux" },
    agents: { en: "AI Agents", fr: "Agents IA" },
    about: { en: "About", fr: "À propos" },
    signIn: { en: "Sign in", fr: "Se connecter" },
    getStarted: { en: "Get Started", fr: "Commencer" },
  },
  hero: {
    badge: { en: "AI-Powered Support Platform", fr: "Plateforme de Support IA" },
    title1: { en: "Every", fr: "Chaque" },
    title2: { en: "A Resolution.", fr: "Une Résolution." },
    desc: {
      en: "Resolve tickets across WhatsApp, Email, SMS, Messenger, Instagram, and Web Chat — using AI agents that classify, route, and resolve automatically.",
      fr: "Résolvez les tickets via WhatsApp, Email, SMS, Messenger, Instagram et Web Chat — grâce à des agents IA qui classifient, routent et résolvent automatiquement.",
    },
    cta: { en: "Get Started", fr: "Commencer" },
    demo: { en: "Book a demo", fr: "Réserver une démo" },
  },
  stats: {
    autoResolution: { en: "Auto-Resolution Rate", fr: "Taux de Résolution Auto" },
    avgResponse: { en: "Avg Response Time", fr: "Temps de Réponse Moyen" },
    uptime: { en: "Uptime SLA", fr: "SLA de Disponibilité" },
    customers: { en: "Customers Served", fr: "Clients Servis" },
  },
  trusted: {
    title: { en: "Trusted by leading companies across Nigeria and beyond", fr: "Approuvé par les entreprises leaders au Nigéria et au-delà" },
    readAll: { en: "Read all stories", fr: "Lire toutes les histoires" },
  },
  problem: {
    label: { en: "The Problem", fr: "Le Problème" },
    title: { en: "Unresolved tickets cost you customers.", fr: "Les tickets non résolus vous coûtent des clients." },
    desc: { en: "Teams send responses and forget. But the cost of unresolved tickets is real.", fr: "Les équipes envoient des réponses et oublient. Mais le coût des tickets non résolus est réel." },
  },
  solution: {
    label: { en: "The Solution", fr: "La Solution" },
    title: { en: "Every ticket resolved.", fr: "Chaque ticket résolu." },
    desc: {
      en: "Six capabilities working together — so every ticket, message, and support request actually gets resolved.",
      fr: "Six capacités qui travaillent ensemble — pour que chaque ticket, message et demande de support soit réellement résolu.",
    },
  },
  features: {
    label: { en: "Platform", fr: "Plateforme" },
    title: { en: "Built for speed and reliability.", fr: "Conçu pour la vitesse et la fiabilité." },
    subtitle: { en: "Six core capabilities. One unified platform. Zero compromises.", fr: "Six capacités principales. Une plateforme unifiée. Zéro compromis." },
  },
  channels: {
    label: { en: "Channels", fr: "Canaux" },
    title: { en: "All your channels. One inbox.", fr: "Tous vos canaux. Une boîte de réception." },
    desc: { en: "Connect WhatsApp, Email, SMS, Messenger, Instagram, and Web Chat — all in one place.", fr: "Connectez WhatsApp, Email, SMS, Messenger, Instagram et Web Chat — tout au même endroit." },
  },
  agents: {
    label: { en: "AI Agents", fr: "Agents IA" },
    title: { en: "9 agents. Zero bottlenecks.", fr: "9 agents. Zéro goulot d'étranglement." },
    desc: { en: "Each agent handles a specific part of your support pipeline. Together, they resolve 67% of tickets autonomously.", fr: "Chaque agent gère une partie spécifique de votre pipeline de support. Ensemble, ils résolvent 67% des tickets automatiquement." },
  },
  howItWorks: {
    label: { en: "How it works", fr: "Comment ça marche" },
    title: { en: "From ticket to resolution.", fr: "Du ticket à la résolution." },
  },
  meetAI: {
    label: { en: "Meet SSV AI", fr: "Découvrez SSV AI" },
    title: { en: "The intelligence layer behind every decision", fr: "La couche d'intelligence derrière chaque décision" },
    desc: {
      en: "SSV AI is the engine SSV CRM is built on. Trained on real support signals — it classifies, routes, monitors, and resolves so your team can focus on complex issues.",
      fr: "SSV AI est le moteur sur lequel SSV CRM est construit. Entraîné sur de vrais signaux de support — il classe, route, surveille et résout pour que votre équipe puisse se concentrer sur les problèmes complexes.",
    },
  },
  security: {
    label: { en: "Security & Compliance", fr: "Sécurité et Conformité" },
    title: { en: "Built for regulated industries", fr: "Conçu pour les industries réglementées" },
    desc: {
      en: "SSV is built to meet data protection, financial regulation, and compliance requirements of banks, fintechs, and institutions globally.",
      fr: "SSV est conçu pour répondre aux exigences de protection des données, de réglementation financière et de conformité des banques, fintechs et institutions du monde entier.",
    },
  },
  integrations: {
    label: { en: "Integrations", fr: "Intégrations" },
    title: { en: "Works with the stack you already run on", fr: "Fonctionne avec la pile que vous utilisez déjà" },
    desc: {
      en: "Connect SSV to your existing tools in minutes — communication channels, automation platforms, cloud services, and CRMs. No rip-and-replace.",
      fr: "Connectez SSV à vos outils existants en quelques minutes — canaux de communication, plateformes d'automatisation, services cloud et CRM. Pas de remplacement.",
    },
    apiCta: { en: "Explore the API", fr: "Explorer l'API" },
    noTool: { en: "Don't see your tool? SSV exposes a full REST API — connect anything in your stack.", fr: "Vous ne voyez pas votre outil? SSV expose une API REST complète — connectez n'importe quoi dans votre pile." },
  },
  cta: {
    label: { en: "Ready to start", fr: "Prêt à commencer" },
    title: { en: "Your customers trust you at the moment that matters most.", fr: "Vos clients vous font confiance au moment qui compte le plus." },
    desc: { en: "Every ticket is a promise. SSV CRM makes sure you keep it.", fr: "Chaque ticket est une promesse. SSV CRM s'assure que vous la tenez." },
    book: { en: "Book a demo", fr: "Réserver une démo" },
    start: { en: "Start Free Trial", fr: "Essai Gratuit" },
  },
  footer: {
    desc: { en: "AI-powered customer support platform. Built by SSV for teams that move fast.", fr: "Plateforme de support client alimentée par l'IA. Construite par SSV pour les équipes qui avancent vite." },
    platform: { en: "Platform", fr: "Plateforme" },
    company: { en: "Company", fr: "Entreprise" },
    support: { en: "Support", fr: "Support" },
  },
  featuresPage: {
    title: { en: "Platform Features", fr: "Fonctionnalités de la Plateforme" },
    subtitle: { en: "Everything you need to deliver exceptional customer support, powered by AI.", fr: "Tout ce dont vous avez besoin pour offrir un support client exceptionnel, propulsé par l'IA." },
  },
  channelsPage: {
    title: { en: "Channel Integrations", fr: "Intégrations de Canaux" },
    subtitle: { en: "Connect every communication channel your customers use into one unified inbox.", fr: "Connectez chaque canal de communication utilisé par vos clients dans une boîte de réception unifiée." },
  },
  agentsPage: {
    title: { en: "AI Agent Suite", fr: "Suite d'Agents IA" },
    subtitle: { en: "Nine intelligent agents working together to resolve your support tickets.", fr: "Neuf agents intelligents travaillant ensemble pour résoudre vos tickets de support." },
  },
  aboutPage: {
    title: { en: "About SSV", fr: "À propos de SSV" },
    subtitle: { en: "We're building the future of customer support with AI.", fr: "Nous construisons l'avenir du support client avec l'IA." },
  },
  login: {
    welcomeBack: { en: "Welcome back", fr: "Bon retour" },
    signInDesc: { en: "Sign in to your support dashboard", fr: "Connectez-vous à votre tableau de bord" },
    quickAccess: { en: "Quick Demo Access", fr: "Accès Démo Rapide" },
    orEmail: { en: "or sign in with email", fr: "ou connectez-vous avec email" },
    emailLabel: { en: "Email address", fr: "Adresse email" },
    passwordLabel: { en: "Password", fr: "Mot de passe" },
    forgotPassword: { en: "Forgot password?", fr: "Mot de passe oublié?" },
    signIn: { en: "Sign In", fr: "Se connecter" },
    signingIn: { en: "Signing in...", fr: "Connexion en cours..." },
    adminNote: { en: "Contact your administrator for account access", fr: "Contactez votre administrateur pour l'accès au compte" },
    heroTitle: { en: "Your Support Team,\nSupercharged by AI", fr: "Votre Équipe de Support,\nPropulsée par l'IA" },
    heroDesc: { en: "Unify every support channel into one intelligent workspace. 9 AI agents classify, route, respond, and resolve.", fr: "Unifiez chaque canal de support dans un espace intelligent. 9 agents IA classifient, routent, répondent et résolvent." },
  },
  forgotPassword: {
    title: { en: "Forgot your password?", fr: "Mot de passe oublié?" },
    desc: { en: "Enter your email and we'll send you a reset link.", fr: "Entrez votre email et nous vous enverrons un lien de réinitialisation." },
    emailLabel: { en: "Email address", fr: "Adresse email" },
    sendReset: { en: "Send Reset Link", fr: "Envoyer le lien" },
    sending: { en: "Sending...", fr: "Envoi en cours..." },
    checkEmail: { en: "Check your email", fr: "Vérifiez votre email" },
    backToSignIn: { en: "Back to Sign In", fr: "Retour à la connexion" },
    demoMode: { en: "Demo Mode", fr: "Mode Démo" },
    demoDesc: { en: "Password reset emails are simulated. In production, use a real email service.", fr: "Les emails de réinitialisation sont simulés. En production, utilisez un vrai service email." },
  },
  resetPassword: {
    title: { en: "Reset your password", fr: "Réinitialisez votre mot de passe" },
    desc: { en: "Enter your new password below.", fr: "Entrez votre nouveau mot de passe ci-dessous." },
    newPassword: { en: "New Password", fr: "Nouveau mot de passe" },
    confirmPassword: { en: "Confirm Password", fr: "Confirmer le mot de passe" },
    resetBtn: { en: "Reset Password", fr: "Réinitialiser" },
    resetting: { en: "Resetting...", fr: "Réinitialisation..." },
    success: { en: "Password Reset!", fr: "Mot de passe réinitialisé!" },
    redirecting: { en: "Redirecting to login...", fr: "Redirection vers la connexion..." },
    backToSignIn: { en: "Back to Sign In", fr: "Retour à la connexion" },
  },
  dashboard: {
    search: { en: "Search tickets, customers, articles...", fr: "Rechercher tickets, clients, articles..." },
    aiActive: { en: "AI Active", fr: "IA Active" },
    autoResolved: { en: "auto-resolved", fr: "auto-résolus" },
    logout: { en: "Logout", fr: "Déconnexion" },
    main: { en: "Main", fr: "Principal" },
    analytics: { en: "Analytics", fr: "Analytique" },
    system: { en: "System", fr: "Système" },
    dashboard: { en: "Dashboard", fr: "Tableau de bord" },
    inbox: { en: "Inbox", fr: "Boîte de réception" },
    tickets: { en: "Tickets", fr: "Tickets" },
    customers: { en: "Customers", fr: "Clients" },
    knowledge: { en: "Knowledge Base", fr: "Base de connaissances" },
    teams: { en: "Teams", fr: "Équipes" },
    escalation: { en: "Escalation", fr: "Escalade" },
    settings: { en: "Settings", fr: "Paramètres" },
  },
  landing: {
    heroWords: {
      ticket: { en: "Ticket", fr: "Ticket" },
      query: { en: "Query", fr: "Requête" },
      complaint: { en: "Complaint", fr: "Réclamation" },
      request: { en: "Request", fr: "Demande" },
    },
    features: {
      intake: { title: { en: "Intelligent Intake", fr: "Réception Intelligente" }, desc: { en: "SSV classifies, routes, and responds to every customer message instantly — no queue, no delay.", fr: "SSV classe, route et répond à chaque message client instantanément — sans file d'attente, sans délai." }, bullets: { en: ["Auto-classification", "Smart routing", "Instant response"], fr: ["Classification auto", "Routage intelligent", "Réponse instantanée"] } },
      inbox: { title: { en: "Unified Inbox", fr: "Boîte de réception unifiée" }, desc: { en: "Every channel — WhatsApp, Email, SMS, Messenger, Instagram, Web Chat — in one conversation thread.", fr: "Tous les canaux — WhatsApp, Email, SMS, Messenger, Instagram, Web Chat — dans un seul fil de conversation." }, bullets: { en: ["6 channels unified", "Real-time sync", "Full context"], fr: ["6 canaux unifiés", "Synchronisation en temps réel", "Contexte complet"] } },
      sentiment: { title: { en: "Sentiment Analysis", fr: "Analyse de Sentiment" }, desc: { en: "Real-time emotion detection on every message. Know when a customer is frustrated before they churn.", fr: "Détection d'émotions en temps réel sur chaque message. Savoyez quand un client est frustré avant qu'il ne parte." }, bullets: { en: ["Real-time scoring", "Trend alerts", "Churn prediction"], fr: ["Évaluation temps réel", "Alertes de tendance", "Prédiction de churn"] } },
      sla: { title: { en: "SLA Monitoring", fr: "Monitoring SLA" }, desc: { en: "Automated escalation when SLAs are breached. Never miss a response deadline again.", fr: "Escalade automatique en cas de violation SLA. Ne manquez plus jamais une échéance." }, bullets: { en: ["Auto-escalation", "SLA tracking", "Compliance reporting"], fr: ["Escalade auto", "Suivi SLA", "Rapports de conformité"] } },
      knowledge: { title: { en: "AI Knowledge Base", fr: "Base de Connaissances IA" }, desc: { en: "Your team's knowledge, auto-digested and searchable. AI agents use it to resolve tickets autonomously.", fr: "Les connaissances de votre équipe, auto-digestes et consultables. Les agents IA les utilisent pour résoudre les tickets autonomously." }, bullets: { en: ["Auto-ingestion", "Semantic search", "AI-powered answers"], fr: ["Auto-ingestion", "Recherche sémantique", "Réponses IA"] } },
      analytics: { title: { en: "Real-time Analytics", fr: "Analytique Temps Réel" }, desc: { en: "Dashboards that update live. Track resolution rates, CSAT, agent performance, and channel health.", fr: "Tableaux de bord mis à jour en direct. Suivez les taux de résolution, CSAT, performance des agents et santé des canaux." }, bullets: { en: ["Live dashboards", "Export reports", "Custom metrics"], fr: ["Tableaux de bord live", "Export de rapports", "Métriques personnalisées"] } },
    },
    agents: {
      intake: { en: "Classifies and routes incoming tickets", fr: "Classe et route les tickets entrants" },
      knowledge: { en: "Searches and retrieves relevant articles", fr: "Recherche et récupère les articles pertinents" },
      resolution: { en: "Auto-resolves common issues", fr: "Résout automatiquement les problèmes courants" },
      qa: { en: "Monitors response quality and tone", fr: "Surveille la qualité et le ton des réponses" },
      escalation: { en: "Routes critical issues to the right team", fr: "Route les problèmes critiques à la bonne équipe" },
      sentiment: { en: "Detects emotions in real-time", fr: "Détecte les émotions en temps réel" },
      analytics: { en: "Generates insights and trend reports", fr: "Génère des insights et rapports de tendance" },
      routing: { en: "Assigns tickets to best-suited agents", fr: "Attribue les tickets aux agents les plus compétents" },
      feedback: { en: "Collects and analyzes customer feedback", fr: "Collecte et analyse les retours clients" },
    },
    channels: {
      whatsapp: { en: "2B+ users worldwide", fr: "2 Milliards+ d'utilisateurs" },
      email: { en: "IMAP/SMTP integration", fr: "Intégration IMAP/SMTP" },
      sms: { en: "Termii-powered delivery", fr: "Livraison propulsée par Termii" },
      web: { en: "Embeddable widget", fr: "Widget intégrable" },
      messenger: { en: "Facebook integration", fr: "Intégration Facebook" },
      instagram: { en: "DM support", fr: "Support Messages" },
    },
    problems: {
      triage: { title: { en: "Ticket never triaged", fr: "Ticket jamais trié" }, desc: { en: "Customer sends a message at 2am. No one picks it up. They don't come back.", fr: "Un client envoie un message à 2h du matin. Personne ne répond. Il ne revient plus." } },
      escalation: { title: { en: "Escalation fires too late", fr: "Escalade trop tardive" }, desc: { en: "By the time your team sees it, the customer has already churned.", fr: "Quand votre équipe le voit, le client est déjà parti." } },
      resolution: { title: { en: "Resolution fails silently", fr: "Résolution échoue silencieusement" }, desc: { en: "Agent responds with a template. Customer is frustrated. Hours pass before anyone notices.", fr: "L'agent répond avec un modèle. Le client est frustré. Des heures passent avant que quelqu'un le remarque." } },
      fallback: { title: { en: "No fallback path", fr: "Pas de solution de secours" }, desc: { en: "One channel fails and everything stops. No automatic retry. Just silence.", fr: "Un canal échoue et tout s'arrête. Pas de relance automatique. Juste le silence." } },
    },
    steps: {
      ingest: { title: { en: "Ingest", fr: "Ingestion" }, desc: { en: "Customer message arrives on any channel — WhatsApp, Email, SMS, Web, Messenger, or Instagram.", fr: "Le message client arrive sur n'importe quel canal — WhatsApp, Email, SMS, Web, Messenger ou Instagram." } },
      classify: { title: { en: "Classify", fr: "Classification" }, desc: { en: "SSV AI detects intent, sentiment, and urgency in under 50ms. Routes to the right queue.", fr: "SSV IA détecte l'intention, le sentiment et l'urgence en moins de 50ms. Route vers la bonne file." } },
      resolve: { title: { en: "Resolve", fr: "Résolution" }, desc: { en: "Knowledge Agent and Resolution Agent handle the query. 67% resolved without human intervention.", fr: "L'Agent Connaissances et l'Agent Résolution traitent la requête. 67% résolus sans intervention humaine." } },
      escalate: { title: { en: "Escalate", fr: "Escalade" }, desc: { en: "If needed, the Escalation Agent hands off to a human with full context. SLA is always enforced.", fr: "Si nécessaire, l'Agent d'Escalade transfère à un humain avec le contexte complet. Le SLA est toujours respecté." } },
    },
  },
  sidebar: {
    main: { en: "Main", fr: "Principal" },
    analytics: { en: "Analytics", fr: "Analytique" },
    system: { en: "System", fr: "Système" },
    dashboard: { en: "Dashboard", fr: "Tableau de bord" },
    inbox: { en: "Inbox", fr: "Boîte de réception" },
    tickets: { en: "Tickets", fr: "Tickets" },
    customers: { en: "Customers", fr: "Clients" },
    knowledge: { en: "Knowledge Base", fr: "Base de connaissances" },
    teams: { en: "Teams", fr: "Équipes" },
    escalation: { en: "Escalation", fr: "Escalade" },
    settings: { en: "Settings", fr: "Paramètres" },
  },
  misc: {
    poweredBy: { en: "SSV-powered delivery", fr: "Livraison propulsée par SSV" },
    live: { en: "Live", fr: "En direct" },
    learnMore: { en: "Learn more", fr: "En savoir plus" },
    viewAll: { en: "View all", fr: "Voir tout" },
    contact: { en: "Contact us", fr: "Contactez-nous" },
  },
} as const;

export function t(locale: Locale, key: string, fallback?: string): string {
  const keys = key.split(".");
  let val: any = translations;
  for (const k of keys) {
    val = val?.[k];
  }
  if (val && typeof val === "object") return val[locale] || val.en || fallback || key;
  return fallback || key;
}
