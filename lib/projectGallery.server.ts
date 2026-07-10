import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

export type GalleryImage = { src: string; width: number; height: number };

const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif)$/i;

// Reads photos from public/images/projects/<slug>/ at build time.
// Drop images into that folder and they appear in the project's gallery.
// Files sort ascending by name — prefix with 01, 02, … to control order.
export function getProjectGallery(slug: string): GalleryImage[] {
  const dir = path.join(process.cwd(), "public", "images", "projects", slug);

  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return []; // no folder yet — no gallery
  }

  return files
    .filter((f) => IMAGE_RE.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => {
      const { width, height } = imageSize(fs.readFileSync(path.join(dir, f)));
      return {
        src: `/images/projects/${slug}/${f}`,
        width: width ?? 1000,
        height: height ?? 1000,
      };
    });
}
