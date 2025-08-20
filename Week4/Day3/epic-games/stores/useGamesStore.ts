import { create } from 'zustand'
import gamesData from '@/data/games.json'

export type HeroMainItem = {
  src: string
  description: string
}

export type HeroSecondaryItem = {
  src: string
  title: string
}

export type SaleItem = {
  src: string
  title?: string
  oldPrice?: number
  price?: number
  discountPrice?: number
  discount?: string
}

export type FeaturedItem = {
  src: string
  title?: string
  description?: string
  price?: number
}

export type FreeGameItem = {
  src: string
  title?: string
  freePeriod?: string
}

export type CatalogItem = {
  src: string
}

type State = {
  heroMain: HeroMainItem[]
  heroSecondary: HeroSecondaryItem[]
  sale: SaleItem[]
  featured: FeaturedItem[]
  freeGames: FreeGameItem[]
  catalog: CatalogItem[]

  // setters
  setHeroMain: (v: HeroMainItem[]) => void
  setHeroSecondary: (v: HeroSecondaryItem[]) => void
  setSale: (v: SaleItem[]) => void
  setFeatured: (v: FeaturedItem[]) => void
  setFreeGames: (v: FreeGameItem[]) => void
  setCatalog: (v: CatalogItem[]) => void

  // optional runtime fetch (if you move JSON to public/)
  fetchFromPublic?: (path?: string) => Promise<void>
}

export const useGamesStore = create<State>((set) => ({
  // initialize from static data
  heroMain: (gamesData['hero-main'] as HeroMainItem[]) ?? [],
  heroSecondary: (gamesData['hero-secondary'] as HeroSecondaryItem[]) ?? [],
  sale: (gamesData['sale'] as SaleItem[]) ?? [],
  featured: (gamesData['featured'] as FeaturedItem[]) ?? [],
  freeGames: (gamesData['freeGames'] as FreeGameItem[]) ?? [],
  catalog: (gamesData['catalog'] as CatalogItem[]) ?? [],

  // setters
  setHeroMain: (v) => set({ heroMain: v }),
  setHeroSecondary: (v) => set({ heroSecondary: v }),
  setSale: (v) => set({ sale: v }),
  setFeatured: (v) => set({ featured: v }),
  setFreeGames: (v) => set({ freeGames: v }),
  setCatalog: (v) => set({ catalog: v }),

  // runtime fetch helper (optional)
  fetchFromPublic: async (path = '/data/games.json') => {
    try {
      const res = await fetch(path)
      if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`)
      const json = await res.json()
      set({
        heroMain: json['hero-main'] ?? [],
        heroSecondary: json['hero-secondary'] ?? [],
        sale: json['sale'] ?? [],
        featured: json['featured'] ?? [],
        freeGames: json['freeGames'] ?? [],
        catalog: json['catalog'] ?? [],
      })
    } catch (err) {
      // swallow for now — consumer can add error handling if needed
      // console.error(err)
    }
  }
}))

export default useGamesStore
