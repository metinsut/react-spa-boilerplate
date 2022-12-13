export type Auth = {
  emailVerified?: boolean | null;
  email?: string | null;
  lastLoginAt?: string | null;
  provider?: string | null;
  providerUserId?: string | null;
  _id?: string | null;
  auth?: boolean | boolean;
};

export type AuthState = Auth & {
  setAuth: (auth: Auth | null) => void;
};
