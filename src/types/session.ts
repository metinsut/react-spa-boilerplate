export type Session = {
  userId?: string | null;
  token?: string | null;
  creationDtm?: string | null;
  accessGroupKeys?: string[];
  userAgent?: object | null;
};

export type SessionState = Session & {
  setSession: (auth: Session | null) => void;
};
