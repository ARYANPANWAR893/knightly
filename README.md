# Knightly ♟️

A modern chess learning platform with AI gameplay and coaching.

## Features

- Play vs AI
- Learning Mode
- Move-by-move coaching
- Suggested best moves
- Multiplayer demand voting
- Mobile responsive UI
- Product analytics (PostHog)

## Tech Stack

- Next.js 16
- React
- TypeScript
- TailwindCSS
- Stockfish (browser)
- Zustand
- PostHog Analytics
- Vercel Hosting

## Setup

Install dependencies:

pnpm install

Run locally:

pnpm dev

Open:

http://localhost:3000

## Environment Variables

Create:

.env.local

Add:

NEXT_PUBLIC_POSTHOG_KEY=your_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

## Deployment

Deploy using Vercel.

