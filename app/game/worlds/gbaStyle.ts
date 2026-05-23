// Shared GBA-style palette + helpers (Pokémon Ruby/Sapphire/Emerald inspired).
// Used by worlds to render grass, paths, water, etc. with a consistent look.

export const GBA = {
  // Grass tones — bright, saturated, lime-leaning (Hoenn/Kanto outdoors).
  grassBase: "#6dc25a",
  grassMid: "#58a548",
  grassDark: "#3f8035",
  grassLight: "#92dc7a",
  grassTuft: "#3a7a32",
  // Foliage / trees
  leafBase: "#3aa843",
  leafDark: "#1f6a2a",
  leafLight: "#6fd06a",
  leafHigh: "#a8e878",
  trunk: "#5a3a1e",
  trunkLight: "#7a4a2a",
  // Earth / paths
  pathBase: "#e3cfa1",
  pathEdge: "#b39866",
  pathSpec: "#c9b27a",
  pathSpecHi: "#f1dfb6",
  // Outline used across most sprites in GBA games — not pure black,
  // closer to a deep brown-black with a green tint.
  outline: "#1a1a1a",
  // Flower palette (small "rose bush" reds + accent yellow/white)
  rose: "#e23a4a",
  roseDark: "#a82838",
  roseLight: "#ff7a6a",
  flowerYellow: "#f4d24a",
  flowerWhite: "#ffffff",
  flowerPink: "#f48ab2",
} as const;

/**
 * Paint a GBA-style grass background: bright base, scattered tufts (2-pixel
 * darker clusters), occasional light highlights, and rare flower specks.
 * Deterministic — same input always renders the same texture.
 */
export function drawGbaGrass(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  opts?: { base?: string; mid?: string; dark?: string; light?: string; tuft?: string; density?: number },
) {
  const base = opts?.base ?? GBA.grassBase;
  const mid = opts?.mid ?? GBA.grassMid;
  const dark = opts?.dark ?? GBA.grassDark;
  const light = opts?.light ?? GBA.grassLight;
  const tuft = opts?.tuft ?? GBA.grassTuft;
  const density = opts?.density ?? 1;

  // Base
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  // Subtle horizontal banding — every 4 px row a slightly different green.
  // Gives the GBA "field" tile vibe without overcomplicating things.
  ctx.fillStyle = mid;
  for (let y = 2; y < h; y += 8) {
    for (let x = 0; x < w; x += 24) {
      if (((x * 17 + y * 13) & 3) === 0) ctx.fillRect(x, y, 6, 1);
    }
  }

  // Grass "v-tufts" — three pixels arranged in a small V/triangle that
  // reads as a single blade cluster from a distance. This is the iconic
  // Hoenn route texture.
  const stepT = Math.max(10, Math.floor(14 / density));
  for (let y = 4; y < h; y += stepT) {
    for (let x = 4; x < w; x += stepT) {
      const k = (x * 31 + y * 17) >>> 0;
      if ((k & 3) === 0) {
        ctx.fillStyle = tuft;
        // V shape
        ctx.fillRect(x, y, 1, 2);
        ctx.fillRect(x + 2, y, 1, 2);
        ctx.fillRect(x + 1, y + 2, 1, 1);
        ctx.fillStyle = dark;
        // base shadow pixel
        ctx.fillRect(x + 1, y + 3, 1, 1);
      } else if ((k & 7) === 4) {
        // single short blade
        ctx.fillStyle = tuft;
        ctx.fillRect(x, y, 1, 1);
        ctx.fillRect(x + 1, y + 1, 1, 1);
      }
    }
  }

  // Light tufts — bright blade highlights to catch sun.
  const stepL = Math.max(18, Math.floor(22 / density));
  for (let y = 9; y < h; y += stepL) {
    for (let x = 11; x < w; x += stepL) {
      const k = (x * 13 + y * 23) >>> 0;
      if ((k & 7) === 0) {
        ctx.fillStyle = light;
        ctx.fillRect(x, y, 1, 1);
        ctx.fillRect(x + 1, y - 1, 1, 1);
        ctx.fillRect(x + 2, y, 1, 1);
      }
    }
  }
}

/** Scatter tiny red "wild flower" dots over a grass area — matches the
 *  patches of red flowers you see on most Pokémon GBA outdoor maps. */
export function drawGbaWildFlowers(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  density: number = 1,
) {
  const step = Math.max(28, Math.floor(36 / density));
  for (let y = 14; y < h; y += step) {
    for (let x = 18; x < w; x += step) {
      const k = (x * 41 + y * 19) >>> 0;
      if ((k & 7) !== 0) continue;
      // alternate red and yellow patches
      const useYellow = (k & 8) === 0;
      const petal = useYellow ? "#f4d24a" : "#e23a4a";
      const dark = useYellow ? "#b8902a" : "#a82838";
      // 3-petal cluster
      ctx.fillStyle = petal;
      ctx.fillRect(x, y, 1, 1);
      ctx.fillRect(x - 1, y + 1, 1, 1);
      ctx.fillRect(x + 1, y + 1, 1, 1);
      ctx.fillStyle = dark;
      ctx.fillRect(x, y + 1, 1, 1);
    }
  }
}

/** Small "tall grass" patch (Pokémon route grass) — a darker green
 *  triangular tuft used as a wild-encounter tile motif. */
export function drawGbaTallGrassPatch(
  ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number,
) {
  // Base patch — slightly darker than surrounding grass
  ctx.fillStyle = GBA.grassMid;
  ctx.fillRect(x, y, w, h);
  // Pixel "blades" along top edge
  ctx.fillStyle = GBA.grassDark;
  for (let xx = x + 2; xx < x + w - 1; xx += 4) {
    ctx.fillRect(xx, y - 2, 1, 3);
    ctx.fillRect(xx - 1, y, 3, 1);
  }
  ctx.fillStyle = GBA.grassLight;
  for (let xx = x + 4; xx < x + w - 1; xx += 4) {
    ctx.fillRect(xx, y, 1, 1);
  }
}
