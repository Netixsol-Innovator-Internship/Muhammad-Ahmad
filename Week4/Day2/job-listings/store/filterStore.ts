import { create } from 'zustand'

interface FilterState {
  activeFilters: string[]
  addFilter: (filter: string) => void
  removeFilter: (filter: string) => void
  clearAllFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  activeFilters: [],
  
  addFilter: (filter: string) =>
    set((state) => ({
      activeFilters: state.activeFilters.includes(filter)
        ? state.activeFilters
        : [...state.activeFilters, filter]
    })),
  
  removeFilter: (filter: string) =>
    set((state) => ({
      activeFilters: state.activeFilters.filter((f) => f !== filter)
    })),
  
  clearAllFilters: () =>
    set({ activeFilters: [] })
}))
