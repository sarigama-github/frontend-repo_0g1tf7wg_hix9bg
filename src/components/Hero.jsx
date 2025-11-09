import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-[#0b0b12] text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlays for depth (non-blocking for interaction) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,0,255,0.25),transparent_60%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-20 text-center md:pt-28">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Live watch parties up to 32 people
        </div>
        <h1 className="mt-6 bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
          Watch together in perfect sync
        </h1>
        <p className="mt-4 max-w-2xl text-base text-zinc-300 md:text-lg">
          Create a private room, share an invite code, upload a video, and chat while you watch. Clean, fast, and built for friends.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={onGetStarted} className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400">
            <Rocket className="h-4 w-4 transition group-hover:translate-x-0.5" />
            Get Started
          </button>
          <a href="#how-it-works" className="rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/5">How it works</a>
        </div>
      </div>
    </section>
  );
}
