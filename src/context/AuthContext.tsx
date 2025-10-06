import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-react";
import { addDays, differenceInCalendarDays, isAfter, isValid, parseISO, startOfDay } from "date-fns";

type AuthUser = {
  email: string;
  fullName: string;
};

type SubscriptionStatus = "trial" | "trial_expired" | "free" | "premium";

interface AuthContextValue {
  user: AuthUser | null;
  enrollments: string[];
  subscriptionStatus: SubscriptionStatus;
  trialEndsAt: string | null;
  trialDaysRemaining: number | null;
  monthlyPriceKes: number;
  maxFreeCourses: number;
  logout: () => Promise<void>;
  enrollCourse: (courseId: string) => void;
  requestSubscription: () => void;
}

type StoredSubscription = {
  status: SubscriptionStatus;
  trialStartedAt: string | null;
  trialEndsAt: string | null;
  monthlyPriceKes: number | null;
};

const STORAGE_KEYS = {
  ENROLLMENTS: "tech-stream-learn-enrollments",
  SUBSCRIPTION: "tech-stream-learn-subscription",
} as const;

const TRIAL_DURATION_DAYS = 30;
const MONTHLY_PRICE_KES = 500;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getStoredEnrollments = (): Record<string, string[]> => {
  const raw = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? (parsed as Record<string, string[]>) : {};
  } catch (error) {
    console.error("Failed to parse stored enrollments", error);
    return {};
  }
};

const persistEnrollments = (map: Record<string, string[]>) => {
  localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(map));
};

const getSubscriptionKey = (email: string) => `${STORAGE_KEYS.SUBSCRIPTION}-${email}`;

const getStoredSubscription = (email: string): StoredSubscription | null => {
  const raw = localStorage.getItem(getSubscriptionKey(email));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredSubscription;
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch (error) {
    console.error("Failed to parse stored subscription", error);
    return null;
  }
};

const persistSubscription = (email: string, subscription: StoredSubscription) => {
  localStorage.setItem(getSubscriptionKey(email), JSON.stringify(subscription));
};

const createTrialSubscription = (now: Date): StoredSubscription => ({
  status: "trial",
  trialStartedAt: now.toISOString(),
  trialEndsAt: addDays(now, TRIAL_DURATION_DAYS).toISOString(),
  monthlyPriceKes: MONTHLY_PRICE_KES,
});

const normalizeSubscription = (record: StoredSubscription, now: Date) => {
  const updated = { ...record };
  let changed = false;

  if (typeof updated.monthlyPriceKes !== "number") {
    updated.monthlyPriceKes = MONTHLY_PRICE_KES;
    changed = true;
  } else if (updated.monthlyPriceKes !== MONTHLY_PRICE_KES) {
    updated.monthlyPriceKes = MONTHLY_PRICE_KES;
    changed = true;
  }

  if (!updated.trialStartedAt) {
    updated.trialStartedAt = now.toISOString();
    changed = true;
  }

  if (!updated.trialEndsAt) {
    const start = updated.trialStartedAt ? parseISO(updated.trialStartedAt) : now;
    const validStart = isValid(start) ? start : now;
    updated.trialEndsAt = addDays(validStart, TRIAL_DURATION_DAYS).toISOString();
    changed = true;
  }

  if (!updated.status || !["trial", "trial_expired", "free", "premium"].includes(updated.status)) {
    updated.status = "free";
    changed = true;
  }

  return { record: updated, changed };
};

const evaluateSubscription = (record: StoredSubscription, now: Date) => {
  const { record: normalizedRecord, changed: normalizationChanged } = normalizeSubscription(record, now);
  let changed = normalizationChanged;
  let status = normalizedRecord.status;
  let trialEndsAt = normalizedRecord.trialEndsAt;
  let trialDaysRemaining: number | null = null;

  if (status === "trial" && trialEndsAt) {
    const endDate = parseISO(trialEndsAt);
    if (!isValid(endDate)) {
      const start = normalizedRecord.trialStartedAt ? parseISO(normalizedRecord.trialStartedAt) : now;
      const validStart = isValid(start) ? start : now;
      const recalculatedEnd = addDays(validStart, TRIAL_DURATION_DAYS);
      trialEndsAt = recalculatedEnd.toISOString();
      status = isAfter(now, recalculatedEnd) ? "trial_expired" : "trial";
      changed = true;
      normalizedRecord.trialEndsAt = trialEndsAt;
      normalizedRecord.status = status;
      trialDaysRemaining = status === "trial" ? Math.max(0, differenceInCalendarDays(recalculatedEnd, startOfDay(now))) : 0;
    } else if (isAfter(now, endDate)) {
      status = "trial_expired";
      changed = true;
      normalizedRecord.status = status;
      trialDaysRemaining = 0;
    } else {
      trialDaysRemaining = Math.max(0, differenceInCalendarDays(endDate, startOfDay(now)));
    }
  } else if (status === "trial_expired") {
    trialDaysRemaining = 0;
    if (!trialEndsAt) {
      const start = normalizedRecord.trialStartedAt ? parseISO(normalizedRecord.trialStartedAt) : now;
      const validStart = isValid(start) ? start : now;
      const recalculatedEnd = addDays(validStart, TRIAL_DURATION_DAYS);
      trialEndsAt = recalculatedEnd.toISOString();
      normalizedRecord.trialEndsAt = trialEndsAt;
      changed = true;
    }
  } else if (status === "free") {
    trialDaysRemaining = 0;
  } else if (status === "premium") {
    trialDaysRemaining = null;
  }

  normalizedRecord.status = status;
  normalizedRecord.trialEndsAt = trialEndsAt;

  return {
    status,
    trialEndsAt,
    trialDaysRemaining,
    record: normalizedRecord,
    changed,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { isSignedIn, signOut } = useClerkAuth();
  const [enrollments, setEnrollments] = useState<string[]>([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("free");
  const [trialEndsAt, setTrialEndsAt] = useState<string | null>(null);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState<number | null>(null);
  const maxFreeCourses = 3;
  const monthlyPriceKes = MONTHLY_PRICE_KES;

  const userEmail = useMemo(() => {
    const emailAddress = clerkUser?.primaryEmailAddress?.emailAddress;
    return emailAddress ? emailAddress.trim().toLowerCase() : null;
  }, [clerkUser]);

  const userFullName = useMemo(() => {
    if (!clerkUser) return null;
    if (clerkUser.fullName) return clerkUser.fullName;
    const parts = [clerkUser.firstName, clerkUser.lastName].filter(Boolean) as string[];
    if (parts.length > 0) {
      return parts.join(" ");
    }
    return clerkUser.username ?? clerkUser.primaryEmailAddress?.emailAddress ?? null;
  }, [clerkUser]);

  const user = useMemo<AuthUser | null>(() => {
    if (!isSignedIn || !userEmail) return null;
    return {
      email: userEmail,
      fullName: userFullName ?? userEmail,
    };
  }, [isSignedIn, userEmail, userFullName]);

  const syncSubscription = useCallback(
    (email: string, existingRecord?: StoredSubscription) => {
      const now = new Date();
      let record = existingRecord ?? getStoredSubscription(email);
      let changed = false;

      if (!record) {
        record = createTrialSubscription(now);
        changed = true;
      }

      const evaluation = evaluateSubscription(record, now);
      if (changed || evaluation.changed) {
        persistSubscription(email, evaluation.record);
      }

      setSubscriptionStatus(evaluation.status);
      setTrialEndsAt(evaluation.trialEndsAt ?? null);
      setTrialDaysRemaining(evaluation.trialDaysRemaining);
    },
    [],
  );

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn || !userEmail) {
      setEnrollments([]);
      setSubscriptionStatus("free");
      setTrialEndsAt(null);
      setTrialDaysRemaining(null);
      return;
    }

    const existing = getStoredEnrollments();
    setEnrollments(existing[userEmail] ?? []);
    syncSubscription(userEmail);
  }, [isLoaded, isSignedIn, userEmail, syncSubscription]);

  useEffect(() => {
    if (!isSignedIn || !userEmail) {
      return;
    }
    const existing = getStoredEnrollments();
    existing[userEmail] = enrollments;
    persistEnrollments(existing);
  }, [enrollments, isSignedIn, userEmail]);

  const logout = useCallback(async () => {
    await signOut();
    setEnrollments([]);
    setSubscriptionStatus("free");
    setTrialEndsAt(null);
    setTrialDaysRemaining(null);
  }, [signOut]);

  const enrollCourse = useCallback(
    (courseId: string) => {
      if (!user) {
        throw new Error("You need to be signed in to enroll.");
      }

      if (subscriptionStatus !== "premium" && subscriptionStatus !== "trial") {
        const currentCount = enrollments.length;
        const isExisting = enrollments.includes(courseId);
        if (!isExisting && currentCount >= maxFreeCourses) {
          throw new Error(`Free plan limit reached. Subscribe for unlimited course access at KES ${MONTHLY_PRICE_KES}/month once checkout opens.`);
        }
      }

      setEnrollments((current) => (current.includes(courseId) ? current : [...current, courseId]));
    },
    [user, subscriptionStatus, enrollments, maxFreeCourses],
  );

  const requestSubscription = useCallback(() => {
    if (!user) {
      throw new Error("Sign in to manage your subscription.");
    }
    const now = new Date();
    const existing = getStoredSubscription(user.email) ?? createTrialSubscription(now);
    const updated: StoredSubscription = {
      ...existing,
      status: "premium",
      monthlyPriceKes: MONTHLY_PRICE_KES,
    };
    persistSubscription(user.email, updated);
    setSubscriptionStatus("premium");
    setTrialEndsAt(updated.trialEndsAt ?? null);
    setTrialDaysRemaining(null);
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      enrollments,
      subscriptionStatus,
      trialEndsAt,
      trialDaysRemaining,
      monthlyPriceKes,
      maxFreeCourses,
      logout,
      enrollCourse,
      requestSubscription,
    }),
    [user, enrollments, subscriptionStatus, trialEndsAt, trialDaysRemaining, monthlyPriceKes, maxFreeCourses, logout, enrollCourse, requestSubscription],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
