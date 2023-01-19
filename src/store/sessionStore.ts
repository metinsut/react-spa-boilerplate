import { SessionState } from 'types/session';
import { create } from 'zustand';

const useSessionStore = create<SessionState>((set) => ({
  userId: null,
  token: null,
  creationDtm: null,
  accessGroupKeys: [],
  userAgent: null,
  setSession: (session) => set({ ...session })
}));

export default useSessionStore;
