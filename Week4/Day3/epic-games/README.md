# Week 4 - Day 3

## Project Summary

This project is a modern, responsive web application inspired by the Epic Games Store. It showcases dynamic game listings, sales, featured games, top sellers, and more, using Next.js, React, TypeScript, Zustand, Swiper.js, and Tailwind CSS. The UI is designed to be visually appealing and highly interactive, with smooth carousels and responsive layouts for all screen sizes.

## Features

- **Dynamic Game Data:** All game data is managed in a central JSON file (`data/games.json`) and loaded into a Zustand store for easy access and updates across the app.
- **Responsive Carousels:** Swiper.js powers the Games On Sale slider, with breakpoints for different screen sizes and centering logic for fewer cards.
- **Top Games Section:** Hardcoded arrays for Top Sellers, Best Sellers, and Top Upcoming games, with images mapped to actual files in `public/images`.
- **Featured & Free Games:** Dynamic rendering of featured and free games from the store.
- **Navigation & Footer:** Custom navigation bar and footer with interactive links and social icons.
- **Cursor Pointer:** All clickable elements (buttons, links, cards) use the `cursor-pointer` class for clear interactivity.
- **TypeScript & Tailwind:** Strong typing and utility-first styling for maintainable, scalable code.

## Implementation Details

- **Tech Stack:**
  - Next.js (App Router)
  - React & TypeScript
  - Zustand (state management)
  - Swiper.js (carousels)
  - Tailwind CSS (styling)

## Live Preview:
**Preview:** [ahmad-week4-day3-epic-games.vercel.app](https://ahmad-week4-day3-epic-games.vercel.app)
