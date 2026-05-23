import { PX, SPRITE_SCALE, type Ctx, pellipse } from "../utils/primitives";
import { drawSprite, currentFrame, type Frame, type SpriteSheet } from "../utils/sprite";

// ── Palette ───────────────────────────────────────────────────────────────────
// O = #181818 (outline)   G = dino green mid   g = dino dark green
// L = dino highlight      B = belly light       S = skin
// H = hair dark           r = blush             . = transparent
const JULIO_PALETTE = {
  ".": null,
  "O": "#181818",
  "G": "#38b838",
  "g": "#1e7a1e",
  "L": "#78e858",
  "B": "#a8e888",
  "S": "#f8c878",
  "H": "#5a2c10",
  "r": "#e87890",
};

// 16×16 front-facing overworld sprite. cy = vertical center (row 8).
// Dino hood covers top half; face visible inside mouth opening; belly + dino feet.
const JULIO_IDLE: Frame = {
  width: 16, height: 16,
  pixels: [
    ".......O........",  //  0: single center spike tip
    "......OgO.......",  //  1: spike
    ".....OgGgO......",  //  2: spike base
    "....OGGGGGGО....",  //  3: hood top (8 wide)
    "....OGgHHgGО....",  //  4: hair in hood mouth opening
    "....OGgSSSgGО...",  //  5: face skin
    "....OGgSOSgGО...",  //  6: eyes (O = dark)
    "....OGgSrSgGО...",  //  7: blush
    "....OGGGGGGО....",  //  8: hood chin
    "...OGGGGGGGGО...",  //  9: costume body (10 wide)
    "...OGGgBBBgGGО..",  // 10: belly patch (B = belly light)
    "...OGGGBBBGGGО..",  // 11: belly lower
    "....OGGgGGGО....",  // 12: hips
    "....OGG..GGО....",  // 13: legs
    "....OGG..GGО....",  // 14: dino feet
    "................",  // 15: bottom padding
  ],
};

const JULIO_WALK1: Frame = {
  width: 16, height: 16,
  pixels: [
    ".......O........",
    "......OgO.......",
    ".....OgGgO......",
    "....OGGGGGGО....",
    "....OGgHHgGО....",
    "....OGgSSSgGО...",
    "....OGgSOSgGО...",
    "....OGgSrSgGО...",
    "....OGGGGGGО....",
    "...OGGGGGGGGО...",
    "...OGGgBBBgGGО..",
    "...OGGGBBBGGGО..",
    "....OGGgGGGО....",
    "....OGG..GGО....",
    "....OGG..GgО....",  // 14: right leg slightly forward
    ".........OGO....",  // 15: right foot extended
  ],
};

const JULIO_WALK2: Frame = {
  width: 16, height: 16,
  pixels: [
    ".......O........",
    "......OgO.......",
    ".....OgGgO......",
    "....OGGGGGGО....",
    "....OGgHHgGО....",
    "....OGgSSSgGО...",
    "....OGgSOSgGО...",
    "....OGgSrSgGО...",
    "....OGGGGGGО....",
    "...OGGGGGGGGО...",
    "...OGGgBBBgGGО..",
    "...OGGGBBBGGGО..",
    "....OGGgGGGО....",
    "....OGG..GGО....",
    "....OgG..GGО....",  // 14: left leg forward
    "....OGO.........",  // 15: left foot extended
  ],
};

const JULIO: SpriteSheet = {
  front: { idle: JULIO_IDLE, walk: [JULIO_WALK1, JULIO_WALK2] },
};

export function drawJulio(ctx: Ctx, cx: number, cy: number, time = 0): void {
  const gcx = cx / PX;
  const gcy = cy / PX;
  pellipse(ctx, gcx, gcy + 6, 6, 1.5, "#282828");
  const frame = currentFrame(JULIO.front, false, time);
  drawSprite(ctx, frame, JULIO_PALETTE, cx, cy, PX);
}

// ── Found overlay (large, procedural — bigPx is dynamic scale) ───────────────
export function drawJulioFound(ctx: Ctx, cx: number, cy: number, bigPx: number, withSign = true): void {
  const set = (gx: number, gy: number, c: string) => {
    ctx.fillStyle = c;
    ctx.fillRect(cx + Math.round(gx) * bigPx, cy + Math.round(gy) * bigPx, bigPx, bigPx);
  };
  const rect = (gx: number, gy: number, gw: number, gh: number, c: string) => {
    ctx.fillStyle = c;
    ctx.fillRect(cx + Math.round(gx) * bigPx, cy + Math.round(gy) * bigPx, Math.round(gw) * bigPx, Math.round(gh) * bigPx);
  };

  const outline = "#000000";
  const g = "#55b639";
  const gd = "#3d8825";
  const gl = "#81df54";
  const belly = "#96df71";
  const skin = "#f9b282";
  const hair = "#643c28";
  const blush = "#f0758a";
  const eye = "#000000";
  const tooth = "#ffffff";
  const signBg = "#ffffff";
  const heart = "#bd407a";

  rect(-5, 14, 11, 1, "rgba(0,0,0,0.3)");
  rect(-8, 10, 3, 2, gd);
  rect(-9, 11, 3, 1, outline);
  rect(-6, 12, 2, 1, outline);
  rect(-5, 11, 3, 3, gd);
  rect(-5, 14, 4, 1, outline);
  rect(2, 11, 3, 3, g);
  rect(2, 11, 1, 3, gd);
  rect(1, 14, 4, 1, outline);
  rect(-4, 3, 9, 8, g);
  rect(-4, 3, 1, 8, gd);
  rect(-5, 3, 1, 7, outline);
  rect(5, 3, 1, 7, outline);
  rect(-2, 5, 5, 5, belly);
  set(-1, 5, outline); set(-1, 7, outline); set(-1, 9, outline);
  rect(-7, 2, 3, 2, g);
  rect(-7, 2, 3, 1, gl);
  rect(-8, 1, 1, 3, outline);
  rect(5, 2, 3, 2, g);
  rect(5, 2, 3, 1, gl);
  rect(8, 1, 1, 3, outline);
  rect(-6, -11, 13, 13, g);
  rect(-6, -11, 13, 1, gl);
  rect(-6, -10, 1, 11, gl);
  rect(6, -10, 1, 12, gd);
  rect(-5, -12, 11, 1, outline);
  rect(-7, -11, 1, 12, outline);
  rect(7, -11, 1, 12, outline);
  rect(-4, -14, 2, 2, gd); rect(-4, -14, 2, 1, outline);
  rect(1, -14, 2, 2, gd); rect(1, -14, 2, 1, outline);
  rect(-4, -8, 9, 1, outline);
  set(-3, -7, tooth); set(0, -7, tooth); set(3, -7, tooth);
  rect(-4, -7, 9, 7, skin);
  rect(-4, -7, 9, 2, hair);
  set(-4, -5, hair); set(4, -5, hair);
  set(-2, -4, eye); set(2, -4, eye);
  set(-3, -3, blush); set(3, -3, blush);
  rect(-1, -2, 3, 1, outline);
  set(0, -1, tooth);

  if (withSign) {
    const bx = 6, by = -6;
    rect(bx + 2, by + 1, 7, 5, signBg);
    rect(bx + 2, by, 7, 1, outline);
    rect(bx + 2, by + 6, 7, 1, outline);
    rect(bx + 1, by + 1, 1, 5, outline);
    rect(bx + 9, by + 1, 1, 5, outline);
    set(bx, by + 5, outline);
    set(bx + 1, by + 5, signBg);
    set(bx + 4, by + 2, heart); set(bx + 6, by + 2, heart);
    rect(bx + 3, by + 3, 5, 1, heart);
    rect(bx + 4, by + 4, 3, 1, heart);
    set(bx + 5, by + 5, heart);
  }
}


export function drawHeartSign(ctx: Ctx, cx: number, cy: number, _t: number): void {
  const s = SPRITE_SCALE;
  const yo = -8 * s;
  ctx.fillStyle = "#000";
  ctx.fillRect(cx - 5 * s, cy - 5 * s + yo, 10 * s, 8 * s);
  ctx.fillStyle = "#fff";
  ctx.fillRect(cx - 4 * s, cy - 4 * s + yo, 8 * s, 6 * s);
  ctx.fillStyle = "#e25aa0";
  const hx = cx;
  const hy = cy - 1.5 * s + yo;
  ctx.fillRect(hx - 3 * s, hy - 1 * s, 2 * s, 2 * s);
  ctx.fillRect(hx + 1 * s, hy - 1 * s, 2 * s, 2 * s);
  ctx.fillRect(hx - 3 * s, hy, 6 * s, 2 * s);
  ctx.fillRect(hx - 2 * s, hy + 2 * s, 4 * s, 1 * s);
  ctx.fillRect(hx - 1 * s, hy + 3 * s, 2 * s, 1 * s);
}
