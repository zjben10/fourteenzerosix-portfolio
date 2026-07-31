import type { Metadata } from "next";
import Lab from "@/components/Lab";

export const metadata: Metadata = {
  title: "The Lab | AI Engineering — Zoei Benzon",
  description:
    "AI engineering projects by Zoei Benzon — small, shipped go-to-market tools built with Claude and code. Each one is deployed and open source.",
  alternates: { canonical: "/lab" },
};

export default function LabPage() {
  return <Lab />;
}
