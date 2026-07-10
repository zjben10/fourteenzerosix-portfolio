export type PotteryCategory = "Teaware" | "Vases";

export type PotteryPiece = {
  id: string;
  category: PotteryCategory;
  image: string;
};

export const potteryCategories: { label: PotteryCategory; emoji: string }[] = [
  { label: "Teaware", emoji: "🍵" },
  { label: "Vases", emoji: "🏺" },
];
