import type { Metadata } from "next";
import Lab from "@/components/Lab";

export const metadata: Metadata = {
  title: "AI Related Projects and Skills | Zoei Benzon",
  description:
    "AI related projects and skills by Zoei Benzon: small, shipped go-to-market tools built with Claude and code, plus the marketing and GTM engineering stack behind them.",
  alternates: { canonical: "/ai-projects" },
};

export default function AiProjectsPage() {
  return <Lab />;
}
