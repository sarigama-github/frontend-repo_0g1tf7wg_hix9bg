import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Rocket } from 'lucide-react';

// Lazy-load Spline to avoid upfront cost
const Spline = lazy(() => import('@splinetool/react-spline'));

function useInViewport(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      // If IO not supported, render immediately
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

export default function Hero({ onGetStarted }) {
  const { ref, inView } = useInViewport({ rootMargin: '200px' });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReducedMotion(!!mql.matches);
    set();
    if (mql.addEventListener) mql.addEventListener('change', set);
    else mql.addListener(set);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', set);
      else mql.removeListener(set);
    };
  }, []);

  const showSpline = inView && !reducedMotion;

  return (
    <section ref={ref} className="relative min-h-[70vh] w-full overflow-hidden bg-[#0b0b12] text-white">
      <div className="absolute inset-0">
        {showSpline ? (
          <Suspense fallback={<div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(120,0,255,0.25),transparent_60%)]" />}> 
            <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </Suspense>
        ) : (
          // Lightweight fallback to avoid animation cost offscreen or for reduced-motion
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(120,0,255,0.20),transparent_60%)]" />
        )}
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
