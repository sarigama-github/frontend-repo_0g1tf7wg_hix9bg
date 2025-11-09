import React, { useMemo, useState } from 'react';
import Hero from './components/Hero';
import RoomControls from './components/RoomControls';
import PlayerAndChat from './components/PlayerAndChat';
import HowItWorks from './components/HowItWorks';

// Utility to generate a friendly invite code like "STAR-1A2B"
function generateInviteCode() {
  const words = ['NOVA','ORBIT','COSMO','LUNA','PULSE','ASTRO','QUARK','NEBULA','COMET','METEOR'];
  const part = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${words[Math.floor(Math.random()*words.length)]}-${part}`;
}

export default function App() {
  const [room, setRoom] = useState('');
  const [videoSrc, setVideoSrc] = useState('');

  const handleCreateRoom = () => {
    const code = generateInviteCode();
    setRoom(code);
    // In a full implementation, this would call the backend to create a room and return an invite.
  };

  const handleJoinRoom = (code) => {
    if (!code) return;
    setRoom(code.trim().toUpperCase());
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
  };

  const onControl = (payload) => {
    // This is where we would emit socket events to sync play/pause and chat via the backend.
    console.log('control', payload);
  };

  return (
    <div className="min-h-screen w-full bg-[#0b0b12] font-['Inter',sans-serif] text-white">
      <Hero onGetStarted={handleCreateRoom} />
      <RoomControls onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} onUpload={handleUpload} />
      <PlayerAndChat room={room} videoSrc={videoSrc} onControl={onControl} />
      <HowItWorks />
      <footer className="border-t border-white/10 bg-[#0b0b12] px-6 py-10 text-center text-xs text-white/50">
        Built with a clean dark theme and subtle motion for a cozy watch-together vibe.
      </footer>
    </div>
  );
}
