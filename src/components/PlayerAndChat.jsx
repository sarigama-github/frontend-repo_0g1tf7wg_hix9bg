import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Users } from 'lucide-react';

export default function PlayerAndChat({ room, videoSrc, onControl }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [participants, setParticipants] = useState(1);

  // Simulated sync hooks (to be wired to backend events later)
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    onControl?.({ type: next ? 'play' : 'pause', time: videoRef.current?.currentTime || 0 });
  };

  const toggleMute = () => setMuted((m) => !m);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = { id: Date.now(), user: 'You', text: input.trim(), ts: new Date().toLocaleTimeString() };
    setMessages((m) => [...m, msg]);
    setInput('');
    onControl?.({ type: 'chat', message: msg });
  };

  return (
    <section className="w-full bg-[#0b0b12] px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[2fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50">
          <div className="flex items-center justify-between border-b border-white/10 p-3 text-white/80">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-sm">Room {room || '—'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Users className="h-4 w-4" />
              {participants}/32
            </div>
          </div>
          <div className="aspect-video w-full bg-black">
            {videoSrc ? (
              <video ref={videoRef} src={videoSrc} className="h-full w-full" muted={muted} controls={false} />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-white/60">Upload a video to start</div>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-white/10 p-3 text-white">
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="rounded-md bg-white/10 p-2 hover:bg-white/15">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button onClick={toggleMute} className="rounded-md bg-white/10 p-2 hover:bg-white/15">
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
            <div className="text-xs text-white/60">Synced playback controls</div>
          </div>
        </div>

        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <div className="border-b border-white/10 p-3 text-sm font-semibold text-white/90">Chat</div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
            {messages.length === 0 && (
              <div className="text-white/50">No messages yet. Say hi! 🎬</div>
            )}
            {messages.map((m) => (
              <div key={m.id} className="flex items-start gap-2 text-white/90">
                <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <div>
                  <div className="text-xs text-white/50">{m.user} • {m.ts}</div>
                  <div>{m.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-2">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Message the party"
                className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-emerald-500/30 focus:ring"
              />
              <button onClick={sendMessage} className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400">Send</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
