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

export function getWorld(world: number): WorldModule {
  if (world >= 12) return computerModule;
  if (world === 11) return chessModule;
  if (world === 10) return giantModule;
  if (world === 9) return schoolModule;
  if (world === 8) return marathonModule;
  if (world === 7) return pirateModule;
  if (world === 6) return aquaModule;
  if (world === 5) return jungleModule;
  if (world === 4) return iceModule;
  if (world === 3) return farmModule;
  if (world === 2) return beachModule;
  return parkModule;
}
