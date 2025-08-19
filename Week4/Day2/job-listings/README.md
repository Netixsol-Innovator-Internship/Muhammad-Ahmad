# Week 4 - Day 2

## Job Listings — Next.js + Tailwind + Zustand

A small, responsive job-listings UI built with Next.js (app router), Tailwind CSS, and Zustand for client-side state. It loads job data from a local JSON file and lets users filter jobs by role, level, languages, and tools.

## Project summary

This repository contains a single-page job listings UI inspired by common frontend challenge designs. It demonstrates:

- A Next.js 13+ app using the app directory.
- Tailwind CSS utility classes for layout and styling.
- Zustand for compact client-side state management (active filters).
- A data-driven list of job cards loaded from `public/data.json`.
- Accessible controls: filter chips, clear button, and keyboard-friendly buttons.

## How it works (implementation details)

- Data source: `public/data.json` contains an array of job objects. The app fetches this file from the client using `fetch('/data.json')` in `app/page.tsx`.

- State management: `store/filterStore.ts` exposes a small Zustand store with `activeFilters`, `addFilter`, `removeFilter`, and `clearAllFilters` functions. Components import `useFilterStore` to read or update filters.

- Components:
  - `components/Header.tsx` — decorative header (background image + color).
  - `components/FilterBar.tsx` — visible only when filters are active; shows current filters with remove buttons and a Clear action.
  - `components/JobCard.tsx` — renders job details (company, position, badges) and clickable filter chips (role, level, languages, tools).

- Filtering logic: `app/page.tsx` keeps the fetched jobs in local state and computes `filteredJobs` with `useMemo`. A job is shown only when it matches all active filters (logical AND across selected tags).

## Live Preview:
**Preview**: [ahmad-week4-day2-job-listing.vercel.app](https://ahmad-week4-day2-job-listing.vercel.app)
