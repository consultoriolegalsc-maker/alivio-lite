'use client';

import { useEffect, useState } from 'react';
import HomeScreen from './components/HomeScreen';
import TextMode from './components/TextMode';
import VoiceMode from './components/VoiceMode';
import Disclaimer from './components/Disclaimer';

type Mode = 'home' | 'text' | 'voice';

const DISCLAIMER_KEY = 'alivio_disclaimer_accepted_v1';

export default function Page() {
  const [mode, setMode] = useState<Mode>('home');
  const [disclaimerAccepted, setDisclaimerAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const accepted = typeof window !== 'undefined' && localStorage.getItem(DISCLAIMER_KEY);
    setDisclaimerAccepted(Boolean(accepted));
  }, []);

  if (disclaimerAccepted === null) {
    return null;
  }

  if (!disclaimerAccepted) {
    return (
      <Disclaimer
        onAccept={() => {
          localStorage.setItem(DISCLAIMER_KEY, new Date().toISOString());
          setDisclaimerAccepted(true);
        }}
      />
    );
  }

  return (
    <main className="min-h-[100dvh] flex flex-col">
      {mode === 'home' && (
        <HomeScreen
          onSelectText={() => setMode('text')}
          onSelectVoice={() => setMode('voice')}
        />
      )}
      {mode === 'text' && <TextMode onExit={() => setMode('home')} />}
      {mode === 'voice' && <VoiceMode onExit={() => setMode('home')} />}
    </main>
  );
}
