import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import type { PotteryPiece, PotteryCategory } from "./pottery";

// Maps each category to its folder under public/images/pottery/.
// Drop image files into these folders and they appear in the gallery automatically.
const CATEGORY_DIRS: { label: PotteryCategory; dir: string }[] = [
  { label: "Teaware", dir: "teaware" },
  { label: "Vases", dir: "vases" },
];

const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif)$/i;

// Pulls the year out of a filename like "IMG_7793_2024.jpg" (the last 4-digit group).
function yearOf(filename: string): number {
  const groups = filename.match(/\d{4}/g);
  return groups ? Number(groups[groups.length - 1]) : 0;
}

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
      // Newest year first; within a year, newest capture (higher number) first.
      .sort((a, b) => yearOf(b) - yearOf(a) || b.localeCompare(a, undefined, { numeric: true }))
      .forEach((f) => {
        const { width, height } = imageSize(fs.readFileSync(path.join(base, dir, f)));
        pieces.push({
          id: `${dir}/${f}`,
          category: label,
          image: `/images/pottery/${dir}/${f}`,
          width: width ?? 1000,
          height: height ?? 1000,
        });
      });
  }

  return pieces;
}
