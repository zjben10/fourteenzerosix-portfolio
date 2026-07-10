import FunGallery from "@/components/FunGallery";
import { getPottery } from "@/lib/pottery.server";

export default function FunPage() {
  return <FunGallery pieces={getPottery()} />;
}
