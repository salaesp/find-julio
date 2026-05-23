"use client";
import { useState } from "react";
import GameCanvas from "./game/GameCanvas";
import WelcomeScreen from "./game/WelcomeScreen";

export default function Page() {
  const [started, setStarted] = useState(false);
  const [startWorld, setStartWorld] = useState<number | undefined>(undefined);
  return started
    ? <GameCanvas startWorld={startWorld} />
    : <WelcomeScreen onStart={(w) => { setStartWorld(w); setStarted(true); }} />;
}
