import { AuthState } from 'types/auth';
import { create } from 'zustand';

const useAuthStore = create<AuthState>((set) => ({
  _id: null,
  email: null,
  emailVerified: null,
  lastLoginAt: null,
  provider: null,
  providerUserId: null,
  setAuth: (auth) => set({ ...auth })
}));

export default useAuthStore;
