type RedirectState = {
  from?: string | null;
  intended?: string | null;
};

export const DEFAULT_AUTH_REDIRECT = "/";

export const resolveRedirectTarget = (state: unknown, fallback: string = DEFAULT_AUTH_REDIRECT) => {
  if (!state || typeof state !== "object") {
    return fallback;
  }
  const snapshot = state as RedirectState;
  const candidates = [snapshot.intended, snapshot.from];
  const target = candidates.find((value) => typeof value === "string" && value.length > 0);
  return target ?? fallback;
};
