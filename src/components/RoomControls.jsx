import React, { useState } from 'react';
import { Link2, KeyRound, Users, Upload } from 'lucide-react';

export default function RoomControls({ onCreateRoom, onJoinRoom, onUpload }) {
  const [inviteCode, setInviteCode] = useState('');

  return (
    <section className="w-full bg-[#0e0e16] px-6 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Users className="h-5 w-5 text-emerald-400" />
            Create a Room
          </h3>
          <p className="mt-2 text-sm text-white/70">Spin up a new watch party and share the invite code.</p>
          <button onClick={onCreateRoom} className="mt-4 w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400">Create room</button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <KeyRound className="h-5 w-5 text-indigo-400" />
            Join with Code
          </h3>
          <p className="mt-2 text-sm text-white/70">Enter an invite code to join your friends instantly.</p>
          <div className="mt-4 flex gap-2">
            <input
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="e.g. MOON-8FQ2"
              className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none ring-emerald-500/30 focus:ring"
            />
            <button onClick={() => onJoinRoom(inviteCode)} className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400">
              Join
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Upload className="h-5 w-5 text-pink-400" />
            Upload a Video
          </h3>
          <p className="mt-2 text-sm text-white/70">Choose a file to watch together in your room.</p>
          <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
            <input type="file" accept="video/*" className="hidden" onChange={onUpload} />
            <Link2 className="h-4 w-4" /> Select file
          </label>
        </div>
      </div>
    </section>
  );
}
