import { create } from 'zustand';

export const useCursorStore = create((set) => ({
  variant: 'default',
  label: '',
  setVariant: (variant) => set({ variant }),
  setLabel: (label) => set({ label }),
  setCursor: (variant, label = '') => set({ variant, label }),
  reset: () => set({ variant: 'default', label: '' }),
}));
