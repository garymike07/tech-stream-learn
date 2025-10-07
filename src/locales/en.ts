const en = {
  nav: {
    home: "Home",
    categories: "Categories",
    paths: "Paths",
    immersive: "Immersive Studio",
    exercises: "Exercises",
    pricing: "Pricing",
    insights: "Insights",
    signIn: "Sign in",
    join: "Join free",
  },
  header: {
    status: {
      premium: "Premium member",
      trial: "Trial access",
      trialEndsToday: "Trial ends today",
      trialDays: (days: number) => `Trial • ${days} day${days === 1 ? "" : "s"} left`,
      trialEnded: "Trial ended",
      free: "Free tier",
    },
    localeLabel: "Language",
  },
  landing: {
    hero: {
      badge: "Future-ready learning",
      title: "Build world-class technology skills with Mike Learning Centre",
      subtitle:
        "Master modern engineering stacks with curated videos, expansive course outlines, and guided exercises. Unlock every category for 30 days on us, then continue growing for just {{monthly}} or commit annually for {{yearly}}.",
      primaryCta: "Explore Courses",
      secondaryCta: "Explore Exercise Centre",
      pricingCta: "View Pricing",
    },
    highlights: {
      title: "Why learners choose Mike",
      description: "Everything required to launch and accelerate a modern technology career lives in one connected hub.",
    },
    categories: {
      title: "Explore Learning Categories",
      description: "From web development to data science, every category is curated for depth, clarity, and real progress.",
      viewAll: "View All Categories",
    },
    pricing: {
      badge: "Flexible access",
      title: "Choose how you learn",
      description: "Three tiers crafted for every stage of your learning journey. Start free, scale with Pro, or go all-in with Elite concierge access.",
      freeTitle: "Free • 0 KES",
      freeDescription: "Kickstart your journey with generous limits and a 30-day unlimited trial.",
      proBadge: "Most popular",
      proTitle: (price: string) => `Pro • ${price}/mo`,
      proDescription: "Unlock unlimited courses, full exercise libraries, and invite-only releases.",
      eliteBadge: "New",
      eliteTitle: (price: string) => `Elite • ${price}/yr`,
      eliteDescription: "White-glove onboarding, private cohorts, and quarterly strategy sessions.",
      comingSoonCta: "M-Pesa payments launching soon",
      comingSoonNote: "We'll notify you the moment secure STK push payments are live.",
      browseCourses: "Browse All Courses",
      unlockPricing: (monthly: string, yearly: string) => `Unlock unlimited access after your trial for ${monthly} or ${yearly} • M-Pesa coming soon`,
    },
    callToAction: {
      title: "Ready to start learning?",
      description:
        "Join learners mastering modern technology stacks with clear pathways, curated videos, and project-based practice. Your next chapter begins in minutes.",
      browse: "Browse All Courses",
    },
  },
  insights: {
    hero: {
      title: "Your learning intelligence hub",
      subtitle:
        "Stay on track with tailored recommendations, velocity insights, and shareable milestones that keep your growth visible.",
      shareCta: "Copy progress snapshot",
      shareSuccess: "Progress snapshot copied to clipboard!",
      shareFallback: "Progress snapshot",
    },
    analytics: {
      streak: "Active streak",
      weekly: "Lessons this week",
      coverage: "Category coverage",
      completedThisWeek: (count: number) => `${count} lesson${count === 1 ? "" : "s"} this week`,
      lastCompletion: (label: string) => `Last completion: ${label}`,
      mostActiveCategory: (label: string) => `Most active category: ${label}`,
    },
    recommendations: {
      title: "Personalized picks",
      subtitle: "Courses and paths selected because they match your recent momentum.",
      pathCTA: "Resume path",
      courseCTA: "View course",
      reasons: {
        sameCategory: "Continue mastering {{category}}",
        advancedLevel: "Challenge yourself with an advanced module next",
        pathMomentum: "Next milestone in your learning path",
        freshCategory: "Broaden your skills with {{category}}",
      },
    },
    cohorts: {
      title: "Suggested learning cohorts",
      subtitle: "Join forces with other learners tackling similar tracks.",
      labels: {
        frontend: "Frontend velocity crew",
        backend: "Backend platform lab",
        ai: "AI product builders",
        cloud: "Cloud reliability guild",
      },
    },
  },
  categories: {
    badge: "Explore learning categories",
    title: "Choose a pathway tailored to your next role",
    description: (count: number) =>
      `Discover curated courses, project briefs, and assessments across ${count} technology categories. Each path is designed to take you from fundamentals to advanced problem solving.`,
    primaryCta: "Browse all categories",
    secondaryCta: "Practice with exercises",
  },
  locale: {
    english: "English",
    french: "Français",
  },
};

export type TranslationSchema = typeof en;

export default en;
