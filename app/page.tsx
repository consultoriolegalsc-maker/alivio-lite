"use client";

import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import VoiceMode from "./components/VoiceMode";
import TextMode from "./components/TextMode";
import Disclaimer from "./components/Disclaimer";

type Mode = "home" | "voice" | "text";

export default function Page() {
  const [mode, setMode] = useState<Mode>("home");

  return (
    <>
      <Disclaimer />
      {mode === "home" && <HomeScreen onNavigate={setMode} />}
      {mode === "voice" && <VoiceMode onBack={() => setMode("home")} />}
      {mode === "text" && <TextMode onBack={() => setMode("home")} />}
    </>
  );
}
