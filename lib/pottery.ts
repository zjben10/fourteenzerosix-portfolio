export type PotteryPiece = {
  id: number;
  year: string;
  title: string;
  type?: string;
  description?: string;
  image?: string;
};

export const potteryYears = ["2022", "2023", "2024", "2026"] as const;

export const pottery: PotteryPiece[] = [
  // 2022
  {
    id: 1,
    year: "2022",
    title: "Piece title",
    type: "Bowl",
    description: "Add a note about this piece — the form, the glaze, the moment it came out of the kiln.",
  },
  {
    id: 2,
    year: "2022",
    title: "Piece title",
    type: "Vase",
    description: "Add a note about this piece — the form, the glaze, the moment it came out of the kiln.",
  },

  // 2023
  {
    id: 3,
    year: "2023",
    title: "Piece title",
    type: "Mug",
    description: "Add a note about this piece — the form, the glaze, the moment it came out of the kiln.",
  },
  {
    id: 4,
    year: "2023",
    title: "Piece title",
    type: "Bowl",
    description: "Add a note about this piece — the form, the glaze, the moment it came out of the kiln.",
  },

  // 2024
  {
    id: 5,
    year: "2024",
    title: "Piece title",
    type: "Vase",
    description: "Add a note about this piece — the form, the glaze, the moment it came out of the kiln.",
  },
  {
    id: 6,
    year: "2024",
    title: "Piece title",
    type: "Plate",
    description: "Add a note about this piece — the form, the glaze, the moment it came out of the kiln.",
  },

  // 2026
  {
    id: 7,
    year: "2026",
    title: "Piece title",
    type: "Mug",
    description: "Add a note about this piece — the form, the glaze, the moment it came out of the kiln.",
  },
  {
    id: 8,
    year: "2026",
    title: "Piece title",
    type: "Bowl",
    description: "Add a note about this piece — the form, the glaze, the moment it came out of the kiln.",
  },
];
