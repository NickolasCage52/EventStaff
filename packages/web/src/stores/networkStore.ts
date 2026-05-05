import { create } from 'zustand';

interface NetworkState {
  hasError: boolean;
  setError: (v: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  hasError: false,
  setError: (v) => set({ hasError: v }),
}));
