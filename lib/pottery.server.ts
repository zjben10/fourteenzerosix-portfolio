import fs from "node:fs";
import path from "node:path";
import type { PotteryPiece, PotteryCategory } from "./pottery";

// Maps each category to its folder under public/images/pottery/.
// Drop image files into these folders and they appear in the gallery automatically.
const CATEGORY_DIRS: { label: PotteryCategory; dir: string }[] = [
  { label: "Teaware", dir: "teaware" },
  { label: "Vases", dir: "vases" },
];

const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif)$/i;

// Reads the pottery folders at build time. Files sort newest-first — name them
// with a leading date or number (e.g. "2026-01-teabowl.jpg") to control order.
export function getPottery(): PotteryPiece[] {
  const base = path.join(process.cwd(), "public", "images", "pottery");
  const pieces: PotteryPiece[] = [];

  for (const { label, dir } of CATEGORY_DIRS) {
    let files: string[] = [];
    try {
      files = fs.readdirSync(path.join(base, dir));
    } catch {
      continue; // folder missing — skip
    }

    files
      .filter((f) => IMAGE_RE.test(f))
      .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
      .forEach((f) => {
        pieces.push({
          id: `${dir}/${f}`,
          category: label,
          image: `/images/pottery/${dir}/${f}`,
        });
      });
  }

  return pieces;
}
