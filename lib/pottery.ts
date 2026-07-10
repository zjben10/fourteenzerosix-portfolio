export type PotteryCategory = "Teaware" | "Vases";

export type PotteryPiece = {
  id: number;
  year: string;
  title: string;
  category: PotteryCategory;
  type?: string;
  description?: string;
  image?: string;
};

export const potteryCategories: { label: PotteryCategory; emoji: string }[] = [
  { label: "Teaware", emoji: "🍵" },
  { label: "Vases", emoji: "🏺" },
];

export const potteryYears = ["2022", "2023", "2024", "2026"] as const;

export const pottery: PotteryPiece[] = [
  // 2022
  { id: 1,  year: "2022", title: "Piece title", category: "Teaware", type: "Bowl" },
  { id: 2,  year: "2022", title: "Piece title", category: "Vases", type: "Vase" },
  { id: 3,  year: "2022", title: "Piece title", category: "Teaware", type: "Mug" },

  // 2023
  { id: 4,  year: "2023", title: "Piece title", category: "Teaware", type: "Bowl" },
  { id: 5,  year: "2023", title: "Piece title", category: "Teaware", type: "Plate" },
  { id: 6,  year: "2023", title: "Piece title", category: "Vases", type: "Vase" },

  // 2024
  { id: 7,  year: "2024", title: "Piece title", category: "Teaware", type: "Mug" },
  { id: 8,  year: "2024", title: "Piece title", category: "Teaware", type: "Bowl" },
  { id: 9,  year: "2024", title: "Piece title", category: "Vases", type: "Vase" },

  // 2026
  { id: 10, year: "2026", title: "Piece title", category: "Teaware", type: "Bowl" },
  { id: 11, year: "2026", title: "Piece title", category: "Teaware", type: "Mug" },
  { id: 12, year: "2026", title: "Piece title", category: "Vases", type: "Vase" },
];

// Newest → oldest (year desc, then most-recent id first)
export const potteryNewToOld = [...pottery].sort(
  (a, b) => Number(b.year) - Number(a.year) || b.id - a.id
);
