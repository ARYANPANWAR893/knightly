'use client';

import ChessGame from '@/features/chess/components/ChessGame';
import { Analytics } from "@vercel/analytics/next"

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-transparent">
      <ChessGame />
      <Analytics />
    </main>
  );
}
