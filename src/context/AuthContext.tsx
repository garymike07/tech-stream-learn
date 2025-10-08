import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
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
  yearlyPriceKes: number;
  maxFreeCourses: number;
  logout: () => Promise<void>;
  login: (input: { email: string; password: string }) => Promise<void>;
  signup: (input: { email: string; fullName: string; password: string }) => Promise<void>;
  enrollCourse: (courseId: string) => void;
  requestSubscription: () => void;
}

type StoredSubscription = {
  status: SubscriptionStatus;
  trialStartedAt: string | null;
  trialEndsAt: string | null;
  monthlyPriceKes: number | null;
};

type StoredAccount = {
  email: string;
  fullName: string;
  passwordHash: string;
  createdAt: string;
};

const STORAGE_KEYS = {
  ENROLLMENTS: "tech-stream-learn-enrollments",
  SUBSCRIPTION: "tech-stream-learn-subscription",
  ACCOUNTS: "tech-stream-learn-accounts",
  SESSION: "tech-stream-learn-session",
} as const;

const hasStorage = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const hashPassword = (password: string) => {
  const normalized = password.normalize("NFKC");
  return Array.from(normalized)
    .map((char) => char.codePointAt(0)?.toString(16).padStart(4, "0") ?? "")
    .join("");
};

const getStoredAccounts = (): Record<string, StoredAccount> => {
  if (!hasStorage()) return {};
  const raw = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? (parsed as Record<string, StoredAccount>) : {};
  } catch (error) {
    console.error("Failed to parse stored accounts", error);
    return {};
  }
};

const persistAccounts = (accounts: Record<string, StoredAccount>) => {
  if (!hasStorage()) return;
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
};

const getStoredSession = (): string | null => {
  if (!hasStorage()) return null;
  const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
  if (!raw) return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const persistSession = (email: string) => {
  if (!hasStorage()) return;
  localStorage.setItem(STORAGE_KEYS.SESSION, email);
};

const clearSession = () => {
  if (!hasStorage()) return;
  localStorage.removeItem(STORAGE_KEYS.SESSION);
};

const TRIAL_DURATION_DAYS = 30;
const MONTHLY_PRICE_KES = 2000;
const YEARLY_PRICE_KES = 20000;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getStoredEnrollments = (): Record<string, string[]> => {
  if (!hasStorage()) return {};
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
  if (!hasStorage()) return;
  localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(map));
};

const getSubscriptionKey = (email: string) => `${STORAGE_KEYS.SUBSCRIPTION}-${email}`;

const getStoredSubscription = (email: string): StoredSubscription | null => {
  if (!hasStorage()) return null;
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
  if (!hasStorage()) return;
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
  const yearlyPriceKes = YEARLY_PRICE_KES;

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
    const sessionEmail = getStoredSession();
    if (!sessionEmail) {
      setUser(null);
      setEnrollments([]);
      setSubscriptionStatus("free");
      setTrialEndsAt(null);
      setTrialDaysRemaining(null);
      return;
    }

    const accounts = getStoredAccounts();
    const account = accounts[sessionEmail];
    if (!account) {
      clearSession();
      setUser(null);
      setEnrollments([]);
      setSubscriptionStatus("free");
      setTrialEndsAt(null);
      setTrialDaysRemaining(null);
      return;
    }

    setUser({ email: account.email, fullName: account.fullName });
    const existing = getStoredEnrollments();
    setEnrollments(existing[account.email] ?? []);
    syncSubscription(account.email);
  }, [syncSubscription]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const existing = getStoredEnrollments();
    existing[user.email] = enrollments;
    persistEnrollments(existing);
  }, [enrollments, user]);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      if (!hasStorage()) {
        throw new Error("Authentication is unavailable in this environment.");
      }
      const normalizedEmail = normalizeEmail(email);
      if (!normalizedEmail) {
        throw new Error("Enter your email address.");
      }
      if (!password) {
        throw new Error("Enter your password.");
      }
      const accounts = getStoredAccounts();
      const account = accounts[normalizedEmail];
      if (!account) {
        throw new Error("No account found for that email.");
      }
      const hashed = hashPassword(password);
      if (account.passwordHash !== hashed) {
        throw new Error("Incorrect email or password.");
      }
      persistSession(normalizedEmail);
      setUser({ email: account.email, fullName: account.fullName });
      const enrollmentMap = getStoredEnrollments();
      setEnrollments(enrollmentMap[normalizedEmail] ?? []);
      const subscription = getStoredSubscription(normalizedEmail) ?? undefined;
      syncSubscription(normalizedEmail, subscription);
    },
    [syncSubscription],
  );

  const signup = useCallback(
    async ({ email, fullName, password }: { email: string; fullName: string; password: string }) => {
      if (!hasStorage()) {
        throw new Error("Authentication is unavailable in this environment.");
      }
      const normalizedEmail = normalizeEmail(email);
      if (!normalizedEmail) {
        throw new Error("Enter a valid email address.");
      }
      const normalizedName = fullName.trim();
      if (!normalizedName) {
        throw new Error("Enter your full name.");
      }
      if (password.trim().length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }
      const accounts = getStoredAccounts();
      if (accounts[normalizedEmail]) {
        throw new Error("An account with this email already exists.");
      }
      const hashed = hashPassword(password);
      const account: StoredAccount = {
        email: normalizedEmail,
        fullName: normalizedName,
        passwordHash: hashed,
        createdAt: new Date().toISOString(),
      };
      persistAccounts({ ...accounts, [normalizedEmail]: account });
      const enrollmentMap = getStoredEnrollments();
      enrollmentMap[normalizedEmail] = [];
      persistEnrollments(enrollmentMap);
      persistSession(normalizedEmail);
      setUser({ email: normalizedEmail, fullName: normalizedName });
      setEnrollments([]);
      const subscription = createTrialSubscription(new Date());
      persistSubscription(normalizedEmail, subscription);
      syncSubscription(normalizedEmail, subscription);
    },
    [syncSubscription],
  );

  const logout = useCallback(async () => {
    clearSession();
    setUser(null);
    setEnrollments([]);
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
          throw new Error(
            `Free plan limit reached. Subscribe for unlimited course access at KES ${MONTHLY_PRICE_KES}/month or KES ${YEARLY_PRICE_KES}/year once checkout opens.`,
          );
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
      yearlyPriceKes,
      maxFreeCourses,
      logout,
      login,
      signup,
      enrollCourse,
      requestSubscription,
    }),
    [
      user,
      enrollments,
      subscriptionStatus,
      trialEndsAt,
      trialDaysRemaining,
      monthlyPriceKes,
      yearlyPriceKes,
      maxFreeCourses,
      logout,
      login,
      signup,
      enrollCourse,
      requestSubscription,
    ],
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
