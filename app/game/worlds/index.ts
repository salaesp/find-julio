import { worldModule as parkModule } from "./moonWorld";
import { worldModule as beachModule } from "./beachWorld";
import { worldModule as farmModule } from "./farmWorld";
import { worldModule as iceModule } from "./icePoleWorld";
import { worldModule as jungleModule } from "./jungleWorld";
import { worldModule as aquaModule } from "./aquaparkWorld";
import { worldModule as pirateModule } from "./pirateShipWorld";
import { worldModule as marathonModule } from "./marathonWorld";
import { worldModule as schoolModule } from "./schoolWorld";
import { worldModule as giantModule } from "./giantDeskWorld";
import { worldModule as chessModule } from "./chessboardWorld";
import { worldModule as computerModule } from "./computerWorld";
import type { WorldModule } from "./types";

// Ordered registry. Adding a new world: append the module here and (optionally)
// add an entry in ./accents.ts. World ids are 1-based positions in this array.
export const WORLDS: readonly WorldModule[] = [
  parkModule,
  beachModule,
  farmModule,
  iceModule,
  jungleModule,
  aquaModule,
  pirateModule,
  marathonModule,
  schoolModule,
  giantModule,
  chessModule,
  computerModule,
];

export const WORLD_COUNT = WORLDS.length;

export function getWorld(world: number): WorldModule {
  const idx = Math.max(1, Math.min(WORLDS.length, world)) - 1;
  return WORLDS[idx];
}
