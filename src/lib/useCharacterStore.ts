'use client';

import { create } from 'zustand';
import { CharacterFilters } from '@/types/character';

interface CharacterState {
  currentPage: number;
  filters: CharacterFilters;
  setPage: (page: number) => void;
  setFilters: (filters: CharacterFilters) => void;
  clearFilters: () => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  currentPage: 1,
  filters: {},
  setPage: (page: number) => set(() => ({ currentPage: page })),
  setFilters: (filters: CharacterFilters) => set(() => ({ filters, currentPage: 1 })),
  clearFilters: () => set(() => ({ filters: {}, currentPage: 1 })),
}));
