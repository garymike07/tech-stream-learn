import type { TranslationSchema } from "./en";

const fr: TranslationSchema = {
  nav: {
    home: "Accueil",
    categories: "Catégories",
    paths: "Parcours",
    immersive: "Studio immersif",
    exercises: "Exercices",
    pricing: "Tarification",
    insights: "Insights",
    signIn: "Connexion",
    join: "Rejoindre gratuitement",
  },
  header: {
    status: {
      premium: "Membre Premium",
      trial: "Accès d'essai",
      trialEndsToday: "L'essai se termine aujourd'hui",
      trialDays: (days: number) => `Essai • ${days} jour${days === 1 ? "" : "s"} restant${days === 1 ? "" : "s"}`,
      trialEnded: "Essai terminé",
      free: "Offre gratuite",
    },
    localeLabel: "Langue",
  },
  landing: {
    hero: {
      badge: "Apprentissage orienté avenir",
      title: "Développez des compétences technologiques de classe mondiale avec Mike Learning Centre",
      subtitle:
        "Maîtrisez les stacks d'ingénierie modernes grâce à des vidéos organisées, des plans de cours complets et des exercices guidés. Profitez de 30 jours illimités, puis continuez pour seulement {{monthly}} ou engagez-vous annuellement pour {{yearly}}.",
      primaryCta: "Explorer les cours",
      secondaryCta: "Explorer le centre d'exercices",
      pricingCta: "Voir la tarification",
    },
    highlights: {
      title: "Pourquoi les apprenants choisissent Mike",
      description: "Tout ce qu'il faut pour lancer et accélérer une carrière technologique moderne existe dans un hub connecté.",
    },
    categories: {
      title: "Explorer les catégories",
      description: "Du développement web à la data, chaque catégorie est conçue pour la profondeur, la clarté et un progrès réel.",
      viewAll: "Voir toutes les catégories",
    },
    pricing: {
      badge: "Accès flexible",
      title: "Choisissez votre façon d'apprendre",
      description: "Trois formules adaptées à chaque étape de votre parcours. Commencez gratuitement, passez à Pro ou optez pour l'Elite avec un accompagnement sur mesure.",
      freeTitle: "Gratuit • 0 KES",
      freeDescription: "Lancez-vous avec des limites généreuses et 30 jours illimités.",
      proBadge: "Le plus populaire",
      proTitle: (price: string) => `Pro • ${price}/mois`,
      proDescription: "Débloquez toutes les formations, les exercices complets et les sorties privées.",
      eliteBadge: "Nouveau",
      eliteTitle: (price: string) => `Elite • ${price}/an`,
      eliteDescription: "Onboarding premium, cohortes privées et sessions stratégiques trimestrielles.",
      comingSoonCta: "Paiements M-Pesa bientôt disponibles",
      comingSoonNote: "Nous vous préviendrons dès que les paiements STK sécurisés seront actifs.",
      browseCourses: "Parcourir tous les cours",
      unlockPricing: (monthly: string, yearly: string) => `Débloquez l'accès illimité après l'essai pour ${monthly} ou ${yearly} • M-Pesa arrive bientôt`,
    },
    callToAction: {
      title: "Prêt à commencer à apprendre ?",
      description:
        "Rejoignez des apprenants qui maîtrisent les technologies modernes avec des parcours clairs, des vidéos organisées et des exercices pratiques. Votre prochain chapitre commence en quelques minutes.",
      browse: "Parcourir tous les cours",
    },
  },
  insights: {
    hero: {
      title: "Votre hub d'intelligence d'apprentissage",
      subtitle:
        "Restez sur la bonne voie avec des recommandations ciblées, un suivi de vitesse et des jalons partageables qui rendent vos progrès visibles.",
      shareCta: "Copier l'aperçu des progrès",
      shareSuccess: "Aperçu copié dans le presse-papiers !",
      shareFallback: "Progression",
    },
    analytics: {
      streak: "Série active",
      weekly: "Leçons cette semaine",
      coverage: "Couverture des catégories",
      completedThisWeek: (count: number) => `${count} leçon${count === 1 ? "" : "s"} cette semaine`,
      lastCompletion: (label: string) => `Dernière réussite : ${label}`,
      mostActiveCategory: (label: string) => `Catégorie la plus active : ${label}`,
    },
    recommendations: {
      title: "Sélections personnalisées",
      subtitle: "Des cours et parcours choisis pour refléter votre dynamique récente.",
      pathCTA: "Reprendre le parcours",
      courseCTA: "Voir le cours",
      reasons: {
        sameCategory: "Continuez à progresser en {{category}}",
        advancedLevel: "Relevez un module avancé",
        pathMomentum: "Prochaine étape de votre parcours",
        freshCategory: "Élargissez vos compétences avec {{category}}",
      },
    },
    cohorts: {
      title: "Cohortes suggérées",
      subtitle: "Rejoignez d'autres apprenants sur les mêmes parcours.",
      labels: {
        frontend: "Équipe Frontend",
        backend: "Laboratoire Backend",
        ai: "Bâtisseurs IA",
        cloud: "Guilde Cloud",
      },
    },
  },
  categories: {
    badge: "Explorer les catégories",
    title: "Choisissez un parcours adapté à votre prochain rôle",
    description: (count: number) =>
      `Découvrez des cours organisés, des briefs projets et des évaluations dans ${count} catégories technologiques. Chaque parcours vous accompagne des bases à la résolution avancée de problèmes.`,
    primaryCta: "Parcourir toutes les catégories",
    secondaryCta: "Pratiquer avec des exercices",
  },
  locale: {
    english: "English",
    french: "Français",
  },
};

export default fr;
