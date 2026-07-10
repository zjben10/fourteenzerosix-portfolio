export type PotteryCategory = "Teaware" | "Vases";

export type PotteryPiece = {
  id: string;
  category: PotteryCategory;
  image: string;
  width: number;
  height: number;
};

export const potteryCategories: { label: PotteryCategory; emoji: string }[] = [
  { label: "Teaware", emoji: "🍵" },
  { label: "Vases", emoji: "🏺" },
];
