import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  currentUser: User | null;
  users: Record<string, User>;
  register: (
    name: string,
    email: string,
    password: string,
    extras: { dob: string; address: string; phone: string }
  ) => { user: User };
  login: (email: string, password: string) => { user: User };
  logout: () => void;
  updateProfile: (updates: Partial<Omit<User, 'id' | 'email' | 'password'>>) => { user: User };
}

const generateId = (): string => Math.random().toString(36).slice(2, 10);

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: {},
      register: (name, email, password, extras) => {
        if (/\d/.test(name)) {
          throw new Error('Name must not contain numbers');
        }
        if (extras?.phone && /\D/.test(extras.phone)) {
          throw new Error('Phone must contain digits only');
        }
        const existing = Object.values(get().users).find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (existing) {
          throw new Error('Email already registered');
        }
        const user: User = {
          id: generateId(),
          name,
          email,
          password,
          dob: extras.dob,
          address: extras.address,
          phone: extras.phone,
        };
        set((s) => ({ users: { ...s.users, [user.id]: user }, currentUser: user }));
        return { user };
      },
      login: (email, password) => {
        const user = Object.values(get().users).find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!user) {
          throw new Error('Invalid credentials');
        }
        set({ currentUser: user });
        return { user };
      },
      logout: () => set({ currentUser: null }),
      updateProfile: (updates) => {
        const current = get().currentUser;
        if (!current) {
          throw new Error('Not authenticated');
        }
        if (updates.name !== undefined && /\d/.test(updates.name)) {
          throw new Error('Name must not contain numbers');
        }
        if (updates.phone !== undefined && /\D/.test(updates.phone ?? '')) {
          throw new Error('Phone must contain digits only');
        }
        const next: User = {
          ...current,
          ...updates,
        } as User;
        set((s) => ({
          users: { ...s.users, [next.id]: next },
          currentUser: next,
        }));
        return { user: next };
      },
    }),
    {
      name: 'okimart-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currentUser: state.currentUser, users: state.users }),
    }
  )
);


