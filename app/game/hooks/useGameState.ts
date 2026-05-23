"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getWorld } from "../worlds";
import type { Placement, WorldModule } from "../worlds/types";

export type Phase = "searching" | "found_anim" | "world_complete";

export type GameState = {
  world: number;       // actual world id (1..12) — theme
  step: number;        // 0-indexed position in the random sequence
  total: number;       // total worlds in sequence
  worldModule: WorldModule;
  finds: number;
  wrongClicks: number;
  phase: Phase;
  seed: number;
  scene: unknown;
  placement: Placement;
  nextPlacement: Placement;
  attemptIndex: number;
};

const INITIAL_SEED = 0xC0FFEE;
const TOTAL_WORLDS = 12;

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useGameState() {
  // Random permutation of world ids — generated once per session
  const [sequence, setSequence] = useState<number[]>(() => {
    const ids = Array.from({ length: TOTAL_WORLDS }, (_, i) => i + 1);
    return shuffle(ids, Math.random);
  });
  const [step, setStep] = useState(0);
  const [finds, setFinds] = useState(0);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [phase, setPhase] = useState<Phase>("searching");
  const [attemptIndex, setAttemptIndex] = useState(0);

  const world = sequence[step] ?? 1;
  const worldModule = useMemo(() => getWorld(world), [world]);
  const scene = useMemo(() => worldModule.buildScene(), [worldModule]);
  const seed = useMemo(() => INITIAL_SEED + world * 1000 + attemptIndex * 31, [world, attemptIndex]);
  const nextSeed = useMemo(() => INITIAL_SEED + world * 1000 + (attemptIndex + 1) * 31, [world, attemptIndex]);
  const placement = useMemo(() => worldModule.placeCharacters(seed, scene), [worldModule, seed, scene]);
  const nextPlacement = useMemo(() => worldModule.placeCharacters(nextSeed, scene), [worldModule, nextSeed, scene]);

  // Reset attempt index when world changes so seed lines up
  useEffect(() => {
    setAttemptIndex(0);
  }, [world]);

  const registerWrong = useCallback(() => {
    setWrongClicks((w) => {
      const next = w + 1;
      if (next >= 5) {
        setPhase("found_anim");
        setTimeout(() => {
          setWrongClicks(0);
          setAttemptIndex((i) => i + 1);
          setPhase("searching");
        }, 1500);
      }
      return next;
    });
  }, []);

  const registerFind = useCallback(() => {
    setPhase("found_anim");
    setTimeout(() => {
      setFinds((f) => {
        const next = f + 1;
        if (next >= 3) {
          setPhase("world_complete");
          return next;
        }
        setWrongClicks(0);
        setAttemptIndex((i) => i + 1);
        setPhase("searching");
        return next;
      });
    }, 1500);
  }, []);

  const nextWorld = useCallback(() => {
    setStep((s) => {
      const next = s + 1;
      if (next >= TOTAL_WORLDS) {
        // All worlds completed → reshuffle and start over
        setSequence(shuffle(Array.from({ length: TOTAL_WORLDS }, (_, i) => i + 1), Math.random));
        return 0;
      }
      return next;
    });
    setFinds(0);
    setWrongClicks(0);
    setAttemptIndex(0);
    setPhase("searching");
  }, []);

  const resetWorld = useCallback(() => {
    setFinds(0);
    setWrongClicks(0);
    setAttemptIndex(0);
    setPhase("searching");
  }, []);

  const state: GameState = {
    world, step, total: TOTAL_WORLDS, worldModule, finds, wrongClicks, phase, seed,
    scene, placement, nextPlacement, attemptIndex,
  };
  return { state, registerWrong, registerFind, nextWorld, resetWorld };
}
