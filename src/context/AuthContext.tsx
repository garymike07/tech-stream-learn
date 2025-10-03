import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

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

interface AuthContextValue {
  user: AuthUser | null;
  enrollments: string[];
  signup: (payload: SignupPayload) => Promise<void>;
  login: (payload: AuthCredentials) => Promise<void>;
  logout: () => void;
  enrollCourse: (courseId: string) => void;
}

type StoredUser = {
  email: string;
  password: string;
  fullName: string;
};

const STORAGE_KEYS = {
  USERS: "tech-stream-learn-users",
  SESSION: "tech-stream-learn-session",
  ENROLLMENTS: "tech-stream-learn-enrollments",
} as const;

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [enrollments, setEnrollments] = useState<string[]>([]);

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
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const enrollCourse = useCallback(
    (courseId: string) => {
      if (!user) {
        throw new Error("You need to be signed in to enroll.");
      }

      setEnrollments((current) => (current.includes(courseId) ? current : [...current, courseId]));
    },
    [user],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      enrollments,
      signup,
      login,
      logout,
      enrollCourse,
    }),
    [user, enrollments, signup, login, logout, enrollCourse],
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
