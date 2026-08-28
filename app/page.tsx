import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { CatalogTabs } from "@/components/CatalogTabs";
import { HowToOrder } from "@/components/HowToOrder";
import { Hours } from "@/components/Hours";
import { Location } from "@/components/Location";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <CatalogTabs />
      <HowToOrder />
      <Hours />
      <Location />
    </>
  );
}
