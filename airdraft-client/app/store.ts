import { create } from "zustand";

export interface IUserInfo {
  userId: string;
  email: string;
  notes: any[]; // TODO Type this
  fullName: string;
}

export interface IGlobalStore {
  user: IUserInfo | null;
  setUser: (user: IUserInfo | null) => void;
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
  user: null,
  setUser: (user: IUserInfo | null) => set({ user }),
}));
