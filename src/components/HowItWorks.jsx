import React from 'react';
import { Shield, Upload, Users, MessageSquare } from 'lucide-react';

export default function HowItWorks() {
  const items = [
    { icon: Users, title: 'Create or Join', desc: 'Start a private room or jump in with an invite code.' },
    { icon: Upload, title: 'Upload a Video', desc: 'Choose a file to watch together in perfect sync.' },
    { icon: MessageSquare, title: 'Chat in Real-time', desc: 'Stay connected with smooth, minimal chat.' },
    { icon: Shield, title: 'Private by Default', desc: 'Only people with your invite can get in.' },
  ];

  return (
    <section id="how-it-works" className="w-full bg-[#0e0e16] px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">How it works</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">A simple flow with powerful sync behind the scenes. Designed for comfort during long movie nights.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <Icon className="h-6 w-6 text-emerald-400" />
              <h3 className="mt-3 text-sm font-semibold">{title}</h3>
              <p className="mt-1 text-xs text-white/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
