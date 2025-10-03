import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { addDays, differenceInCalendarDays, isAfter, isValid, parseISO, startOfDay } from "date-fns";

type AuthUser = {
  email: string;
  fullName: string;
};

type AuthCredentials = {
  email: string;
  password: string;
};

type SignupPayload = AuthCredentials & {
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
  signup: (payload: SignupPayload) => Promise<void>;
  login: (payload: AuthCredentials) => Promise<void>;
  logout: () => void;
  enrollCourse: (courseId: string) => void;
  requestSubscription: () => void;
}

type StoredUser = {
  email: string;
  password: string;
  fullName: string;
};

type StoredSubscription = {
  status: SubscriptionStatus;
  trialStartedAt: string | null;
  trialEndsAt: string | null;
  monthlyPriceKes: number | null;
};

const STORAGE_KEYS = {
  USERS: "tech-stream-learn-users",
  SESSION: "tech-stream-learn-session",
  ENROLLMENTS: "tech-stream-learn-enrollments",
  SUBSCRIPTION: "tech-stream-learn-subscription",
} as const;

const TRIAL_DURATION_DAYS = 30;
const MONTHLY_PRICE_KES = 500;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const encodePassword = (value: string) => {
  try {
    return window.btoa(unescape(encodeURIComponent(value)));
  } catch (error) {
    console.warn("Password encoding failed, storing in plain text.");
    return value;
  }
};

const getStoredUsers = (): StoredUser[] => {
  const raw = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredUser[]) : [];
  } catch (error) {
    console.error("Failed to parse stored users", error);
    return [];
  }
};

const persistUsers = (users: StoredUser[]) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [enrollments, setEnrollments] = useState<string[]>([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("free");
  const [trialEndsAt, setTrialEndsAt] = useState<string | null>(null);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState<number | null>(null);
  const maxFreeCourses = 3;
  const monthlyPriceKes = MONTHLY_PRICE_KES;

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
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as AuthUser;
      setUser(parsed);
    } catch (error) {
      console.error("Failed to parse session", error);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setEnrollments([]);
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      setSubscriptionStatus("free");
      setTrialEndsAt(null);
      setTrialDaysRemaining(null);
      return;
    }

    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
    const existing = getStoredEnrollments();
    setEnrollments(existing[user.email] ?? []);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const existing = getStoredEnrollments();
    existing[user.email] = enrollments;
    persistEnrollments(existing);
  }, [enrollments, user]);

  useEffect(() => {
    if (!user) return;
    syncSubscription(user.email);
  }, [user, syncSubscription]);

  const signup = useCallback(async ({ email, password, fullName }: SignupPayload) => {
    const trimmedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    const alreadyExists = users.some((item) => item.email === trimmedEmail);
    if (alreadyExists) {
      throw new Error("An account with this email already exists.");
    }

    const encodedPassword = encodePassword(password);
    const newUser: StoredUser = {
      email: trimmedEmail,
      password: encodedPassword,
      fullName: fullName.trim(),
    };

    persistUsers([...users, newUser]);
    setUser({ email: trimmedEmail, fullName: newUser.fullName });
    setEnrollments([]);
    const now = new Date();
    const trialRecord = createTrialSubscription(now);
    persistSubscription(trimmedEmail, trialRecord);
    const evaluation = evaluateSubscription(trialRecord, now);
    setSubscriptionStatus(evaluation.status);
    setTrialEndsAt(evaluation.trialEndsAt ?? null);
    setTrialDaysRemaining(evaluation.trialDaysRemaining);
  }, []);

  const login = useCallback(async ({ email, password }: AuthCredentials) => {
    const trimmedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    const encodedPassword = encodePassword(password);
    const match = users.find((item) => item.email === trimmedEmail);

    if (!match || match.password !== encodedPassword) {
      throw new Error("Invalid email or password.");
    }

    setUser({ email: trimmedEmail, fullName: match.fullName });
    syncSubscription(trimmedEmail);
  }, [syncSubscription]);

  const logout = useCallback(() => {
    setUser(null);
    setSubscriptionStatus("free");
    setTrialEndsAt(null);
    setTrialDaysRemaining(null);
  }, []);

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
      signup,
      login,
      logout,
      enrollCourse,
      requestSubscription,
    }),
    [user, enrollments, subscriptionStatus, trialEndsAt, trialDaysRemaining, monthlyPriceKes, maxFreeCourses, signup, login, logout, enrollCourse, requestSubscription],
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
