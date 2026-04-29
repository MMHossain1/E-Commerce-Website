import HeroSection from "@/components/home/HeroSection";
import NewArrivalsGrid from "@/components/home/NewArrivalsGrid";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import PromoBanner from "@/components/home/PromoBanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NewArrivalsGrid />
      <CategoriesGrid />
      <PromoBanner />
    </>
  );
}
