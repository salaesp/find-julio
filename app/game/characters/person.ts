import { PX, type Ctx, pellipse } from "../utils/primitives";
import { drawSprite, currentFrame, type Palette, type Frame, type SpriteSheet } from "../utils/sprite";

// ── Variant color tables ──────────────────────────────────────────────────────
const HAIR_COLORS  = ["#1a0e06","#5a3418","#9a5a28","#c89848","#2e2e2e","#a83020"];
const SHIRT_COLORS = ["#c83028","#2858a8","#f0c030","#289838","#682898","#d86018","#b83880","#187898","#786028","#383848","#c8c8b8","#181818"];
const SKIN_COLORS  = ["#f8c878","#e8a858","#b87840","#f8e0b0"];
const PANTS_COLORS = ["#1a2848","#282828","#483018","#101828","#383838","#483018"];

// ── Palette keys ──────────────────────────────────────────────────────────────
// O = outline (#181818)   H = hair   S = skin   T = shirt   P = pants
// r = blush (#e87890)     . = transparent
//
// Sprite is 16×16. cy = vertical center of sprite (row 8).
// Feet are at row 14 → cy + 6*scale canvas px below center.

const IDLE: Frame = {
  width: 16, height: 16,
  pixels: [
    "................",  //  0: top padding
    "....OOOOOOOO....",  //  1: hair outline
    "....OHHHHHHО....",  //  2: hair
    "....OHHSSHHО....",  //  3: hair + skin
    "....OSSSSSSО....",  //  4: forehead
    "....OSBSSBSО....",  //  5: eyes (B = O key = dark)
    "....OrSSSSrО....",  //  6: blush cheeks
    "....OSSBBSSО....",  //  7: mouth
    "....OOOOOOOO....",  //  8: chin
    "...OTTTTTTTTTО..",  //  9: shirt (arms wider than head)
    "...OTSTTTTTsTО..",  // 10: shirt + arm-skin nubs
    "...OTTTTTTTTTО..",  // 11: shirt bottom
    "....OPPPPPPО....",  // 12: pants
    "....OPP..PPО....",  // 13: pants legs
    "....OOO..OOO....",  // 14: shoes
    "................",  // 15: bottom padding
  ],
};

// Walk frames differ only in rows 12–15: one leg forward (shoe drops to row 15).
const WALK1: Frame = {
  width: 16, height: 16,
  pixels: [
    "................",
    "....OOOOOOOO....",
    "....OHHHHHHО....",
    "....OHHSSHHО....",
    "....OSSSSSSО....",
    "....OSBSSBSО....",
    "....OrSSSSrО....",
    "....OSSBBSSО....",
    "....OOOOOOOO....",
    "...OTTTTTTTTTО..",
    "...OTSTTTTTsTО..",
    "...OTTTTTTTTTО..",
    "....OPPPPPPО....",
    "....OPP..PPО....",  // 13: same
    "....OOO..PPО....",  // 14: left shoe, right still in pants (right leg forward)
    ".........OOO....",  // 15: right shoe extended forward
  ],
};

const WALK2: Frame = {
  width: 16, height: 16,
  pixels: [
    "................",
    "....OOOOOOOO....",
    "....OHHHHHHО....",
    "....OHHSSHHО....",
    "....OSSSSSSО....",
    "....OSBSSBSО....",
    "....OrSSSSrО....",
    "....OSSBBSSО....",
    "....OOOOOOOO....",
    "...OTTTTTTTTTО..",
    "...OTSTTTTTsTО..",
    "...OTTTTTTTTTО..",
    "....OPPPPPPО....",
    "....OPP..PPО....",
    "....PPO..OOO....",  // 14: left still in pants (left leg forward), right shoe
    "....OOO........."   // 15: left shoe extended forward
  ],
};

const PERSON: SpriteSheet = {
  front: { idle: IDLE, walk: [WALK1, WALK2] },
};

function makePalette(hair: string, skin: string, shirt: string, pants: string): Palette {
  return {
    "O": "#181818",
    "H": hair,
    "S": skin,
    "T": shirt,
    "P": pants,
    "r": "#e87890",
  };
}

export function drawPerson(ctx: Ctx, cx: number, cy: number, variant: number, time = 0): void {
  const gcx = cx / PX;
  const gcy = cy / PX;
  pellipse(ctx, gcx, gcy + 6, 5, 1.5, "#282828");

  const hair  = HAIR_COLORS[variant % HAIR_COLORS.length];
  const shirt = SHIRT_COLORS[(variant * 7) % SHIRT_COLORS.length];
  const skin  = SKIN_COLORS[(variant * 3) % SKIN_COLORS.length];
  const pants = PANTS_COLORS[(variant * 5) % PANTS_COLORS.length];

  const frame = currentFrame(PERSON.front, false, time);
  drawSprite(ctx, frame, makePalette(hair, skin, shirt, pants), cx, cy, PX);
}
